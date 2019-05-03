import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Constants } from '../utilities/Constants';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { Parentmeet } from '../models/parentMeet';


@Injectable()
export class ParentMeetProvider {

    constructor(public http: Http) {}
   
/******************************************************************************************************* */
    
    addmessage(prvd_for_parertmeeting:Parentmeet,class_id:number, student_id:number, token:string, id:number)  
    {   
        let url: string = `${Constants.servicesURLPrefix}/parent_teacher_meeting/${class_id}/student/${student_id}`;
    
        let headers = new Headers({
        'X-Authorization' : 'Bearer ' + token,
        'X-Authorization_ID' : 'BearerId ' + id,
        'Content-Type': 'application/json'

       });
       
        let options = new RequestOptions({ headers: headers });
        
        let body = JSON.stringify(prvd_for_parertmeeting);        

        return this.http.post(url,body, options)
                    .map(res => res.json())
                    .catch(error => Observable.throw(new Error(error.status)));
    }

    getmessage(student_id:number, class_id:number, token:string, id:number){

   let url: string = `${Constants.servicesURLPrefix}/parent_teacher_meeting/${student_id}/class/${class_id}`;

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
   
    /****************************************************************************************************** */
   
  