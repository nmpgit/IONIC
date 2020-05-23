import { Component } from '@angular/core';
import { DetalleHomePage } from '../index.paginas';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  value:any = '';
  divs:any[] = ['maradona', 'chavo del 8', 'personajes', 'personajes2', 'simpsons', 'simpsons2']
  constructor(public navCtrl:NavController) {

  }
  
  pushPage(pagina:string) {
    switch (pagina) {
      case "maradona":
        this.navCtrl.push(DetalleHomePage, {div: 'maradona'})
        break;  
      case "chavo del 8":
        this.navCtrl.push(DetalleHomePage, {div: 'chavo del 8'})
        break;  
      case "personajes":
        this.navCtrl.push(DetalleHomePage, {div: 'personajes'})
        break;  
      case "personajes2":
        this.navCtrl.push(DetalleHomePage, {div: 'personajes2'})
        break;  
      case "simpsons":
        this.navCtrl.push(DetalleHomePage, {div: 'simpsons'})
        break;
      case "simpsons2":
        this.navCtrl.push(DetalleHomePage, {div: 'simpsons2'})
        break;  
      default:
        break;
    }
  }


}
