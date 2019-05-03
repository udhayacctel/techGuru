import { NgModule } from '@angular/core';
import { IonicApp, IonicModule} from 'ionic-angular';
import { MyApp } from './app.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';
import { Camera,CameraOptions,MediaType } from '@ionic-native/camera';
import { MediaCapture, CaptureVideoOptions, MediaFile, CaptureError } from '@ionic-native/media-capture';
import { Media, MediaObject } from '@ionic-native/media';
import { File } from '@ionic-native/file';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { IonicImageViewerModule } from 'ionic-img-viewer';


/*Pages*/
import { Home } from '../pages/home/home';
import { Login } from '../pages/login/login';
import { OTP }from '../pages/otp/otp';
import { DailyDiary_Select } from '../pages/dailydiary_select/dailydiary_select';
import { DailyDairy_Post } from '../pages/dailydiary_post/dailydiary_post';
import { Notification_View } from '../pages/notification_view/notification_view';
import { DailyDiary_Report } from '../pages/dailydiary_report/dailydiary_report';
import { Exam } from '../pages/exam/exam';
import { Exam_Selected } from '../pages/exam_selected/exam_selected';
import { Exam_View } from '../pages/exam_view/exam_view';
import { Exam_Type } from '../pages/exam_type/exam_type';
import { TimeTable_Select } from '../pages/timetable_select/timetable_select';
import { TimeTable_Create }  from '../pages/timetable_create/timetable_create';
import { TimeTable_Parent } from '../pages/timetable_parent/timetable_parent';
import { TimeTable_View } from '../pages/timetable_view/timetable_view';
import { PopoverPage} from '../pages/popover/popover'
import { Notification_Select } from '../pages/notification_select/notification_select';
import { ClassYear } from '../pages/admin/class-year/class-year';
import { DailyDiary_View } from '../pages/dailydiary_view/dailydiary_view';
import { DailyDiary_View2 } from '../pages/dailydiary_view2/dailydiary_view2';
import { Menu } from '../pages/menu/menu';
import { adminmain } from '../pages/admin/adminmain/adminmain';
import { Period } from '../pages/period/period';
import { Subject } from '../pages/subject/subject';
import { Attendance } from '../pages/attendance/attendance';
import { Attendance_Selected } from '../pages/attendance_selected/attendance_selected';
import { Attendance_View } from '../pages/attendance_view/attendance_view';
import { ParentMeet } from '../pages/parentmeet/parentmeet';
import { ParentMeet_Selected } from '../pages/parentmeet_selected/parentmeet_selected';
import { ParentMeet_View } from '../pages/parentmeet_view/parentmeet_view';
import { ParentMeet_View2 } from '../pages/parentmeet_view2/parentmeet_view2';
import { Attendance_Report } from '../pages/attendance_report/attendance_report';
import { Quiz_Admin } from '../pages/quiz_admin/quiz_admin';
import { Quiz_Select } from '../pages/quiz_select/quiz_select';
import { Quiz_Test } from '../pages/quiz_test/quiz_test';
import { Quiz_Result } from '../pages/quiz_result/quiz_result';
import { Student } from '../pages/student/student';
import { Student_Details } from '../pages/student_details/student_details';
import { Teacher_Class } from '../pages/teacher/teacher';
import { Teacher_Details } from '../pages/teacher_details/teacher_details';
import { Templates } from '../pages/templates/templates';
import { Compliant } from '../pages/compliant/compliant';
import { Compliant_View } from '../pages/compliant_view/compliant_view';
import { Suggestion } from '../pages/suggestion/suggestion';
import { Free_Staff } from '../pages/free_staff/free_staff';
import { Teacher_attendance } from '../pages/teacher_attendance/teacher_attendance';
import { Bus_attendance } from '../pages/bus_attendance/bus_attendance';
import { Attendance_Class_Select } from '../pages/attendance_class_select/attendance_class_select';
import { Compare_Attendance } from '../pages/compare_attendance/compare_attendance';
import { PayRoll} from '../pages/payroll/payroll';
import { Events} from '../pages/events/events';
import { Event_select} from '../pages/event_select/event_select';
import { Event_View } from '../pages/event_view/event_view';
import { Other_Notification } from '../pages/other_notification/other_notification';
import { Event_Notification } from '../pages/event_notification/event_notification';
import { Prize_List } from '../pages/prize_list/prize_list';
import { Gallery } from '../pages/gallery/gallery';
import { Quizz } from '../pages/quizz/quizz';
import { Quizq } from '../pages/quizq/quizq';

