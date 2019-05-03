import { Component, ViewChild} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ClassProvider } from '../../providers/class-provider';
import { School_class_year } from '../../models/school_class_year';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { GlobalVars } from '../../providers/global-provider';
import { EventsProvider } from '../../providers/event-provider';
import { Notification } from '../../models/notification';
import { ToastController } from 'ionic-angular';
import { Parent } from '../../models/parent';
import { Select } from 'ionic-angular';


@Component({
    selector: 'event-notification-page',           //'period-page',
    templateUrl: 'event_notification.html'
})

export class Event_Notification {

    token: any;
    id: number;
    loader: any;
    selected_student_id: any;
    event: Notification[];
    parent: Parent[];
    standard: any;
    section: any;
    class_id: any;
    selected_record: any;
    role: string;
    current_date: any;
    selected_date: any;
    @ViewChild('parentSelect') parentSelect: Select;

    constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
        public classprovider: ClassProvider, public loadingController: LoadingController,
        public globalVars: GlobalVars, public eventsprovider: EventsProvider, public toastController: ToastController, ) {

        this.role = this.globalVars.getMyGlobalrole()
        this.token = this.globalVars.getMyGlobalToken();
        this.id = this.globalVars.getMyGlobalUserId();
        this.current_date = this.globalVars.getMyGlobaltodate()
        this.selected_date = this.globalVars.getMyGlobaltodate()



        if (this.role == "P") {
            this.parent = this.globalVars.getMyGlobalParent()
            console.log("mystuid" + this.parent[0].parent_student_id + this.parent[0].parent_student_class_id)
            this.selected_record = this.parent[0].parent_student_name
            this.standard = this.parent[0].parent_student_standard
            this.section = this.parent[0].parent_student_section
            this.class_id = this.globalVars.getMyGlobalClass_id(this.standard, this.section)
            this.loading();
            this.eventnotification(this.parent[0].parent_student_id, this.class_id, this.current_date, this.token, this.id)

        }
    }

    loading() {

        this.loader = this.loadingController.create({
            content: "Please wait"
        });
        this.loader.present();
    }

    openParent() {

        this.parentSelect.open();

    }


    eventnotification(student_id: number, class_id: number, to_date: string, token: string, id: number) {

        this.eventsprovider
            .geteventnotification(student_id, class_id, to_date, token, id)
            .subscribe(res => {
                    this.event = < Notification[] > res, this.loader.dismiss()
                },
                err => {
                    this.loader.dismiss()
                });

    }

    changerecord(x) {


        if (this.role == "P") {
            this.selected_record = x.parent_student_name
            this.section = x.parent_student_section
            this.standard = x.parent_student_standard
            this.class_id = this.globalVars.getMyGlobalClass_id(this.standard, this.section)

            this.loading()
            this.eventnotification(x.parent_student_id, this.class_id, this.current_date, this.token, this.id)
        }
    }

    attendancechange(x) {

        this.eventnotification(this.parent[0].parent_student_id, this.class_id, this.selected_date, this.token, this.id)

    }

}