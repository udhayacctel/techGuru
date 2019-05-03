import { Component,ViewChild, Input } from '@angular/core';
import { GlobalVars } from '../../providers/global-provider';
import { NavController, NavParams } from 'ionic-angular';
import { ClassProvider } from '../../providers/class-provider';
import { ToastController } from 'ionic-angular';
import { Attendance } from '../../models/attendance';
import { Select } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Student } from '../../models/student';
import { Parent } from '../../models/parent';


export class absentInfo {
    date: string;
    day: any;
    attendance_check: string;
}

@Component({
    selector: 'attendance-report',
    templateUrl: 'attendance_report.html'
})

export class Attendance_Report {

    show: boolean = false;
    attendance: Attendance[]
    absent_info: absentInfo[]
    parm_standard: any;
    parm_section: any;
    student_name: string;
    student_id: number;
    date: String;
    attendance_check: boolean;
    no_present_days: number;
    no_absent_days: number;
    attendance_percentage: number;
    attend_percentage: number;
    selected_record: any;
    role: string;
    loader: any;
    parm_class_id: any;
    student: Student[];
    parent: Parent[];
    token:string;
    standard:any;
    section:any;
    class_id:any
    id:number;

    @ViewChild('sectionSelect') sectionSelect: Select;
    @ViewChild('parentSelect') parentSelect: Select;
    @Input('progress') progress;

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public dailydiary: ClassProvider,
        public toastController: ToastController,
        public globalVars: GlobalVars, public loadingController: LoadingController) {

        this.absent_info = new Array < absentInfo > ();
        this.role = this.globalVars.getMyGlobalrole()


        this.student = new Array < Student > ()
        this.parm_class_id = this.globalVars.getMyGlobalClass_id(this.parm_standard, this.parm_section)
        this.parm_standard = navParams.get('parm_standard');
        this.parm_section = navParams.get('parm_section');
        this.parm_class_id = navParams.get('parm_class_id')
        this.token   = this.globalVars.getMyGlobalToken();
        this.id = this.globalVars.getMyGlobalUserId();

        if (this.role == "P") {
            this.parent = this.globalVars.getMyGlobalParent()
            console.log("mystuid" + this.parent[0].parent_student_id + this.parent[0].parent_student_class_id)
            this.selected_record = this.parent[0].parent_student_name
            this.standard = this.parent[0].parent_student_standard
            this.section = this.parent[0].parent_student_section
            this.class_id= this.globalVars.getMyGlobalClass_id(this.standard, this.section)
          //  this.fetchpresentlist(this.parent[0].parent_student_class_id, this.parent[0].parent_student_id, this.token)
            this.fetchpresentlist(this.class_id, this.parent[0].parent_student_id, this.token, this.id)

        } else {

            this.fetchStudent(this.parm_class_id, this.token, this.id)

        }

    }

    loading() {

        this.loader = this.loadingController.create({
            content: "Please wait"
        });
        this.loader.present();
    }


    doFilter() {

        this.sectionSelect.open();

    }

    openParent() {

        this.parentSelect.open();

    }


    clicked() {

        this.show = !this.show;
    }

    fetchStudent(class_id: number, token:string, id:number) {

        this.dailydiary
            .getStudentForClass(class_id, token, id)
            .subscribe(res => {
                    this.student = < Student[] > res,  this.header(), this.loader.dismiss()
                },
                err => {
                    this.errorToast("Record not loaded", "middle"), this.loader.dismiss()
                });
    }


    header() {

        this.selected_record = this.student[0].student_roll_no + "-" + this.student[0].name
       this.fetchpresentlist(this.student[0].class_id, this.student[0].tg_id, this.token, this.id)
         this.fetchpresentlist(this.class_id, this.parent[0].parent_student_id, this.token, this.id)

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

    fetchpresentlist(class_id: number, student_id: number,token:string, id:number) {
        this.dailydiary
            .getstudentForattendance(class_id, student_id, token, id)
            .subscribe(res => {
                    this.attendance = < Attendance[] > res, this.rpt_absent(), this.loader.dismiss()
                },
                err => {
                    this.errorToast("Record not loaded", "middle"), this.loader.dismiss()
                });
    }

    changerecord(x) {

        this.absent_info = [];

        if (this.role == "P") {
            this.selected_record = x.parent_student_name
            this.section = x.parent_student_section
            this.standard = x.parent_student_standard
            this.class_id= this.globalVars.getMyGlobalClass_id(this.standard, this.section)

            this.loading()
            this.fetchpresentlist(this.class_id, x.parent_student_id, this.token, this.id)
            this.loader.dismiss()
        } else {
            this.selected_record = x.student_roll_no + "-" + x.name
           this.loading()
            this.fetchpresentlist(x.class_id, x.student_id, this.token, this.id)
            this.loader.dismiss()
        }
    }

    rpt_absent() {

        this.no_present_days = this.attendance.length;

        for (let n of this.attendance) {

            if (n.attendance == false) {

                let att: absentInfo = new absentInfo();
                att.attendance_check = "A"
                att.date = n.date;
                var dayOfWeek = new Date(att.date).getDay();
                att.day = isNaN(dayOfWeek) ? null : ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'][dayOfWeek];
                this.absent_info.push(att);
            }
        }


        this.no_absent_days = this.absent_info.length;

        this.attend_percentage = this.no_present_days - this.no_absent_days

        this.attendance_percentage = Math.round(this.attend_percentage / this.no_present_days * 100)
    }
}