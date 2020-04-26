import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CarritoProvider } from '../../providers/carrito/carrito';
import { PorCategoriasPage } from '../index.paginas';
import { URL_IMAGENES } from "../../config/url.servicios"
import { ProductoPage,OrdenesPage } from '../index.paginas';

@Component({
  selector: 'page-ordenes-detalle',
  templateUrl: 'ordenes-detalle.html',
})
export class OrdenesDetallePage {

	ordenDetalle:any;
	rutaImg:any = URL_IMAGENES;
	productoPage = ProductoPage;
	constructor(public navCtrl: NavController, public navParams: NavParams, public _carr:CarritoProvider) {
		this.ordenDetalle = this.navParams.get('productos');
	}

	borrarPedido(ordenId:any){
		this._carr.borrarPedido(ordenId).then(()=>{
			this.navCtrl.setRoot(OrdenesPage)
		})
	}
}
