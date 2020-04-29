import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AjustesProvider } from '../../providers/ajustes/ajustes'
import { LogueoPage } from '../../pages/logueo/logueo';
import { IntroduccionPage } from '../../pages/introduccion/introduccion';
import { CargaArchivoProvider } from '../../providers/carga-archivo/carga-archivo';

@Component({
  selector: 'page-splash',
  templateUrl: 'splash.html',
})
export class SplashPage {

	constructor(public navCtrl: NavController, public _cap: CargaArchivoProvider, public navParams: NavParams,  private _ajustes:AjustesProvider) {
		this._ajustes.cargarStorage();
		
	}

	ionViewDidEnter() {
		this._cap.cargarImagenesHome();


		let autor = document.getElementsByClassName('autor');
		let imag = document.getElementsByClassName('img');

		setTimeout(() => {
			if( this._ajustes.ajustes.mostrarTutorial ){
	            this.navCtrl.setRoot(IntroduccionPage);
	        }else{
	        	this.navCtrl.setRoot(LogueoPage);
	        }
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
