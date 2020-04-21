import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Platform, ViewController } from 'ionic-angular';
import { AgmMap } from '@agm/core';
import { GuardadosPage } from '../../pages/index.paginas'

@Component({
  selector: 'page-mapa',
  templateUrl: 'mapa.html',
})
export class MapaPage {
  @ViewChild('agmMap') agmMap : AgmMap

  lat: number;
  lng: number;
  height = 0;
  
  constructor(public platform: Platform, 
              public viewCtrl: ViewController, 
              public navCtrl:NavController,
              public navParams:NavParams) {
    this.height = platform.height() - 56;
    let locacion = this.navParams.get('coordenadas')
    locacion = locacion.split('/@')[1];
    locacion = locacion.slice(0,24)
    this.lat = Number(locacion.split(',')[0]);
    this.lng = Number(locacion.split(',')[1]);
  }
  
  cerrarModal() {
  	this.viewCtrl.dismiss();
  }
}
