import { Component } from '@angular/core';
import { ViewController, normalizeURL, ModalController, ToastController, NavParams, AlertController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';
import { NewPostModalPage } from '../new-post-modal/new-post-modal';
import * as firebase from 'firebase/app';

@Component({
  templateUrl: 'post-details.html'
})
export class PostDetailPage {

  currentUser = firebase.auth().currentUser;
  validations_form: FormGroup;
  image: any;
  post: any;
  loading: any;
  update = false;

  constructor(
    private params: NavParams,
    private alertCtrl: AlertController,
    private viewCtrl: ViewController,
    private formBuilder: FormBuilder,
    private firebaseService: FirebaseService,
    private modalCtrl: ModalController,
  ) {}

  ionViewWillLoad(){
    this.getData()
  }

  // Set Displayed Data
  getData(){
    this.post = this.params.get('data');
    this.image = this.post.imageURL;
    this.validations_form = this.formBuilder.group({
      title: new FormControl(this.post.title, Validators.required),
      description: new FormControl(this.post.description, Validators.required)
    });
  }

  // (Button Action) Delete Post - Only shows if user is the owner
  delete() {
    let confirm = this.alertCtrl.create({
      title: 'Confirm',
      message: 'Do you want to delete ' + this.post.type + ' Report?',
      buttons: [
        {
          text: 'No',
          handler: () => {}
        },
        {
          text: 'Yes',
          handler: () => {
            this.firebaseService.deletePost(this.post.documentId)
            .then(
              res => this.viewCtrl.dismiss(),
              err => console.log(err)
            )
          }
        }
      ]
    });
    confirm.present();
  }

  // (Button Action) Edit Post - Only Shows if user is the owner)
  edit(){
    let modal = this.modalCtrl.create( NewPostModalPage, { data: this.post } );
    modal.onDidDismiss( res => {
      if ( typeof res != 'undefined' ) {
        this.post = res.data;
        this.update = true;
      }
    });
    modal.present();
  }

  dismiss() {
    if ( this.update ) {
      this.viewCtrl.dismiss({ update: true });
    } else {
      this.viewCtrl.dismiss()
    } 
  }
}
