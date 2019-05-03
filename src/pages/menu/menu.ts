import { Component, ViewChild } from '@angular/core';
import { Home } from '../home/home';
import { NavController,Platform, MenuController, Nav,AlertController} from 'ionic-angular';
import { GlobalVars } from '../../providers/global-provider';
import { Master } from '../../models/master';
import { Parent } from '../../models/parent';
import { Teacher } from '../../models/teacher';
import { Student } from '../../models/student';
import { Notification_Select } from '../notification_select/notification_select';
import { adminmain } from '../admin/adminmain/adminmain';
import { Login } from '../login/login';
import { LoadingController } from 'ionic-angular';
import { School_class_year } from '../../models/school_class_year';
import { ClassProvider } from '../../providers/class-provider';
import { DailyDiary_Select } from '../dailydiary_select/dailydiary_select';
import { Exam } from '../exam/exam';
import { TimeTable_Parent } from '../timetable_parent/timetable_parent';
import { TimeTable_Create } from '../timetable_create/timetable_create';
import { Attendance } from '../attendance/attendance';
import { ParentMeet } from '../parentmeet/parentmeet';
import { Attendance_Report } from '../attendance_report/attendance_report';
import { Quiz_Select } from '../quiz_select/quiz_select';
import { Storage } from '@ionic/storage';
import { User } from '../../models/user';
import { ImageProvider } from '../../providers/image';
import { SchoolImage } from '../../models/schoolImage';
import { Camera,CameraOptions } from '@ionic-native/camera';
import { ActionSheetController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { Compliant } from '../compliant/compliant';
import { Suggestion } from '../suggestion/suggestion';
import { Free_Staff } from '../free_staff/free_staff';
import { Teacher_attendance } from '../teacher_attendance/teacher_attendance';
import { Bus_attendance } from '../bus_attendance/bus_attendance';
import { Attendance_Class_Select } from '../attendance_class_select/attendance_class_select';
import { PayRoll } from '../payroll/payroll';
import { Event_select } from '../event_select/event_select';
import { Other_Notification } from '../other_notification/other_notification';
import { Event_Notification } from '../event_notification/event_notification';
import { Gallery } from '../gallery/gallery';
import { Quizz } from '../quizz/quizz';
import { QuizSel } from '../quizsel/quizsel';

@Component({
    selector: 'page-menu',
    templateUrl: 'menu.html',
    providers: [ClassProvider]
})

/* *********************************************************************************************************************************
 *  Menu Page
 *  ---------- 
 *      Load the menu as per parent and teacher role
 *      Get the class
 *             
 ************************************************************************************************************************************/

export class Menu {
    @ViewChild('content') nav: Nav;
   
    activePage: any;
    rootPage: any;
    parent: Parent[];
    teacher: Teacher[];
    student: Student;
    master: Master[];
    pages: Array < {
        title: string,
        component: any,
        icon: string
    } > ;
    role_type: string;
    role_header: boolean;
    loader: any;
    secClass: School_class_year[];
    cls: School_class_year[];
    uniq_sec: School_class_year[];
    school_id: any;
    acad_year: string;
    lastBack: number;    
    token: string;

    user:User;
    image_id: number;
    base64Image: string;
    url: string;
    ht:number;
    qlt:number;
    schoolimage:SchoolImage[];
    tg_id:number;
    image: string;
    id:number ;
    start_time:any;
    end_time:any;

    constructor(public menu: MenuController,
        public globalVars: GlobalVars,
        public navCtrl: NavController,
        public loadingController: LoadingController,
        public classstandard: ClassProvider,
        public alertCtrl: AlertController,
        public platform: Platform,
        private storage: Storage,
        private camera:Camera,
        public imageProvider:ImageProvider,
        public actionSheetCtrl: ActionSheetController,
        public toastController:ToastController) {

        this.cls = new Array < School_class_year > ();
        this.uniq_sec = new Array < School_class_year > ();
        this.parent = new Array < Parent > ();
        this.teacher = new Array < Teacher > ();

        this.setDate()
       // this.tg_id=6
        this.school_id = "1"
        this.acad_year = "2017-2018"
       // this.id = 6
        this.globalVars.setMyGlobalSchool(this.school_id, this.acad_year)
        this.globalVars.setMyGlobalrole(this.role_type, this.id)
        this.school_id  = this.globalVars.getMyGlobalschool()
        //this.id = this.globalVars.getMyGlobalUserId();

        storage.get('user').then((val) => {
            
            if (val == null || val.user_token == null || val.user_token.length == 0 || val.id == null || val.id.length == 0)
            {
                console.log('TOKEN ISSUE ERROR');
            }
            else
            {
                this.user  = val 
                this.token = val.user_token;
                this.id = val.id;
                console.log("value of URL" + val.url)
                this.master = this.convertUserToMaster(this.user);
                this.globalVars.setMyGlobalMaster(this.master);     
                console.log("the value of token" + this.token )
                this.globalVars.setMyGlobalToken(this.token) 
                this.globalVars.setMyGlobalrole(this.role_type, this.id)
                this.globalVars.setMyGlobalSchoolConstant(this.start_time, this.end_time)
                this.id = this.globalVars.getMyGlobalUserId();
                this.fetchstandard(this.school_id,this.acad_year,this.token, this.id);   
            }
        }); 

        platform.ready().then(() => {
            platform.registerBackButtonAction(() => {
                if(this.menu.isOpen()){
                   this.menu.close()
                } 
                if(this.nav.canGoBack()){
                
                    this.nav.pop()

                }
                if (Date.now() - this.lastBack < 500) {
                    this.platform.exitApp();
                  }
                
                else {
            
                }
                this.lastBack = Date.now();
                
              });
            });            
    }

    /***********************************************************************************************************************************
     *  Run the loader untill the menus are loaded and services are run.                                                                *                                                                                                     *    
     ************************************************************************************************************************************/
    loading() {

        this.loader = this.loadingController.create({
            content: "Please wait"
        });
        this.loader.present();
    }

    /*
    *Convert the User to Master. Get the value from Storage. 
    */
    convertUserToMaster(userParm: User)
    {
        //Convert the User object to Master object
        //this.master = new Array<Master>();
        let tempMaster = new Array<Master>();
        var current_user_id = userParm.id;
        var current_user_name = userParm.name;
        var current_url = userParm.url;
        var current_start_time = userParm.start_time
        var current_end_time = userParm.end_time
        console.log("image url" + current_url + current_start_time + current_end_time)
        if (userParm.userRole.parent)
        {
            //For each child entry we have to push a record
            userParm.userRole.students.forEach(
                function(st){
                    st.userRole.classes.forEach(
                        function(cl)
                        {
                            let m = new Master();
                            m.tg_id = current_user_id;
                            m.name = current_user_name;
                            m.access_role = "P";       
                            m.student_name = st.name;
                            m.student_id = st.id;
                            m.student_class_id = cl.id;
                            m.student_standard = cl.standard;
                            m.student_section = cl.section;
                            m.url = current_url
                            tempMaster.push(m);
                        }
                    );
                }
            );
        }
        if (userParm.userRole.teacher)
        {
            userParm.userRole.classes.forEach(
                function(cl)
                {
                    let m = new Master();
                    m.tg_id = current_user_id;
                    m.name = current_user_name;
                    m.access_role = "T";
                    m.class_id = cl.id;
                    m.teacher_standard = cl.standard;
                    m.teacher_section = cl.section;
                    m.url = current_url
                    m.start_time = current_start_time;
                    m.end_time = current_end_time;
                    tempMaster.push(m);
                }
            );
        }
        if (userParm.userRole.student)
        {
            userParm.userRole.classes.forEach(
                function(cl)
                {
                    let m = new Master();
                    m.tg_id = current_user_id;
                    m.student_name = current_user_name;
                    m.access_role = "S";
                    m.student_class_id = cl.id;
                    m.student_standard = cl.standard;
                    m.student_section = cl.section;
                    m.url = current_url
                    tempMaster.push(m);
                }
            );
        }
        return tempMaster;
     }

loadRecords() {

        console.log("coming here to load the records")
        this.master = this.globalVars.getMyGlobalMaster()


        for (let x of this.master) {

            let z: Parent = new Parent()
            let y: Teacher = new Teacher()
            let s: Student = new Student()

            if (x.access_role == "P") {
                z.parent_id = x.tg_id
                z.parent_name = x.name
                z.parent_student_name = x.student_name
                z.parent_student_class_id = x.student_class_id
                z.parent_student_standard = x.student_standard
                z.parent_student_section = x.student_section
                z.parent_student_id = x.student_id
                z.parent_url = x.url
                
                this.parent.push(z)
                console.log("Menu parent image" + z.parent_url + x.url )

            } else if (x.access_role == "T") {
                y.teacher_id = x.tg_id
                y.teacher_name = x.name
                y.class_id = x.class_id
                y.teacher_number = x.teacher_number
                y.teacher_standard = x.teacher_standard
                y.teacher_section = x.teacher_section
                y.teacher_url = x.url
                y.start_time = x.start_time
                y.end_time = x.end_time
                this.teacher.push(y)
                console.log("Menu teacher image" + y.teacher_url + x.url + x.start_time + x.end_time )

            } else {
                s.student_id = x.tg_id
                s.student_roll_no = x.student_roll_no
                s.student_name = x.student_name
                s.student_class_id = x.student_class_id
                s.student_standard = x.student_standard
                s.student_section = x.student_section
                s.student_url = x.url
                console.log("Menu student class_id" + s.student_class_id +x.student_class_id )

            }

        }

        this.globalVars.setMyGlobalrecord(this.parent, this.teacher, this.student)

    }     
    /***********************************************************************************************************************************
     *  Below code to identify the role for the user .                                                                                                     *                                                                                                     *    
     ************************************************************************************************************************************/
    identifyRole() {

    
        if ((this.parent.length > 0) && (this.teacher.length > 0)) {
            console.log("the value for parent and teacher")


            let alert = this.alertCtrl.create({
                title: 'User Login',
                message: 'Do you want to login to app as a:',
                enableBackdropDismiss: false,
                buttons: [{
                        text: 'Parent',
                        handler: () => {

                            this.role_type = "P"
                            let x = this.parent[0].parent_id
                            this.globalVars.setMyGlobalrole(this.role_type, x)
                            this.loadmenu(this.role_type,x)
                            this.image = this.parent[0].parent_url
                            this.setMain_page()
                        }
                    },
                    {
                        text: 'Teacher',
                        handler: () => {

                            this.role_type = "T"
                            let x = this.teacher[0].teacher_id
                            this.globalVars.setMyGlobalrole(this.role_type, x)
                            this.loadmenu(this.role_type,x)
                            this.image = this.teacher[0].teacher_url
                            this.start_time = this.teacher[0].start_time
                            this.end_time = this.teacher[0].end_time
                            console.log("my timing" +this.start_time + this.end_time)
                            this.setMain_page()


                        }


                    }
                ]
            });
            alert.present();



        } else if (this.teacher.length > 0) {
            console.log("the value for teacher")
            this.role_type = "T"
            let x = this.teacher[0].teacher_id
            this.globalVars.setMyGlobalrole(this.role_type, x)
             this.loadmenu(this.role_type,x)
             this.image = this.teacher[0].teacher_url
            this.setMain_page()
           
        } else if (this.parent.length > 0) {
            console.log("the value for parent")
            this.role_type = "P"
            let x = this.parent[0].parent_id
            this.globalVars.setMyGlobalrole(this.role_type, x)
            this.loadmenu(this.role_type,x)
            this.image = this.parent[0].parent_url
            this.setMain_page()

        } else {

        }
    }
    /***********************************************************************************************************************************
     *  Set the date to Globalvar .                                                                                                     *                                                                                                     *    
     ************************************************************************************************************************************/
    setDate() {

        let today = new Date();
        let dd: any = today.getDate();
        let mm: any = today.getMonth() + 1; //January is 0!
        let yyyy: any = today.getFullYear();

        if (dd < 10) {
            dd = '0' + dd
        }

        if (mm < 10) {
            mm = '0' + mm
        }

        let current_date = yyyy + '-' + mm + '-' + dd;
        let day = this.getDayOfWeek(current_date)
        this.globalVars.setMyGlobalDate(current_date, day)

    }
    /***********************************************************************************************************************************
     *  Get the day for the date .                                                                                                      *                                                                                                     *    
     ************************************************************************************************************************************/
    getDayOfWeek(date) {
        var dayOfWeek = new Date(date).getDay();
        return isNaN(dayOfWeek) ? null : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek];

    }
    /***********************************************************************************************************************************
     *  Load the menu based on the role type                                                                                            *
     *         Parent certain menus will be loaded  
     *         Teacher certain menus will be loaded                                                                                                                          *    
     ************************************************************************************************************************************/
    loadmenu(role_type:string, id:number) {

        console.log("the value of role_type loadmenu" + role_type)
        console.log("I am coming the menu page")
        
        this.pages = [];
        if (role_type == "P") {
            this.role_header = true;
            this.pages = [
                {
                    title: 'Home',
                    component: Home,
                    icon: "home"
                },
                {
                    title: 'Attendance Report',
                    component: Attendance_Report,
                    icon: "timer"
                },
                {
                    title: 'TimeTable',
                    component: TimeTable_Parent,
                    icon: "calendar"
                },
                {
                    title: 'Exam',
                    component: Exam,
                    icon: "clipboard"
                },
                {
                    title: 'Take Test',
                    component: Quiz_Select,
                    icon: "school"
                },
             
                {
                    title: 'Compliant Box',
                    component: Compliant,
                    icon: "create"
                },
                {
                    title: 'Suggestion Box',
                    component: Suggestion,
                    icon: "create"
                },
                {
                    title: 'Event Notification',
                    component: Event_Notification,
                    icon: "notifications"
                },
                {
                    title: 'Logout',
                    component: null,
                    icon: "log-out"
                }
            ];

    //        this.activePage = this.pages[0]
        } else if (role_type == "T") {
            this.pages = [
               {
                    title: 'Home',
                    component: Home,
                    icon: "home"
                },
                {
                    title: 'Admin',
                    component: adminmain,
                    icon: "create"
                },
                {
                    title: 'TimeTable',
                    component: TimeTable_Create,
                    icon: "calendar"
                },
                {
                    title: 'Free Staff List',
                    component: Free_Staff,
                    icon: "list-box"
                },
                {
                    title: 'Daily Diary',
                    component: DailyDiary_Select,
                    icon: "book"
                },
                {
                    title: 'Attendance',
                    component: Attendance,
                    icon: "timer"
                },
                {
                    title: 'Teacher Attendance',
                    component: Teacher_attendance,
                    icon: "people"
                },
                {
                    title: 'Bus Attendance',
                    component: Bus_attendance,
                    icon: "bus"
                },
                {
                    title: 'Attendance View',
                    component: Attendance_Class_Select,
                    icon: "eye"
                },
                 {
                    title: 'Gallery',
                    component: Gallery,
                    icon: "images"
                },
                {
                    title: 'PayRoll',
                    component: PayRoll,
                    icon: "card"
                },
                {
                    title: 'House',
                    component: Event_select,
                    icon: "home"
                },

                {
                    title: 'Exam',
                    component: Exam,
                    icon: "clipboard"
                },

                {
                    title: 'Take Test',
                    component: Quiz_Select,
                    icon: "school"
                },
                {
                    title: 'Quiz',
                    component: Quizz,
                    icon: "school"
                },

                {
                    title: 'Parent Meet',
                    component: ParentMeet,
                    icon: "people"
                },
                
                {
                    title: 'Notifications',
                    component: Notification_Select,
                    icon: "notifications"
                },  
                {
                    title: 'Other Notifications',
                    component: Other_Notification,
                    icon: "notifications"
                },          

                {
                    title: 'Logout',
                    component: null,
                    icon: "log-out"
                }
            ];
        //    this.activePage = this.pages[0]
        } else {

            console.log("Menu for student")
        }

        //this.fetchimage(id, this.token)
    //    this.setMain_page()

    }

    /***********************************************************************************************************************************
     *  set the mainPage                                                                                                                                                     *    
     ************************************************************************************************************************************/
    setMain_page() {
        console.log("coming here to load the mainPage")
        this.rootPage = Home;

    }
    

    /***********************************************************************************************************************************
     *  Open the page when the certain component is clicked                                                                                             *
     *         Logout component will be null
     ************************************************************************************************************************************/
    openPage(page) {
     //   console.log("the value of ative page" + this.activePage.title)
        this.menu.close();
        
        let activPage = this.globalVars.getMYGlobalActivePage()
        if (page.component) {
      
          if((activPage = 'Home' && page.title != 'Home') || (activPage != 'Home' && page.title == 'Home')) {
               if(page.title == 'Home') {
                  this.nav.setRoot(page.component);
                  this.activePage = page;
                  
               } else {
                 this.nav.push(page.component);
                 this.activePage = page;
                 this.globalVars.setMyGlobalActivePage(page.title)
                 console.log("the value of active page" + this.activePage.title)
              }
          }   
        } else {
            let alert = this.alertCtrl.create({
                title: 'Logout',
                message: 'Are you sure you want to log out?',
                buttons: [{
                        text: 'Yes ',
                        handler: () => {
                           this.storage.remove('user') 
                           this.navCtrl.setRoot(Login)
                          // navigator['app'].exitApp();                
                           

                        }
                    },
                    {
                        text: 'No ',
                        handler: () => {
                            console.log("Logout cancel");
                        }
                    }
                ]
            });
            alert.present();
        }
    }


    checkActive(page) {

        return page == this.activePage
    }
    
    /* *********************************************************************************************************************************
     *  Filter the class to get the unique
     *  Output to pass the Unique class                                                                                    
     ************************************************************************************************************************************/
    getUniq_cls() {
        /* Logic to get the unique classes  */
        console.log("the value of getting the unique class")
        let k = 0;
        let c:School_class_year[] = new Array < School_class_year > ();
        let d:School_class_year[] = new Array < School_class_year > ();
//         let u:Teacher[] = new Array<Teacher>()

        for (let i = 0; i < this.secClass.length; i++) {

            k = this.secClass.length
            if (i == (this.secClass.length - 1)) {
                c.push(this.secClass[i])
      //          this.cls.push(this.secClass[i])
            }

            for (let j = i; j < k; j++) {

                if (this.secClass[i].standard != this.secClass[j].standard) {
                    c.push(this.secClass[i])
           //         this.cls.push(this.secClass[i])
                    k = j
                    i = j - 1
                }
            }
        }

        /* Trying to sort the class, since we are storing as string, standard 10 is always < standard 2 */
        /* So instead of sorting, place 10, 11, 12 after standard 9 */

        let j:number = 0
        j = c.length - 1
        for (let k=0; k<c.length; k++) {

            if (c[k].standard == "10" || c[k].standard == "11" || c[k].standard == "12") {
                    d.push(c[k])

             } else {
            
                 this.cls.push(c[k])
             
            }
 
               if(c[k].standard == "9" || k == j || c[k+1].standard > "9") {

                    for (let u = 0; u < d.length; u++) {

                         this.cls.push(d[u])

               }

                    d = []
        }

    }

}
     
    /* *********************************************************************************************************************************
     *  Filter the section to get the unique
     *  Output to pass the Unique section                                                                                    
     ************************************************************************************************************************************/

    getUniq_sec() {

        console.log("the value of getting the unique section")

        let z = 0
        for (let i = 0; i < this.secClass.length; i++) {
            z = this.secClass.length
            if (i == (this.secClass.length - 1)) {
                this.uniq_sec.push(this.secClass[i])
            }
            for (let j = i; j < z; j++) {

                if (this.secClass[i].standard != this.secClass[j].standard || this.secClass[i].section != this.secClass[j].section) {
                    this.uniq_sec.push(this.secClass[i])
                    z = j
                    i = j - 1
                }
            }
        }

        this.globalVars.setMyGlobalAllClass(this.secClass)
        this.globalVars.setMyGlobalClass(this.cls, this.uniq_sec)

    }
    /* *********************************************************************************************************************************
     *  All the Services call would start from here                                                                                   ***    
     ************************************************************************************************************************************/
    /* Get the list of standards and sections   */
    /* Pass input parameter as the school id    */
    /* Get the Output as the Classed available in the school; Get in the array format */
    fetchstandard(school_id: number, acad_year: string, token:string, id:number) {
        this.classstandard
            .getAllClassesForSchool(school_id, acad_year, token, id)
            .subscribe(res => {
                    this.secClass = < School_class_year[] > res, this.getUniq_cls(), this.getUniq_sec(), this.loadRecords(), this.identifyRole()
                },
                err => {
                });
    }

    
   selectPicture(){
                
            let cameraOptions = {
        
                sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
        
                destinationType: this.camera.DestinationType.DATA_URL, //Camera.DestinationType.FILE_URI,      
        
                quality: 75,       //qlt,
        
                targetWidth:90,     // ht,
        
                targetHeight: 90,      //ht,
        
                encodingType: this.camera.EncodingType.JPEG,      
        
                correctOrientation: true,

                allowEdit: true,   
    
        
            }
        
                this.camera.getPicture(cameraOptions)
        
                .then((imageData) => {
        
                // imageData is a base64 encoded string
        
                this.base64Image = "data:image/jpeg;base64," + imageData;
        
                let scimage = new SchoolImage();
    
                scimage.base64img = this.base64Image;

              if(this.role_type = "P"){

                this.parent = this.globalVars.getMyGlobalParent()
                this.tg_id =this.parent[0].parent_student_id
                console.log("parent student_id" +this.tg_id)
                
              }

            else {
                 
                this.teacher = this.globalVars.getMyGlobalTeacher() 
                this.tg_id = this.teacher[0].teacher_id
                console.log("teacher_id" +this.tg_id) 
                
             }
                 this.imageProvider
                .addImageToSchool(this.tg_id,scimage,this.token,this.id)
                .subscribe(res => {this.successToastreturn(), this.reload()},
        
                          err => {this.errorToast("Failed to upload: " + err)}
        
                          );  
        
                }, (err) => {
        
                    this.errorToast("Failed to get picture: " + err);
        
                });
        
            }
        
            takePicture()
        
            {

            this.camera.getPicture({
        
                destinationType: this.camera.DestinationType.DATA_URL,

                allowEdit: true,
                
                quality:75,      //qlt,
        
                targetWidth:90,  //ht,
        
                targetHeight:90, //ht,
        
            }).then((imageData) => {
        
              // imageData is a base64 encoded string
        
                this.base64Image = "data:image/jpeg;base64," + imageData;
        
                let scimage = new SchoolImage();
        
                scimage.base64img = this.base64Image;   

                if(this.role_type = "P"){
                    
                   this.parent = this.globalVars.getMyGlobalParent()
                                    
                   this.tg_id =this.parent[0].parent_student_id

                   console.log("parent student_id" +this.tg_id)
                                 
                }
                else {
                     this.teacher = this.globalVars.getMyGlobalTeacher()
                     this.tg_id = this.teacher[0].teacher_id
                     
                     console.log("teacher_id" +this.tg_id)
                     
                    
                    }

                this.imageProvider
        
                .addImageToSchool(this.tg_id, scimage, this.token, this.id)
        
                .subscribe(res => {this.successToastreturn(), this.reload()},
        
                          err => {this.errorToast("Failed to upload: " + err)}
        
                          );  
        
            }, (err) => {
        
                this.errorToast("Failed to upload: " + err);
        
            });
        
            
        
          }
    

        
      successToastreturn() {
        
                let toast = this.toastController.create({
                    message: 'Image Uploaded Successfully',
                    duration: 1000,
                    position: 'center'
                });
                toast.present();
            }
        
        errorToast(msg) {
                let toast = this.toastController.create({
                    message: msg,
                    duration: 1000,
                    position: 'center'
                });
                toast.present();
        
            }

    
 presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Profile Photo',
      buttons: [
        {
          text: 'Gallery',
          icon:"folder",
          handler: () => {
         
              this.selectPicture()
          }
        },
        {
          text: 'Camera',
          icon:"camera",
          handler: () => {

            this.takePicture()
          
          }
    
        },

        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
        
          }
        }
      ]
    });
 
    actionSheet.present();
  }

  reload(){

     this.fetchimage(this.tg_id, this.token, this.id)
  }

  fetchimage(tg_id: number, token:string, id:number) {

    console.log ("I am coming here to fetch image sessions")
    this.imageProvider
                .getimage(tg_id,token, id)
                .subscribe(res => { this.schoolimage = < SchoolImage[] > res, this.check(), console.log("i am in the success part"),this.setMain_page()
                    },
                           err => {console.log("i am in the error part"),this.setMain_page()
                    });
        }
        
        check(){
            console.log("menu image")
            for(let i of this.schoolimage){
                this.image = i.url
                console.log(i.url +"check")
                console.log("image" + i.url + this.image)
            }
        }
    
}