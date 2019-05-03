import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { Quiz } from '../models/quiz';
import { Constants } from '../utilities/Constants';


 @Injectable()
export class QuizProvider {

    constructor(public http: Http) {}
/*********************************************************************************************************** */
    addQuiz(prvdr_quiz_admin_quiz:Quiz, class_id:number, subject_id:number, token:string, id:number)  
    {
        let url: string = `${Constants.servicesURLPrefix}/quiz/${class_id}/${subject_id}`;

        console.log("this is URL" + url);
        let headers = new Headers({
            'X-Authorization' : 'Bearer ' + token,
            'X-Authorization_ID' : 'BearerId ' + id,
            'Content-Type': 'application/json'

        });
        
        let options = new RequestOptions({ headers: headers });
        
        let body = JSON.stringify(prvdr_quiz_admin_quiz);        
       console.log("i'm coming in quiz provider") 

        return this.http.post(url,body, options)
                    .map(res => res.json())
                    .catch(error => Observable.throw(new Error(error.status)));
    }

    getQuestions( class_id: number,subject_id: string, token:string, id:number) 
    
    {
        console.log("Value in provider " + subject_id)
        let url: string = `${Constants.servicesURLPrefix}/quiz/${class_id}/${subject_id}`;
       console.log("i'm coming in quiz provider") 
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
}



/************************************************************************************************************* */
    

