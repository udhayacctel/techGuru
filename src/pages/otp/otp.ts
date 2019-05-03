import { Component,ViewChild,OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { OTPLogin } from '../../models/otpLogin';
import { User } from '../../models/user';
import { GlobalVars } from '../../providers/global-provider';
import { Master } from '../../models/master';
import { Observable } from 'rxjs/Rx';
import { TimerObservable } from "rxjs/observable/TimerObservable";
import { LoginProvider } from '../../providers/login-provider';
import { Menu } from '../menu/menu';
import { Storage } from '@ionic/storage';
import { Login } from '../../pages/login/login';


@Component({
    selector: 'page-otp',
    templateUrl: 'otp.html',
})

export class OTP{
    tick:any;
    parm_login_key:string;
    user:User;
    otpNo: string;
    master: Master[]



 constructor(public navCtrl: NavController, public navParams: NavParams,
             public loginProvider: LoginProvider, public globalVars: GlobalVars,
             private storage: Storage) {

     this.parm_login_key = navParams.get('parm_mobile')
     
        let timer= Observable.timer(0, 1000)
        .map(value =>  30- value)
        .takeWhile(value => value >= 0)
        .subscribe(t => this.tick = t) 
        
 }

Resend(){

    this.Submit()
}

 Cancel(){

     this.navCtrl.push(Login)
 }

Submit() {

     
        let obj : OTPLogin;
        obj = new OTPLogin();
        obj.mobile = this.parm_login_key; //'98401234';
        obj.otp = this.otpNo;  //' 9476';
        console.log('in here:');
        
        this.storage.get('user').then((val) => {
            let u: User = val;
            if (u == null)
            {
                this.loginProvider
                .loginWithOTP(obj)
                .subscribe(res => {
                        //var tempLogin = < Master[] > res;
                        var tempLogin = < User > res;
                        console.log('--SUCCESS CALL---');
                        console.log(tempLogin);
                        this.user = tempLogin;
        
            //            this.master = this.convertUserToMaster(this.user);
             //           this.globalVars.setMyGlobalMaster(this.master);
        
                        console.log('storing token');
                        this.storage.set('user', this.user)
                        .then((v) => {
                            console.log('token we just set:' + this.user.user_token)
                            /*this.storage.get('user').then((val) => {
                                let u: User = val;
                                console.log('Your token is in store:' + u.user_token);
                              });*/
                            this.navCtrl.push(Menu);
                        
                        })
                    },
                    
                    err => {
                        console.log("Login failed")
                });
            }
            else
            {
            //    this.user = val;
            //    this.master = this.convertUserToMaster(this.user);
            //    this.globalVars.setMyGlobalMaster(this.master);
                this.navCtrl.push(Menu);
            }
        });


}
/*
  convertUserToMaster(userParm: User)
    {
        //Convert the User object to Master object
        //this.master = new Array<Master>();
        let tempMaster = new Array<Master>();
        var current_user_id = userParm.id;
        var current_user_name = userParm.name;
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
                            m.student_class_id = cl.class_id;
                            m.student_standard = cl.standard;
                            m.student_section = cl.section;
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
                    m.class_id = cl.class_id;
                    m.teacher_standard = cl.standard;
                    m.teacher_section = cl.section;
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
                    m.student_class_id = cl.class_id;
                    m.student_standard = cl.standard;
                    m.student_section = cl.section;
                    tempMaster.push(m);
                }
            );
        }
        return tempMaster;
     }

*/
}
