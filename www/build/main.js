webpackJsonp([1],{

/***/ 152:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__register_register__ = __webpack_require__(275);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__tabs_tabs__ = __webpack_require__(281);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_auth_service__ = __webpack_require__(85);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var LoginPage = /** @class */ (function () {
    function LoginPage(navCtrl, authService, formBuilder) {
        this.navCtrl = navCtrl;
        this.authService = authService;
        this.formBuilder = formBuilder;
        this.logoURL = "assets/imgs/pnp-logo.png";
        this.errorMessage = '';
        this.validation_messages = {
            'email': [
                { type: 'required', message: 'Email is required.' },
                { type: 'pattern', message: 'Please enter a valid email.' }
            ],
            'password': [
                { type: 'required', message: 'Password is required.' },
                { type: 'minlength', message: 'Password must be at least 5 characters long.' }
            ]
        };
    }
    LoginPage.prototype.ionViewWillLoad = function () {
        this.validations_form = this.formBuilder.group({
            email: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].compose([
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required,
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
            ])),
            password: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].compose([
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].minLength(5),
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required
            ])),
        });
    };
    LoginPage.prototype.tryLogin = function (value) {
        var _this = this;
        this.authService.doLogin(value)
            .then(function (res) {
            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__tabs_tabs__["a" /* TabsPage */]);
        }, function (err) {
            _this.errorMessage = err.message;
        });
    };
    LoginPage.prototype.goRegisterPage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__register_register__["a" /* RegisterPage */]);
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"/Users/tjakoen/Desktop/Repository/CIRA/src/pages/login/login.html"*/'<ion-header>\n  <ion-navbar [hideBackButton]="true" color="primary">\n    <ion-title>Login</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding class="form-content">\n  <ion-grid>\n      <ion-row>\n          <ion-col col-lg-5 col-sm-12  fixed center-text>\n              <img [src]="logoURL"/>\n              <h2>Welcome to CIRA</h2>\n              <p>Decision Support System for Crime Investigatory Report in Angeles City</p>\n          </ion-col>\n          <ion-col col-lg-7 col-sm-12 fixed>\n            <br><br><br>\n            <form class="form" [formGroup]="validations_form"  (ngSubmit)="tryLogin(validations_form.value)">\n                <ion-item>\n                  <ion-label floating color="primary">Email</ion-label>\n                  <ion-input type="text" formControlName="email" value="tjakoen.s@gmail.com"></ion-input>\n                </ion-item>\n                <div class="validation-errors">\n                  <ng-container *ngFor="let validation of validation_messages.email">\n                    <div class="error-message" *ngIf="validations_form.get(\'email\').hasError(validation.type) && (validations_form.get(\'email\').dirty || validations_form.get(\'email\').touched)">\n                      {{ validation.message }}\n                    </div>\n                  </ng-container>\n                </div>\n            \n                <ion-item>\n                  <ion-label floating color="primary">Password</ion-label>\n                  <ion-input type="password" formControlName="password" class="form-controll" required value="watermelon"></ion-input>\n                </ion-item>\n                <div class="validation-errors">\n                  <ng-container *ngFor="let validation of validation_messages.password">\n                    <div class="error-message" *ngIf="validations_form.get(\'password\').hasError(validation.type) && (validations_form.get(\'password\').dirty || validations_form.get(\'password\').touched)">\n                      {{ validation.message }}\n                    </div>\n                  </ng-container>\n                </div>\n            \n                <button class="submit-btn" ion-button block type="submit" [disabled]="!validations_form.valid">Log In</button>\n                <label class="error-message">{{errorMessage}}</label>\n              </form>\n              <p class="go-to-register">\n                No account yet? <a (click)="goRegisterPage()">Create an account.</a>\n              </p>\n          </ion-col>\n        </ion-row>\n  </ion-grid>\n</ion-content>\n'/*ion-inline-end:"/Users/tjakoen/Desktop/Repository/CIRA/src/pages/login/login.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_5__services_auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 157:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return MenuPage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FilterPopover; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_auth_service__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_firebase_service__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__new_post_modal_new_post_modal__ = __webpack_require__(282);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__details_details__ = __webpack_require__(283);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__login_login__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_helpers__ = __webpack_require__(284);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var MenuPage = /** @class */ (function () {
    function MenuPage(navCtrl, modalCtrl, authService, firebaseService, helperService, popCtrl) {
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.authService = authService;
        this.firebaseService = firebaseService;
        this.helperService = helperService;
        this.popCtrl = popCtrl;
        this.viewMode = 'list';
        this.filters = {
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
    MenuPage.prototype.ionViewWillEnter = function () {
        this.getData();
    };
    MenuPage.prototype.resetFilter = function () {
        this.filters = {
            viewType: 'all',
            viewStatus: 'all',
            orderBy: 'date',
            orderDirection: 'desc',
            startDate: '',
            endDate: ''
        };
        this.displayPosts();
    };
    MenuPage.prototype.resetDate = function () {
        this.filters.startDate = '';
        this.filters.endDate = '';
        this.displayPosts();
    };
    MenuPage.prototype.getData = function () {
        var _this = this;
        this.firebaseService.getPosts(this.filters.viewType)
            .then(function (data) {
            if (data) {
                data.map(function (dataMap) {
                    var post = dataMap.payload.doc.data();
                    _this.postData.push(post);
                    _this.displayPosts();
                });
            }
        });
    };
    MenuPage.prototype.showFilterPopover = function (myEvent) {
        // Pass Post Page Refferrence to Popover Page
        var popover = this.popCtrl.create(FilterPopover, { cssClass: 'popover-top-right', homeRef: this });
        popover.present({
            ev: myEvent
        });
    };
    MenuPage.prototype.displayPosts = function () {
        var _this = this;
        this.proccessPosts(function (callback) {
            if (callback) {
                _this.posts = _this.filteredPostData;
                _this.searchQuery = '';
            }
        });
    };
    MenuPage.prototype.proccessPosts = function (callback) {
        this.posts = [];
        var filterdValue = this.filterPosts(this.postData);
        var orderedValue = this.helperService.sortByKey(filterdValue, this.filters.orderBy, this.filters.orderDirection);
        this.filteredPostData = orderedValue;
        callback(true);
    };
    // TODO: Improved multi-key filtering
    MenuPage.prototype.filterPosts = function (data) {
        data = this.filters.viewType == 'all' ? this.helperService.filterByKey(data) : this.helperService.filterByKey(data, 'type', this.filters.viewType);
        data = this.filters.viewStatus == 'all' ? this.helperService.filterByKey(data) : this.helperService.filterByKey(data, 'status', this.filters.viewStatus);
        data = this.filters.startDate != '' && this.filters.startDate != '' ? this.helperService.filterByDate(data, this.filters.startDate, this.filters.endDate) : data;
        return data;
    };
    MenuPage.prototype.searchPosts = function (ev) {
        var val = ev.target.value;
        if (val && val.trim() != '') {
            this.posts = this.filteredPostData.filter(function (post) {
                return (post.name.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
                    post.name.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
                    post.description.toLowerCase().indexOf(val.toLowerCase()) > -1);
            });
        }
        else {
            this.posts = this.filteredPostData;
        }
    };
    MenuPage.prototype.viewDetails = function (post) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__details_details__["a" /* DetailsPage */], {
            data: post
        });
    };
    MenuPage.prototype.openNewUserModal = function () {
        var _this = this;
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__new_post_modal_new_post_modal__["a" /* NewPostModalPage */]);
        modal.onDidDismiss(function (data) {
            _this.postData = [];
            _this.getData();
            _this.displayPosts();
        });
        modal.present();
    };
    MenuPage.prototype.logout = function () {
        var _this = this;
        this.authService.doLogout()
            .then(function (res) {
            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__login_login__["a" /* LoginPage */]);
        });
    };
    MenuPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-menu',template:/*ion-inline-start:"/Users/tjakoen/Desktop/Repository/CIRA/src/pages/menu/menu.html"*/'<ion-header>\n  <ion-toolbar color="secondary">\n    <ion-title>CIRA - Post Feed</ion-title>\n    <ion-buttons end>\n      <button ion-button icon-only>\n          <ion-icon name="contact"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n<ion-content>\n  \n  <ion-fab right bottom>\n      <button ion-fab (click)="openNewUserModal()"><ion-icon name="add"></ion-icon></button>\n  </ion-fab>\n\n  <ion-row class="filter-bar">\n    <ion-col>\n      <ion-searchbar [(ngModel)]="searchQuery" placeholder="Search by Name, Location or Description" (ionInput)="searchPosts($event)"></ion-searchbar>\n    </ion-col>\n      <ion-col col-2>\n        <button class="funnel" ion-button icon-only end (click)="showFilterPopover($event)">\n            <ion-icon name="funnel"></ion-icon>\n        </button>\n    </ion-col>\n  </ion-row>\n       \n   <div>\n    <ion-segment [(ngModel)]="viewMode">\n      <ion-segment-button value="list">\n        <ion-icon name="list-box"></ion-icon>\n      </ion-segment-button>\n      <ion-segment-button value="gallery">\n        <ion-icon name="photos"></ion-icon>\n      </ion-segment-button>\n      <ion-segment-button value="grid">\n        <ion-icon name="grid"></ion-icon>\n      </ion-segment-button>\n    </ion-segment>\n  </div>\n    \n  <div [ngSwitch]="viewMode">\n    \n    <div *ngSwitchCase="\'list\'">\n      <div class="list-mini">\n          <ion-list>\n            <ion-item padding *ngFor="let post of posts" (click)="viewDetails(post)">\n              <ion-thumbnail item-start>\n                <img [src]="post.imageURL">\n              </ion-thumbnail>\n              <h2>{{post.type}}</h2>\n              <p>{{post.name}}</p>\n              <p>{{post.location}}</p>\n              <p>{{post.date}} {{post.time}}</p>\n              <button ion-button clear item-end>Details</button>\n            </ion-item>\n          </ion-list>\n        </div>\n    </div>\n    \n    <div *ngSwitchCase="\'gallery\'">\n      <ion-card *ngFor="let post of posts" (click)="viewDetails(post)">\n        <img [src]="post.imageURL" />\n        <ion-card-content>\n          <ion-card-title>\n            {{post.type}}\n          </ion-card-title>\n          <p>{{post.name}}</p>\n          <p>{{post.location}}</p>\n          <p>{{post.date}} {{post.time}}</p>\n        </ion-card-content>\n\n        <ion-row no-padding>\n          <ion-col>\n              <button ion-button clear>View Details</button>\n          </ion-col>\n        </ion-row>\n      </ion-card>\n    </div>\n\n    <div class="grid-display" *ngSwitchCase="\'grid\'">\n      <ion-grid>\n        <ion-row>\n          <ion-col col-4 *ngFor="let post of posts" (click)="viewDetails(post)">\n            <ion-card>\n              <img [src]="post.imageURL"/>\n              <div class="card-title">{{post.type}}</div>\n              <div class="card-subtitle">{{post.date}} {{post.time}}</div>\n            </ion-card>\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n    </div>\n  \n  </div>\n\n</ion-content>\n\n<!-- <ion-footer (click)="logout()">\n  <ion-toolbar color="secondary">\n    <ion-title>Log out</ion-title>\n  </ion-toolbar>\n</ion-footer> -->\n'/*ion-inline-end:"/Users/tjakoen/Desktop/Repository/CIRA/src/pages/menu/menu.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_3__services_firebase_service__["a" /* FirebaseService */],
            __WEBPACK_IMPORTED_MODULE_7__services_helpers__["a" /* HelperService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* PopoverController */]])
    ], MenuPage);
    return MenuPage;
}()); // End of Posts Page

