import { Component } from '@angular/core';

import {PostsPage} from '../posts/posts';
import {DataPage} from '../data/data';
import { ReportsPage } from '../reports/reports';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  draftCount:Number

  tab1Root = PostsPage;
  tab2Root = ReportsPage;
  tab3Root = DataPage;

  constructor() {
    this.draftCount = 3;
  }

  setDraftCount( count:Number ) {
    this.draftCount = count;
  }
  
}
