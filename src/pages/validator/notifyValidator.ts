 
import { FormControl } from '@angular/forms';
import { UserService } from '../../providers/user-service/user-service';

export class notifyValidator {

constructor() {}

 
static checkFromDate(input: FormControl) {

    if (input.value == 0) {
      return {
          "not the right date" : true 
      } 
    }

  }

static checkToDate(input: FormControl) {

    if (input.value == 0) {
      return {
          "not the right date" : true 
      } 
    }

  }
}