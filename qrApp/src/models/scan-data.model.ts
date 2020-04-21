export class ScanData {
	info:string;
	tipo:string;
	url:string;
	color:string;
	esEvento:string;
	
	constructor( texto:string) {
		this.tipo = 'no definido';
		this.info = texto
		if (texto.includes('maps')){//será un mapa
			this.tipo = 'mapa';
			return;
		} else if (texto.startsWith('http')) {
			this.tipo = 'http'
		} else if (texto.startsWith('BEGIN:VCARD')) {//será un contacto
			this.tipo = 'contacto'
		} else if (texto.startsWith('MATMSG')) {//será un mail
			this.tipo = 'email'
		} else if (texto.startsWith('BEGIN:VEVENT')) {//será un evento calendario
			this.tipo = 'evento'
		}
	}
}