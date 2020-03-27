import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LogueoPage } from '../pages/logueo/logueo';
import { IntroduccionPage } from '../pages/introduccion/introduccion';
import { AjustesProvider } from '../providers/ajustes/ajustes'

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  // rootPage:any = LogueoPage;
  rootPage:any;

  constructor(private platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
              private _ajustes:AjustesProvider) {
    platform.ready().then(() => {


      this._ajustes.cargarStorage()
            .then( ()=>{

              if( this._ajustes.ajustes.mostrarTutorial ){
                this.rootPage = IntroduccionPage;
              }else{
                this.rootPage = LogueoPage;
              }

               //cuando se minimiza la aplicacion
              this.platform.pause.subscribe(()=>{
                console.log('AVISA CUANDO SE CIERRA LA APP')
              })
              //cuando se reanuda
              this.platform.resume.subscribe(()=>{
                console.log('AVISA CUANDO SE ABRE DE NEUVO LA APP')
              })
              
              statusBar.styleDefault();
              splashScreen.hide();

        })


    });
  }
}