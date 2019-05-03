import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { Examtimetable } from '../models/exam_timetable';
import { Constants } from '../utilities/Constants';
import { Examcreate } from '../models/exam';


 @Injectable()
export class ExamtimetableProvider {

    constructor(public http: Http) {}   

/*************************************************************************************************** */
    getExam(school_id:any, token:string, id:number)
    {
        let url: string = `${Constants.servicesURLPrefix}/exam/${school_id}`;
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

    addExam(examadd:Examcreate, school_id: any, token:string, id:number)  
    {
        let url: string = `${Constants.servicesURLPrefix}/exam/${school_id}`;
        console.log("this is URL" + url);
        let headers = new Headers({
            'X-Authorization' : 'Bearer ' + token,
            'X-Authorization_ID' : 'BearerId ' + id,
            'Content-Type': 'application/json'

        });
        let options = new RequestOptions({ headers: headers });
        
        let body = JSON.stringify(examadd);        

        return this.http.post(url,body, options)
                    .map(res => res.json())
                    .catch(error => Observable.throw(new Error(error.status)));
    }

    removeExam(school_id:number, id: any, token:string, tg_id:number)
    {
        let url: string = `${Constants.servicesURLPrefix}/exam/${school_id}/${id}/delete`;
        console.log("link" + url)
        let headers = new Headers({
            'X-Authorization' : 'Bearer ' + token,
            'X-Authorization_ID' : 'BearerId ' + tg_id,
            'Content-Type': 'application/json'

        });
        let options = new RequestOptions({ headers: headers });
        
        return this.http.delete(url, options)
                    .map(res => res.json())
                    .catch(error => Observable.throw(new Error(error.status)));
    }

    getExamtable(class_id:number, exam_id:number, token:string,id:number)
    {
        let url: string = `${Constants.servicesURLPrefix}/exam_timetable/${class_id}/${exam_id}`;
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

    addExamtable(prvdr_examtimetable_notification:Examtimetable[], update_ind:string, 
                    update_subject_id:number,cls_id:number, token:string, id:number)  
    {
        let url: string = `${Constants.servicesURLPrefix}/exam_timetable/${update_ind}/${update_subject_id}/class/${cls_id}`;
        console.log("this is URL" + url);
        let headers = new Headers({
            'X-Authorization' : 'Bearer ' + token,
            'X-Authorization_ID' : 'BearerId ' + id,
            'Content-Type': 'application/json'

        });

        let options = new RequestOptions({ headers: headers });
        
        let body = JSON.stringify(prvdr_examtimetable_notification);        

        return this.http.put(url,body, options)
                    .map(res => res.json())
                    .catch(error => Observable.throw(new Error(error.status)));                                                
    }
    
    removeExamtable( exm:Examtimetable[], exam_id:number, subject_id:number, cls_id:number, token:string, id:number)
    {
        let url: string = `${Constants.servicesURLPrefix}/exam/${exam_id}/subject/${subject_id}/class/${cls_id}`;
        console.log("link" + url)
        let headers = new Headers({
            'X-Authorization' : 'Bearer ' + token,
            'X-Authorization_ID' : 'BearerId ' + id,
           'Content-Type': 'application/json'

        });

        let options = new RequestOptions({ headers: headers });
        
        let body = JSON.stringify(exm);        

        return this.http.put(url,body,options)
                    .map(res => res.json())
                    .catch(error => Observable.throw(new Error(error.status)));
    }

}


/*************************************************************************************************** */

 