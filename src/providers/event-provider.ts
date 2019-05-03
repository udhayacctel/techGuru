import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { Constants } from '../utilities/Constants';
import { EventsClass } from '../models/events';
import { Notification } from '../models/notification';


@Injectable()
export class EventsProvider {

    constructor(public http: Http) {}

getevents(activity:string, token:string, id:number)
    {
        //let id:number = 4;
        let url: string = `${Constants.servicesURLPrefix}/schools/${activity}/events`;
        let headers = new Headers({
            'X-Authorization' : 'Bearer ' + token,
            'X-Authorization_ID' : 'BearerId ' + id
        });

        let options = new RequestOptions({headers: headers});

        return this.http.get(url,options)
                    .map(res => res.json())
                    .catch(error => Observable.throw(new Error(error.status)));
    }


addevents(works:EventsClass, activity:string, token:string, id:number)  
    {
        console.log(" the value of student_id ")
        let url: string = `${Constants.servicesURLPrefix}/schools/${activity}/events`;
    
        let headers = new Headers({
            'X-Authorization' : 'Bearer ' + token,
             'X-Authorization_ID' : 'BearerId ' + id,
            'Content-Type': 'application/json'

        });
        let options = new RequestOptions({ headers: headers });
        
        let body = JSON.stringify(works);        

        return this.http.post(url,body, options)
                    .map(res => res.json())
                    .catch(error => Observable.throw(new Error(error.status)));
    }



removeevents( id: number, token:string, tg_id:number)
    {
        let url: string = `${Constants.servicesURLPrefix}/schools/${id}/events`;
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

     getstudentevents(student_id:number, token:string, id:number)
    {
        //let id:number = 4;
        let url: string = `${Constants.servicesURLPrefix}/schools/${student_id}/student_event`;
        let headers = new Headers({
            'X-Authorization' : 'Bearer ' + token,
            'X-Authorization_ID' : 'BearerId ' + id
        });

        let options = new RequestOptions({headers: headers});

        return this.http.get(url,options)
                    .map(res => res.json())
                    .catch(error => Observable.throw(new Error(error.status)));
    }

addstudentevents(works:EventsClass, student_id:number, token:string, id:number)  
    {
        console.log(" the value of student_id ")
        let url: string = `${Constants.servicesURLPrefix}/schools/${student_id}/student_event`;
    
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



removestudentevents( id: number, token:string, tg_id:number)
    {
        let url: string = `${Constants.servicesURLPrefix}/schools/${id}/student_event`;
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

    geteventnotification(student_id:number, class_id:number, to_date:string, token:string, id:number)
    {
        //let id:number = 4;
        let url: string = `${Constants.servicesURLPrefix}/schools/${student_id}/${class_id}/${to_date}/event_notification`;
        let headers = new Headers({
            'X-Authorization' : 'Bearer ' + token,
            'X-Authorization_ID' : 'BearerId ' + id
        });

        let options = new RequestOptions({headers: headers});

        return this.http.get(url,options)
                    .map(res => res.json())
                    .catch(error => Observable.throw(new Error(error.status)));
    }


addeventnotification(works:Notification, school_id:number, token:string, id:number)  
    {
        console.log(" the value of student_id ")
        let url: string = `${Constants.servicesURLPrefix}/schools/${school_id}/event_notification`;
    
        let headers = new Headers({
            'X-Authorization' : 'Bearer ' + token,
             'X-Authorization_ID' : 'BearerId ' + id,
            'Content-Type': 'application/json'

        });
        let options = new RequestOptions({ headers: headers });
        
        let body = JSON.stringify(works);        

        return this.http.post(url,body, options)
                    .map(res => res.json())
                    .catch(error => Observable.throw(new Error(error.status)));
    }

getprizelist(name:string, token:string, id:number)
    {
        //let id:number = 4;
        let url: string = `${Constants.servicesURLPrefix}/schools/${name}/prize_list`;
        let headers = new Headers({
            'X-Authorization' : 'Bearer ' + token,
            'X-Authorization_ID' : 'BearerId ' + id
        });

        let options = new RequestOptions({headers: headers});

        return this.http.get(url,options)
                    .map(res => res.json())
                    .catch(error => Observable.throw(new Error(error.status)));
    }

}