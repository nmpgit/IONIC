import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';
import { CargaArchivoProvider } from '../../providers/carga-archivo/carga-archivo';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'page-subir',
  templateUrl: 'subir.html',
})
export class SubirPage {

	titulo:string = '';
	imagenTomada:any = '';
	imagen64:string;

	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		public viewCtrl: ViewController,
		private camera: Camera,
		private sanitizer: DomSanitizer,
		private imagePicker: ImagePicker,
		private cargaArchivo: CargaArchivoProvider
		  	) {}

	cerrarModal() {
		this.viewCtrl.dismiss()
	}

	mostrarCamara(){
		const options: CameraOptions = {
		  quality: 50,
		  correctOrientation: true,
		  destinationType: this.camera.DestinationType.DATA_URL,
		  encodingType: this.camera.EncodingType.JPEG,
		  mediaType: this.camera.MediaType.PICTURE
		}

		this.camera.getPicture(options).then((imageData) => {
		this.imagenTomada = 'data:image/jpg;base64,' + imageData;
		this.imagen64 = imageData

		}, (err) => {
		 console.log('Error:' + JSON.stringify(err))
		});
	}

	seleccionarImagen(){
		let opciones:ImagePickerOptions = {
			quality: 70,
			outputType: 1,
			maximumImagesCount:2
		}

		this.imagePicker.getPictures(opciones).then((results) => {
		  for (var i = 0; i < results.length; i++) {
		      this.imagenTomada = this.sanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,' + results[i]);
		      this.imagen64 = results[i];
		  }	
		}, (err) => { 
			 console.log('Esto es un error:' + JSON.stringify(err))
		});
	}

	crearPost(){
		let archivo = {
			img: this.imagen64,
			titulo: this.titulo
		}
		console.log('TITULO: ', archivo.titulo)
		this.cargaArchivo.cargarImagenFirebase(archivo)
		.then(()=>this.cerrarModal() )

	}
}
