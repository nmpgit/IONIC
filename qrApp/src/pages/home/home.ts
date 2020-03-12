import { Component } from '@angular/core';
//componentes
import { ToastController, Platform } from 'ionic-angular';
//plugins
import { BarcodeScanner } from '@ionic-native/barcode-scanner';//es un servicio, debo ingresarlo en el app module como providers
//servicios
import { HistorialService } from '../../providers/historial/historial';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(	private barcodeScanner: BarcodeScanner, 
  				private toastCtrl: ToastController, 
  				private platform:Platform,
  				private _historialService:HistorialService) {

  }


  scan() {
  	console.log('realizando..')
	if (!this.platform.is('cordova')) {
		this._historialService.agregarHistorial('http://google.com')
		return;
	}

  	this.barcodeScanner.scan().then( (barcodeData)=> {
	 console.log('result: ', barcodeData.text)
	 console.log('format: ', barcodeData.format)
	 console.log('cancelled: ', barcodeData.cancelled)

	 //if (barcodeData.cancelled == '0' && barcodeData.text != null) {
	 	//this._historialService.agregarHistorial(barcodeData.text)
	 //}


	},(err) => {
        console.error("Error: ", err );
        this.mostrarError( "Error: " + err );
    });
  }

  mostrarError( mensaje:string ){

    let toast = this.toastCtrl.create({
      message: mensaje,
      duration: 2500
    });

    toast.present();

  }
}
