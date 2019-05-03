import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { Subject } from '../models/subject';
import { Teacher } from '../models/teacher';
import { ClassReferenceTime } from '../models/classReferenceTime';
import { TimeTable } from '../models/timetable';
import { Teacher_class } from '../models/teacher_class';
import { Attendance } from '../models/attendance';
import { Subject_class } from '../models/subject_class';
import { School_class_year } from '../models/school_class_year';
import { Constants } from '../utilities/Constants';
import { Template } from '../models/template';

 @Injectable()
export class ClassProvider {

    constructor(public http: Http) {}

    createNewClass(csy:School_class_year,school_id:number, token:string, id:number)
    {
        let url: string = `${Constants.servicesURLPrefix}/schools/${school_id}/classes`;
        console.log ("url for subject" + url)        
        
        let headers = new Headers({
            'X-Authorization' : 'Bearer ' + token,
            'X-Authorization_ID' : 'BearerId ' + id,
            'Content-Type': 'application/json'

        });

        let options = new RequestOptions({ headers: headers });
    
        let body = JSON.stringify(csy);        

        return this.http.post(url,body, options)
                    .map(res => res.json())
                    .catch(error => Observable.throw(new Error(error.status)));

    }

    getAllClassesForSchool(school_id: number, acad_year:string, token:string, id:number)
    {
        let url: string = `${Constants.servicesURLPrefix}/schools/${school_id}/acad_year/${acad_year}/classes`;
        let headers = new Headers({
            'X-Authorization' : 'Bearer ' + token,
            'X-Authorization_ID' : 'BearerId ' + id
        });

        let options = new RequestOptions({headers: headers});

        return this.http.get(url,options)
                    .map(res => res.json())
                    .catch(error => Observable.throw(new Error(error.status)));
    }

    removeclass( school_id:number, id: any, token:string, tg_id:number)
    {
        let url: string = `${Constants.servicesURLPrefix}/schools/${school_id}/${id}/classes`;
        console.log("link" + url)
        let headers = new Headers({
            'X-Authorization' : 'Bearer ' + token,
            'X-Authorization_ID' : 'BearerId ' + tg_id
        });

        let options = new RequestOptions({headers: headers});

        return this.http.delete(url,options)
                    .map(res => res.json())
                    .catch(error => Observable.throw(new Error(error.status)));
    }


    getStudentForAttendance(tt_id:number, date: string, class_id:number, token:string, id:number)
    {

        let url: string = `${Constants.servicesURLPrefix}/attendance/${tt_id}/${date}/${class_id}/list`;
        console.log("URL value" + url);
        let headers = new Headers({
            'X-Authorization' : 'Bearer ' + token,
            'X-Authorization_ID' : 'BearerId ' + id

        });

        let options = new RequestOptions({headers: headers});
        
        return this.http.get(url, options)
                    .map(res => res.json())
                    .catch(error => Observable.throw(new Error(error.status)));
    }


/********************************************************************************************************/
    getStudentForClass(class_id:number, token:string, id:number)
    {

        let url: string = `${Constants.servicesURLPrefix}/student/${class_id}/class`;
        console.log("URL value" + url);
        let headers = new Headers({
            'X-Authorization' : 'Bearer ' + token,
            'X-Authorization_ID' : 'BearerId ' + id

        });

        let options = new RequestOptions({headers: headers});
        
        return this.http.get(url, options)
                    .map(res => res.json())
                    .catch(error => Observable.throw(new Error(error.status)));
    }

    getTeacherForClass(class_id:number, token:string, id:number)
    {

        let url: string = `${Constants.servicesURLPrefix}/classes/${class_id}/teacher`;
        console.log("URL value" + url);
        let headers = new Headers({
            'X-Authorization' : 'Bearer ' + token,
            'X-Authorization_ID' : 'BearerId ' + id

        });

        let options = new RequestOptions({headers: headers});
        
        return this.http.get(url, options)
                    .map(res => res.json())
                    .catch(error => Observable.throw(new Error(error.status)));
    }

