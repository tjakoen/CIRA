import { Component } from '@angular/core';
import { ViewController, LoadingController, ModalController,PopoverController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { FirebaseService } from '../services/firebase.service';
import { PostsService } from './posts.service'

import { HelperService } from '../services/helpers.service';
import { Globals } from '../services/globals';

import { Post } from './post.model';

@Component({
selector: './templates/page-posts',
templateUrl: './templates/posts.html'
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

postData:Post[] = [];  // Raw Data
filteredPostData:Post[] = [];
posts:Post[] = [];

documentId:string;

constructor(
  private modalCtrl: ModalController,
  private firebaseService: FirebaseService,
  private helperService: HelperService,
  private postsService: PostsService,
  private popCtrl: PopoverController,
) {}

ionViewWillEnter(){
  this.getData();
}

// Gets Data
getData(){
  this.postData = [];
  this.postsService.getPosts(this.filters.viewType)
  .then(data => {
    if (data) {
      data.map( dataMap => {
        let post = dataMap.payload.doc.data();
        post.documentId = dataMap.payload.doc.id;
        this.postData.push( post );
      });  		
    }
    this.displayPosts();
  })
}

// Displays Data
displayPosts() {
  this.posts = [];
  this.proccessPosts( ( callback ) => {
    if ( callback ) {
      this.posts = this.filteredPostData;
      this.searchQuery = '';
    }
  });
}
// Filters Displayed Data
proccessPosts( callback ) {
  this.filteredPostData = [];
  let filterdValue = this.filterPosts( this.postData );
  let orderedValue = this.helperService.sortByKey( filterdValue, this.filters.orderBy, this.filters.orderDirection );
  this.filteredPostData = orderedValue;
  callback( true );
}

// TODO: Improved multi-key filtering
// Filters data based on each set key
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

// (Button Action) Opens Modal to view data of one item
viewDetails( post ){
  let modal = this.modalCtrl.create(PostDetailsModal, { data: post });
  modal.onDidDismiss( res => {
    if ( typeof res != 'undefined' ) {
      this.getData();
    }
  });
  modal.present();
}

// (Button Action) Opens modal to create/edit data
openNewPostModal(){
  let modal = this.modalCtrl.create(NewPostModalPage);
  modal.onDidDismiss( res => {
    if ( typeof res != 'undefined' ) {
      this.getData();
    }
  });
  modal.present();
}

} // End of Posts Page

@Component({
templateUrl: './templates/filter-popover.html'
})
export class PostFilterPopover {
postsPage;
constructor(private navParams: NavParams) {
  this.postsPage = this.navParams.get('homeRef');
}
}

@Component({
templateUrl: './templates/post-details-modal.html'
})
export class PostDetailsModal {
  post: Post;

  update = false;
  isCurrentUser = false;

  
  constructor(
    private params: NavParams,
    private viewCtrl: ViewController,
    private firebaseService: FirebaseService,
    private postsService: PostsService,
    private modalCtrl: ModalController,
    private globals: Globals,
  ) {
    this.post = this.params.get('data');
    this.isCurrentUser = this.firebaseService.getCurrentUser().uid == this.post.userId ? true : false;
  }

  ionViewWillLoad(){}

  // (Button Action) Edit Item - Only Shows if user is the owner
  edit(){
    let modal = this.modalCtrl.create( NewPostModalPage, { data: this.post, id: this.post.documentId } );
    modal.onDidDismiss( res => {
      if ( typeof res != 'undefined' ) {
        let data = res.data
        this.post = data.data;
        this.update = true;
        this.globals.showToast("Post Successfully Updated");
      }
    });
    modal.present();
  }

  // (Button Action) Delete Item - Only shows if user is the owner
  delete() {
    this.globals.showYesNoConfirmDialog( 'Confirm', `Do you want to delete ${this.post.type} Report?`, confirm => {
      if ( confirm ) {
        this.postsService.deletePost(this.post.documentId)
        .then(
          res => {
            this.update = true;
            this.dismiss();
            this.globals.showToast("Post Successfully Deleted");
          },
          err => console.log(err)
        );
      }
    });
  }

  dismiss() {
    if ( this.update ) {
      this.viewCtrl.dismiss({ update: true });
    } else {
      this.viewCtrl.dismiss();
    } 
  }
}

@Component({
templateUrl: './templates/new-post-modal.html'
})
export class NewPostModalPage {

  validations_form: FormGroup;
  image: any;
  loading: any;

  update = false;
  myDateTime:String;
  documentId:string;

  constructor(
    private params: NavParams,
    private viewCtrl: ViewController,
    private formBuilder: FormBuilder,
    private postsService: PostsService,
    private loadingCtrl: LoadingController,
    private globals: Globals,
  ) {
    this.loading = this.loadingCtrl.create();
  }

  ionViewWillLoad() {
    let post = this.params.get( 'data' );
    if ( typeof post != 'undefined' ) {
      this.documentId = post.documentId;
      this.update = true;
      this.setFields( this.update, post )
    } else {
      this.setFields();
    }
  }

  setFields( update = false, data? ) {
    this.image = update ? data.imageUrl : './assets/imgs/default-image.png';
    this.myDateTime = update ? data.date : new Date().toISOString();

    this.validations_form = this.formBuilder.group({
      dateTime: [update ? data.dateTime : '', Validators.required],
      type: [update ? data.type : '', Validators.required],
      name: [update ? data.name : '', Validators.required],
      status: [update ? data.status: 'unsolved'],
      description: [ update ? data.description : '', Validators.required],
      location: [update ? data.location : '', Validators.required],
    })
  }

  dismiss( data ) {
    this.viewCtrl.dismiss({ data: data });
  }

  onSubmit( value ){
    value.imageUrl = this.image
    if ( this.update ) {
      this.postsService.updatePost(value, this.documentId)
        .then(
          res => {
            this.dismiss({data: res.data});
        });
    } else {
        this.postsService.createPost(value)
        .then(
          res => {
            this.dismiss({data: res.data});
        });
      }
  }

  openImagePicker() {
    this.loading.present()
    this.globals.uploadImage()
    .then( res => {
      this.image = res.image;
      this.loading.dismiss()
      this.globals.showToast('Image was uploaded successfully');
    }, err => {
      this.loading.dismiss()
    })
  }

}