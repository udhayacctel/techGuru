import { Component} from '@angular/core';
import { NavController, NavParams, ViewController,App } from 'ionic-angular';
import { Home } from '../../pages/home/home';
import { Notification_View } from '../notification_view/notification_view';
import { DailyDiary_View } from '../../pages/dailydiary_view/dailydiary_view';
import { ParentMeet_View } from '../../pages/parentmeet_view/parentmeet_view';
import { Exam_View } from '../../pages/exam_view/exam_view';


@Component({
    selector: 'page-popover',
    templateUrl: 'popover.html',

})
export class PopoverPage {

    update_type: string;
    school_id: any;
    view: any;
    standard: any;
    section: any;
    class_id: number;
    date: any;
    exam_type: any;
    exam_id: number;
    exam_view: any;
    parentMeet_view: any;
    student_id: any;
    roll_no: any
    record: any;
    notifyView: any;
    from_date: any;
    to_date: any;
    title: any;
    message: any;
    updateType: any;
    notifyId: any;
    activity: any;
    exampop: boolean = false;
    dailypop: boolean = false;
    parentpop: boolean = false;
    notifypop: boolean = false;

    constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,
        private app: App, public nav: NavController) {


        if (this.navParams.data) {

            this.view = this.navParams.data.view;
            this.class_id = this.navParams.data.class_id;
            this.school_id = this.navParams.data.school_id;
            this.section = this.navParams.data.section;

            this.exam_view = this.navParams.data.exam_view;
            this.standard = this.navParams.data.standard;
            this.exam_type = this.navParams.data.exam_type;
            this.exam_id = this.navParams.data.exam_id;
            this.school_id = this.navParams.data.school_id;

            this.parentMeet_view = this.navParams.data.parentMeet_view;
            this.standard = this.navParams.data.standard;
            this.section = this.navParams.data.section;
            this.school_id = this.navParams.data.school_id;
            this.student_id = this.navParams.data.student_id;
            this.roll_no = this.navParams.data.rollno;
            this.record = this.navParams.data.record;

            this.notifyView = this.navParams.data.notifyView;
            this.from_date = this.navParams.data.from_date;
            this.to_date = this.navParams.data.to_date;
            this.title = this.navParams.data.title;
            this.message = this.navParams.data.message;
            this.updateType = this.navParams.data.update_type;
            this.notifyId = this.navParams.data.notify_id;
            this.activity = this.navParams.data.activity;

        }


        this.navigateScreens();


    }

    navigateScreens() {

        if (this.view == "DailyDiaryView") {
            this.dailypop = true;

        } else if (this.exam_view == "ExamView") {

            this.exampop = true;


        } else if (this.parentMeet_view == "parentMeetView") {

            this.parentpop = true;
        } else if (this.notifyView == "NotificationView") {

            this.notifypop = true;

        } else {

        }
    }

    viewDiary() {
        this.viewCtrl.dismiss()
        this.app.getActiveNavs()[0].push(DailyDiary_View, {
            parm_class_id: this.class_id
        });

    }


    ExamView() {


        this.viewCtrl.dismiss()
        this.app.getActiveNavs()[0].push(Exam_View, {
            parm_school: this.school_id,
            parm_standard: this.standard,
            parm_exam_id: this.exam_id,
            parm_exam_type: this.exam_type
        });
    }


    ParentMeetView() {
        this.viewCtrl.dismiss()
        this.app.getActiveNav().push(ParentMeet_View, {
            parm_standard: this.standard,
            parm_section: this.section,
            parm_school_id: this.school_id,
            parm_student_id: this.student_id,
            parm_roll_no: this.roll_no,
            parm_record: this.record
        });

    }

    Home() {
        this.viewCtrl.dismiss();
        this.app.getActiveNavs()[0].setRoot(Home)
    }

    NotifyView() {

        this.viewCtrl.dismiss()
        this.app.getActiveNavs()[0].push(Notification_View, {

            parm_from_date: this.from_date,
            parm_to_date: this.to_date,
            parm_title: this.title,
            parm_message: this.message,
            parm_update_type: this.update_type,
            parm_notifyId: this.notifyId,
            parm_activity: this.activity

        });
    }

}