import { Component } from '@angular/core';

import {PostsPage} from '../posts/posts';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = PostsPage;
  tab2Root = PostsPage;
  tab3Root = PostsPage;

  constructor() {

  }
}
