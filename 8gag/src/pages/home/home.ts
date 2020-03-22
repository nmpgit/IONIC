import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { SubirPage } from '../subir/subir';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	items: Observable<any[]>;

	constructor(
		public modCtrl: ModalController,
		public afDB: AngularFireDatabase) {

		 this.items = afDB.list('post').valueChanges(); //este post es el nombre de la base en la nube que se encuentra en firebase (https://console.firebase.google.com/project/gag-6cfe2/database/gag-6cfe2/data)
	}

	mostrarModal(){
		let modal = this.modCtrl.create(SubirPage);
		modal.present()
	}
}
