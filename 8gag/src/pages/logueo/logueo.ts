import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-logueo',
  templateUrl: 'logueo.html',
})
export class LogueoPage {
	mensaje:boolean = false;
	loading:any = '';
	constructor(public navCtrl: NavController, 
				public navParams: NavParams,
				public alertCtrl: AlertController,
            	public loadingCtrl: LoadingController) {
	}

	ingresar() {

	    this.alertCtrl.create({
	      title: 'Ingrese la clave',
	      inputs: [{
	        name: 'clave',
	        placeholder: 'clave'
	      }],
	      buttons: [{
	        text: 'Cancelar',
	        role: 'cancel'
	      },{
	        text: 'Ingresar',
	        handler: data => {
	          this.verificarUsuario( data.clave )
	        }
	      }]
	    }).present();

		setTimeout (()=>{
			 this.loading.dismiss();
		}, 6000);
    	
	    
	}


	verificarUsuario( clave: string ) {

		this.loading = this.loadingCtrl.create({
		  content: 'Verificando...'
		});

		this.loading.present();
		this.navCtrl.setRoot(HomePage)
		this.mensaje = true;

	}



	ionViewCanEnter(){ //FUNCION QUE PERMITE INGRESAR A ESTE COMPONENTE
		console.log('Espere 3 segundos para entrar')
		let promesa = new Promise ((resolve, reject)=>{
			setTimeout (()=>{
				resolve(true)
			}, 3000);
		})

		return promesa

	}
	ionViewCanLeave(){  //FUNCION QUE PERMITE IRSE DE ESTE COMPONENTE
		console.log('Espere 3 segundos para salir')
		let promesa = new Promise ((resolve, reject)=>{
			setTimeout (()=>{
				resolve(true)
			}, 3000);
		})

		return promesa
	}

}
