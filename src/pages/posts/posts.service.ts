import { Injectable } from "@angular/core";
import { FirebaseService } from '../services/firebase.service';
import { Post } from './post.model';

@Injectable()
export class PostsService {
  private afs;
  private snapshotChangesSubscription: any;
  collection: any;

  constructor(
      public firebaseService: FirebaseService,
    ){
       this.afs = firebaseService.afs;
    }
  
  // TODO: Dynamic database
  getPosts( filter ){
    return new Promise<any>((resolve, reject) => {
      this.collection = filter == 'all' ? this.afs.collection('posts') : this.afs.collection('posts', ref => ref.where('type', '==', filter))
      this.snapshotChangesSubscription =  this.collection.snapshotChanges()
      .subscribe(snapshots => {
        resolve(snapshots);
      })
    });
  }

  createPost( value:Post ) {    
    return new Promise<any>((resolve, reject) => {
      value.createdOn = new Date();
      value.updatedOn = new Date();
      value.userId = this.firebaseService.getCurrentUser().uid;
      this.afs.collection('posts').add( value )
      .then(
        res => resolve(res),
        err => reject(err)
      )
    })
  }

  updatePost( value:Post, postId ){
    return new Promise<any>((resolve, reject) => {
      value.updatedOn = new Date();
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
