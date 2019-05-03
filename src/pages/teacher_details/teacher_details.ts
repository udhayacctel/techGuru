import { Component, Directive } from '@angular/core';
import { NavController, NavParams,AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import {Teacher} from '../../models/teacher';
import {TeacherProvider} from '../../providers/Teacher';
import { GlobalVars } from '../../providers/global-provider';
import { Master } from '../../models/master';
import { School_class_year } from '../../models/school_class_year';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'teacher-details',
    templateUrl: 'teacher_details.html',

})
export class Teacher_Details {
selected_name:any
selected_contact:any;
selected_roll:any;
selected_id:any;
parm_update:any;
parm_master:any;
teacher_det: Teacher[];
selected_teacher_id: number;
teacher_id:number;
teacher: Teacher[]
standard:School_class_year[]
//selected_std: string[]
standardAdd: string[]
standardDel: string[]
class_id:number[];
selected_section:any
selected_standard:any;
class_id_all: number[];
token: string;
school_id:number;
id:number;

        constructor(public navCtrl: NavController, public navParams: NavParams,public loadingController:LoadingController,
                    public toastController: ToastController,public teacherprovider: TeacherProvider,
                    public globalVars: GlobalVars,public alertCtrl : AlertController){
            
  //          this.selected_std = new Array<string>();
            this.standardAdd  = new Array<string>();
            this.class_id  = new Array<number>();
            this.standardDel = new Array<string>();
            this.teacher     = new Array<Teacher>();


            this.parm_update = navParams.get("parm_update")
            this.teacher_det = navParams.get("parm_teacher_data")
            this.teacher     = navParams.get("parm_teacher_data")
            this.token   = this.globalVars.getMyGlobalToken();
            this.id = this.globalVars.getMyGlobalUserId();   
            this.standard = this.globalVars.getMyGlobalclass()
            this.school_id = this.globalVars.getMyGlobalschool()
            
           // this.selected_standard = new Array();
            this.selected_standard= new Array<string>();

             if(this.parm_update == "update"){
                for (let x of this.teacher_det) {
                    this.selected_standard.push(x.teacher_standard)
                }
   //            this.selected_id = navParams.get("parm_teacher_number")
               this.selected_name = this.teacher_det[0].teacher_name
               this.selected_teacher_id = this.teacher_det[0].teacher_id
               this.selected_contact= navParams.get("parm_login_key");
               this.selected_id= navParams.get("parm_teacher_number");

              // this.selected_standard.push(this.teacher_det.class_id);
             //this.selected_id = this.teacher_det.teacher_number;
               
        }
             

/*
            console.log("I am coning in the teacher detail screen" + this.teacher_det.name)
            this.parm_update = navParams.get("parm_update")
            this.teacher_det = navParams.get("parm_teacher_data")
            this.standard = this.globalVars.getMyGlobalclass()

            this.selected_std = new Array<string>();
            this.standardAdd  = new Array<string>();
            this.class_id  = new Array<number>();

            this.standardDel = new Array<string>();           
            console.log("I am coning in the teacher detail screen" + this.teacher_det.name)
             if(this.parm_update == "update"){
                
               this.selected_name = this.teacher_det.name
               this.selected_teacher_id = this.teacher_det.teacher_id
               this.selected_contact= this.teacher_det.login_key;
               this.selected_id = this.teacher_det.teacher_number;
               this.selected_standard.push("");
               this.getTeacher(this.selected_teacher_id)
        }

*/


}

resetform(){
    this.selected_contact=''
    this.selected_id=''
    this.selected_name = ''
    this.selected_standard = ['']
}

/*
loadStandard() {


    this.selected_standard.pop()

    for (let x of this.teacher) {

            this.selected_standard.push(x.teacher_standard)

    }
}

*/

teacherPost (prvd_master: Teacher[], teacher_number:number,  school_id:number, token:string, id:number) {
          this.teacherprovider
            .teacherpost(prvd_master, teacher_number, school_id, token, id) 
            .subscribe(res => {this.successToastreturn('Record updated', 'middle'),this.resetform()},
                       err => {this.errorToast('Record not updated', 'middle')});
  } 


teacherClassUpdate (prvd_master: Teacher[], teacher_number:any,update_ind:string,school_id:number, token:string, id:number) {
          this.teacherprovider
            .updateTeacherclass(prvd_master, teacher_number,update_ind, school_id,token, id) 
            .subscribe(res => {this.successToastreturn('Record updated', 'middle'),this.resetform()},
                       err => {this.errorToast('Record not updated', 'middle')});
  }


teacherdelete (teacher_id:number, teacher_number:any, school_id:number, token: string, id:number) {
          this.teacherprovider
            .teacherdelete(teacher_id, teacher_number, school_id, token, id) 
            .subscribe(res => {this.successToastreturn('Record updated', 'middle'),this.resetform()},
                       err => {this.errorToast('Record not updated', 'middle')});
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


submit(){

     if ((this.selected_standard === undefined || this.selected_standard == null || this.selected_standard.length <= 0) ||
        (this.selected_name === undefined || this.selected_name== null || this.selected_name.length <= 0) ||
        (this.selected_id=== undefined || this.selected_id == null || this.selected_id.length <= 0) ||    
        (this.selected_contact === undefined || this.selected_contact== null || this.selected_contact.length <= 0)) {
            
            let alert = this.alertCtrl.create({
                message: 'Please Fill all the Fields',
                buttons: [{
                    text: 'OK'
                }]
            });
            alert.present();

        } else {

    if(this.parm_update != "update") {
    
      let u:Teacher[] = new Array<Teacher>()

        for (let s of this.selected_standard) {

                    this.class_id=this.globalVars.getMyGlobalAllClass_id(s)         
            
                    for(let n of this.class_id){

                    let t: Teacher = new Teacher()
                        console.log(" the value of class_id" + n)
                        t.teacher_class_id = n
                     //   t.teacher_id = this.selected_teacher_id
                        t.teacher_number = this.selected_id
                        t.teacher_name = this.selected_name
                        t.teacher_key = this.selected_contact

                        u.push(t)

                    }                
        }
              this.teacherPost(u,this.selected_id, this.school_id, this.token, this.id)

      } else {  
            console.log("coming after submit")
            let x = this.teacher.length
            let y = this.selected_standard.length  
            let l:number = 0;


            if (y > x ) {

                l = y   

            }else {

                l = x 
                
            }

            let n = 1;
            let j:number = 0; 
            let i:number = 0;
            let teacherStd:any;
            let selectedStd:any
            
            selectedStd = this.selected_standard[0];
            teacherStd = this.teacher[0].teacher_standard
                console.log("coming after submit teacher length" + x )
                console.log("coming after submit selected standard" + y )


            console.log("coming after submit l" + l )

             do{
                //let l = y
                if (selectedStd == teacherStd) {
                    console.log(" the value of i in matched " + i )
                    console.log("the value of j in matched " + j)  
                    console.log("Records matched ") 
                    
                    if ( (i +1) == y ) {
                        //i = y
                        selectedStd = "Z"    
                    } else {
                            i = i + 1     
                            selectedStd = this.selected_standard[i]     
                    }

                    if ( (j+1) == x ) {
                      //  j = x
                       // j = x - 1
                       teacherStd = "Z"    
                    } else {
                            j = j + 1          
                            teacherStd = this.teacher[j].teacher_standard
                    }


                }else if(selectedStd < teacherStd)  {
                    console.log("Records added list ") 
                    console.log(" the value of i in added " + i )
                    console.log("the value of j in added " + j)
                    this.standardAdd.push(selectedStd)  
                    if ( (i+1) == y ) {
                       selectedStd = "Z"
                       // i = y    
                    } else {
                            i = i + 1  
                            selectedStd = this.selected_standard[i];        
                    }
                } else if(selectedStd > teacherStd) {
                    console.log("Records deleted list ")
                    console.log(" the value of i in deleted " + i )
                    console.log("the value of j in deleted " + j)  
                    this.standardDel.push(teacherStd) 
                    if ( (j + 1) == x ) {
                        teacherStd = "Z"
                        //j = x    
                    } else {
                            j = j + 1      
                            teacherStd = this.teacher[j].teacher_standard 
                    }

                }

                    n++;
            }while(l >= n );

           /* do{
                //let l = y
                if (this.selected_standard[i] == this.teacher[j].teacher_standard) {
                    console.log(" the value of i in matched " + i )
                    console.log("the value of j in matched " + j)  
                    console.log("Records matched ") 
                    
                    if ( (i +1) == y ) {
                        i = y    
                    } else {
                            i = i + 1          
                    }

                    if ( (j+1) == x ) {
                      //  j = x
                        j = x - 1    
                    } else {
                            j = j + 1          
                    }


                }else if(this.selected_standard[i] < this.teacher[j].teacher_standard)  {
                    console.log("Records added list ") 
                                    console.log(" the value of i in added " + i )
                    console.log("the value of j in added " + j)
                    this.standardAdd.push(this.selected_standard[i])  
                    if ( (i+1) == y ) {
                        i = y    
                    } else {
                            i = i + 1          
                    }
                } else if(this.selected_standard[i] > this.teacher[j].teacher_standard) {
                    console.log("Records deleted list ")
                                    console.log(" the value of i in deleted " + i )
                    console.log("the value of j in deleted " + j)  
                    this.standardDel.push(this.teacher[j].teacher_standard) 
                    if ( (j + 1) == x ) {
                        j = x    
                    } else {
                            j = j + 1          
                    }

                }

                    n++;
            }while(l >= n );*/


            console.log("the length of values " + this.standardAdd.length)
            console.log("the length of values " + this.standardDel.length)
            
        /*  for (let s of this.standardAdd) {

                    console.log ("value of standard_add" + s)

            }*/



        /* insert class ids to the teacher id */

            let update_ind:string;
            for (let s of this.standardAdd) {

                    this.class_id=this.globalVars.getMyGlobalAllClass_id(s)

                    let z:Teacher[] = new Array<Teacher>()
                
                    for(let n of this.class_id){

                    let t: Teacher = new Teacher()
                        console.log(" the value of classid" + n)
                        t.teacher_class_id = n
                        t.teacher_id = this.selected_teacher_id
                        t.teacher_number = this.selected_id
                        t.teacher_name = this.selected_name
                        t.teacher_key = this.selected_contact

                        z.push(t)
                    }

                    update_ind = 'I'
                    this.teacherClassUpdate(z, this.selected_id,update_ind, this.school_id, this.token, this.id)
        }

        /* Delete class ids to the teacher id */


            for (let s of this.standardDel) {

                    this.class_id=this.globalVars.getMyGlobalAllClass_id(s)

                    let z:Teacher[] = new Array<Teacher>()
                
                    for(let n of this.class_id){

                    let t: Teacher = new Teacher()

                        t.teacher_class_id = n
                        t.teacher_id = this.selected_teacher_id
                        t.teacher_number = this.selected_id
                        t.teacher_name = this.selected_name
                        t.teacher_key = this.selected_contact

                        z.push(t)
                    }

                    update_ind = 'D'
                    this.teacherClassUpdate(z, this.selected_id,update_ind, this.school_id, this.token, this.id)
            
        }
    }
        }
}

remove(){
          this.teacherdelete(this.selected_teacher_id, this.selected_id, this.school_id, this.token, this.id)
    }
}
