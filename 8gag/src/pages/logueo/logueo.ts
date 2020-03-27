import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';


@IonicPage()
@Component({
  selector: 'page-logueo',
  templateUrl: 'logueo.html',
})
export class LogueoPage {
	mensaje:boolean = false;

	constructor(public navCtrl: NavController, public navParams: NavParams) {
	}

	ingresar() {
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
