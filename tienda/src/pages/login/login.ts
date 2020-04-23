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
	correo:string = '';
	password:string = '';
	quiereRegistrarse:boolean = false;
	constructor(
			public navCtrl: NavController, 
			public navParams: NavParams, 
			private viewCtrl:ViewController,
			private fb: Facebook, 
			private _userv:UsuarioProvider) {
	}

	ingresar(){
		this._userv.ingresar(this.correo, this.password).subscribe(()=>{
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
		.catch(e =>	console.log(e));
	}

}
