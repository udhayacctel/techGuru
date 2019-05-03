import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, Platform,AlertController } from 'ionic-angular'; 
import { DailyDiary_View } from '../../pages/dailydiary_view/dailydiary_view';
import { Dailydiary } from '../../models/dailydairy';
import { DailyDiaryProvider } from '../../providers/dailydiary-provider';
import { ToastController } from 'ionic-angular';
import { ClassProvider } from '../../providers/class-provider';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { DailydiaryValidator} from '../validator/dailydiary';
import { LoadingController } from 'ionic-angular';
import { Home } from '../home/home';
import { GlobalVars } from '../../providers/global-provider';
import { PopoverPage } from '../../pages/popover/popover'
import { PopoverController } from 'ionic-angular';
import { School_class_year } from '../../models/school_class_year';
import { Template } from '../../models/template';
import { SchoolConstants } from '../../models/school_constant';



@Component({
    selector: 'dailydiary-post',
    templateUrl: 'dailydiary_post.html',
    providers: [DailyDiaryProvider]
})

export class DailyDairy_Post {

    dairy_page_dailydiary: Dailydiary = new Dailydiary();
    daily_diary_subject: School_class_year[];
    dialydiary_update: string;
    dailyForm: FormGroup;
    submitAttempt: boolean;
    loader: any;
    selected_to_date: any;
    day: any;
    token:string;
    id:number;
    temp: Template[];
    school_id:number;
    school_constant:SchoolConstants[];
    field_id:any;
    start_time:any;
    end_time:any;
    private date;
    role_type:any;
    teacher:any;
    time:any;
    current_date:any;
    selected_message:any;
    selected_title:any;

    constructor(public navCtrl: NavController,
        public platform: Platform,
        public navParams: NavParams,
        public dailydiary: ClassProvider,
        public diaryProvider: DailyDiaryProvider,
        public toastController: ToastController,
        public formBuilder: FormBuilder,
        public loadingController: LoadingController,
        public globalVars: GlobalVars,
        public classProvider: ClassProvider,
        public popoverCtrl: PopoverController,
         public alertCtrl:AlertController) {

        this.token   = this.globalVars.getMyGlobalToken();
        this.id = this.globalVars.getMyGlobalUserId();
        this.selected_to_date = this.globalVars.getMyGlobaltodate()
        this.day = this.globalVars.getMyGlobaltoday()
        this.school_id = this.globalVars.getMyGlobalschool();
        this.current_date = this.globalVars.getMyGlobaltodate()
        this.date =  new Date(); 
        this.date.setDate( this.date.getDate() + 1 );
        console.log("date" + this.date)
        this.time= new Date().getHours()

        if(this.role_type="T"){
            this.teacher = this.globalVars.getMyGlobalTeacher();
            this.start_time = this.teacher[0].start_time;
            this.end_time = this.teacher[0].end_time
        }
        
        console.log("my time" + this.start_time + this.end_time)
        this.gettemplate(this.school_id, this.token, this.id)   
        
        this.dairy_page_dailydiary.class_id = navParams.get('parm_class_id');
        this.dairy_page_dailydiary.standard = navParams.get('parm_standard');
        this.dairy_page_dailydiary.section = navParams.get('parm_section');
        this.dairy_page_dailydiary.title = navParams.get('parm_title');
        this.dairy_page_dailydiary.subject = navParams.get('parm_subject');
        this.dairy_page_dailydiary.message = navParams.get('parm_message');
        this.dairy_page_dailydiary.created_by = navParams.get('parm_created_by');
        this.dairy_page_dailydiary.activity = navParams.get('parm_activity');
        this.dairy_page_dailydiary.id = navParams.get('parm_id');
        this.dairy_page_dailydiary.end_date = navParams.get('parm_end_date');
        this.dialydiary_update = navParams.get('parm_update');
        this.dairy_page_dailydiary.acad_year = navParams.get('parm_acad_year');
        this.dairy_page_dailydiary.school_id = navParams.get('parm_school_id');

        this.dairy_page_dailydiary.modified_by = this.globalVars.getMyGlobalUserId(),
        this.dairy_page_dailydiary.created_by_date = this.globalVars.getMyGlobaltodate(),
        this.dairy_page_dailydiary.modified_by_date = this.globalVars.getMyGlobaltodate(),

        this.daily_diary_subject = this.globalVars.getMyGlobalsubject(this.dairy_page_dailydiary.standard, 
                                                                    this.dairy_page_dailydiary.section)

        if (this.dialydiary_update == "edit") {
            this.dailyForm = formBuilder.group({
                selected_title: [this.dairy_page_dailydiary.title, Validators.required],
                selected_message: [this.dairy_page_dailydiary.message, Validators.required],
                selected_to_date: [this.dairy_page_dailydiary.end_date, DailydiaryValidator.checkToDate],
                selected_subject: [this.dairy_page_dailydiary.subject],
                selected_activity: [this.dairy_page_dailydiary.activity]
            })
        } else {
            this.dailyForm = formBuilder.group({
                selected_title: ['', Validators.required],
                selected_message: ['', Validators.required],
                selected_to_date: [this.selected_to_date, DailydiaryValidator.checkToDate],
                selected_subject: ['', DailydiaryValidator.checkSubject],
                selected_activity: ['H']
            });
        }
        this.loading()
        this.loader.dismiss()

 
    }

