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
  	if (!this.platform.is('cordova')) {  //PARA PRUEBAS EN LA COMPU.
     // this._historialService.agregarHistorial('http://google.com')

     //PARA EL SCANEO DE VCARD Y CREACION DE CONTACTO
//this._historialService.agregarHistorial( `BEGIN:VCARD
//VERSION:2.1
//N:Kent;Clark
//FN:Clark Kent
//ORG:
//TEL;HOME;VOICE:12345
//TEL;TYPE=cell:67890
//ADR;TYPE=work:;;;
//EMAIL:clark@superman.com
//END:VCARD` );



      //ENVIO DE MAIL
      //this._historialService.agregarHistorial('MATMSG:TO:nmpiovano@gmail.com;SUB:Prueba;BODY:Estoesunaprueba;;')
  		return;
  	}

  	this.barcodeScanner.scan().then( (barcodeData)=> {
      console.log(barcodeData.text)
//	 console.log('result: ', barcodeData.text)
//	 console.log('format: ', barcodeData.format)
//	 console.log('cancelled: ', barcodeData.cancelled)

	 if (barcodeData.cancelled == false && barcodeData.text != null) {
	 	this._historialService.agregarHistorial(barcodeData.text)
	 }


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
