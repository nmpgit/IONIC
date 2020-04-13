import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { CarritoProvider } from "../../providers/carrito/carrito";
import { URL_IMAGENES } from "../../config/url.servicios"

@Component({
  selector: 'page-carrito',
  templateUrl: 'carrito.html',
})
export class CarritoPage {
	
	rutaImg:any = URL_IMAGENES;
	constructor(public navCtrl: NavController,
	          public navParams: NavParams,
	          private _carr:CarritoProvider,
	          private viewCtrl:ViewController ) {
	}



}
