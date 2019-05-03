import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { Teacher } from '../models/teacher';
import { Constants } from '../utilities/Constants';
import {Teacher_class} from '../models/teacher_class';
import { Master } from '../models/master';


 @Injectable()

export class TeacherProvider {

    constructor(public http: Http) {}

    getteacher( school_id:number, acad_year: String, token:string, id:number) {

        let url: string = `${Constants.servicesURLPrefix}/schools/${school_id}/${acad_year}/teacher`;
        
        console.log("this is URL" + url);   
        let headers = new Headers({
            'X-Authorization' : 'Bearer ' + token,
            'X-Authorization_ID' : 'BearerId ' + id
        });

        let options = new RequestOptions({headers: headers});
        
        return this.http.get(url, options)
                    .map(res => res.json())
                    .catch(error => Observable.throw(new Error(error.status)));
    }

    getStudent(school_id:number,acad_year:String, token: string, id:number) {

        let url: string = `${Constants.servicesURLPrefix}/schools/${school_id}/${acad_year}/student`;
        
        console.log("this is URL" + url);   
        let headers = new Headers({
            'X-Authorization' : 'Bearer ' + token,
            'X-Authorization_ID' : 'BearerId ' + id
        });

        let options = new RequestOptions({headers: headers});
        
        return this.http.get(url, options)
                    .map(res => res.json())
                    .catch(error => Observable.throw(new Error(error.status)));
    }

    getteacherdata(school_id:number, id: number, token:string, tg_id:number) {

        let url: string = `${Constants.servicesURLPrefix}/school/${school_id}/teachers/${id}`;
        
        console.log("this is URL" + url);  
        let headers = new Headers({
            'X-Authorization' : 'Bearer ' + token,
            'X-Authorization_ID' : 'BearerId ' + tg_id
        });

        let options = new RequestOptions({headers: headers});
       
        return this.http.get(url, options)
                    .map(res => res.json())
                    .catch(error => Observable.throw(new Error(error.status)));
    }

    /*getstudentsdatas(student_roll_no: String) {

        let url: string = `${Constants.servicesURLPrefix}/studentdetails/${student_roll_no}`;
        
        console.log("this is URL" + url);   
        
        return this.http.get(url)
                    .map(res => res.json())
                    .catch(error => Observable.throw(new Error(error.status)));
    }*/

    studentPost(mstr:Master, class_id:number, student_roll_no:any, update_ind:string, 
                school_id:number, token:string, id:number)  
    {

        let url: string = `${Constants.servicesURLPrefix}/user_record/${class_id}/${student_roll_no}/${update_ind}/${school_id}`;
        
        console.log("this is URL" + url);
        
        let headers = new Headers({
            'X-Authorization' : 'Bearer ' + token,
            'X-Authorization_ID' : 'BearerId ' + id,
            'Content-Type': 'application/json'


        });

        let options = new RequestOptions({ headers: headers });
        
        let body = JSON.stringify(mstr);        

        return this.http.post(url,body, options)
                    .map(res => res.json())
                    .catch(error => Observable.throw(new Error(error.status)));
    }


    /*studentput(teacher:Teacher_class[],teacher_id:any)  
    {

        let url: string = `${Constants.servicesURLPrefix}/class/${teacher_id}/teacher`;
        
        console.log("this is URL" + url);
        
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        
        let body = JSON.stringify(teacher);        

        return this.http.put(url,body, options)
                    .map(res => res.json())
                    .catch(error => Observable.throw(new Error(error.status)));
    }*/

     updateTeacherclass(teacher:Teacher[],teacher_number:any,update_ind:string, school_id:number,
                         token: string, id:number)  
    {

        let url: string = `${Constants.servicesURLPrefix}/teacher/${teacher_number}/${update_ind}/${school_id}`;
        
        console.log("this is URL" + url);
        
        let headers = new Headers({
            'X-Authorization' : 'Bearer ' + token,
            'X-Authorization_ID' : 'BearerId ' + id,
            'Content-Type': 'application/json'


        });

        let options = new RequestOptions({ headers: headers });
        
        let body = JSON.stringify(teacher);        

        return this.http.post(url,body, options)
                    .map(res => res.json())
                    .catch(error => Observable.throw(new Error(error.status)));
    }

    teacherpost(teacher:Teacher[],teacher_number:any, school_id:number, token:string, id:number)  
    {

        let url: string = `${Constants.servicesURLPrefix}/user_record/${teacher_number}/${school_id}/teacher`;
        
        console.log("this is URL" + url);
        
        let headers = new Headers({
            'X-Authorization' : 'Bearer ' + token,
            'X-Authorization_ID' : 'BearerId ' + id,
            'Content-Type': 'application/json'


        });

        let options = new RequestOptions({ headers: headers });
        
        let body = JSON.stringify(teacher);        

        return this.http.post(url,body, options)
                    .map(res => res.json())
                    .catch(error => Observable.throw(new Error(error.status)));
    }

    teacherdelete(teacher_id:number, teacher_number:any, school_id:number, token:string, id:number)  
    {

        let url: string = `${Constants.servicesURLPrefix}/teacher/${teacher_id}/${teacher_number}/${school_id}/delete`;
        
        console.log("this is URL" + url);
        
        let headers = new Headers({
            'X-Authorization' : 'Bearer ' + token,
            'X-Authorization_ID' : 'BearerId ' + id,
            'Content-Type': 'application/json'
        });
        let options = new RequestOptions({ headers: headers });
     
        let body = JSON.stringify(teacher_number);        

        return this.http.put(url,body, options)
                    .map(res => res.json())
                    .catch(error => Observable.throw(new Error(error.status)));
    }

    getteacherattendance(date:string, token:string, tg_id:number) {

        let url: string = `${Constants.servicesURLPrefix}/teacher/${date}/teacher_attendance`;
        
        console.log("this is URL" + url);  
        let headers = new Headers({
            'X-Authorization' : 'Bearer ' + token,
            'X-Authorization_ID' : 'BearerId ' + tg_id
        });

        let options = new RequestOptions({headers: headers});
       
        return this.http.get(url, options)
                    .map(res => res.json())
                    .catch(error => Observable.throw(new Error(error.status)));
    }

updateteacherattendance( date:string, attendance: Teacher_class[], token:string, id:number)
    {
        let url: string = `${Constants.servicesURLPrefix}/teacher/${date}/attendance`;
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

}