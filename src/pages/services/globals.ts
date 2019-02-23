import { Injectable } from '@angular/core';
import { ToastController, LoadingController, normalizeURL, AlertController } from 'ionic-angular';
import { ImagePicker } from '@ionic-native/image-picker';
import { FirebaseService } from './firebase.service';
// import { LocalNotifications } from '@ionic-native/local-notifications';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Injectable()
export class Globals {
  userData;

  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private imagePicker: ImagePicker,
    private firebaseService: FirebaseService,
    private alertCtrl: AlertController,
    private camera: Camera,
    // private localNotifications:LocalNotifications,
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

  showYesNoConfirmDialog( title, message, callback ) {
    let confirm = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: [
        {
          text: 'No',
          handler: () => { callback( false ) }
        },
        {
          text: 'Yes',
          handler: () => { callback( true ) }
        }
      ]
    });
    confirm.present();
  }


  uploadImage(){
    return new Promise<any>((resolve, reject) => {
      
      const options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.FILE_URI,
        encodingType: this.camera.EncodingType.JPEG,
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
        saveToPhotoAlbum: false,
      }

      this.camera.getPicture(options).then((imageData) => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64 (DATA_URL):

          // let base64Image = 'data:image/jpeg;base64,' + imageData;
          // let image = normalizeURL(base64Image);
        console.log(imageData);
          let image = normalizeURL(imageData);
          let randomId = Math.random().toString(36).substr(2, 5);
          //uploads img to firebase storage
          this.showToast( 'Photo Uploading');
          this.firebaseService.uploadImage(image, randomId)
            .then(photoURL => {
              resolve({ image:photoURL })
          }, (err) => {
            console.log(err);
            reject();
          });
        }, (err) => {
          console.log(err);
          reject();
        });
    })
  }

  // setNotification() {
  //   let dailyNotification = {
  //     id: 1,
  //     title: 'You have Drafts Waiting for you',
  //     text: 'You have drafts waiting',
  //     trigger: { 
  //       firstAt: new Date(),
  //       every: { hour: 4, minute: 0} 
  //     }
  //   };

  //   this.localNotifications.schedule(dailyNotification);
  // }


}