import { Injectable } from '@angular/core';
import { ToastController, LoadingController, normalizeURL } from 'ionic-angular';
import { ImagePicker } from '@ionic-native/image-picker';
import { FirebaseService } from './firebase.service';

@Injectable()
export class Globals {
  userData;

  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private imagePicker: ImagePicker,
    private firebaseService: FirebaseService,
  ){}

  showToast( message) {
    const toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

  presentLoadingTillNextScreen( message ) {
    this.loadingCtrl.create({
      content: message,
      dismissOnPageChange: true
    }).present();
  }

  presentLoading( message, duration ) {
    this.loadingCtrl.create({
      content: message,
      duration: duration,
    }).present();
  }

  uploadImage(){
    return new Promise<any>((resolve, reject) => {
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
                let image = normalizeURL(results[i])
                let randomId = Math.random().toString(36).substr(2, 5);
                //uploads img to firebase storage
                this.firebaseService.uploadImage(image, randomId)
                  .then(photoURL => {
                    resolve({ image:photoURL })
                });
              }
            }, (err) => console.log(err)
          );
        }
      }, (err) => {
        console.log(err);
        reject();
      });
    })
  }
}