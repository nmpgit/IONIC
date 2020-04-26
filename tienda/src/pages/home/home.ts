import { URL_IMAGENES } from "../../config/url.servicios"
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ProductosProvider } from '../../providers/productos/productos';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { CarritoProvider } from '../../providers/carrito/carrito';
import { ProductoPage } from "../producto/producto"

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	rutaImg:any = URL_IMAGENES;
	productoPage = ProductoPage;
	constructor(public navCtrl: NavController, public _prod:ProductosProvider, public _carr:CarritoProvider, public _userv:UsuarioProvider) {
		this._prod.cargarTodos(false)
	}

	
	siguientePagina(infiniteScroll){
		this._prod.cargarTodos(false)
			.then(()=>{
				infiniteScroll.complete();
			})
	}

	iniciarSesion() {
		this._prod.productos = [];
		this._carr.loguearse('HomePage')
	}

	cerrarSesion() {
		this._userv.cerrarSesion()
	}
}