var FilterPopover = /** @class */ (function () {
    function FilterPopover(navParams) {
        this.navParams = navParams;
        this.postsPage = this.navParams.get('homeRef');
    }
    FilterPopover = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'popover-filter',template:/*ion-inline-start:"/Users/tjakoen/Desktop/Repository/CIRA/src/pages/menu/filterPopover.html"*/'<ion-list no-lines>\n    <ion-list-header>\n        <span>\n            Filters\n        </span>\n        <button float-right (click)="postsPage.resetFilter()" >\n            <p>Reset All</p>\n        </button>\n    </ion-list-header>\n    <ion-item>\n        <ion-label>Order:</ion-label>\n        <ion-select [(ngModel)]="postsPage.filters.orderDirection" interface="popover" (ionChange)="postsPage.displayPosts()">\n            <ion-option value="desc">Descending</ion-option>\n            <ion-option value="asc">Ascending</ion-option>\n        </ion-select>\n    </ion-item>\n    <ion-item>\n        <ion-label>Order By:</ion-label>\n        <ion-select [(ngModel)]="postsPage.filters.orderBy" interface="popover" (ionChange)="postsPage.displayPosts()">\n            <ion-option value="date">By Date</ion-option>\n            <ion-option value="name">By Name</ion-option>\n        </ion-select>\n    </ion-item>\n    <ion-item>\n        <ion-label>Type:</ion-label>\n        <ion-select [(ngModel)]="postsPage.filters.viewType" interface="popover" (ionChange)="postsPage.displayPosts()">\n            <ion-option value="all">All Types</ion-option>\n            <ion-option value="Missing Person">Missing Persons</ion-option>\n            <ion-option value="Missing Property">Missing Property</ion-option>\n            <ion-option value="Wanted Person">Wanted Person</ion-option>\n        </ion-select>\n    </ion-item>\n    <ion-item>\n        <ion-label>Status:</ion-label>\n        <ion-select [(ngModel)]="postsPage.filters.viewStatus" interface="popover" (ionChange)="postsPage.displayPosts()">\n            <ion-option value="all">All</ion-option>\n            <ion-option value="unsolved">Unsolved</ion-option>\n            <ion-option value="solved">Solved</ion-option>\n        </ion-select>\n    </ion-item>\n    \n    <ion-list-header>\n        <span>Date Range</span>\n        <button float-right (click)="postsPage.resetDate()" >\n            <p>Reset Date</p>\n        </button>\n    </ion-list-header>\n    <ion-item>\n        <ion-label>Start Date</ion-label>\n        <ion-datetime displayFormat="MM/DD/YYYY" [(ngModel)]="postsPage.filters.startDate"></ion-datetime>\n    </ion-item>\n    <ion-item>\n        <ion-label>End Date</ion-label>\n        <ion-datetime displayFormat="MM/DD/YYYY" [(ngModel)]="postsPage.filters.endDate" (ionChange)="postsPage.displayPosts()"></ion-datetime>\n    </ion-item>\n\n</ion-list>'/*ion-inline-end:"/Users/tjakoen/Desktop/Repository/CIRA/src/pages/menu/filterPopover.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]])
    ], FilterPopover);
    return FilterPopover;
}());

//# sourceMappingURL=menu.js.map

/***/ }),

