import { FormControl,FormGroup,Validators} from '@angular/forms';
 
export class DailydiaryValidator {

static checkToDate(control: FormControl): any {
    console.log('hello in date validator:' + control.value + ';');
    let  to_dt   = control.value 


    let  today: any = new Date();
    let  dd: any    = today.getDate();
    let  mm: any    = today.getMonth()+1; //January is 0!
    let  yyyy: any  = today.getFullYear();
    let  month: string;
    if(dd<10) {
         dd='0'+dd
    } 

    if(mm<10) {
         mm='0'+mm
    } 

       today = yyyy+'-'+mm+'-'+dd;

       
        
        if ( to_dt == null || to_dt == '' || 
          to_dt == ' ' ||
          to_dt < today) {
            return {
                  "Less than": true
            }
        }  
        
            return null;
}

static checkSubject(control: FormControl): any {
    console.log('in subject validator:' + control.value + ';'
    );
    
    let  sub   = control.value; 
    
        if(control.value == null || control.value == '' || control.value == ' ')
        {
            console.log('subject field error');
            return{
                "enter subject":true
            };
        }
        return null;

    }

    static checkTitle(control: FormControl): any {
    let  title   = control.value 
        if(control.value == ' '){
            return{
                "enter title":true
            }
        }
    }

        static checkMessage(control: FormControl): any {
    let  message   = control.value 
        if(control.value == ' '){
            return{
                "enter message":true
            }
        }

}


}