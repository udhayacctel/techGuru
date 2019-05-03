import { Component, Directive } from '@angular/core';
import { NavController, NavParams,AlertController } from 'ionic-angular';
import { Template } from '../../models/template';
import { PopoverPage } from '../../pages/popover/popover'
import { PopoverController } from 'ionic-angular';
import { ClassProvider } from '../../providers/class-provider';
import { ToastController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { GlobalVars } from '../../providers/global-provider';


@Component({
    selector: 'templates-page',
    templateUrl: 'templates.html',

})

export class Templates {

    temp: Template[];
    loader: any;
    school_id: number;
    message: any;
    tmp: Template = new Template();
    token: string;
    id: number;
    title: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, public classProvider: ClassProvider,
        public toastController: ToastController, public loadingController: LoadingController,
        public toastCtrl: ToastController, public globalVars: GlobalVars, public alertCtrl: AlertController,
        public popoverCtrl: PopoverController) {

        this.token = this.globalVars.getMyGlobalToken();
        this.id = this.globalVars.getMyGlobalUserId();
        this.school_id = this.globalVars.getMyGlobalschool();
        this.gettemplate(this.school_id, this.token, this.id)


    }

    loading() {
        this.loader = this.loadingController.create({
            content: "Please wait"
        });
        this.loader.present();

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

    addtemplate(school_id: number, temp: Template, token: string, id: number) {
        this.classProvider
            .addTemplate(school_id, temp, token, id)
            .subscribe(res => {
                    this.successToastreturn('Record updated', 'middle'), this.loader.dismiss(), this.resetform(), this.reload()
                },
                err => {
                    this.errorToast('Record not updated', 'middle');
                    this.loader.dismiss()
                }
            );
    }

    reload() {

        this.gettemplate(this.school_id, this.token, this.id)

    }

    removetemplate(id: number, token: string, tg_id: number) {
        this.classProvider
            .removeTemplate(id, token, tg_id)
            .subscribe(res => {
                    this.successToastreturn('Record deleted', 'middle'), this.loader.dismiss(), this.reload()
                },
                err => {
                    this.errorToast('Record not deleted', 'middle')
                });
    }

    save() {


        this.tmp.template_message = this.message;
        this.tmp.school_id = this.school_id;
        this.tmp.template_title = this.title;

        this.addtemplate(this.school_id, this.tmp, this.token, this.id)


    }


    delete(x) {

        let alert = this.alertCtrl.create({
            title: 'Template Delete',
            message: 'Do you Really want to Delete?',
            buttons: [{
                    text: 'Delete ',
                    handler: () => {
                        this.loading();
                        this.removetemplate(x.id, this.token, this.id)
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
        this.message = ''
        this.title = ''

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

    presentPopover(myEvent) {

        let popover = this.popoverCtrl.create(PopoverPage, {

        });

        popover.present({
            ev: myEvent

        });

    }


}