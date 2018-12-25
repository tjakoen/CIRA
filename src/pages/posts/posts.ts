import { Component } from '@angular/core';
import { ModalController,PopoverController, NavParams } from 'ionic-angular';
import { FirebaseService } from '../services/firebase.service';

import { NewPostModalPage } from './new-post-modal/new-post-modal';
import { PostDetailPage } from './post-details/post-details';

import { HelperService } from '../services/helpers.service';

@Component({
  selector: 'page-posts',
  templateUrl: 'posts.html'
})
export class PostsPage {
  viewMode: string  = 'list';
  searchQuery: string;

  filters = {
    owner: 'all',
    viewType:'all',
    viewStatus: 'all',
    orderBy: 'date',
    orderDirection: 'desc',
    startDate: '',
    endDate: ''
  }
  
  postData = [];  // Raw Data
  filteredPostData = [];
  posts = [];
  
  constructor(
    private modalCtrl: ModalController,
    private firebaseService: FirebaseService,
    private helperService: HelperService,
    private popCtrl: PopoverController,
  ) {}
  
  ionViewWillEnter(){
    this.getData();
  }
  
  // Gets Post Data
  getData(){
    this.postData = [];
    this.firebaseService.getPosts(this.filters.viewType)
    .then(data => {
      if (data) {
        data.map( dataMap => {
          let post = dataMap.payload.doc.data();
          post.documentId = dataMap.payload.doc.id;
          this.postData.push( post );
          this.displayPosts();
        });  		
      }
    })
  }

  // Displays Post Data
  displayPosts() {
    this.posts = [];
    this.proccessPosts( ( callback ) => {
      if ( callback ) {
        this.posts = this.filteredPostData;
        this.searchQuery = '';
      }
    });
  }
  // Filters Displayed Post Data
  proccessPosts( callback ) {
    this.filteredPostData = [];
    let filterdValue = this.filterPosts( this.postData );
    let orderedValue = this.helperService.sortByKey( filterdValue, this.filters.orderBy, this.filters.orderDirection );
    this.filteredPostData = orderedValue;
    callback( true );
  }

  // TODO: Improved multi-key filtering
  // Filters post data based on each set key
  filterPosts( data ) {
    data = this.filters.owner != 'all' ? this.helperService.filterByKey( data, 'userID', this.filters.owner ) : data;
    data = this.filters.viewType != 'all' ? this.helperService.filterByKey( data, 'type', this.filters.viewType ) : data;
    data = this.filters.viewStatus != 'all' ? this.helperService.filterByKey( data, 'status', this.filters.viewStatus ) : data;
    data = this.filters.startDate != '' && this.filters.startDate != '' ?  this.helperService.filterByDate( data, this.filters.startDate, this.filters.endDate ) : data;
    return data;
  }

  // Sets the value for filter by owner option
  viewOwners(ev: any) {
    let val = ev.target.value;
    let userID = this.firebaseService.getCurrentUser().uid;
    this.filters.owner = val != 'all' ? userID : val 
    this.displayPosts()
  }
  
  // Searches Displayed Posts by Name, Location or Description
  searchPosts(ev: any) {
    let val = ev.target.value;
    if (val && val.trim() != '') {
      this.posts = this.filteredPostData.filter((post) => {
        return (
          post.name.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
          post.location.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
          post.description.toLowerCase().indexOf(val.toLowerCase()) > -1
        );
      })
    } else {
      this.posts = this.filteredPostData;
    }
  }

  // (Button Action) Shows filter options
  showFilterPopover(myEvent?: Event) {
    // Pass Post Page Refferrence to Popover Page
    let popover = this.popCtrl.create(PostFilterPopover, { cssClass: 'popover-top-right', homeRef: this });
    popover.present({
      ev: myEvent
    });
  }

  // (Button Action) Resets All Filters
  resetFilter() { 
    this.filters = {
      owner: 'all',
      viewType:'all',
      viewStatus: 'all',
      orderBy: 'date',
      orderDirection: 'desc',
      startDate: '',
      endDate: ''
    }
    this.displayPosts();
  }

  // (Button Action) Resets Date Filter
  resetDate() { 
    this.filters.startDate = '';
    this.filters.endDate = '';
    this.displayPosts();
  }

  // (Button Action) Opens Modal for one specific post
  viewDetails( post ){
    let modal = this.modalCtrl.create(PostDetailPage, { data: post });
    modal.onDidDismiss( res => {
      if ( typeof res != 'undefined' ) {
        this.getData();
      }
    });
    modal.present();
  }

  // (Button Action) Opens modal to create/edit a post
  openNewUserModal(){
    let modal = this.modalCtrl.create(NewPostModalPage);
    modal.onDidDismiss( data => {
      if ( typeof data != 'undefined' ) {
        this.getData();
      }
    });
    modal.present();
  }
  
} // End of Posts Page

@Component({
  selector: 'popover-filter',
  templateUrl: 'filter-popover.html'
})
export class PostFilterPopover {
  postsPage;
  constructor(private navParams: NavParams) {
    this.postsPage = this.navParams.get('homeRef');
  }
}

