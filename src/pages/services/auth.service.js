var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from "@angular/core";
import 'rxjs/add/operator/toPromise';
import * as firebase from 'firebase/app';
import { FirebaseService } from './firebase.service';
var AuthService = /** @class */ (function () {
    function AuthService(firebaseService) {
        this.firebaseService = firebaseService;
    }
    AuthService.prototype.doRegister = function (value) {
        return new Promise(function (resolve, reject) {
            firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
                .then(function (res) { return resolve(res); }, function (err) { return reject(err); });
        });
    };
    AuthService.prototype.doLogin = function (value) {
        return new Promise(function (resolve, reject) {
            firebase.auth().signInWithEmailAndPassword(value.email, value.password)
                .then(function (res) { return resolve(res); }, function (err) { return reject(err); });
        });
    };
    AuthService.prototype.doLogout = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (firebase.auth().currentUser) {
                firebase.auth().signOut()
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
        Injectable(),
        __metadata("design:paramtypes", [FirebaseService])
    ], AuthService);
    return AuthService;
}());
export { AuthService };
//# sourceMappingURL=auth.service.js.map