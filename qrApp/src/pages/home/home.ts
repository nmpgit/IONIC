import { Component } from '@angular/core';
//componentes
import { ToastController, Platform } from 'ionic-angular';
//plugins
import { BarcodeScanner } from '@ionic-native/barcode-scanner';//es un servicio, debo ingresarlo en el app module como providers
import { NavController } from 'ionic-angular';
import { GuardadosPage } from '../../pages/index.paginas'

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
          public navCtrl:NavController,
  				private _historialService:HistorialService) {
    
  }
  ionViewDidEnter() {
    this.scan();
  }
 
  scan() {
  	if (!this.platform.is('cordova')) {  //PARA PRUEBAS EN LA COMPU.
      this._historialService.agregarHistorial(
       "https://www.google.com/maps/place/Av.+Corrientes+1050,+C1043AAX+CABA/@-34.6062135,-58.3921346,15z/data=!4m5!3m4!1s0x95bccacf3fe83a57:0xd28368ab715d0516!8m2!3d-34.6037012!4d-58.3823821"
    //"https://www.google.com/search?q=35067554&oq=35067554&aqs=chrome..69i57.449j0j7&client=ubuntu&sourceid=chrome&ie=UTF-8"
        )
//PARA EL SCANEO DE VCARD Y CREACION DE CONTACTO
/*this._historialService.agregarHistorial( `BEGIN:VCARD
VERSION:2.1
N:Kent;Clark
FN:Clark Kent
ORG:
TEL;HOME;VOICE:12345
TEL;TYPE=cell:67890
ADR;TYPE=work:;;;
EMAIL:clark@superman.com
END:VCARD` );
*/
//CREACION DE EVENTO
/*this._historialService.agregarHistorial( `BEGIN:VEVENT
SUMMARY:Un evento ascasc
DESCRIPTION:Hoy hay reunion en un lugar lejano
LOCATION:Charata Chaco papu
DTSTART:20200429T233411Z
DTEND:20200429T235411Z
END:VEVENT` );
*/

//      //ENVIO DE MAIL
this._historialService.agregarHistorial('MATMSG:TO:nmpiovano@gmail.com;SUB:Prueba;BODY:Estoesunaprueba;;')
  	}

  	this.barcodeScanner.scan().then( (barcodeData)=> {
      if (barcodeData.cancelled == false && barcodeData.text != null) {
        this._historialService.agregarHistorial(barcodeData.text);
      } 
  	},(err) => {
          this.mostrarError( "Error: " + err );
      })
  
  }

  mostrarError( mensaje:any ){

    let toast = this.toastCtrl.create({
      message: mensaje,
      duration: 2500
    });

    toast.present();

  }
}
