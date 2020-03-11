import { Component } from '@angular/core';
//componentes
import { ToastController } from 'ionic-angular';
//plugins
import { Toast } from '@ionic-native/toast/ngx';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';//es un servicio, debo ingresarlo en el app module como providers

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(private barcodeScanner: BarcodeScanner, private toastCtrl: ToastController) {

  }

  scan() {
  	console.log('realizando..')

  	this.barcodeScanner.scan().then( (barcodeData)=> {
	 console.log('Barcode data', barcodeData);
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
