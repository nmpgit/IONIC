import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { RegistroPage } from '../registro/registro';


@Component({
  selector: 'page-logueo',
  templateUrl: 'logueo.html',
})
export class LogueoPage {
	primeraVez = true;
	mensaje:boolean = false;
	loading:any = '';
	constructor(public navCtrl: NavController, 
				public navParams: NavParams,
				public alertCtrl: AlertController,
            	public loadingCtrl: LoadingController) {
	}
	registrarse = RegistroPage;

	showConfirm(){
		if (this.primeraVez) {	
			let alerta = this.alertCtrl.create({
				title: 'Usuario Incorrecto',
			    subTitle: 'Debe registrarse primero.',
			    buttons: ['Entendido']
			}).present();
			this.primeraVez = false;
		} else {
			this.ingresar().then((result) => {
		        if(result){
		        	this.verificarUsuario('as')
		        }
			})  
		}
	}

	ingresar(): Promise<boolean> {
		return new Promise((resolve, reject) =>{
		  const confirm = 
		    this.alertCtrl.create({
		      title: 'Esta aplicación requiere permisos de acceso.',
		//	      inputs: [{
		//	        name: 'clave',
		//	        placeholder: 'clave'
		//	      }],
		      buttons: [{
		        text: 'No quiero',
		         handler:()=> resolve(false)
		      },{
		        text: '¡Bueno!',
		        handler:()=> resolve(true)
		      },
		//	      {
		//	        text: '¡Bueno!',
		//	        handler: data => {
		//	          this.verificarUsuario( data.clave )
		//	        }
		//	      }
		      ]
		    }).present();
		})
	}


	verificarUsuario( clave: string ) {
		this.loading = this.loadingCtrl.create({
		  content: 'Conectando...'
		});

		this.loading.present();
		this.navCtrl.setRoot(HomePage)
		//this.mensaje = true;

		setTimeout(()=>{
		  this.loading.dismiss()

		}, 3000)
	}

	ionViewCanEnter(){ //FUNCION QUE PERMITE INGRESAR A ESTE COMPONENTE
		//console.log('Espere 3 segundos para entrar')
		//let promesa = new Promise ((resolve, reject)=>{
		//	setTimeout (()=>{
		//		resolve(true)
		//	}, 3000);
		//})

		//return promesa

	}
	ionViewCanLeave(){  //FUNCION QUE PERMITE IRSE DE ESTE COMPONENTE
		console.log('Espere 1 segundo para salir')
		let promesa = new Promise ((resolve, reject)=>{
			setTimeout (()=>{
				resolve(true)
			}, 1000);
		})

		return promesa
	}

}
