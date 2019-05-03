import { Component} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Home } from '../home/home';
import { ViewController} from 'ionic-angular';


@Component({

    templateUrl: 'dailydiary_view2.html',
    selector: 'dailydiary-view2'

})

export class DailyDiary_View2 {

    parm_title: any;
    parm_message: any;
    parm_subject: any
    parm_due_date: any

    constructor(public navCtrl: NavController, public viewCtrl: ViewController, public navParams: NavParams) {

        this.parm_title = this.navParams.get('parm_title');
        this.parm_message = this.navParams.get('parm_message');
        this.parm_subject = this.navParams.get('parm_subject');
        this.parm_due_date = this.navParams.get('parm_due_date');

    }

    /* *********************************************************************************************************************************
     *  Navigations of screens                                                                                                       ***    
     *************************************************************************************************************************************/
    home() {
        this.navCtrl.push(Home);

    }

    /* *********************************************************************************************************************************
     *  Dismiss the animation                                                                                                         ***    
     *************************************************************************************************************************************/
    dismiss() {
        this.viewCtrl.dismiss();
    }
}