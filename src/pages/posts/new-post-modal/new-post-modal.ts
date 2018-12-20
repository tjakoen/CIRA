import { Component } from '@angular/core';
import { ViewController, normalizeURL, ToastController, LoadingController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';
import { ImagePicker } from '@ionic-native/image-picker';

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

  myDate: String = new Date().toISOString();
  myTime: String = new Date().toISOString();

  constructor(
    private viewCtrl: ViewController,
    private toastCtrl: ToastController,
    private formBuilder: FormBuilder,
    private imagePicker: ImagePicker,
    private firebaseService: FirebaseService,
    private loadingCtrl: LoadingController,
    private params: NavParams,
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
    this.validations_form = this.formBuilder.group({
      date: new FormControl('', Validators.required),
      time: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      location: new FormControl('', Validators.required),
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  onSubmit(value){
    let data = {
      date: value.date,
      time: value.time,
      type: value.type,
      name: value.name,
      description: value.description,
      location: value.location,
      imageURL: this.image
    }
    this.firebaseService.createPost(data)
    .then(
      res => {
        this.resetFields();
        this.viewCtrl.dismiss({success: true});
      }
    )
    
    if ( this.update ) {
      this.firebaseService.updatePost(data, this.postData)
      .then(
        res => {
          this.resetFields();
          this.viewCtrl.dismiss({success: true});
        }
      )
    } else {
      this.firebaseService.createPost(data)
      .then(
        res => {
          this.resetFields();
          this.viewCtrl.dismiss({success: true});
        }
      )
    }


  }

  openImagePicker(){
    this.imagePicker.hasReadPermission()
    .then((result) => {
      if(result == false){
        // no callbacks required as this opens a popup which returns async
        this.imagePicker.requestReadPermission();
      }
      else if(result == true){
        this.imagePicker.getPictures({
          maximumImagesCount: 1
        }).then(
          (results) => {
            for (var i = 0; i < results.length; i++) {
              this.uploadImageToFirebase(results[i]);
            }
          }, (err) => console.log(err)
        );
      }
    }, (err) => {
      console.log(err);
    });
  }

  uploadImageToFirebase(image){
    this.loading.present();
    image = normalizeURL(image);
    let randomId = Math.random().toString(36).substr(2, 5);

    //uploads img to firebase storage
    this.firebaseService.uploadImage(image, randomId)
    .then(photoURL => {
      this.image = photoURL;
      this.loading.dismiss();
      let toast = this.toastCtrl.create({
        message: 'Image was updated successfully',
        duration: 3000
      });
      toast.present();
      })
  }

}
