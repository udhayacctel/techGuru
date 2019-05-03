import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams,AlertController, ViewController } from 'ionic-angular';
import { Examtimetable } from '../../models/exam_timetable';
import { ExamtimetableProvider } from '../../providers/examtimetable-provider';
import { Exam_Selected } from '../../pages/exam_selected/exam_selected';
import { LoadingController } from 'ionic-angular';
import { Home } from '../home/home';
import { ToastController } from 'ionic-angular';
import { ItemSliding } from 'ionic-angular';
import { GlobalVars } from '../../providers/global-provider';
import { Select } from 'ionic-angular';
import { Examcreate } from '../../models/exam';
import { School_class_year } from '../../models/school_class_year';
import { Parent } from '../../models/parent';


@Component({
    selector: 'exam-view',
    templateUrl: 'exam_view.html'

})


export class Exam_View {

    show: boolean;
    exam_view: Examtimetable[]
    standard: any;
    school: number
    exam_type: string;
    loader: any;
    parm_id: number;
    header_exam_type: string;
    selected_record: any;
    indx: number;
    showheader: boolean = true;
    exam: Examcreate[];
    class_id_all: number[];
    subject_id_all: number[];
    class_id: number;
    exam_id: number;
    school_id: number;
    selected_exam_id: number;
    subject_id: number;
    role: string;
    stu: boolean;
    teach: boolean;
    parent: Parent[];
    selected_standard: string;
    class_student_id: number;
    class_id_new: number;
    token:string;
    section:any;
    parent_class_id:any;
    id:number;
    ex:boolean;

    @ViewChild('sectionSelect') sectionSelect: Select;
    @ViewChild('examSelect') examSelect: Select;


    constructor(public alertCtrl: AlertController, public navCtrl: NavController,
        public navParams: NavParams,
        public examProvider: ExamtimetableProvider,
        public loadingController: LoadingController,
        public toastController: ToastController,
        public globalVars: GlobalVars, public viewCtrl: ViewController) {

        this.parent = this.globalVars.getMyGlobalParent();

        this.token   = this.globalVars.getMyGlobalToken(); 
        this.id = this.globalVars.getMyGlobalUserId();       
        this.show = false;
        this.school_id = this.globalVars.getMyGlobalschool()
        this.role = this.globalVars.getMyGlobalrole()
        this.exam_id = navParams.get('parm_exam_id')
        this.class_id = navParams.get('parm_class_id')
        this.selected_record = navParams.get('parm_student_name')
        this.standard = navParams.get('parm_sandard')
       
        this.exam = this.globalVars.getMyGlobalExam();
        this.headerExam()
        this.Getexam(this.school_id, this.token, this.id);

        if (this.role == "P") {

            this.stu = true;
            this.teach = false;

            this.parent = this.globalVars.getMyGlobalParent()

            this.selected_standard = this.parent[0].parent_student_standard
            this.class_student_id = this.parent[0].parent_student_id,
            this.examtimetableGet(this.class_id, this.exam_id, this.token, this.id)

        } else {
            this.teach = true;
            this.standard = navParams.get('parm_standard')

            this.class_id_all = this.globalVars.getMyGlobalAllClass_id(this.standard)
            this.class_id = this.class_id_all[0]
        

            this.examtimetableGet(this.class_id, this.exam_id, this.token, this.id)
        }
    }

