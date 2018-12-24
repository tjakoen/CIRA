import { Component } from '@angular/core';
import { NavController, ToastController, AlertController, ModalController, LoadingController } from 'ionic-angular';

import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { FirebaseService } from '../services/firebase.service';

import { RegisterPage } from './register/register';
import { SideMenuPage } from '../sidemenu/sidemenu';
import { EditUserModal } from '../user-info/edit-user-modal/edit-user-modal';

import { AuthService } from '../services/auth.service';
import { Globals } from '../services/globals'

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  logoURL = "assets/imgs/pnp-logo.png";

  validations_form: FormGroup;
  errorMessage: string = '';

  validation_messages = {
   'email': [
     { type: 'required', message: 'Email is required.' },
     { type: 'pattern', message: 'Please enter a valid email.' }
   ],
   'password': [
     { type: 'required', message: 'Password is required.' },
     { type: 'minlength', message: 'Password must be at least 5 characters long.' }
   ]
 };

  constructor(
    private navCtrl: NavController,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private firebaseService: FirebaseService,
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private globals: Globals,
  ) {}

  ionViewWillLoad(){
    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
    });
  }

  tryLogin( value ){
    this.presentLoading();
    this.authService.doLogin(value)
    .then(login => {
      if ( !login.user.emailVerified ) {
        this.showVerificationDialog();
      } else {
        this.firebaseService.getUserDetails(login.user.uid)
        .then( res => {
          let userData = res.userData
          if ( userData.infoSet == true  ) {
            this.globals.userData = userData;
            this.navCtrl.push(SideMenuPage);
          } else {
            this.openEditUser(login.user.uid)
          }
        }, err => {
          this.errorMessage = err.message;
        });        
      }
    }, err => {
      this.errorMessage = err.message;
    })
  }

  goRegisterPage(){
    this.navCtrl.push(RegisterPage);
  }

  showVerificationDialog() {
    let confirm = this.alertCtrl.create({
      title: 'Confirm',
      message: 'Account is not verified',
      buttons: [
        {
          text: 'Close',
          handler: () => {}
        },
        {
          text: 'Resend Verification Email',
          handler: () => {
            this.authService.sendVerificationEmail()
            .then(res => {
              this.showToast('Verification Email Sent')
            });
          }
        }
      ]
    });
    confirm.present();
  }

  showToast( message) {
    const toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

  openEditUser( uid ) {
    this.showToast("Please Enter the following information to procceed")
    let modal = this.modalCtrl.create(EditUserModal, {uid: uid});
    modal.onDidDismiss( data => {
      if ( data.success ) {
        this.navCtrl.push(SideMenuPage);
      }
    });
    modal.present();
  }

  presentLoading() {
    this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    }).present();
  }

}
