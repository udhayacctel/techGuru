import { Component} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Home } from '../home/home';
import { ViewController } from 'ionic-angular';


@Component({

    templateUrl: 'parentmeet_view2.html',
    selector: 'parentmeet-view2'

})
export class ParentMeet_View2 {

    parm_date: any;
    parm_teacher_message: any;
    parm_student_message: any

    constructor(public navCtrl: NavController, public viewCtrl: ViewController, public navParams: NavParams) {
        console.log("if am coming")
        this.parm_date = this.navParams.get('parm_date');
        this.parm_teacher_message = this.navParams.get('parm_teacher_message');
        this.parm_student_message = this.navParams.get('parm_student_message');

    }

    home() {
        this.navCtrl.push(Home);
        this.navCtrl.setRoot(Home);
    }
    dismiss() {
        this.viewCtrl.dismiss();
    }

}