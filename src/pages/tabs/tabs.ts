import { Component } from '@angular/core';

import {PostsPage} from '../posts/posts';
import {DataPage} from '../data/data';
import { ReportsPage } from '../reports/reports';
import { ReportsService } from '../reports/reports.service';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  draftCount:Number

  tab1Root = PostsPage;
  tab2Root = ReportsPage;
  tab3Root = DataPage;

  constructor( private reportsService: ReportsService, ) {
      this.reportsService.getReports();
      this.reportsService.collection.snapshotChanges().subscribe( data => {
         if (data) {
          let cnt = 0;
          data.map( dataMap => {
            let report = dataMap.payload.doc.data();
            if ( report.publishStatus.toLowerCase() != 'published' ) {
              cnt++;
            }
          }); 
          this.draftCount =  cnt; 	
          console.log( this.draftCount );	
         }
    });
  }

}
