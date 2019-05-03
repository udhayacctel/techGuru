import { Component } from '@angular/core' ;
import { NavController, NavParams, AlertController} from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { ExamtimetableProvider } from '../../providers/examtimetable-provider';
import { LoadingController } from 'ionic-angular';
import { Examcreate } from '../../models/exam';
import { Home } from '../../pages/home/home';
import { PopoverPage } from '../../pages/popover/popover';
import { PopoverController } from 'ionic-angular';
import { GlobalVars } from '../../providers/global-provider';


@Component({
    templateUrl: 'exam_type.html',
    selector: 'exam-type'

})

export class Exam_Type {

    exam_view: Examcreate[];
    parm_school_id: any;
    selected_exam: any;
    exam_add: Examcreate = new Examcreate();
    loader: any;
    token:string;
    id:number;

    constructor(public navCtrl: NavController, navParams: NavParams,
        public toastController: ToastController,
        public examProvider: ExamtimetableProvider,
        public loadingController: LoadingController,
        public alertCtrl: AlertController,
        public globalVars: GlobalVars,
        public popoverCtrl: PopoverController) {

        this.token   = this.globalVars.getMyGlobalToken();
        this.id = this.globalVars.getMyGlobalUserId();
        this.parm_school_id = 1
    }

    ngOnInit() {
        this.loading();
        this.examtimetableGet(this.parm_school_id, this.token, this.id)
    }

    examtimetableGet(school_id: any, token:string, id:number) {

        this.examProvider
            .getExam(school_id, token, id)
            .subscribe(res => {
                    this.exam_view = < Examcreate[] > res, this.loader.dismiss()
                },
                err => {
                    this.errorToast('Record not loaded'), this.loader.dismiss()
                });
    }

    addsubjectforclass(exam: Examcreate, school_id: any, token:string, id:number) {
        this.examProvider
            .addExam(exam, school_id, token, id)
            .subscribe(res => {
                    this.resetform(), this.reload(), this.loader.dismiss(), this.successToastreturn('Record updated')
                },
                err => this.errorToast('Record not updated'), this.loader.dismiss()
            );
    }

    remove(school_id:any, id: any, token:string, tg_id:number) {
        this.examProvider
            .removeExam(school_id, id, token, tg_id)
            .subscribe(res => {
                    this.reload(), this.loader.dismiss(), this.successToastreturn('Record deleted')
                },
                err => {
                    this.errorToast('Record not deleted'), this.loader.dismiss()
                }
            );
    }

    reload() {
        this.examtimetableGet(this.parm_school_id, this.token, this.id)

    }

    resetform() {

        this.selected_exam = ''
    }

    save() {
         
     if ((this.selected_exam === undefined || this.selected_exam == null || this.selected_exam.length <= 0)) {
            
            let alert = this.alertCtrl.create({
                message: 'Please Fill Exam',
                buttons: [{
                    text: 'OK'
                }]
            });
            alert.present();

        } else {
        this.exam_add.name = this.selected_exam
        this.exam_add.school_id = this.parm_school_id
        this.loading();
        this.addsubjectforclass(this.exam_add, this.parm_school_id, this.token, this.id)
        }
    }

    loading() {
        this.loader = this.loadingController.create({
            content: "Please wait"
        });
        this.loader.present();

    }

    removeexam(y) {

        let alert = this.alertCtrl.create({
            title: 'Subject Delete',
            message: 'Do you Really want to Delete?',
            buttons: [{
                    text: 'Delete ',
                    handler: () => {
                        this.loading();
                        this.remove(this.parm_school_id, y.id, this.token, this.id)
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
    }

    successToastreturn(msg) {

        let toast = this.toastController.create({
            message: msg,
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

    home() {
        this.navCtrl.push(Home);
        this.navCtrl.setRoot(Home);
    }
    presentPopover(myEvent) {

        let popover = this.popoverCtrl.create(PopoverPage);

        popover.present({

            ev: myEvent

        });

    }

}