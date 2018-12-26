import { Component } from '@angular/core';
import { ViewController, LoadingController, ModalController,PopoverController, NavParams, AlertController, } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { FirebaseService } from '../services/firebase.service';
import { PostsService } from './posts.service'

import { HelperService } from '../services/helpers.service';
import { Globals } from '../services/globals';


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

postData = [];  // Raw Data
filteredPostData = [];
posts = [];

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

// Gets Post Data
getData(){
  this.postData = [];
  this.postsService.getPosts(this.filters.viewType)
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
  let modal = this.modalCtrl.create(PostDetailModal, { data: post });
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
  modal.onDidDismiss( res => {
    console.log( res );
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
export class PostDetailModal {
validations_form: FormGroup;
post: any;
update = false;
isCurrentUser = false;

constructor(
  private params: NavParams,
  private alertCtrl: AlertController,
  private viewCtrl: ViewController,
  private formBuilder: FormBuilder,
  private firebaseService: FirebaseService,
  private postsService: PostsService,
  private modalCtrl: ModalController,
  private globals: Globals,
) {
  this.post = this.params.get('data');
  this.isCurrentUser = this.firebaseService.getCurrentUser().uid == this.post.userId ? true : false;
}

ionViewWillLoad(){
  this.setData()
}

// Set Displayed Data
setData(){
  this.validations_form = this.formBuilder.group({
    title: new FormControl(this.post.title, Validators.required),
    description: new FormControl(this.post.description, Validators.required)
  });
}

// (Button Action) Delete Post - Only shows if user is the owner
delete() {
  let confirm = this.alertCtrl.create({
    title: 'Confirm',
    message: 'Do you want to delete ' + this.post.type + ' Report?',
    buttons: [
      {
        text: 'No',
        handler: () => {}
      },
      {
        text: 'Yes',
        handler: () => {
          this.postsService.deletePost(this.post.documentId)
          .then(
            res => {
              this.update = true;
              this.dismiss();
              this.globals.showToast("Post Successfully Deleted");
            },
            err => console.log(err)
          )
        }
      }
    ]
  });
  confirm.present();
}

// (Button Action) Edit Post - Only Shows if user is the owner)
edit(){
  let modal = this.modalCtrl.create( NewPostModalPage, { data: this.post } );
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

postData;
update = false;
myDateTime:String;

constructor(
  private params: NavParams,
  private viewCtrl: ViewController,
  private formBuilder: FormBuilder,
  private firebaseService: FirebaseService,
  private postsService: PostsService,
  private loadingCtrl: LoadingController,
  private globals: Globals,
) {
  this.loading = this.loadingCtrl.create();
  this.postData =  params.get( 'data' ) 
}

ionViewWillLoad() {
  this.resetFields()
  if ( typeof this.postData != 'undefined' ) {
    this.update = true;
    this.setFields( this.postData )
  }
}

setFields( data ) {
  this.image = data.imageUrl;
  this.myDateTime = data.date;
  this.validations_form = this.formBuilder.group({
    dateTime: [data.dateTime, Validators.required],
    type: [data.type, Validators.required],
    name: [data.name, Validators.required],
    description: [data.description, Validators.required],
    location: [data.location, Validators.required],
  })
}

resetFields(){
  this.image = "./assets/imgs/default-image.png";
  this.myDateTime = new Date().toISOString();
  this.validations_form = this.formBuilder.group({
    dateTime: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required),
  });
}

dismiss( data ) {
  this.viewCtrl.dismiss({ data: data });
}

onSubmit( value ){
  value.imageUrl = this.image
  if ( this.update ) {
    this.postsService.updatePost(value, this.postData.documentId)
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