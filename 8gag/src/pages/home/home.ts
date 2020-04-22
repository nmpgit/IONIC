import { Component } from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing';
import { 
	IonicPage, NavController, 
	NavParams, ToastController, 
	LoadingController, AlertController, 
	Refresher
} from 'ionic-angular';
import { CargaArchivoProvider } from '../../providers/carga-archivo/carga-archivo';
import { SubirPage } from '../subir/subir';
import { LogueoPage } from '../logueo/logueo';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	constructor(
		public _cap: CargaArchivoProvider,
		public toastCtrl: ToastController,
		public loadingCtrl:LoadingController,
		public navCtrl: NavController, 
		public alertCtrl: AlertController,
		private socialSharing: SocialSharing) {

	}
	loading:any = '';
	aunHayMas:boolean = true;
	subirImagen =  SubirPage;
	cerrarSesion() {
		this.cerrar().then((result) => {
	        if(result){
	        	this.loading = this.loadingCtrl.create({
							  content: 'Volvé rápido...'
							});

							this.loading.present();

							setTimeout(()=>{
							  this.loading.dismiss()
							this.navCtrl.setRoot(LogueoPage)

							}, 3000)
						}
		}) 
	}

	cerrar(): Promise<boolean> {
		return new Promise((resolve, reject) =>{
		    this.alertCtrl.create({
				title: '¿Desea cerrar sesión?',
				buttons: [{
				text: 'No, me quedo',
				 handler:()=> resolve(false)
				},{
				text: '¡Me voy!',
				handler:()=> resolve(true)
				}
				]
				}).present();
		})
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
