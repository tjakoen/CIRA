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
    private toastCtrl: ToastController,
    private imagePicker: ImagePicker,
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

  openImagePicker(){
    this.imagePicker.hasReadPermission()
    .then((result) => {
      if(result == false){
        // no callbacks required as this opens a popup which returns async
        this.imagePicker.requestReadPermission();
      }
      else if(result == true){
        this.imagePicker.getPictures({
          maximumImagesCount: 1
        }).then(
          (results) => {
            for (var i = 0; i < results.length; i++) {
              this.uploadImageToFirebase(results[i]);
            }
          }, (err) => console.log(err)
        );
      }
    }, (err) => {
      console.log(err);
    });
  }

  uploadImageToFirebase(image){
    this.loading.present();
    image = normalizeURL(image);
    let randomId = Math.random().toString(36).substr(2, 5);
    console.log(randomId);

    //uploads img to firebase storage
    this.firebaseService.uploadImage(image, randomId)
    .then(photoURL => {
      this.image = photoURL;
      this.loading.dismiss();
      let toast = this.toastCtrl.create({
        message: 'Image was updated successfully',
        duration: 3000
      });
      toast.present();
    })
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
