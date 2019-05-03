import { Component } from '@angular/core';
import { NavController, NavParams,AlertController } from 'ionic-angular';
import { ClassProvider } from '../../providers/class-provider';
import { ClassReferenceTime } from '../../models/classReferenceTime';
import { LoadingController } from 'ionic-angular';
import { School_class_year } from '../../models/school_class_year';
import { ToastController } from 'ionic-angular';
import { Subject_class } from '../../models/subject_class';
import { Home } from '../../pages/home/home';
import { GlobalVars } from '../../providers/global-provider';
import { PopoverPage} from '../../pages/popover/popover';
import { PopoverController } from 'ionic-angular';


@Component({
    selector: 'subject-page',
    templateUrl: 'subject.html',

})
export class Subject {

    class_id_all: number[];
    standard: School_class_year[];
    loader: any;
    school_id: any;
    subject_class: Subject_class[];
    selected_standard: any;
    selected_subject: any;
    id: any;
    subject: any;
    selectedClassID: number;
    token:string;

    constructor(public alertCtrl: AlertController, public navCtrl: NavController,
        navParams: NavParams, public classProvider: ClassProvider, public globalVars: GlobalVars,
        public loadingController: LoadingController, public toastController: ToastController,
        public popoverCtrl: PopoverController) {
        this.standard = this.globalVars.getMyGlobalclass()
        this.school_id = this.globalVars.getMyGlobalschool()
        this.token   = this.globalVars.getMyGlobalToken();
        this.id = this.globalVars.getMyGlobalUserId();

    }

    save() {

         
     if ((this.selected_standard === undefined || this.selected_standard == null || this.selected_standard.length <= 0) ||
        (this.selected_subject=== undefined || this.selected_subject== null || this.selected_subject.length <= 0)) {
            
            let alert = this.alertCtrl.create({
                message: 'Please Fill all the Fields',
                buttons: [{
                    text: 'OK'
                }]
            });
            alert.present();

        } else {

        this.class_id_all = this.globalVars.getMyGlobalAllClass_id(this.selected_standard)
        let sub: Subject_class[] = new Array < Subject_class > ()

        for (let x of this.class_id_all) {

            let y: Subject_class = new Subject_class()

            y.class_id = x
            y.subject = this.selected_subject

            sub.push(y)

        }
        this.addsubjectclass(sub, this.selected_standard, this.token, this.id)
        this.loading()
        }

    }

    addsubjectclass(sub: Subject_class[], class_id:number, token:string, id:number) {
        this.classProvider
            .addSubject(sub,class_id, token, id)
            .subscribe(res => {
                    this.successToastreturn('Record updated', 'middle'), this.update_globalVar(this.token, this.id), this.loader.dismiss(), this.reload()
                },
                err => {
                       this.errorToast('Record not updated', 'middle'), this.loader.dismiss();
                }
            );
    }


    getsubject(class_id: number, token:string, id:number) {
        console.log("myClassid" + class_id)
        this.classProvider
            .getAllSubjects(class_id, token, id)
            .subscribe(res => {
                    this.subject_class = < Subject_class[] > res, this.loader.dismiss()
                },
                err => {
                    this.errorToast('Record not loaded', 'middle');
                    this.loader.dismiss()
                }
            );
    }

    ngOninit() {
        this.loading();

    }

    loading() {
        this.loader = this.loadingController.create({
            content: "Please wait"
        });
        this.loader.present();

    }
    successToastreturn(msg, pos) {

        let toast = this.toastController.create({
            message: msg,
            duration: 1000,
            position: pos
        });
        toast.present();
    }

    errorToast(msg, pos) {
        let toast = this.toastController.create({
            message: msg,
            duration: 1000,
            position: pos
        });
        toast.present();

    }

    remove(sub: Subject_class[], class_id:number, token:string, id:number) {
        this.classProvider
            .removesubject(sub, class_id, token, id)
            .subscribe(res => {
                    this.successToastreturn('Record deleted', 'middle'), this.update_globalVar(this.token, this.id), this.loader.dismiss(), this.reload()
                },
                err => {
                    this.errorToast('Record not deleted', 'middle'), this.loader.dismiss()
                }
            );
    }

    reload() {
        this.selected_subject = " "
        this.getsubject(this.selectedClassID, this.token, this.id)
    }


    removesubject(y) {

        let alert = this.alertCtrl.create({
            title: 'Subject Delete',
            message: 'Do you Really want to Delete?',
            buttons: [{
                    text: 'Delete ',
                    handler: () => {
                        this.loading();

                        this.class_id_all = this.globalVars.getMyGlobalAllClass_id(this.selected_standard)

                        let sub: Subject_class[] = new Array < Subject_class > ()

                        for (let x of this.class_id_all) {
                            let z: Subject_class = new Subject_class()
                            z.class_id = x
                            z.subject = y.subject
                            z.id = y.id
                            sub.push(z)

                        }
                        this.remove(sub, this.selected_standard, this.token, this.id)
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

    class_subject() {


        this.loading();

        for (let x of this.standard) {

            if (x.standard == this.selected_standard) {
                this.selectedClassID = x.id
            }
        }
        this.getsubject(this.selectedClassID, this.token, this.id)

    }

    home() {
        this.navCtrl.push(Home);
        this.navCtrl.setRoot(Home);
    }
 
    update_globalVar(token:string, id:number) {

        let school_id = this.globalVars.getMyGlobalschool()
        let acad_year = this.globalVars.getMyGlobalacad_yr()
        let x: School_class_year[] = new Array < School_class_year > ()
        this.classProvider
            .getAllClassesForSchool(school_id, acad_year, token, id)
            .subscribe(res => {
                    x = < School_class_year[] > res, this.globalVars.setMyGlobalAllClass(x)
                },
                err => {
                    this.loader.dismiss()
                });
    }

    presentPopover(myEvent) {

        let popover = this.popoverCtrl.create(PopoverPage);

        popover.present({

            ev: myEvent

        });

    }

}