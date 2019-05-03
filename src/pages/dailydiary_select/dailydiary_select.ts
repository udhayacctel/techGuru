import { Component} from '@angular/core';
import { NavController, NavParams,LoadingController  } from 'ionic-angular';
import { DailyDairy_Post } from '../../pages/dailydiary_post/dailydiary_post';
import { DailyDiary_View } from '../../pages/dailydiary_view/dailydiary_view';
import { School_class_year } from '../../models/school_class_year';
import { AlertController } from 'ionic-angular';
import { GlobalVars } from '../../providers/global-provider';


@Component({
    selector: 'dailydiary-select',
    templateUrl: 'dailydiary_select.html'
})
export class DailyDiary_Select {

    selected_standard: any;
    selected_section: string;
    class: School_class_year[];
    standard: School_class_year[];
    sec: School_class_year[];
    loader: any;
    section: School_class_year[];
    school_id: any;
    stdsec: boolean;

    constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
        public globalVars: GlobalVars, public loadingController: LoadingController) {

        /* Get class and section from the global variable.
         */
        this.standard = this.globalVars.getMyGlobalclass()
        this.section = this.globalVars.getMyGlobalsection()
        this.school_id = this.globalVars.getMyGlobalschool()
    }

    class_selected() {

        this.loading();
        this.sec = this.section.filter(
            scn => scn.standard === this.selected_standard);
        this.stdsec = true
        this.loader.dismiss();
    }

    loading() {

        this.loader = this.loadingController.create({
            content: "Please wait"
        });
        this.loader.present();

    }

    submit() {

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
            this.navCtrl.push(DailyDairy_Post, {
                parm_class_id: this.globalVars.getMyGlobalClass_id(this.selected_standard, this.selected_section),
                parm_standard: this.selected_standard,
                parm_section: this.selected_section
            });
        }
    }

    submitView() {

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
            this.navCtrl.push(DailyDiary_View, {
                parm_class_id: this.globalVars.getMyGlobalClass_id(this.selected_standard, this.selected_section),
                parm_standard: this.selected_standard,
                parm_section: this.selected_section
            });
        }
    }
}