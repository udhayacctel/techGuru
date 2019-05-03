import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { GlobalVars } from '../../providers/global-provider';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { UsernameValidator } from '../validator/username';
import { Quizzr } from '../../models/quizzr';
import { Quizq } from  '../../pages/quizq/quizq';
import { QuizValidator } from '../validator/quizValidator';


@Component({
    templateUrl: 'quizz.html',
    selector: 'quizz-page'
})

export class Quizz {


    form: FormGroup;    
    current_date: any;
    selected_description:any;
    selected_title:any;
    selected_quiz_type: any;
    selected_start_date : any;
    selected_end_date:any;
    selected_duration_mins:number;
    selected_attempts_allowed: number;
    question: Quizzr[];
    
    
    constructor(public navCtrl: NavController, navParams: NavParams,  public alertCtrl: AlertController,
                public globalVars: GlobalVars,public formBuilder: FormBuilder){


                    this.current_date = this.globalVars.getMyGlobaltodate();                    

                   
                   
                    this.form = formBuilder.group({
                        selected_start_date: [this.current_date, UsernameValidator.checkFromDate],
                        selected_end_date: [this.current_date, Validators.required],
                        selected_title: ['', Validators.required],
                        selected_quiz_type: ['', Validators.required],
                        selected_answer_type: ['', Validators.required],
                        selected_duration_mins: ['', Validators.required],
                        selected_attempts_allowed:['', Validators.required],
                        selected_description:['', Validators.required]
                        
                
                                            }, {
                        validator: this.checkTooDate
                    })
        
    }


    /*randomizeAnswers(rawAnswers: any[]): any[] {
        
               for (let i = rawAnswers.length - 1; i > 0; i--) {
                   let j = Math.floor(Math.random() * (i + 1));
                   let temp = rawAnswers[i];
                   rawAnswers[i] = rawAnswers[j];
                   rawAnswers[j] = temp;
               }
               return rawAnswers;

        
            }    */
            
         /*   randomizeQuestions(question: any[]): any[] {
        
               for (let i = question.length - 1; i > 0; i--) {
                   let j = Math.floor(Math.random() * (i + 1));
                   let temp = question[i];
                   question[i] = question[j];
                  question[j] = temp;
               }
               return question;

            } */
randomizeQuestions(){
var shuffleArray = function(question) {
  var m = question.length, t, i;

  while (m) {
  
    i = Math.floor(Math.random() * m--);
    t = question[m];
    question[m] = question[i];
    question[i] = t;
  }

  return question;
}
}

checkTooDate
        (g: FormGroup): any {

            let start_dt = g.get('selected_start_date').value
            let end_dt = g.get('selected_end_date').value

            if (end_dt < start_dt) {
                console.log("succesful in IF loop")
                return {
                    "Less than": true
                }
            }
            return null;

        }

 
submit() {

   
        this.navCtrl.push(Quizq, {
            parm_start_date:this.form.value.selected_start_date,
            parm_end_date  :this.form.value.selected_end_date,
            parm_title :  this.form.value.selected_title,
            parm_description : this.form.value.selected_description,
            parm_quiz_type : this.form.value.selected_quiz_type,
            parm_answer_type : this.form.value.selected_answer_type,
            parm_duration_mins :this.form.value.selected_duration_mins,
            parm_attempts_allowed : this.form.value.selected_attempts_allowed,
            parm_randomized : this.question
                  
        });

    }



}
