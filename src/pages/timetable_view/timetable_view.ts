import { Component,ViewChild } from '@angular/core';
import { NavController, AlertController, NavParams } from 'ionic-angular';
import { TimeTable } from '../../models/timetable';
import { TimeTableProvider } from '../../providers/Timetable-provider';
import { Home } from '../home/home';
import { GlobalVars } from '../../providers/global-provider';
import { Select } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';
import { PopoverPage } from '../../pages/popover/popover';
import { Parent } from '../../models/parent'


@Component({
    selector: 'timetable-view',
    templateUrl: 'timetable_view.html'
})

export class TimeTable_View {

    time_table: TimeTable = new TimeTable();
    parent: Parent[];
    role_type: string;
    selected_record: any;
    show: boolean;
    parm_standard: any;
    parm_section: any;
    time_table_notification_date_day: TimeTable[];
    showattend: boolean;
    showheader: boolean;
    loader: any;
    header_timetable: any;
    token:string;
    standard:any;
    section:any;
    class_id:any;
    id:number;

    @ViewChild('sectionSelect') sectionSelect: Select;

    constructor(public alertCtrl: AlertController, public navCtrl: NavController, navParams: NavParams,
        public timetableProvider: TimeTableProvider, public toastController: ToastController,
        public globalVars: GlobalVars, public loadingController: LoadingController,
        public popoverCtrl: PopoverController) {

        this.time_table_notification_date_day = new Array < TimeTable > ();

        this.show = false;

        this.showheader = true;
        this.time_table.class_id = navParams.get('parm_class_id');
        this.time_table.standard = navParams.get('parm_standard');
        this.time_table.section = navParams.get('parm_section');
        this.time_table.date = navParams.get('parm_tt_date');

        this.selected_record = navParams.get('parm_student_name')

        this.time_table.day = this.getDayOfWeek(this.time_table.date)
        this.token   = this.globalVars.getMyGlobalToken();        
        this.id = this.globalVars.getMyGlobalUserId();
        this.parent = this.globalVars.getMyGlobalParent()
        this.role_type = this.globalVars.getMyGlobalrole()

        if (this.role_type == "P") {
            this.showheader = false
            }

        this.loading();
        this.timetableGet(this.time_table.class_id, this.time_table.day, this.time_table.date, this.token, this.id);

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


    changerecord(x) {

        this.selected_record = x.parent_student_name
        //this.time_table.class_id = x.parent_student_class_id
        this.standard = x.parent_student_standard
        this.section = x.parent_student_section
        this.time_table.class_id = this.globalVars.getMyGlobalClass_id(this.standard, this.section)

        this.loading();
        this.timetableGet(this.time_table.class_id, this.time_table.day, this.time_table.date,this.token, this.id);

    }

    home() {

        this.navCtrl.push(Home);
        this.navCtrl.setRoot(Home);
    }

    doFilter() {

        this.sectionSelect.open();

    }


    filter_date(x) {

        let y: TimeTable[] = new Array < TimeTable > ()

        y = x.filter(xn => xn.date == this.time_table.date);

        if (y.length > 0) {
            console.log("the value of y" + y.length)
            x = y
        }

        this.time_table_notification_date_day = []

        for (let n of x) {

            let s: TimeTable = new TimeTable();
            s.attendance = n.attendance
            s.standard = this.parm_standard
            s.section = this.parm_section
            s.date = n.date
            s.start_time = n.start_time
            s.end_time = n.end_time
            s.name = n.name
            s.teacher_id = n.teacher_id;
            s.period = n.period
            s.attendance = n.attendance
            s.day = n.day
            s.subject = n.subject

            if (n.attendance) {
                s.attendance = true;
            } else {
                s.attendance = false;
            }

            this.time_table_notification_date_day.push(s)
        }

    }


    timetableGet(class_id: any, day: any, date: any,token:string,id:number) {
        let x: TimeTable[] = new Array < TimeTable > ()

        this.timetableProvider
            .getTimetable(class_id, day, date, token,id)
            .subscribe(res => {
                    x = < TimeTable[] > res, this.filter_date(x), this.time_table_header(x), this.loader.dismiss()
                },
                err => {
                    this.loader.dismiss(), this.errorToast()
                });
    }


    time_table_header(x) {

        if (x.length <= 0) {

            this.header_timetable = "No TimeTable data found!"

        } else {

            this.header_timetable = ''

        }
    }

    successToastreturn() {

        let toast = this.toastController.create({
            message: "Timetable updated",
            duration: 1000,
            position: 'middle'
        });
        toast.present();
    }

    errorToast() {
        let toast = this.toastController.create({
            message: "Record not loaded",
            duration: 1000,
            position: 'middle'
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