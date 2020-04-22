import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MyApp } from './app.component';
import { IonicStorageModule } from '@ionic/storage';
import { HomePage, GuardadosPage, MapaPage, TabsPage, SplashPage } from '../pages/index.paginas'


//Mapas
import { AgmCoreModule } from '@agm/core';

//plugins
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Contacts } from '@ionic-native/contacts';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { EmailComposer } from '@ionic-native/email-composer';
import { Calendar } from '@ionic-native/calendar';

//servicios
import { HistorialService } from '../providers/historial/historial';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    GuardadosPage,
    MapaPage,
    SplashPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
        IonicStorageModule.forRoot(),

    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDjK2Y3t_7P1KLPHqKYuGsWfJbQJ1AacL4'
    })

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    GuardadosPage,
    MapaPage,
    SplashPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BarcodeScanner,
    HistorialService,
    InAppBrowser,
    Contacts,
    EmailComposer,
    Calendar,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]
})
export class AppModule {}
