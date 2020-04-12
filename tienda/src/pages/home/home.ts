import { URL_IMAGENES } from "../../config/url.servicios"
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ProductosProvider } from '../../providers/productos/productos';
import { CarritoProvider } from '../../providers/carrito/carrito';
import { ProductoPage } from "../producto/producto"

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	rutaImg:any = URL_IMAGENES;
	productoPage = ProductoPage;
	constructor(public navCtrl: NavController, public _prod:ProductosProvider, public _carr:CarritoProvider) {
		this._prod.cargarTodos()
	}

	siguientePagina(infiniteScroll){
		this._prod.cargarTodos()
			.then(()=>{
				infiniteScroll.complete();
			})
	}


}
