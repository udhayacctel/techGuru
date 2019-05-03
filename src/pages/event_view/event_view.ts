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
import { PopoverPage } from '../../pages/popover/popover'
import { PopoverController } from 'ionic-angular';


@Component({
    selector: 'period-page',
    templateUrl: 'event_view.html'
})

export class Event_View {

    student: Student[];
    parm_class_id: any;
    parm_standard: any;
    parm_section: any;
    token: any;
    id: number;
    loader: any;
    selected_name: any;
    selected_student_id: any;
    event: EventsClass[];
    house: EventsClass[];
    evnt: EventsClass = new EventsClass();
    selected_activity: any;
    selected_house: any;
    selected_event: any;
    student_event: EventsClass[];
    selected_prize: any;


    constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
        public classprovider: ClassProvider, public loadingController: LoadingController, public popoverCtrl: PopoverController,
        public globalVars: GlobalVars, public eventsprovider: EventsProvider, public toastController: ToastController, ) {

        this.parm_class_id = navParams.get('parm_class_id');
        this.parm_standard = navParams.get('parm_standard');
        this.parm_section = navParams.get('parm_section');
        this.token = this.globalVars.getMyGlobalToken();
        this.id = this.globalVars.getMyGlobalUserId();
        this.loading();
        this.fetchStudent(this.parm_class_id, this.token, this.id);
        this.gethouse("House", this.token, this.id)

    }


    loading() {

        this.loader = this.loadingController.create({
            content: "Please wait"
        });
        this.loader.present();
    }

    fetchStudent(class_id: number, token: string, id: number) {


        this.classprovider
            .getStudentForClass(class_id, token, id)
            .subscribe(res => {
                    this.student = < Student[] > res, this.loader.dismiss()
                },
                err => {
                    this.loader.dismiss()
                });
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

    gethouse(activity: string, token: string, id: number) {
        this.eventsprovider
            .getevents(activity, token, id)
            .subscribe(res => {
                    this.house = < EventsClass[] > res

                },
                err => {
                    this.errorToast('Record not updated', 'middle');
                    this.loader.dismiss()
                }
            );
    }

    select_event() {

        this.getevents(this.selected_activity, this.token, this.id)

    }

    changerecord(x) {

        this.selected_student_id = x.student_id;
        this.selected_name = x.name
        this.getstudentevent(x.student_id, this.token, this.id)

        console.log("id" + this.selected_student_id + this.selected_name)

    }

    addstudentevents(event: EventsClass, student_id: number, token: string, id: number) {
        this.eventsprovider
            .addstudentevents(event, student_id, token, id)
            .subscribe(res => {
                    this.successToastreturn('Record updated', 'middle'), this.reload()
                },
                err => {
                    this.errorToast('Record not updated', 'middle');
                    this.loader.dismiss()
                }
            );
    }


    reload() {

        this.getstudentevent(this.selected_student_id, this.token, this.id)

    }

    getstudentevent(student_id: number, token: string, id: number) {
        this.eventsprovider
            .getstudentevents(student_id, token, id)
            .subscribe(res => {
                    this.student_event = < EventsClass[] > res, this.check()

                },
                err => {
                    this.errorToast('Record not updated', 'middle');
                    this.loader.dismiss()
                }
            );
    }

    check() {

        for (let x of this.student_event) {
            this.selected_house = x.house_name
        }
    }

    removestudentevents(id: number, token: string, tg_id: number) {
        this.eventsprovider
            .removestudentevents(id, token, tg_id)
            .subscribe(res => {
                    this.successToastreturn('Record deleted', 'middle'), this.loader.dismiss(), this.reload()
                },
                err => {
                    this.errorToast('Record not deleted', 'middle')
                });
    }

    delete(x) {

        let alert = this.alertCtrl.create({
            title: 'Template Delete',
            message: 'Do you Really want to Delete?',
            buttons: [{
                    text: 'Delete ',
                    handler: () => {
                        this.loading();
                        this.removestudentevents(x.id, this.token, this.id)
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

        this.evnt.student_id = this.selected_student_id;
        this.evnt.house_name = this.selected_house;
        this.evnt.activity = this.selected_activity;
        this.evnt.name = this.selected_event;
        this.evnt.prize = this.selected_prize;

        this.addstudentevents(this.evnt, this.selected_student_id, this.token, this.id)


    }
    presentPopover(myEvent) {

        let popover = this.popoverCtrl.create(PopoverPage, {

        });

        popover.present({
            ev: myEvent

        });

    }

}