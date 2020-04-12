import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import { UsuarioProvider } from '../../providers/usuario/usuario';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

	correo:string = '';
	password:string = '';
	
	constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl:ViewController, private _userv:UsuarioProvider) {
	}

	ingresar(){
		this._userv.ingresar(this.correo, this.password).subscribe(()=>{
			
		})
	}

}
