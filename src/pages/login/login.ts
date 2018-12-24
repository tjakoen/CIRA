import { Component } from '@angular/core';
import { NavController, ToastController, AlertController } from 'ionic-angular';

import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { FirebaseService } from '../services/firebase.service';

import { RegisterPage } from './register/register';
import { SideMenuPage } from '../sidemenu/sidemenu';

import { AuthService } from '../services/auth.service';


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

  tryLogin(value){
    this.authService.doLogin(value)
    .then(res => {
      if ( !res.user.emailVerified ) {
        this.showVerificationDialog();
      } else {
        this.firebaseService.getUserDetails(res.user.uid)
        .then( res => {
          if ( res.userData.infoSet ) {
            localStorage.setItem('userData', res.userData);
            this.navCtrl.push(SideMenuPage);
          } else {
            console.log("Set the data");
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
              this.showVerificationConfirm()
            });
          }
        }
      ]
    });
    confirm.present();
  }

  showVerificationConfirm() {
    const toast = this.toastCtrl.create({
      message: 'Verification Email Sent',
      duration: 3000
    });
    toast.present();
  }

}
