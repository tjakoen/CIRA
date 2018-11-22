import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { AuthService } from '../services/auth.service';
import { FirebaseService } from '../services/firebase.service';
import { NewPostModalPage } from '../new-post-modal/new-post-modal';
import { DetailsPage } from '../details/details';
import { LoginPage } from '../login/login';

import { HelperService } from '../services/helpers';

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html'
})

export class MenuPage {

  viewType: string;
  viewMode: string;
  orderBy: string;
  orderDirection: string;
  
  postData = []
  posts = [];
  


  constructor(
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private authService: AuthService,
    private firebaseService: FirebaseService,
    private helperService: HelperService,
  ) {
    this.viewMode = "gallery";
    this.viewType = 'all';
    this.orderBy = 'date';
    this.orderDirection = 'desc';
  }
  
  ionViewWillEnter(){
    this.getData();
    this.proccessPosts();
  }


  proccessPosts() {
    let filterdValue = this.viewType == 'all' ? this.helperService.filterByKey( this.postData ) : this.helperService.filterByKey( this.postData, this.viewType );
    let orderedValue = this.helperService.sortByKey( filterdValue, this.orderBy, this.orderDirection );
    this.posts = orderedValue;
  }



  getData(){
    this.firebaseService.getPosts(this.viewType)
    .then(data => {
      if (data) {
        data.map( dataMap => {
          let post = dataMap.payload.doc.data();
          this.postData.push( post );
        });  		
      }
    })
  }
  
  viewDetails(post){
    // debugger
    let data = {
      date: post.date,
      time: post.time,
      type: post.type,
      name: post.name,
      description: post.description,
      location: post.location,
      imageURL: post.imgURL,
      userID: post.userID
    }
    
    this.navCtrl.push(DetailsPage, {
      data: data
    })
  }

  openNewUserModal(){
    let modal = this.modalCtrl.create(NewPostModalPage);
    modal.onDidDismiss( data => {
      this.posts = [];
      this.getData();
    });
    modal.present();
  }

  logout(){
    this.authService.doLogout()
    .then(res => {
      this.navCtrl.push(LoginPage);
    })
  }

}
