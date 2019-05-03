import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Select } from 'ionic-angular';
import { LoginProvider } from '../../providers/login-provider';
import { Master } from '../../models/master';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { GlobalVars } from '../../providers/global-provider';
import { Menu } from '../menu/menu';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { OTPLogin } from '../../models/otpLogin';
import { User } from '../../models/user';
import { OTP } from '../../pages/otp/otp';
import { Storage } from '@ionic/storage';

@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
    providers: [LoginProvider]
})
/* *********************************************************************************************************************************
 *  Login page 
 *  ---------- 
 *      Input:
 *          Mobile Number      
 *      Output           
 *         Login information data 
 *
 ************************************************************************************************************************************/
export class Login {

    loginForm: FormGroup
    master: Master[]
    loader: any;
    Spin: boolean;
    school_id: any;
    user: User;
    loginKey: string;
    mobile: string;

    @ViewChild('sectionSelect') sectionSelect: Select;

    constructor(public navCtrl: NavController, public formBuilder: FormBuilder,
        public loginProvider: LoginProvider,
        public globalVars: GlobalVars,
        public loadingController: LoadingController,
        private alertCtrl: AlertController,
        private storage: Storage) {

        this.loginForm = formBuilder.group({
            phNo: ['', Validators.compose([Validators.minLength(5), Validators.maxLength(10), Validators.pattern('[0-9]*')]), this.checkPhone.bind(this)]
        });

        storage.get('user').then((val) => {

            if (val == null || val.user_token == null || val.user_token.length == 0) {
                console.log('TOKEN ISSUE ERROR');
            }
            else {
                console.log('TOKEN Value' + val.user_token);
            }
        })
    }
    /* *********************************************************************************************************************************
     *  Check the Network
     *   If network is not available throw an error message                                                                            
     ************************************************************************************************************************************/
    /* *********************************************************************************************************************************
     *  Key section to validate the phone number for login
     *  Pass input as phone number    
     *  Output get the  login information for the app                                                                                
     ************************************************************************************************************************************/
    Submit() {

        //this.globalVars.setMyGlobalMaster(this.master)
        //this.navCtrl.push(Menu);
        this.navCtrl.push(OTP, {
            parm_mobile: this.loginKey
        })

    }

    /* *********************************************************************************************************************************
     *  Key section to validate the phone number for login
     *  Pass input as phone number    
     *  Output get the  login information for thme app                                                                                
     *****************************************dis*******************************************************************************************/
    checkPhone(control: FormControl): any {

        //        this.master = []

        let obj: OTPLogin;
        obj = new OTPLogin();
        this.loginKey = control.value
        obj.mobile = control.value

        if (obj.mobile.length >= 10) {
            this.Spin = true;
        }


        return new Observable(observer => {

            if (obj.mobile.length < 10 && obj.mobile.length != 0) {
                observer.next({
                    "Mobile Number in-correct": true
                })
                observer.complete()
                this.Spin = false;
            } else {
                this.loginProvider
                    .loginWithMobile(obj)
                    .subscribe(res => {
                        var tempLogin = <User>res;
                        console.log('thislogin.length:' + ":" + control.value);
                        if (tempLogin == null) {

                            observer.next({
                                "Records not in the database": true
                            })
                            observer.complete()
                            this.Spin = false;
                        } else {

                            console.log(" Else I am coming for the observer value");
                            this.user = tempLogin;
                            observer.next(null)
                            observer.complete()
                            this.Spin = false;
                        }
                    },
                        err => {
                            console.log("ERROR I am coming for the observer value")
                            observer.next({
                                "Records not updated": true
                            });
                            observer.complete()
                        })
            }
        });
    }




    dofilter() {
        this.sectionSelect.open()
    }


}