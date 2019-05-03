import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { Dailydiary } from '../models/dailydairy';
import { Dailyworks } from '../models/dailyworks';
import { Constants } from '../utilities/Constants';
import { SchoolConstants } from '../models/school_constant';


 @Injectable()
export class DailyDiaryProvider {

    constructor(public http: Http) {}

     addDiary(prvdr_savenotification_dailydiary:Dailydiary,
              class_id:number, token:string, id:number)  
    {

        let url: string = `${Constants.servicesURLPrefix}/dailydiary/${class_id}`;
    
        let headers = new Headers({
            'X-Authorization' : 'Bearer ' + token,
            'X-Authorization_ID' : 'BearerId ' + id,
            'Content-Type': 'application/json'
        });

        let options = new RequestOptions({ headers: headers });
        
        let body = JSON.stringify(prvdr_savenotification_dailydiary);        

        return this.http.post(url,body, options)
                    .map(res => res.json())
                    .catch(error => Observable.throw(new Error(error.status)));
    }

     putDiary (dailydiary:Dailydiary, id:number,class_id:number, token:string, tg_id:number)  
    {

        let url: string = `${Constants.servicesURLPrefix}/dailydiary/${class_id}/class/${id}`;
  
        console.log("this is URL" + url);
  
        let headers = new Headers({
            'X-Authorization' : 'Bearer ' + token,
            'X-Authorization_ID' : 'BearerId ' + tg_id,
            'Content-Type': 'application/json'
        });

        let options = new RequestOptions({ headers: headers });
        
        let body = JSON.stringify(dailydiary);        

        return this.http.put(url,body, options)
                    .map(res => res.json())
                    .catch(error => Observable.throw(new Error(error.status)));
    }

    removeDiary( id: number, class_id:number, token:string, tg_id:number)
    {
        let url: string = `${Constants.servicesURLPrefix}/dailydiary/${class_id}/class/${id}`;
        console.log("link" + url)
        let headers = new Headers({
            'X-Authorization' : 'Bearer ' + token,
            'X-Authorization_ID' : 'BearerId ' + tg_id

        });

        let options = new RequestOptions({ headers: headers });
        
        return this.http.delete(url, options)
                    .map(res => res.json())
                    .catch(error => Observable.throw(new Error(error.status)));
    }

addwork(works:Dailyworks, student_id:number, message_id:number, token:string, id:number)  
    {
        console.log(" the value of student_id ")
        let url: string = `${Constants.servicesURLPrefix}/workupdate/${student_id}/${message_id}`;
    
        let headers = new Headers({
            'X-Authorization' : 'Bearer ' + token,
             'X-Authorization_ID' : 'BearerId ' + id,
            'Content-Type': 'application/json'

        });
        let options = new RequestOptions({ headers: headers });
        
        let body = JSON.stringify(works);        

        return this.http.put(url,body, options)
                    .map(res => res.json())
                    .catch(error => Observable.throw(new Error(error.status)));
    }

    updateteacherstatus(class_diary_id:number, works:Dailyworks[], token:string, id:number)
    {
        let url: string = `${Constants.servicesURLPrefix}/classes/${class_diary_id}/status`;
        console.log("link"+ url)
        let headers = new Headers({
            'X-Authorization' : 'Bearer ' + token,
            'X-Authorization_ID' : 'BearerId ' + id,
            'Content-Type': 'application/json'

        });

        let options = new RequestOptions({ headers: headers });
        
        let body = JSON.stringify(works);        

        return this.http.put(url,body, options)
                    .map(res => res.json())
                    .catch(error => Observable.throw(new Error(error.status)));
    } 

getworks(message_id:any,class_id:number, token:string, id:number)
    {
          let url: string = `${Constants.servicesURLPrefix}/work_report/${message_id}/${class_id}`;
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

getStudentdiary(class_id:number,activity:any,end_date:any,student_id:number, token:string, id:number) 
  {
          let url: string = `${Constants.servicesURLPrefix}/dailydiary/${student_id}/${class_id}/${activity}/${end_date}`;
          console.log("link" + url)
          let headers = new Headers({
            'X-Authorization' : 'Bearer ' + token,
            'X-Authorization_ID' : 'BearerId ' + id

        });

        let options = new RequestOptions({headers: headers});
        
          return this.http.get(url,options)
                    .map(res => res.json())
                    .catch(error => Observable.throw(new Error(error.status)));
  }

getDiary(class_id:number,activity:any,end_date:any, token:string, id:number) 
    {
          let url: string = `${Constants.servicesURLPrefix}/dailydiary/${class_id}/${activity}/${end_date}`;

          console.log("link" + url)
          console.log("token" + token)
        let headers = new Headers({
            'X-Authorization' : 'Bearer ' + token,
            'X-Authorization_ID' : 'BearerId ' + id       
        });

        let options = new RequestOptions({headers: headers});

          return this.http.get(url, options)
                    .map(res => res.json())
                    .catch(error => Observable.throw(new Error(error.status)));
    }

    updatecoordinator(id:number, works:Dailyworks, token:string, tg_id:number)
    {
        let url: string = `${Constants.servicesURLPrefix}/dailydiary/${id}/co-ordinator`;
        console.log("link"+ url)
        let headers = new Headers({
            'X-Authorization' : 'Bearer ' + token,
            'X-Authorization_ID' : 'BearerId ' + tg_id,
            'Content-Type': 'application/json'

        });

        let options = new RequestOptions({ headers: headers });
        
        let body = JSON.stringify(works);        

        return this.http.put(url,body, options)
                    .map(res => res.json())
                    .catch(error => Observable.throw(new Error(error.status)));
    } 

getfreezetime(field_id:number, token:string, id:number)
    {
          let url: string = `${Constants.servicesURLPrefix}/school/${field_id}/school_constants`;
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