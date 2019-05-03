import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams,AlertController} from 'ionic-angular';
import { ClassProvider } from '../../providers/class-provider';
import { ToastController } from 'ionic-angular';
import { Select } from 'ionic-angular';
import { Home } from '../home/home';
import { LoadingController } from 'ionic-angular';
import { Student } from '../../models/student';
import { ParentMeetProvider } from '../../providers/parentmeet';
import { Parentmeet } from '../../models/parentMeet';
import { ParentMeet_View } from '../../pages/parentmeet_view/parentmeet_view';
import { PopoverPage} from '../../pages/popover/popover';
import { PopoverController } from 'ionic-angular';
import { GlobalVars } from '../../providers/global-provider';
import { Teacher } from '../../models/teacher';
import { Teacher_class } from '../../models/teacher_class';


@Component({
    selector: 'parent-meet-selected',
    templateUrl: 'parentmeet_selected.html'
})
export class ParentMeet_Selected {

    parm_school_id: any;
    parm_standard: any;
    parm_section: any;
    selected_record: any;
    parentmeeting: Parentmeet[];
    teacherparentmeeting: Parentmeet = new Parentmeet();
    loader: any;
    roll_no: any;
    selected_student_message: any;
    selected_teacher_message: any;
    student_message: any;
    teacher_message: any;
    student_name: any;
    selected_student_name: any;
    selected_student_id: number;
    parm_class_id: any;
    student: Student[]
    teacher: Teacher[];
    teacher_id: number;
    token:string;
    id:number;

    @ViewChild('sectionSelect') sectionSelect: Select;

    constructor(public loadingController: LoadingController,
        public navCtrl: NavController,
        public navParams: NavParams,
        public classProvider: ClassProvider,
        public toastController: ToastController,
        public parentprovider: ParentMeetProvider,
        public popoverCtrl: PopoverController,
        public alertCtrl: AlertController,
        public globalVars: GlobalVars) {

        this.teacher = this.globalVars.getMyGlobalTeacher()

        this.parm_class_id = navParams.get('parm_class_id');
        this.parm_standard = navParams.get('parm_standard');
        this.parm_section = navParams.get('parm_section');
        this.parm_school_id = this.globalVars.getMyGlobalschool()
        this.token   = this.globalVars.getMyGlobalToken();
        this.id = this.globalVars.getMyGlobalUserId();
        this.loading();
        this.fetchStudent(this.parm_class_id, this.token, this.id);
    }


    loading() {

        this.loader = this.loadingController.create({
            content: "Please wait"
        });
        this.loader.present();
    }

    fetchStudent(class_id: number, token:string, id:number) {


        this.classProvider
            .getStudentForClass(class_id, token, id)
            .subscribe(res => {
                    this.student = < Student[] > res, this.studentHeader(this.student), this.loader.dismiss()
                },
                err => {
                    this.errorToast("Record not loaded", "middle"), this.loader.dismiss()
                });
    }

    studentHeader(x: Student[]) {

        this.selected_record = x[0].student_id + "-" + x[0].name;
        this.selected_student_id = x[0].student_id

    }

    parentPost(prvd_for_parertmeeting: Parentmeet, class_id: number, student_id:number, token:string, id:number) {
        this.parentprovider
            .addmessage(prvd_for_parertmeeting, class_id, student_id, token, id)
            .subscribe(res => {
                    this.successToastreturn("Records updated", "middle"), this.loader.dismiss(), this.reset()
                },
                err => {
                    this.loader.dismiss(), this.errorToast("Records not updated", "middle")
                });
    }

    reset() {
        this.selected_teacher_message = ''
        this.selected_student_message = ''
    }

   /* check() {

        for (let x of this.student) {
            let i = 0
            i = i + 1

            if (i == 1) {
                this.selected_record = x.student_id + "-" + x.student_name;
                this.student_name = x.student_name
                this.selected_student_id = x.student_id
            }
        }

    }*/
    changerecord(x) {

        this.selected_record = x.student_id + "-" + x.name;

        this.selected_student_id = x.student_id;
        this.selected_student_name = this.student_name;
        this.teacher_message = this.selected_teacher_message;
        this.student_message = this.selected_student_message

    }

    doFilter() {

        this.sectionSelect.open();
        console.log("am coming" + this.selected_record);

    }


    home() {

        this.navCtrl.push(Home);
        this.navCtrl.setRoot(Home);
    }

    successToastreturn(message: string, pos: string) {
        let toast = this.toastController.create({
            message: message,
            duration: 1000,
            position: pos
        });
        toast.present();
    }

    errorToast(message: string, pos: string) {

        let toast = this.toastController.create({
            message: message,
            duration: 1000,
            position: pos
        });
        toast.present();

    }

    View() {

        this.navCtrl.push(ParentMeet_View, {
            
            parm_class_id: this.parm_class_id,        
            parm_standard: this.parm_standard,
            parm_section: this.parm_section,
            parm_school_id: this.parm_school_id,
            parm_student_id: this.selected_student_id,
            parm_roll_no: this.roll_no,
            parm_record: this.selected_record
        });
    }


    save() {

         
     if ((this.selected_teacher_message === undefined || this.selected_teacher_message == null || this.selected_teacher_message.length <= 0) ||
        (this.selected_student_message === undefined || this.selected_student_message== null || this.selected_student_message.length <= 0)) {
            
            let alert = this.alertCtrl.create({
                message: 'Please Fill all the Fields',
                buttons: [{
                    text: 'OK'
                }]
            });
            alert.present();

        } else {
        this.teacherparentmeeting.teacher_message = this.selected_teacher_message
        this.teacherparentmeeting.student_message = this.selected_student_message
        this.teacherparentmeeting.student_id = this.selected_student_id
        this.teacherparentmeeting.class_id = this.parm_class_id
        this.teacherparentmeeting.date = this.globalVars.getMyGlobaltodate()
        this.teacherparentmeeting.created_by = this.globalVars.getMyGlobalUserId()
        this.teacherparentmeeting.created_by_date = this.globalVars.getMyGlobaltodate()
        this.teacherparentmeeting.teacher_id = this.globalVars.getMyGlobalUserId()
        this.parentPost(this.teacherparentmeeting, this.parm_class_id,this.teacherparentmeeting.student_id, this.token, this.id);
        console.log(this.parm_class_id + this.selected_teacher_message + this.selected_student_message + this.selected_student_id + this.teacherparentmeeting.teacher_id + this.teacherparentmeeting.date)
    }
    }

    presentPopover(myEvent) {
        let popover = this.popoverCtrl.create(PopoverPage, {

            parentMeet_view: "parentMeetView",
            standard: this.parm_standard,
            section: this.parm_section,
            school_id: this.parm_school_id,
            student_id: this.selected_student_id,
            rollno: this.roll_no,
            record: this.selected_record,
            class_id: this.parm_class_id

        });
        popover.present({
            ev: myEvent

        });

    }
}