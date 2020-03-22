import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Platform, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-mapa',
  templateUrl: 'mapa.html',
})
export class MapaPage {
  title: string = 'My first AGM project';
  lat: number;
  lng: number;
  height = 0;
  
  constructor(public platform: Platform, public viewCtrl: ViewController, public navParams:NavParams) {
    console.log(platform.height());
    this.height = platform.height() - 56;
        console.log(this.navParams.get('coordenadas'))

	let coordenadasArray = this.navParams.get('coordenadas').split(',')
	this.lat = Number(coordenadasArray[0].replace('geo:', ''));
	this.lng = Number(coordenadasArray[1]);
	
  }
  
  cerrarModal() {
  	this.viewCtrl.dismiss()
  }
}
