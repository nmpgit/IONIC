import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';


@Component({
  selector: 'page-modalimg',
  templateUrl: 'modalimg.html',
})
export class ModalimgPage {
	imagen:string;
	texto:string;

	constructor(
		public navCtrl: NavController,
		public toastCtrl: ToastController,
		public navParams: NavParams, 
		private socialSharing: SocialSharing) {
		let dato = this.navParams.data.imagen
		this.imagen = dato[0]
		this.texto = dato[1]
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
