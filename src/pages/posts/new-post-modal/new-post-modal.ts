import { Component } from '@angular/core';
import { ViewController, normalizeURL, ToastController, LoadingController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';
import { ImagePicker } from '@ionic-native/image-picker';
import { Globals } from '../../services/globals';

@Component({
  selector: 'page-new-post-modal',
  templateUrl: 'new-post-modal.html'
})
export class NewPostModalPage {

  validations_form: FormGroup;
  image: any;
  loading: any;

  postData;
  update = false;
  myDate:String;
  myTime:String;
  
  constructor(
    private viewCtrl: ViewController,
    private toastCtrl: ToastController,
    private formBuilder: FormBuilder,
    private firebaseService: FirebaseService,
    private loadingCtrl: LoadingController,
    private params: NavParams,
    private globals: Globals,
  ) {
    this.loading = this.loadingCtrl.create();
    this.postData =  params.get('data') 
  }

  ionViewWillLoad(){
    this.resetFields()
    if ( typeof this.postData != 'undefined' ) {
      this.update = true;
      this.setFields( this.postData )
    }
  }

  setFields( data ) {
    this.image = data.imageURL;
    this.myDate = data.date;
    this.myTime = data.time;
    this.validations_form = this.formBuilder.group({
      date: [data.date, Validators.required],
      time: [data.time, Validators.required],
      type: [data.type, Validators.required],
      name: [data.name, Validators.required],
      description: [data.description, Validators.required],
      location: [data.location, Validators.required],
    })
  }

  resetFields(){
    this.image = "./assets/imgs/default-image.png";
    this.myDate = new Date().toISOString();
    this.myTime = new Date().toISOString();
    this.validations_form = this.formBuilder.group({
      date: new FormControl('', Validators.required),
      time: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      location: new FormControl('', Validators.required),
    });
  }

  dismiss( data? ) {
    this.resetFields();
    this.viewCtrl.dismiss( data );
  }

  onSubmit( value ){
    // let value = {
    //   date: value.date,
    //   time: value.time,
    //   type: value.type,
    //   name: value.name,
    //   description: value.description,
    //   location: value.location,
    //   imageURL: this.image
    // }
    value.imageUrl = this.image
    if ( this.update ) {
      this.firebaseService.updatePost(value, this.postData.documentId)
       .then(
          res => {
            this.dismiss({data: res.data});
        });
    } else {
        this.firebaseService.createPost(value)
        .then(
          res => {
            this.dismiss();
        });
      }
  }

  openImagePicker(){
    this.loading.present()
    this.globals.uploadImage()
    .then( res => {
      this.image = res.image;
      this.loading.dismiss()
      let toast = this.toastCtrl.create({
        message: 'Image was updated successfully',
        duration: 3000
      });
      toast.present();
    }, err => {
      this.loading.dismiss()
    })
  }

}
