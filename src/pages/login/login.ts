import { Component } from '@angular/core';
import { NavController, AlertController, ModalController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { SideMenuPage } from '../sidemenu/sidemenu';

import { EditUserModal } from '../user-info/user-info';
import { UserInfoService } from '../user-info/user-info.service';

import { AuthService } from '../services/auth.service';
import { Globals } from '../services/globals'

@Component({
  selector: './templates/page-login',
  templateUrl: './templates/login.html'
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
    private alertCtrl: AlertController,
    private userInfoService: UserInfoService,
    private modalCtrl: ModalController,
    private globals: Globals,
  ) {}

  ionViewWillLoad(){
    this.validations_form = this.formBuilder.group({

      email: new FormControl('', Validators.compose([
        Validators.required,
        //Validators.pattern('^[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$')
      ])),

      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
    });

  }

  tryLogin( value ){
    this.authService.doLogin(value)
    .then(login => {
      if ( !login.user.emailVerified ) {
        this.showVerificationDialog();
      } else {
        this.globals.presentLoadingTillNextScreen('Logging you in...');
        this.userInfoService.getUserDetails(login.user.uid)
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
          console.log(err.message)
        });        
      }
    }, err => {
      this.errorMessage = err.message;
      console.log(err.message)
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
          text: 'Send Verification Email',
          handler: () => {
            this.authService.sendVerificationEmail()
            .then(res => {
              this.globals.showToast('Verification Email Sent')
            });
          }
        }
      ]
    });
    confirm.present();
  }

  openEditUser( uid ) {
    this.globals.showToast("Please enter the following information to procceed")
    let modal = this.modalCtrl.create(EditUserModal, {uid: uid});
    modal.onDidDismiss( data => {
      if ( data.success ) {
        this.navCtrl.push(SideMenuPage);
      }
    });
    modal.present();
  }
}

@Component({
  selector: './templates/page-register',
  templateUrl: './templates/register.html'
})
export class RegisterPage {
  validations_form: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  validation_messages = {
   'email': [
     { type: 'required', message: 'Email is required.' },
     { type: 'pattern', message: 'Enter a valid email.' }
   ],
   'password': [
     { type: 'required', message: 'Password is required.' },
     { type: 'minlength', message: 'Password must be at least 5 characters long.' }
   ]
 };

  constructor(
    private navCtrl: NavController,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {}

  ionViewWillLoad(){
    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        //Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),

      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
    });

  }

  tryRegister(value){
    this.authService.doRegister(value)
     .then(res => {
       console.log(res);
       this.errorMessage = "";
       this.successMessage = "Your account has been created. Please log in.";
     }, err => {
       console.log(err);
       this.errorMessage = err.message;
       this.successMessage = "";
     })
  }

  goLoginPage(){
    this.navCtrl.pop();
  }

}
