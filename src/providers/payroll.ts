import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Constants } from '../utilities/Constants';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { Payroll } from '../models/payroll';

@Injectable()
export class PayrollProvider {

    constructor(public http: Http) {}    
  
    getmessage(teacher_id:number, token:string, id:number){

   let url: string = `${Constants.servicesURLPrefix}/schools/${teacher_id}/payroll`;

    console.log("link" + url)
    let headers = new Headers({
        'X-Authorization' : 'Bearer ' + token,
        'X-Authorization_ID' : 'BearerId ' + id

    });

    let options = new RequestOptions({headers: headers});

    return this.http.get(url, options)
                .map(res => res.json())
                .catch(error => Observable.throw(new Error(error.status)));           
    }
    }