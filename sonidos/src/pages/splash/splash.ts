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

    setTimeout(() => {
      this.navCtrl.setRoot(HomePage);
    }, 5000);


    setTimeout(() => {
		let autor = document.getElementsByClassName('autor');
		console.log(autor[0])
		autor[0].style.visibility = 'visible';
		autor[0].style.opacity = 1;

    }, 1500);

    setTimeout(() => {
		let autor = document.getElementsByClassName('autor');
		let imag = document.getElementsByClassName('img');
		autor[0].style.visibility = 'hidden';
		imag[0].style.visibility = 'hidden';
		autor[0].style.opacity = 0;
		imag[0].style.opacity = 0;

    }, 4000);
  }

}
