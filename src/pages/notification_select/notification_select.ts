import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { Notification_View } from '../notification_view/notification_view';
import { UsernameValidator } from '../validator/username';
import { Notification } from '../../models/notification';
import { Home } from '../home/home';
import { LoadingController } from 'ionic-angular';
import { GlobalVars } from '../../providers/global-provider';
import { PopoverPage } from '../../pages/popover/popover'
import { PopoverController } from 'ionic-angular';
import { NotificationProvider } from '../../providers/notification-provider';
import { ToastController } from 'ionic-angular';
import { Template } from '../../models/template';
import { ClassProvider } from '../../providers/class-provider';


@Component({
    selector: 'notification-select',
    templateUrl: 'notification_select.html'
})

export class Notification_Select {

    notifyForm: FormGroup;

    //Updated when the values are for Edit.

    parm_notify_from_date: any;
    parm_notify_to_date: any;
    parm_notify_title: any;
    parm_notify_message: any;
    parm_notify_activity: any;
    parm_update_type: any;
    parm_notify_id: number;
    loader: any;
    current_date: any;
    token:string;
    id:number;
    temp: Template[];
    school_id:number;
    selected_message:any;

    
    constructor(public globalVars: GlobalVars, public navCtrl: NavController, public navParams: NavParams,
        public formBuilder: FormBuilder, public loadingController: LoadingController,
        public popoverCtrl: PopoverController, public classProvider: ClassProvider,
        public notifyProvider: NotificationProvider,
        public toastController: ToastController) {
        this.current_date = this.globalVars.getMyGlobaltodate()
        this.token   = this.globalVars.getMyGlobalToken();  
        this.id = this.globalVars.getMyGlobalUserId();

        this.parm_notify_from_date = navParams.get('parm_from_date');
        this.parm_notify_to_date = navParams.get('parm_to_date');
        this.parm_notify_title = navParams.get('parm_title');
        this.parm_notify_message = navParams.get('parm_message');
        this.parm_update_type = navParams.get('parm_update_type');
        this.parm_notify_id = navParams.get('parm_id');
        this.parm_notify_activity = navParams.get('parm_recep_ind');
        this.school_id = this.globalVars.getMyGlobalschool();
        
        this.gettemplate(this.school_id, this.token, this.id)
        

        if (this.parm_update_type == "edit") {
            this.notifyForm = formBuilder.group({
                selected_from_date: [this.parm_notify_from_date, UsernameValidator.checkFromDate],
                selected_to_date: [this.parm_notify_to_date, Validators.required],
                selected_title: [this.parm_notify_title, Validators.required],
                selected_message: [this.parm_notify_message, Validators.required],
                selected_activity: [this.parm_notify_activity]
            }, {
                validator: UsernameValidator.checkTooDate
            })
        } else {

            this.notifyForm = formBuilder.group({
                selected_from_date: [this.current_date, UsernameValidator.checkFromDate],
                selected_to_date: [this.current_date, Validators.required],
                selected_title: ['', Validators.required],
                selected_message: ['', Validators.required],
                selected_activity: ['A']
            }, {
                validator: this.checkTooDate
            })
        }
        this.loading();
        this.loader.dismiss();
    }

    checkTooDate
        (g: FormGroup): any {

            let from_dt = g.get('selected_from_date').value
            let to_dt = g.get('selected_to_date').value

            let activity = g.get('selected_activity').value

            if (to_dt < from_dt) {
                console.log("succesful in IF loop")
                return {
                    "Less than": true
                }
            }
            return null;

        }

    loading() {

        this.loader = this.loadingController.create({
            content: "Please wait"
        });
        this.loader.present();
    }


    notifythanks() {

        let notification: Notification = new Notification();

        notification.from_date = this.notifyForm.value.selected_from_date
        notification.to_date = this.notifyForm.value.selected_to_date
        notification.title = this.notifyForm.value.selected_title
        notification.message = this.notifyForm.value.selected_message
        notification.recepient = this.notifyForm.value.selected_activity
        notification.school_id = this.globalVars.getMyGlobalschool();
        //Get the vvalue from Parm 
        notification.created_by = this.globalVars.getMyGlobalUserId();
        notification.created_by_date = this.globalVars.getMyGlobaltodate();
        //Get the vvalue from Parm 
        notification.modified_by = this.globalVars.getMyGlobalUserId();
        notification.modified_by_date = this.globalVars.getMyGlobaltodate();

        if (this.parm_update_type == "edit") {
            this.notificationUpdt(notification, notification.school_id, this.parm_notify_id, this.token, this.id)
        } else {
            this.notificationPost(notification, notification.school_id, this.token, this.id);
        }

    }

    home() {

        this.navCtrl.push(Home);
        this.navCtrl.setRoot(Home);
    }

    view() {

        if (this.parm_update_type == "edit") {
            this.navCtrl.pop()
        } else {
            this.navCtrl.push(Notification_View);
        }
    }

    resetForm() {

        this.notifyForm.reset();

    }

    notificationPost(notify_page_notification: Notification, school_id: number, token:string, id:number) {

        this.notifyProvider
            .addNotify(notify_page_notification, school_id, token, id)
            .subscribe(res => {
                    this.resetForm(), this.loading(), this.successToastreturn('Record updated', 'middle'), this.loader.dismiss()
                },
                err => {
                    this.loader.dismiss(), this.errorToast("Record not updated", "middle")
                });

    }

    notificationUpdt(notify_page_notification: Notification, school_id:number, id: number, token:string, tg_id:number) {
        this.notifyProvider
            .putNotify(notify_page_notification,school_id, id, token, tg_id)
            .subscribe(res => {
                    this.resetForm(), this.loading(), this.successToastreturn('Record updated', 'middle'), this.loader.dismiss()
                },
                err => {
                    this.loader.dismiss(), this.errorToast("Record not updated", "middle")
                });

    }

    gettemplate(school_id: number, token: string, id: number) {
        this.classProvider
            .getTemplate(school_id, token, id)
            .subscribe(res => {
                    this.temp = < Template[] > res, this.loader.dismiss()
                },
                err => {
                    this.errorToast('Record not updated', 'middle');
                    this.loader.dismiss()
                }
            );
    }

    selectchange(args){ 
          
          this.notifyForm.controls['selected_message'].setValue(args);

    } 

    selecttitle(args){ 
                  this.notifyForm.controls['selected_title'].setValue(args);

        }

    successToastreturn(msg, pos) {

        let toast = this.toastController.create({
            message: msg,
            duration: 1000,
            position: pos
        });
        toast.present();

        if (this.parm_update_type == "edit") {
            this.navCtrl.pop();
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

    presentPopover(myEvent) {

        let popover = this.popoverCtrl.create(PopoverPage, {
            notifyView: "NotificationView"
        });

        popover.present({
            ev: myEvent
        });

    }
}