import { Injectable } from "@angular/core";
import { FirebaseService } from '../services/firebase.service';
import { Report } from './report.model';

@Injectable()
export class ReportsService {
    private afs;
    private snapshotChangesSubscription: any;

  constructor(
      public firebaseService: FirebaseService,
    ){
       this.afs = firebaseService.afs;
    }
  
    getReports(){
      return new Promise<any>((resolve, reject) => {
        let query = this.afs.collection('reports',  ref => ref.where('userId', '==', this.firebaseService.getCurrentUser().uid)) ;
        this.snapshotChangesSubscription =  query.snapshotChanges()
        .subscribe(snapshots => {
          resolve(snapshots);
        })
      });
    }

    createReport( value:Report  ){
      return new Promise<any>((resolve, reject) => {
        value.createdOn = new Date();
        value.updatedOn = new Date();
        value.userId = this.firebaseService.getCurrentUser().uid;
        this.afs.collection('reports').add( JSON.parse(JSON.stringify( value )) )
        .then(
          res => resolve(res),
          err => reject(err)
        )
      })
    }

    updateReport( value:Report ) {
      return new Promise<any>((resolve, reject) => {
        value.updatedOn = new Date();
        this.afs.collection( 'reports' ).doc( value.documentId ).update( value ) 
        .then(() => {
          this.afs.collection('reports').doc( value.documentId ).valueChanges().subscribe(res => {
            resolve({ data: res });  // Get Updated Data
          });
        });
      })
    }
    
      deleteReport( id:string ){
        return new Promise<any>((resolve, reject) => {
          this.afs.collection('reports').doc(id).delete()
          .then(
            res => resolve(res),
            err => reject(err)
          )
        })
      }
    
     
    
      

}
