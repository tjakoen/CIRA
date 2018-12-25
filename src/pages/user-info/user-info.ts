import { Component } from '@angular/core';
import { ViewController, normalizeURL, ModalController, ToastController,  LoadingController } from 'ionic-angular';
import { ImagePicker } from '@ionic-native/image-picker';
import { FirebaseService } from '../services/firebase.service';
import { EditUserModal } from './edit-user-modal/edit-user-modal';
import * as firebase from 'firebase/app';
import { Globals } from '../services/globals'

@Component({
  templateUrl: 'user-info.html'
})
export class UserInfoPage {

  currentUser = firebase.auth().currentUser;
  image: any;
  user: any;
  loading: any;

  constructor(
    private viewCtrl: ViewController,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private firebaseService: FirebaseService,
    private globals: Globals,
  ) {
    this.loading = this.loadingCtrl.create();
  }

  ionViewWillLoad(){
    this.getData()
  }

  getData(){
    this.user = this.globals.userData;
    this.image = this.user.imageURL;
  }

  dismiss() {
   this.viewCtrl.dismiss();
  }

  editUserModal(){
    let modal = this.modalCtrl.create( EditUserModal, {data: this.globals.userData} );
    modal.onDidDismiss( data => {
      if ( typeof data != 'undefined' ) {
        this.getData()
      }
    });
    modal.present();
  }

}
