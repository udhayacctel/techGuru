import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Quiz_Test } from '../../pages/quiz_test/quiz_test';
import { ClassProvider } from '../../providers/class-provider';
import { ToastController } from 'ionic-angular';
import { School_class_year } from '../../models/School_class_year';
import { Subject } from '../../models/subject';
import { LoadingController } from 'ionic-angular';
import { Quiz_Admin } from '../quiz_admin/quiz_admin';
import { GlobalVars } from '../../providers/global-provider';
import { AlertController } from 'ionic-angular';


@Component({
    templateUrl: 'quiz_select.html',
    selector: 'quiz_select'
})
export class Quiz_Select {

    selected_subject: any;
    selected_standard: any;
    selected_section: any;
    school_id: any;
    parm_standard: any;
    parm_class_id: any;
    standard: School_class_year[];
    sec: School_class_year[];
    loader: any;
    showheader: any;
    role_type: string;
    Section: any;
    subject_class: School_class_year[];
    subject_class_id: School_class_year[];
    section: any;
    stdsec: boolean;
    subsec: boolean;
   
    constructor(public navCtrl: NavController, navParams: NavParams, public globalVars: GlobalVars, public alertCtrl: AlertController,
        public loadingController: LoadingController, public quiz: ClassProvider, public toastController: ToastController) {

        this.role_type = this.globalVars.getMyGlobalrole()
        this.standard = this.globalVars.getMyGlobalclass()
        this.section = this.globalVars.getMyGlobalsection()
        this.school_id = this.globalVars.getMyGlobalschool()
        this.subject_class_id = this.globalVars.getMyGlobalsubject(this.standard, this.section)

        if (this.role_type == "P") {
            this.showheader = true;

        }

    }


    loading() {

        this.loader = this.loadingController.create({
            content: "Please wait"
        });
        this.loader.present();
    }

    class_selected() {
        this.loading()
        this.stdsec = true
        this.sec = []
        this.selected_section = []
        this.sec = this.section.filter(
            scn => scn.standard === this.selected_standard);
        this.loader.dismiss()
    }

    section_selected() {
        this.loading()
        this.subsec = true;
        this.subject_class = this.globalVars.getMyGlobalsubject(this.selected_standard, this.selected_section)
        this.loader.dismiss()
    }

    successToastreturn() {
        let toast = this.toastController.create({
            message: "quiz updated to database",
            duration: 1000,
            position: 'middle'
        });
        toast.present();
    }

    errorToast() {
        let toast = this.toastController.create({
            message: "Record not loaded",
            duration: 1000,
            position: 'middle'
        });
        toast.present();

    }


    submit() {

        if ((this.selected_standard === undefined || this.selected_standard == null || this.selected_standard.length <= 0) ||
            (this.selected_section === undefined || this.selected_section == null || this.selected_section.length <= 0) ||
            (this.selected_subject === undefined || this.selected_subject == null || this.selected_subject.length <= 0)) {


            let alert = this.alertCtrl.create({
                message: 'Please select standard, section and Subject',
                buttons: [{
                    text: 'OK'
                }]
            });
            alert.present();
        } else {

            this.navCtrl.push(Quiz_Test, {
                parm_class_id: this.globalVars.getMyGlobalClass_id(this.selected_standard, this.selected_section),
                parm_standard: this.selected_standard,
                parm_section: this.selected_section,
                parm_subject: this.selected_subject,
                parm_subject_id: this.globalVars.getMyGlobalsubjectID(this.selected_standard, this.selected_section, this.selected_subject)
            });
        }
    }

    submitview() {

        if ((this.selected_standard === undefined || this.selected_standard == null || this.selected_standard.length <= 0) ||
            (this.selected_section === undefined || this.selected_section == null || this.selected_section.length <= 0) ||
            (this.selected_subject === undefined || this.selected_subject == null || this.selected_subject.length <= 0)) {


            let alert = this.alertCtrl.create({
                message: 'Please select standard, section and Subject',
                buttons: [{
                    text: 'OK'
                }]
            });
            alert.present();
        } else {

            this.navCtrl.push(Quiz_Admin, {
                parm_class_id: this.globalVars.getMyGlobalClass_id(this.selected_standard, this.selected_section),
                parm_standard: this.selected_standard,
                parm_section: this.selected_section,
                parm_subject: this.selected_subject,
                parm_subject_id: this.globalVars.getMyGlobalsubjectID(this.selected_standard, this.selected_section, this.selected_subject)
            });

        }
    }
}