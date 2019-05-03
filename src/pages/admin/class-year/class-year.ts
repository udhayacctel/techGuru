import { Component,OnInit } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { ClassProvider } from '../../../providers/class-provider';
import { School_class_year } from '../../../models/school_class_year';
import { ToastController } from 'ionic-angular';
import { GlobalVars } from '../../../providers/global-provider';
import { PopoverPage } from '../../../pages/popover/popover';
import { PopoverController } from 'ionic-angular';

@Component({
    templateUrl: 'class-year.html',
    selector: 'class-year',
    providers: [ClassProvider]
})
export class ClassYear {

    schoolID: any;
    listnew: string;
    acad_year:string;
    secClass: School_class_year[];
    cls: School_class_year[];
    uniq_sec: School_class_year[];
    loader: any;
    selected_standard : string;
    selected_section : string;
    selected_year:string;
    standard : School_class_year = new School_class_year();
    id:any;
    token:string;

    constructor(public navCtrl: NavController, public classProvider: ClassProvider,
                public globalVars: GlobalVars,public toastCtrl: ToastController, 
                public popoverCtrl: PopoverController, public loadingController: LoadingController,
                public alertCtrl: AlertController) {

        this.cls = new Array < School_class_year > ();
        this.uniq_sec = new Array < School_class_year > ();

        this.schoolID = this.globalVars.getMyGlobalschool()
        this.acad_year = this.globalVars.getMyGlobalacad_yr()
        this.globalVars.setMyGlobalSchool(this.schoolID, this.acad_year)
        this.token   = this.globalVars.getMyGlobalToken();     
        this.id = this.globalVars.getMyGlobalUserId();   
        this.listnew = "list";
        this.segment();
    }

     /* *********************************************************************************************************************************
     *  Filter the class to get the unique
     *  Output to pass the Unique class                                                                                    
     ************************************************************************************************************************************/
    getUniq_cls() {
        /* Logic to get the unique classes  */
        console.log("the value of getting the unique class")
        let k = 0
        let c:School_class_year[] = new Array < School_class_year > ();
        let d:School_class_year[] = new Array < School_class_year > ();

        for (let i = 0; i < this.secClass.length; i++) {

            k = this.secClass.length
            if (i == (this.secClass.length - 1)) {
                this.cls.push(this.secClass[i])
            }

            for (let j = i; j < k; j++) {

                if (this.secClass[i].standard != this.secClass[j].standard) {
                    this.cls.push(this.secClass[i])
                    k = j
                    i = j - 1
                }
            }
        }

   /* Trying to sort the class, since we are storing as string, standard 10 is always < standard 2 */
   /* So instead of sorting, place 10, 11, 12 after standard 9 */

        let j:number = 0
        j = c.length - 1
        for (let k=0; k<c.length; k++) {

            if (c[k].standard == "10" || c[k].standard == "11" || c[k].standard == "12") {
                    d.push(c[k])

             } else {
            
                 this.cls.push(c[k])
             
            }
 
               if(c[k].standard == "9" || k == j || c[k+1].standard > "9") {

                    for (let u = 0; u < d.length; u++) {

                         this.cls.push(d[u])

               }

                    d = []
        }

    }


    }

    /* *********************************************************************************************************************************
     *  Filter the section to get the unique
     *  Output to pass the Unique section                                                                                    
     ************************************************************************************************************************************/

    getUniq_sec() {

//        console.log("the value of getting the unique section")
        this.uniq_sec = []
        let z = 0
        for (let i = 0; i < this.secClass.length; i++) {
            z = this.secClass.length
            if (i == (this.secClass.length - 1)) {
                this.uniq_sec.push(this.secClass[i])
            }
            for (let j = i; j < z; j++) {

                if (this.secClass[i].standard != this.secClass[j].standard || this.secClass[i].section != this.secClass[j].section) {
                    this.uniq_sec.push(this.secClass[i])
                    z = j
                    i = j - 1
                }
            }
        }

        this.globalVars.setMyGlobalAllClass(this.secClass)
        this.globalVars.setMyGlobalClass(this.cls, this.uniq_sec)

    }
    /* *********************************************************************************************************************************
     *  All the Services call would start from here                                                                                   ***    
     ************************************************************************************************************************************/
    /* Get the list of standards and sections   */
    /* Pass input parameter as the school id    */
    /* Get the Output as the Classed available in the school; Get in the array format */

    fetchstandard(school_id: number, acad_year: string, token:string, id:number) {
        this.classProvider
            .getAllClassesForSchool(school_id, acad_year,token, id)
            .subscribe(res => {
                            this.secClass = < School_class_year[] > res, this.getUniq_cls(), this.getUniq_sec(),
                            this.loading(),this.loader.dismiss()},
                       err => {
                            this.loader.dismiss()
                });
    }

    remove(school_id:number, id: any, token:string, tg_id:number) {
        this.classProvider
            .removeclass(school_id, id, token, tg_id)
            .subscribe(res => {
                     this.loader.dismiss(), this.successToastreturn('Record deleted','middle'),this.reload()},
                err => {
                     this.message(), this.loader.dismiss()
                }
            );
    }

    message(){
        let alert = this.alertCtrl.create({
            title: 'Sorry',
            message: 'Class is refered for other details',
            buttons: [{
                    text: 'OK',
                    handler: () => {
                        }
                },
            ]
        });
        alert.present();
    }
    
    
    reload(){
    
         this.secClass = [];   

         this.fetchstandard(this.schoolID, this.acad_year, this.token, this.id);
    }
    
    delete(x){
        
        let alert = this.alertCtrl.create({
            title: 'Class Delete',
            message: 'Do you Really want to Delete?',
            buttons: [{
                    text: 'Delete ',
                    handler: () => {
                        this.loading();
                        this.remove(this.schoolID, x.id, this.token, this.id)
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
  
    addclass(csy: School_class_year, school_id: any, token:string, id:number) {
       this.classProvider
        .createNewClass(csy,  this.schoolID,token, id)
        .subscribe(res => { this.successToastreturn('Record updated', 'middle'), this.resetform()},
                  err => {this.errorToast('Record not updated', 'middle')}
                  );
    }

    createNew(){
        this.standard.standard = this.selected_standard
        this.standard.section = this.selected_section
        this.standard.acad_year = this.selected_year

        this.addclass(this.standard, this.schoolID, this.token, this.id)

    }

    resetform(){
        this.selected_standard=''
        this.selected_section = ''
        this.selected_year = ''
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

    segment(){
        switch (this.listnew){
            case "list":
            {
                        this.secClass = [];   
                        this.fetchstandard(this.schoolID, this.acad_year,this.token, this.id);
                        break;
            }
            case "create":{
                break;
            }
        }
    }

    presentPopover(myEvent) {

        let popover = this.popoverCtrl.create(PopoverPage, {
        });
        popover.present({
            ev: myEvent
        });
    }

}