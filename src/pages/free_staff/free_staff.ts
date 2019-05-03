import { Component, Directive } from '@angular/core';
import { NavController, NavParams,AlertController } from 'ionic-angular';
import { ClassProvider } from '../../providers/class-provider';
import { ToastController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { GlobalVars } from '../../providers/global-provider';
import { TimeTableProvider } from '../../providers/Timetable-provider';
import { TimeTable } from '../../models/timetable';
import { School_class_year } from '../../models/school_class_year';
import { ClassReferenceTime } from '../../models/classReferenceTime';


@Component({
    selector: 'free-staff',
    templateUrl: 'free_staff.html',

})

export class Free_Staff {

    time_table_notification_date_day: TimeTable[];
    period_type: string;
    token: string;
    id: number;
    class_id: number
    period_id: number
    teacher_name: string;
    teacher_id: string;
    standard: School_class_year[];
    selected_standard: any;
    selectedClassID: number;
    classRefTimes: ClassReferenceTime[];
    selected_period: any;
    freestaff: boolean;
   

    constructor(public navCtrl: NavController, public navParams: NavParams, public timetableProvider: TimeTableProvider,
        public loadingController: LoadingController, public toastController: ToastController, public globalVars: GlobalVars, public alertCtrl: AlertController,
        public classProvider: ClassProvider) {

        this.period_type = 'Period 3'
        this.class_id = 10
        //this.period_id=40
        this.token = this.globalVars.getMyGlobalToken();
        this.id = this.globalVars.getMyGlobalUserId();
        this.standard = this.globalVars.getMyGlobalclass()

        // this.Getstafflist(this.class_id, this.period_id, this.token, this.id)


    }
    class_period(y) {

          this.freestaff= true
        for (let x of this.standard) {

            if (x.standard == this.selected_standard) {
                this.selectedClassID = x.id
            }


        }
        console.log("the value of selected class id " + this.selectedClassID)

        this.getperiod(this.selectedClassID, this.token, this.id)

    }

    getperiod(class_id: number, token: string, id: number) {
        this.classProvider
            .getAllRefTimes(class_id, token, id)
            .subscribe(res => {
                    this.classRefTimes = < ClassReferenceTime[] > res
                },
                err => {
                    this.errorToast();
                }
            );
    }

    change(x) {

        console.log("my id is" + x.id)
        this.Getstafflist(this.selectedClassID, x.id, this.token, this.id)

    }

    Getstafflist(class_id: number, period_id: number, token: string, id: number) {

        this.timetableProvider
            .getstaff_list(class_id, period_id, token, id)
            .subscribe(res => {
                    this.time_table_notification_date_day = < TimeTable[] > res
                },
                err => {
                    this.errorToast()
                });
    }

    successToastreturn() {

        let toast = this.toastController.create({
            message: "Timetable updated",
            duration: 1000,
            position: 'middle'
        });
        toast.present();
    }

    errorToast() {
        let toast = this.toastController.create({
            message: "Record not loaded",
            duration: 1000,
            position: 'middle'
        });
        toast.present();

    }

}