    /* *********************************************************************************************************************************
     *  Submit and Reset the Forms                                                                                                    ***    
     *************************************************************************************************************************************/

    /* Success Toast messages; After Edit go back to view screen */
    
    submit() {

         if(  this.time >= this.start_time && this.time <= this.end_time) {
         
                this.loading();

                this.submitAttempt = true

                let dailydiary: Dailydiary = new Dailydiary();

                dailydiary.message = this.dailyForm.value.selected_message
                dailydiary.title = this.dailyForm.value.selected_title
                dailydiary.end_date = this.dailyForm.value.selected_to_date
                dailydiary.subject = this.dailyForm.value.selected_subject
                dailydiary.activity = this.dailyForm.value.selected_activity
                dailydiary.subject_id = this.globalVars.getMyGlobalsubjectID(this.dairy_page_dailydiary.standard, this.dairy_page_dailydiary.section, dailydiary.subject)
                dailydiary.created_by = this.globalVars.getMyGlobalUserId()
                dailydiary.id = this.navParams.get('parm_id');
                dailydiary.class_id = this.navParams.get('parm_class_id')
                dailydiary.modified_by = this.globalVars.getMyGlobalUserId()
                dailydiary.created_by_date = this.globalVars.getMyGlobaltodate()
                dailydiary.modified_by_date = this.globalVars.getMyGlobaltodate()

                console.log("my Id is" + dailydiary.id)

                if (this.dialydiary_update == "edit") {
                    this.dailydiaryUpdate(dailydiary,
                        dailydiary.id, dailydiary.class_id, this.token, this.id);

                } else {
                    this.dailydiaryPost(dailydiary,
                        dailydiary.class_id, this.token, this.id);
                }
            }

    else {
             if(this.dailyForm.value.selected_to_date == this.current_date){

                let alert = this.alertCtrl.create({
                        title: 'Alert Message',
                        message: "You Can't Post DailyDiary Between 6 PM To 8:59 AM ",
                        buttons: [
                            {
                                text: 'Ok ',
                                handler: () => {

                                }
                            }             
                        ]
                    });
                    alert.present();
         }
         else{

         this.loading();

                this.submitAttempt = true

                let dailydiary: Dailydiary = new Dailydiary();

                dailydiary.message = this.dailyForm.value.selected_message
                dailydiary.title = this.dailyForm.value.selected_title
                dailydiary.end_date = this.dailyForm.value.selected_to_date
                dailydiary.subject = this.dailyForm.value.selected_subject
                dailydiary.activity = this.dailyForm.value.selected_activity
                dailydiary.subject_id = this.globalVars.getMyGlobalsubjectID(this.dairy_page_dailydiary.standard, this.dairy_page_dailydiary.section, dailydiary.subject)
                dailydiary.created_by = this.globalVars.getMyGlobalUserId()
                dailydiary.id = this.navParams.get('parm_id');
                dailydiary.class_id = this.navParams.get('parm_class_id')
                dailydiary.modified_by = this.globalVars.getMyGlobalUserId()
                dailydiary.created_by_date = this.globalVars.getMyGlobaltodate()
                dailydiary.modified_by_date = this.globalVars.getMyGlobaltodate()

                console.log("my Id is" + dailydiary.id)

                if (this.dialydiary_update == "edit") {
                    this.dailydiaryUpdate(dailydiary,
                        dailydiary.id, dailydiary.class_id, this.token, this.id);

                } else {
                    this.dailydiaryPost(dailydiary,
                        dailydiary.class_id, this.token, this.id);
                } 
        }
        }
    }