/***/ 191:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 191;

/***/ }),

/***/ 232:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/posts/posts.module": [
		489,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 232;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 275:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_auth_service__ = __webpack_require__(85);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var RegisterPage = /** @class */ (function () {
    function RegisterPage(navCtrl, authService, formBuilder) {
        this.navCtrl = navCtrl;
        this.authService = authService;
        this.formBuilder = formBuilder;
        this.errorMessage = '';
        this.successMessage = '';
        this.validation_messages = {
            'email': [
                { type: 'required', message: 'Email is required.' },
                { type: 'pattern', message: 'Enter a valid email.' }
            ],
            'password': [
                { type: 'required', message: 'Password is required.' },
                { type: 'minlength', message: 'Password must be at least 5 characters long.' }
            ]
        };
    }
    RegisterPage.prototype.ionViewWillLoad = function () {
        this.validations_form = this.formBuilder.group({
            email: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].compose([
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required,
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
            ])),
            password: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].compose([
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].minLength(5),
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required
            ])),
        });
    };
    RegisterPage.prototype.tryRegister = function (value) {
        var _this = this;
        this.authService.doRegister(value)
            .then(function (res) {
            console.log(res);
            _this.errorMessage = "";
            _this.successMessage = "Your account has been created. Please log in.";
        }, function (err) {
            console.log(err);
            _this.errorMessage = err.message;
            _this.successMessage = "";
        });
    };
    RegisterPage.prototype.goLoginPage = function () {
        this.navCtrl.pop();
    };
    RegisterPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-register',template:/*ion-inline-start:"/Users/tjakoen/Desktop/Repository/CIRA/src/pages/register/register.html"*/'<ion-header>\n  <ion-navbar color="primary">\n    <ion-title>New Account</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding class="form-content">\n  <form class="form" [formGroup]="validations_form"  (ngSubmit)="tryRegister(validations_form.value)">\n\n    <ion-item>\n      <ion-label floating color="primary">Email</ion-label>\n      <ion-input type="text" formControlName="email"></ion-input>\n    </ion-item>\n    <div class="validation-errors">\n      <ng-container *ngFor="let validation of validation_messages.email">\n        <div class="error-message" *ngIf="validations_form.get(\'email\').hasError(validation.type) && (validations_form.get(\'email\').dirty || validations_form.get(\'email\').touched)">\n          {{ validation.message }}\n        </div>\n      </ng-container>\n    </div>\n\n    <ion-item>\n      <ion-label floating color="primary">Password</ion-label>\n      <ion-input type="password" formControlName="password" class="form-controll" required></ion-input>\n    </ion-item>\n    <div class="validation-errors">\n      <ng-container *ngFor="let validation of validation_messages.password">\n        <div class="error-message" *ngIf="validations_form.get(\'password\').hasError(validation.type) && (validations_form.get(\'password\').dirty || validations_form.get(\'password\').touched)">\n          {{ validation.message }}\n        </div>\n      </ng-container>\n    </div>\n\n    <button class="submit-btn" ion-button block type="submit" [disabled]="!validations_form.valid">Register</button>\n    <label class="error-message">{{errorMessage}}</label>\n    <label class="success-message">{{successMessage}}</label>\n  </form>\n  <p class="go-to-login">Already have an account? <a (click)="goLoginPage()">Try to Log In.</a></p>\n\n</ion-content>\n'/*ion-inline-end:"/Users/tjakoen/Desktop/Repository/CIRA/src/pages/register/register.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_3__services_auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */]])
    ], RegisterPage);
    return RegisterPage;
}());

