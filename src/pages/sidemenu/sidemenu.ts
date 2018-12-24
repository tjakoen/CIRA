import { TabsPage } from '../tabs/tabs';
import { RegisterPage } from '../login/register/register';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Nav } from 'ionic-angular';
 
@Component({
  templateUrl: 'sidemenu.html',
})
export class SideMenuPage {
  // Basic root for our content view
  rootPage = TabsPage;
 
  // Reference to the app's root nav
  @ViewChild(Nav) nav: Nav;
  constructor(public navCtrl: NavController) {}
 
    openPage( page ) {
        console.log("THIS" + page)
        switch ( page ) {
            case 'User Info':
                this.navCtrl.push(RegisterPage);
                break;
        } 
    }
 
}