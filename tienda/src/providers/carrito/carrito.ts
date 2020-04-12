import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AlertController, ModalController, Platform } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import 'rxjs/add/operator/map'


//pagina del modal
import { LoginPage, CarritoPage } from '../../pages/index.paginas';


@Injectable()
export class CarritoProvider {

	items:any[] = [];

	constructor(private _http: HttpClient, 
				private alertCtrl:AlertController,
				private platform:Platform,
				private _userv: UsuarioProvider,
				private modalCtrl:ModalController,
				private storage:Storage) {
		console.log('Hello CarritoProvider Provider');
		this.cargarStorage();
	}

	agregarCarrito(item:any) {
		for (var i = 0; i < this.items.length; ++i) {
			if(item == this.items[i]) {
				this.alertCtrl.create({
					title: 'Item existente',
					subtitle: item[i] + ' ya existe en su carrito',
					button: ['OK']
				}).present();
				return
			}
		}

		this.items.push(item);
		this.guardarStorage()
		this.alertCtrl.create({
			title: 'Item agregado',
			subtitle: item + ' se ha agregado a su carrito',
			button: ['OK']
		}).present();
	}

	verCarrito() {
		let modal:any;
		if(this._userv.token) {
			//está logueado
			modal = this.modalCtrl.create(CarritoPage)
		} else {
			//no está logueado
			modal = this.modalCtrl.create(LoginPage)
		}
		modal.present();

		modal.onDidDismiss((abrirCarrito:boolean)=>{
			if (abrirCarrito) {
				this.modalCtrl.create(CarritoPage)
			}
		})

	}



	cargarStorage(){
		let promesa = new Promise ((resolve, reject) => {
			if (this.platform.is('cordova')) {  
				// Dispositivo
				 this.storage.ready().then(() => {
				 	this.storage.get('items').then((informacionStorage)=>{
	                    if( informacionStorage ){
	                      this.items = informacionStorage;
	                    }
	                    resolve();
				 	});
				 })
			} else {
				//Escritorio
				if (localStorage.getItem('items')) {
					this.items = JSON.parse(localStorage.getItem('items'))
				}
				resolve()
			}
		});
		return promesa
	}

	guardarStorage(){
		if (this.platform.is('cordova')) {  
			// Dispositivo
			this.storage.set('items', this.items)
		} else {
			//Escritorio
			localStorage.setItem('items', JSON.stringify(this.items))
		}
	}
}