//# sourceMappingURL=register.js.map

/***/ }),

/***/ 281:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__menu_menu__ = __webpack_require__(157);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var TabsPage = /** @class */ (function () {
    function TabsPage() {
        this.tab1Root = __WEBPACK_IMPORTED_MODULE_1__menu_menu__["b" /* MenuPage */];
        this.tab2Root = __WEBPACK_IMPORTED_MODULE_1__menu_menu__["b" /* MenuPage */];
        this.tab3Root = __WEBPACK_IMPORTED_MODULE_1__menu_menu__["b" /* MenuPage */];
    }
    TabsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/tjakoen/Desktop/Repository/CIRA/src/pages/tabs/tabs.html"*/'<ion-tabs>\n  <ion-tab [root]="tab1Root" tabTitle="Posts" tabIcon="home"></ion-tab>\n  <ion-tab [root]="tab2Root" tabTitle="About" tabIcon="information-circle"></ion-tab>\n  <ion-tab [root]="tab3Root" tabTitle="Contact" tabIcon="contacts"></ion-tab>\n</ion-tabs>\n'/*ion-inline-end:"/Users/tjakoen/Desktop/Repository/CIRA/src/pages/tabs/tabs.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], TabsPage);
    return TabsPage;
}());

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 282:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NewPostModalPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_firebase_service__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_image_picker__ = __webpack_require__(158);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var NewPostModalPage = /** @class */ (function () {
    function NewPostModalPage(viewCtrl, toastCtrl, formBuilder, imagePicker, firebaseService, loadingCtrl) {
        this.viewCtrl = viewCtrl;
        this.toastCtrl = toastCtrl;
        this.formBuilder = formBuilder;
        this.imagePicker = imagePicker;
        this.firebaseService = firebaseService;
        this.loadingCtrl = loadingCtrl;
        this.myDate = new Date().toISOString();
        this.myTime = new Date().toISOString();
        this.loading = this.loadingCtrl.create();
    }
    NewPostModalPage.prototype.ionViewWillLoad = function () {
        this.resetFields();
    };
    NewPostModalPage.prototype.resetFields = function () {
        this.image = "./assets/imgs/default-image.png";
        this.validations_form = this.formBuilder.group({
            date: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required),
            time: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required),
            type: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required),
            name: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required),
            description: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required),
            location: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required),
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
            _this.viewCtrl.dismiss();
        });
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
        image = Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* normalizeURL */])(image);
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
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-new-post-modal',template:/*ion-inline-start:"/Users/tjakoen/Desktop/Repository/CIRA/src/pages/new-post-modal/new-post-modal.html"*/'<ion-header>\n    <ion-navbar color="secondary">\n      <ion-buttons start>\n        <button ion-button icon-only (click)="dismiss()">\n          <ion-icon name="md-arrow-back"></ion-icon>\n        </button>\n      </ion-buttons>\n      <ion-title>\n        New Post\n      </ion-title>\n    </ion-navbar>\n  </ion-header>\n  \n  <ion-content padding>\n    \n    <div>\n      <ion-row no-padding>\n        <ion-col no-padding col-6 offset-3>\n          <img [src]="image" alt="this is the image"/>\n        </ion-col>\n      </ion-row>\n      <ion-row no-padding class="user-image-row">\n        <ion-col no-padding width-60>\n          <button class="image-action-button" ion-button outline block small (click)="openImagePicker()">Change Picture</button>\n        </ion-col>\n      </ion-row>\n    </div> \n\n    <br>\n    \n    <form class="new-user-form" [formGroup]="validations_form" (ngSubmit)="onSubmit(validations_form.value)">\n  \n      <ion-item>\n        <ion-label>Report Date</ion-label>\n        <ion-datetime displayFormat="MM/DD/YYYY" [(ngModel)]="myDate" formControlName="date"></ion-datetime>\n      </ion-item>\n  \n      <ion-item>\n          <ion-label>Report Time</ion-label>\n          <ion-datetime displayFormat="HH:mm" [(ngModel)]="myTime" formControlName="time"></ion-datetime>\n        </ion-item>\n     \n      <ion-item>\n        <ion-label>Report Type</ion-label>\n        <ion-select formControlName="type" submitText="Select" cancelText="Cancel" required>\n          <ion-option value="Missing Person">Missing Persons</ion-option>\n          <ion-option value="Missing Property">Missing Property</ion-option>\n          <ion-option value="Wanted Person">Wanted Person</ion-option>\n        </ion-select>\n      </ion-item>\n\n      <br>\n  \n      <ion-item>\n        <ion-label floating color="primary">Name of Target Individual</ion-label>\n        <ion-input type="text" formControlName="name" class="form-control" required></ion-input>\n      </ion-item>\n      \n      <ion-item>\n        <ion-label floating color="primary">Report Location</ion-label>\n        <ion-input type="text" formControlName="location" class="form-control" required></ion-input>\n      </ion-item>\n  \n      <ion-item>\n          <ion-label floating color="primary">Report Description</ion-label>\n          <ion-textarea type="text" formControlName="description" class="form-control" required></ion-textarea>\n        </ion-item>\n  \n      <br>\n      <br>\n  \n      <button class="form-action-button" ion-button block type="submit" [disabled]="!validations_form.valid">Create</button>\n    </form>\n  </ion-content>\n  '/*ion-inline-end:"/Users/tjakoen/Desktop/Repository/CIRA/src/pages/new-post-modal/new-post-modal.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_image_picker__["a" /* ImagePicker */],
            __WEBPACK_IMPORTED_MODULE_3__services_firebase_service__["a" /* FirebaseService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */]])
    ], NewPostModalPage);
    return NewPostModalPage;
}());

