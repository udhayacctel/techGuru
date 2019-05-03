import { Component} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Home } from '../home/home';
import { GlobalVars } from '../../providers/global-provider';
import { ToastController } from 'ionic-angular';
import { ParentMeetProvider } from '../../providers/parentmeet';
import { Parentmeet } from '../../models/parentMeet';
import { ParentMeet_View2 } from '../../pages/parentmeet_view2/parentmeet_view2';
import { LoadingController,ModalController } from 'ionic-angular';	
import { PopoverPage } from '../../pages/popover/popover'
import { PopoverController } from 'ionic-angular';


@Component({
    selector: 'parent-meet-view',
    templateUrl: 'parentmeet_view.html'
})
export class ParentMeet_View {

    parm_school_id: any;
    parm_standard: any;
    parm_section: any;
    parm_record: any;
    parm_date: any;
    roll_no: any;
    parm_roll_no: any;
    parm_student_id: any;
    parentmeeting: Parentmeet[];
    selected_student_message: any;
    date: any;
    teacher_message: any;
    loader: any;
    token:string;
    parm_class_id:number;
    class_id:number;
    id:number;

    constructor(public loadingController: LoadingController, public navCtrl: NavController, public globalVars: GlobalVars, public navParams: NavParams,

        public toastController: ToastController,
        public parentprovider: ParentMeetProvider, public modalctrl: ModalController, public popoverCtrl: PopoverController) {
        
        this.parm_class_id = navParams.get('parm_class_id')
        this.parm_standard = navParams.get('parm_standard');
        this.parm_section = navParams.get('parm_section');
        this.class_id = this.globalVars.getMyGlobalClass_id(this.parm_standard, this.parm_section),
        this.parm_school_id = navParams.get('parm_school_id');
        this.parm_record = navParams.get('parm_record');
        this.parm_roll_no = navParams.get('roll_no');
        this.parm_student_id = navParams.get('parm_student_id');
        this.loading()
        this.token   = this.globalVars.getMyGlobalToken();
        this.id = this.globalVars.getMyGlobalUserId();
        console.log("class_id" + this.parm_class_id)
        console.log("class_id" + this.class_id)
        this.fetchmessage(this.parm_student_id, this.class_id, this.token, this.id)

    }

    loading() {
        this.loader = this.loadingController.create({
            content: "Please wait"
        });
        this.loader.present();
    }
    fetchmessage(parm_student_id: number,class_id:number, token:string, id:number) {
        console.log("my roll" + this.parm_student_id)
        this.parentprovider
            .getmessage(this.parm_student_id, class_id, token, id)
            .subscribe(res => {
                    this.parentmeeting = < Parentmeet[] > res, this.check(), this.loader.dismiss()
                },
                err => {
                    this.errorToast("Record not loaded", "middle"), this.loader.dismiss()
                });
    }

    check() {
        for (let x of this.parentmeeting) {
            this.roll_no = x.student_id
            this.selected_student_message = x.student_message
            this.teacher_message = x.teacher_message
            console.log(" my message" + this.roll_no + this.selected_student_message + this.teacher_message)
        }
    }


    view(n) {

        if (!n.expand) {
            n.expand = true;
        } else {
            n.expand = false;
        }
    }


    errorToast(message: string, pos: string) {

        let toast = this.toastController.create({
            message: message,
            duration: 1000,
            position: pos
        });
        toast.present();
    }

    showrow(n) {

        let modal = this.modalctrl.create(ParentMeet_View2, {
            parm_date: n.date,
            parm_teacher_message: n.teacher_message,
            parm_student_message: n.student_message
        });
        console.log("Hi am coming" + this.parm_date);
        modal.onDidDismiss(data => {});
        modal.present();

    }

    home() {

        this.navCtrl.push(Home);
        this.navCtrl.setRoot(Home);

    }

    presentPopover(myEvent) {

        let popover = this.popoverCtrl.create(PopoverPage, {

        });

        popover.present({

            ev: myEvent

        });

    }
}