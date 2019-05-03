import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Examtimetable } from '../../models/exam_timetable';
import { ExamtimetableProvider } from '../../providers/examtimetable-provider';
import { ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { UsernameValidator } from '../validator/username';
import { Subject } from '../../models/subject';
import { Home } from '../home/home';
import { LoadingController } from 'ionic-angular';
import { GlobalVars } from '../../providers/global-provider';
import { PopoverPage } from '../../pages/popover/popover';
import { PopoverController } from 'ionic-angular';
import { Examcreate } from '../../models/exam'
import { School_class_year } from '../../models/school_class_year';


@Component({
    templateUrl: 'exam_selected.html',
    selector: 'exam-selected-view',
    providers: [ExamtimetableProvider]
})


export class Exam_Selected {

    exam_notification: Examtimetable = new Examtimetable();
    exam_timetable_notification: Examtimetable[];
    examtimetable: FormGroup;
    class_id_all: number[];
    class_id: number;
    standard: string;
    update_type: string;
    loader: any;
    show: boolean;
    selected_from_date: any;
    subject_class: School_class_year[];
    exam_id: number;
    exam_type: string;
    subject_id: number;
    exam: Examcreate[];
    subjectIDForUpdate: number;
    token:string;
    id:number;
    
    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public formBuilder: FormBuilder,
        public examProvider: ExamtimetableProvider,
        public toastController: ToastController,
        public loadingController: LoadingController,
        public globalVars: GlobalVars, public popoverCtrl: PopoverController) {
        this.show = false;
        this.exam_timetable_notification = new Array < Examtimetable > ();
        this.subjectIDForUpdate = 0
        this.token   = this.globalVars.getMyGlobalToken();     
        this.id = this.globalVars.getMyGlobalUserId(); 
        this.selected_from_date = this.globalVars.getMyGlobaltodate();
        this.exam = this.globalVars.getMyGlobalExam();

        this.update_type = navParams.get('parm_update_type')
        this.standard = navParams.get('parm_standard');
        this.exam_notification.standard = navParams.get('parm_standard');
        this.exam_notification.exam_type = navParams.get('parm_exam_type')
        this.exam_notification.exam_id = navParams.get('parm_exam_id')
        this.exam_id = navParams.get('parm_exam_id')
        this.subject_class = this.globalVars.getMyGlobalsubject_std(this.standard)

        for (let x of this.exam) {

            if (this.exam_id == x.id) {
                this.exam_type = x.name
            }
        }

               
        if (this.update_type == "edit") {
            this.parmsForedit()
        } else {
            this.parmsForadd()
        }
        this.loading()
        this.loader.dismiss()
    }

    parmsForedit() {

        this.exam_notification.date = this.navParams.get('parm_exam_date');
        this.exam_notification.exam_type = this.navParams.get('parm_exam_type');
        this.exam_notification.subject_id = this.navParams.get('parm_subject_id');
        this.subjectIDForUpdate = this.navParams.get('parm_subject_id');
        this.exam_notification.start_time = this.navParams.get('parm_from_time');
        this.exam_notification.end_time = this.navParams.get('parm_to_time');
        this.exam_notification.standard = this.navParams.get('parm_standard');
        this.exam_notification.syllabus = this.navParams.get('parm_syllabus');
        this.exam_notification.id = this.navParams.get('parm_id');

        console.log("the value of start time" + this.exam_notification.start_time)
        this.examtimetable = this.formBuilder.group({
            selected_from_date: [this.exam_notification.date, UsernameValidator.checkToDate],
            selected_from_time: [this.exam_notification.start_time, Validators.required],
            selected_to_time: [this.exam_notification.end_time, Validators.required],
            selected_subject: [this.exam_notification.subject_id],
            selected_syllabus: [this.exam_notification.syllabus]

        })

    }

    parmsForadd() {

        this.examtimetable = this.formBuilder.group({
            selected_from_date: [this.selected_from_date, UsernameValidator.checkToDate],
            selected_from_time: ['', Validators.required],
            selected_to_time: ['', Validators.required],
            selected_subject: ['', UsernameValidator.checkSubject],
            selected_syllabus: ['', Validators.required]
        })
    }

    loading() {
        this.loader = this.loadingController.create({
            content: "Please wait"
        });
        this.loader.present();
    }

    showview(n) {

        if (!this.show) {
            this.show = true;
        } else {
            this.show = false;

        }

    }

    home() {
        this.navCtrl.push(Home);
        this.navCtrl.setRoot(Home);
    }


    save() {

        this.exam_timetable_notification = [];
        this.class_id_all = [];
        this.loading();

        let update_ind : string;
        this.class_id_all = this.globalVars.getMyGlobalAllClass_id(this.standard)

        for (let x of this.class_id_all) {
            console.log("value looping for classes " + x)
            this.exam_notification = new Examtimetable();
            this.exam_notification.date = this.examtimetable.value.selected_from_date
            this.exam_notification.subject_id = this.examtimetable.value.selected_subject
            this.exam_notification.start_time = this.examtimetable.value.selected_from_time
            this.exam_notification.end_time = this.examtimetable.value.selected_to_time
            this.exam_notification.class_id = x
            this.exam_notification.syllabus = this.examtimetable.value.selected_syllabus
            this.exam_notification.created_by = this.globalVars.getMyGlobalUserId()
            this.exam_notification.created_by_date = this.globalVars.getMyGlobaltodate()
            this.exam_notification.exam_id = this.navParams.get('parm_exam_id')
            this.exam_notification.modified_by = this.globalVars.getMyGlobalUserId()
            this.exam_notification.modified_by_date = this.globalVars.getMyGlobaltodate()
            this.exam_timetable_notification.push(this.exam_notification)
        }
        console.log("the value length of exam_timetable_notification" + this.exam_timetable_notification.length)
       
             update_ind = 'I'

            if (this.update_type == "edit") {

                    update_ind = 'U'
            }
        this.examtimetablePost(this.exam_timetable_notification, update_ind, this.subjectIDForUpdate,
                                this.exam_notification.class_id, this.token, this.id)

    }

    examtimetablePost(prvdr_examtimetable_notification: Examtimetable[], update_ind:string, 
                        subject_id:number, cls_id:number, token:string, id:number) {
        this.examProvider
            .addExamtable(prvdr_examtimetable_notification, update_ind, subject_id,cls_id, token, id)
            .subscribe(res => {
                    this.resetForm(), this.loader.dismiss(), this.successToastreturn()
                },
                err => {
                    this.loader.dismiss(), this.errorToast('Record not updated')
                });
    }


    successToastreturn() {

        let toast = this.toastController.create({
            message: "Record updated",
            duration: 1000,
            position: 'middle'
        });
        toast.present();
    }

    errorToast(msg) {

        let toast = this.toastController.create({
            message: msg,
            duration: 1000,
            position: 'middle'
        });
        toast.present();

    }


    resetForm() {

        this.examtimetable.reset({
            selected_from_date: this.selected_from_date
        });
        if (this.update_type == "edit") {
            this.navCtrl.pop();
        }
    };

    presentPopover(myEvent) {

        let popover = this.popoverCtrl.create(PopoverPage, {

            exam_view: "ExamView",
            standard: this.standard,
            exam_id: this.exam_id,
            exam_type: this.exam_type,

        })

        popover.present({

            ev: myEvent

        });

    }
}