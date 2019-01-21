import { Injectable } from '@angular/core';
import { ToastController, LoadingController, normalizeURL, AlertController } from 'ionic-angular';
import { ImagePicker } from '@ionic-native/image-picker';
import { FirebaseService } from './firebase.service';
// import { LocalNotifications } from '@ionic-native/local-notifications';


@Injectable()
export class Globals {
  userData;

  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private imagePicker: ImagePicker,
    private firebaseService: FirebaseService,
    private alertCtrl: AlertController,
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
              this.showToast( 'Here');
              for (var i = 0; i < results.length; i++) {
                let image = normalizeURL(results[i])
                let randomId = Math.random().toString(36).substr(2, 5);
                //uploads img to firebase storage

                this.showToast( 'Here 2');
                this.firebaseService.uploadImage(image, randomId)
                  .then(photoURL => {
                    resolve({ image:photoURL })
                });
              }
            }, (err) => {
              console.log(err);
              this.showToast( 'Here 3');
              reject();
            }
          );
        }
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
  //       every: { hour: 12, minute: 0} 
  //     }
  //   };

  //   this.localNotifications.schedule(dailyNotification);
  // }


}