import { Component } from '@angular/core';
import { HomePage, GuardadosPage } from '../index.paginas'


@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

	tab1:any = GuardadosPage;
	tab2:any = HomePage;
	
	constructor() {
	}


}
