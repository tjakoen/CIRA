import { Injectable } from "@angular/core";
import 'rxjs/add/operator/toPromise';
import * as firebase from 'firebase/app';
import { FirebaseService } from './firebase.service';

@Injectable()
export class AuthService {

  constructor(
    private firebaseService: FirebaseService
  ){}

  doRegister(value){
   return new Promise<any>((resolve, reject) => {
     firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
     .then(
       res => resolve(res),
       err => reject(err))
   })
  }

  doLogin(value){
   return new Promise<any>((resolve, reject) => {
     firebase.auth().signInWithEmailAndPassword(value.email, value.password)
     .then(
       res => resolve(res),
       err => reject(err))
   })
  }

  doLogout(){
    return new Promise((resolve, reject) => {
      if(firebase.auth().currentUser){
        firebase.auth().signOut()
        .then(() => {
          this.firebaseService.unsubscribeOnLogOut();
          resolve();
        }).catch((error) => {
          reject();
        });
      }
    })
  }

  sendVerificationEmail() {
    return new Promise((resolve, reject) => {
      if(firebase.auth().currentUser){
        firebase.auth().currentUser.sendEmailVerification()
        .then(() => {
          resolve();
        }).catch((error) => {
          reject();
        });
      }
    })
  }

  sendPasswordResetEmail() {
    return new Promise((resolve, reject) => {
      let currentUser = firebase.auth().currentUser
      if( currentUser ){
        firebase.auth().sendPasswordResetEmail( currentUser.email )
        .then(() => {
          resolve();
        }).catch((error) => {
          reject();
        });
      }
    });
  }

  sendEmailChangeEmail( newEmail, password ) {
    console.log(password);
    return new Promise((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      let credential = firebase.auth.EmailAuthProvider.credential(currentUser.email, password);

      currentUser.reauthenticateWithCredential( credential )
      .then(() => {
        // User re-authenticated.
        currentUser.updateEmail(newEmail).then(() => {
          this.sendVerificationEmail();
          resolve();
        });
      }).catch((error) => {
        // An error happened.
        reject();
      });
    });
  }
}
