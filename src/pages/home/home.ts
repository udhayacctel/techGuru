import { ViewChild,Component} from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { NotificationProvider } from '../../providers/notification-provider';
import { Notification } from '../../models/notification';
import { ToastController } from 'ionic-angular';
import { DailyDiaryProvider } from '../../providers/dailydiary-provider';
import { LoadingController } from 'ionic-angular';
import { GlobalVars } from '../../providers/global-provider';
import { Select } from 'ionic-angular';
import { ModalController} from 'ionic-angular';
import { Parent } from '../../models/parent';
import { Teacher } from '../../models/teacher';
import { Student } from '../../models/student';
import { Dailydiary } from '../../models/dailydairy';
import { Dailyworks } from '../../models/dailyworks';
import { DailyDiary_View2 } from '../../pages/dailydiary_view2/dailydiary_view2';
import { TimeTable } from '../../models/timetable';
import { TimeTableProvider } from '../../providers/Timetable-provider';
import { EventsProvider } from '../../providers/event-provider';


@Component({
    templateUrl: 'home.html',
    selector: 'home-page',
    providers: [NotificationProvider, DailyDiaryProvider]
})


export class Home {

    segment: any;
    show: boolean;
    parent: Parent[];
    teacher: Teacher[];
    student: Student;
    class_id: number;
    standard: string;
    section: string;
    abt_page_roll_type: string;
    selected_abt_page_date: string;
    selected_school_id: number;
    parm_school_id: number;
    selected_record: any;
    daily_diary_activity: string;
    selected_roll_no: any;
    work_updates: Dailyworks = new Dailyworks();
    abt_page_notification: Notification[];
    abt_page_admin: Notification[];
    daily_diary_notification: Dailydiary[];
    activity_diary_notification: Dailydiary[];
    home: boolean = false;
    teacher_notification: Notification[];
    time_table_notification: TimeTable[];
    avatar_ht: boolean;
    today: any;
    indx: number;
    role_type: string;
    showHeader: boolean;
    shownoti: boolean;
    id: any;
    day: string;
    recep_ind: string;
    teacher_id: number;
    activity_id: any;
    selected_notifydate: any = new Date();
    selected_diarydate: any = new Date();
    selected_activitydate: any = new Date();
    selected_ttabledate: any = new Date();
    selected_notidate: any = new Date();
    current_date: any;
    tick: boolean = false;
    tick1: boolean = false;
    animated: boolean;
    loader: any
    start_time: any;
    end_time: any;
    student_id:number;
    token:string;


    @ViewChild('sectionSelect') sectionSelect: Select;
    /* *********************************************************************************************************************************
     *  Home Page  
     *  ---------- 
     *         Screen populate three segments for teachers and parents. 
     *         Parents :
     *             Notification  
     *             Daily Diary 
     *             Daily activity     
     *         Teachers:  
     ************************************************************************************************************************************/
    constructor(public navCtrl: NavController, public navParams: NavParams, public diaryProvider: DailyDiaryProvider,
        public notifyProvider: NotificationProvider, public toastController: ToastController,
        public loadingController: LoadingController, public globalVars: GlobalVars, public modalCtrl: ModalController,
        public timetableProvider: TimeTableProvider, public viewCtrl: ViewController, public eventsprovider: EventsProvider) {

        this.loading()
        this.animated = true;
        this.recep_ind = "A"
        this.segment = "admin"
        this.parent = this.globalVars.getMyGlobalParent()
        this.teacher = this.globalVars.getMyGlobalTeacher()

        this.role_type = this.globalVars.getMyGlobalrole()
        this.current_date = this.globalVars.getMyGlobaltodate()
        this.day = this.globalVars.getMyGlobaltoday()
        this.selected_school_id = this.globalVars.getMyGlobalschool()
        this.indx = 0

        this.selected_abt_page_date = this.current_date
        this.selected_notifydate = this.current_date
        this.selected_diarydate = this.current_date
        this.selected_activitydate = this.current_date
        this.selected_ttabledate = this.current_date
        this.selected_notidate = this.current_date

        this.token   = this.globalVars.getMyGlobalToken();
        this.id = this.globalVars.getMyGlobalUserId();
        console.log("my id "+ this.id)
        
       // this.loadNotifyadmin(this.selected_school_id, this.selected_notifydate, "A", this.token);
        this.initializeSegment(this.role_type);

        this.show = false;

    }

