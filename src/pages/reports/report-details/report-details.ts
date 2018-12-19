import { Component } from '@angular/core';
import { ViewController, normalizeURL, ToastController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';
import { ImagePicker } from '@ionic-native/image-picker';

@Component({
  templateUrl: 'report-details.html'
})
export class ReportDetailPage {

  validations_form: FormGroup;
  report: any;
  loading: any;

  constructor(
    private navParams: NavParams,
    private alertCtrl: AlertController,
    private viewCtrl: ViewController,
    private toastCtrl: ToastController,
    private formBuilder: FormBuilder,
    private imagePicker: ImagePicker,
    private firebaseService: FirebaseService,
    private loadingCtrl: LoadingController
  ) {
    this.loading = this.loadingCtrl.create();
  }

  ionViewWillLoad(){
    this.getData()
  }

  getData(){
    this.report = this.navParams.get('data');
    console.log(this.report)
    this.validations_form = this.formBuilder.group({
      title: new FormControl(this.report.title, Validators.required),
      description: new FormControl(this.report.description, Validators.required)
    });
  }

  dismiss() {
   this.viewCtrl.dismiss();
  }




}
