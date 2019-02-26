import { Component } from '@angular/core';
import { ViewController, NavParams, ModalController, ToastController,  LoadingController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import * as firebase from 'firebase/app';
import { Globals } from '../services/globals'
import { UserInfoService } from './user-info.service';
import { UploadService, Upload } from '../services/firebase.service';

@Component({
  templateUrl: 'templates/user-info.html'
})
export class UserInfoPage {

  currentUser = firebase.auth().currentUser;
  image: any;
  user: any;
  loading: any;

  constructor(
    private viewCtrl: ViewController,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private globals: Globals,
  ) {
    this.loading = this.loadingCtrl.create();
  }

  ionViewWillLoad(){
    this.getData()
  }

  getData(){
    this.user = this.globals.userData;
    this.image = this.user.imageURL;
  }

  dismiss() {
   this.viewCtrl.dismiss();
  }

  editUserModal(){
    let modal = this.modalCtrl.create( EditUserModal, {data: this.globals.userData} );
    modal.onDidDismiss( data => {
      if ( typeof data != 'undefined' ) {
        this.getData()
      }
    });
    modal.present();
  }

}

@Component({
  templateUrl: 'templates/edit-user-modal.html'
})
export class EditUserModal {

  validations_form: FormGroup;
  image: any;
  loading: any;
  userData;
  userId;

  // Upload Pics
  selectedFiles: FileList;
  currentUpload: Upload;

  
  constructor(
    private viewCtrl: ViewController,
    private toastCtrl: ToastController,
    private formBuilder: FormBuilder,
    private loadingCtrl: LoadingController,
    private params: NavParams,
    private globals: Globals,
    private userInfoService: UserInfoService,
    private upSvc: UploadService,
  ) {
    this.loading = this.loadingCtrl.create();
    this.userData =  this.params.get('data') 
    this.userId = this.params.get('uid') 
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
    this.viewCtrl.dismiss();
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
        this.userInfoService.updateUser( data )
        .then(
            res => {
                this.globals.userData = res.data;
                this.resetFields();
                this.viewCtrl.dismiss({success: true});
        })
    } else {
        this.userInfoService.updateUser( data, this.userId )
        .then(
            res => {
                this.globals.userData = res.data;
                this.resetFields();
                this.viewCtrl.dismiss({success: true});
        })
    }
  }

 
detectFiles(event) {
  this.selectedFiles = event.target.files;
}

uploadSingle() {
  let file = this.selectedFiles.item(0)
  this.currentUpload = new Upload(file);
  this.upSvc.pushUpload(this.currentUpload).then( res => {
    this.image = res;
    this.loading.dismiss()
    this.globals.showToast('Image was uploaded successfully');
  }, err => {
    this.loading.dismiss()
  })
}

}
