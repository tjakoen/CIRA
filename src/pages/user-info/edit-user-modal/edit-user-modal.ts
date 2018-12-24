import { Component } from '@angular/core';
import { ViewController, normalizeURL, ToastController, LoadingController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';
import { ImagePicker } from '@ionic-native/image-picker';
import { Globals } from '../../services/globals'

@Component({
  templateUrl: 'edit-user-modal.html'
})
export class EditUserModal {

  validations_form: FormGroup;
  image: any;
  loading: any;
  userData;
  userId;


  constructor(
    private viewCtrl: ViewController,
    private toastCtrl: ToastController,
    private formBuilder: FormBuilder,
    private imagePicker: ImagePicker,
    private firebaseService: FirebaseService,
    private loadingCtrl: LoadingController,
    private params: NavParams,
    private globals: Globals,
  ) {
    this.loading = this.loadingCtrl.create();
    this.userData =  params.get('data') 
    this.userId = params.get('uid') 
  }

  ionViewWillLoad(){
    this.resetFields()
    if ( typeof this.userData != 'undefined' ) {
      this.setFields( this.userData )
    }
  }

  setFields( data ) {
    this.image = data.imageURL;
    this.validations_form = this.formBuilder.group({
        name: [data.name, Validators.required],
        rank: [data.rank, Validators.required],
        phone: [data.phone, Validators.required],
        email: [data.email, Validators.required],
        birthDate: [data.birthDate, Validators.required],
        station: [data.station, Validators.required],
        stationPhone: [data.stationPhone, Validators.required],
        cheifName: [data.cheifName, Validators.required],
    })
  }

  resetFields(){
    this.image = "./assets/imgs/default-image.png";
    this.validations_form = this.formBuilder.group({
        name: new FormControl('', Validators.required),
        rank: new FormControl('', Validators.required),
        phone: new FormControl('', Validators.required),
        email: new FormControl('', Validators.required),
        birthDate: new FormControl('', Validators.required),
        station: new FormControl('', Validators.required),
        stationPhone: new FormControl('', Validators.required),
        cheifName: new FormControl('', Validators.required),
    });
  }

  dismiss() {
    this.viewCtrl.dismiss({success: false});
  }

  onSubmit(value){
    let data = {
        name: value.name,
        rank: value.rank,
        phone: value.phone,
        email: value.email,
        birthDate: value.birthDate,
        station: value.station,
        stationPhone: value.stationPhone,
        cheifName: value.cheifName,
        imageURL: this.image,
        infoSet: true,
    }
    
    if ( typeof this.userId == 'undefined') {
        this.firebaseService.updateUser( data )
        .then(
            res => {
                this.globals.userData = res.userData;
                this.resetFields();
                this.viewCtrl.dismiss({success: true});
        })
    } else {
        this.firebaseService.updateUser( data, this.userId )
        .then(
            res => {
                this.globals.userData = res.userData;
                this.resetFields();
                this.viewCtrl.dismiss({success: true});
        })
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
