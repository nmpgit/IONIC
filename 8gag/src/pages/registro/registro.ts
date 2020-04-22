import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { LogueoPage } from '../logueo/logueo';

@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class RegistroPage {
	loading:any = '';
	constructor(public navCtrl: NavController, 
				public navParams: NavParams,
				public alertCtrl: AlertController,
            	public loadingCtrl: LoadingController) {
	}


	registrarse() {
		this.loading = this.loadingCtrl.create({
		  content: 'Validando...'
		});

		this.loading.present();


		setTimeout(()=>{
		  	this.loading.dismiss()
			this.navCtrl.setRoot(LogueoPage)

		}, 3000)
	}

}


