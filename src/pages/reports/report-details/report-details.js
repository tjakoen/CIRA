var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { ViewController, ToastController, NavParams, AlertController, LoadingController, ModalController } from 'ionic-angular';
import { Validators, FormBuilder, FormControl } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';
import { ImagePicker } from '@ionic-native/image-picker';
import { NewReportModalPage } from '../new-report-modal/new-report-modal';
var ReportDetailPage = /** @class */ (function () {
    function ReportDetailPage(navParams, alertCtrl, viewCtrl, toastCtrl, formBuilder, imagePicker, firebaseService, loadingCtrl, modalCtrl) {
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.viewCtrl = viewCtrl;
        this.toastCtrl = toastCtrl;
        this.formBuilder = formBuilder;
        this.imagePicker = imagePicker;
        this.firebaseService = firebaseService;
        this.loadingCtrl = loadingCtrl;
        this.modalCtrl = modalCtrl;
        this.loading = this.loadingCtrl.create();
    }
    ReportDetailPage.prototype.ionViewWillLoad = function () {
        this.getData();
    };
    ReportDetailPage.prototype.getData = function () {
        this.report = this.navParams.get('data');
        this.validations_form = this.formBuilder.group({
            title: new FormControl(this.report.title, Validators.required),
            description: new FormControl(this.report.description, Validators.required)
        });
    };
    ReportDetailPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    ReportDetailPage.prototype.openNewReportModal = function () {
        var _this = this;
        var modal = this.modalCtrl.create(NewReportModalPage, { data: this.report });
        modal.onDidDismiss(function (data) {
            if (typeof data != 'undefined') {
                _this.dismiss();
            }
        });
        modal.present();
    };
    ReportDetailPage.prototype.delete = function () {
        var _this = this;
        var confirm = this.alertCtrl.create({
            title: 'Confirm',
            message: 'Do you want to delete this Report?',
            buttons: [
                {
                    text: 'No',
                    handler: function () { }
                },
                {
                    text: 'Yes',
                    handler: function () {
                        _this.firebaseService.deleteReport(_this.report.documentId)
                            .then(function (res) { return _this.viewCtrl.dismiss(); }, function (err) { return console.log(err); });
                    }
                }
            ]
        });
        confirm.present();
    };
    ReportDetailPage = __decorate([
        Component({
            templateUrl: 'report-details.html'
        }),
        __metadata("design:paramtypes", [NavParams,
            AlertController,
            ViewController,
            ToastController,
            FormBuilder,
            ImagePicker,
            FirebaseService,
            LoadingController,
            ModalController])
    ], ReportDetailPage);
    return ReportDetailPage;
}());
export { ReportDetailPage };
//# sourceMappingURL=report-details.js.map