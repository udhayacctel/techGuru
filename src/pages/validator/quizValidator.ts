import { FormControl } from '@angular/forms';
import { UserService } from '../../providers/user-service/user-service';

export class QuizValidator {
    
    constructor() {}
    


static checkTitle(control: FormControl): any {
    let  title   = control.value 
        if(control.value == ' '){
            return{
                "Enter title":true
            }
        }
    }

  static checkQuiz_type(control: FormControl): any {
    let  quiz_type   = control.value 
        if(control.value == ' '){
            return{
                "Enter Quiz Type":true
            }
            }
        }
 static checkDescription(control: FormControl): any {
    let  description   = control.value 
        if(control.value == ' '){
            return{
                "Enter Description":true
            }
            }
        }

  static checkDurationMins(control: FormControl): any {
     let  duration_mins   = control.value 
         if(control.value == ' '){
            return{
                  "Enter Duration Mins":true
                    
                }
               }
         }
  
  static checkAttemptsAllowed(control: FormControl): any {
    let  attempts_allowed   = control.value 
         if(control.value == ' '){
             return{
                 "Enter Max Attempts":true
                           
                }
             }
                }
         
  static checkStartDate(input: FormControl): any {

    if(input.value == 0){
             return{
              "Not the right date":true
                                   
              }
        }
    }

  static checkEndDate(input: FormControl): any {
        
     if(input.value == 0){
              return{
                "Not the right date":true
                                           
                    }
                }
            }
                         
              
                 
        
        }
