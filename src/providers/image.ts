import { SchoolImage } from '../models/schoolImage';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { Constants } from '../utilities/Constants';

@Injectable()

export class ImageProvider{

    constructor(public http: Http) {}

getimage(tg_id:number, token:string, id:number)
    {
          let url: string = `${Constants.servicesURLPrefix}/schools/${tg_id}/classes`;
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

addImageToSchool(tg_id: number, scimage: SchoolImage, token:string, id:number)

    {

        let url: string = `${Constants.servicesURLPrefix}/schools/${tg_id}/images`;   

        let headers = new Headers({  
            
        'X-Authorization' : 'Bearer ' + token,
        'X-Authorization_ID' : 'BearerId ' + id,
        'Content-Type': 'application/json' 
    
    });

        let options = new RequestOptions({ headers: headers });

        let body = JSON.stringify(scimage);        

        return this.http.post(url,body, options)

                    .map(res => res.json())

                    .catch(error => Observable.throw(new Error(error.status)));

    }


galleryimage(school_id: number, scimage: SchoolImage, token: string, id:number){

    let url: string = `${Constants.servicesURLPrefix}/schools/${school_id}/gallery_images`;
    
            let headers = new Headers({ 
                'X-Authorization' : 'Bearer ' + token,
                'X-Authorization_ID' : 'BearerId ' + id,
                'Content-Type': 'application/json' 
     });
    
            let options = new RequestOptions({ headers: headers });
                 
            let body = JSON.stringify(scimage);        
        
            return this.http.post(url,body, options)
    
                        .map(res => res.json())
    
                        .catch(error => Observable.throw(new Error(error.status)));

  }

 /* galleryvideo(school_id: number, scimage: SchoolImage, token:string, id:number){
    
        let url: string = `${Constants.servicesURLPrefix}/schools/${school_id}/gallery_video`;
        
                let headers = new Headers({ 
                    'X-Authorization' : 'Bearer ' + token,
                    'X-Authorization_ID' : 'BearerId ' + id,
                    'Content-Type': 'application/json' 
     });
        
                let options = new RequestOptions({ headers: headers });
        
                let body = JSON.stringify(scimage);        

                
                return this.http.post(url,body, options)
        
                            .map(res => res.json())
        
                            .catch(error => Observable.throw(new Error(error.status)));
    
      } */
      


   uploadVideo(school_id:number, scimage: SchoolImage, token:string, id:number){
        
            let url: string = `${Constants.servicesURLPrefix}/${school_id}/uploadVideo`;
            
                    let headers = new Headers({ 
                        'X-Authorization' : 'Bearer ' + token,
                        'X-Authorization_ID' : 'BearerId ' + id, 
         });
            
                    let options = new RequestOptions({ headers: headers });
            
                    let body = JSON.stringify(scimage);        
     
                    return this.http.post(url,body, options)
            
                                .map(res => res.json())
            
                                .catch(error => Observable.throw(new Error(error.status)));
        
          }
    
    
        /*  uploadVideo(token:string, id:number){
        
            let url: string = `${Constants.servicesURLPrefix}/uploadVideo`;
            
                    let headers = new Headers({ 
                        'X-Authorization' : 'Bearer ' + token,
                        'X-Authorization_ID' : 'BearerId ' + id, 
         });
            
                    let options = new RequestOptions({ headers: headers });
            
                    let body = JSON.stringify(id);        
     
                    return this.http.post(url,body, options)
            
                                .map(res => res.json())
            
                                .catch(error => Observable.throw(new Error(error.status)));
        
          }*/
    

      getgalleryimage(school_id:number,update_ind:string, token:string, id:number){
    
          let url: string = `${Constants.servicesURLPrefix}/schools/${school_id}/${update_ind}/gallery`;
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
    
     deleteImage( id: number,token:string, tg_id:number){

        let url: string = `${Constants.servicesURLPrefix}/school/${id}/gallery`;

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
}