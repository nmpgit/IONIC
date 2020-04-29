import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../index.paginas'


@Component({
  selector: 'page-splash',
  templateUrl: 'splash.html',
})
export class SplashPage {

  constructor(public viewCtrl: ViewController, public navCtrl:NavController,  public navParams: NavParams, public splashScreen: SplashScreen) {
  }

  ionViewDidEnter() {
    let autor = document.getElementsByClassName('autor');

    setTimeout(() => {
      this.navCtrl.setRoot(HomePage);
    }, 5000);


    setTimeout(() => {
		(autor[0] as HTMLElement).style.visibility = 'visible';
		(autor[0] as HTMLElement).style.opacity = '1';

    }, 1500);

    setTimeout(() => {
		let imag = document.getElementsByClassName('img');
		(autor[0] as HTMLElement).style.visibility = 'hidden';
		(imag[0] as HTMLElement).style.visibility = 'hidden';
		(autor[0] as HTMLElement).style.opacity = '0';
		(imag[0] as HTMLElement).style.opacity = '0';

    }, 4000);
  }

}
