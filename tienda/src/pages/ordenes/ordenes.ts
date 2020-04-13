import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CarritoProvider } from '../../providers/carrito/carrito';
import { OrdenesDetallePage } from '../index.paginas';

@Component({
  selector: 'page-ordenes',
  templateUrl: 'ordenes.html',
})
export class OrdenesPage {
	ordenesDetallePage = OrdenesDetallePage;
	constructor(public navCtrl: NavController, public navParams: NavParams, public _carr:CarritoProvider) {
		this._carr.obtenerPedidos()
	}

	isString(val) { return typeof val === 'string'; }

}
