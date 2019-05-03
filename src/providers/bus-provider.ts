import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { Constants } from '../utilities/Constants';
import { Bus } from '../models/bus';

@Injectable()
export class BusProvider {

    constructor(public http: Http) {}

    getBusRoutes(school_id: number, token:string, id:number)
    {
        //let id:number = 4;
        let url: string = `${Constants.servicesURLPrefix}/school/${school_id}/bus`;
        let headers = new Headers({
            'X-Authorization' : 'Bearer ' + token,
            'X-Authorization_ID' : 'BearerId ' + id
        });

        let options = new RequestOptions({headers: headers});

        return this.http.get(url,options)
                    .map(res => res.json())
                    .catch(error => Observable.throw(new Error(error.status)));
    }

    getBusStudent_list(route_no: number, date:string, token:string, id:number)
    {
        //let id:number = 4;
        let url: string = `${Constants.servicesURLPrefix}/bus/${route_no}/${date}/student_list`;
        let headers = new Headers({
            'X-Authorization' : 'Bearer ' + token,
            'X-Authorization_ID' : 'BearerId ' + id
        });

        let options = new RequestOptions({headers: headers});

        return this.http.get(url,options)
                    .map(res => res.json())
                    .catch(error => Observable.throw(new Error(error.status)));
    }

    updateBusAttendance( date:string, attendance: Bus[], token:string, id:number)
    {
        let url: string = `${Constants.servicesURLPrefix}/bus/${date}/attendance`;
        console.log("link"+ url)
        let headers = new Headers({
            'X-Authorization' : 'Bearer ' + token,
            'X-Authorization_ID' : 'BearerId ' + id,
            'Content-Type': 'application/json'

        });

        let options = new RequestOptions({ headers: headers });
        
        let body = JSON.stringify(attendance);        

        return this.http.put(url,body, options)
                    .map(res => res.json())
                    .catch(error => Observable.throw(new Error(error.status)));
    }

    getBusStudentClass(class_id: number, token:string, id:number)
    {
        //let id:number = 4;
        let url: string = `${Constants.servicesURLPrefix}/student/${class_id}/attendance`;
        let headers = new Headers({
            'X-Authorization' : 'Bearer ' + token,
            'X-Authorization_ID' : 'BearerId ' + id
        });

        let options = new RequestOptions({headers: headers});

        return this.http.get(url,options)
                    .map(res => res.json())
                    .catch(error => Observable.throw(new Error(error.status)));
    }

    getBusAbsent_list(student_id: number, token:string, id:number)
    {
        //let id:number = 4;
        let url: string = `${Constants.servicesURLPrefix}/student/${student_id}/bus_attendance`;
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