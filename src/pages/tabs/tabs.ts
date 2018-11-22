import { Component } from '@angular/core';

import {MenuPage} from '../menu/menu';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = MenuPage;
  tab2Root = MenuPage;
  tab3Root = MenuPage;

  constructor() {

  }
}
