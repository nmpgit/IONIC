import { HttpClientModule, HttpClient, HttpParams } from '@angular/common/http';
import { AlertController, ModalController, Platform } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { ProductosProvider } from '../../providers/productos/productos';
import 'rxjs/add/operator/map'
import { URL_SERVICIOS } from "../../config/url.servicios"
import { DatoInterface } from '../../interfaces/objeto.interface';


//pagina del modal
import { HomePage, OrdenesPage, LoginPage, CarritoPage } from '../../pages/index.paginas';


@Injectable()
export class CarritoProvider {

	items:any[] = [];
	pedidosExistentes:any;

	constructor(private _http: HttpClient, 
				private alertCtrl:AlertController,
				private platform:Platform,
				private _userv: UsuarioProvider,
				private _prod: ProductosProvider,
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
					subTitle: item.producto + ' ya existe en su carrito',
					buttons: ['OK']
				}).present();
				return
			}
		}

		this.items.push(item);
		this.guardarStorage()
		this.alertCtrl.create({
			title: 'Item agregado',
			subTitle: item.producto + ' se ha agregado a su carrito',
			buttons: ['OK']
		}).present();
	}

	loguearse(paginaRuta){
		let modal:any;
		if(this._userv.usuario) {
			//está logueado
			modal = this.modalCtrl.create(CarritoPage)
		} else {
			//no está logueado
			modal = this.modalCtrl.create(LoginPage)
		}
		modal.present();
		modal.onDidDismiss((seLogueo:boolean)=>{
			if (paginaRuta == 'HomePage') {
			//si es para iniciar sesion arranco de cero el contador
				this._prod.cargarTodos('inicioSesion')
			}
			if (seLogueo) {
				if (paginaRuta == 'OrdenesPage') {
						this.obtenerPedidos()
				}
			} else {
				this.pedidosExistentes = 'Error'
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



	removeItem(itemIndice) {
		this.items.splice(itemIndice, 1);
		this.guardarStorage();
	}


	realizarPedido() {
		let itemsEnviarArray = [];
		for (var i = 0; i < this.items.length; ++i) {
			itemsEnviarArray.push(this.items[i].codigo)
		}
		var itemsEnviarStr = itemsEnviarArray.join(',');
		let url = URL_SERVICIOS + '/pedidos/realizarPedido/' + this._userv.usuario;

		let peticion = this._http.post(url, {'items' : itemsEnviarStr})
			.map(resp => resp)
			.subscribe((data:DatoInterface)=> {
			if( data.error ){
				// mostramos error
				this.alertCtrl.create({
					title: "Error en la orden",
					subTitle: data.mensaje,
					buttons: ["OK"]
				}).present();
			}else{
			 // todo bien!
				this.items = [];
				this.guardarStorage()
				this.alertCtrl.create({
					title: "Orden realizada!",
					subTitle: "Nos contactaremos con usted próximamente",
					buttons: ["OK"]
					}).present();
				}
			})
	}

	obtenerPedidos() {
		if(this._userv.activo()) {		
			let url = URL_SERVICIOS + "/pedidos/obtenerPedidos/" + this._userv.usuario;
				this._http.get(url)
				.map(resp => resp)
				.subscribe((data:DatoInterface) => {
					if(data.error) {

					} else {
						this.pedidosExistentes = data.mensaje	
					}
				})
		} else {
			this.pedidosExistentes = 'Error'
		}

	}


	borrarPedido(nroPedido) {
		let promesa = new Promise ((resolve, reject)=>{
			let url = URL_SERVICIOS + "/pedidos/borrarPedido/" + this._userv.usuario + '/' + nroPedido;
			this._http.delete(url)
			.map(resp => resp)
			.subscribe((data:DatoInterface) => {
			 if( data.error ){
                 this.alertCtrl.create({
                   title: "No se pudo eliminar",
                   subTitle: data.mensaje,
                   buttons: ["OK"]
                 }).present();
               }else{
                this.alertCtrl.create({
                  title: "Orden eliminada!",
                  subTitle: "",
                  buttons: ["OK"]
                }).present();
	            resolve();
               }
			})
		})
				return promesa;

	}
}
