import { Component, Attribute} from '@angular/core';
import { NavController, AlertController, NavParams } from 'ionic-angular';
import { ClassProvider } from '../../providers/class-provider';
import { School_class_year } from '../../models/school_class_year';
import { ClassReferenceTime } from '../../models/classReferenceTime';
import { LoadingController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { Home } from '../../pages/home/home';
import { GlobalVars } from '../../providers/global-provider';
import { PopoverPage } from '../../pages/popover/popover';
import { PopoverController } from 'ionic-angular';
import { Observable } from 'rxjs/Rx';
import { FormatTimePipe } from '../formatTime.pipe';
import { Subscription } from "rxjs";
import { TimerObservable } from "rxjs/observable/TimerObservable";


@Component({
    selector: 'period-page',
    templateUrl: 'period.html',
    providers: [ClassProvider]


})
export class Period {
    a: any;
    b: any;
    c: any;
    d: any;
    start_time: string;
    end_time: string;
    attendance: boolean
    classRefTimes: ClassReferenceTime[];
    classProvider: ClassProvider;
    toastCtr: ToastController;
    selectedClassID: number;
    loader: any;
    class_id: number;
    period: ClassReferenceTime = new ClassReferenceTime();
    period_add: ClassReferenceTime[];
    standard: School_class_year[];
    school_id: any
    selected_standard: any;
    class_id_all: number[];
    token:string;
    id:number;
   private date;
   private format;
   countDown;
  counter = 10 //30*60;
  tick = 1000;
      private subscription: Subscription;

  
    constructor(public navCtrl: NavController, navParams: NavParams, classProvider: ClassProvider,
        public alertCtrl: AlertController, public globalVars: GlobalVars, public loadingController: LoadingController,
        toastCtrl: ToastController, public toastController: ToastController, public popoverCtrl: PopoverController, 
        @Attribute("format") format) {

        this.period_add = new Array < ClassReferenceTime > ();
        this.standard = this.globalVars.getMyGlobalclass()
        this.school_id = this.globalVars.getMyGlobalschool()

        this.classProvider = classProvider;
        this.toastCtr = toastCtrl;
        this.attendance = true
        this.school_id = 1
        this.token   = this.globalVars.getMyGlobalToken();
        this.id = this.globalVars.getMyGlobalUserId();

           this.format = format;
        this.date =  new Date(); 
        setInterval(() => {
        this.date =  new Date();
     }, 1000);

     let twentyMinutesLater = new Date();
        twentyMinutesLater.setMinutes(twentyMinutesLater.getMinutes() + 20);
        console.log("My time" + this.date + twentyMinutesLater)

      /* let timer = TimerObservable.create(2000, 1000);
    this.subscription = timer.subscribe(t => {
      this.tick = t;
          
    });*/
       
        }


    ngOninit() {
        this.loading();
 
    }

    loading() {
        this.loader = this.loadingController.create({
            content: "Please wait"
        });
        this.loader.present();

    }

    save() {
    
     if ((this.selected_standard === undefined || this.selected_standard == null || this.selected_standard.length <= 0) ||
            (this.a === undefined || this.a== null || this.a.length <= 0) ||
            (this.b=== undefined || this.b == null || this.b.length <= 0) ||    
            (this.c === undefined || this.c== null || this.c.length <= 0) ||
            (this.d === undefined || this.d== null || this.d.length <= 0)) {
            
            let alert = this.alertCtrl.create({
                message: 'Please Fill all the Fields',
                buttons: [{
                    text: 'OK'
                }]
            });
            alert.present();

        } else {

        this.class_id_all = this.globalVars.getMyGlobalAllClass_id(this.selected_standard)

        let crt: ClassReferenceTime[] = new Array < ClassReferenceTime > ()

        for (let x of this.class_id_all) {

            let y: ClassReferenceTime = new ClassReferenceTime()

            y.class_id = x
            y.start_time = this.a
            y.end_time = this.b
            y.period_type = this.c
            y.description = this.d

            crt.push(y)
        }
                this.addperiod(this.selectedClassID, crt, this.token, this.id)
    }
    }


    resetForm() {

        this.a = ''
        this.b = ''
        this.c = ''
        this.d = ''
        this.attendance = true

    }

    addperiod(class_id: number, crt: ClassReferenceTime[], token:string, id:number) {
        this.classProvider
            .addRefTime(class_id, crt, token, id)
            .subscribe(res => {
                    this.successToastreturn('Record updated', 'middle'), this.loader.dismiss(), this.resetForm(), this.reload()
                },
                err => {
                    this.errorToast('Record not updated', 'middle');
                    this.loader.dismiss()
                }
            );
    }

    getperiod(class_id: number, token:string, id:number) {
        this.classProvider
            .getAllRefTimes(class_id, token, id)
            .subscribe(res => {
                    this.classRefTimes = < ClassReferenceTime[] > res, this.check(), this.loader.dismiss()
                },
                err => {
                    this.errorToast('Record not updated', 'middle');
                    this.loader.dismiss()
                }
            );
    }

    check() {
        for (let n of this.classRefTimes) {
            console.log("my id" + n.class_id)
        }
    }

    remove(class_id:number,period: ClassReferenceTime[], token:string, id:number) {
        this.classProvider
            .removeperiod(class_id,period, token, id)
            .subscribe(res => {
                    this.successToastreturn('Record deleted', 'middle'), this.loader.dismiss(), this.reload()
                },
                err => {
                    this.errorToast('Record not deleted', 'middle')
                });
    }
    reload() {

        this.getperiod(this.selectedClassID, this.token, this.id)
    }

    removeperiod(y) {

        let alert = this.alertCtrl.create({
            title: 'Period Delete',
            message: 'Do you really want to delete?',
            buttons: [{
                    text: 'Delete ',
                    handler: () => {
                        this.class_id_all = this.globalVars.getMyGlobalAllClass_id(this.selected_standard)
                        let crt: ClassReferenceTime[] = new Array < ClassReferenceTime > ()

                        for (let x of this.class_id_all) {
                            let z: ClassReferenceTime = new ClassReferenceTime()
                            z.class_id = x
                            z.period_type = y.period_type
                            z.start_time = y.start_time
                            z.end_time = y.end_time
                            z.description = y.description

                            crt.push(z)

                        }
                        this.remove(this.selectedClassID, crt, this.token, this.id)

                    }
                },
                {
                    text: 'cancel ',
                    handler: () => {
                        console.log("Delete cancel");

                    }
                }
            ]
        });
        alert.present();

    }

    home() {
        this.navCtrl.push(Home);
        this.navCtrl.setRoot(Home);
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


    updateTimes() {
        this.a = this.b;
    }

    class_period(y) {

        this.loading();

        for (let x of this.standard) {

            if (x.standard == this.selected_standard) {
                this.selectedClassID = x.id
            }


        }
        console.log("the value of selected class id " + this.selectedClassID)

        this.getperiod(this.selectedClassID, this.token, this.id)

    }

    presentPopover(myEvent) {

        let popover = this.popoverCtrl.create(PopoverPage, {

        });

        popover.present({

            ev: myEvent

        });

    }


}
