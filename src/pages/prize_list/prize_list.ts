import { Component} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ClassProvider } from '../../providers/class-provider';
import { School_class_year } from '../../models/school_class_year';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { GlobalVars } from '../../providers/global-provider';
import { Student } from '../../models/student';
import { EventsProvider } from '../../providers/event-provider';
import { EventsClass } from '../../models/events';
import { ToastController } from 'ionic-angular';


@Component({
    
        selector: 'prize-list-page',
        templateUrl: 'prize_list.html'
    })
    
    export class Prize_List {
    
        token: any;
        id: number;
        loader: any;
        event: EventsClass[];
        prize_list: EventsClass[];
        selected_activity: any;
        selected_event: any;
        header: any;
    
        constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
            public classprovider: ClassProvider, public loadingController: LoadingController,
            public globalVars: GlobalVars, public eventsprovider: EventsProvider, public toastController: ToastController, ) {
    
            this.token = this.globalVars.getMyGlobalToken();
            this.id = this.globalVars.getMyGlobalUserId();
    
        }
    
        getevents(activity: string, token: string, id: number) {
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
    
        getprizelist(name: string, token: string, id: number) {
            this.eventsprovider
                .getprizelist(name, token, id)
                .subscribe(res => {
                        this.prize_list = < EventsClass[] > res, this.check()
                    },
                    err => {
                        this.errorToast('Record not updated', 'middle');
                        this.loader.dismiss()
                    }
                );
        }
    
        check() {
    
            for (let x of this.prize_list) {
    
                if (this.prize_list.length <= 0) {
                    this.header = " No list avaliable "
                }
            }
        }
    
        select_activity() {
    
            this.getevents(this.selected_activity, this.token, this.id)
    
        }
    
        select_event() {
    
            this.getprizelist(this.selected_event, this.token, this.id)
    
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