import { ViewChild,Component} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Dailyworks } from '../../models/dailyworks';
import { ToastController } from 'ionic-angular';
import { DailyDiaryProvider } from '../../providers/dailydiary-provider';
import { Select } from 'ionic-angular';
import { GlobalVars } from '../../providers/global-provider';


@Component({
    templateUrl: 'dailydiary_report.html',
    selector: 'dailydiary-report'
})

export class DailyDiary_Report {

    workupdates: Dailyworks[];
    wrk_screen: Dailyworks[];
    wrks_screen: Dailyworks;
    parm_class_id: number;
    parm_id: any;
    status: string[] = ["Done", "UnDone"]
    selected_status: string[] = ["Done", "UnDone"]
    class_diary_id: number;
    token:string;
    id:number;
    teacher_post:any;
    coordinator_update:boolean;

    @ViewChild('statusSelect') statusSelect: Select;

    constructor(public navCtrl: NavController, public navParams: NavParams,
        public diaryProvider: DailyDiaryProvider,
        public toastController: ToastController,public globalVars: GlobalVars,
    ) {

        this.parm_class_id = this.navParams.get('parm_class_id');
        this.class_diary_id = this.navParams.get('parm_id');
        this.token   = this.globalVars.getMyGlobalToken();
        this.id = this.globalVars.getMyGlobalUserId();
        
        this.workdone(this.class_diary_id, this.parm_class_id, this.token, this.id)
        
        this.wrk_screen = new Array < Dailyworks >();
    }


    workdone(class_diary_id: number, class_id:number, token:string, id:number) {

        this.diaryProvider
            .getworks(class_diary_id, class_id,token, id)
            .subscribe(res => {
                    this.workupdates = < Dailyworks[] > res, (this.wrk_screen = this.workupdates)
                },
                err => {
                    this.errorToast("Records not loaded", "middle")
                });

    }
    /* *********************************************************************************************************************************
     *  Toast Messages and Loading icon for the screen                                                                                                 ***    
     *************************************************************************************************************************************/

    errorToast(msg: string, pos: string) {
        let toast = this.toastController.create({
            message: msg,
            duration: 1000,
            position: pos
        });
        toast.present();
    }

    successToastreturn(msg: string, pos: string) {
        let toast = this.toastController.create({
            message: msg,
            duration: 1000,
            position: pos
        });
        toast.present();
    }

    doFilter() {

        this.statusSelect.open();

    }

    teacher(class_diary_id:number, work: Dailyworks[], token:string, id:number)

    {
        this.diaryProvider
            .updateteacherstatus(class_diary_id, work, token, id)
            .subscribe(res => { this.successToastreturn('Record updated', 'middle')
                },
                err => {
                    this.errorToast("Record not updated", "middle")
                });
    }

    co_ordinator(class_diary_id:number, work: Dailyworks, token:string, id:number)

    {
        this.diaryProvider
            .updatecoordinator(class_diary_id, work, token, id)
            .subscribe(res => { this.successToastreturn('Record updated', 'middle')
                },
                err => {
                    this.errorToast("Record not updated", "middle")
                });
    }


    submit(){

        let update_status: Dailyworks[] = new Array < Dailyworks > ();

        for (let n of this.wrk_screen) {

            let s_attnd: Dailyworks = new Dailyworks();
            
            s_attnd.teacher_status = n.teacher_status
            s_attnd.student_id = n.student_id
            s_attnd.class_diary_id = this.class_diary_id
            
            update_status.push(s_attnd)

             console.log("teacher status" + n.teacher_status + n.student_id + s_attnd.teacher_status + 
                                            s_attnd.student_id + s_attnd.class_diary_id)

        }

        this.teacher(this.class_diary_id, update_status, this.token, this.id)

    }

    save(){

            
            let co_ordinator: Dailyworks = new Dailyworks();

            co_ordinator.coordinator_update = this.coordinator_update

         this.co_ordinator(this.class_diary_id, co_ordinator,this.token, this.id)

    }

    applyFilter() {

        if (this.selected_status.length == 1) {
            let x = this.selected_status[0]

            if (x == "UnDone") {
                this.wrk_screen = this.workupdates.filter(w_update => w_update.status != "Done")
            } else {
                this.wrk_screen = this.workupdates.filter(w_update => w_update.status === x)
            }
        } else if (this.selected_status.length > 1) {
            this.wrk_screen = this.workupdates
        } else {
            this.wrk_screen = [];
        }

    }

}