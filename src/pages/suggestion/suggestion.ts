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


@Component({
    selector: 'suggestion-page',
    templateUrl: 'suggestion.html',

})
export class Suggestion {

    loader: any;
    token: string;
    school_id: number;
    id: number;
    message: any;
    compliant: Template = new Template();
    comp: Template[];
    student_id: number;
    date: Date;
    current_date: any;
    parent: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController,
        public alertCtrl: AlertController, public toastCtrl: ToastController, public globalVars: GlobalVars,
        public loadingController: LoadingController, public notifyProvider: NotificationProvider) {


        this.token = this.globalVars.getMyGlobalToken();
        this.id = this.globalVars.getMyGlobalUserId();
        this.school_id = this.globalVars.getMyGlobalschool();
        this.parent = this.globalVars.getMyGlobalParent();
        this.student_id = this.parent[0].parent_student_id

    }

    postSuggestion(temp: Template, student_id: number, school_id: number, token: string, id: number) {
        this.notifyProvider
            .addCompliant(temp, student_id, school_id, token, id)
            .subscribe(res => {
                    this.successToastreturn('Record updated', 'middle'), this.loader.dismiss(), this.resetform()
                },
                err => {
                    this.errorToast('Record not updated', 'middle');
                    this.loader.dismiss()
                }
            );

    }

    resetform() {

        this.message = '';

    }


    loading() {
        this.loader = this.loadingController.create({
            content: "Please wait"
        });
        this.loader.present();

    }


    save() {

        let alert = this.alertCtrl.create({
            title: 'Compliant',
            message: 'Do you Really want to Post?',
            buttons: [{
                    text: 'Post',
                    handler: () => {
                        this.loading();
                        this.compliant.message = this.message;
                        this.compliant.school_id = this.school_id;
                        this.compliant.update_ind = 'S'

                        this.postSuggestion(this.compliant, this.student_id, this.school_id, this.token, this.id)
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