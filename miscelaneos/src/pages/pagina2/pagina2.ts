import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-pagina2',
  templateUrl: 'pagina2.html',
})
export class Pagina2Page {

	constructor(public navCtrl: NavController, public navParams: NavParams) {
	}

	irPagina3() {
		this.navCtrl.push('miPagina3') //es otra forma de redireccionar SIN usar el app.module (no está importado el Pagina3Page)
	}

	ionViewDidLoad(){
		console.log('ionViewDidLoad')
	}
	ionViewWillEnter(){
		console.log('ionViewWillEnter')
	}
	ionViewDidEnter(){
		console.log('ionViewDidEnter')
	}
	ionViewWillLeave(){
		console.log('ionViewWillLeave')
	}
	ionViewDidLeave(){
		console.log('ionViewDidLeave')
	}
	ionViewWillUnload(){
		console.log('ionViewWillUnload')
	}
	ionViewCanEnter(){ //FUNCION QUE PERMITE INGRESAR A ESTE COMPONENTE
		console.log('ionViewCanEnter')
		console.log('Espere 2 segundos para entrar')

		let promesa = new Promise ((resolve, reject)=>{
			setTimeout (()=>{
				resolve(true)
			}, 2000);
		})

		return promesa

	}
	ionViewCanLeave(){  //FUNCION QUE PERMITE IRSE DE ESTE COMPONENTE
		console.log('ionViewCanLeave')
		console.log('Espere 2 segundos para salir')

		let promesa = new Promise ((resolve, reject)=>{
			setTimeout (()=>{
				resolve(true)
			}, 2100);
		})

		return promesa
	}
}
