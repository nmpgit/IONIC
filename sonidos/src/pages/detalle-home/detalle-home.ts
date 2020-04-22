
import { Component } from '@angular/core';
import { ANIMALES, PERSONAJES, PERSONAJES2, CHAVO, SIMPSON, SIMPSON2 } from "../../data/data.objetos";
import { Objeto } from "../../interfaces/objeto.interface";
import { Refresher, reorderArray, NavParams, ToastController }  from "ionic-angular";

@Component({
  selector: 'page-detalle-home',
  templateUrl: 'detalle-home.html',
})
export class DetalleHomePage {

	objetos:Objeto[] = [];
	ordenando:boolean = false;
  	audio = new Audio();
	audioTiempo: any;
	value:any;
	
	constructor( public navParams: NavParams, public toastCtrl: ToastController) {
		this.value = navParams.get('div');

		switch (this.value) { //PARA NO CARGAR TODOS UNTOS SOLO CARGO EL QUE SE SELECCIONA.
			case "animales":
				this.objetos = ANIMALES;
				break;  
			case "chavo":
				this.objetos = CHAVO;
				break;  
			case "personajes":
				this.objetos = PERSONAJES;
				break;  
			case "personajes2":
				this.objetos = PERSONAJES2;
				break;  
			case "simpson":
				this.objetos = SIMPSON;
				break;  
			case "simpson2":
				this.objetos = SIMPSON;
				break;  
			default:
				break;
			}
	}

	recargarObjetos(refresher:Refresher){
		setTimeout( ()=>{
		    refresher.complete();
			this.mostrarToast('Recargado!')

		},1500)
	}

	reproducir( objeto:Objeto ){
	    this.pausarAudio(objeto);

	    if(objeto.reproduciendo){
	      objeto.reproduciendo = false;
	      return;
	    }

	    this.audio.src = objeto.audio;
	    this.audio.load();
	    this.audio.play();

	    objeto.reproduciendo = true;

	    this.audioTiempo = setTimeout( ()=> objeto.reproduciendo = false, objeto.duracion * 1000  );
	}

	private pausarAudio(objetoSeleccionado:Objeto){
		clearTimeout( this.audioTiempo );
		this.audio.pause();
		this.audio.currentTime = 0;

		for(let objeto of this.objetos){
		  if(objeto.nombre != objetoSeleccionado.nombre){
		    objeto.reproduciendo = false;
		  }
		}
	}

	borrarObjeto(indice:number) {
		//this.objetos.splice(indice, 1);
		this.mostrarToast('Sólo Nico puede eso!')
  	}
	
	reordenarObjetos(indices:any){
		this.objetos = reorderArray( this.objetos, indices );
		this.mostrarToast('Reordenado!')
	}


  	mostrarToast(mensaje:string) {
	    this.toastCtrl.create({
	      message: mensaje,
	      duration: 2000
	    }).present();
	}
}
