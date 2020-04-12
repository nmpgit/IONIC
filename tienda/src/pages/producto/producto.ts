import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { URL_IMAGENES } from "../../config/url.servicios"
import { CarritoProvider } from '../../providers/carrito/carrito';


@Component({
  selector: 'page-producto',
  templateUrl: 'producto.html',
})
export class ProductoPage {

	producto:string = '';
	rutaImg:any = URL_IMAGENES;

	constructor(public navCtrl: NavController, public navParams: NavParams, public _carritoService:CarritoProvider) {
		this.producto = this.navParams.get('producto');

	}






}
