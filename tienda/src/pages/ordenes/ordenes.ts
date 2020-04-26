import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CarritoProvider } from '../../providers/carrito/carrito';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { OrdenesDetallePage } from '../index.paginas';

@Component({
  selector: 'page-ordenes',
  templateUrl: 'ordenes.html',
})
export class OrdenesPage {
	ordenesDetallePage = OrdenesDetallePage;
	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		public _carr:CarritoProvider,
		public _user:UsuarioProvider
		) {
		this._carr.obtenerPedidos()
	}

	isString(val) { return typeof val === 'string'; }

	ionViewWillEnter() {
		if (!this._user.activo()) {
			this._carr.pedidosExistentes = 'Error'
		} else {
			this._carr.obtenerPedidos()
		}
	}

}
