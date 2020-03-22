import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ScanData } from '../../models/scan-data.model';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ModalController, Platform, ToastController } from 'ionic-angular';
import { MapaPage } from '../../pages/mapa/mapa';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';
import { EmailComposer } from '@ionic-native/email-composer';


@Injectable()
export class HistorialService {

	private _historial:any[] = [];
	
	constructor(
		public contacts: Contacts,
		public http: HttpClient, 
		public modal: ModalController, 
		private iab:InAppBrowser,
		private platform:Platform,
		private toastCtrl: ToastController,
		private emailComposer: EmailComposer
		) {}

	agregarHistorial(texto:string){
		let data = new ScanData(texto);
		this._historial.unshift(data)
		this.abrirScan(0);

	}

	abrirScan(index:number){ //abro la posicion de los scaneos que quiera
		let scandata = this._historial[index]
		console.log(scandata);

		switch (scandata.tipo) {
			case "http":
				this.iab.create(scandata.info, '_system')
				break;
			case "mapa":
				this.modal.create(MapaPage, {coordenadas: scandata.info })
				.present();
				break;
			case "contacto":
				this.crearContacto(scandata.info)
				break;
			case "email":
				this.mandarEmail(scandata.info)
				break;
			default:
				console.error('tipo no soportado')
				break;
		}
	}
	cargarHistorial(){
		return this._historial
	}

	mandarEmail(infoMail:string) {
		let datosString = infoMail.split(";");
		let destinatario =  datosString[0].substring(10);
		let asunto =  datosString[1].substring(4);
		let body =  datosString[2].substring(5);

		let email = {
		  to: destinatario,
		  cc: '',
		  bcc: ['',''],
		  attachments: [
		  ],
		  subject: asunto,
		  body: body,
		  isHtml: true
		}

		this.emailComposer.open(email);
	}
	crearContacto(stringContacto: string) {
		let campos:any = this.formatearString(stringContacto);
		let nombre = campos.fn
		let tel = campos.tel[0].value[0];

		let contact: Contact = this.contacts.create();
		//ATENCION: CREA EL CONTACTO VACIO. BUG EN IONIC. NO SE PUEDE SETEAR LAS PROPIEDADES DEL OBJETO CONTACT.
		contact.name = new ContactName (null, nombre)
		contact.phoneNumbers = [new ContactField('mobile', tel)];

		contact.save().then(
		  () => this.mostrarError('Contacto guardado!' + nombre),
		  (error: any) => this.mostrarError('Error saving contact' + error)
		);
		if (!this.platform.is('cordova')) {
			this.mostrarError('Estoy en compu. No creo contacto')
			return
		}
	}

	formatearString(input:string){

	    var Re1 = /^(version|fn|title|org):(.+)$/i;
	    var Re2 = /^([^:;]+);([^:]+):(.+)$/;
	    var ReKey = /item\d{1,2}\./;
	    var fields = {};

	    input.split(/\r\n|\r|\n/).forEach(function (line) {
	        var results, key;

	        if (Re1.test(line)) {
	            results = line.match(Re1);
	            key = results[1].toLowerCase();
	            fields[key] = results[2];
	        } else if (Re2.test(line)) {
	            results = line.match(Re2);
	            key = results[1].replace(ReKey, '').toLowerCase();

	            var meta = {};
	            results[2].split(';')
	                .map(function (p, i) {
	                var match = p.match(/([a-z]+)=(.*)/i);
	                if (match) {
	                    return [match[1], match[2]];
	                } else {
	                    return ["TYPE" + (i === 0 ? "" : i), p];
	                }
	            })
	                .forEach(function (p) {
	                meta[p[0]] = p[1];
	            });

	            if (!fields[key]) fields[key] = [];

	            fields[key].push({
	                meta: meta,
	                value: results[3].split(';')
	            })
	        }
	    });
	    return fields;
	}

	mostrarError( mensaje:string ){

    let toast = this.toastCtrl.create({
      message: mensaje,
      duration: 2500
    });

    toast.present();

  }
}
