import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { School_class_year } from '../../models/school_class_year';
import { TimeTable_Select } from '../../pages/timetable_select/timetable_select'
import { TimeTable } from '../../models/timetable';
import { TimeTableProvider } from '../../providers/Timetable-provider';
import { TimeTable_View } from '../timetable_view/timetable_view';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { GlobalVars } from '../../providers/global-provider';


@Component({
    selector: 'timetable-create',
    templateUrl: 'timetable_create.html'
})
export class TimeTable_Create {

    selected_standard: any;
    selected_section: any;
    standard: School_class_year[];
    sec: School_class_year[];
    selected_tt_date: any;
    loader: any;
    section: any;
    stdsec: boolean;
    update_type: any;
    tosec: boolean;

    constructor(public navCtrl: NavController, navParams: NavParams, public timetableProvider: TimeTableProvider,
        public alertCtrl: AlertController, public globalVars: GlobalVars,
        public loadingController: LoadingController, public toastController: ToastController) {

        this.stdsec = false
        this.selected_tt_date = this.globalVars.getMyGlobaltodate()
        this.standard = this.globalVars.getMyGlobalclass()
        this.section = this.globalVars.getMyGlobalsection()

    }


    getDayOfWeek(date) {
        var dayOfWeek = new Date(date).getDay();
        return isNaN(dayOfWeek) ? null : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek];
    }


    submit() {

        if ((this.selected_standard === undefined || this.selected_standard == null || this.selected_standard.length <= 0) ||
            (this.selected_section === undefined || this.selected_section == null || this.selected_section.length <= 0) ||
            (this.selected_tt_date === undefined || this.selected_tt_date == null || this.selected_tt_date.length <= 0)) {


            let alert = this.alertCtrl.create({
                message: 'Please select standard, section and Date',
                buttons: [{
                    text: 'OK'
                }]
            });
            alert.present();
        } else {
            let alert = this.alertCtrl.create({
                title: 'Time Table',
                message: 'Do you want to create TimeTable specific to date or day:',
                buttons: [{
                        text: 'Day',
                        handler: () => {
                            this.update_type = "Day"
                            this.navCtrl.push(TimeTable_Select, {
                                parm_class_id: this.globalVars.getMyGlobalClass_id(this.selected_standard, this.selected_section),
                                parm_standard: this.selected_standard,
                                parm_section: this.selected_section,
                                parm_tt_date: this.selected_tt_date,
                                parm_update_type: this.update_type
                            });
                        }
                    },
                    {
                        text: 'Date',
                        handler: () => {
                            this.update_type = "Date"
                            this.navCtrl.push(TimeTable_Select, {
                                parm_class_id: this.globalVars.getMyGlobalClass_id(this.selected_standard, this.selected_section),
                                parm_standard: this.selected_standard,
                                parm_section: this.selected_section,
                                parm_tt_date: this.selected_tt_date,
                                parm_update_type: this.update_type
                            });
                        }
                    }
                ]
            });
            alert.present();
        }

    }

    class_selected() {

        this.loading();

        this.sec = this.section.filter(
            scn => scn.standard === this.selected_standard);
        this.stdsec = true
        this.loader.dismiss();

    }

    section_selected() {
       
        this.loading()
        this.tosec = true
        this.selected_tt_date = this.globalVars.getMyGlobaltodate()
        this.loader.dismiss()
      
    }
    

    loading() {

        this.loader = this.loadingController.create({
            content: "Please wait"
        });
        this.loader.present();

    }

    submitview() {

        if ((this.selected_standard === undefined || this.selected_standard == null || this.selected_standard.length <= 0) ||
            (this.selected_section === undefined || this.selected_section == null || this.selected_section.length <= 0) ||
            (this.selected_tt_date === undefined || this.selected_tt_date == null || this.selected_tt_date.length <= 0)) {


            let alert = this.alertCtrl.create({
                message: 'Please select Standard, Section and Date',
                buttons: [{
                    text: 'OK'
                }]
            });
            alert.present();
        } else {

            this.navCtrl.push(TimeTable_View, {
                parm_class_id: this.globalVars.getMyGlobalClass_id(this.selected_standard, this.selected_section),
                parm_standard: this.selected_standard,
                parm_section: this.selected_section,
                parm_tt_date: this.selected_tt_date
            });

        }

    }
}