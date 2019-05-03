import { Component, Directive } from '@angular/core';
import { NavController, NavParams,AlertController } from 'ionic-angular';
import { PopoverPage } from '../../pages/popover/popover'
import { PopoverController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { NotificationProvider } from '../../providers/notification-provider';
import { Template } from '../../models/template';
import { GlobalVars } from '../../providers/global-provider';
import { ItemSliding } from 'ionic-angular';
import { Notification } from '../../models/notification';


@Component({
    selector: 'compliant-view',
    templateUrl: 'compliant_view.html',

})
export class Compliant_View {

    loader: any;
    token: string;
    school_id: number;
    id: number;
    comp: Template[];
    segment: any;
    update_ind: any;
    current_date: any;
    date: Date;
    to_date: String;

    constructor(public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController,
        public alertCtrl: AlertController, public toastCtrl: ToastController, public globalVars: GlobalVars,
        public loadingController: LoadingController, public notifyProvider: NotificationProvider) {

        this.token = this.globalVars.getMyGlobalToken();
        this.id = this.globalVars.getMyGlobalUserId();
        this.school_id = this.globalVars.getMyGlobalschool();
        this.segment = "Complaint";
        this.segselected()
        this.current_date = this.globalVars.getMyGlobaltodate()
        this.date = new Date();
        this.date.setDate(this.date.getDate() + 3);
        console.log("date id" + this.current_date + this.date)
    }

    segselected() {

        switch (this.segment) {

            case "Complaint":
                {
                    this.update_ind = 'C'
                    this.loading();
                    this.viewCompliant(this.school_id, this.update_ind, this.token, this.id)

                    break
                }
            case "Suggestion":
                {
                    this.update_ind = 'S'
                    this.loading();
                    this.viewCompliant(this.school_id, this.update_ind, this.token, this.id)

                    break
                }

        }
    }

    loading() {

        this.loader = this.loadingController.create({
            content: "Please wait"
        });
        this.loader.present();

    }

    viewCompliant(school_id: number, update_ind: any, token: string, id: number) {
        this.notifyProvider
            .getCompliant(school_id, update_ind, token, id)
            .subscribe(res => {
                    this.comp = < Template[] > res, this.loader.dismiss()
                },
                err => {
                    this.errorToast('Record not updated', 'middle');
                    this.loader.dismiss()
                }
            );
    }

    removeCompliant(id: number, token: string, tg_id: number) {
        this.notifyProvider
            .deleteCompliant(id, token, tg_id)
            .subscribe(res => {
                    this.successToastreturn('Record deleted', 'middle'), this.loader.dismiss(), this.reload()
                },
                err => {
                    this.errorToast('Record not deleted', 'middle')

                });
    }

    notificationPost(notify_page_notification: Notification, school_id: number, token: string, id: number) {

        this.notifyProvider
            .addNotify(notify_page_notification, school_id, token, id)
            .subscribe(res => {
                    this.loading(), this.successToastreturn('Record updated', 'middle'), this.loader.dismiss()
                },
                err => {
                    this.loader.dismiss(), this.errorToast("Record not updated", "middle")
                });

    }

    delete(slidingItem: ItemSliding, x) {
        let alert = this.alertCtrl.create({
            title: 'Compliant Delete',
            message: 'Do you really want to delete?',
            buttons: [{
                    text: 'Delete ',
                    handler: () => {

                        this.loading();
                        this.removeCompliant(x.id, this.token, this.id)
                    }
                },
                {
                    text: 'Cancel ',
                    handler: () => {
                        console.log("Delete cancel");

                    }
                }
            ]
        });
        alert.present();

        slidingItem.close()
    }

    sugges(slidingItem: ItemSliding, x) {

        let alert = this.alertCtrl.create({
            title: 'Suggestion',
            message: 'Do you really want to suggest?',
            buttons: [{
                    text: 'Suggest ',
                    handler: () => {

                        let notification: Notification = new Notification();

                        notification.from_date = this.current_date
                        notification.to_date = this.date.toISOString()
                        notification.title = 'Suggestion'
                        notification.message = x.message
                        notification.recepient = 'A'
                        notification.school_id = this.school_id
                        //Get the vvalue from Parm 
                        notification.created_by = this.globalVars.getMyGlobalUserId();
                        notification.created_by_date = this.globalVars.getMyGlobaltodate();
                        //Get the vvalue from Parm 
                        notification.modified_by = this.globalVars.getMyGlobalUserId();
                        notification.modified_by_date = this.globalVars.getMyGlobaltodate();

                        this.notificationPost(notification, this.school_id, this.token, this.id)
                        this.loader.dismiss()
                        console.log("date" + notification.from_date + notification.to_date)
                    }
                },
                {
                    text: 'Cancel ',
                    handler: () => {
                        console.log("Delete cancel");

                    }
                }
            ]
        });
        alert.present();

        slidingItem.close()
    }


    reload() {

        this.viewCompliant(this.school_id, this.update_ind, this.token, this.id)
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

    presentPopover(myEvent) {

        let popover = this.popoverCtrl.create(PopoverPage, {

        });

        popover.present({
            ev: myEvent

        });

    }
}