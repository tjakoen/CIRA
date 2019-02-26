import { Injectable } from "@angular/core";
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import { Observable } from "rxjs";


export class Upload {

  $key: string;
  file:File;
  name:string;
  url:string;
  progress:number;
  createdAt: Date = new Date();

  constructor(file:File) {
    this.file = file;
  }
}

@Injectable()
export class FirebaseService {
  
  private snapshotChangesSubscription: any;
  
  constructor(public afs: AngularFirestore){}

  getCurrentUser() {
    return firebase.auth().currentUser;
  }

  unsubscribeOnLogOut(){
    //remember to unsubscribe from the snapshotChanges
    // debugger;
    this.snapshotChangesSubscription.unsubscribe();
  }
}


@Injectable()
export class UploadService {

  constructor(private afs: AngularFirestore) { }

  private basePath:string = '/uploads';
  uploads: Observable<Upload[]>;

  pushUpload(upload: Upload) {
    return new Promise<any>((resolve, reject) => {
      let storageRef = firebase.storage().ref();
      let uploadTask = storageRef.child(`${this.basePath}/${upload.file.name}`).put(upload.file);

      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) =>  {
          // upload in progress
        // upload.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        },
        (error) => {
          // upload failed
          console.log(error)
        },
        () => {
          // upload success
          uploadTask.snapshot.ref.getDownloadURL().then(
            res => {
              upload.url = res;
              console.log( upload.url  )
              upload.name = upload.file.name
              resolve(upload.url);
            }
        );
      });
    });
  }
}