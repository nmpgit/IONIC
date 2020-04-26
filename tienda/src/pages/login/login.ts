import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
	user:any = '';
	nombre:any='';
	apellido:any='';
	correo:string = '';
	password:string = '';
	ingreseContrasena:boolean = false;
	quiereRegistrarse:boolean = false;
	constructor(
			public navCtrl: NavController, 
			public navParams: NavParams, 
			private viewCtrl:ViewController,
			private fb: Facebook, 
			private _userv:UsuarioProvider) {
	}


	ingresar(){
		this._userv.ingresar(this.correo, this.password, this.quiereRegistrarse).subscribe((info)=>{
			if (this._userv.activo()) {
				this.viewCtrl.dismiss(true)
			}
		})
	}

	loginFb(){
		this.fb.login(['public_profile', 'email'])
		.then((res: FacebookLoginResponse) => this.getUserInfo(res.authResponse.userID))
	}

	getUserInfo(userId: string) {
		this.fb.api('me?fields=' + ['name', 'email', 'first_name', 'last_name', 'picture.type(large)'].join(), null)
		.then((res: any) => this.user = res)
		.then(() => this.informacionFacebook(this.user.first_name, this.user.last_name))
		.catch(e =>	console.log(e));
	}

	informacionFacebook(nombre:string, apellido:string) {
		this.nombre = nombre;
		this.apellido = apellido
		this.correo = this.user.email
		this.ingreseContrasena = true;
	}
}
