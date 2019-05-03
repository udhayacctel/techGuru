import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Exam_Selected } from '../../pages/exam_selected/exam_selected';
import { ToastController } from 'ionic-angular';
import { School_class_year } from '../../models/school_class_year';
import { LoadingController } from 'ionic-angular';
import { GlobalVars } from '../../providers/global-provider';
import { Exam_View } from '../../pages/exam_view/exam_view';
import { AlertController } from 'ionic-angular';
import { Examcreate } from '../../models/exam';
import { ExamtimetableProvider } from '../../providers/examtimetable-provider';
import { Parent } from '../../models/parent'


@Component({
    templateUrl: 'exam.html',
    selector: 'page-exam'
})
export class Exam {

    selected_standard: any;
    selected_exam_type: any;
    selected_examID: string;
    standard: School_class_year[];
    loader: any;
    school_id: any;
    role_type: string;
    selected_date: any;
    exam: Examcreate[];
    selected_section: any;
    selected_exam: any;
    parent: Parent[];
    parentView: boolean;
    selected_student: string;
    selected_student_name: string;
    selected_class_id: number
    selected_tt_date: any;
    selected_student_id: number;
    token:string;
    parent_standard:any;
    parent_section:any;
    id:number;
    examsel: boolean;

    constructor(public navCtrl: NavController, navParams: NavParams,

        public toastController: ToastController,
        public examProvider: ExamtimetableProvider,
        public loadingController: LoadingController,
        public alertCtrl: AlertController,
        public globalVars: GlobalVars) {

        this.school_id = this.globalVars.getMyGlobalschool()
        this.token   = this.globalVars.getMyGlobalToken();
        this.id = this.globalVars.getMyGlobalUserId();
        
        this.examtimetableGet(this.school_id, this.token, this.id);

        this.role_type = this.globalVars.getMyGlobalrole()
        this.standard = this.globalVars.getMyGlobalclass()
        this.school_id = this.globalVars.getMyGlobalschool()
        this.parent = this.globalVars.getMyGlobalParent()
       
        if (this.role_type == "P") {
            this.parentView = true
        this.selected_student = this.parent[0].parent_student_name
        this.parent_standard = this.parent[0].parent_student_standard
        this.parent_section = this.parent[0].parent_student_section
        this.selected_class_id = this.globalVars.getMyGlobalClass_id(this.parent_standard, this.parent_section)

        }
    }

    parseval(x) {

        this.selected_student = x.parent_student_name + '-' + x.parent_student_standard + '-' + x.parent_student_section
        this.selected_student_id = x.parent_student_id
        this.selected_standard = x.parent_student_standard
        this.selected_section = x.parent_student_section
        this.selected_student_name = x.parent_student_name
        this.selected_class_id = x.parent_student_class_id
    
    }

    loading() {

        this.loader = this.loadingController.create({
            content: "Please wait"
        });
        this.loader.present();
    }

    examtimetableGet(school_id: any, token:string, id:number) {

        this.examProvider
            .getExam(school_id, token, id)
            .subscribe(res => {
                    this.exam = < Examcreate[] > res, this.loadGlobalvar(this.exam)
                },
                err => {
                    this.errorToast()
                });
    }


    loadGlobalvar(x: Examcreate[]) {

        this.globalVars.setMyGlobalExam(x)

    }

    successToastreturn() {

        let toast = this.toastController.create({
            message: "Exam updated to database",
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

    submitview() {

        if ((this.selected_student === undefined || this.selected_student == null || this.selected_student.length <= 0) ||
            (this.selected_examID === undefined || this.selected_examID == null || this.selected_examID.length <= 0)) {


            let alert = this.alertCtrl.create({
                message: 'Please select Student and Exam',
                buttons: [{
                    text: 'OK'
                }]
            });
            alert.present();
        } else {


            this.navCtrl.push(Exam_View, {
               
                parm_exam_id: this.selected_examID,
                parm_class_id: this.selected_class_id,
                parm_student_name: this.selected_student
            });

        }

    }

    submit() {

        if ((this.selected_standard === undefined || this.selected_standard == null || this.selected_standard.length <= 0) ||
            (this.selected_examID === undefined || this.selected_examID == null || this.selected_examID.length <= 0)) {


            let alert = this.alertCtrl.create({
                message: 'Please select Standard and Exam',
                buttons: [{
                    text: 'OK'
                }]
            });
            alert.present();
        } else {

            this.navCtrl.push(Exam_Selected, {

                parm_class_id: this.globalVars.getMyGlobalClass_id(this.selected_standard, this.selected_examID),
                parm_standard: this.selected_standard,
                parm_exam_id: this.selected_examID
            });

        }
    }

    view(){
        if ((this.selected_standard === undefined || this.selected_standard == null || this.selected_standard.length <= 0) ||
            (this.selected_examID === undefined || this.selected_examID == null || this.selected_examID.length <= 0)) {


            let alert = this.alertCtrl.create({
                message: 'Please select Standard and Exam',
                buttons: [{
                    text: 'OK'
                }]
            });
            alert.present();
        } else {

            this.navCtrl.push(Exam_View, {

                parm_class_id: this.globalVars.getMyGlobalClass_id(this.selected_standard, this.selected_examID),
                parm_standard: this.selected_standard,
                parm_exam_id: this.selected_examID
            });

        }
    }
}