import { Injectable } from "@angular/core";
import 'rxjs/add/operator/toPromise';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import 'firebase/storage';

@Injectable()
export class FirebaseService {

  private snapshotChangesSubscription: any;
  currentUser = firebase.auth().currentUser;

  constructor(public afs: AngularFirestore){}

  // TODO: Dynamic database
  getPosts(filter){
    return new Promise<any>((resolve, reject) => {
      let query = filter == 'all' ? this.afs.collection('posts') : this.afs.collection('posts', ref => ref.where('type', '==', filter))
      this.snapshotChangesSubscription =  query.snapshotChanges()
      .subscribe(snapshots => {
        resolve(snapshots);
      })
    });
  }

  getReports(){
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      let query = this.afs.collection('reports',  ref => ref.where('userID', '==', currentUser.uid)) ;
      
      this.snapshotChangesSubscription =  query.snapshotChanges()
      .subscribe(snapshots => {
        resolve(snapshots);
      })
    });
  }

  getData() {
    return new Promise<any>((resolve, reject) => {
      let query = this.afs.collection('data');
      this.snapshotChangesSubscription =  query.snapshotChanges()
      .subscribe(snapshots => {
        resolve(snapshots);
      })
    });
  }

  unsubscribeOnLogOut(){
    //remember to unsubscribe from the snapshotChanges
    // debugger;
    this.snapshotChangesSubscription.unsubscribe();
  }

  updateTask(taskKey, value){
    return new Promise<any>((resolve, reject) => {
      this.afs.collection('people').doc(this.currentUser.uid).collection('tasks').doc(taskKey).set(value)
      .then(
        res => resolve(res),
        err => reject(err)
      )
    })
  }

  deletePost(id){
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.afs.collection('posts').doc(id).delete()
      .then(
        res => resolve(res),
        err => reject(err)
      )
    })
  }

  deleteReport(id){
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.afs.collection('reports').doc(id).delete()
      .then(
        res => resolve(res),
        err => reject(err)
      )
    })
  }

  createPost(value){
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.afs.collection('posts').add({
        date: value.date,
        time: value.time,
        type: value.type,
        name: value.name,
        description: value.description,
        location: value.location,
        imageURL: value.imageURL,
        userID: currentUser.uid, // Current User
        timestamp: firebase.firestore.FieldValue.serverTimestamp(), // Server Timestamp
        status: 'unsolved',
      })
      .then(
        res => resolve(res),
        err => reject(err)
      )
    })
  }

  updatePost(value, oldvalue){
    return new Promise<any>((resolve, reject) => {
      console.log(oldvalue.documentId)
      this.afs.doc( 'posts/' + oldvalue.documentId).update({
        date: value.date,
        time: value.time,
        type: value.type,
        name: value.name,
        description: value.description,
        location: value.location,
        imageURL: value.imageURL,
        status: 'unsolved',
      })
      .then(
        res => resolve(res),
        err => reject(err)
      )
    })
  }

  createReport(value, status){
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.afs.collection('reports').add({
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
      .then(
        res => resolve(res),
        err => reject(err)
      )
    })
  }

  updateReport(value, oldvalue){
    return new Promise<any>((resolve, reject) => {
      console.log(oldvalue.documentId)
      this.afs.collection('reports').doc(oldvalue.documentId).update({
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
      .then(
        res => resolve(res),
        err => reject(err)
      )
    })
  }

  encodeImageUri(imageUri, callback) {
    var c = document.createElement('canvas');
    var ctx = c.getContext("2d");
    var img = new Image();
    img.onload = function () {
      var aux:any = this;
      c.width = aux.width;
      c.height = aux.height;
      ctx.drawImage(img, 0, 0);
      var dataURL = c.toDataURL("image/jpeg");
      callback(dataURL);
    };
    img.src = imageUri;
  };

  uploadImage(imageURI, randomId){
    return new Promise<any>((resolve, reject) => {
      let storageRef = firebase.storage().ref();
      let imageRef = storageRef.child('image').child(randomId);
      this.encodeImageUri(imageURI, function(image64){
        imageRef.putString(image64, 'data_url')
        .then(snapshot => {
          snapshot.ref.getDownloadURL()
          .then(res => resolve(res))
        }, err => {
          reject(err);
        })
      })
    })
  }

  getUserDetails( uid ) {
    return new Promise<any>((resolve, reject) => {
      // Create User Document if not exists
      this.afs.doc(`users/${uid}`)
      .update({})
      .then(() => {
        resolve({ userData:this.afs.doc(`users/${uid}`).valueChanges()});
      })
      .catch((error) => {
        // console.log('Error updating user', error); // (document does not exists)
        this.afs.doc(`users/${uid}`)
          .set(
            {
              infoSet: false
            }
          ) .then(() => {
            resolve({ userData: this.afs.doc(`users/${uid}`).valueChanges()});
          });
         
      });

    });
  }


}