    /* Reset the form  */
    resetForm() {

        this.dailyForm.reset({
            selected_activity: 'H',
            selected_to_date: this.selected_to_date,
        });
    }


    /* *********************************************************************************************************************************
     *  Navigations of screens                                                                                                       ***    
     *************************************************************************************************************************************/
    /*Navigate to Home Screen */
    home() {
        this.navCtrl.push(Home);
        this.navCtrl.setRoot(Home);
    }

    /*Navigate to EditDiary Page  */
    viewDiary() {


        this.navCtrl.push(DailyDiary_View, {

            parm_class_id: this.globalVars.getMyGlobalClass_id(this.dairy_page_dailydiary.standard, this.dairy_page_dailydiary.section),
            parm_standard: this.dairy_page_dailydiary.standard,
            parm_section: this.dairy_page_dailydiary.section,
            parm_school_id: this.dairy_page_dailydiary.school_id
        });
    }


    /* *********************************************************************************************************************************
     *  Toast Messages and Loading icon for the screen                                                                                                 ***    
     *************************************************************************************************************************************/
    /* Loading Icon */
    loading() {

        this.loader = this.loadingController.create({
            content: "Please wait"
        });
        this.loader.present();
    }

    /* Success Toast messages; After Edit go back to view screen */
    successToastreturn(message: string, pos: string) {
        let toast = this.toastController.create({
            message: message,
            duration: 1000,
            position: pos
        });
        toast.present();

        if (this.dialydiary_update == "edit") {
            this.navCtrl.pop();
        }

    }

    /* Error Toast messages; After Edit go back to view screen */
    errorToast(message: string, pos: string) {

        let toast = this.toastController.create({
            message: message,
            duration: 1000,
            position: pos
        });
        toast.present();

    }

    gettemplate(school_id: number, token: string, id: number) {
        this.classProvider
            .getTemplate(school_id, token, id)
            .subscribe(res => {
                    this.temp = < Template[] > res, this.loader.dismiss()
                },
                err => {
                    this.errorToast('Record not updated', 'middle');
                    this.loader.dismiss()
                }
            );
    }


    /***********************************************************************************************************************************
     *  All the Services call would start from here                                                                                   ***    
     *************************************************************************************************************************************/
    /*Post Daily Diary data  */
    dailydiaryPost(prvdr_savenotification_dailydiary: Dailydiary,
        prvdr_savenotification_dailydiary_class_id: any, token:string, id:number) {
        this.diaryProvider
            .addDiary(prvdr_savenotification_dailydiary,
                prvdr_savenotification_dailydiary_class_id, token, id)
            .subscribe(res => {
                    this.resetForm(), this.loader.dismiss(), this.successToastreturn("Record updated", "middle")
                },
                err => {
                    this.loader.dismiss(), this.errorToast("Records not updated", "middle")
                });
    }

    /*Update Daily Diary data  */
    dailydiaryUpdate(dailydiary: Dailydiary,
        id: number, class_id:number, token:string, tg_id:number) {

        this.diaryProvider
            .putDiary(dailydiary, id, class_id, token, tg_id)
            .subscribe(res => {
                    this.resetForm(), this.loader.dismiss(), this.successToastreturn("Record updated", "middle")
                },
                err => {
                    this.loader.dismiss(), this.errorToast("Records not updated", "middle")
                });
    }

    selectchange(args){ 
          
          this.dailyForm.controls['selected_message'].setValue(args);
    } 

    selecttitle(args){ 
                  
          this.dailyForm.controls['selected_title'].setValue(args);
          
        }


    presentPopover(myEvent) {

        let popover = this.popoverCtrl.create(PopoverPage, {
            view: "DailyDiaryView",
            class_id: this.dairy_page_dailydiary.class_id
        });

        popover.present({

            ev: myEvent

        });

    }

}