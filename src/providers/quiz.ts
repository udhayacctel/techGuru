import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { Quizzr } from '../models/quizzr';
import { Constants } from '../utilities/Constants';

@Injectable()
export class QuizProv {

    constructor(public http: Http) {}


   getQuestions(quiz_type: any, token:string, id:number) 
    
    {
        console.log("Value in provider " + quiz_type)
        let url: string = `${Constants.servicesURLPrefix}/schools/${quiz_type}/quiz_structure`;
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


    addQuiz(quiz_type:any, quiz:Quizzr[], token:string, id:number)  
    {
        let url: string = `${Constants.servicesURLPrefix}/school/${quiz_type}/quiz_structure`;

        console.log("this is URL" + url);
        let headers = new Headers({
            'X-Authorization' : 'Bearer ' + token,
            'X-Authorization_ID' : 'BearerId ' + id,
            'Content-Type': 'application/json'

        });
        
        let options = new RequestOptions({ headers: headers });
        
        let body = JSON.stringify(quiz);        
       console.log("i'm coming in quiz provider") 

        return this.http.put(url,body,options)
                    .map(res => res.json())
                    .catch(error => Observable.throw(new Error(error.status)));
    }


}
















