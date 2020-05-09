import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ScanData } from '../../models/scan-data.model';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ModalController, Platform, ToastController } from 'ionic-angular';
import { GuardadosPage, MapaPage } from '../../pages/index.paginas'
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';
import { EmailComposer } from '@ionic-native/email-composer';
import { Storage } from '@ionic/storage';
import { Calendar } from '@ionic-native/calendar';


@Injectable()
export class HistorialService {

	private _historial:any[] = [];
	items:any[] = [];
	constructor(
		public contacts: Contacts,
		public http: HttpClient, 
		public modal: ModalController, 
		private iab:InAppBrowser,
		private platform:Platform,
		private toastCtrl: ToastController,
		private storage:Storage,
		private calendar: Calendar,
		private emailComposer: EmailComposer
		) {		
	}

	agregarHistorial(texto:string){
		let data = new ScanData(texto);
		this._historial.unshift(data)
		this.abrirScan(0);
		return
	}

	abrirScan(index:number){ //abro la posicion de los scaneos que quiera
		let scandata = this._historial[index]
		switch (scandata.tipo) {
			case "http":
				let url = scandata.info.substring(8);
				scandata.url = url.slice(0, url.indexOf("/"));
				scandata.color = 'blanco';
				this.guardarStorage()
				this.iab.create(scandata.info, '_system')
				break;
			case "mapa":
				scandata.color = 'naranja';
				this.guardarStorage()
				this.modal.create(MapaPage, {coordenadas: scandata.info })
				.present();
				break;
			case "contacto":
				scandata.color = 'verde';
				this.guardarStorage()
				this.crearContacto(scandata.info, false)
				break;
			case "email":
				scandata.color = 'azul';
				this.guardarStorage()
				this.mandarEmail(scandata.info, false)
				break;
			case "evento":
				scandata.color = 'violeta';
				this.crearEvento(scandata)
				this.guardarStorage()		

				break;
			default:
				console.error('tipo no soportado')
				break;
		}
	}
	
	crearEvento (scandata) {
		let infoEvento = scandata.info
		//metodo de corte: encuentro la palabra desde que quiero cortar y le sumo la cantidad que falta hasta llegar al texto variable
		let summary = infoEvento.substring(infoEvento.lastIndexOf('SUMMARY:') + 8, infoEvento.lastIndexOf('DESCRIPTION:'))
		let description = infoEvento.substring(infoEvento.lastIndexOf('DESCRIPTION:') + 12, infoEvento.lastIndexOf('LOCATION:'))
		let location = infoEvento.substring(infoEvento.lastIndexOf('LOCATION:') + 9, infoEvento.lastIndexOf('DTSTART:'))
		let start = infoEvento.substring(infoEvento.lastIndexOf('DTSTART:') + 8, infoEvento.lastIndexOf('DTEND:'))
		let end = infoEvento.substring(infoEvento.lastIndexOf('DTEND:') + 6, infoEvento.lastIndexOf('END:VEVENT'))
		
		//los hago date
		let startAño = start.substring(0,4);
		let startMes = start.substring(4,6);
		let startDia = start.substring(6,8);
		let startHora = start.substring(9,11);
		let startMinuto = start.substring(11,13);

		let endAño = end.substring(0,4);
		let endMes = end.substring(4,6);
		let endDia = end.substring(6,8);
		let endHora = end.substring(9,11);
		let endMinuto = end.substring(11,13);

		var startDate = new Date(Number(startAño),Number(startMes) - 1,Number(startDia),Number(startHora),Number(startMinuto),Number(startMinuto))
		var endDate = new Date(Number(endAño),Number(endMes) - 1,Number(endDia),Number(endHora),Number(endMinuto),Number(endMinuto))
		scandata.esEvento = 'Evento: ' + startDia + '/' + startMes + ', a las ' + startHora + ':' + startMinuto + '.';

		this.calendar.createEventWithOptions(summary, location, description, startDate, endDate).then(
		  	this.mostrarError(scandata.esEvento)
		);


	}

	mandarEmail(infoMail:string, esParaFront:boolean) {
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

		if (esParaFront) {
			return destinatario
		} else {
			this.emailComposer.open(email);
		}
	}

	crearContacto(stringContacto: string, esParaFront:boolean) {
		let campos:any = this.formatearString(stringContacto);
		let tel = campos.tel[0].value[0];
		let nombreContacto = campos.fn;
		if (esParaFront) {
			return nombreContacto
		}
		let contact: Contact = this.contacts.create();
		//ATENCION: CREA EL CONTACTO VACIO. BUG EN IONIC. NO SE PUEDE SETEAR LAS PROPIEDADES DEL OBJETO CONTACT.
		contact.name = new ContactName (null, nombreContacto)
		contact.phoneNumbers = [new ContactField('mobile', tel)];
		contact.birthday = new Date();

		contact.save().then(
		  this.mostrarError('Contacto guardado: ' + nombreContacto)
		);
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

	mostrarError(mensaje){
	    let toast = this.toastCtrl.create({
	      message: mensaje,
	      duration: 2500
	    });

	    toast.present();
	}


	guardarStorage(){
		console.log(this._historial)
		if (this.platform.is('cordova')) {  
			// Dispositivo
			this.storage.set('qrStorage', this._historial)
		} else {
			//Escritorio
			localStorage.setItem('qrStorage', JSON.stringify(this._historial))
		}
	}
	cargarHistorial(){
		return this._historial
	}
	cargarStorage(){
		let promesa = new Promise ((resolve, reject) => {
			if (this.platform.is('cordova')) {  
				// Dispositivo
				 this.storage.ready().then(() => {
				 	this.storage.get('qrStorage').then((informacionStorage)=>{
	                    if( informacionStorage ){
	                      this._historial = informacionStorage;
	                    }
	                    resolve();
				 	});
				 })
			} else {
				//Escritorio
				if (localStorage.getItem('qrStorage')) {
					this._historial = JSON.parse(localStorage.getItem('qrStorage'))
				}
				resolve()
			}
		});
		return promesa
	}

}
