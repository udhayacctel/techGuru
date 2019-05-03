import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ViewController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { Dailydiary } from '../../models/dailydairy';
import { DailyDiaryProvider } from '../../providers/dailydiary-provider';
import { DailyDairy_Post } from '../../pages/dailydiary_post/dailydiary_post';
import { Home } from '../home/home';
import { LoadingController } from 'ionic-angular';
import { DailyDiary_View2 } from '../../pages/dailydiary_view2/dailydiary_view2';
import { ItemSliding } from 'ionic-angular';
import { DailyDiary_Report } from '../dailydiary_report/dailydiary_report';
import { GlobalVars } from '../../providers/global-provider';
import { PopoverPage} from '../../pages/popover/popover'
import { PopoverController } from 'ionic-angular';


@Component({
    templateUrl: 'dailydiary_view.html',
    selector: 'dailydiary-view',
    providers: [DailyDiaryProvider]

})


export class DailyDiary_View {

    segment: any;
    loader: any;
    daily_diary_activity: string;
    daily_diary_notification: Dailydiary[];
    activity_diary_notification: Dailydiary[];
    parm_class_id: number;
    parm_id: number;
    show: boolean;
    id: number;
    today: any;
    parm_activity: any;
    selected_activitydate: any;
    selected_viewdate: any;
    parm_message: any;
    parm_title: any;
    parm_subject: any;
    parm_due_date: any;
    message: any;
    day: any;
    token:string;


    constructor(public navCtrl: NavController,
        public modalCtrl: ModalController,
        public nav: NavController,
        public navParams: NavParams,
        public diaryProvider: DailyDiaryProvider,
        public toastController: ToastController,
        public loadingController: LoadingController,
        public alertCtrl: AlertController, public globalVars: GlobalVars,
        public popoverCtrl: PopoverController, public viewCtrl: ViewController) {

        this.show = false;
        this.selected_activitydate = this.globalVars.getMyGlobaltodate()
        this.selected_viewdate = this.globalVars.getMyGlobaltodate()
        this.day = this.globalVars.getMyGlobaltoday()
        this.nav = nav;

        this.segment = "Daily";
        this.parm_class_id = this.navParams.get('parm_class_id');
        this.parm_id = this.navParams.get('parm_id');
        this.token   = this.globalVars.getMyGlobalToken();
        this.id = this.globalVars.getMyGlobalUserId();
        this.segselected()
        
        
    }

    loading() {

        this.loader = this.loadingController.create({
            content: "Please wait"
        });
        this.loader.present();
    }


    ionViewCanEnter() {

        this.token   = this.globalVars.getMyGlobalToken();
        this.id = this.globalVars.getMyGlobalUserId();
        this.fetchDailydiary(this.parm_class_id, "H", this.selected_viewdate, this.token, this.id)
        this.fetchDiaryActivity(this.parm_class_id, "A", this.selected_activitydate, this.token, this.id)

    }


    segselected() {

        switch (this.segment) {

            case "Daily":
                {

                    this.daily_diary_activity = "H"
                    this.loading()
                    this.fetchDailydiary(this.parm_class_id, "H", this.selected_viewdate, this.token, this.id)

                    break
                }
            case "Activity":
                {

                    this.daily_diary_activity = "A"
                    this.loading()
                    this.fetchDiaryActivity(this.parm_class_id, "A", this.selected_activitydate, this.token, this.id)

                    break
                }

        }
    }

    showrow(n) {

        let modal = this.modalCtrl.create(DailyDiary_View2, {
            parm_title: n.title,
            parm_message: n.message,
            parm_subject: n.subject,
            parm_due_date: n.end_date
        });
        modal.onDidDismiss(data => {});
        modal.present();

    }


