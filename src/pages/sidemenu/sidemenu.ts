import { TabsPage } from '../tabs/tabs';
import { UserInfoPage } from '../user-info/user-info';
import { Component, ViewChild } from '@angular/core';
import { NavController, Nav, ModalController } from 'ionic-angular';
 
@Component({
  templateUrl: 'sidemenu.html',
})
export class SideMenuPage {
    // Basic root for our content view
    rootPage = TabsPage;
    
    // Reference to the app's root nav
    @ViewChild(Nav) nav: Nav;
    constructor(
        public navCtrl: NavController,
        public modalCtrl: ModalController,
    ) {}
 
    openPage( page ) {
        switch ( page ) {
            case 'User Info':
                this.navCtrl.push(UserInfoPage);
                break;
        } 
    }
}