//# sourceMappingURL=new-post-modal.js.map

/***/ }),

/***/ 283:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DetailsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_firebase_service__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_image_picker__ = __webpack_require__(158);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var DetailsPage = /** @class */ (function () {
    function DetailsPage(navParams, alertCtrl, viewCtrl, toastCtrl, formBuilder, imagePicker, firebaseService, loadingCtrl) {
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.viewCtrl = viewCtrl;
        this.toastCtrl = toastCtrl;
        this.formBuilder = formBuilder;
        this.imagePicker = imagePicker;
        this.firebaseService = firebaseService;
        this.loadingCtrl = loadingCtrl;
        this.loading = this.loadingCtrl.create();
    }
    DetailsPage.prototype.ionViewWillLoad = function () {
        this.getData();
    };
    DetailsPage.prototype.getData = function () {
        this.post = this.navParams.get('data');
        this.image = this.post.imageURL;
        this.validations_form = this.formBuilder.group({
            title: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormControl */](this.post.title, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required),
            description: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormControl */](this.post.description, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required)
        });
    };
    DetailsPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    DetailsPage.prototype.onSubmit = function (value) {
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
    DetailsPage.prototype.delete = function () {
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
                        _this.firebaseService.deleteTask(_this.post.id)
                            .then(function (res) { return _this.viewCtrl.dismiss(); }, function (err) { return console.log(err); });
                    }
                }
            ]
        });
        confirm.present();
    };
    DetailsPage.prototype.openImagePicker = function () {
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
    DetailsPage.prototype.uploadImageToFirebase = function (image) {
        var _this = this;
        this.loading.present();
        image = Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* normalizeURL */])(image);
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
    DetailsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-details',template:/*ion-inline-start:"/Users/tjakoen/Desktop/Repository/CIRA/src/pages/details/details.html"*/'<ion-header>\n  <ion-navbar color="secondary">\n    <ion-title>\n      CIRA - View Post\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  \n  <ion-card>\n      <img [src]="post.imageURL" />\n      <ion-card-content>\n        <ion-card-title>\n          {{post.type}} Report ({{post.status}})\n        </ion-card-title>\n        <p><strong>Name:</strong> {{post.name}}</p>\n        <p><strong>Location:</strong> {{post.location}}</p>\n        <p><strong>Date:</strong> {{post.date}}</p>\n        <p><strong>Time:</strong> {{post.time}}</p>\n        <p><strong>Description:</strong></p>\n        <p>{{post.description}}</p>\n      </ion-card-content>\n    </ion-card>\n\n</ion-content>\n'/*ion-inline-end:"/Users/tjakoen/Desktop/Repository/CIRA/src/pages/details/details.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_image_picker__["a" /* ImagePicker */],
            __WEBPACK_IMPORTED_MODULE_3__services_firebase_service__["a" /* FirebaseService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */]])
    ], DetailsPage);
    return DetailsPage;
}());