    ionViewCanEnter() {

        this.loading()
        this.examtimetableGet(this.class_id, this.exam_id, this.token, this.id)
        this.loader.dismiss()
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

    listExam() {
        this.examSelect.open();
    }

    changerecord(x) {

        this.selected_record = x.parent_student_name
  //      this.class_id = x.parent_student_class_id
        //this.standard = x.standard
        this.standard = x.parent_student_standard
        this.section = x.parent_student_section
        this.parent_class_id= this.globalVars.getMyGlobalClass_id(this.standard, this.section)

        this.school = x.school_id

        this.loading()
        this.examtimetableGet(this.parent_class_id, this.exam_id, this.token, this.id)

    }
    timetable(x) {

        this.exam_type = x.name
        this.header_exam_type = x.name
        //this.class_id = this.parent_class_id

        this.loading()
        this.examtimetableGet(this.class_id, x.id, this.token, this.id)
        this.Getexam(this.school_id, this.token, this.id)

    }
    select_exam_type(z) {

        this.indx = this.exam_view.indexOf(z);

    }

    examtable(n) {


        let index = this.exam.indexOf(n);

        if (this.indx > -1) {
            this.exam[this.indx].name = this.header_exam_type
        }
    }


    examtimetableGet(class_id: number, exam_id: number, token:string, id:number) {

        this.examProvider
            .getExamtable(class_id, exam_id, token, id)
            .subscribe(res => {
                    this.exam_view = < Examtimetable[] > res, this.loader.dismiss(), this.exam_type_header(Exam_View)
                },
                err => {
                    this.loader.dismiss(), this.errorToast("Records not loaded")
                });
    }


    Getexam(school_id: any, token: string, id:number) {

        this.examProvider
            .getExam(school_id, token, id)
            .subscribe(res => {
                    this.exam = < Examcreate[] > res
                },
                err => {
                    this.errorToast("Record not loaded")
                });
    }

headerExam() {
        console.log("myExamid" + this.exam_id)
        for (let x of this.exam) {
            console.log("myExamid G" + x.id)
            if (x.id == this.exam_id) {
                this.header_exam_type = x.name
            }     
        }
    }

    exam_type_header(x) {
      
        if (this.exam_view.length <= 0) {

            this.header_exam_type = "No Exam data found!"
        }
    }


    edit(slidingItem: ItemSliding, n) {

        console.log("the value of start time in edit" + n.from_time)
        slidingItem.close();
        this.navCtrl.push(Exam_Selected, {
            parm_standard: this.standard,
            parm_exam_id: n.exam_id,
            parm_exam_type: this.header_exam_type,
            parm_exam_date: n.date,
            parm_from_time: n.start_time,
            parm_to_time: n.end_time,
            parm_subject_id: n.subject_id,
            parm_syllabus: n.syllabus,
            parm_id: n.id,
            parm_update_type: "edit"
        }).then(() => {
            const index = this.viewCtrl.index;
            for(let i=index; i>3; i--){
                this.navCtrl.remove(i);
            }
        })
    }

    reload() {

        this.examtimetableGet(this.class_id, this.exam_id, this.token, this.id)

    }

    examDelete(exm: Examtimetable[], exam_id: number, subject_id: number, cls_id:number, token:string, id:number) {

        this.examProvider
            .removeExamtable(exm, exam_id, subject_id,cls_id, token, id)
            .subscribe(res => {
                    this.reload(), this.successToastDelete('Record deleted')
                },
                err => this.errorToast('Record not deleted'));
    }


    Delete(slidingItem: ItemSliding, x) {

        let alert = this.alertCtrl.create({
            title: 'Exam Timetable Delete',
            message: 'Do you really want to delete?',
            buttons: [{
                    text: 'Delete ',
                    handler: () => {

                        this.exam_view = []
                        this.class_id_all = []

                        this.class_id_all = this.globalVars.getMyGlobalAllClass_id(this.standard);


                        for (let y of this.class_id_all) {
                            console.log("the value of subject_id" + x.subject_id)
                            console.log("the value of exam_id" + x.exam_id)
                            let exam: Examtimetable = new Examtimetable();
                            exam.class_id = y
                            exam.exam_id = x.exam_id
                            exam.subject_id = x.subject_id
                            this.exam_view.push(exam)
                        }

                        this.examDelete(this.exam_view, x.exam_id, x.subject_id, this.class_id, this.token, this.id)


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

        slidingItem.close()
    }

    errorToast(msg) {
        let toast = this.toastController.create({
            message: msg,
            duration: 1000,
            position: 'middle'
        });
        toast.present();
    }

    successToastDelete(msg) {
        let toast = this.toastController.create({
            message: msg,
            duration: 1000,
            position: 'middle'
        });
        toast.present();
    }

    view(n) {

        if (!n.expand) {
            n.expand = true;
        } else {
            n.expand = false;
        }
    }

    home() {
        this.navCtrl.push(Home);
        this.navCtrl.setRoot(Home);
    }

}