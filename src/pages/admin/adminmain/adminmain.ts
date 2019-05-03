import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Period } from '../../period/period';
import { Notification_Select } from '../../notification_select/notification_select';
import { ClassYear } from '../../admin/class-year/class-year';
import { Student_Details } from'../../student_details/student_details';
import { Student } from '../../student/student';
import { Teacher_Details } from '../../teacher_details/teacher_details';
import { Teacher_Class } from '../../teacher/teacher';
import { Subject } from '../../subject/subject';
import { Exam_Type } from '../../exam_type/exam_type';
import { Templates } from '../../templates/templates';
import { Compliant } from '../../compliant/compliant';
import { Compliant_View } from '../../compliant_view/compliant_view';
import { Events } from '../../events/events';
import { Prize_List } from '../../prize_list/prize_list';


@Component({
    templateUrl: 'adminmain.html'
})
export class adminmain {
    constructor(public navCtrl: NavController) {
        console.log("am coming in page one")
    }

    
    Submit_peroid() {
        this.navCtrl.push(Period);
    }
    Submit_teacher() {

        this.navCtrl.push(Notification_Select);
    }
    Submit_student() {

              this.navCtrl.push(Student);
    }
    Submit_Fees() {

        this.navCtrl.push(ClassYear);
    }
   Teacher_detail() {

               this.navCtrl.push(Teacher_Class);

    }
    Subject() {
        this.navCtrl.push(Subject);

    }

    exam() {
        this.navCtrl.push(Exam_Type)
    }

    template(){

        this.navCtrl.push(Templates)
    }
    compliantView(){

        this.navCtrl.push(Compliant_View)
    }
    events(){
        this.navCtrl.push(Events);
    }
    prize_list(){
        this.navCtrl.push(Prize_List);
    }
}