/*Providers & Services*/
import { ClassProvider } from '../providers/class-provider';
import { QuizProvider } from '../providers/quiz-provider';
import { LoginProvider } from '../providers/login-provider';
import { NotificationProvider } from '../providers/notification-provider';
import { DailyDiaryProvider } from '../providers/dailydiary-provider';
import { ExamtimetableProvider } from '../providers/examtimetable-provider';
import { TimeTableProvider } from '../providers/Timetable-provider';
import { ParentMeetProvider } from '../providers/parentmeet';
import { GlobalVars } from '../providers/global-provider';
import { TeacherProvider } from '../providers/Teacher';
import { ImageProvider } from '../providers/image';
import { BusProvider } from '../providers/bus-provider';
import { FormatTimePipe } from '../pages/formatTime.pipe';
import { PayrollProvider } from '../providers/payroll';
import { EventsProvider } from '../providers/event-provider';
import { QuizProv } from '../providers/quiz';



@NgModule({
  declarations: [
    MyApp,
    Home,
    Login,
    OTP,
    Notification_Select,
    ClassYear,
    DailyDiary_Select,
    DailyDairy_Post,
    Notification_View,
    DailyDiary_View,
    DailyDiary_View2,
    Menu,
    adminmain,
    Period,
    Subject,
    DailyDiary_Report,
    PopoverPage,
    Exam,
    Exam_Selected,
    Exam_View,
    Exam_Type,
    PopoverPage,
    TimeTable_Select,
    TimeTable_Create,
    TimeTable_Parent,
    TimeTable_View,
    Attendance,
    Attendance_Selected,
    Attendance_View,
    ParentMeet,
    ParentMeet_Selected,
    ParentMeet_View,
    ParentMeet_View2,
    Attendance_Report,
    Quiz_Admin,
    Quiz_Select,
    Quiz_Test,
    Quiz_Result,
    Student,
    Student_Details,
    Teacher_Class,
    Teacher_Details,
    Templates,
    Compliant,
    Compliant_View,
    Suggestion,
    Free_Staff,
    Teacher_attendance,
    Bus_attendance,
    Attendance_Class_Select,
    Compare_Attendance,
    FormatTimePipe,
    PayRoll,
    Events,
    Event_select,
    Event_View,
    Other_Notification,
    Event_Notification,
    Prize_List,
    Gallery,
    Quizz,
    Quizq,

  ],
  imports: [
    IonicModule.forRoot(MyApp),
    BrowserModule,
    HttpModule,
    CommonModule,
    FormsModule,
    IonicImageViewerModule,        
    IonicStorageModule.forRoot()
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Home,
    Login,
    OTP,
    Notification_Select,
    ClassYear,
    DailyDiary_Select,
    DailyDairy_Post,
    Notification_View,
    DailyDiary_View,
    DailyDiary_View2,
    Menu,
    adminmain,
    Period,
    Subject,
    DailyDiary_Report,
    PopoverPage,
    Exam,
    Exam_Selected,
    Exam_View,
    Exam_Type,
    TimeTable_Select,
    TimeTable_Create,
    TimeTable_Parent,
    TimeTable_View,
    Attendance,
    Attendance_Selected,
    Attendance_View,
    ParentMeet,
    ParentMeet_Selected,
    ParentMeet_View,
    ParentMeet_View2,
    Attendance_Report,
    Quiz_Admin,
    Quiz_Select,
    Quiz_Test,
    Quiz_Result,
    Student,
    Student_Details,
    Teacher_Class,
    Teacher_Details,
    Templates,
    Compliant,
    Compliant_View,
    Suggestion,
    Free_Staff,
    Teacher_attendance,
    Bus_attendance,
    Attendance_Class_Select,
    Compare_Attendance,
    PayRoll,
    Events,
    Event_select,
    Event_View,
    Other_Notification,
    Event_Notification,
    Prize_List,
    Gallery,
    Quizz,
    Quizq,

    ],

  providers: [ 
               ClassProvider,
               LoginProvider,
               NotificationProvider,
               DailyDiaryProvider,
               ExamtimetableProvider,
               TimeTableProvider, 
               QuizProvider,
               TeacherProvider ,
               ParentMeetProvider,
               GlobalVars,
               SplashScreen,
               ImageProvider,
               BusProvider,
               PayrollProvider,
               EventsProvider,
               Camera,
               MediaCapture,
               File,
               FileTransfer,
               FileTransferObject,
               Media,
               QuizProv
               
                      
               ]

})
export class AppModule {}
