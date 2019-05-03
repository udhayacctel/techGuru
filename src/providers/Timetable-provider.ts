import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { TimeTable } from '../models/timetable';
import { Constants } from '../utilities/Constants';


 @Injectable()
export class TimeTableProvider {

    constructor(public http: Http) {}

/********************************************************************************************************/
 
    getTimetable(class_id:any,day:any, date:any, token:string, id:number)
    {
        console.log(" i'm coming in timetable provider!!!!!!!!!")
        let url: string = `${Constants.servicesURLPrefix}/timetable/${class_id}/${day}/${date}`;
        console.log("link" + url)
        let headers = new Headers({
            'X-Authorization' : 'Bearer ' + token,
            'X-Authorization_ID' : 'BearerId ' + id,

        });

        let options = new RequestOptions({headers: headers});

        return this.http.get(url, options)
                    .map(res => res.json())
                    .catch(error => Observable.throw(new Error(error.status)));
    }

    getTeacherTimetable(teacher_id:number,day:String,date:String, school_id:number, token:string, id:number)
    {
        console.log(" i'm coming in timetable provider")
        let url: string = `${Constants.servicesURLPrefix}/teacher_schedule/${teacher_id}/${day}/${date}/${school_id}`;
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

    puttimetableid (timetable:TimeTable,class_id:number, id:number, token:string, tg_id:number)  
    {

        let url: string = `${Constants.servicesURLPrefix}/timetable/${class_id}/class/${id}`;
  
        console.log("this is URL" + url);
  
        let headers = new Headers({
            'X-Authorization' : 'Bearer ' + token,
            'X-Authorization_ID' : 'BearerId ' + tg_id,
            'Content-Type': 'application/json'

        });

        let options = new RequestOptions({ headers: headers });
        
        let body = JSON.stringify(timetable);        

        return this.http.put(url,body, options)
                    .map(res => res.json())
                    .catch(error => Observable.throw(new Error(error.status)));
    }

    timetimepost(timetable:TimeTable,class_id:any,day:any, token:string, id:number)  
    {

        let url: string = `${Constants.servicesURLPrefix}/timetable/${class_id}/${day}/day`;
        
        console.log("this is URL" + url);
        
        let headers = new Headers({
            'X-Authorization' : 'Bearer ' + token,
            'X-Authorization_ID' : 'BearerId ' + id,
            'Content-Type': 'application/json'
        });

        let options = new RequestOptions({ headers: headers });
        
        let body = JSON.stringify(timetable);        

        return this.http.post(url,body, options)
                    .map(res => res.json())
                    .catch(error => Observable.throw(new Error(error.status)));
    }

    timePostdate(timetable:TimeTable,class_id:any,day:any,date:any, token:string, id:number)  
    {

        let url: string = `${Constants.servicesURLPrefix}/timetable/${class_id}/${day}/${date}/date`;
        
        console.log("this is URL" + url);
        
        let headers = new Headers({
            'X-Authorization' : 'Bearer ' + token,
            'X-Authorization_ID' : 'BearerId ' + id,
            'Content-Type': 'application/json'
        });
        
        let options = new RequestOptions({ headers: headers });
        
        let body = JSON.stringify(timetable);        

        return this.http.post(url,body, options)
                    .map(res => res.json())
                    .catch(error => Observable.throw(new Error(error.status)));
    }

    getTimetableDay(class_id:any,day:any, date:any, token:string, id:number)
    {
        let url: string = `${Constants.servicesURLPrefix}/timetable/${class_id}/${day}/day`;
        console.log("link" + url)
        let headers = new Headers({
            'X-Authorization' : 'Bearer ' + token,
            'X-Authorization_ID' : 'BearerId ' + id,

        });

        let options = new RequestOptions({headers: headers});

        return this.http.get(url, options)
                    .map(res => res.json())
                    .catch(error => Observable.throw(new Error(error.status)));
    }

    getTimetableDate(class_id:any,day:any, date:any, token:string, id:number)
    {
     
        let url: string = `${Constants.servicesURLPrefix}/timetable/${class_id}/${date}/date`;
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

getstaff_list(class_id:number, id:number, token:string, tg_id:number)
    {
     
        let url: string = `${Constants.servicesURLPrefix}/schools/${class_id}/${id}/staff_list`;
        console.log("link" + url)
        let headers = new Headers({
            'X-Authorization' : 'Bearer ' + token,
            'X-Authorization_ID' : 'BearerId ' + tg_id

        });

        let options = new RequestOptions({headers: headers});

        return this.http.get(url, options)
                    .map(res => res.json())
                    .catch(error => Observable.throw(new Error(error.status)));
    }

}

/********************************************************************************************************/
