import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HistorialService } from '../../providers/historial/historial';
import { ScanData } from '../../models/scan-data.model';


@Component({
  selector: 'page-guardados',
  templateUrl: 'guardados.html',
})
export class GuardadosPage {

  historial:ScanData[] = []
  datos:any = '';
  mostrarDatos:any[] = [];
  constructor(private _historialService:HistorialService){
    
  }

  ionViewDidLoad(){
  	this.historial = this._historialService.cargarHistorial()

  }

  abrirScan(index:number) {
  	this._historialService.abrirScan(index)
  }
}
