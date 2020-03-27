import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Pagina2Page } from '../pagina2/pagina2';


@IonicPage({
	name: 'miPagina3'
})
@Component({
  selector: 'page-pagina3',
  templateUrl: 'pagina3.html',
})
export class Pagina3Page {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  
}
