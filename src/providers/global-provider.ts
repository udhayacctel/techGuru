import { Injectable } from '@angular/core';
import { Login } from '../models/login-model';
import { Master } from '../models/master';
import { School_class_year } from '../models/school_class_year';
import { Teacher }    from '../models/teacher';
import { Parent }     from '../models/parent';
import { Student }    from '../models/student';
import { Examcreate } from '../models/exam';
import { SchoolConstants } from '../models/school_constant';

@Injectable()
export class GlobalVars {
myGlobalVar : Login[];
myGlobalMaster: Master[];
myGlobalVar_role_type:string;
myGlobalVar_cls:School_class_year[];
myGlobalVar_sec:School_class_year[];
myGlobalVar_subject:School_class_year[];
myGlobalVar_classAll:School_class_year[];
myGlobalVar_school_id:any;
myGlobalVar_user_id:number;
myGlobalVar_current_date: any;
myGlobalVar_current_day: string;
class_ids:number[];
myGlobalParent: Parent[];
myGlobalTeacher: Teacher[];
myGlobalStudent: Student;
myGlobalExam: Examcreate[];
myGlobalVar_acad_yr: any;
myGlobalActivePage:any;
myGlobalToken:any;
myGlobalId:number;
myGlobalVar_start_time:any;
myGlobalVar_end_time:any;


constructor() {
 //   this.myGlobalVar = []
      this.class_ids  = new Array();
      this.myGlobalVar_subject = new Array<School_class_year>();
      this.myGlobalExam = new Array<Examcreate>();
}


    setMyGlobalToken(token:string) {
    console.log("the value of token in the global var" + token )
    this.myGlobalToken = token;

   }

    setMyGlobalActivePage(activePage:any) {

        this.myGlobalActivePage = activePage

    }

    setMyGlobalExam(exam:Examcreate[]) { 

        this.myGlobalExam = exam

    }

    setMyGlobalMaster(master:Master[]) {
            this.myGlobalMaster = master;
        
   }
      
      setMyGlobalClass(cls:School_class_year[], section:School_class_year[]) {
          this.myGlobalVar_cls = [];
          this.myGlobalVar_sec = [];

          this.myGlobalVar_cls = cls;
          this.myGlobalVar_sec = section;
      }

       setMyGlobalAllClass(classAll:School_class_year[]) {    
           this.myGlobalVar_classAll = classAll
      }


      setMyGlobalSchool(school_id:any,acad_yr:any){
            this.myGlobalVar_school_id = school_id
            this.myGlobalVar_acad_yr   = acad_yr
      }

      setMyGlobalSchoolConstant(start_time:any, end_time:any){
            this.myGlobalVar_start_time = start_time
            this.myGlobalVar_end_time = end_time

      }

      setMyGlobalDate(to_date:any, day:string){
          this.myGlobalVar_current_date = to_date
          this.myGlobalVar_current_day = day
      }

      setMyGlobalrecord(parent:Parent[],teacher:Teacher[],student:Student){
        this.myGlobalParent  = parent;
        this.myGlobalTeacher = teacher;
        this.myGlobalStudent = student;     
        
    }

     setMyGlobalrole(role_type:string,user_id:number) {

        this.myGlobalVar_role_type = role_type;  
        this.myGlobalVar_user_id = user_id;

     }   

     getMyGlobalToken() {
        
                return this.myGlobalToken;
        
            }
        
      
      getMyGlobalParent() {

        return this.myGlobalParent;

      }
      
      getMyGlobalUserId(){

        return this.myGlobalVar_user_id;
     }


      getMyGlobalTeacher(){

        return this.myGlobalTeacher;
        
     }

      getMyGlobalStudent(){

        return this.myGlobalStudent;

      }

      getMyGlobalMaster() {
          return this.myGlobalMaster;
        
      }

      getMyGlobalclass() {
          return this.myGlobalVar_cls;
        
      }

      getMyGlobalsection() {
          return this.myGlobalVar_sec;
        
      }

      getMyGlobalclassAll() {
    
        return this.myGlobalVar_classAll;  
      
    }

    getMyGlobalsubject(standard:any, section:any) {

            let subject = this.getMyGlobalclassAll() 
            subject  = subject.filter(
                             sub => sub.standard == standard && sub.section == section );
            return subject 
    }

        
    getMyGlobalsubject_std(standard:any) {
        
            let sub = this.getMyGlobalclassAll() 

            sub  = sub.filter(
                      
            s => s.standard == standard);
 
            let subject = sub.sort((a,b) => {
                
                if (a.subject > b.subject) {
                    return 1
                }
                
                if (a.subject < b.subject) {
                    return -1
                }
                return 0;
            });                                                                                                            
 
            this.myGlobalVar_subject = [];

    
            let z = 0
            
            for (let i = 0; i < subject.length; i++) {
            
                z = subject.length  
                if (i == (subject.length -1)) {
                    this.myGlobalVar_subject.push(subject[i])
                    }
                            
            for(let j=i; j<z; j++) { 
                if (subject[i].subject != subject[j].subject) {
                    this.myGlobalVar_subject.push(subject[i])         
                        z = j  
                        i = j -1
                }
            }
        }
        
        return this.myGlobalVar_subject;
            
    }

    getMyGlobalsubjectID(standard:string,section:string,subject:string) {
        
        let subjects:School_class_year[];
        
        subjects  = this.getMyGlobalclassAll() 
        for(let x of subjects) {
            if ((x.standard == standard) &&
                  (x.section == section) &&
                     (x.subject == subject)) {
                          return x.subject_id   
        }
    }
}

    /* Get class id for the standard and section   */
    getMyGlobalClass_id(standard:string,section:string){
    
      let uniq_class:School_class_year[];
      
          uniq_class = this.getMyGlobalsection()
          for(let x of uniq_class) {
            if ((x.standard == standard) &&
                  (x.section == section)) {
                   return x.id 
            }
        }
    }

    getMyGlobalAllClass_id(standard:string){
        
          this.class_ids = [];
          let uniq_class:School_class_year[];
          
              uniq_class = this.getMyGlobalsection()
              for(let x of uniq_class) {
                if (x.standard == standard) {
                    this.class_ids.push(x.id) 
                 }
              }

              return this.class_ids
     }
    

      getMyGlobalrole() {        
    
        return this.myGlobalVar_role_type;
      }

       getMyGlobalacad_yr(){
        
          return this.myGlobalVar_acad_yr
            
     }
        
      getMyGlobalschool(){
          return this.myGlobalVar_school_id
            
     }

     getMyGlobalstart_time(){
         return this.myGlobalVar_start_time
     }
     
     getMyGlobalend_time(){
         return this.myGlobalVar_end_time
     }

      getMyGlobaltodate() {
          return this.myGlobalVar_current_date

      }

      getMyGlobaltoday() {
          return this.myGlobalVar_current_day

      } 
       
      getMyGlobalVar() {
        return this.myGlobalVar;
      
    }

    getMyGlobalExam() {
        
        return this.myGlobalExam;
        
    }

    getMYGlobalActivePage () {

        return this.myGlobalActivePage

    }
}