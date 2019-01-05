import { Injectable } from "@angular/core";
import { FirebaseService } from '../services/firebase.service';

@Injectable()
export class UserInfoService {
    private afs;

    constructor(
        public firebaseService: FirebaseService,
    ){
        this.afs = firebaseService.afs;
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
    uid = typeof uid == 'undefined' ? this.firebaseService.getCurrentUser().uid : uid
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



}
