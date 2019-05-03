import { Component} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { GlobalVars } from '../../providers/global-provider';	
import { LoadingController } from 'ionic-angular';	
import { BusProvider } from '../../providers/bus-provider';	
import { Bus } from '../../models/bus';

@Component({
    selector: 'bus-attendance',
    templateUrl: 'bus_attendance.html',
    providers: [BusProvider]

})

export class Bus_attendance {

    bus: Bus[];
    token: string;
    id: number;
    school_id: any;
    student_list: Bus[];
    current_date: any;

    constructor(public loadingController: LoadingController, public navCtrl: NavController,
        public navParams: NavParams, public busProvider: BusProvider,
        public toastController: ToastController, public globalVars: GlobalVars) {

        this.token = this.globalVars.getMyGlobalToken();
        this.id = this.globalVars.getMyGlobalUserId();
        this.school_id = this.globalVars.getMyGlobalschool()
        this.current_date = this.globalVars.getMyGlobaltodate()

        this.student_list = new Array < Bus > ();

        this.fetchbusroute(this.school_id, this.token, this.id)

    }


    fetchbusroute(school_id: number, token: string, id: number) {

        this.busProvider
            .getBusRoutes(school_id, token, id)
            .subscribe(res => {
                    this.bus = < Bus[] > res
                },
                err => {});
    }


    fetchbusstudent_list(route_no: number, date: string, token: string, id: number) {

        this.busProvider
            .getBusStudent_list(route_no, date, token, id)
            .subscribe(res => {
                    this.student_list = < Bus[] > res
                },
                err => {});
    }

    change(y) {

        console.log("bus id is" + y.route_no + y.route)
        this.fetchbusstudent_list(y.route_no, this.current_date, this.token, this.id)

    }

    updateAttendance(date: string, attendance: Bus[], token: string, id: number)

    {
        this.busProvider
            .updateBusAttendance(date, attendance, token, id)
            .subscribe(res => {
                    this.successToast('Record updated', 'middle')
                },
                err => {
                    this.errorToast("Record not updated", "middle")
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


    submit() {


        let selected_attendance: Bus[] = new Array < Bus > ();

        for (let n of this.student_list) {

            let b_attnd: Bus = new Bus();

            b_attnd.student_id = n.tg_id
            b_attnd.attendance = n.attendance
            b_attnd.class_id = n.class_id
            b_attnd.date = this.current_date
            b_attnd.created_by = this.globalVars.getMyGlobalUserId()

            selected_attendance.push(b_attnd)

        }
        this.updateAttendance(this.current_date, selected_attendance, this.token, this.id)

    }
}