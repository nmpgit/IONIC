import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Platform } from 'ionic-angular';

@Injectable()
export class AjustesService {

	ajustes = {
		mostrarTutorial : true
	}
	constructor(private platform:Platform,
				private storage:Storage) {
	}

	cargarStorage(){

		let promesa = new Promise ((resolve, reject) => {
			if (this.platform.is('cordova')) {  
				// Dispositivo
				 this.storage.ready().then(() => {
				 	this.storage.get('ajustes').then((informacionStorage)=>{
				 		this.ajustes = informacionStorage;
				 		resolve();
				 	});
				 })
			} else {
				//Escritorio
				if (localStorage.getItem('ajustes')) {
					this.ajustes = JSON.parse(localStorage.getItem('ajustes'))
				}

				resolve()
			}
		})


		return promesa
	}

	guardarStorage(){
		if (this.platform.is('cordova')) {  
			// Dispositivo
			console.log('Iniciando storage')
			this.storage.ready().then(() => {
				this.storage.set('ajustes', this.ajustes)
				console.log('grabó bien en el storage')
			});
		} else {
			//Escritorio
			localStorage.setItem('ajustes', JSON.stringify(this.ajustes))
		}
	}
}
