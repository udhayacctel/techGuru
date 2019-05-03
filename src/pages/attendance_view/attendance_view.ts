import { Component} from '@angular/core';
import { Attendance } from '../../models/attendance';
import { ClassReferenceTime } from '../../models/classReferenceTime';
import { NavController, NavParams } from 'ionic-angular';
import { ClassProvider } from '../../providers/class-provider';
import { ToastController } from 'ionic-angular';
import { Student } from '../../models/student';
import { GlobalVars } from '../../providers/global-provider';	
import { LoadingController } from 'ionic-angular';	
	

@Component({
    selector: 'attendance-view',
    templateUrl: 'attendance_view.html',
    providers: [ClassProvider]

})

export class Attendance_View {

    show: boolean = false;
    attendance_period: ClassReferenceTime[];
    parm_class_id: any;
    parm_standard: any;
    parm_section: any;
    parm_school_id: number;
    student_details: Attendance[]
    parm_period: any
    parm_subject: any
    parm_start_time: any
    parm_end_time: any
    parm_teacher: any
    selected_abt_page_date: String;
    loader: any;
    current_date: any;
    day: any;
    tt_id: number;
    parm_update_id: number;
    token: string;
    id: number;

    constructor(public loadingController: LoadingController, public navCtrl: NavController,
        public navParams: NavParams,
        public classProvider: ClassProvider,
        public toastController: ToastController, public globalVars: GlobalVars) {


        this.current_date = this.globalVars.getMyGlobaltodate()
        this.day = this.globalVars.getMyGlobaltoday()
        this.selected_abt_page_date = this.current_date;
        this.parm_standard = this.navParams.get('parm_standard');
        this.parm_section = this.navParams.get('parm_section');
        this.parm_school_id = this.navParams.get('parm_school_id');
        this.parm_period = this.navParams.get('parm_period')
        this.parm_subject = this.navParams.get('parm_subject')
        this.parm_start_time = this.navParams.get('parm_start_time')
        this.parm_end_time = this.navParams.get('parm_end_time')
        this.parm_teacher = this.navParams.get('parm_teacher')
        this.tt_id = this.navParams.get('parm_update_id')
        this.parm_class_id = this.globalVars.getMyGlobalClass_id(this.parm_standard, this.parm_section)
        this.token = this.globalVars.getMyGlobalToken();
        this.id = this.globalVars.getMyGlobalUserId();

        if (this.parm_period.length == 0) {
            this.parm_period = "All"
        }
        this.loading()
        //    this.fetchStudent(this.parm_class_id)
        console.log("token " + this.token)
        this.fetchAttndStudent(this.tt_id, this.current_date, this.parm_class_id, this.token, this.id)
        this.loader.dismiss()
        this.student_details = new Array < Attendance > ();
    }

    loading() {
        this.loader = this.loadingController.create({
            content: "Please wait"
        });
        this.loader.present();
    }

    fetchAttndStudent(tt_id: number, date: string, class_id: number, token: string, id: number) {

        this.classProvider
            .getStudentForAttendance(tt_id, date, class_id, token, id)
            .subscribe(res => {
                    this.student_details = < Attendance[] > res, this.loader.dismiss()
                },
                err => {
                    this.errorToast("Record not loaded", "middle"), this.loader.dismiss()
                });


    }

    /*
        fetchStudent(class_id: number) {

            let x: Student[]

            this.classProvider
                .getStudentForClass(class_id)
                .subscribe(res => {
                        x = < Student[] > res, this.loadData(x), this.loader.dismiss()
                    },
                    err => {
                        this.errorToast("Record not loaded", "middle"), this.loader.dismiss()
                    });


        }
    */

    /*
        loadData(y: Student[]) {

            for (let n of y) {
                let z = new Attendance()
                z.student_id = n.student_id
                z.student_name = n.name
                z.student_roll_no = n.student_roll_no
                z.attendance = n.attendance 
                this.student_details.push(z)
            }

       }

    */

    fetchperiod(class_id: number, token: string, id: number) {
        this.classProvider
            .getAllRefTimes(class_id, token, id)
            .subscribe(res => {
                    this.attendance_period = < ClassReferenceTime[] > res
                },
                err => this.errorToast("Period not loaded", "middle"));

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

    clicked() {

        this.show = !this.show;
    }

    submit() {

        let selected_attendance: Attendance[] = new Array < Attendance > ();

        for (let n of this.student_details) {

            let s_attnd: Attendance = new Attendance();
            s_attnd.id = this.tt_id
            s_attnd.student_id = n.student_id
            s_attnd.attendance = n.attendance
            s_attnd.date = this.current_date
            s_attnd.created_by = this.globalVars.getMyGlobalUserId()
            s_attnd.modified_by = this.globalVars.getMyGlobalUserId()
            s_attnd.created_by_date = this.globalVars.getMyGlobaltodate()
            s_attnd.modified_by_date = this.globalVars.getMyGlobaltodate()

            selected_attendance.push(s_attnd)
        }
        this.loading();
        this.updateAttendance(this.tt_id, this.parm_class_id, selected_attendance, this.token, this.id)

    }

    updateAttendance(tt_id: number, class_id: number, attendance: Attendance[], token: string, id: number)

    {

        this.classProvider
            .updateAttendance(tt_id, class_id, attendance, token, id)
            .subscribe(res => {
                    this.loader.dismiss(), this.successToast('Record updated', 'middle')
                },
                err => {
                    this.errorToast("Record not updated", "middle"), this.loader.dismiss()
                });
    }
}