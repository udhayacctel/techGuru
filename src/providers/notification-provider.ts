import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { Notification } from '../models/notification';
import { Constants } from '../utilities/Constants';
import { Template } from '../models/template';


 @Injectable()

export class NotificationProvider {

    constructor(public http: Http) {}

/****************************************************************************************************** */
    
    getNotify( school_id: number,to_date: string, recepient:string, token:string, id:number) {

        console.log("Value in provider " + to_date )
        let url: string = `${Constants.servicesURLPrefix}/notifications/${school_id}/${to_date}/${recepient}`;
        
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

    addNotify(notify_page_notification:Notification,school_id:number, token:string, id:number)  
    {
          let url: string = `${Constants.servicesURLPrefix}/notifications/${school_id}`;
          console.log("this is URL for school" + url);
          let headers = new Headers({
            'X-Authorization' : 'Bearer ' + token,
            'X-Authorization_ID' : 'BearerId ' + id,
            'Content-Type': 'application/json'

        });
        
          let options = new RequestOptions({ headers: headers });
          
          let body = JSON.stringify(notify_page_notification);        
  
          return this.http.post(url,body, options)
                      .map(res => res.json())
                      .catch(error => Observable.throw(new Error(error.status)));
                }

    putNotify(notify_page_notification:Notification,school_id:number, id:number, token:string, tg_id:number)  
    {
        console.log("put notify");
        let url: string = `${Constants.servicesURLPrefix}/notifications/${school_id}/school/${id}`;
        console.log("this is URL" + url);
        let headers = new Headers({
            'X-Authorization' : 'Bearer ' + token,
            'X-Authorization_ID' : 'BearerId ' + tg_id,
            'Content-Type': 'application/json'

        });

        let options = new RequestOptions({ headers: headers });
        
        let body = JSON.stringify(notify_page_notification);        

        return this.http.put(url,body, options)
                    .map(res => res.json())
                    .catch(error => Observable.throw(new Error(error.status)));
    }

    deleteNotify( school_id:number, id: number,token:string, tg_id:number){
        console.log("Value in provider " + id)
        let url: string = `${Constants.servicesURLPrefix}/notifications/${school_id}/school/${id}`;

         console.log("this is URL" + url);
         let headers = new Headers({
            'X-Authorization' : 'Bearer ' + token,
            'X-Authorization_ID' : 'BearerId ' + tg_id
        });

        let options = new RequestOptions({ headers: headers });
        
        return this.http.delete(url, options)
                    .map(res => res.json())
                    .catch(error => Observable.throw(new Error(error.status)));
    }


    addCompliant( temp:Template,student_id:number, school_id:number, token:string, id:number)  
   {
      let url: string = `${Constants.servicesURLPrefix}/schools/${student_id}/${school_id}/compliant`;
      console.log("this is URL for school" + url);
      let headers = new Headers({
        'X-Authorization' : 'Bearer ' + token,
        'X-Authorization_ID' : 'BearerId ' + id,
        'Content-Type': 'application/json'

    });
    
      let options = new RequestOptions({ headers: headers });
      
      let body = JSON.stringify(temp);        

      return this.http.put(url,body, options)
                  .map(res => res.json())
                  .catch(error => Observable.throw(new Error(error.status)));
            }


    getCompliant( school_id: number, update_ind:any, token:string, id:number) {
                
     let url: string = `${Constants.servicesURLPrefix}/schools/${school_id}/${update_ind}/compliant`;
                        
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
     
    
     deleteCompliant(id: number, token:string, tg_id:number) {
                        
     let url: string = `${Constants.servicesURLPrefix}/schools/${id}/compliant`;
                    
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
       
   /* addSuggestion( temp:Template, school_id:number, token:string, id:number)  
    {
       let url: string = `${Constants.servicesURLPrefix}/schools/${school_id}/complaint`;
       console.log("this is URL for school" + url);
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
 
*/
        }

        
/******************************************************************************************************* */

 
