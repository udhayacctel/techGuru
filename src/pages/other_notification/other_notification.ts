import { Component, Directive, OnInit } from '@angular/core';
import { NavController, NavParams,AlertController } from 'ionic-angular';
import { PopoverPage } from '../../pages/popover/popover'
import { PopoverController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Template } from '../../models/template';
import { GlobalVars } from '../../providers/global-provider';
import { ItemSliding } from 'ionic-angular';
import { NotificationProvider } from '../../providers/notification-provider';
import { EventsClass } from '../../models/events';
import { EventsProvider } from '../../providers/event-provider';
import { Notification } from '../../models/notification';


@Component({
    templateUrl: 'other_notification.html',

})
export class Other_Notification {

    loader: any;
    token: string;
    school_id: number;
    id: number;
    message: any;
    date: Date;
    current_date: any;
    event: EventsClass[];
    selected_activity: any;
    selected_title: any;
    selected_message: any;
    class_id: any;
    evnt: Notification = new Notification();

    constructor(public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController,
        public alertCtrl: AlertController, public toastController: ToastController, public globalVars: GlobalVars,
        public loadingController: LoadingController, public eventsprovider: EventsProvider) {


        this.token = this.globalVars.getMyGlobalToken();
        this.id = this.globalVars.getMyGlobalUserId();
        this.school_id = this.globalVars.getMyGlobalschool();
        this.current_date = this.globalVars.getMyGlobaltodate()
        this.date = new Date();
        this.date.setDate(this.date.getDate() + 3);

    }

    getevents(activity: string, token: string, id: number) {
        this.eventsprovider
            .getevents(activity, token, id)
            .subscribe(res => {
                    this.event = < EventsClass[] > res, this.successToastreturn('Record updated', 'middle')
                },
                err => {
                    this.errorToast('Record not updated', 'middle');
                    this.loader.dismiss()
                }
            );
    }

    addeventnotification(event: Notification, school_id: number, token: string, id: number) {
        this.eventsprovider
            .addeventnotification(event, school_id, token, id)
            .subscribe(res => {
                    this.successToastreturn('Record updated', 'middle'), this.reset()
                },
                err => {
                    this.errorToast('Record not updated', 'middle');
                    this.loader.dismiss()
                }
            );
    }

    reset() {
        this.selected_title = ''
        this.selected_message = ''

    }

    select_event() {

        this.getevents(this.selected_activity, this.token, this.id)

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

    save() {

        this.evnt.school_id = this.school_id
        this.evnt.from_date = this.current_date
        this.evnt.to_date = this.date.toISOString()
        this.evnt.title = this.selected_title
        this.evnt.message = this.selected_message
        this.evnt.class_id = 0
        this.addeventnotification(this.evnt, this.school_id, this.token, this.id)

    }

    presentPopover(myEvent) {

        let popover = this.popoverCtrl.create(PopoverPage, {

        });

        popover.present({
            ev: myEvent

        });

    }

}