//# sourceMappingURL=details.js.map

/***/ }),

/***/ 284:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HelperService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var HelperService = /** @class */ (function () {
    function HelperService() {
    }
    HelperService.prototype.filterByKey = function (data, key, value) {
        return typeof key == 'undefined' || value == 'undefined' ? data : data.filter(function (post) { return post[key] === value; });
    };
    HelperService.prototype.sortByKey = function (data, key, order) {
        return data.sort(this.compareValues(key, order));
    };
    HelperService.prototype.filterByDate = function (data, startDate, endDate) {
        return data.filter(function (m) { return new Date(m.date) >= new Date(startDate) && new Date(m.date) <= new Date(endDate); });
    };
    HelperService.prototype.compareValues = function (key, order) {
        console.log(order);
        return function (a, b) {
            if (!a.hasOwnProperty(key) ||
                !b.hasOwnProperty(key)) {
                return 0;
            }
            var varA = (typeof a[key] === 'string') ?
                a[key].toUpperCase() : a[key];
            var varB = (typeof b[key] === 'string') ?
                b[key].toUpperCase() : b[key];
            var comparison = 0;
            if (varA > varB) {
                comparison = 1;
            }
            else if (varA < varB) {
                comparison = -1;
            }
            return ((order == 'asc') ?
                (comparison * -1) : comparison);
        };
    };
    HelperService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])()
    ], HelperService);
    return HelperService;
}());

