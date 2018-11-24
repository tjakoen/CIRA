import { Component } from '@angular/core';
import { NavController, ModalController,PopoverController, NavParams } from 'ionic-angular';
import { AuthService } from '../services/auth.service';
import { FirebaseService } from '../services/firebase.service';
import { NewPostModalPage } from './new-post-modal/new-post-modal';
import { PostDetailPage } from './post-details/post-details';
import { LoginPage } from '../login/login';

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
  
  postData = [];
  filteredPostData = [];
  posts = [];
  
  constructor(
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private authService: AuthService,
    private firebaseService: FirebaseService,
    private helperService: HelperService,
    private popCtrl: PopoverController,

  ) {}
  
  ionViewWillEnter(){
    this.getData();
  }

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

  resetDate() { 
    this.filters.startDate = '';
    this.filters.endDate = '';
    this.displayPosts();
  }
  
  getData(){
    this.firebaseService.getPosts(this.filters.viewType)
    .then(data => {
      if (data) {
        data.map( dataMap => {
          let post = dataMap.payload.doc.data();
          this.postData.push( post );
          this.displayPosts();
        });  		
      }
    })
  }

  showFilterPopover(myEvent?: Event) {
    // Pass Post Page Refferrence to Popover Page
    let popover = this.popCtrl.create(PostFilterPopover, { cssClass: 'popover-top-right', homeRef: this });
    popover.present({
      ev: myEvent
    });
  }

  viewOwners(ev: any) {
    let val = ev.target.value;
    let userID = this.firebaseService.currentUser.uid;
    this.filters.owner = val != 'all' ? userID : val 

    this.displayPosts()
  }
   
  displayPosts() {
    this.proccessPosts( ( callback ) => {
      if ( callback ) {
        this.posts = this.filteredPostData;
        this.searchQuery = '';
      }
    });
  }

  proccessPosts( callback ) {
    this.posts= [];
    let filterdValue = this.filterPosts( this.postData );
    let orderedValue = this.helperService.sortByKey( filterdValue, this.filters.orderBy, this.filters.orderDirection );
    this.filteredPostData = orderedValue;
    callback( true );
  }

  // TODO: Improved multi-key filtering
  filterPosts( data ) {
    data = this.filters.owner != 'all' ? this.helperService.filterByKey( data, 'userID', this.filters.owner ) : data;
    data = this.filters.viewType != 'all' ? this.helperService.filterByKey( data, 'type', this.filters.viewType ) : data;
    data = this.filters.viewStatus != 'all' ? this.helperService.filterByKey( data, 'status', this.filters.viewStatus ) : data;
    data = this.filters.startDate != '' && this.filters.startDate != '' ?  this.helperService.filterByDate( data, this.filters.startDate, this.filters.endDate ) : data;
    return data;
  }


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


  viewDetails( post ){  
    this.navCtrl.push(PostDetailPage, {
      data: post
    })
  }

  openNewUserModal(){
    let modal = this.modalCtrl.create(NewPostModalPage);
    modal.onDidDismiss( data => {
      if ( typeof data != 'undefined' ) {
        this.postData = [];
        this.displayPosts();
      }
    });
    modal.present();
  }

  logout(){
    this.authService.doLogout()
    .then(res => {
      this.navCtrl.push(LoginPage);
    })
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

