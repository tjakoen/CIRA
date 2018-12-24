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
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import 'firebase/storage';
var FirebaseService = /** @class */ (function () {
    function FirebaseService(afs) {
        this.afs = afs;
        this.currentUser = firebase.auth().currentUser;
    }
    // TODO: Dynamic database
    FirebaseService.prototype.getPosts = function (filter) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var query = filter == 'all' ? _this.afs.collection('posts') : _this.afs.collection('posts', function (ref) { return ref.where('type', '==', filter); });
            _this.snapshotChangesSubscription = query.snapshotChanges()
                .subscribe(function (snapshots) {
                resolve(snapshots);
            });
        });
    };
    FirebaseService.prototype.getReports = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var currentUser = firebase.auth().currentUser;
            var query = _this.afs.collection('reports', function (ref) { return ref.where('userID', '==', currentUser.uid); });
            _this.snapshotChangesSubscription = query.snapshotChanges()
                .subscribe(function (snapshots) {
                resolve(snapshots);
            });
        });
    };
    FirebaseService.prototype.getData = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var query = _this.afs.collection('data');
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
            _this.afs.collection('people').doc(_this.currentUser.uid).collection('tasks').doc(taskKey).set(value)
                .then(function (res) { return resolve(res); }, function (err) { return reject(err); });
        });
    };
    FirebaseService.prototype.deletePost = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var currentUser = firebase.auth().currentUser;
            _this.afs.collection('posts').doc(id).delete()
                .then(function (res) { return resolve(res); }, function (err) { return reject(err); });
        });
    };
    FirebaseService.prototype.deleteReport = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var currentUser = firebase.auth().currentUser;
            _this.afs.collection('reports').doc(id).delete()
                .then(function (res) { return resolve(res); }, function (err) { return reject(err); });
        });
    };
    FirebaseService.prototype.createPost = function (value) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var currentUser = firebase.auth().currentUser;
            _this.afs.collection('posts').add({
                date: value.date,
                time: value.time,
                type: value.type,
                name: value.name,
                description: value.description,
                location: value.location,
                imageURL: value.imageURL,
                userID: currentUser.uid,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                status: 'unsolved',
            })
                .then(function (res) { return resolve(res); }, function (err) { return reject(err); });
        });
    };
    FirebaseService.prototype.updatePost = function (value, oldvalue) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            console.log(oldvalue.documentId);
            _this.afs.doc('posts/' + oldvalue.documentId).update({
                date: value.date,
                time: value.time,
                type: value.type,
                name: value.name,
                description: value.description,
                location: value.location,
                imageURL: value.imageURL,
                status: 'unsolved',
            })
                .then(function (res) { return resolve(res); }, function (err) { return reject(err); });
        });
    };
    FirebaseService.prototype.createReport = function (value, status) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var currentUser = firebase.auth().currentUser;
            _this.afs.collection('reports').add({
                userID: currentUser.uid,
                blotterNo: value.blotterNo,
                status: status,
                createdOn: firebase.firestore.FieldValue.serverTimestamp(),
                updatedOn: firebase.firestore.FieldValue.serverTimestamp(),
                incidentType: value.incidentType,
                incidentLocation: value.incidentLocation,
                incidentDateAndTime: value.incidentDateAndTime,
                itemA: {
                    name: {
                        familyName: value.itemA.name.familyName,
                        firstName: value.itemA.name.firstName,
                        middleName: value.itemA.name.middleName,
                        qualifier: value.itemA.name.qualifier,
                        nickName: value.itemA.name.nickName,
                    },
                    citizenship: value.itemA.citizenship,
                    sex: value.itemA.sex,
                    civilStatus: value.itemA.civilStatus,
                    birthDate: value.itemA.birthDate,
                    age: value.itemA.age,
                    birthPlace: value.itemA.birthPlace,
                    currentAddress: {
                        houseNumber: value.itemA.currentAddress.houseNumber,
                        village: value.itemA.currentAddress.village,
                        barangay: value.itemA.currentAddress.barangay,
                        town: value.itemA.currentAddress.town,
                        province: value.itemA.currentAddress.province,
                    },
                    otherAddress: {
                        houseNumber: value.itemA.otherAddress.houseNumber,
                        village: value.itemA.otherAddress.village,
                        barangay: value.itemA.otherAddress.barangay,
                        town: value.itemA.otherAddress.town,
                        province: value.itemA.otherAddress.province,
                    },
                    highestEducationalAttainment: value.itemA.highestEducationalAttainment,
                    occupation: value.itemA.occupation,
                    idCardPresented: value.itemA.idCardPresented,
                    contactInfo: {
                        emailAddress: value.itemA.contactInfo.emailAddress,
                        homePhone: value.itemA.contactInfo.homePhone,
                        mobilePhone: value.itemA.contactInfo.mobilePhone,
                    }
                },
                itemB: {
                    name: {
                        familyName: value.itemB.name.familyName,
                        firstName: value.itemB.name.firstName,
                        middleName: value.itemB.name.middleName,
                        qualifier: value.itemB.name.qualifier,
                        nickName: value.itemB.name.nickName,
                    },
                    citizenship: value.itemB.citizenship,
                    sex: value.itemB.sex,
                    civilStatus: value.itemB.civilStatus,
                    birthDate: value.itemB.birthDate,
                    age: value.itemB.age,
                    birthPlace: value.itemB.birthPlace,
                    currentAddress: {
                        houseNumber: value.itemB.currentAddress.houseNumber,
                        village: value.itemB.currentAddress.village,
                        barangay: value.itemB.currentAddress.barangay,
                        town: value.itemB.currentAddress.town,
                        province: value.itemB.currentAddress.province,
                    },
                    otherAddress: {
                        houseNumber: value.itemB.otherAddress.houseNumber,
                        village: value.itemB.otherAddress.village,
                        barangay: value.itemB.otherAddress.barangay,
                        town: value.itemB.otherAddress.town,
                        province: value.itemB.otherAddress.province,
                    },
                    highestEducationalAttainment: value.itemB.highestEducationalAttainment,
                    occupation: value.itemB.occupation,
                    bioData: {
                        height: value.itemB.bioData.height,
                        weight: value.itemB.bioData.weight,
                        eyeColor: value.itemB.bioData.eyeColor,
                        eyeDescription: value.itemB.bioData.eyeDescription,
                        hairColor: value.itemB.bioData.hairColor,
                        hairDescription: value.itemB.bioData.hairDescription,
                        influence: value.itemB.bioData.influence,
                    },
                    children: {
                        guardianName: value.itemB.children.guardianName,
                        guardianAddress: value.itemB.children.guardianAddress,
                        homePhone: value.itemB.children.homePhone,
                        mobilePhone: value.itemB.children.mobilePhone,
                    },
                    otherDistinguishingFeatures: value.itemB.otherDistinguishingFeatures,
                },
                itemC: {
                    name: {
                        familyName: value.itemC.name.familyName,
                        firstName: value.itemC.name.firstName,
                        middleName: value.itemC.name.middleName,
                        qualifier: value.itemC.name.qualifier,
                        nickName: value.itemC.name.nickName,
                    },
                    citizenship: value.itemC.citizenship,
                    sex: value.itemC.sex,
                    civilStatus: value.itemC.civilStatus,
                    birthDate: value.itemC.birthDate,
                    age: value.itemC.age,
                    birthPlace: value.itemC.birthPlace,
                    currentAddress: {
                        houseNumber: value.itemC.currentAddress.houseNumber,
                        village: value.itemC.currentAddress.village,
                        barangay: value.itemC.currentAddress.barangay,
                        town: value.itemC.currentAddress.town,
                        province: value.itemC.currentAddress.province,
                    },
                    otherAddress: {
                        houseNumber: value.itemC.otherAddress.houseNumber,
                        village: value.itemC.otherAddress.village,
                        barangay: value.itemC.otherAddress.barangay,
                        town: value.itemC.otherAddress.town,
                        province: value.itemC.otherAddress.province,
                    },
                    highestEducationalAttainment: value.itemC.highestEducationalAttainment,
                    occupation: value.itemC.occupation,
                    idCardPresented: value.itemC.idCardPresented,
                    contactInfo: {
                        emailAddress: value.itemC.contactInfo.emailAddress,
                        homePhone: value.itemC.contactInfo.homePhone,
                        mobilePhone: value.itemC.contactInfo.mobilePhone,
                    },
                },
                itemD: {
                    incidentNarrative: value.itemD.incidentNarrative,
                }
            })
                .then(function (res) { return resolve(res); }, function (err) { return reject(err); });
        });
    };
    FirebaseService.prototype.updateReport = function (value, oldvalue) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            console.log(oldvalue.documentId);
            _this.afs.collection('reports').doc(oldvalue.documentId).update({
                blotterNo: value.blotterNo,
                status: value.status,
                createdOn: value.createdOn,
                updatedOn: firebase.firestore.FieldValue.serverTimestamp(),
                incidentType: value.incidentType,
                incidentLocation: value.incidentLocation,
                incidentDateAndTime: value.incidentDateAndTime,
                itemA: {
                    name: {
                        familyName: value.itemA.name.familyName,
                        firstName: value.itemA.name.firstName,
                        middleName: value.itemA.name.middleName,
                        qualifier: value.itemA.name.qualifier,
                        nickName: value.itemA.name.nickName,
                    },
                    citizenship: value.itemA.citizenship,
                    sex: value.itemA.sex,
                    civilStatus: value.itemA.civilStatus,
                    birthDate: value.itemA.birthDate,
                    age: value.itemA.age,
                    birthPlace: value.itemA.birthPlace,
                    currentAddress: {
                        houseNumber: value.itemA.currentAddress.houseNumber,
                        village: value.itemA.currentAddress.village,
                        barangay: value.itemA.currentAddress.barangay,
                        town: value.itemA.currentAddress.town,
                        province: value.itemA.currentAddress.province,
                    },
                    otherAddress: {
                        houseNumber: value.itemA.otherAddress.houseNumber,
                        village: value.itemA.otherAddress.village,
                        barangay: value.itemA.otherAddress.barangay,
                        town: value.itemA.otherAddress.town,
                        province: value.itemA.otherAddress.province,
                    },
                    highestEducationalAttainment: value.itemA.highestEducationalAttainment,
                    occupation: value.itemA.occupation,
                    idCardPresented: value.itemA.idCardPresented,
                    contactInfo: {
                        emailAddress: value.itemA.contactInfo.emailAddress,
                        homePhone: value.itemA.contactInfo.homePhone,
                        mobilePhone: value.itemA.contactInfo.mobilePhone,
                    }
                },
                itemB: {
                    name: {
                        familyName: value.itemB.name.familyName,
                        firstName: value.itemB.name.firstName,
                        middleName: value.itemB.name.middleName,
                        qualifier: value.itemB.name.qualifier,
                        nickName: value.itemB.name.nickName,
                    },
                    citizenship: value.itemB.citizenship,
                    sex: value.itemB.sex,
                    civilStatus: value.itemB.civilStatus,
                    birthDate: value.itemB.birthDate,
                    age: value.itemB.age,
                    birthPlace: value.itemB.birthPlace,
                    currentAddress: {
                        houseNumber: value.itemB.currentAddress.houseNumber,
                        village: value.itemB.currentAddress.village,
                        barangay: value.itemB.currentAddress.barangay,
                        town: value.itemB.currentAddress.town,
                        province: value.itemB.currentAddress.province,
                    },
                    otherAddress: {
                        houseNumber: value.itemB.otherAddress.houseNumber,
                        village: value.itemB.otherAddress.village,
                        barangay: value.itemB.otherAddress.barangay,
                        town: value.itemB.otherAddress.town,
                        province: value.itemB.otherAddress.province,
                    },
                    highestEducationalAttainment: value.itemB.highestEducationalAttainment,
                    occupation: value.itemB.occupation,
                    bioData: {
                        height: value.itemB.bioData.height,
                        weight: value.itemB.bioData.weight,
                        eyeColor: value.itemB.bioData.eyeColor,
                        eyeDescription: value.itemB.bioData.eyeDescription,
                        hairColor: value.itemB.bioData.hairColor,
                        hairDescription: value.itemB.bioData.hairDescription,
                        influence: value.itemB.bioData.influence,
                    },
                    children: {
                        guardianName: value.itemB.children.guardianName,
                        guardianAddress: value.itemB.children.guardianAddress,
                        homePhone: value.itemB.children.homePhone,
                        mobilePhone: value.itemB.children.mobilePhone,
                    },
                    otherDistinguishingFeatures: value.itemB.otherDistinguishingFeatures,
                },
                itemC: {
                    name: {
                        familyName: value.itemC.name.familyName,
                        firstName: value.itemC.name.firstName,
                        middleName: value.itemC.name.middleName,
                        qualifier: value.itemC.name.qualifier,
                        nickName: value.itemC.name.nickName,
                    },
                    citizenship: value.itemC.citizenship,
                    sex: value.itemC.sex,
                    civilStatus: value.itemC.civilStatus,
                    birthDate: value.itemC.birthDate,
                    age: value.itemC.age,
                    birthPlace: value.itemC.birthPlace,
                    currentAddress: {
                        houseNumber: value.itemC.currentAddress.houseNumber,
                        village: value.itemC.currentAddress.village,
                        barangay: value.itemC.currentAddress.barangay,
                        town: value.itemC.currentAddress.town,
                        province: value.itemC.currentAddress.province,
                    },
                    otherAddress: {
                        houseNumber: value.itemC.otherAddress.houseNumber,
                        village: value.itemC.otherAddress.village,
                        barangay: value.itemC.otherAddress.barangay,
                        town: value.itemC.otherAddress.town,
                        province: value.itemC.otherAddress.province,
                    },
                    highestEducationalAttainment: value.itemC.highestEducationalAttainment,
                    occupation: value.itemC.occupation,
                    idCardPresented: value.itemC.idCardPresented,
                    contactInfo: {
                        emailAddress: value.itemC.contactInfo.emailAddress,
                        homePhone: value.itemC.contactInfo.homePhone,
                        mobilePhone: value.itemC.contactInfo.mobilePhone,
                    },
                },
                itemD: {
                    incidentNarrative: value.itemD.incidentNarrative,
                }
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
            var storageRef = firebase.storage().ref();
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
        Injectable(),
        __metadata("design:paramtypes", [AngularFirestore])
    ], FirebaseService);
    return FirebaseService;
}());
export { FirebaseService };
//# sourceMappingURL=firebase.service.js.map