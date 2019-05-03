import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { TimeTable } from '../../models/timetable';
import { TimeTableProvider } from '../../providers/Timetable-provider';
import { ToastController } from 'ionic-angular';
import { Home } from '../home/home';
import { Attendance_View }  from '../attendance_view/attendance_view';
import { LoadingController } from 'ionic-angular';	
import { GlobalVars } from '../../providers/global-provider';	
import { PopoverController } from 'ionic-angular';
import { PopoverPage } from '../../pages/popover/popover';


@Component({
    selector: 'attendance-selected',
    templateUrl: 'attendance_selected.html'
})
export class Attendance_Selected {

   
    time_notification: TimeTable[];
    timetab: Array < {
        periods: any,
        subjects: any
    } > ;
    date: any;
    parm_standard: any
    parm_section: any
    parm_school_id: number;
    loader: any;
    day: any;
    header: any;
    parm_class_id: number;
    selected_id: number;
    token:string;
    id:number;

    constructor(public loadingController: LoadingController, public navCtrl: NavController, navParams: NavParams,
        public globalVars: GlobalVars, public timetableProvider: TimeTableProvider, public toastController: ToastController,
        public popoverCtrl: PopoverController) {
        this.date = this.globalVars.getMyGlobaltodate()
        this.day = this.globalVars.getMyGlobaltoday()
        this.parm_class_id = navParams.get('parm_class_id');
        this.parm_standard = navParams.get('parm_standard');
        this.parm_section = navParams.get('parm_section');
        this.parm_school_id = navParams.get('parm_school_id');
        this.time_notification = new Array < TimeTable > ();
        this.token   = this.globalVars.getMyGlobalToken();
        this.id = this.globalVars.getMyGlobalUserId();

        this.loading();
        this.timetableGet(this.parm_class_id, this.day, this.date, this.token, this.id);
        this.loader.dismiss()
    }

    loading() {
        this.loader = this.loadingController.create({
            content: "Please wait"
        });
        this.loader.present();
    }

    getDayOfWeek(date) {
        var dayOfWeek = new Date(date).getDay();
        return isNaN(dayOfWeek) ? null : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek];
    }

    timetableGet(class_id: any, day: any, date: any, token: string, id:number) {
        let x: TimeTable[] = new Array < TimeTable > ()

        this.timetableProvider
            .getTimetable(class_id, day, date, token, id)
            .subscribe(res => {
                    x = < TimeTable[] > res, this.check(x), this.loader.dismiss(), this.loadattendance(x)
                },
                err => {
                    this.errorToast(), this.loader.dismiss()
                });
    }

    check(x) {

        for (let n of x) {
            this.selected_id = x.id
        }

        if (x.length <= 0) {
            this.header = "No Attendance for this Day!!!"
        }
    }

    loadattendance(x) {

        console.log("the date for attendacne " + this.date)
        let y: TimeTable[] = new Array < TimeTable > ()

        y = x.filter(xn => xn.date == this.date);

        if (y.length > 0) {
            console.log("the value of y" + y.length)
            x = y
        }

        for (let n of x) {

            let s: TimeTable = new TimeTable()

            if (n.attendance) {

                s.attendance = n.attendance
                s.class_id = this.parm_standard,
                    s.section = this.parm_section,
                    s.school_id = this.parm_school_id,
                    s.period = n.period,
                    s.subject = n.subject,
                    s.start_time = n.start_time,
                    s.end_time = n.end_time,
                    s.id = n.id,
                    s.name = n.name
            
                this.time_notification.push(s)
              
            }

        }
    }

  
    errorToast() {
        let toast = this.toastController.create({
            message: "TimeTable not loaded",
            duration: 1000,
            position: 'middle'
        });
        toast.present();

    }

    home() {

        this.navCtrl.push(Home);
        this.navCtrl.setRoot(Home);

    }

    toggle(n) {
      
        this.navCtrl.push(Attendance_View, {
            parm_class_id: this.parm_class_id,
            parm_standard: this.parm_standard,
            parm_section: this.parm_section,
            parm_school_id: this.parm_school_id,
            parm_period: n.period,
            parm_subject: n.subject,
            parm_start_time: n.start_time,
            parm_end_time: n.end_time,
            parm_teacher: n.name,
            parm_update_id: n.id
        });
    }

    submit() {

        this.navCtrl.push(Attendance_View, {
            parm_class_id: this.globalVars.getMyGlobalClass_id(this.parm_standard, this.parm_section),
            parm_standard: this.parm_standard,
            parm_section: this.parm_section,
            parm_school_id: this.parm_school_id

        });
    }
    presentPopover(myEvent) {

        let popover = this.popoverCtrl.create(PopoverPage, {

        });

        popover.present({
            ev: myEvent
        });

    }
}