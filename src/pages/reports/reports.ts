import { Component } from '@angular/core';
import { ViewController, NavParams, ModalController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { ReportsService } from './reports.service'

import { HelperService } from '../services/helpers.service';
import { Globals } from '../services/globals';

import { Report } from './report.model';

@Component({
  selector: './templates/page-reports',
  templateUrl: './templates/reports.html'
})
export class ReportsPage {
  reportData:Report[] = [];
  filteredReportData:Report[] = [];
  reports:Report[] = [];

  filters = {
    viewType:'all',
  }
  
  constructor(
    private modalCtrl: ModalController,
    private helperService: HelperService,
    private reportsService: ReportsService,
  ) {}
  
  ionViewWillEnter(){
    this.getData();
  }

  // Gets Data
  getData(){
    this.reportsService.getReports()
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

  // Display Data
  displayReports() {
    this.reports = [];
    this.proccessReports( ( callback ) => {
      if ( callback ) {
        this.reports = this.filteredReportData;
      }
    });
  }

  // Filters Displayed Data
  proccessReports( callback ) {
    this.filteredReportData =[];
    let filterdValue = this.filterReports( this.reportData );
    //let orderedValue = this.helperService.sortByKey( filterdValue, this.filters.orderBy, this.filters.orderDirection );
    //this.filteredReportData = orderedValue;
    this.filteredReportData = filterdValue;
    callback( true );
  }

  // TODO: Improved multi-key filtering
  // Filters data based on each set key
  filterReports( data ) {
    data = this.filters.viewType != 'all' ? this.helperService.filterByKey( data, 'type', this.filters.viewType ) : data;
    return data;
  }

  // (Button Action) Opens Modal to view data of one item
  viewDetails( data ) {  
    let modal = this.modalCtrl.create(ReportDetailsModal, { data: data });
    modal.onDidDismiss( res => {
      if ( typeof res != 'undefined' ) {
        this.getData();
      }
    });
    modal.present();
  }

  // (Button Action) Opens modal to create/edit data
  openNewReportModal(){
    let modal = this.modalCtrl.create(ReportDetailsModal, { new: true });
    modal.onDidDismiss( res => {
      if ( typeof res != 'undefined' ) {
        this.reportData = [];
        this.displayReports();
      }
    });
    modal.present();
  }

} // End of Reports Page

@Component({
  selector: './templates/page-report-details',
  templateUrl: './templates/report-details-modal.html'
})
export class ReportDetailsModal {
  report: Report;
  loading: any;
  update = false;
  published = false;

  edit = false;
  new = true;

  valid:boolean;
  validationMessage = '(required)';

  constructor(
    private navParams: NavParams,
    private viewCtrl: ViewController,
    private reportsService: ReportsService,
    public modalCtrl: ModalController,
    private globals: Globals,
  ) {
    this.new = this.navParams.get('new');
    if ( this.new ) {
      this.edit = true;
    } else {
      this.report = this.navParams.get('data');
      this.published = this.report.status == 'published' ? true : false;
    }
  }

  ionViewWillEnter(){
    this.valid = true;
  }

  invalidate() {
    this.valid = false;
    return this.validationMessage;
  }

  dismiss() {
    if ( this.update ) {
      this.globals.showYesNoConfirmDialog( 'Confirm', `Are you sure you want to exit with unsaved changes?`, confirm => {
        if ( confirm ) {
          this.viewCtrl.dismiss();
        }
      });
    } else {
      this.viewCtrl.dismiss();
    }
  }

  // (Button Action) Submit Report
  onSubmit( draft:boolean) {
    if ( this.update ) {
      this.report.status = draft ? 'draft' : 'published';
      this.reportsService.updateReport( this.report )
      .then(
        res => {
          console.log(res.data);
          this.report = res.data;
        });
    } else {
      this.reportsService.createReport( this.report )
      .then(
        res => {
          this.viewCtrl.dismiss({success: true});
        }
      )
    }
  }

  // (Button Action) Delete Item
  delete() {
    this.globals.showYesNoConfirmDialog( 'Confirm', `Do you want to delete this Report?`, confirm => {
      if ( confirm ) {
        this.reportsService.deleteReport(this.report.documentId)
        .then(
          res => this.viewCtrl.dismiss(),
          err => console.log(err)
        )
      }
    });
  }
  
  // (Button Action) Edit Item
  toggleEdit( editMode ){
    if ( editMode ) {
      this.edit = true;
    } else {
      this.edit = false;
    }

  }

  editReport( type ) {
    switch ( type ){
      case 'Info':
        this.editInfo();
        break;
      case'Type A':
        this.editTypeA();
        break;
      case'Type B':
        this.editTypeB();
        break;
      case'Type C':
        this.editTypeC();
        break;
      case'Type D':
        this.editTypeD();
        break;
    }
  }

  editInfo() {
    let modal = this.new ? this.modalCtrl.create( ReportInfoModal) : this.modalCtrl.create( ReportInfoModal, {data: this.report});
    modal.onDidDismiss( res => {
      if ( typeof res != 'undefined' ) {
        let data = res.data;
        console.log ( data ); 
        this.report.blotterNo = data.blotterNo;
        this.report.status = data.blotterNo;
        this.report.incidentType = data.blotterNo;
        this.report.incidentLocation = data.blotterNo;
        this.report.incidentDateAndTime = data.blotterNo;
        this.update = true;
      }
    });
    modal.present();
  }

  editTypeA() {
    let modal = this.new ? this.modalCtrl.create( ReportTypeAModal) : this.modalCtrl.create( ReportTypeAModal, {data: this.report.typeA});
    modal.onDidDismiss( res => {
      if ( typeof res != 'undefined' ) {
        let data = res.data
        this.report.typeA = data.data;
        this.update = true;
      }
    });
    modal.present();
  }

  editTypeB() {
    let modal = this.new ? this.modalCtrl.create( ReportTypeBModal) : this.modalCtrl.create( ReportTypeBModal, {data: this.report.typeB});
    modal.onDidDismiss( res => {
      if ( typeof res != 'undefined' ) {
        let data = res.data
        this.report.typeB = data.data;
        this.update = true;
      }
    });
    modal.present();
  }

  editTypeC() {
    let modal = this.new ? this.modalCtrl.create( ReportTypeCModal) : this.modalCtrl.create( ReportTypeCModal, {data: this.report.typeC});
    modal.onDidDismiss( res => {
      if ( typeof res != 'undefined' ) {
        let data = res.data
        this.report.typeC = data.data;
        this.update = true;
      }
    });
    modal.present();
  }

  editTypeD() {
    let modal = this.new ? this.modalCtrl.create( ReportTypeDModal) : this.modalCtrl.create( ReportTypeDModal, {data: this.report.typeD});
    modal.onDidDismiss( res => {
      if ( typeof res != 'undefined' ) {
        let data = res.data
        this.report.typeD = data.data;
        this.update = true;
      }
    });
    modal.present();
  }

} // End of Report Modal

@Component({
  templateUrl: './templates/report-modals/report-info-modal.html'
})
export class ReportInfoModal {
  validations_form: FormGroup;
  update = false;

  constructor(
    private viewCtrl: ViewController,
    private formBuilder: FormBuilder,
    private params: NavParams,
  ) {}

  ionViewWillLoad(){
    let reportData = this.params.get('data');
    if ( typeof reportData != 'undefined' ) {
      this.update = true;
      this.setFields( true, reportData );
    } else {
      this.setFields()
    }
  }

  setFields( update = false, data? ) {
    this.validations_form = this.formBuilder.group({
      blotterNo: [ update ? data.blotterNo : '', Validators.required ],
      status: ['', Validators.required ],
      incidentType: [ update ? data.incidentType : '', Validators.required ],
      incidentLocation: [ update ? data.incidentLocation : '', Validators.required ],
      incidentDateAndTime: [  update ? data.incidentDateAndTime : '', Validators.required ],
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  onSubmit( value ){
    this.viewCtrl.dismiss({data: value});
  }
} // End of Report Info Modal

@Component({
  templateUrl: './templates/report-modals/report-type-a-modal.html'
})
export class ReportTypeAModal {
  validations_form: FormGroup;
  update = false;

  constructor(
    private viewCtrl: ViewController,
    private formBuilder: FormBuilder,
    private params: NavParams,
  ) {}

  ionViewWillLoad(){
    let reportData =  this.params.get('data') 
    if ( typeof reportData != 'undefined' ) {
      this.update = true;
      this.setFields( true, reportData );
    } else {
      this.setFields()
    }
  }

  setFields( update = false, data? ) {
    this.validations_form = this.formBuilder.group({
      name: this.formBuilder.group({
        familyName: [ update ? data.name.familyName : '', Validators.required ],
        firstName: [ update ? data.name.firstName : '', Validators.required ],
        middleName: [ update ? data.name.middleName : '' ],
        qualifier: [ update ? data.name.qualifier : '' ],
        nickName: [ update ? data.name.nickName : '' ],
      }),
      citizenship: [ update ? data.citizenship : '', Validators.required ],
      sex: [ update ? data.sex : '', Validators.required ],
      civilStatus: [ update ? data.civilStatus : '', Validators.required ],
      birthDate: [ update ? data.birthDate : '', Validators.required ],
      age: [ update ? data.age : '', Validators.required ],
      birthPlace: [ update ? data.birthPlace : '', Validators.required ],
      currentAddress: this.formBuilder.group({
        houseNumber: [ update ? data.currentAddress.houseNumber : '', Validators.required ],
        village: [ update ? data.currentAddress.village : '', Validators.required ],
        barangay: [ update ? data.currentAddress.barangay : '', Validators.required ],
        town: [ update ? data.currentAddress.town : '', Validators.required ],
        province: [ update ? data.currentAddress.province : '', Validators.required ],
      }),
      otherAddress: this.formBuilder.group({
        houseNumber: [ update ? data.currentAddress.houseNumber : '' ],
        village: [ update ? data.currentAddress.village : '' ],
        barangay: [ update ? data.currentAddress.barangay : '' ],
        town: [ update ? data.currentAddress.town : '' ],
        province: [ update ? data.currentAddress.province : '' ],
      }),
      highestEducationalAttainment: [ update ? data.highestEducationalAttainment : '', Validators.required ],
      occupation: [ update ? data.occupation : '' ],
      idCardPresented: [ update ? data.idCardPresented : '', Validators.required ],
      contactInfo: this.formBuilder.group({
        emailAddress: [ update ? data.contactInfo.emailAddress : '' ],
        homePhone: [ update ? data.contactInfo.homePhone : '' ],
        mobilePhone: [ update ? data.contactInfo.mobilePhone : '', Validators.required ],
      }),
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  onSubmit( value ){
    this.viewCtrl.dismiss({data: value});
  }
} // End of Type A Modal

@Component({
  templateUrl: './templates/report-modals/report-type-b-modal.html'
})
export class ReportTypeBModal {
  validations_form: FormGroup;
  update = false;

  constructor(
    private viewCtrl: ViewController,
    private formBuilder: FormBuilder,
    private params: NavParams,
  ) {}

  ionViewWillLoad(){
    let reportData =  this.params.get('data') 
    if ( typeof reportData != 'undefined' ) {
      this.update = true;
      this.setFields( true, reportData );
    } else {
      this.setFields()
    }
  }

  setFields( update = false, data? ) {
    this.validations_form = this.formBuilder.group({
      name: this.formBuilder.group({
        familyName: [ update ? data.name.familyName : '', Validators.required ],
        firstName: [ update ? data.name.firstName : '', Validators.required ],
        middleName: [ update ? data.name.middleName : '' ],
        qualifier: [ update ? data.name.qualifier : '' ],
        nickName: [ update ? data.name.nickName : '' ],
      }),
      citizenship: [ update ? data.citizenship : '', Validators.required ],
      sex: [ update ? data.sex : '', Validators.required ],
      civilStatus: [ update ? data.civilStatus : '', Validators.required ],
      birthDate: [ update ? data.birthDate : '', Validators.required ],
      age: [ update ? data.age : '', Validators.required ],
      birthPlace: [ update ? data.birthPlace : '', Validators.required ],
      currentAddress: this.formBuilder.group({
        houseNumber: [ update ? data.currentAddress.houseNumber : '', Validators.required ],
        village: [ update ? data.currentAddress.village : '', Validators.required ],
        barangay: [ update ? data.currentAddress.barangay : '', Validators.required ],
        town: [ update ? data.currentAddress.town : '', Validators.required ],
        province: [ update ? data.currentAddress.province : '', Validators.required ],
      }),
      otherAddress: this.formBuilder.group({
        houseNumber: [ update ? data.currentAddress.houseNumber : '' ],
        village: [ update ? data.currentAddress.village : '' ],
        barangay: [ update ? data.currentAddress.barangay : '' ],
        town: [ update ? data.currentAddress.town : '' ],
        province: [ update ? data.currentAddress.province : '' ],
      }),
      bioData: this.formBuilder.group({
        height: [ update ? data.bioData.height : '' ],
        weight: [ update ? data.bioData.weight : '' ],
        eyeColor: [ update ? data.bioData.eyeColor : '' ],
        eyeDescription: [ update ? data.bioData.eyeDescription : '' ],
        hairColor: [ update ? data.bioData.hairColor : '' ],
        hairDescription: [ update ? data.bioData.hairDescription : '' ],
        influence: [ update ? data.bioData.influence : '', Validators.required ],
      }),
      children: this.formBuilder.group({
        guardianName: [ update ? data.children.guardianName  : '' ],
        guardianAddress: [ update ? data.children.guardianAddress : '' ],
        homePhone: [ update ? data.children.homePhone : '' ],
        mobilePhone: [ update ? data.children.mobilePhone : '' ],
      }),
      highestEducationalAttainment: [ update ? data.highestEducationalAttainment : '', Validators.required ],
      occupation: [ update ? data.occupation : '' ],
      otherDistinguishingFeatures: [ update ? data.otherDistinguishingFeatures : ''],
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  onSubmit( value ){
    this.viewCtrl.dismiss({data: value});
  }
} // End of Type B Modal

@Component({
  templateUrl: './templates/report-modals/report-type-a-modal.html'
})
export class ReportTypeCModal {
  validations_form: FormGroup;
  update = false;

  constructor(
    private viewCtrl: ViewController,
    private formBuilder: FormBuilder,
    private params: NavParams,
  ) {}

  ionViewWillLoad(){
    let reportData =  this.params.get('data') 
    if ( typeof reportData != 'undefined' ) {
      this.update = true;
      this.setFields( true, reportData );
    } else {
      this.setFields()

    }
  }

  setFields( update = false, data? ) {
    this.validations_form = this.formBuilder.group({
      name: this.formBuilder.group({
        familyName: [ update ? data.name.familyName : '' ],
        firstName: [ update ? data.name.firstName : '' ],
        middleName: [ update ? data.name.middleName : '' ],
        qualifier: [ update ? data.name.qualifier : '' ],
        nickName: [ update ? data.name.nickName : '' ],
      }),
      citizenship: [ update ? data.citizenship : '' ],
      sex: [ update ? data.sex : '' ],
      civilStatus: [ update ? data.civilStatus : '' ],
      birthDate: [ update ? data.birthDate : '' ],
      age: [ update ? data.age : '' ],
      birthPlace: [ update ? data.birthPlace : '' ],
      currentAddress: this.formBuilder.group({
        houseNumber: [ update ? data.currentAddress.houseNumber : '' ],
        village: [ update ? data.currentAddress.village : '' ],
        barangay: [ update ? data.currentAddress.barangay : '' ],
        town: [ update ? data.currentAddress.town : '' ],
        province: [ update ? data.currentAddress.province : '' ],
      }),
      otherAddress: this.formBuilder.group({
        houseNumber: [ update ? data.currentAddress.houseNumber : '' ],
        village: [ update ? data.currentAddress.village : '' ],
        barangay: [ update ? data.currentAddress.barangay : '' ],
        town: [ update ? data.currentAddress.town : '' ],
        province: [ update ? data.currentAddress.province : '' ],
      }),
      highestEducationalAttainment: [ update ? data.highestEducationalAttainment : '' ],
      occupation: [ update ? data.occupation : '' ],
      idCardPresented: [ update ? data.idCardPresented : '' ],
      contactInfo: this.formBuilder.group({
        emailAddress: [ update ? data.contactInfo.emailAddress : '' ],
        homePhone: [ update ? data.contactInfo.homePhone : '' ],
        mobilePhone: [ update ? data.contactInfo.mobilePhone : '' ],
      }),
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  onSubmit( value ){
    this.viewCtrl.dismiss({data: value});
  }
} // End of Type C Modal

@Component({
  templateUrl: './templates/report-modals/report-type-d-modal.html'
})
export class ReportTypeDModal {
  validations_form: FormGroup;
  update = false;

  constructor(
    private viewCtrl: ViewController,
    private formBuilder: FormBuilder,
    private params: NavParams,
  ) {}

  ionViewWillLoad(){
    let reportData =  this.params.get('data') 
    if ( typeof reportData != 'undefined' ) {
      this.update = true;

      this.setFields( true, reportData );
    } else {
      this.setFields()
    }
  }

  setFields( update = false, data? ) {
    this.validations_form = this.formBuilder.group({
      incidentNarrative: [ update ? data.incidentNarrative : '', Validators.required ],
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  onSubmit( value ){
    this.viewCtrl.dismiss({data: value});
  }
} // End of Type D Modal


