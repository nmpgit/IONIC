import { Component } from '@angular/core';
import { DetalleHomePage } from '../index.paginas';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  value:any = '';
  divs:any[] = ['animales', 'chavo', 'personajes', 'personajes2', 'simpson', 'simpson2']
  constructor(public navCtrl:NavController) {

  }
  
  pushPage(pagina:string) {
    switch (pagina) {
      case "animales":
        this.navCtrl.push(DetalleHomePage, {div: 'animales'})
        break;  
      case "chavo":
        this.navCtrl.push(DetalleHomePage, {div: 'chavo'})
        break;  
      case "personajes":
        this.navCtrl.push(DetalleHomePage, {div: 'personajes'})
        break;  
      case "personajes2":
        this.navCtrl.push(DetalleHomePage, {div: 'personajes2'})
        break;  
      case "simpson":
        this.navCtrl.push(DetalleHomePage, {div: 'simpson'})
        break;
      case "simpson2":
        this.navCtrl.push(DetalleHomePage, {div: 'simpson2'})
        break;  
      default:
        break;
    }
  }


}
