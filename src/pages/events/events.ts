import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { GlobalVars } from '../../providers/global-provider';
import { AlertController } from 'ionic-angular';
import { EventsClass } from '../../models/events';
import { EventsProvider } from '../../providers/event-provider';


@Component({
    templateUrl: 'events.html',
    selector: 'period-page'
})
export class Events {
    
    event: EventsClass[]
    evnt: EventsClass = new EventsClass();
    token:string;
    id:number;
    loader:any;
    selected_activity:any;
    selected_name:any;


    constructor(public navCtrl: NavController, navParams: NavParams, public toastController: ToastController,
                public loadingController: LoadingController, public alertCtrl: AlertController,
                public globalVars: GlobalVars, public eventsprovider: EventsProvider) {

                this.token   = this.globalVars.getMyGlobalToken();
                this.id = this.globalVars.getMyGlobalUserId();
        }

    loading() {
        this.loader = this.loadingController.create({
            content: "Please wait"
        });
        this.loader.present();

    }


    getevents(activity:string , token: string, id: number) {
        this.eventsprovider
            .getevents(activity, token, id)
            .subscribe(res => {
                    this.event = < EventsClass[] > res
                },
                err => {
                    this.errorToast('Record not updated', 'middle');
                    this.loader.dismiss()
                }
            );
    }

    addevents( event:EventsClass, activity:string, token: string, id: number) {
        this.eventsprovider
            .addevents( event, activity,token, id)
            .subscribe(res => {
                    this.successToastreturn('Record updated', 'middle'), this.resetform(), this.reload()
                },
                err => {
                    this.errorToast('Record not updated', 'middle');
                    this.loader.dismiss()
                }
            );
    }

    select_event(){

        this.getevents(this.selected_activity, this.token, this.id)

    }
    reload() {

        this.getevents(this.selected_activity, this.token, this.id)

    }

    removeevents(id: number, token: string, tg_id: number) {
        this.eventsprovider
            .removeevents(id, token, tg_id)
            .subscribe(res => {
                    this.successToastreturn('Record deleted', 'middle'), this.loader.dismiss(), this.reload()
                },
                err => {
                    this.errorToast('Record not deleted', 'middle')
                });
    }

    save() {


        this.evnt.activity = this.selected_activity;
        this.evnt.name = this.selected_name;

        this.addevents( this.evnt, this.selected_activity, this.token, this.id)


    }


    delete(x) {

        let alert = this.alertCtrl.create({
            title: 'Template Delete',
            message: 'Do you Really want to Delete?',
            buttons: [{
                    text: 'Delete ',
                    handler: () => {
                        this.loading();
                        this.removeevents(x.id, this.token, this.id)
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

    resetform() {
        this.selected_name=''

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


}