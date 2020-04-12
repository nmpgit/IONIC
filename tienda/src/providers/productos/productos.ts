import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from "../../config/url.servicios"

@Injectable()
export class ProductosProvider{

	pagina:number = 0;
	paginado:number = 0;
	productos:any[] = [];
	categorias:any[] = [];
	porCategoria:any[] = [];
	constructor(private _http: HttpClient) {
		this.cargarTodos();
	}

	cargarCategorias(){
		let url = URL_SERVICIOS + "/lineas"
			this._http.get(url)
			.map(resp => resp)
			.subscribe(data => {
				if (data.error) {
				} else {
					this.categorias.push( ...data.lineas);
				}	
			})
	}

	cargarTodos(){
		let promesa = new Promise ((resolve, reject)=>{
			let url = URL_SERVICIOS + "/productos/obtenerTodos/" + this.pagina
			this._http.get(url)
			.map(resp => resp)
			.subscribe(data => {
				if (data.error) {

				} else {
					this.productos.push( ...data.productos);
					this.pagina +=1;
				}
				resolve();
			})
	                
		})
		return promesa;
	}

	mostrarPorCategoria(categoria:string){
		this.porCategoria = [];
		let url = URL_SERVICIOS + "/productos/obtenerPorTipo/" + categoria + '/' + this.paginado
			this._http.get(url)
			.map(resp => resp)
			.subscribe(data => {
				console.log(data)
				if (data.error) {

				} else {
					this.porCategoria.push( ...data.productos);
				}
			})
	}
}
