export class ScanData {
	info:string;
	tipo:string;

	constructor( texto:string) {
		this.tipo = 'no definido';
		this.info = texto

		if (texto.startsWith('http')){
			this.tipo = 'http';
		} else if (texto.startsWith('geo')) {//será un mapa
			this.tipo = 'mapa'
		} else if (texto.startsWith('BEGIN:VCARD')) {//será un contacto
			this.tipo = 'contacto'
		} else if (texto.startsWith('MATMSG')) {//será un mail
			this.tipo = 'email'
		}
	}
}