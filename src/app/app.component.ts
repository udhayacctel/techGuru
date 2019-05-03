import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav, } from 'ionic-angular';
import { Login } from '../pages/login/login';
import { Home } from '../pages/home/home';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { Menu } from '../pages/menu/menu';

@Component({
  selector:'page-main',
  templateUrl: 'app.html'
})

export class MyApp {

  @ViewChild(Nav) nav: Nav;


  rootPage: any = Login;


constructor(
    public _platform: Platform,
    public menu: MenuController,
    private splashscreen: SplashScreen,
    private storage: Storage  
  ) {
    
    storage.get('user').then((val) => {
      
      if (val == null || val.user_token == null || val.user_token.length == 0)
   {
          this.rootPage = Login;
          console.log('TOKEN ISSUE ERROR');
    }
    else
      {
           this.rootPage = Menu;
      
      }
  }); 
     this.initializeApp();    
     
    }
  
  initializeApp() {
    this._platform.ready().then(() => {
    
      this.splashscreen.hide();
    
          this._platform.registerBackButtonAction(() => {
   
               let view = this.nav.getActive();
               if(view.component.name=="Home"){
                    //Double check to exit app                        
              }else{
                   // go to previous page
                this.nav.pop({});
            }
  });
    
    });      
  }
}
