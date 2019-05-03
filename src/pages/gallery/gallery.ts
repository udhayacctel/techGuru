import { Component, Directive, ViewChild} from '@angular/core';
import { NavController, NavParams,AlertController } from 'ionic-angular';
import { PopoverPage } from '../../pages/popover/popover'
import { PopoverController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { GlobalVars } from '../../providers/global-provider';
import { ItemSliding } from 'ionic-angular';
import { Camera,CameraOptions,MediaType } from '@ionic-native/camera';
import { SchoolImage } from '../../models/schoolImage';
import { ActionSheetController } from 'ionic-angular';
import { ImageProvider } from '../../providers/image';
import { Slides }  from 'ionic-angular';
import { MediaCapture, CaptureVideoOptions, MediaFile, CaptureError } from '@ionic-native/media-capture';
import { Media, MediaObject } from '@ionic-native/media';
import { File } from '@ionic-native/file';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';

var window:any;

@Component({
    selector: 'gallery-view',
    templateUrl: 'gallery.html',

})
export class Gallery {

    loader: any;
    token:string;
    school_id:number;
    id:number;
    segment:any;
    base64Image: string;
    url: string;
    ht:number;
    qlt:number;
    schoolimage:SchoolImage[];
    image: string;
    tg_id:any;
    update_ind:any;
    
    @ViewChild(Slides) slides: Slides;
    @ViewChild('myvideo') myVideo: any;
    
    constructor(public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController,
                public alertCtrl:AlertController, public toastCtrl: ToastController,public globalVars: GlobalVars,
                public loadingController: LoadingController ,private camera:Camera, 
                public actionSheetCtrl: ActionSheetController,public imageProvider:ImageProvider,
                private mediaCapture: MediaCapture,private file: File, private media: Media,
                private fileTransfer: FileTransfer){

                    this.token   = this.globalVars.getMyGlobalToken();
                    this.tg_id = this.globalVars.getMyGlobalUserId();   
                    this.school_id = this.globalVars.getMyGlobalschool();
                    this.segment = "Images";
                    this.segselected()
                    
        }

    segselected() {

        switch (this.segment) {

            case "Images":
                {
                     this.schoolimage = [];
                     this.update_ind = 'I'                     
                     this.getimage(this.school_id, this.update_ind, this.token, this.tg_id)

                    break;
                }
            case "Videos":
                {
                 
                    break;
                }
        }
    }

    loading() {

        this.loader = this.loadingController.create({
            content: "Please wait"
        });
        this.loader.present();

    }

    successToastreturn(msg, pos) {
        
                let toast = this.toastCtrl.create({
                    message: msg,
                    duration: 1000,
                    position: pos
                });
                toast.present();
            }
        
    errorToast(msg, pos) {
                let toast = this.toastCtrl.create({
                    message: msg,
                    duration: 1000,
                    position: pos
                });
                toast.present();
        
            }

    selectPicture(){
        
                let cameraOptions = {

                allowEdit: true,

                sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
        
                destinationType: this.camera.DestinationType.DATA_URL, //Camera.DestinationType.FILE_URI,      
        
                quality: 100,
        
             //   targetWidth: ht,
        
             //   targetHeight: ht,
        
                encodingType: this.camera.EncodingType.JPEG,      
        
                correctOrientation: true

                
        
            } 
        
                this.camera.getPicture(cameraOptions)
        
                .then((imageData) => {
        
                // imageData is a base64 encoded string
        
                this.base64Image = "data:image/jpeg;base64," + imageData;
        
                let scimage = new SchoolImage();
    
                scimage.base64img = this.base64Image;

                this.school_id = this.globalVars.getMyGlobalschool();

        
                this.imageProvider
        
                .galleryimage(this.school_id,scimage,this.token,this.tg_id)
    
                .subscribe(res => {this.successToastreturn("Successfully uploaded", "center"),this.reload()},
        
                          err => {this.errorToast("Failed to upload: ","center")}
        
                          );  
        
                }, (err) => {
        
                    this.errorToast("Failed to get picture: ","center");
        
                });
        
            }
        
    takePicture()
        
            {
        
            this.camera.getPicture({

                allowEdit: true,
        
                destinationType: this.camera.DestinationType.DATA_URL,
        
                quality: 100,
        
             //   targetWidth: ht,
        
             //   targetHeight: ht,
        
            }).then((imageData) => {
        
              // imageData is a base64 encoded string
        
                this.base64Image = "data:image/jpeg;base64," + imageData;
        
                let scimage = new SchoolImage();
        
                scimage.base64img = this.base64Image;
                
                this.school_id = this.globalVars.getMyGlobalschool();                

                this.imageProvider
        
                .galleryimage(this.school_id, scimage, this.token, this.tg_id)
        
                .subscribe(res => {this.successToastreturn("successfully uploaded","center"),this.reload()},
        
                          err => {this.errorToast("Failed to upload: ", "center")}
        
                          );  
        
            }, (err) => {
        
                this.errorToast("Failed to upload: ", "center");
        
            });
        
          }


    
   presentActionSheet() {
    
        let actionSheet = this.actionSheetCtrl.create({
      title: 'Upload Gallery',
      buttons: [
        {
          text: 'Gallery',
          icon:"folder",
          handler: () => {
         
              this.selectPicture()


          }
        },
        {
          text: 'Camera',
          icon:"camera",
          handler: () => {

            this.takePicture()
            
          }
    
        },

        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
        
          }
        }
      ]
    });
 
    actionSheet.present();
  }

  getimage(school_id: number,update_ind:string,  token:string, tg_id:number) {

    console.log ("I am coming here to fetch image sessions")
    this.imageProvider
                .getgalleryimage(school_id, update_ind, token, tg_id)
                .subscribe(res => { this.schoolimage = < SchoolImage[] > res, this.loader.dismiss(), this.check(), console.log("i am in the success part")
                    },
                           err => {console.log("i am in the error part")
                    });
        }
        
    check(){
            console.log("gallery image")
            for(let i of this.schoolimage){
                this.image = i.url
                console.log(i.url + i.id +"check")
                     console.log("image" + i.url + this.image)
            }
       }

    imagedelete(id:number, token:string, tg_id:number) {
        this.imageProvider
            .deleteImage(id, token, tg_id)
            .subscribe(res => {
                this.loader.dismiss(), this.successToastreturn('Image deleted Successfully', 'middle'),this.reload()
                },
                err => {
                    this.errorToast('Image not deleted', 'middle')
                });
    }

    reload() {
                     this.schoolimage=[]
                     this.getimage(this.school_id, this.update_ind, this.token, this.tg_id)
    }

    delete(x) {

        let alert = this.alertCtrl.create({
            title: 'Delete Image',
            message: 'Do you really want to delete?',
            buttons: [{
                    text: 'Delete ',
                    handler: () => {
                        this.loading();                        
                        this.imagedelete(x.id, this.token, this.tg_id)
                    }
                },
                {
                    text: 'cancel ',
                    handler: () => {
                        console.log("Delete cancel");

                    }
                }
            ]
        });
        alert.present();

    }


    ActionSheet() {
            
                let actionSheet = this.actionSheetCtrl.create({
              title: 'Upload Gallery',
              buttons: [
                {
                  text: 'Gallery',
                  icon:"folder",
                  handler: () => {
                      
                    this.transferVideo(this.file) 
                    
              
                  }
                },
                {
                  text: 'Camera',
                  icon:"camera",
                  handler: () => {

                    this.recordRealVideo()
        
                }
            
                },
        
                {
                  text: 'Cancel',
                  role: 'cancel',
                  handler: () => {
                
                  }
                }
              ]
            });
         
            actionSheet.present();
          }
        
        
        
    slideChanged(){

       let currentIndex = this.slides.getActiveIndex();

       console.log("Current Index" + currentIndex)
      }  
 
      recordRealVideo(){
        let scimage = new SchoolImage();   
        
            let options: CaptureVideoOptions = {
                limit: 1,
                duration: 5 
                
            };
        
            this.mediaCapture.captureVideo(options).then((res: MediaFile[]) => {
                let capturedFile = res[0];
                let fileName = capturedFile.name;
                let dir = capturedFile['localURL'].split('/');
                dir.pop();
                 let fromDirectory = dir.join('/');      
                var toDirectory = this.file.dataDirectory;
                this.file.copyFile(fromDirectory , fileName , toDirectory , fileName)
                    .then((res) => 
                    {            
                         let scimage = new SchoolImage();
                         this.imageProvider
                        .uploadVideo(this.school_id, scimage, this.token, this.tg_id)
                        .subscribe(res => {this.successToastreturn("Successfully uploaded", "center")},
                        
                                   err => {this.errorToast("Failed to upload: ","center")}
                        
                      );   

                  });          
                });  
            
         }


         transferVideo(myFile) 
         { 
             
            
         let options: 
         FileUploadOptions =  {      
            
                 fileKey: 'ionicfile',     
                 fileName: 'ionicfile',      
                 chunkedMode: false,      
                 mimeType: "video/mp4",      
                 headers: {}   
                 }
                 let path = this.file.dataDirectory + myFile.name;    
                 let url = path.replace(/^file:\/\//, '');    
                 var ft: FileTransferObject = this.fileTransfer.create();    
                 ft.upload(url, 'http://192.168.1.14:9090/uploadVideo', options)      
                 .then((data) => { 
                     let scimage = new SchoolImage();
                     this.imageProvider
                    .uploadVideo(this.school_id, scimage,this.token, this.tg_id)
                    .subscribe(res => {this.successToastreturn("Successfully uploaded", "center")},
                    
                               err => {this.errorToast("Failed to upload: ","center")
                            
                            });  
                 }); 
                 }
      /*   VideoUpload(school_id: number, scimage: SchoolImage, token: string,tg_id:number) {
         this.imageProvider
        .uploadvideo(this.school_id,scimage, token, tg_id)
        .subscribe(res => {
                 this.successToastreturn("Successfully uploaded", "center")
            },
            err => {
                 this.errorToast("Failed to upload: ","center")
            });
}
*/                         
      
    presentPopover(myEvent) {
        
    let popover = this.popoverCtrl.create(PopoverPage, {
        
    });
        
    popover.present({
    ev: myEvent
        
    });
        
  }
}