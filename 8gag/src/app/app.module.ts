import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

//components
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SubirPage } from '../pages/subir/subir';
import { IntroduccionPage } from '../pages/introduccion/introduccion';
import { LogueoPage } from '../pages/logueo/logueo';
import { RegistroPage } from '../pages/registro/registro';

//plgins
import { Camera } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';
import { SocialSharing } from '@ionic-native/social-sharing';
import { IonicStorageModule } from '@ionic/storage';

//Pipes
import { PipesModule } from '../pipes/pipes.module';

//providers
import { CargaArchivoProvider } from '../providers/carga-archivo/carga-archivo';

//FIREBASE
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AjustesProvider } from '../providers/ajustes/ajustes'


export const firebaseConfig = {
    apiKey: "AIzaSyCMYGs0K6KsYmF8aira09b180dYXadCvC4",
    authDomain: "gag-6cfe2.firebaseapp.com",
    databaseURL: "https://gag-6cfe2.firebaseio.com",
    projectId: "gag-6cfe2",
    storageBucket: "gag-6cfe2.appspot.com",
    messagingSenderId: "931174491445",
    appId: "1:931174491445:web:8fbeac2b1472ce98b9d87c"
 }
//FIN FIREBASE

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SubirPage,
    IntroduccionPage,
    LogueoPage,
    RegistroPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    PipesModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SubirPage,
    IntroduccionPage,
    LogueoPage,
    RegistroPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireDatabase,
    Camera,
    ImagePicker,
    SocialSharing,
    CargaArchivoProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CargaArchivoProvider,
    AjustesProvider
  ]
})
export class AppModule {}
