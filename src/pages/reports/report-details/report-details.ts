import { Component } from '@angular/core';
import { ViewController, NavParams, AlertController, LoadingController, ModalController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';
import { NewReportModalPage } from '../new-report-modal/new-report-modal';

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
    private formBuilder: FormBuilder,
    private firebaseService: FirebaseService,
    private loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
  ) {
    this.loading = this.loadingCtrl.create();
  }

  ionViewWillLoad(){
    this.getData()
  }

  getData(){
    this.report = this.navParams.get('data');
    this.validations_form = this.formBuilder.group({
      title: new FormControl(this.report.title, Validators.required),
      description: new FormControl(this.report.description, Validators.required)
    });
  }

  dismiss() {
   this.viewCtrl.dismiss();
  }

  openNewReportModal(){
    let modal = this.modalCtrl.create(NewReportModalPage, {data: this.report});
    modal.onDidDismiss( data => {
      if ( typeof data != 'undefined' ) {
        this.dismiss();
      }
    });
    modal.present();
  }

  delete() {
    let confirm = this.alertCtrl.create({
      title: 'Confirm',
      message: 'Do you want to delete this Report?',
      buttons: [
        {
          text: 'No',
          handler: () => {}
        },
        {
          text: 'Yes',
          handler: () => {
            this.firebaseService.deleteReport(this.report.documentId)
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

}
