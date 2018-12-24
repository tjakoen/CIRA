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
import { NavController, ModalController, PopoverController, NavParams } from 'ionic-angular';
import { AuthService } from '../services/auth.service';
import { FirebaseService } from '../services/firebase.service';
import { NewPostModalPage } from './new-post-modal/new-post-modal';
import { PostDetailPage } from './post-details/post-details';
import { LoginPage } from '../login/login';
import { HelperService } from '../services/helpers.service';
var PostsPage = /** @class */ (function () {
    function PostsPage(navCtrl, modalCtrl, authService, firebaseService, helperService, popCtrl) {
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.authService = authService;
        this.firebaseService = firebaseService;
        this.helperService = helperService;
        this.popCtrl = popCtrl;
        this.viewMode = 'list';
        this.filters = {
            owner: 'all',
            viewType: 'all',
            viewStatus: 'all',
            orderBy: 'date',
            orderDirection: 'desc',
            startDate: '',
            endDate: ''
        };
        this.postData = [];
        this.filteredPostData = [];
        this.posts = [];
    }
    PostsPage.prototype.ionViewWillEnter = function () {
        this.getData();
    };
    PostsPage.prototype.resetFilter = function () {
        this.filters = {
            owner: 'all',
            viewType: 'all',
            viewStatus: 'all',
            orderBy: 'date',
            orderDirection: 'desc',
            startDate: '',
            endDate: ''
        };
        this.displayPosts();
    };
    PostsPage.prototype.resetDate = function () {
        this.filters.startDate = '';
        this.filters.endDate = '';
        this.displayPosts();
    };
    PostsPage.prototype.getData = function () {
        var _this = this;
        this.firebaseService.getPosts(this.filters.viewType)
            .then(function (data) {
            if (data) {
                data.map(function (dataMap) {
                    var post = dataMap.payload.doc.data();
                    post.documentId = dataMap.payload.doc.id;
                    _this.postData.push(post);
                    _this.displayPosts();
                });
            }
        });
    };
    PostsPage.prototype.showFilterPopover = function (myEvent) {
        // Pass Post Page Refferrence to Popover Page
        var popover = this.popCtrl.create(PostFilterPopover, { cssClass: 'popover-top-right', homeRef: this });
        popover.present({
            ev: myEvent
        });
    };
    PostsPage.prototype.viewOwners = function (ev) {
        var val = ev.target.value;
        var userID = this.firebaseService.currentUser.uid;
        this.filters.owner = val != 'all' ? userID : val;
        this.displayPosts();
    };
    PostsPage.prototype.displayPosts = function () {
        var _this = this;
        this.proccessPosts(function (callback) {
            if (callback) {
                _this.posts = _this.filteredPostData;
                _this.searchQuery = '';
            }
        });
    };
    PostsPage.prototype.proccessPosts = function (callback) {
        this.posts = [];
        var filterdValue = this.filterPosts(this.postData);
        var orderedValue = this.helperService.sortByKey(filterdValue, this.filters.orderBy, this.filters.orderDirection);
        this.filteredPostData = orderedValue;
        callback(true);
    };
    // TODO: Improved multi-key filtering
    PostsPage.prototype.filterPosts = function (data) {
        data = this.filters.owner != 'all' ? this.helperService.filterByKey(data, 'userID', this.filters.owner) : data;
        data = this.filters.viewType != 'all' ? this.helperService.filterByKey(data, 'type', this.filters.viewType) : data;
        data = this.filters.viewStatus != 'all' ? this.helperService.filterByKey(data, 'status', this.filters.viewStatus) : data;
        data = this.filters.startDate != '' && this.filters.startDate != '' ? this.helperService.filterByDate(data, this.filters.startDate, this.filters.endDate) : data;
        return data;
    };
    PostsPage.prototype.searchPosts = function (ev) {
        var val = ev.target.value;
        if (val && val.trim() != '') {
            this.posts = this.filteredPostData.filter(function (post) {
                return (post.name.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
                    post.location.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
                    post.description.toLowerCase().indexOf(val.toLowerCase()) > -1);
            });
        }
        else {
            this.posts = this.filteredPostData;
        }
    };
    PostsPage.prototype.viewDetails = function (post) {
        this.navCtrl.push(PostDetailPage, {
            data: post
        });
    };
    PostsPage.prototype.openNewUserModal = function () {
        var _this = this;
        var modal = this.modalCtrl.create(NewPostModalPage);
        modal.onDidDismiss(function (data) {
            if (typeof data != 'undefined') {
                _this.postData = [];
                _this.displayPosts();
            }
        });
        modal.present();
    };
    PostsPage.prototype.logout = function () {
        var _this = this;
        this.authService.doLogout()
            .then(function (res) {
            _this.navCtrl.push(LoginPage);
        });
    };
    PostsPage = __decorate([
        Component({
            selector: 'page-posts',
            templateUrl: 'posts.html'
        }),
        __metadata("design:paramtypes", [NavController,
            ModalController,
            AuthService,
            FirebaseService,
            HelperService,
            PopoverController])
    ], PostsPage);
    return PostsPage;
}()); // End of Posts Page
export { PostsPage };
var PostFilterPopover = /** @class */ (function () {
    function PostFilterPopover(navParams) {
        this.navParams = navParams;
        this.postsPage = this.navParams.get('homeRef');
    }
    PostFilterPopover = __decorate([
        Component({
            selector: 'popover-filter',
            templateUrl: 'filter-popover.html'
        }),
        __metadata("design:paramtypes", [NavParams])
    ], PostFilterPopover);
    return PostFilterPopover;
}());
export { PostFilterPopover };
//# sourceMappingURL=posts.js.map