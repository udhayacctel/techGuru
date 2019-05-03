import { Component, Attribute} from '@angular/core';
import { NavController, AlertController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { GlobalVars } from '../../providers/global-provider';
import { PopoverPage } from '../../pages/popover/popover'
import { PopoverController } from 'ionic-angular';
import { PayrollProvider } from '../../providers/payroll';
import { Payroll } from '../../models/payroll';


@Component({
    selector: 'payroll-page',
    templateUrl: 'payroll.html',

})

export class PayRoll {

    private date;
    loader: any;
    payroll: Payroll[];
    token: any;
    id: any;
    message: any;

    constructor(public navCtrl: NavController, navParams: NavParams, public alertCtrl: AlertController,
        public globalVars: GlobalVars, public loadingController: LoadingController,
        public toastCtrl: ToastController, public toastController: ToastController,
        public popoverCtrl: PopoverController, public payrollprovider: PayrollProvider) {

        this.token = this.globalVars.getMyGlobalToken();
        this.id = this.globalVars.getMyGlobalUserId();

        this.getmessage(this.id, this.token, this.id);
        this.loading();

        this.date = new Date()
        console.log(this.date)
        if (this.date = 'Feb') {
            console.log("Correct")
        } else {
            console.log("wrong")
        }
    }

    loading() {
        this.loader = this.loadingController.create({
            content: "Please wait"
        });
        this.loader.present();

    }

    getmessage(teacher_id: number, token: string, id: number) {
        this.payrollprovider
            .getmessage(teacher_id, token, id)
            .subscribe(res => {
                    this.payroll = < Payroll[] > res, this.loader.dismiss(), this.check();
                },
                err => {
                    this.errorToast('Record not updated', 'middle');
                    this.loader.dismiss()
                }
            );
    }

    check() {

        for (let n of this.payroll) {
            console.log(n.date + n.teacher_id + n.credited)
        }
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