    /***********************************************************************************************************************************
     *  Initiaize and load the necessary data based on Parent and teacher                                                                                                                                                     *    
     ***********************                      *************************************************************************************************************/

    loading() {

        this.loader = this.loadingController.create({
            content: "Please wait"
        });
        this.loader.present();
    }


    /***********************************************************************************************************************************
     *  Initiaize and load the necessary data based on Parent and teacher                                                                                                                                                     *    
     ************************************************************************************************************************************/
    initializeSegment(role_type) {

            this.loadNotifyadmin(this.selected_school_id, this.selected_notifydate, "A", this.token, this.id);

        
        this.shownoti = true;

        if (role_type == "P") {

            this.segment = "noti";
            this.showHeader = true;

            this.selected_record = this.parent[0].parent_student_name

            this.standard = this.parent[0].parent_student_standard
            this.section = this.parent[0].parent_student_section
            this.class_id= this.globalVars.getMyGlobalClass_id(this.standard, this.section)
            //this.class_id = this.parent[0].parent_student_class_id
            this.student_id = this.parent[0].parent_student_id    
            console.log("student id" + this.class_id + this.student_id + this.standard +this.section)
                        
            this.fetchdiary(this.class_id, "H", this.selected_diarydate,this.student_id,this.token, this.id)

            this.fetchactivity(this.class_id, "A", this.selected_diarydate,this.student_id,this.token, this.id)


        } else if (role_type == "T") {
            this.showHeader = false;
            this.teacher_id = this.teacher[0].teacher_id
            this.loadNotify(this.selected_school_id, this.selected_notidate, "T",this.token, this.id);
            this.getSchedule(this.teacher_id, this.day, this.selected_ttabledate,this.selected_school_id, this.token, this.id);

        } else {

        }

    }

    /***********************************************************************************************************************************
     *  Change the Student name in header                                                                                                                                                        *    
     ************************************************************************************************************************************/

    /***********************************************************************************************************************************
     *  Push the value to new screen from dailydiary and activity                                                                                                                                                        *    
     ************************************************************************************************************************************/
    HomeView(n) {
        let modal = this.modalCtrl.create(DailyDiary_View2, {
            parm_title: n.title,
            parm_message: n.message,
            parm_subject: n.subject,
            parm_due_date: n.end_date
        });
        modal.onDidDismiss(data => {});
        modal.present();
    }


    /***********************************************************************************************************************************
     *  segment the page for Parent view                                                                                                                                                        *    
     ************************************************************************************************************************************/
    segselected() {
        this.animated = false;
        switch (this.segment) {

            case "notify":
                {


                    break
                }

            case "Daily":
                {


                    break

                }

            case "Activity":
                {


                    break

                }
        }
    }

    /***********************************************************************************************************************************
     *  segment the page for teacher view                                                                                                                                                        *    
     ************************************************************************************************************************************/

    segselect_teacher() {
        this.animated = false;
        switch (this.segment) {

            case "admin":
                {

                    break
                }

            case "noti":
                {

                    break

                }

            case "ttable":
                {

                    break

                }
        }
    }


    /***********************************************************************************************************************************
     * show the notification for school and parent                                                                                                                                                        *    
     ************************************************************************************************************************************/

    loadNotifyadmin(school_id: number, to_date: string, recepient: string, token:string, id:number) {

        this.notifyProvider
            .getNotify(school_id, to_date, recepient,token, id)
            .subscribe(res => {
                    this.abt_page_admin = < Notification[] > res, this.loader.dismiss()
                },
                err => {
                    this.loader.dismiss(), this.errorToast("Records not loaded", "bottom")
                });

    }
    /***********************************************************************************************************************************
     * show the notification for only teacher                                                                                                                                                        *    
     ************************************************************************************************************************************/

