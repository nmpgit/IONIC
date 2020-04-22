import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { UsuarioProvider } from '../../providers/usuario/usuario';
import { HomePage } from '../home/home';

import { Platform } from 'ionic-angular';
//import { Facebook } from '@ionic-native/facebook';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController,
              private afAuth: AngularFireAuth,
              public usuarioProv: UsuarioProvider,
              //private fb: Facebook,
              private platform: Platform
              ) {
  }


	loginFb(){		
	
	   /* if (this.platform.is('cordova')) {
		      // celular
		      this.fb.login(['email', 'public_profile']).then(res => {
		        const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
		        firebase.auth().signInWithCredential(facebookCredential)
		            .then( user => {

		              console.log(user);
		  
				              this.usuarioProv.cargarUsuario(
				                user.displayName,
				                user.email,
				                user.photoURL,
				                user.uid,
				                'facebook'
		              );
		      
		              this.navCtrl.setRoot(HomePage);


		            }).catch(e => console.log('Error con el login' + JSON.stringify(e)));
		      })


	    }else {
	      // escritorio
	      this.afAuth.auth
	        .signInWithPopup(new firebase.auth.FacebookAuthProvider())
	        .then(res => {
	  
	          console.log(res);
	          let user = res.user;
	  
	          this.usuarioProv.cargarUsuario(
	            user.displayName,
	            user.email,
	            user.photoURL,
	            user.uid,
	            'facebook'
	          );
	  
	          this.navCtrl.setRoot(HomePage);
	  
	        });
	    }*/
	}
}
