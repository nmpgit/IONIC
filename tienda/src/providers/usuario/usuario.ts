import 'rxjs/add/operator/map'
import { HttpClientModule, HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from "../../config/url.servicios"
import { AlertController, LoadingController } from 'ionic-angular';

@Injectable()
export class UsuarioProvider {

	token:string;
	usuario:string;

	constructor(private _http: HttpClient, private alertCtrl:AlertController,private loadingCtrl:LoadingController) {
	}

	ingresar(correo, password){
		let data = new HttpParams();
		data = data.append('correo', correo)
		data = data.append('contraseña', password)
		let url = URL_SERVICIOS + '/login';

		return this._http.post(url, data)
				.map(informacion =>{
					if (informacion.error) {
						this.alertCtrl.create({
							title: 'Error al iniciar',
							subtitle: informacion.mensaje,
							button: ['OK']
						}).present()
					} else {
						this.token = informacion.token
						this.usuario = informacion.id_usuario

					}
				})
	}


	verificarUsuario(  ) {

		this.loading = this.loadingCtrl.create({
		  content: 'Verificando...'
		});

		this.loading.present();

	}


}
