import { Component} from '@angular/core';
import { NavController, AlertController, NavParams } from 'ionic-angular';
import { TimeTable } from '../../models/timetable';
import { TimeTableProvider } from '../../providers/Timetable-provider';
import { ToastController } from 'ionic-angular';
import { ClassProvider } from '../../providers/class-provider';
import { ClassReferenceTime } from '../../models/classReferenceTime';
import { Teacher_class } from '../../models/teacher_class';
import { Home } from '../home/home';
import { LoadingController } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';
import { PopoverPage } from '../../pages/popover/popover';
import { School_class_year } from '../../models/school_class_year';
import { GlobalVars } from '../../providers/global-provider';
import { Notification } from '../../models/notification';
import { EventsProvider } from '../../providers/event-provider';


@Component({
    selector: 'timetable-select',
    templateUrl: 'timetable_select.html'
})

export class TimeTable_Select {
    time_table: TimeTable = new TimeTable();
    selected_class_id: any;
    selected_start_time: any;
    selected_end_time: any;
    selected_period: any;
    selected_attendance_required: any;
    selected_tt_date: any;
    selected_subject: any;
    selected_subject_id: number;
    time_table_notification: TimeTable[];
    table_notification: TimeTable = new TimeTable();
    selected_section: any;
    timetab: Array < {
        periods: any,
        subjects: any
    } > ;
    currdate: any;
    currday: any;
    selected_day: any;
    notifyTime: any;
    date: any;
    parm_class_id: number;
    parm_standard: any;
    parm_section: any;
    parm_tt_date: any;
    teacher_class: Teacher_class[];
    selected_teacher_id: number;
    selected_active: any;
    attendance_period: ClassReferenceTime[];
    selected_name: any;
    attendance_selected: boolean;
    tt_date: any;
    id: number;
    update_type: any;
    update_id: number;
    table_notify: TimeTable = new TimeTable();
    subject_class: School_class_year[];
    loader: any;
    duplicate: boolean;
    parm_tt_id: number;
    timeTable: TimeTable = new TimeTable();
    edit_period: string;
    parm_update_type: any;
    token:string;
    edit_subject_id:any;
    evnt: Notification = new Notification();
    school_id: number;
    current_date:any;
    selected_title:any;
    selected_message:any;

    constructor(public loadingController: LoadingController,
        public alertCtrl: AlertController,
        public navCtrl: NavController, navParams: NavParams,
        public timetableProvider: TimeTableProvider,
        public toastController: ToastController,
        public subjects: ClassProvider,
        public classProvider: ClassProvider,
        public popoverCtrl: PopoverController,
        public globalVars: GlobalVars,
        public eventsprovider: EventsProvider) {


        this.parm_class_id     = navParams.get('parm_class_id');
        this.parm_standard     = navParams.get('parm_standard');
        this.parm_section      = navParams.get('parm_section');
        this.parm_tt_date      = navParams.get('parm_tt_date');
        this.parm_update_type  = navParams.get('parm_update_type');
        

        this.subject_class = this.globalVars.getMyGlobalsubject(this.parm_standard, this.parm_section)
    
        this.selected_active = true
        this.table_notification.id = this.time_table.id
        this.attendance_selected = false;

        this.time_table.day = this.getDayOfWeek(this.parm_tt_date)

        this.loading();
        this.token   = this.globalVars.getMyGlobalToken();
        this.id = this.globalVars.getMyGlobalUserId();                
        this.fetchperiod(this.parm_class_id, this.token, this.id);       
        this.getteacher(this.parm_class_id, this.token, this.id);
        this.school_id = this.globalVars.getMyGlobalschool();
        this.current_date = this.globalVars.getMyGlobaltodate()
        this.date = new Date();
        this.date.setDate( this.date.getDate() + 3 );
        
        if (this.parm_update_type == "Day") {
             console.log("day or date"+this.parm_update_type)
             this.timetableGetDay(this.parm_class_id, this.time_table.day, this.parm_tt_date,this.token, this.id);  
        } else {
            this.timetableGetDate(this.parm_class_id, this.time_table.day, this.parm_tt_date, this.token, this.id);
        }

    }

    loading() {

        this.loader = this.loadingController.create({
            content: "Please wait" 
        });
        this.loader.present();
    }

