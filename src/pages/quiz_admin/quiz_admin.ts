import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController,AlertController } from 'ionic-angular';
import { Home } from '../home/home';
import { Quiz } from '../../models/quiz';
import { QuizProvider } from '../../providers/quiz-provider';
import { ToastController } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';
import { PopoverPage} from '../../pages/popover/popover';
import { GlobalVars } from '../../providers/global-provider';

@Component({
    templateUrl: 'quiz_admin.html',
    selector: 'quiz-admin'
})
export class Quiz_Admin {

    quiz_admin: Quiz = new Quiz();
    subject: String;
    parm_standard: number;
    parm_subject: string;
    question: any;
    option1: string;
    option2: string;
    option3: string;
    option4: string;
    Answer: string;
    school_id: any;
    class_id: number;
    subject_id: number;
    selected_subject_id: number;
    selected_standard: number;
    loader: any;
    token:string;
    id:number;

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public quizProvider: QuizProvider,
        public toastController: ToastController,
        public popoverCtrl: PopoverController,
        public loadingController: LoadingController,
        public globalVars: GlobalVars,
        public alertCtrl: AlertController ) {

        this.class_id = navParams.get('parm_class_id');
        this.selected_standard = navParams.get('parm_standard');
        this.subject_id = navParams.get('parm_subject_id');
        this.subject = navParams.get('parm_subject')
        this.loading()
        this.loader.dismiss()
        this.token   = this.globalVars.getMyGlobalToken();
         this.id = this.globalVars.getMyGlobalUserId();

    }
    home() {
        this.navCtrl.push(Home);
        this.navCtrl.setRoot(Home);
    }

    quizadd(prvdr_quiz_admin_quiz: Quiz, class_id: number, subject_id: number, token:string, id:number) {

        this.quizProvider
            .addQuiz(prvdr_quiz_admin_quiz, class_id, subject_id, token, id)
            .subscribe(res => {
                    this.successToastreturn(), this.resetform()
                },
                err => this.errorToast());
    }

    resetform() {
        this.question = ''
        this.option1 = ''
        this.option2 = ''
        this.option3 = ''
        this.option4 = ''
        this.Answer = ''
    }

    successToastreturn() {

        let toast = this.toastController.create({
            message: "Record updated",
            duration: 1000,
            position: 'middle'
        });
        toast.present();
    }

    errorToast() {
        let toast = this.toastController.create({
            message: "Record not loaded",
            duration: 1000,
            position: 'middle'
        });
        toast.present();

    }
    add() {

         if ((this.question === undefined || this.question == null || this.question.length <= 0) ||
            (this.option1 === undefined || this.option1== null || this.option1.length <= 0) ||
            (this.option2=== undefined || this.option2 == null || this.option2.length <= 0) ||    
            (this.option3 === undefined || this.option3== null || this.option3.length <= 0) ||
            (this.option4 === undefined || this.option4== null || this.option4.length <= 0) ||
            (this.Answer === undefined || this.Answer== null || this.Answer.length <= 0)) {
            
            let alert = this.alertCtrl.create({
                message: 'Please Fill all the Fields',
                buttons: [{
                    text: 'OK'
                }]
            });
            alert.present();

        } else {

        this.quiz_admin.questions = this.question
        this.quiz_admin.option1 = this.option1
        this.quiz_admin.option2 = this.option2
        this.quiz_admin.option3 = this.option3
        this.quiz_admin.option4 = this.option4
        this.quiz_admin.answer = this.Answer
        this.quiz_admin.school_id = this.school_id
        this.quiz_admin.class_id = this.class_id
        this.quiz_admin.subject_id = this.subject_id

        this.quizadd(this.quiz_admin, this.class_id, this.subject_id, this.token, this.id)
        console.log("class" + this.selected_standard + this.selected_subject_id)
    }
    }

    loading() {

        this.loader = this.loadingController.create({
            content: "Please wait"
        });
        this.loader.present();
    }

    presentPopover(myEvent) {

        let popover = this.popoverCtrl.create(PopoverPage, {

        });

        popover.present({
            ev: myEvent
        });

    }
}