import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ScanData } from '../../models/scan-data.model';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';


/*
  Generated class for the HistorialService provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HistorialService {

	private _historial:any[] = [];
	
	constructor(public http: HttpClient, private iab:InAppBrowser) {}

	agregarHistorial(texto:string){
		let data = new ScanData(texto);
		this._historial.unshift(data)
		console.log(this._historial)
		this.abrirScan(0);

	}

	abrirScan(index:number){ //abro la posicion de los scaneos que quiera
		let scandata = this._historial[index]
		console.log(scandata);

		switch (scandata.tipo) {
			case "http":
				this.iab.create(scandata.info, '_system')
				break;
			
			default:
				console.error('tipo no soportado')
				break;
		}
	}
	cargarHistorial(){
		return this._historial
	}
}
