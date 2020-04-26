import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductosProvider } from '../../providers/productos/productos';
import { PorCategoriasPage } from '../index.paginas';


@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {

	porCategorias = PorCategoriasPage;
	constructor(public navCtrl: NavController, public navParams: NavParams, public _prod:ProductosProvider) {
		this._prod.cargarCategorias()
	}



}
