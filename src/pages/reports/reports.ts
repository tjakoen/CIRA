import { Component } from '@angular/core';
import { NavController, ModalController,PopoverController, NavParams } from 'ionic-angular';
import { AuthService } from '../services/auth.service';
import { FirebaseService } from '../services/firebase.service';

import { ReportDetailPage } from './report-details/report-details';
import { HelperService } from '../services/helpers.service';

import { NewReportModalPage } from './new-report-modal/new-report-modal';

@Component({
  selector: 'page-reports',
  templateUrl: 'reports.html'
})
export class ReportsPage {

  
  reportData = [];
  filteredReportData = [];
  reports = [];

  filters = {
    viewType:'all',
  }
  
  constructor(
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private authService: AuthService,
    private firebaseService: FirebaseService,
    private helperService: HelperService,
    private popCtrl: PopoverController,

  ) {}
  
  ionViewWillEnter(){
    this.getData();
  }

  displayReports() {
    this.proccessPosts( ( callback ) => {
      if ( callback ) {
        this.reports = this.filteredReportData;
      }
    });
  }

  proccessPosts( callback ) {
    this.filteredReportData =[];
    let filterdValue = this.filterReports( this.reportData );
    //let orderedValue = this.helperService.sortByKey( filterdValue, this.filters.orderBy, this.filters.orderDirection );
    //this.filteredReportData = orderedValue;
    this.filteredReportData = filterdValue;
    callback( true );
  }

  filterReports( data ) {
    data = this.filters.viewType != 'all' ? this.helperService.filterByKey( data, 'type', this.filters.viewType ) : data;
    return data;
  }

  getData(){
    this.firebaseService.getReports()
    .then(data => {
      if (data) {
        data.map( dataMap => {
          let report = dataMap.payload.doc.data();
          report.documentId = dataMap.payload.doc.id;
          this.reportData.push( report );
          this.displayReports();
        });  		
      }
    })
  }

  viewDetails( report ){  
    this.navCtrl.push(ReportDetailPage, {
      data: report
    })
  }

  openNewReportModal(){
    let modal = this.modalCtrl.create(NewReportModalPage);
    modal.onDidDismiss( data => {
      if ( typeof data != 'undefined' ) {
        this.displayReports();
      }
    });
    modal.present();
  }

}

