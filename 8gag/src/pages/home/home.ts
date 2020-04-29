import { Component } from '@angular/core';
import { 
	IonicPage, NavController, 
	NavParams, ToastController, 
	LoadingController, AlertController, 
	Refresher
} from 'ionic-angular';
import { CargaArchivoProvider } from '../../providers/carga-archivo/carga-archivo';
import { SubirPage } from '../subir/subir';
import { LogueoPage } from '../logueo/logueo';
import { ModalimgPage } from '../modalimg/modalimg';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	constructor(
		public _cap: CargaArchivoProvider,
		public loadingCtrl:LoadingController,
		public navCtrl: NavController, 
		public alertCtrl: AlertController){
	}


	loading:any = '';
	aunHayMas:boolean = true;
	subirImagen =  SubirPage;
	modalPage = ModalimgPage;
	cerrarSesion() {
		this.cerrar().then((result) => {
	        if(result){
	        	this.loading = this.loadingCtrl.create({
							  content: 'Te esperamos!'
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




}
