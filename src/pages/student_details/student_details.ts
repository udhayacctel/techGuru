import { Component } from '@angular/core';
import { NavController, NavParams,AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import {TeacherProvider} from '../../providers/Teacher';
import { GlobalVars } from '../../providers/global-provider';
import { School_class_year } from '../../models/school_class_year';
import { Master } from '../../models/master';

@Component({
    selector:'student-details',
    templateUrl: 'student_details.html'
})

export class Student_Details {
    
    selected_name:any;
    selected_contact:any;
    selected_parentname:any;
    selected_parentcontact:any;
    selected_id:any;
    selected_standard:any;
    selected_section:any;
    selected_student_id:number = 0;
    selected_address:any;
    selected_email: any;
    parm_update:any;
    loader:any;
    standard:any;
    section:any;
    sec: School_class_year[];
    stdsec: boolean;
    class_id:number;
    student_det:Master;
    token:string;
    school_id:number;
    id:number

    constructor(public navCtrl: NavController, public navParams: NavParams,public loadingController:LoadingController,
                    public toastController: ToastController, public teacherprovider: TeacherProvider,
                    public globalVars: GlobalVars,public alertCtrl: AlertController){
  
            this.standard = this.globalVars.getMyGlobalclass()
            this.section = this.globalVars.getMyGlobalsection()
            this.token   = this.globalVars.getMyGlobalToken();
            this.id = this.globalVars.getMyGlobalUserId();   
            this.parm_update = navParams.get("parm_update")
            this.student_det = navParams.get("parm_student_details")
            this.school_id = this.globalVars.getMyGlobalschool()
            
        if (this.parm_update == "update") {
            this.selected_parentname  = this.student_det.name
            this.selected_parentcontact = this.student_det.login_key
            this.selected_id  = this.student_det.student_roll_no
            this.selected_name = this.student_det.student_name
            this.selected_contact  = this.student_det.student_key
            this.selected_standard = this.student_det.standard
            this.selected_section  = this.student_det.section
            this.selected_student_id    = this.student_det.student_id
            console.log(" the value of the tg_id " + this.student_det.student_id)

        }
             
}

insertStudent(mstr:Master,class_id:number,student_roll_no:any,update_ind:string, 
                school_id:number, token:string, id:number)
        
        {
            this.teacherprovider
                .studentPost(mstr,class_id,student_roll_no,update_ind, school_id, token, id)
                .subscribe(res => {this.successToastreturn('Record updated', 'middle'),this.resetform()},
                           err => {this.errorToast('Record not updated', 'middle')});
        }


resetform(){
   
    this.selected_contact=''
    this.selected_id=''
    this.selected_name = ''
    this.selected_standard = ''
    this.selected_section = ''
    this.selected_parentname =''
    this.selected_parentcontact =''
    this.selected_address = ''
    this.selected_email = ''

}

successToastreturn(msg, pos) {

        let toast = this.toastController.create({
            message: msg,
            duration: 1000,
            position: pos
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

class_selected() {

        this.loading();
        this.sec = this.section.filter(
            scn => scn.standard === this.selected_standard);
        this.stdsec = true
        this.loader.dismiss();
    }

loading() {

        this.loader = this.loadingController.create({
            content: "Please wait"
        });
        this.loader.present();
    }

submit(){
     
         if ((this.selected_standard === undefined || this.selected_standard == null || this.selected_standard.length <= 0) ||
            (this.selected_name === undefined || this.selected_name== null || this.selected_name.length <= 0) ||
            (this.selected_id=== undefined || this.selected_id == null || this.selected_id.length <= 0) ||    
            (this.selected_section === undefined || this.selected_section== null || this.selected_section.length <= 0) ||
            (this.selected_contact === undefined || this.selected_contact== null || this.selected_contact.length <= 0) ||
            (this.selected_parentname=== undefined || this.selected_parentname== null || this.selected_parentname.length <= 0) ||
            (this.selected_parentcontact === undefined || this.selected_parentcontact== null || this.selected_parentcontact.length <= 0)) {
            
            let alert = this.alertCtrl.create({
                message: 'Please Fill all the Fields',
                buttons: [{
                    text: 'OK'
                }]
            });
            alert.present();

        } else {


            this.class_id=this.globalVars.getMyGlobalClass_id(this.selected_standard, this.selected_section)
            
            console.log(" the value of student" + this.class_id + this.selected_parentname + this.selected_parentcontact + this.selected_id + this.selected_name + this.selected_contact)

            let y: Master = new Master();
            let update_ind:string;

            y.name = this.selected_parentname
            y.login_key = this.selected_parentcontact
            y.student_roll_no = this.selected_id
            y.student_name = this.selected_name
            y.class_id = this.class_id
            y.student_key = this.selected_contact
            y.student_id  = this.selected_student_id

            update_ind = 'I'

            if (this.parm_update == "update") {

                    update_ind = 'U'
            }
            
            this.insertStudent(y,this.class_id,this.selected_id,update_ind, this.school_id, this.token, this.id)
     }
}

remove(){
    this.class_id=this.globalVars.getMyGlobalClass_id(this.selected_standard, this.selected_section)

    let y: Master = new Master();
            let update_ind:string;

            y.name = this.selected_parentname
            y.login_key = this.selected_parentcontact
            y.student_roll_no = this.selected_id
            y.student_name = this.selected_name
            y.class_id = this.class_id
            y.student_key = this.selected_contact
            y.student_id  = this.selected_student_id

        update_ind = 'D'
        this.insertStudent(y,this.class_id,this.selected_id,update_ind, this.school_id, this.token, this.id)
}
}