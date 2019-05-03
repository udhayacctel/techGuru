import { Component, Attribute } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Attendance_Selected } from '../../pages/attendance_selected/attendance_selected';
import { School_class_year } from '../../models/school_class_year';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { GlobalVars } from '../../providers/global-provider';
import { Attendance_Report } from '../../pages/attendance_report/attendance_report';


@Component({
    selector: 'page-attendance',
    templateUrl: 'attendance.html'
})

export class Attendance {

    parm_school_id: number;
    cls: School_class_year[];
    sec: School_class_year[];
    selected_standard: any;
    selected_section: string;
    loader: any;
    section: any;
    school_id: any;
    stdsec: boolean;


    constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
        public loadingController: LoadingController, public globalVars: GlobalVars) {

        this.cls = this.globalVars.getMyGlobalclass()
        this.section = this.globalVars.getMyGlobalsection()
        this.school_id = this.globalVars.getMyGlobalschool()
      }

    loading() {
        this.loader = this.loadingController.create({
            content: "Please wait"
        });
        this.loader.present();
    }

    class_selected() {
        this.loading()
        this.sec = this.section.filter(
            scn => scn.standard === this.selected_standard);
        this.stdsec = true
        this.loader.dismiss()
       
    }

    attendance2() {

        if ((this.selected_standard === undefined || this.selected_standard == null || this.selected_standard.length <= 0) ||
            (this.selected_section === undefined || this.selected_section == null || this.selected_section.length <= 0)) {


            let alert = this.alertCtrl.create({
                message: 'Please select Standard and Section',
                buttons: [{
                    text: 'OK'
                }]
            });
            alert.present();
        } else {

            this.navCtrl.push(Attendance_Selected, {

                parm_class_id: this.globalVars.getMyGlobalClass_id(this.selected_standard, this.selected_section),
                parm_standard: this.selected_standard,
                parm_section: this.selected_section,
                parm_school_id: this.school_id
            });
        }
    }

    attendance2report() {

        if ((this.selected_standard === undefined || this.selected_standard == null || this.selected_standard.length <= 0) ||
            (this.selected_section === undefined || this.selected_section == null || this.selected_section.length <= 0)) {


            let alert = this.alertCtrl.create({
                message: 'Please select Standard and Section',
                buttons: [{
                    text: 'OK'
                }]
            });
            alert.present();
        } else {

            this.navCtrl.push(Attendance_Report, {
                parm_class_id: this.globalVars.getMyGlobalClass_id(this.selected_standard, this.selected_section),
                parm_standard: this.selected_standard,
                parm_section: this.selected_section,
                parm_school_id: this.school_id
            });
            console.log(this.school_id)
        }
    }
}