import { Component } from '@angular/core';

/**
 * Generated class for the PostFeedComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'post-feed',
  templateUrl: 'post-feed.html'
})
export class PostFeedComponent {

  text: string;

  constructor() {
    console.log('Hello PostFeedComponent Component');
    this.text = 'Hello World';
  }

}
