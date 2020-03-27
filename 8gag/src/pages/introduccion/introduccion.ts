import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { LogueoPage } from '../logueo/logueo';
import { AjustesProvider } from '../../providers/ajustes/ajustes'
@IonicPage()
@Component({
  selector: 'page-introduccion',
  templateUrl: 'introduccion.html',
})
export class IntroduccionPage {

	mensaje:boolean = false;
	texto:string='Espere 3 segundos para entrar al próximo componente..'
	constructor(public navCtrl: NavController,
				public _ajustes: AjustesProvider) {
	}

	slides:any[] = [
	  {
	    title: "Bienvenido!",
	    description: "Esta <b>aplicación</b> nos ayudará a comprender eventos entre componentes (entrada y salida de ellos), uso del storage...",
	    image: "assets/img/ica-slidebox-img-1.png",
	    colors: '#68AB62'
	  },
	  {
	    title: "¿Qué más?",
	    description: "Carga de imágenes a través de la cámara del celular, carga gradual de imágenes y no general...",
	    image: "assets/img/ica-slidebox-img-2.png",
	    colors: '#64B7BF'
	  },
	  {
	    title: "¿Conexión con base de datos?",
	    description: "Y claro, <b>conexión con firebase</b> -una base NoSQL, online, gratuita, de Google-.",
	    image: "assets/img/ica-slidebox-img-3.png",
	    colors: '#E962DD'
	  },
	  {
	    title: "Y redes sociales",
	    description: "También está la posibilidad de compartir imágenes a través de las principales redes sociales.",
	    image: "assets/img/ica-slidebox-img-3.png",
	    colors: '#8F0303'
	  },
	  {
	    title: "¿Listo para empezar?",
	    description: "",
	    image: "assets/img/ica-slidebox-img-3.png",
	    colors: '#FCBA03'
	  }
	];

	saltarTutorial(){ //cambio el root de la app YA NO QUIERO QUE SEA LA INTRODUCCION SINO EL HOME
		this._ajustes.ajustes.mostrarTutorial = false; //para qe no se vuelva a mostrar.
		this._ajustes.guardarStorage();
		this.navCtrl.setRoot(LogueoPage)
		this.mensaje = true;
	}

}