    getstudentForattendance(class_id: number, student_id:number, token: string, id:number)
    {  
        let url: string = `${Constants.servicesURLPrefix}/classes/${class_id}/${student_id}/absent_list`;
        console.log("URL" + url)
        let headers = new Headers({
            'X-Authorization' : 'Bearer ' + token,
            'X-Authorization_ID' : 'BearerId ' + id

        });

        let options = new RequestOptions({headers: headers});

        return this.http.get(url, options)
                    .map(res => res.json())
                    .catch(error => Observable.throw(new Error(error.status)));
    }    

    
    updateAttendance( tt_id: number, class_id:number, attendance: Attendance[], token:string, id:number)
    {
        let url: string = `${Constants.servicesURLPrefix}/classes/${tt_id}/class/${class_id}/attendance`;
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
  
    
    getAllRefTimes(class_id: number, token:string, id:number)
    {
        let url: string = `${Constants.servicesURLPrefix}/classes/${class_id}/referencetimes`;
        console.log("the value of the period ger URL" + url)
        let headers = new Headers({
            'X-Authorization' : 'Bearer ' + token,
            'X-Authorization_ID' : 'BearerId ' + id
        });

        let options = new RequestOptions({headers: headers});

 
        return this.http.get(url, options)
                    .map(res => res.json())
                    .catch(error => Observable.throw(new Error(error.status)));
    }

    addRefTime(class_id: number, crt: ClassReferenceTime[], token:string, id:number)
    
    {
        let url: string = `${Constants.servicesURLPrefix}/period_reference/${class_id}/class`;
        
        let headers = new Headers({
            'X-Authorization' : 'Bearer ' + token,
            'X-Authorization_ID' : 'BearerId ' + id,
            'Content-Type': 'application/json'

        });

        let options = new RequestOptions({ headers: headers });
        
        let body = JSON.stringify(crt);        

        return this.http.put(url,body, options)
                    .map(res => res.json())
                    .catch(error => Observable.throw(new Error(error.status)));
    }

    removeperiod(class_id: number, period:ClassReferenceTime[], token:string, id:number)
    {
        let url: string = `${Constants.servicesURLPrefix}/classreference/${class_id}/delete`;

        let headers = new Headers({
            'X-Authorization' : 'Bearer ' + token,
            'X-Authorization_ID' : 'BearerId ' + id,
            'Content-Type': 'application/json'

        });

        let options = new RequestOptions({ headers: headers });
        
        let body = JSON.stringify(period);        

        return this.http.put(url,body, options)
                    .map(res => res.json())
                    .catch(error => Observable.throw(new Error(error.status)));
    }    

    getAllSubjects(class_id: number, token:string, id:number)
    {
        let url: string = `${Constants.servicesURLPrefix}/subjects/${class_id}/classes`;
        console.log('we are in'+url);
        let headers = new Headers({
            'X-Authorization' : 'Bearer ' + token,
            'X-Authorization_ID' : 'BearerId ' + id
        });

        let options = new RequestOptions({headers: headers});
  
        return this.http.get(url, options)
                .map(res => res.json())
                .catch(error => Observable.throw(new Error(error.status)));

    }

    addSubject(sub: Subject_class[], class_id:number,token:string, id:number)
    {
     
        let url: string = `${Constants.servicesURLPrefix}/subject/class/${class_id}`;
        console.log ("url for subject" + url)        
        
        let headers = new Headers({
            'X-Authorization' : 'Bearer ' + token,
            'X-Authorization_ID' : 'BearerId ' + id,
             'Content-Type': 'application/json'

        });

        let options = new RequestOptions({ headers: headers });
        
        let body = JSON.stringify(sub);        

        return this.http.put(url,body, options)
                    .map(res => res.json())
                    .catch(error => Observable.throw(new Error(error.status)));
    }

    removesubject(sub: Subject_class[], class_id:number, token:string, id:number)
    {
        let url: string = `${Constants.servicesURLPrefix}/subject/${class_id}/delete`;

        let headers = new Headers({
            'X-Authorization' : 'Bearer ' + token,
            'X-Authorization_ID' : 'BearerId ' + id,
            'Content-Type': 'application/json'

        });
        
        let options = new RequestOptions({ headers: headers });
        
        let body = JSON.stringify(sub);        

        return this.http.put(url,body,options )
                    .map(res => res.json())
                    .catch(error => Observable.throw(new Error(error.status)));
    }    
    


getTemplate(school_id: number, token:string, id:number)
{
    let url: string = `${Constants.servicesURLPrefix}/schools/${school_id}/template`;
    console.log("the value of the period ger URL" + url)

    let headers = new Headers({
        'X-Authorization' : 'Bearer ' + token,
        'X-Authorization_ID' : 'BearerId ' + id
    });

    let options = new RequestOptions({headers: headers});


    return this.http.get(url, options)
                .map(res => res.json())
                .catch(error => Observable.throw(new Error(error.status)));
}

addTemplate(school_id: number, temp: Template, token:string, id:number)

{
    let url: string = `${Constants.servicesURLPrefix}/schools/${school_id}/template`;
    
    let headers = new Headers({
        'X-Authorization' : 'Bearer ' + token,
        'X-Authorization_ID' : 'BearerId ' + id,
        'Content-Type': 'application/json'

    });

    let options = new RequestOptions({ headers: headers });
    
    let body = JSON.stringify(temp);        

    return this.http.post(url,body, options)
                .map(res => res.json())
                .catch(error => Observable.throw(new Error(error.status)));
}

removeTemplate(id: number, token:string, tg_id:number)
{
    let url: string = `${Constants.servicesURLPrefix}/schools/${id}/template`;

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

}
 /********************************************************************************************************/   





