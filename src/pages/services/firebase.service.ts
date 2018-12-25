import { Injectable } from "@angular/core";
import 'rxjs/add/operator/toPromise';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import 'firebase/storage';

@Injectable()
export class FirebaseService {

  private snapshotChangesSubscription: any;
  constructor(public afs: AngularFirestore){}

  getCurrentUser() {
    return firebase.auth().currentUser;
  }
  
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

  createPost( value ) {    
    return new Promise<any>((resolve, reject) => {
      value.status = 'unsolved';
      value.timestamp = firebase.firestore.FieldValue.serverTimestamp();
      value.userId = this.getCurrentUser().uid;
      this.afs.collection('posts').add( value )
      .then(
        res => resolve(res),
        err => reject(err)
      )
    })
  }

  updatePost( value, postId ){
    return new Promise<any>((resolve, reject) => {
      value.status = 'unsolved';
      this.afs.collection('posts').doc( postId ).update(value)
      .then(() => {
        this.afs.collection('posts').doc( postId ).valueChanges().subscribe(res => {
          resolve({ data: res });  // Get Updated Data
        });
      });
    });
  }

  deletePost(id){
    return new Promise<any>((resolve, reject) => {
      this.afs.collection('posts').doc(id).delete()
      .then(
        res => resolve(res),
        err => reject(err)
      )
    })
  }

  getReports(){
    return new Promise<any>((resolve, reject) => {
      let query = this.afs.collection('reports',  ref => ref.where('userID', '==', this.getCurrentUser().uid)) ;
      this.snapshotChangesSubscription =  query.snapshotChanges()
      .subscribe(snapshots => {
        resolve(snapshots);
      })
    });
  }

  deleteReport(id){
    return new Promise<any>((resolve, reject) => {
      this.afs.collection('reports').doc(id).delete()
      .then(
        res => resolve(res),
        err => reject(err)
      )
    })
  }

  createReport(value, status){
    return new Promise<any>((resolve, reject) => {
      value.createdOn = firebase.firestore.FieldValue.serverTimestamp();
      value.updatedOn = firebase.firestore.FieldValue.serverTimestamp();
      value.userId = this.getCurrentUser().uid;
      value.status = status;
      this.afs.collection('reports').add( value )
      .then(
        res => resolve(res),
        err => reject(err)
      )
    })
  }

  updateReport( value, reportId ) {
    return new Promise<any>((resolve, reject) => {
      value.updatedOn = firebase.firestore.FieldValue.serverTimestamp();
      this.afs.collection( 'reports' ).doc( reportId ).update( value ) 
      .then(
        res => resolve(res),
        err => reject(err)
      )
    })
  }

  getUserDetails( uid ) {
    return new Promise<any>((resolve, reject) => {
      // Create User Document if not exists
      this.afs.doc(`users/${uid}`)
      .update({})
      .then(() => {
        this.afs.doc(`users/${uid}`).valueChanges().subscribe(res => {
          resolve({ userData: res });
        });
      })
      .catch((error) => {
        this.afs.doc(`users/${uid}`)
          .set({
            infoSet: false
          }) 
          .then(() => {
            this.afs.doc(`users/${uid}`).valueChanges().subscribe(res => {
              resolve({ userData: res });
            });
          })
      });

    });
  }

  updateUser( value, uid? ) {
    uid = typeof uid == 'undefined' ? this.getCurrentUser().uid : uid
    return new Promise<any>((resolve, reject) => {
      this.afs.doc( `users/${uid}` )
        .update( value )
        .then(() => {
          this.afs.doc(`users/${uid}`).valueChanges().subscribe(res => {
            resolve({ data: res });
          });
      });
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

  unsubscribeOnLogOut(){
    //remember to unsubscribe from the snapshotChanges
    // debugger;
    this.snapshotChangesSubscription.unsubscribe();
  }
}
