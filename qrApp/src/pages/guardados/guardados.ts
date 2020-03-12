import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HistorialService } from '../../providers/historial/historial';
import { ScanData } from '../../models/scan-data.model';

/**
 * Generated class for the GuardadosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-guardados',
  templateUrl: 'guardados.html',
})
export class GuardadosPage {

  historial:ScanData[] = []

  constructor(private _historialService:HistorialService){}

  ionViewDidLoad(){
  	this.historial = this._historialService.cargarHistorial()
  }

  abrirScan(index:number) {
  	this._historialService.abrirScan(index)
  }
}