    loadNotify(school_id: number, to_date: string, recepient: string, token:string, id:number) {

        this.notifyProvider
            .getNotify(school_id, to_date, recepient, token, id)
            .subscribe(res => {
                    this.abt_page_notification = < Notification[] > res, this.loader.dismiss()
                },
                err => {
                    this.loader.dismiss(), this.errorToast("Records not loaded", "bottom")
                });

    }

  

    /***********************************************************************************************************************************
     * show the  for school and parent                                                                                                                                                        *    
     ************************************************************************************************************************************/

   getSchedule(teacher_id: number, day: String, date: String, school_id:number, token:string, id: number) {

        let x : TimeTable[] = new Array<TimeTable>()

        this.timetableProvider
            .getTeacherTimetable(teacher_id, day, date, school_id, token, id)
            .subscribe(res => {
                    x = < TimeTable[] >res,this.chckDateDay(x,date),this.loader.dismiss()
                },
                err => {
                    this.loader.dismiss(), this.errorToast("Records not loaded", "bottom")
                });

    }

    chckDateDay(x,date)  {

        let y : TimeTable[] = new Array<TimeTable>()
        console.log("the value of date" + date)          
        y = x.filter(xn => xn.date == date);
        
        if (y.length > 0) {      
            console.log("the value of y" + y.length)
            this.time_table_notification = y
        } else {
            this.time_table_notification = x   
        }                                                                                                   
}
   

    /* *********************************************************************************************************************************
     *  All change request from screen would be validated here                                                                        ***    
     ************************************************************************************************************************************/
    /* Pop up the available roll number/student name in the header*/
    doFilter() {
        this.sectionSelect.open();
    }

    /* Map and get the right record when the student id is changed*/
    changerecord(x) {

        this.selected_record = x.parent_student_name
        //this.class_id = x.parent_student_class_id
        this.student_id = x.parent_student_id
        this.section = x.parent_student_section
        this.standard = x.parent_student_standard
        this.class_id= this.globalVars.getMyGlobalClass_id(this.standard, this.section)

        this.loading();
                
        this.fetchdiary(this.class_id, "H", this.selected_diarydate,this.student_id,this.token, this.id)

        this.fetchactivity(this.class_id, "A", this.selected_diarydate,this.student_id,this.token, this.id)

    }

    /* Map and get the right record when the student id is changed*/
    changenotify() {
        this.loading();
        this.loadNotifyadmin(this.selected_school_id, this.selected_notifydate, this.recep_ind, this.token, this.id);

}

    changenoti(x) {
        this.loading()
        this.loadNotify(this.selected_school_id, this.selected_notidate, "T", this.token, this.id);

    }

    /* Map and get the right record when the date in the diary screen is changed */
    changediary() {
        this.loading();
        this.fetchdiary(this.class_id, "H", this.selected_diarydate,this.student_id, this.token, this.id)


    }

    changeactivity() {
        this.loading();
        
        this.fetchactivity(this.class_id, "A", this.selected_activitydate,this.student_id, this.token, this.id)

    }

    changettable() {

        this.loading();
        let day = this.getDayOfWeek(this.selected_ttabledate)

        this.getSchedule(this.teacher_id, day, this.selected_ttabledate, this.selected_school_id,this.token, this.id);

    }