    addRefTimeToClass() {

         
     if ((this.selected_period === undefined || this.selected_period == null || this.selected_period.length <= 0) ||   
        (this.selected_subject_id=== undefined || this.selected_subject_id== null || this.selected_subject_id <= 0) ||
        (this.selected_teacher_id=== undefined || this.selected_teacher_id== null || this.selected_teacher_id <= 0)) {
            
            let alert = this.alertCtrl.create({
                message: 'Please Fill all the Fields',
                buttons: [{
                    text: 'OK'
                }]
            });
            alert.present();

        } else {

        let timeTable: TimeTable = new TimeTable();

        /*
        Find the duplicate arrays in the list
        */

        let duplicate = this.time_table_notification.filter(
            timetable => timetable.period == this.selected_period)

    if (this.update_type == "edit")   {

        if((duplicate.length > 0) && (this.selected_period != this.edit_period)) {

            this.duplicate_alert()        
            
        } else {

            this.timeTable.period = this.selected_period
            this.timeTable.start_time = this.selected_start_time
            this.timeTable.end_time = this.selected_end_time
            this.timeTable.attendance = this.attendance_selected
            this.timeTable.subject_id = this.selected_subject_id
            this.timeTable.active = false
            this.timeTable.teacher_id = this.selected_teacher_id
            this.timeTable.class_id = this.parm_class_id
            /*
                Pass the date when the date is selected; Pass the day when day is selected
            */
            this.timeTable.date = this.parm_tt_date
            this.timeTable.day  =  this.selected_day
            this.timeTable.modified_by = this.globalVars.getMyGlobalUserId();
            this.timeTable.modified_by_date = this.globalVars.getMyGlobaltodate();
            this.timeTable.active_till_date = this.globalVars.getMyGlobaltodate()
            this.timeTable.created_by = this.globalVars.getMyGlobalUserId();
            
            
            this.puttable(this.timeTable, this.timeTable.class_id, this.update_id,"edit", this.token, this.id)

           if(this.edit_subject_id != this.selected_subject_id){
               this.evnt.school_id = this.school_id
                this.evnt.from_date = this.current_date
                this.evnt.to_date = this.date.toISOString()
                this.evnt.class_id = this.parm_class_id
                this.evnt.title = "TimeTable alert"
                this.evnt.message = "Your child class timetable has been changed. so please bring " + this.selected_subject +" book"

         this.addeventnotification( this.evnt, this.school_id, this.token, this.id)

                console.log("Subject id changed" + this.selected_subject )
            }
            else{
                console.log("No changes")
            }

        }

    } else if (duplicate.length > 0)  {

            this.duplicate_alert()        
        
    } else {

        this.timeTable.period = this.selected_period
        this.timeTable.start_time = this.selected_start_time
        this.timeTable.end_time = this.selected_end_time    
        this.timeTable.attendance = this.attendance_selected
        this.timeTable.subject_id = this.selected_subject_id
        this.timeTable.teacher_id = this.selected_teacher_id
        this.timeTable.class_id = this.parm_class_id
        this.timeTable.section = this.parm_section
        this.timeTable.day = this.time_table.day
        this.timeTable.date = this.parm_tt_date
        this.timeTable.created_by = this.globalVars.getMyGlobalUserId();
        this.timeTable.created_by_date = this.globalVars.getMyGlobaltodate();

        this.post_timeTable()
    
    }     
        }
}

addeventnotification( event:Notification, school_id:number, token: string, id: number) {
        this.eventsprovider
            .addeventnotification( event, school_id ,token, id)
            .subscribe(res => {
                    this.successToastreturn('Record updated')
                },
                err => {
                    this.errorToast('Record not updated', 'middle');
                    this.loader.dismiss()
                }
            );
    }

post_timeTable() {

    if (this.parm_update_type == "Day")  {
        this.timePost(this.timeTable, this.parm_class_id, this.timeTable.day, this.token,this.id)
        this.loading();
} else {
        this.timePostdate(this.timeTable, this.parm_class_id, this.timeTable.day,this.parm_tt_date, this.token, this.id) 
        this.loading();
     }
}

subject(x){

    this.selected_subject = x.subject
    console.log("my subject" + this.selected_subject)
}

 duplicate_alert() {

        let alert = this.alertCtrl.create({
            title: 'Period already exist',
            message: this.selected_period + " " + 'already exists for the day',
            buttons: [{
                text: 'OK ',
                handler: () => {}
            }]
        });
        alert.present();
}

