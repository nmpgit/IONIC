import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule, HttpClient } from '@angular/common/http';

//COMPONENTES
import { MyApp } from './app.component';
import { ProductoPage } from "../pages/producto/producto"
import { HomePage, BuscarPage, CategoriasPage, SplashPage, OrdenesDetallePage, OrdenesPage, CarritoPage, TabsPage, PorCategoriasPage, LoginPage } from '../pages/index.paginas';

//SERVICIOS
import { CarritoProvider } from '../providers/carrito/carrito';
import { ProductosProvider } from '../providers/productos/productos';
import { UsuarioProvider } from '../providers/usuario/usuario';

//NATIVE
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';


import { Facebook } from '@ionic-native/facebook';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ProductoPage,
    TabsPage,
    CategoriasPage,
    OrdenesPage,
    PorCategoriasPage,
    OrdenesDetallePage,
    CarritoPage,
    BuscarPage,
    SplashPage,
    TabsPage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ProductoPage,
    TabsPage,
    CategoriasPage,
    CarritoPage,
    OrdenesPage,
    BuscarPage,
    SplashPage,
    PorCategoriasPage,
    OrdenesDetallePage,
    TabsPage,
    LoginPage
  ],
  providers: [
    StatusBar,
    HttpClientModule,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Facebook,
    CarritoProvider,
    ProductosProvider,
    UsuarioProvider,
  ]
})
export class AppModule {}
