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
import { ViewController, normalizeURL, ToastController, LoadingController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormControl } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';
import { ImagePicker } from '@ionic-native/image-picker';
var NewPostModalPage = /** @class */ (function () {
    function NewPostModalPage(viewCtrl, toastCtrl, formBuilder, imagePicker, firebaseService, loadingCtrl, params) {
        this.viewCtrl = viewCtrl;
        this.toastCtrl = toastCtrl;
        this.formBuilder = formBuilder;
        this.imagePicker = imagePicker;
        this.firebaseService = firebaseService;
        this.loadingCtrl = loadingCtrl;
        this.params = params;
        this.update = false;
        this.myDate = new Date().toISOString();
        this.myTime = new Date().toISOString();
        this.loading = this.loadingCtrl.create();
        this.postData = params.get('data');
    }
    NewPostModalPage.prototype.ionViewWillLoad = function () {
        this.resetFields();
        if (typeof this.postData != 'undefined') {
            this.update = true;
            this.setFields(this.postData);
        }
    };
    NewPostModalPage.prototype.setFields = function (data) {
        this.image = data.imageURL;
        this.validations_form = this.formBuilder.group({
            date: [data.date, Validators.required],
            time: [data.time, Validators.required],
            type: [data.type, Validators.required],
            name: [data.name, Validators.required],
            description: [data.description, Validators.required],
            location: [data.location, Validators.required],
        });
    };
    NewPostModalPage.prototype.resetFields = function () {
        this.image = "./assets/imgs/default-image.png";
        this.validations_form = this.formBuilder.group({
            date: new FormControl('', Validators.required),
            time: new FormControl('', Validators.required),
            type: new FormControl('', Validators.required),
            name: new FormControl('', Validators.required),
            description: new FormControl('', Validators.required),
            location: new FormControl('', Validators.required),
        });
    };
    NewPostModalPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    NewPostModalPage.prototype.onSubmit = function (value) {
        var _this = this;
        var data = {
            date: value.date,
            time: value.time,
            type: value.type,
            name: value.name,
            description: value.description,
            location: value.location,
            imageURL: this.image
        };
        this.firebaseService.createPost(data)
            .then(function (res) {
            _this.resetFields();
            _this.viewCtrl.dismiss({ success: true });
        });
        if (this.update) {
            this.firebaseService.updatePost(data, this.postData)
                .then(function (res) {
                _this.resetFields();
                _this.viewCtrl.dismiss({ success: true });
            });
        }
        else {
            this.firebaseService.createPost(data)
                .then(function (res) {
                _this.resetFields();
                _this.viewCtrl.dismiss({ success: true });
            });
        }
    };
    NewPostModalPage.prototype.openImagePicker = function () {
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
    NewPostModalPage.prototype.uploadImageToFirebase = function (image) {
        var _this = this;
        this.loading.present();
        image = normalizeURL(image);
        var randomId = Math.random().toString(36).substr(2, 5);
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
    NewPostModalPage = __decorate([
        Component({
            selector: 'page-new-post-modal',
            templateUrl: 'new-post-modal.html'
        }),
        __metadata("design:paramtypes", [ViewController,
            ToastController,
            FormBuilder,
            ImagePicker,
            FirebaseService,
            LoadingController,
            NavParams])
    ], NewPostModalPage);
    return NewPostModalPage;
}());
export { NewPostModalPage };
//# sourceMappingURL=new-post-modal.js.map