//# sourceMappingURL=helpers.js.map

/***/ }),

/***/ 290:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(291);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(413);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 413:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(272);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(274);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(463);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_login_login__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_register_register__ = __webpack_require__(275);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_menu_menu__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_tabs_tabs__ = __webpack_require__(281);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_details_details__ = __webpack_require__(283);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_new_post_modal_new_post_modal__ = __webpack_require__(282);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_image_picker__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_services_firebase_service__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_services_auth_service__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_services_helpers__ = __webpack_require__(284);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_angularfire2__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_angularfire2_firestore__ = __webpack_require__(278);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_angularfire2_storage__ = __webpack_require__(480);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19_angularfire2_auth__ = __webpack_require__(483);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__environment_environment__ = __webpack_require__(488);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






















var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_register_register__["a" /* RegisterPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_menu_menu__["b" /* MenuPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_new_post_modal_new_post_modal__["a" /* NewPostModalPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_details_details__["a" /* DetailsPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_menu_menu__["a" /* FilterPopover */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/posts/posts.module#PostsPageModule', name: 'PostsPage', segment: 'posts', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_16_angularfire2__["a" /* AngularFireModule */].initializeApp(__WEBPACK_IMPORTED_MODULE_20__environment_environment__["a" /* environment */].firebase),
                __WEBPACK_IMPORTED_MODULE_17_angularfire2_firestore__["b" /* AngularFirestoreModule */],
                __WEBPACK_IMPORTED_MODULE_19_angularfire2_auth__["a" /* AngularFireAuthModule */],
                __WEBPACK_IMPORTED_MODULE_18_angularfire2_storage__["a" /* AngularFireStorageModule */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_register_register__["a" /* RegisterPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_menu_menu__["b" /* MenuPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_new_post_modal_new_post_modal__["a" /* NewPostModalPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_details_details__["a" /* DetailsPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_menu_menu__["a" /* FilterPopover */],
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_12__ionic_native_image_picker__["a" /* ImagePicker */],
                __WEBPACK_IMPORTED_MODULE_13__pages_services_firebase_service__["a" /* FirebaseService */],
                __WEBPACK_IMPORTED_MODULE_14__pages_services_auth_service__["a" /* AuthService */],
                __WEBPACK_IMPORTED_MODULE_15__pages_services_helpers__["a" /* HelperService */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 463:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(274);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(272);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_login_login__ = __webpack_require__(152);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_login_login__["a" /* LoginPage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/tjakoen/Desktop/Repository/CIRA/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/Users/tjakoen/Desktop/Repository/CIRA/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 488:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
var environment = {
    production: false,
    firebase: {
        apiKey: "AIzaSyBXvHWJwbrzHs1nO7KMsM2VtiFO1a5o2bo",
        authDomain: "fir-test-70599.firebaseapp.com",
        databaseURL: "https://fir-test-70599.firebaseio.com",
        projectId: "fir-test-70599",
        storageBucket: "fir-test-70599.appspot.com",
        messagingSenderId: "747991487868"
    }
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ 66:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FirebaseService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_toPromise__ = __webpack_require__(276);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_firestore__ = __webpack_require__(278);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase_app__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_firebase_app__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase_storage__ = __webpack_require__(280);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var FirebaseService = /** @class */ (function () {
    function FirebaseService(afs) {
        this.afs = afs;
    }
    // TODO: Dynamic database
    FirebaseService.prototype.getPosts = function (filter) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var currentUser = __WEBPACK_IMPORTED_MODULE_3_firebase_app__["auth"]().currentUser;
            var query = filter == 'all' ? _this.afs.collection('posts') : _this.afs.collection('posts', function (ref) { return ref.where('type', '==', filter); });
            _this.snapshotChangesSubscription = query.snapshotChanges()
                .subscribe(function (snapshots) {
                resolve(snapshots);
            });
        });
    };
    FirebaseService.prototype.unsubscribeOnLogOut = function () {
        //remember to unsubscribe from the snapshotChanges
        // debugger;
        this.snapshotChangesSubscription.unsubscribe();
    };
    FirebaseService.prototype.updateTask = function (taskKey, value) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var currentUser = __WEBPACK_IMPORTED_MODULE_3_firebase_app__["auth"]().currentUser;
            _this.afs.collection('people').doc(currentUser.uid).collection('tasks').doc(taskKey).set(value)
                .then(function (res) { return resolve(res); }, function (err) { return reject(err); });
        });
    };
    FirebaseService.prototype.deleteTask = function (taskKey) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var currentUser = __WEBPACK_IMPORTED_MODULE_3_firebase_app__["auth"]().currentUser;
            _this.afs.collection('people').doc(currentUser.uid).collection('tasks').doc(taskKey).delete()
                .then(function (res) { return resolve(res); }, function (err) { return reject(err); });
        });
    };
    FirebaseService.prototype.createPost = function (value) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var currentUser = __WEBPACK_IMPORTED_MODULE_3_firebase_app__["auth"]().currentUser;
            _this.afs.collection('posts').add({
                date: value.date,
                time: value.time,
                type: value.type,
                name: value.name,
                description: value.description,
                location: value.location,
                imageURL: value.imageURL,
                userID: currentUser.uid,
                timestamp: __WEBPACK_IMPORTED_MODULE_3_firebase_app__["firestore"].FieldValue.serverTimestamp(),
                status: 'unsolved',
            })
                .then(function (res) { return resolve(res); }, function (err) { return reject(err); });
        });
    };
    FirebaseService.prototype.encodeImageUri = function (imageUri, callback) {
        var c = document.createElement('canvas');
        var ctx = c.getContext("2d");
        var img = new Image();
        img.onload = function () {
            var aux = this;
            c.width = aux.width;
            c.height = aux.height;
            ctx.drawImage(img, 0, 0);
            var dataURL = c.toDataURL("image/jpeg");
            callback(dataURL);
        };
        img.src = imageUri;
    };
    ;
    FirebaseService.prototype.uploadImage = function (imageURI, randomId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var storageRef = __WEBPACK_IMPORTED_MODULE_3_firebase_app__["storage"]().ref();
            var imageRef = storageRef.child('image').child(randomId);
            _this.encodeImageUri(imageURI, function (image64) {
                imageRef.putString(image64, 'data_url')
                    .then(function (snapshot) {
                    snapshot.ref.getDownloadURL()
                        .then(function (res) { return resolve(res); });
                }, function (err) {
                    reject(err);
                });
            });
        });
    };
    FirebaseService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_angularfire2_firestore__["a" /* AngularFirestore */]])
    ], FirebaseService);
    return FirebaseService;
}());

