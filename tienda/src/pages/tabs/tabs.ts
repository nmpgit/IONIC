import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage, CategoriasPage, OrdenesPage } from '../index.paginas';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

	tab1:any = HomePage;
	tab2:any = CategoriasPage; 
	tab3:any = OrdenesPage;


}
