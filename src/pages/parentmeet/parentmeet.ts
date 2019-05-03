import { Component} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ParentMeet_Selected } from '../../pages/parentmeet_selected/parentmeet_selected';
import { ClassProvider } from '../../providers/class-provider';
import { School_class_year } from '../../models/school_class_year';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { GlobalVars } from '../../providers/global-provider';


@Component({
    selector: 'parent-meet',
    templateUrl: 'parentmeet.html'
})
export class ParentMeet {

    selected_standard: any;
    selected_section: string;
    school_id: number = 1;
    standard: School_class_year[];
    sec: School_class_year[];
    loader: any;
    section: any;
    stdsec: boolean;

    constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
        public dailydiary: ClassProvider, public loadingController: LoadingController, public globalVars: GlobalVars) {

        this.standard = this.globalVars.getMyGlobalclass()
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
    Submit() {


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

            this.navCtrl.push(ParentMeet_Selected, {
                parm_class_id: this.globalVars.getMyGlobalClass_id(this.selected_standard, this.selected_section),
                parm_standard: this.selected_standard,
                parm_section: this.selected_section
            });
        }
    }
}