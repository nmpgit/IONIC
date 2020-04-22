import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';


@Component({
  selector: 'page-splash',
  templateUrl: 'splash.html',
})
export class SplashPage {

  constructor(public viewCtrl: ViewController,  public navParams: NavParams, public splashScreen: SplashScreen) {
  }

  ionViewDidEnter() {

//    this.splashScreen.hide();

    setTimeout(() => {
      this.viewCtrl.dismiss();
    }, 5000);

  }

}
