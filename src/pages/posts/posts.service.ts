import { Injectable } from "@angular/core";
import { FirebaseService } from '../services/firebase.service';

@Injectable()
export class PostsService {
    private afs;
    private snapshotChangesSubscription: any;

  constructor(
      public firebaseService: FirebaseService,
    ){
       this.afs = firebaseService.afs;
    }
  
  // TODO: Dynamic database
  getPosts( filter ){
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
      value.timestamp = this.firebaseService.getTimeStamp();
      value.userId = this.firebaseService.getCurrentUser().uid;
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

  deletePost( id ){
    return new Promise<any>((resolve, reject) => {
      this.afs.collection('posts').doc(id).delete()
      .then(
        res => resolve(res),
        err => reject(err)
      )
    })
  }
}
