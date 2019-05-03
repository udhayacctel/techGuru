import { FormControl,FormGroup,Validators} from '@angular/forms';
 
export class UsernameValidator {
 
 
static checkFromDate(control: FormControl): any {
   
    let  today: any = new Date();
    let  dd: any    = today.getDate();
    let  mm: any    = today.getMonth()+1; //January is 0!
    let  yyyy: any  = today.getFullYear();
    let  month: string;
    if(dd<=10) {
         dd='0'+dd
    } 

    if(mm<=10) {
         mm='0'+mm
    } 

today = yyyy+'-'+mm+'-'+dd;

  if( today == null || today == '' || 
          today == ' ' ||today > control.value){           
    return {
         "not a valid date": true
    };
  }
      return null;
  }



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

static checkTooDate
     (g:FormGroup): any {
    
       console.log ("Checktoodate main module" ) 
    
       let  from_dt = g.get('selected_from_date').value 
       let  to_dt   = g.get('selected_to_date').value 
        
        if ( to_dt < from_dt) {
            console.log("succesful in IF loop") 
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
}