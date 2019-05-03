import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import { LoadingController } from 'ionic-angular';
import { TeacherProvider } from '../../providers/Teacher';
import { Master } from '../../models/master';
import { Student_Details } from '../../pages/student_details/student_details'
import { GlobalVars } from '../../providers/global-provider';


@Component({
    selector:'student-page',
    templateUrl: 'student.html'
})

export class Student {
showList:boolean = false;
student_details:Master[];
searchTerm: string = '';
searchControl: FormControl;
searching: boolean= false;
school_id:any;
cyf:any;
loader:any; 
student_search_results:Master[];
token:string;
id:number;

constructor(public loadingController:LoadingController,public navCtrl: NavController,
                public teacher: TeacherProvider,public globalVars: GlobalVars) {
        this.searchControl = new FormControl();
        this.school_id = this.globalVars.getMyGlobalschool()
    //    this.cyf="2017-2018"        
        this.cyf = this.globalVars.getMyGlobalacad_yr()
        this.token   = this.globalVars.getMyGlobalToken();
        this.id = this.globalVars.getMyGlobalUserId();   
 }
 
 loading(){
      this.loader = this.loadingController.create({
        content:"Please wait"
      });
      this.loader.present();
 
    }

ionViewDidEnter() {
       this.showList=false;
       console.log("length of student det" )
         this.loading()
         this.fetchmaster(this.school_id, this.cyf, this.token, this.id);   
     
}

fetchmaster(school_id:number, acad_year:String, token:string, id:number){
    this.teacher
    .getStudent(school_id, acad_year, token, id)
            .subscribe(res => {this.student_details = <Master[]>res,this.loader.dismiss()},
                       err =>  {this.loader.dismiss()}); 
}
 
onSearchInput(){

        this.showList=false;      

        if (this.searchControl.value.trim() != ' ')
            this.searchControl.valueChanges.debounceTime(400).subscribe(search => {
            this.setFilteredItems(this.searchControl.value);
        });
    }
 
setFilteredItems(searchTerm) {

        let search = searchTerm.toLowerCase();

            this.student_search_results = this.student_details.filter((item) => {
                return ((item.student_roll_no.toString().toLowerCase().indexOf(search) > -1) ||
                        (item.student_name.toLowerCase().indexOf(search) > -1))   
            });


            if (this.student_search_results.length > 0) {
                this.showList =true;
            }    

        }

submit(x) {
          
            console.log("I am coming here for the value" + x.student_id)
            this.searchTerm='';
            this.navCtrl.push(Student_Details,{
                parm_student_details:x,
                parm_update : "update"
                
            });

        }

student_add()
        {
            this.navCtrl.push(Student_Details,{
                parm_update:"add"
        
        });
        }

}