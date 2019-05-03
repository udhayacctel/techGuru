import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { TimeTable } from '../../models/timetable';
import { TimeTableProvider } from '../../providers/Timetable-provider';
import { TimeTable_View } from '../timetable_view/timetable_view';
import { GlobalVars } from '../../providers/global-provider';
import { Parent } from '../../models/parent'
import { AlertController } from 'ionic-angular';


@Component({
    selector: 'timetable-parent',
    templateUrl: 'timetable_parent.html'
})
export class TimeTable_Parent {

    selected_standard: any;
    selected_section: any;
    parent: Parent[]
    selected_student_id: number;
    selected_student_name: string;
    selected_class_id: number
    selected_tt_date: any;
    standard:any;
    section:any;

    constructor(public navCtrl: NavController, navParams: NavParams,
        public timetableProvider: TimeTableProvider,
        public toastController: ToastController,
        public globalVars: GlobalVars, public alertCtrl: AlertController) {

        this.selected_tt_date = this.globalVars.getMyGlobaltodate()
        this.parent = this.globalVars.getMyGlobalParent()
        this.selected_student_name = this.parent[0].parent_student_name
        this.standard = this.parent[0].parent_student_standard
        this.section = this.parent[0].parent_student_section
        this.selected_class_id = this.globalVars.getMyGlobalClass_id(this.standard, this.section)
    }

    parseval(x) {

        this.selected_student_id = x.parent_student_id
        this.selected_standard = x.parent_student_standard
        this.selected_section = x.parent_student_section
        this.selected_student_name = x.parent_student_name
        this.selected_class_id = x.parent_student_class_id
    }

    submitview() {
        if ((this.selected_student_name === undefined || this.selected_student_name == null || this.selected_student_name.length <= 0)) {


            let alert = this.alertCtrl.create({
                message: 'Please select Student',
                buttons: [{
                    text: 'OK'
                }]
            });
            alert.present();

        } else {

            this.navCtrl.push(TimeTable_View, {
                parm_standard: this.selected_standard,
                parm_section: this.selected_section,
                parm_student_name: this.selected_student_name,
                parm_class_id: this.selected_class_id,
                parm_tt_date: this.selected_tt_date

            });

        }

    }

}