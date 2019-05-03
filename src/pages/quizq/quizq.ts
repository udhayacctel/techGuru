import { Component,ViewChild} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoadingController, ToastController,PopoverController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { GlobalVars } from '../../providers/global-provider';
import { Quizzr } from '../../models/quizzr';
import { Quizz } from '../quizz/quizz';
import { PopoverPage } from '../../pages/popover/popover';
import { QuizProv } from '../../providers/quiz';
import { FormBuilder, FormArray, FormGroup, Validators,FormControl } from '@angular/forms';


@Component({
    templateUrl: 'quizq.html',
    selector: 'quizq-page'
})
export class Quizq {  


    parm_start_date:any;
    parm_end_date :any;
    parm_title :any;
    parm_quiz_type :any;
    parm_answer_type: any;
    parm_description:any;
    parm_duration_mins:number;
    parm_attempts_allowed :number;
    question_number:number = 0;
    quiz: Quizzr[];
    quizz : Quizzr = new Quizzr();
    token:string;
    id:number;
    loader:any;
    question: any;
    explanation:any;
    options:any[];
    isRightAnswer: boolean[];
    sequence_number: number = 0;
    parm_randomized: boolean = false
    

    public form: FormGroup;

    constructor(public navCtrl: NavController, navParams: NavParams,  public alertCtrl: AlertController,
        public globalVars: GlobalVars,public toastController: ToastController, public popoverCtrl:PopoverController,
        public quizProv: QuizProv,public loadingController: LoadingController,private FB : FormBuilder){


            console.log('HELLO into quizq constructor');

            this.token   = this.globalVars.getMyGlobalToken();
            this.id = this.globalVars.getMyGlobalUserId();
            this.quiz = new Array <Quizzr>()

            console.log('HELLO into quizq constructor 2');
 
            this.parm_start_date       = navParams.get('parm_start_date');
            this.parm_end_date         = navParams.get('parm_end_date');
            this.parm_title            = navParams.get('parm_title');
            this.parm_quiz_type        = navParams.get('parm_quiz_type');
            this.parm_answer_type      = navParams.get('parm_answer_type');
            this.parm_description      = navParams.get('parm_description');
            this.parm_duration_mins    = navParams.get('parm_duration_mins');
            this.parm_attempts_allowed = navParams.get('parm_attempts_allowed')
            this.parm_randomized       = navParams.get('parm_randomized')  
            console.log('HELLO into quizq constructor 3');
            this.ngOnInit() 
                

}


    ngOnInit() {
        console.log('HELLO into quizq nginit1');
        this.form = this.FB.group({
            question: new FormControl('', Validators.required), 
            explanation: new FormControl('', Validators.required),
            items: this.FB.array([ 
             this.initEvents()
             
             
             ]), 
               
            })
           
            console.log('HELLO into quizq nginit2');
            console.log('HELLO into quizq nginit3');
        }


  initEvents() {
            console.log('HELLO into quizq nginit4');
            return this.FB.group({
              options: ['', Validators.required],
              isRightAnswer: ['false', Validators.required]
            });
          }

 
               


       addItem() {
          console.log('HELLO into quizq additem');
            const control = <FormArray>this.form.controls['items'];
            control.push(this.initEvents());
       
         
}
        
          
    
          remove(i: number) {
            console.log('HELLO into quizq removeitem');
            const control = <FormArray>this.form.controls['items'];
            control.removeAt(i);
                  }


loading() {
    console.log('HELLO into quizq loading');
    this.loader = this.loadingController.create({
        content: "Please wait"
    });
    this.loader.present();
}

    
  
successToastreturn(msg, pos) {

            let toast = this.toastController.create({
                message: msg,
                duration: 1000,
                position: pos
            });
            toast.present();
        }
        
        errorToast(msg) {
    
            let toast = this.toastController.create({
                message: msg,
                duration: 1000,
                position: 'middle'
            });
            toast.present();
    
        }


 onSubmit(){
        console.log('HELLO into quizq submit1');
           if( this.form.valid ) {

             let quiz: Quizzr[] =new Array <  Quizzr >();
             let quizz: Quizzr = new Quizzr();
        this.question_number        = this.question_number + 1
        this.sequence_number        = this.sequence_number + 1

         quizz.title                = this.parm_title
         quizz.description          = this.parm_description
         quizz.quiz_type            = this.parm_quiz_type
         quizz.start_date           = this.parm_start_date
         quizz.end_date             = this.parm_end_date
         quizz.duration_mins        = this.parm_duration_mins
         quizz.attempts_allowed     = this.parm_attempts_allowed
         quizz.randomized           = this.parm_randomized
         quizz.question_number      = this.question_number
         quizz.question             = this.form.value.question         
         quizz.sequence_number      = this.sequence_number
         quizz.answer_type          = this.parm_answer_type
         quizz.correct_answer_count = 2
         quizz.explanation          = this.form.value.explanation
         quizz.answer               = this.form.value.items[0].options
         quizz.is_right_answer      = this.form.value.items[0].isRightAnswer
      //   quizz.attempt_id           = 1
         console.log(this.question_number)
         console.log(this.parm_randomized)
         console.log('HELLO into quizq before pushing to webservice');
          quiz.push(quizz)
          this.QuizAdd(this.parm_quiz_type, quiz, this.token, this.id)
                
        console.log('HELLO END into quizq before pushing to webservice');

        }

 }

   

        QuizAdd(quiz_type:any, quiz: Quizzr[], token:string, id:number) {
            console.log('HELLO into quizq quiz add');
            this.quizProv
           .addQuiz(quiz_type, quiz, token, id)
         .subscribe(res => {
             this.successToastreturn('Record Updated', 'middle'), this.loader.dismiss()
                },
                err => {
                    this.errorToast('Record not Updated'), this.loader.dismiss()
                });
}
 
        presentPopover(myEvent) {
            console.log('HELLO into quizq popover');
            
                    let popover = this.popoverCtrl.create(PopoverPage, {
            
                    });
            
                    popover.present({
            
                        ev: myEvent
            
                    });
            
         }            
}
