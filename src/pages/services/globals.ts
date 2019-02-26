import { Injectable } from '@angular/core';
import { ToastController, LoadingController, AlertController } from 'ionic-angular';
import { ImagePicker } from '@ionic-native/image-picker';
import { FirebaseService, Upload } from './firebase.service';
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