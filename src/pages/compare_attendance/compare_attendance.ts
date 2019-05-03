import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { GlobalVars } from '../../providers/global-provider';
import { BusProvider } from '../../providers/bus-provider';
import { ToastController } from 'ionic-angular';
import { Bus } from '../../models/bus';
import { PopoverPage } from '../../pages/popover/popover'
import { PopoverController } from 'ionic-angular';


export class absentInfo {
    date: string;
    class_attendance: string;
    bus_attendance:string;
}

@Component({
    selector: 'compare-attendance',
    templateUrl: 'compare_attendance.html'
})

export class Compare_Attendance {

    parm_standard: any;
    parm_section: any;
    parm_class_id: any;
    token: string;
    id: number;
    student_list: Bus[];
    absent_list: Bus[];
    absent_info: absentInfo[]


    constructor(public loadingController: LoadingController, public navCtrl: NavController,
        public navParams: NavParams, public globalVars: GlobalVars, public busProvider: BusProvider,
        public toastController: ToastController, public popoverCtrl: PopoverController) {

        this.parm_standard = this.navParams.get('parm_standard');
        this.parm_section = this.navParams.get('parm_section');
        this.parm_class_id = this.globalVars.getMyGlobalClass_id(this.parm_standard, this.parm_section)
        this.token = this.globalVars.getMyGlobalToken();
        this.id = this.globalVars.getMyGlobalUserId();
        console.log(this.parm_class_id)
        this.absent_info = new Array < absentInfo > ();

        this.fetchAttndStudent(this.parm_class_id, this.token, this.id)

    }

    select(y) {

        this.fetchabsentlist(y.tg_id, this.token, this.id)

    }

    fetchAttndStudent(class_id: number, token: string, id: number) {

        this.busProvider
            .getBusStudentClass(class_id, token, id)
            .subscribe(res => {
                    this.student_list = < Bus[] > res
                },
                err => {
                    this.errorToast("Record not loaded", "middle")
                });
    }

    fetchabsentlist(student_id: number, token: string, id: number) {

        this.busProvider
            .getBusAbsent_list(student_id, token, id)
            .subscribe(res => {
                    this.absent_list = < Bus[] > res
                },
                err => {
                    this.errorToast("Record not loaded", "middle")
                });
    }

    private errorToast(msg: string, pos: string) {

        let toast = this.toastController.create({
            message: msg,
            duration: 1000,
            position: pos
        });
        toast.present();

    }

    private successToast(msg: string, pos: string) {

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