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
import { ViewController, normalizeURL, ModalController, ToastController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Validators, FormBuilder, FormControl } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';
import { ImagePicker } from '@ionic-native/image-picker';
import { NewPostModalPage } from '../new-post-modal/new-post-modal';
import * as firebase from 'firebase/app';
var PostDetailPage = /** @class */ (function () {
    function PostDetailPage(navParams, alertCtrl, viewCtrl, toastCtrl, formBuilder, imagePicker, firebaseService, loadingCtrl, modalCtrl) {
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.viewCtrl = viewCtrl;
        this.toastCtrl = toastCtrl;
        this.formBuilder = formBuilder;
        this.imagePicker = imagePicker;
        this.firebaseService = firebaseService;
        this.loadingCtrl = loadingCtrl;
        this.modalCtrl = modalCtrl;
        this.currentUser = firebase.auth().currentUser;
        this.loading = this.loadingCtrl.create();
    }
    PostDetailPage.prototype.ionViewWillLoad = function () {
        this.getData();
    };
    PostDetailPage.prototype.getData = function () {
        this.post = this.navParams.get('data');
        console.log(this.post);
        this.image = this.post.imageURL;
        this.validations_form = this.formBuilder.group({
            title: new FormControl(this.post.title, Validators.required),
            description: new FormControl(this.post.description, Validators.required)
        });
    };
    PostDetailPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    PostDetailPage.prototype.onSubmit = function (value) {
        var _this = this;
        var data = {
            title: value.title,
            description: value.description,
            image: this.image
        };
        this.firebaseService.updateTask(this.post.id, data)
            .then(function (res) {
            _this.viewCtrl.dismiss();
        });
    };
    PostDetailPage.prototype.delete = function () {
        var _this = this;
        var confirm = this.alertCtrl.create({
            title: 'Confirm',
            message: 'Do you want to delete ' + this.post.type + ' Report?',
            buttons: [
                {
                    text: 'No',
                    handler: function () { }
                },
                {
                    text: 'Yes',
                    handler: function () {
                        _this.firebaseService.deletePost(_this.post.documentId)
                            .then(function (res) { return _this.viewCtrl.dismiss(); }, function (err) { return console.log(err); });
                    }
                }
            ]
        });
        confirm.present();
    };
    PostDetailPage.prototype.openImagePicker = function () {
        var _this = this;
        this.imagePicker.hasReadPermission()
            .then(function (result) {
            if (result == false) {
                // no callbacks required as this opens a popup which returns async
                _this.imagePicker.requestReadPermission();
            }
            else if (result == true) {
                _this.imagePicker.getPictures({
                    maximumImagesCount: 1
                }).then(function (results) {
                    for (var i = 0; i < results.length; i++) {
                        _this.uploadImageToFirebase(results[i]);
                    }
                }, function (err) { return console.log(err); });
            }
        }, function (err) {
            console.log(err);
        });
    };
    PostDetailPage.prototype.uploadImageToFirebase = function (image) {
        var _this = this;
        this.loading.present();
        image = normalizeURL(image);
        var randomId = Math.random().toString(36).substr(2, 5);
        console.log(randomId);
        //uploads img to firebase storage
        this.firebaseService.uploadImage(image, randomId)
            .then(function (photoURL) {
            _this.image = photoURL;
            _this.loading.dismiss();
            var toast = _this.toastCtrl.create({
                message: 'Image was updated successfully',
                duration: 3000
            });
            toast.present();
        });
    };
    PostDetailPage.prototype.openNewPostModal = function () {
        var _this = this;
        var modal = this.modalCtrl.create(NewPostModalPage, { data: this.post });
        modal.onDidDismiss(function (data) {
            if (typeof data != 'undefined') {
                _this.dismiss();
            }
        });
        modal.present();
    };
    PostDetailPage = __decorate([
        Component({
            templateUrl: 'post-details.html'
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
    ], PostDetailPage);
    return PostDetailPage;
}());
export { PostDetailPage };
//# sourceMappingURL=post-details.js.map