    edit_activity(slidingItem: ItemSliding, n) {

        slidingItem.close();


        if (this.segment == "Daily") {
            let index = this.daily_diary_notification.indexOf(n);
        } else {
            let index = this.activity_diary_notification.indexOf(n);
        }

        this.navCtrl.push(DailyDairy_Post, {

            parm_class_id: n.class_id,
            parm_standard: n.standard,
            parm_section: n.section,
            parm_end_date: n.end_date,
            parm_title: n.title,
            parm_subject: n.subject,
            parm_message: n.message,
            parm_created_by: n.created_by,
            parm_activity: n.activity,
            parm_acad_year: n.acad_year,
            parm_id: n.id,
            parm_school_id: n.school_id,
            parm_modified_by: this.globalVars.getMyGlobalUserId(),
            parm_created_by_date: this.globalVars.getMyGlobaltodate(),
            parm_modifies_by_date: this.globalVars.getMyGlobaltodate(),

            parm_update: "edit",
        }).then(() => {
            const index = this.viewCtrl.index;
            for(let i=index; i>3; i--){
                this.navCtrl.remove(i);
            }
        })

    }

    home() {
        this.navCtrl.push(Home);
        this.navCtrl.setRoot(Home);

    }


    fetchDailydiary(class_id: number, activity_ind: string, date: any,token: string, id:number ) {

        this.diaryProvider
            .getDiary(class_id, activity_ind, date,token, id)
            .subscribe(res => {
                    this.daily_diary_notification = < Dailydiary[] > res, this.loader.dismiss()
                },
                err => {
                    this.loader.dismiss(), this.errorToast("Records not loaded")
                });

    }

    fetchDiaryActivity(class_id: number, activity_ind: string, date: any , token:string, id:number) {

         this.diaryProvider
            .getDiary(class_id, activity_ind, date, token, id)
            .subscribe(res => {
                    this.activity_diary_notification = < Dailydiary[] > res, this.loader.dismiss()
                },
                err => {
                    this.loader.dismiss(), this.errorToast("Records not loaded")
                });

    }

    reload() {
        this.fetchDailydiary(this.parm_class_id, "H", this.selected_viewdate, this.token, this.id)
        this.fetchDiaryActivity(this.parm_class_id, "A", this.selected_activitydate, this.token, this.id)

    }


    diarydelete(id: number,class_id:number, token:string, tg_id: number) {

        this.diaryProvider
            .removeDiary(id, class_id,token, tg_id)
            .subscribe(res => {
                    this.reload(), this.successToastreturn('Record deleted')
                },
                err => this.errorToast('Record deleted')
            );
    }

    delete(slidingItem: ItemSliding, z) {
        let alert = this.alertCtrl.create({
            title: 'Dailydairy Delete',
            message: 'Do you really want to delete?',
            buttons: [{
                    text: 'Delete ',
                    handler: () => {

                        this.loading();
                        this.diarydelete(z.id, z.class_id, this.token, this.id)

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

    reminder(slidingItem, y) {

        this.navCtrl.push(DailyDiary_Report, {
            parm_class_id: this.parm_class_id,
            parm_id: y.id
        });

    }


    successToastreturn(msg: string) {

        let toast = this.toastController.create({
            message: msg,
            duration: 1000,
            position: 'middle'
        });
        toast.present();
    }

    errorToast(msg: string) {
        let toast = this.toastController.create({
            message: msg,
            duration: 1000,
            position: 'middle'
        });
        toast.present();
    }

    successToastDelete(msg: string) {
        let toast = this.toastController.create({
            message: msg,
            duration: 1000,
            position: 'middle'
        });
        toast.present();
    }

    change(n) {

        this.fetchDailydiary(this.parm_class_id, "H", this.selected_viewdate , this.token, this.id)

    }

    changeactivity(y) {

        this.fetchDiaryActivity(this.parm_class_id, "A", this.selected_activitydate, this.token, this.id)
    }


    presentPopover(myEvent) {

        let popover = this.popoverCtrl.create(PopoverPage, {

        });

        popover.present({

            ev: myEvent

        });

    }

}