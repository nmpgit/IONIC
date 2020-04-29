import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase';
import { ToastController } from 'ionic-angular';
import { map } from "rxjs/operators";

@Injectable()
export class CargaArchivoProvider {

	imagenes:ArchivoSubir[]=[];
	lastKey:string = null;

	constructor(	public toastCtrl: ToastController,
					public afDB: AngularFireDatabase,
				) {
		//this.cargarUltimoKey().subscribe( ()=>this.cargarImagenesHome())//es suscribe porque recibe un observable; 
	}

	cargarImagenFirebase(archivo:ArchivoSubir){
		let promesa = new Promise((resolve,reject)=>{
			this.mostrarToast('Cargando..');
			let storageReferencia = firebase.storage().ref();
			let nombreArchivo:string = new Date().valueOf().toString();  //123123123
			let uploadTask:firebase.storage.UploadTask =
				storageReferencia
					.child(`img/${ nombreArchivo }`)
					.putString( archivo.img, 'base64', {contentType : 'image/jpeg'});

				uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
					()=>{}, //saber el % de cuánto megas o kb llegan subidos
					(error) => {
						//manejo de error
						this.mostrarToast(JSON.stringify(error));
						reject();
					},
					()=>{
						//TODO BIEN!!
              			let url = uploadTask.snapshot.ref.getDownloadURL()
              						.then(urlImage => {
											this.mostrarToast('Archivo cargado')
              				 				this.crearPost(archivo.titulo, urlImage, nombreArchivo);
									})
              						.catch((error) => {
              				   				this.mostrarToast('Error:' + error);
									});
						resolve();  
					}
				)
		})

		return promesa
	}	

	private crearPost (tituloImagenSubida:string, urlImagenSubida:string, nombreImagenSubida:string) {
		
		let post:ArchivoSubir = {
			img: urlImagenSubida,
			titulo: tituloImagenSubida,
			key: nombreImagenSubida
		}
		//		this.afDB.list('/post').push;
		this.afDB.object(`/post/${ nombreImagenSubida }`).update(post); //post es el nombre de la ruta de firebase
		this.imagenes.unshift(post)
	}

	cargarUltimoKey(){
		/*return this.afDB.list('/post', ref=> ref.orderByKey().limitToLast(1)) //para cargar el último.
						.valueChanges()
						.pipe(map( (post:any) =>{
							if(post.length > 0) {						
							 	this.lastKey = post[0].key
								this.imagenes.push(post[0])
							}

				        }));*/
	}

	cargarImagenesHome(){

		//if (this.lastKey != null) { //hay cargada alguna imagen
			return new Promise( (resolve, reject)=>{
			  this.afDB.list('/post',
			    ref=> ref.limitToLast(30)
			            
			   ).valueChanges()
			    .subscribe(  (posts:any)=>{
			    	this.imagenes = posts
			    	this.imagenes = this.imagenes.reverse()
			     /*posts.pop();

			      if( posts.length == 0 ){
			        console.log('Ya no hay más registros');
			        resolve(false);
			        return;
			      }

			      this.lastKey = posts[0].key;

			      for( let i = posts.length-1;  i >=0; i-- ){
			        let post = posts[i];
			        this.imagenes.push(post);
			      }
*/

			      resolve(true);
			    });
			});
//		}

	}
	mostrarToast(mensaje:string) {
	    this.toastCtrl.create({
	      message: mensaje,
	      duration: 2000
	    }).present();
	}

}

interface ArchivoSubir {
	titulo:string;
	img:string;
	key?:string //? significa que puede ser opcional.
}