//# sourceMappingURL=firebase.service.js.map

/***/ }),

/***/ 85:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_toPromise__ = __webpack_require__(276);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase_app__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_firebase_app__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__firebase_service__ = __webpack_require__(66);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AuthService = /** @class */ (function () {
    function AuthService(firebaseService) {
        this.firebaseService = firebaseService;
    }
    AuthService.prototype.doRegister = function (value) {
        return new Promise(function (resolve, reject) {
            __WEBPACK_IMPORTED_MODULE_2_firebase_app__["auth"]().createUserWithEmailAndPassword(value.email, value.password)
                .then(function (res) { return resolve(res); }, function (err) { return reject(err); });
        });
    };
    AuthService.prototype.doLogin = function (value) {
        return new Promise(function (resolve, reject) {
            __WEBPACK_IMPORTED_MODULE_2_firebase_app__["auth"]().signInWithEmailAndPassword(value.email, value.password)
                .then(function (res) { return resolve(res); }, function (err) { return reject(err); });
        });
    };
    AuthService.prototype.doLogout = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (__WEBPACK_IMPORTED_MODULE_2_firebase_app__["auth"]().currentUser) {
                __WEBPACK_IMPORTED_MODULE_2_firebase_app__["auth"]().signOut()
                    .then(function () {
                    _this.firebaseService.unsubscribeOnLogOut();
                    resolve();
                }).catch(function (error) {
                    reject();
                });
            }
        });
    };
    AuthService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__firebase_service__["a" /* FirebaseService */]])
    ], AuthService);
    return AuthService;
}());

//# sourceMappingURL=auth.service.js.map

/***/ })

},[290]);
//# sourceMappingURL=main.js.map