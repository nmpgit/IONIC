import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { MyApp } from './app.component';
import { ProductoPage } from "../pages/producto/producto"
import { HomePage, BuscarPage, CategoriasPage, OrdenesDetallePage, OrdenesPage, CarritoPage, TabsPage, PorCategoriasPage, LoginPage } from '../pages/index.paginas';


import { CarritoProvider } from '../providers/carrito/carrito';
import { ProductosProvider } from '../providers/productos/productos';
import { UsuarioProvider } from '../providers/usuario/usuario';


import { IonicStorageModule } from '@ionic/storage';


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
    CarritoProvider,
    ProductosProvider,
    UsuarioProvider
  ]
})
export class AppModule {}
