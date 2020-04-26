import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from "../../config/url.servicios"

@Injectable()
export class ProductosProvider{

	pagina:number = 0;
	paginado:number = 0;
	productos:any[] = [];
	resultadosBusqueda:any[] = [];
	categorias:any[] = [];
	porCategoria:any[] = [];
	constructor(private _http: HttpClient) {
		this.cargarTodos(false);
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

	cargarTodos(motivo:any){

		//si es para iniciar sesion arranco de cero el contador
		if (motivo == 'inicioSesion'){
			this.pagina = 0;
		}
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
		let promesa = new Promise ((resolve, reject)=>{

			let url = URL_SERVICIOS + "/productos/obtenerPorTipo/" + categoria + '/' + this.paginado
			console.log(url)
				this._http.get(url)
				.map(resp => resp)
				.subscribe(data => {
					console.log(data)
					if (data.error) {

					} else {
						this.porCategoria.push( ...data.productos);
						this.paginado +=1;

					}
				})
		})
		return promesa;
	}



	buscarProducto( termino:string ){
		let url = URL_SERVICIOS + "/productos/buscar/" + termino;
		this._http.get( url )
		        .subscribe( resp =>{

		          return this.resultadosBusqueda = resp.productos;
		        });
	}
}
