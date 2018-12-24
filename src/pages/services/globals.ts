import { Injectable } from '@angular/core';
import { ToastController, LoadingController } from 'ionic-angular';

@Injectable()
export class Globals {
  userData;

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

  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
  ){}
}