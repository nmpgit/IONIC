import 'rxjs/add/operator/map'
import { HttpClientModule, HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from "../../config/url.servicios"
import { AlertController, Platform, LoadingController } from 'ionic-angular';
import { HomePage } from '../../pages/index.paginas';
import { ProductosProvider } from '../../providers/productos/productos';

// Plugin storage
import { Storage } from '@ionic/storage';
@Injectable()
export class UsuarioProvider {

	usuario:string;
	loading:any = '';
	cargandoProductos:boolean = false;

	constructor(
		private _http: HttpClient, 
		private alertCtrl:AlertController,
		private loadingCtrl:LoadingController, 
		private platform:Platform,
		private _prod: ProductosProvider,

		) {
		
		this.cargarStorage()
	}

	ingresar(correo, password, quiereRegistrarse){
		if (quiereRegistrarse) {
			let url = URL_SERVICIOS + '/login/registrarse';
		} else {
			let url = URL_SERVICIOS + '/login/index';
		}
		let data = new HttpParams();
		data = data.append('correo', correo)
		data = data.append('contraseña', password)

		return this._http.post(url, data)
				.map(informacion =>{
					if (informacion.error) {
						this.alertCtrl.create({
							title: informacion.mensaje,
							subtitle: informacion.mensaje,
							buttons: ['OK']
						}).present()
					} else {
						this.usuario = informacion.id_usuario
						this.guardarStorage()
					}
				})
	}

	activo(){
		if(this.usuario){
		  return true;
		}else{
		  return false;
		}
	}
	
	guardarStorage(){
		if( this.platform.is("cordova") ){
		  // dispositivo
		  this.storage.set('usuario', this.usuario );
		}else{
		  // computadora
		  if(this.usuario){
		    localStorage.setItem("usuario",  this.usuario  );
		  }else{
		    localStorage.removeItem("usuario");
		  }
		}
	}

	cargarStorage(){
		let promesa = new Promise( ( resolve, reject )=>{
		  if( this.platform.is("cordova") ){
		    // dispositivo
		    this.storage.ready()
		            .then(()=>{
		              this.storage.get("usuario")
		                      .then( usuario =>{
		                        if( usuario ){
		                          this.usuario = usuario;
		                        }
		                    })
		              this.storage.get("usuario")
		                      .then( usuarioStorage =>{
		                        if( usuarioStorage ){
		                          this.usuario = usuarioStorage;
		                        }
		                        resolve();
		                    })
		          	})
		  }else{
		    // computadora
		    if( localStorage.getItem("usuario") ){
		      //Existe items en el localstorage
		      this.usuario = localStorage.getItem("usuario");
		    }
		    resolve();
		  }
		});
		return promesa;
	}

	cerrarSesion(){
			this.loading = this.loadingCtrl.create({
				  content: 'Cerrando Sesion...'
				});
				this.cargandoProductos = true;
				this.loading.present();
				//this.mensaje = true;

				setTimeout(()=>{
					this.loading.dismiss()

				    // guardar storage
		    		this.usuario = null;
				    this.guardarStorage();

				    //Para dar efecto de recarga de pagina.
					this._prod.cargarTodos(false)
					this.cargandoProductos = false;
				}, 2200)

	}


	


}
