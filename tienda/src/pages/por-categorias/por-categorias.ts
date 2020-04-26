import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductosProvider } from '../../providers/productos/productos';
import { URL_IMAGENES } from "../../config/url.servicios"
import { ProductoPage } from "../producto/producto"

@Component({
  selector: 'page-por-categorias',
  templateUrl: 'por-categorias.html',
})
export class PorCategoriasPage {

	rutaImg:any = URL_IMAGENES;
	productoPage = ProductoPage;
  	categoria:any = {};

	constructor(public navCtrl: NavController, public navParams: NavParams, public _prod:ProductosProvider) {
		this.categoria = this.navParams.get('categoria');
		this._prod.mostrarPorCategoria(this.categoria.id)

	}

	siguientePagina(infiniteScroll){
		console.log('arrnca')
		this._prod.mostrarPorCategoria(this.categoria.id)
			.then(()=>{
				infiniteScroll.complete();
			})
	}

}
