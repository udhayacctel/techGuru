import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import { Teacher_Details } from '../teacher_details/teacher_details';
import { LoadingController } from 'ionic-angular';
import { TeacherProvider } from '../../providers/Teacher';
import { Master } from '../../models/master';
import {Teacher} from '../../models/teacher';
import { GlobalVars } from '../../providers/global-provider';


@Component({
    selector:'teacher-page',
    templateUrl: 'teacher.html'
})

export class Teacher_Class {
showList:boolean = false;
searchTerm: string = '';
searchControl: FormControl;
items: any;
teacher_details: Teacher[];
searching:boolean = false;
school_id:any;
acad_year:any;
parm_update:any;
loader:any; 
teacher_number: String;
teacher_list:Master[];
teacher_search_result:Master[];
login_key: any;
teacherNumber:any;
token:string;
id:number;

constructor(public loadingController:LoadingController,public navCtrl: NavController, 
            public teacher: TeacherProvider,public globalVars: GlobalVars ) {
        this.searchControl = new FormControl();
        //this.school_id=1;
        this.acad_year='2017-2018';
        this.token   = this.globalVars.getMyGlobalToken();
        this.id = this.globalVars.getMyGlobalUserId();   
        this.school_id = this.globalVars.getMyGlobalschool()

       }


 loading(){

      this.loader = this.loadingController.create({
        content:"Please wait"
      });
      this.loader.present();
 
}

getTeacher(school_id:number, teacher_id:number, token:string, id:number){
    this.teacher
    .getteacherdata(school_id, teacher_id, token, id)
            .subscribe(res => {this.teacher_details = <Teacher[]>res, this.teacherPage()},
                       err =>  {}); 
}
    
ionViewDidEnter() {
 
       this.showList=false; 
       this.loading()
       this.fetchTeacher(this.school_id, this.acad_year, this.token, this.id);        
     
}

fetchTeacher(school_id:number, acad_year:String, token:string, id:number){
    this.teacher
    .getteacher(school_id, acad_year, token, id)
            .subscribe(res => {this.teacher_list = <Master[]>res,this.loader.dismiss()},
                       err =>  {this.loader.dismiss()}); 

}
 
onSearchInput(){
        this.showList=false     
      
        if (this.searchControl.value.trim() != ' ')
            this.searchControl.valueChanges.debounceTime(400).subscribe(search => {
            this.setFilteredItems(this.searchControl.value);
        });
}
 
setFilteredItems(searchTerm) {

    let search = searchTerm.toLowerCase();

    this.teacher_search_result = this.teacher_list.filter((item) => {
        return ((item.teacher_number.toString().toLowerCase().indexOf(search) > -1) ||
                  (item.name.toLowerCase().indexOf(search) > -1))   
    });


    if (this.teacher_search_result.length > 0) {
        this.showList =true;
    }    

}

submit(x) {
    this.searchTerm='';
    this.login_key = x.login_key
    this.teacherNumber = x.teacher_number

    this.getTeacher(this.school_id, x.teacher_id, this.token, this.id)
         
}

teacherPage(){
 this.navCtrl.push(Teacher_Details,{
        parm_teacher_data: this.teacher_details,
        parm_login_key: this.login_key,
        parm_teacher_number: this.teacherNumber,
        parm_update : "update",
          }); 
   
}

teacher_add()
{
    this.navCtrl.push(Teacher_Details,{
            parm_update:"add"})
}
}