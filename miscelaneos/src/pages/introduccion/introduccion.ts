import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AjustesService } from '../../providers/ajustes'
@IonicPage()
@Component({
  selector: 'page-introduccion',
  templateUrl: 'introduccion.html',
})
export class IntroduccionPage {

	constructor(public navCtrl: NavController,
				public _ajustes: AjustesService) {
	}

	slides:any[] = [
	  {
	    title: "Bienvenido!!!",
	    description: "Esta <b>aplicación</b> nos ayudará a comprender muchos temas interesantes en ionic!",
	    image: "assets/img/ica-slidebox-img-1.png",
	  },
	  {
	    title: "¿Qué es ionic?",
	    description: "<b>Ionic Framework</b> es un SDK abierto que le permite a los desarrolladores crear aplicaciones móviles de alta calidad con el conocimiento de JavaScript, CSS y HTML.",
	    image: "assets/img/ica-slidebox-img-2.png",
	  },
	  {
	    title: "¿Que hace esta app?",
	    description: "Esta aplicación nos ayudará a conocer más sobre el ciclo de vida de un componente y el storage!",
	    image: "assets/img/ica-slidebox-img-3.png",
	  }
	];

	saltarTutorial(){ //cambio el root de la app YA NO QUIERO QUE SEA LA INTRODUCCION SINO EL HOME
		this._ajustes.ajustes.mostrarTutorial = false; //para qe no se vuelva a mostrar.
		this._ajustes.guardarStorage();
		this.navCtrl.setRoot(HomePage)
	}

}
