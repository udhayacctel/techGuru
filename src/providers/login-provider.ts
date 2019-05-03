import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import {Constants} from '../utilities/Constants';
import { OTPLogin } from '../models/otpLogin';

 @Injectable()

export class LoginProvider {

    constructor(public http: Http) {}
/************************************************************************************************************** */
       
    getLoginDetails(phone_number: number)
    {
        let url: string = `${Constants.servicesURLPrefix}/login/${phone_number}`;        
        console.log("link" + url)
        
        return this.http.get(url)
                    .map(res => res.json())
                    .catch(error => Observable.throw(new Error(error.status)));
    }

    loginWithOTP(t:OTPLogin)
    {

        let url: string = `${Constants.servicesURLPrefix}/login/otp`;        
        console.log("link" + url)
                    
        let headers = new Headers({ 'Content-Type': 'application/json',
                                    'X-Requested-With' : 'XMLHttpRequest'
                                    });
        let options = new RequestOptions({ headers: headers });
                    
        let body = JSON.stringify(t);        
            
        return this.http.post(url,body, options)
                          .map(res => res.json())
                          .catch(error => Observable.throw(new Error(error.status)));                    
    }
/*************************************************************************************************************** */
/*                  */
/*************************************************************************************************************** */
    
    loginWithMobile(t:OTPLogin)
    {

        let url: string = `${Constants.servicesURLPrefix}/login/mobileno`;        
        console.log("link" + url)
                    
        let headers = new Headers({ 'Content-Type': 'application/json',
                                    'X-Requested-With' : 'XMLHttpRequest'
                                    });
        let options = new RequestOptions({ headers: headers });
                    
        let body = JSON.stringify(t);        
            
        return this.http.post(url,body, options)
                          .map(res => res.json())
                          .catch(error => Observable.throw(new Error(error.status)));                    
    }
/*************************************************************************************************************** */

}
