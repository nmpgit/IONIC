import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../index.paginas'


@Component({
  selector: 'page-splash',
  templateUrl: 'splash.html',
})
export class SplashPage {

  constructor(public viewCtrl: ViewController, public navCtrl:NavController,  public navParams: NavParams, public splashScreen: SplashScreen) {
  }

  ionViewDidEnter() {

    setTimeout(() => {
      this.navCtrl.setRoot(TabsPage);
    }, 4500);

/*
    setTimeout(() => {
		let autor = document.getElementsByClassName('autor');
		autor[0].style.visibility = 'visible';
		autor[0].style.opacity = 1;

    }, 500);

    setTimeout(() => {
		let autor = document.getElementsByClassName('autor');
		let imag = document.getElementsByClassName('img');
		autor[0].style.visibility = 'hidden';
		imag[0].style.visibility = 'hidden';
		autor[0].style.opacity = 0;
		imag[0].style.opacity = 0;

    }, 4500);
*/
  }

}
