import { Component} from '@angular/core';
import { Teacher_class } from '../../models/teacher_class';
import { ClassReferenceTime } from '../../models/classReferenceTime';
import { NavController, NavParams } from 'ionic-angular';
import { TeacherProvider } from '../../providers/Teacher';
import { ToastController } from 'ionic-angular';
import { GlobalVars } from '../../providers/global-provider';	
import { LoadingController } from 'ionic-angular';	
	

@Component({
    selector: 'teacher-attendance',
    templateUrl: 'teacher_attendance.html',
    providers: [TeacherProvider]

})

export class Teacher_attendance {

    teacher: Teacher_class[];
    access_role:string;
    token:string;
    id:number;
    current_date:any;
    selected_viewdate:any

        constructor(public loadingController: LoadingController, public navCtrl: NavController,
                    public navParams: NavParams, public classProvider: TeacherProvider,
                    public toastController: ToastController, public globalVars: GlobalVars) {
        
                     this.token   = this.globalVars.getMyGlobalToken();
                     this.id = this.globalVars.getMyGlobalUserId();
                     this.access_role='T'
                     this.current_date = this.globalVars.getMyGlobaltodate()
                     this.selected_viewdate = this.globalVars.getMyGlobaltodate()

                     this.teacher = new Array < Teacher_class > ();

                    this.fetchAttndTeacher(this.current_date, this.token, this.id) 

    
}

fetchAttndTeacher(date:string, token: string, id:number) {

        this.classProvider
            .getteacherattendance(date, token, id)
            .subscribe(res => {
                     this.teacher = <Teacher_class[] > res
                },
                err => {
                    this.errorToast("Record not loaded", "middle")
                });

    }

change(x){
                        this.fetchAttndTeacher(this.selected_viewdate, this.token, this.id) 

}

 updateAttendance(date:string, attendance: Teacher_class[], token:string, id:number)

    {

        this.classProvider
            .updateteacherattendance(date, attendance, token, id)
            .subscribe(res => {
                    this.successToast('Record updated', 'middle')
                },
                err => {
                    this.errorToast("Record not updated", "middle")
                });
    }

private errorToast(msg: string, pos: string) {
        let toast = this.toastController.create({
            message: msg,
            duration: 1000,
            position: pos
        });
        toast.present();

    }

private successToast(msg: string, pos: string) {
        let toast = this.toastController.create({
            message: msg,
            duration: 1000,
            position: pos
        });
        toast.present();

    }

submit(){

        let selected_attendance: Teacher_class[] = new Array < Teacher_class > ();

        for(let n of this.teacher){
            
            let t_attnd: Teacher_class = new Teacher_class();

            t_attnd.teacher_id=n.tg_id
            t_attnd.attendance = n.attendance
            t_attnd.date = this.current_date
            t_attnd.created_by = this.globalVars.getMyGlobalUserId()

            selected_attendance.push(t_attnd)

        }
         this.updateAttendance(this.selected_viewdate, selected_attendance, this.token, this.id)

}
}