    getDayOfWeek(date) {
        var dayOfWeek = new Date(date).getDay();
        return isNaN(dayOfWeek) ? null : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek];
    }


    home() {
        this.navCtrl.push(Home);
        this.navCtrl.setRoot(Home);
    }

    timetableGetDay(class_id: any, day: any, tt_date: any, token:string, id:number) {
        
                this.timetableProvider
                    .getTimetableDay(class_id, day, tt_date, token, id)
                    .subscribe(res => {
                            this.time_table_notification = < TimeTable[] > res, this.loader.dismiss()
                        },
                        err => this.errorToast("Record not loaded", "middle"), this.loader.dismiss());
    }

    timetableGetDate(class_id: any, day: any, tt_date: any, token:string, id:number) {
        
                this.timetableProvider
                    .getTimetableDate(class_id, day, tt_date, token, id)
                    .subscribe(res => {
                            this.time_table_notification = < TimeTable[] > res, this.loader.dismiss()
                        },
                        err => this.errorToast("Record not loaded", "middle"), this.loader.dismiss());
    }


    puttable(prvdr_timetable_notification: TimeTable, class_id:number, id: number, updateType:string, token:string, tg_id:number) {

        this.timetableProvider
            .puttimetableid(prvdr_timetable_notification, class_id, id, token, tg_id)
            .subscribe(res => {
                    this.resetform(), this.successToastreturn('Record updated'), this.loader.dismiss(),this.retrieve(updateType);
                },
                err => this.errorToast("Record not updated", "middle"), this.loader.dismiss());
    }


    timePost(prvdr_timetable: TimeTable, class_id: any, day: any, token:string, id:number) {
        this.timetableProvider
            .timetimepost(prvdr_timetable, class_id, day, token, id)
            .subscribe(res => {
                    this.resetform(), this.loader.dismiss(), this.successToastreturn('Record updated'), this.timetableGetDay(this.parm_class_id, this.time_table.day, this.parm_tt_date, this.token,this.id);
                },
                err => this.errorToast("Record not updated", "middle"), this.loader.dismiss());
    }

    timePostdate(prvdr_timetable:TimeTable, class_id:any, day:any, date:any, token:string, id:number) {
        this.timetableProvider
            .timePostdate(prvdr_timetable,class_id,day,date, token, id)
            .subscribe(res => {
                    this.resetform(), this.loader.dismiss(), this.successToastreturn('Record updated'), this.timetableGetDate(this.parm_class_id, this.time_table.day, this.parm_tt_date, this.token, this.id);
                },
                err => this.errorToast("Record not updated", "middle"), this.loader.dismiss());
    }

    resetform() {
        this.selected_period = ''
        this.selected_start_time = ''
        this.selected_end_time = ''
        this.selected_subject_id = 0
        this.selected_teacher_id = 0
        this.selected_name = ''
        this.attendance_selected = false
        this.update_type = ''
    }

retrieve(updateType) {

    if (updateType == "edit") {

        if (this.parm_update_type == "Day")  {
           this.timePost(this.timeTable, this.parm_class_id, this.timeTable.day, this.token, this.id)
        } else {
             this.timePostdate(this.timeTable, this.parm_class_id, this.timeTable.day,this.parm_tt_date, this.token, this.id) 
        
         }
    } else {    
        if (this.parm_update_type == "Day")  {
            this.loading();
            this.timetableGetDay(this.parm_class_id, this.time_table.day, this.parm_tt_date, this.token, this.id);    
        } else {
            this.loading();
            this.timetableGetDate(this.parm_class_id, this.time_table.day, this.parm_tt_date, this.token, this.id);
         }
    }   

}

    delete(y) {
        let alert = this.alertCtrl.create({
            title: 'TimeTable Delete',
            message: 'Do you really want to delete?',
            buttons: [{
                    text: 'Delete ',
                    handler: () => {

                        this.loading();
                        this.timeTable.period = this.selected_period
                        this.timeTable.start_time = this.selected_start_time
                        this.timeTable.end_time = this.selected_end_time
                        this.timeTable.attendance = this.attendance_selected
                        this.timeTable.subject_id = this.selected_subject_id
                        this.timeTable.active = false
                        this.timeTable.teacher_id = this.selected_teacher_id
                        this.timeTable.class_id = this.parm_class_id
                        this.timeTable.day = this.selected_day
                        this.timeTable.modified_by = this.globalVars.getMyGlobalUserId();
                        this.timeTable.modified_by_date = this.globalVars.getMyGlobaltodate();
                        this.timeTable.active_till_date = this.globalVars.getMyGlobaltodate()
                        this.timeTable.created_by = this.globalVars.getMyGlobalUserId();
                
                        this.puttable(this.timeTable,this.timeTable.class_id, y.id,"delete", this.token, this.id)
                        
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


    errorToast(msg, pos) {
        let toast = this.toastController.create({
            message: msg,
            duration: 1000,
            position: pos
        });
        toast.present();

    }

    fetchperiod(class_id: number, token:string, id:number) {
        this.classProvider
            .getAllRefTimes(class_id, token, id)
            .subscribe(res => {
                    this.attendance_period = < ClassReferenceTime[] > res, this.loader.dismiss()
                },
                err => this.errorToast("Period not loaded", "middle"));
    }

    getteacher(class_id: number, token:string, id:number) {
        this.classProvider
            .getTeacherForClass(class_id, token, id)
            .subscribe(res => {
                    this.teacher_class = < Teacher_class[] > res, this.loader.dismiss()
                },
                err => this.errorToast("Period not loaded", "middle"));
    }

    change(n) {

        this.selected_start_time = n.start_time;
        this.selected_end_time = n.end_time;

    }

    teacher(m) {
        this.selected_teacher_id = m.student_id
    }

    edit(x) {

        let index = this.time_table_notification.indexOf(x);

        this.selected_period = x.period
        this.edit_period     = x.period
        this.selected_start_time = x.start_time
        this.selected_end_time = x.end_time
        this.attendance_selected = x.attendance
        this.selected_subject_id = x.subject_id
        this.selected_name = x.name
        this.selected_teacher_id = x.teacher_id
        this.selected_day = this.time_table.day
        this.update_id = x.id
        this.edit_subject_id = x.subject_id
        this.update_type = "edit"

        
    }
    presentPopover(myEvent) {

        let popover = this.popoverCtrl.create(PopoverPage, {

        });

        popover.present({
            ev: myEvent
        });

    }
}