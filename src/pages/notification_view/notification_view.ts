import { Component } from '@angular/core';
import { NavController,AlertController,NavParams, ViewController} from 'ionic-angular';
import { Notification_Select } from '../notification_select/notification_select';
import { ItemSliding } from 'ionic-angular';
import { NotificationProvider } from '../../providers/notification-provider';
import { Notification } from '../../models/notification';
import { ToastController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { PopoverPage} from '../../pages/popover/popover'
import { PopoverController } from 'ionic-angular';
import { GlobalVars } from '../../providers/global-provider';


@Component({
    selector: 'notification-view',
    templateUrl: 'notification_view.html'
})

export class Notification_View {

    selected_abt_page_date: any;
    selected_school_id: number;
    abt_page_notification: Notification[];
    loader: any;
    avatar_ht: boolean = false;
    id: number;
    recep_ind: string;
    segment: any;
    selected_admindate: any;
    selected_notidate: any;
    token:string;

    constructor(public navCtrl: NavController, public navParams: NavParams,
        public notifyProvider: NotificationProvider, public toastController: ToastController,
        public loadingController: LoadingController, public alertCtrl: AlertController,
        public popoverCtrl: PopoverController, public viewCtrl:ViewController,
        public globalVars: GlobalVars) {


        this.selected_abt_page_date = this.globalVars.getMyGlobaltodate()
        this.selected_admindate = this.globalVars.getMyGlobaltodate()
        this.selected_notidate = this.globalVars.getMyGlobaltodate()
        this.selected_school_id = this.globalVars.getMyGlobalschool()

        this.segment = "admin"
        this.recep_ind = 'A'
        this.loading();
        this.token   = this.globalVars.getMyGlobalToken();  
        this.id = this.globalVars.getMyGlobalUserId();      
        this.fetchNotify(this.selected_school_id, this.selected_admindate, this.recep_ind, this.token, this.id);
    }

    loading() {

        this.loader = this.loadingController.create({
            content: "Please wait"
        });
        this.loader.present();
    }


    ionViewCanEnter() {

        this.fetchNotify(this.selected_school_id, this.selected_admindate, this.recep_ind, this.token, this.id);


    }

    fetchNotify(school_id: any, to_date: string, recep: string, token:string, id:number) {

        this.notifyProvider
            .getNotify(school_id, to_date, recep, token, id)
            .subscribe(res => {
                    this.abt_page_notification = < Notification[] > res, this.loader.dismiss()
                },
                err => {
                    this.loader.dismiss(), this.errorToast('Record not loaded', 'middle')
                });
    }

    changeadmin(x) {
        this.fetchNotify(this.selected_school_id, this.selected_admindate, this.recep_ind, this.token, this.id);

    }

    changenoti(x) {
        this.fetchNotify(this.selected_school_id, this.selected_notidate, this.recep_ind, this.token, this.id);

    }

    segselect_teacher() {

        switch (this.segment) {

            case "admin":
                {
                    this.recep_ind = "A"
                    this.loading();
                    this.fetchNotify(this.selected_school_id, this.selected_admindate, this.recep_ind, this.token, this.id);
                    break;
                }

            case "noti":
                {
                    this.recep_ind = "T"
                    this.loading();
                    this.fetchNotify(this.selected_school_id, this.selected_notidate, this.recep_ind, this.token, this.id);
                    break;
                }
        }
    }

    errorToast(msg, pos) {
        let toast = this.toastController.create({
            message: msg,
            duration: 1000,
            position: pos
        });
        toast.present();
    }


    edit(slidingItem: ItemSliding, x) {
        slidingItem.close()
        let index = this.abt_page_notification.indexOf(x);

        this.navCtrl.push(Notification_Select, {
            parm_from_date: x.from_date,
            parm_to_date: x.to_date,
            parm_title: x.title,
            parm_message: x.message,
            parm_id: x.id,
            parm_update_type: "edit",
            parm_recep_ind: x.recepient
        }).then(() => {
            const index = this.viewCtrl.index;
            for(let i=index; i > 3; i--){
                this.navCtrl.remove(i);
            }
        })
    }

    view(slidingItem: ItemSliding) {
        this.navCtrl.push(Notification_Select);
        slidingItem.close();
    }

    notifydelete(school_id:number, id: number, token:string, tg_id:number) {
        this.notifyProvider
            .deleteNotify(school_id, id, token, tg_id)
            .subscribe(res => {
                    this.reload(), this.successToast('Record deleted', 'middle')
                },
                err => this.errorToast('Record not deleted', 'middle'));
    }

    delete(slidingItem: ItemSliding, x) {
        let alert = this.alertCtrl.create({
            title: 'Notification Delete',
            message: 'Do you really want to delete?',
            buttons: [{
                    text: 'Delete ',
                    handler: () => {

                        this.loading();
                        this.notifydelete(this.selected_school_id, x.id, this.token, this.id)


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
        this.fetchNotify(this.selected_school_id, this.selected_admindate, this.recep_ind, this.token, this.id);

    }

    successToast(msg: string, pos: String) {
        let toast = this.toastController.create({
            message: msg,
            duration: 1000,
            position: 'middle'
        });
        toast.present();
    }

    showrow(n) {

        let idx = this.abt_page_notification.indexOf(n)
        if (n.message.length < 30) {
            this.avatar_ht = false
        } else {
            this.avatar_ht = true
        }

        if (!n.expand) {
            n.expand = true;
        } else {
            n.expand = false;
        }
    }


    presentPopover(myEvent) {

        let popover = this.popoverCtrl.create(PopoverPage, {

        });

        popover.present({
            ev: myEvent

        });

    }

}