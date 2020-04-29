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
    let autor = document.getElementsByClassName('autor');
    let imag = document.getElementsByClassName('img');

    setTimeout(() => {
      this.navCtrl.setRoot(TabsPage);
    }, 3700);


    setTimeout(() => {
    (autor[0] as HTMLElement).style.visibility = 'visible';
    (autor[0] as HTMLElement).style.opacity = '1';
    (imag[0] as HTMLElement).style.visibility = 'visible';
    (imag[0] as HTMLElement).style.opacity = '1';

    }, 300);

    setTimeout(() => {
    (autor[0] as HTMLElement).style.visibility = 'hidden';
    (imag[0] as HTMLElement).style.visibility = 'hidden';
    (autor[0] as HTMLElement).style.opacity = '0';
    (imag[0] as HTMLElement).style.opacity = '0';

    }, 3500);
  }


}