    getDayOfWeek(date) {
        var dayOfWeek = new Date(date).getDay();
        return isNaN(dayOfWeek) ? null : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek];

    }
    /* *********************************************************************************************************************************
     *  All the Services call would start from here                                                                                   ***    
     *************************************************************************************************************************************/

    fetchdiary(class_id: number, activity: any, end_date: any, student_id:number, token:string, id:number) {
        this.diaryProvider
            .getStudentdiary(class_id, activity, end_date, student_id, token, id)
            .subscribe(res => {
                    this.daily_diary_notification = < Dailydiary[] > res, this.loader.dismiss()
                },
                err => {
                    this.loader.dismiss(), this.errorToast("Records not loaded", "bottom")
                });

    }

    fetchactivity(class_id: any, activity: any, end_date: any, student_id:number, token:string, id:number) {
        this.diaryProvider
            .getStudentdiary(class_id, activity, end_date, student_id, token, id)
            .subscribe(res => {
                    this.activity_diary_notification = < Dailydiary[] > res, this.loader.dismiss()
                },
                err => {
                    this.loader.dismiss(), this.errorToast("Records not loaded", "bottom")
                });

    }

    workPost(update: Dailyworks, student_id:number,message_id:number, token:string, id:number) {
        this.diaryProvider
            .addwork(update,student_id, message_id, token, id)
            .subscribe(res => {},
                err => {
                    this.errorToast("Records not updated", "middle")
                });
    }

    done(slidingItem, y) {

        slidingItem.close();
        let idx = this.daily_diary_notification.indexOf(y)
     
        this.work_updates.status = "Done"
        this.daily_diary_notification[idx].status = "Done"
        y.status = "Done"


        this.workPost(this.work_updates,this.student_id, y.id, this.token, this.id)
        console.log("message id" + y.id)
        console.log("message id" +this.student_id)
    }

    undone(slidingItem, y) {

        slidingItem.close();

        let idx = this.daily_diary_notification.indexOf(y)
        this.work_updates.message_id = y.id
        this.work_updates.status = "UnDone"


        this.daily_diary_notification[idx].status = "UnDone"
        y.status = "UnDone"
        this.workPost(this.work_updates, this.student_id, y.id, this.token, this.id)
    }

    activitydone(slidingItem, z) {

          
        slidingItem.close();

        let idx = this.activity_diary_notification.indexOf(z)
        
        this.work_updates.status = "Done"
        this.activity_diary_notification[idx].status = "Done"
        z.status = "Done"
        this.workPost(this.work_updates,this.student_id, z.id, this.token, this.id)

    }

    activityundone(slidingItem, z) {
   
        slidingItem.close();
        
        let idx = this.activity_diary_notification.indexOf(z)
        this.work_updates.message_id = z.id
        this.work_updates.status = "UnDone"

        this.activity_diary_notification[idx].status = "UnDone"
        z.status = "UnDone"
        this.workPost(this.work_updates, this.student_id, z.id, this.token, this.id)
            
    
    }

    successToastreturn(msg: string, pos: string) {

        let toast = this.toastController.create({
            message: msg,
            duration: 1000,
            position: pos
        });
        toast.present();


    }

    errorToast(msg: string, pos: string) {

        let toast = this.toastController.create({
            message: msg,
            duration: 1000,
            position: pos
        });
        toast.present();

    }


    showrow(n) {

        let idx = this.abt_page_notification.indexOf(n)

        console.log("the value of message length" + n.message.length)
        if (n.message.length < 30) {
            this.avatar_ht = false
        } else {
            this.avatar_ht = true
        }


        console.log("am coming to show" + n.expand);
        if (!n.expand) {
            n.expand = true;
            console.log("am coming to show end" + n.expand);
        } else {
            n.expand = false;
        }
    }

    showact(l) {

        let fx = this.activity_diary_notification.indexOf(l)
        console.log("am coming to show");
        if (!l.expand) {
            l.expand = true;
            console.log("am coming to show end" + l.expand);
        } else {
            l.expand = false;
        }

    }

    view(n) {

        console.log("am coming to show" + n.expand);
        if (!n.expand) {
            n.expand = true;
            console.log("am coming to show end" + n.expand);
        } else {
            n.expand = false;
        }
    }

    ionViewCanEnter(){
        if(this.role_type=='P'){

         this.fetchdiary(this.class_id, "H", this.selected_diarydate,this.student_id, this.token, this.id)
         this.fetchactivity(this.class_id, "A", this.selected_diarydate,this.student_id, this.token, this.id)
         this.loadNotifyadmin(this.selected_school_id, this.selected_notifydate, "A", this.token, this.id);
    
    }

        else{
            
         this.loadNotify(this.selected_school_id, this.selected_notidate, "T", this.token, this.id);
         this.getSchedule(this.teacher_id, this.day, this.selected_ttabledate, this.selected_school_id, this.token, this.id);
         this.loadNotifyadmin(this.selected_school_id, this.selected_notifydate, "A", this.token, this.id);
        }
    }

}