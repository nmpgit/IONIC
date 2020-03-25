import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { SubirPage } from '../subir/subir';
import { CargaArchivoProvider } from '../../providers/carga-archivo/carga-archivo';
import { Refresher }  from "ionic-angular";
import { ToastController } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	constructor(
		public modCtrl: ModalController,
		public _cap: CargaArchivoProvider,
		public toastCtrl: ToastController,
		private socialSharing: SocialSharing) {

	}

	aunHayMas:boolean = true;

	mostrarModal(){
		let modal = this.modCtrl.create(SubirPage);
		modal.present()
	}

	doInfinite(infiniteScroll) {
    	this._cap.cargarImagenesHome().then(
    		(hayMas:boolean)=>{
    			this.aunHayMas = hayMas;
    			infiniteScroll.complete();
		 		infiniteScroll.enable(hayMas);
    		}    		
    	);
	
  	}

  	recargarPagina(refresher:Refresher){
	    setTimeout(() => {
 			refresher.complete();
 	    }, 2000);
  	}

  	socialShare(redSocial:string, titulo:string, img:string){
  		console.log(redSocial);
  		switch (redSocial) {
  			case "Facebook":
				this.socialSharing.shareViaFacebook(titulo, img, img)
				.then(() => {
	  				console.log('todo bomba')
	  			}).catch((error) => {
			  		this.mostrarToast('Falló el comparto x Facebook.' + error)
				});
  				break;
  			case "Twitter":
				this.socialSharing.shareViaTwitter(titulo, img, img)
				.then(() => {
	  				console.log('todo bomba')
	  			}).catch((error) => {
			  		this.mostrarToast('Falló el comparto x Twitter.' + error)
				});
  				break;
  			case "Instagram":
				this.socialSharing.shareViaInstagram(titulo, img)
				.then(() => {
	  				console.log('todo bomba')
	  			}).catch((error) => {
			  		this.mostrarToast('Falló el comparto x Instagram.' + error)
				});
  				break;
  			case "Whatsapp":
				this.socialSharing.shareViaWhatsApp(titulo, img, img)
				.then(() => {
	  				console.log('todo bomba')
	  			}).catch((error) => {
			  		this.mostrarToast('Falló el comparto x Whatsapp.' + error)
				});
  				break;
  		}  		
  	}

  	mostrarToast(mensaje:string) {
	    this.toastCtrl.create({
	      message: mensaje,
	      duration: 2000
	    }).present();
	}
}
