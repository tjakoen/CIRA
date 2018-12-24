import { TabsPage } from '../tabs/tabs';
import { UserInfoPage } from '../user-info/user-info';
import { Component, ViewChild } from '@angular/core';
import { NavController, Nav, AlertController } from 'ionic-angular';
import { AuthService } from '../services/auth.service';
import { Globals } from '../services/globals';
import { LoginPage } from '../login/login';

@Component({
  templateUrl: 'sidemenu.html',
})
export class SideMenuPage {
    // Basic root for our content view
    rootPage = TabsPage;
    
    // Reference to the app's root nav
    @ViewChild(Nav) nav: Nav;
    constructor(
        private navCtrl: NavController,
        private alertCtrl: AlertController,
        private authService: AuthService,
        private globals: Globals,
    ) {}
 
    openPage( page ) {
        switch ( page ) {
            case 'User Info':
                this.navCtrl.push(UserInfoPage);
                break;
            case 'Change Login':
                this.resetEmail();
                break;
            case 'Change Password':
                this.resetPassword();
                break;
            case 'Log Out':
                this.logout();
                break;
        } 
    }

    logout(){
        this.authService.doLogout()
        .then(res => {
          this.navCtrl.push(LoginPage);
        })
    }


    resetPassword() {
        let confirm = this.alertCtrl.create({
            title: 'Send Password Reset Email',
            message: 'Are you sure you would like to reset your password',
            buttons: [
              {
                text: 'No',
                handler: () => {}
              },
              {
                text: 'Yes',
                handler: () => {
                    this.authService.sendPasswordResetEmail().then(() => {
                        this.globals.showToast( 'Reset Password Email Sent' )
                    });   
                }
              }
            ]
        });
        confirm.present();
    }

    resetEmail() {
        const prompt = this.alertCtrl.create({
            title: 'Reset Email',
            message: "Enter the feilds below to reset your email",
            inputs: [
                {
                    name: 'New Email',
                    placeholder: 'Enter your new email',
                    type: 'email',
                },
                {
                    name: 'Password',
                    placeholder: 'Enter your password',
                    type: 'password',
                },
            ],
            buttons: [
                {
                text: 'Cancel',
                handler: data => {
                    console.log( 'Cancel clicked' );
                }
                },
                {
                text: 'Save',
                handler: data => {
                    this.authService.sendEmailChangeEmail( data['New Email'], data['Password'] )
                    .then( res  => {
                        this.logout();
                        this.globals.showToast( 'Check your email to verify your new email' );
                    }, err => {
                        this.globals.showToast( 'Invalid Credentials' );
                    });
                    
                }
                }
            ]
        });
        prompt.present();
    }
}