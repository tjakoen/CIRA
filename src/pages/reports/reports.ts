import { ViewChild, Component } from '@angular/core';
import { Content, ViewController, NavParams, ModalController } from 'ionic-angular';
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

  filter:string = 'all';
  
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
    this.reportData = [];
    this.reportsService.getReports()
    .then(data => {
      if (data) {
        data.map( dataMap => {
          let report = dataMap.payload.doc.data();
          report.documentId = dataMap.payload.doc.id;
          this.reportData.push( report );
        });  		
      }
      this.displayReports();
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
    data = this.filter != 'all' ? this.helperService.filterByKey( data, 'publishStatus', this.filter ) : data;
    return data;
  }

  // Searches Displayed Posts by Name, Location or Description
  search(ev: any) {
    let val = ev.target.value;
    if (val && val.trim() != '') {
      this.reports = this.filteredReportData.filter( ( report ) => {
        return (
          report.blotterNo.toString().indexOf(val.toLowerCase()) > -1 ||
          report.status.toLowerCase().indexOf( val.toLowerCase() ) > -1 ||
          report.incidentType.toLowerCase().indexOf( val.toLowerCase() ) > -1 ||
          report.incidentLocation.toLowerCase().indexOf( val.toLowerCase() ) > -1
        );
      })
    } else {
      this.reports = this.filteredReportData;
    }
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
        this.getData();
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
  @ViewChild(Content) content: Content;

  report: Report;
  loading: any;
  update = false;
  published = false;

  reportInfoForm: FormGroup;
  reportTypeAForm: FormGroup;
  reportTypeBForm: FormGroup;
  reportTypeCForm: FormGroup;
  reportTypeDForm: FormGroup;

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
    private formBuilder: FormBuilder,
  ) {
    this.new = this.navParams.get('new');
    this.setForms();
    if ( this.new ) { 
      this.report = new Report();
      this.edit = true;
    } else {
      this.report = this.navParams.get( 'data' );
      console.log( this.report );
      this.published = this.report.publishStatus.toLowerCase() == 'published' ? true : false;
    }
    this.setValues();
  }

  setForms() {
    this.reportInfoForm = this.formBuilder.group({
      blotterNo: [ '', Validators.required ],
      status: ['', Validators.required ],
      incidentType: [ '', Validators.required ],
      incidentLocation: [ '', Validators.required ],
      incidentDateAndTime: [ '', Validators.required ],
    });
    this.reportTypeAForm = this.formBuilder.group({
      name: this.formBuilder.group({
        familyName: [ '', Validators.required ],
        firstName: [ '', Validators.required ],
        middleName: [ '' ],
        qualifier: [ '' ],
        nickName: [ '' ],
      }),
      citizenship: ['', Validators.required ],
      sex: [ '', Validators.required ],
      civilStatus: [ '', Validators.required ],
      birthDate: ['', Validators.required ],
      age: [ '', Validators.required ],
      birthPlace: [ '', Validators.required ],
      currentAddress: this.formBuilder.group({
        houseNumber: [  '', Validators.required ],
        village: [ '', Validators.required ],
        barangay: [ '', Validators.required ],
        town: ['', Validators.required ],
        province: [  '', Validators.required ],
      }),
      otherAddress: this.formBuilder.group({
        houseNumber: [ '' ],
        village: [ '' ],
        barangay: [ '' ],
        town: ['' ],
        province: [  '' ],
      }),
      highestEducationalAttainment: [  '', Validators.required ],
      occupation: [ '' ],
      idCardPresented: [  '', Validators.required ],
      contactInfo: this.formBuilder.group({
        emailAddress: [ '' ],
        homePhone: [  '' ],
        mobilePhone: [ '', Validators.required ],
      }),
    });
    this.reportTypeBForm = this.formBuilder.group({
      name: this.formBuilder.group({
        familyName: ['', Validators.required ],
        firstName: [ '', Validators.required ],
        middleName: ['' ],
        qualifier: [ '' ],
        nickName: [ '' ],
      }),
      citizenship: ['', Validators.required ],
      sex: [ '', Validators.required ],
      civilStatus: [ '', Validators.required ],
      birthDate: ['', Validators.required ],
      age: [ '', Validators.required ],
      birthPlace: [ '', Validators.required ],
      currentAddress: this.formBuilder.group({
        houseNumber: [ '', Validators.required ],
        village: [ '', Validators.required ],
        barangay: [ '', Validators.required ],
        town: [ '', Validators.required ],
        province: [ '', Validators.required ],
      }),
      otherAddress: this.formBuilder.group({
        houseNumber: [ '' ],
        village: [ '' ],
        barangay: [ '' ],
        town: [ '' ],
        province: [ '' ],
      }),
      bioData: this.formBuilder.group({
        height: [ '', Validators.required ],
        weight: [ '', Validators.required ],
        eyeColor: [ '', Validators.required ],
        eyeDescription: [ '', Validators.required ],
        hairColor: [ '', Validators.required ],
        hairDescription: [ '', Validators.required ],
        influence: [ '', Validators.required ],
      }),
      children: this.formBuilder.group({
        guardianName: [ '' ],
        guardianAddress: [ '' ],
        homePhone: [ '' ],
        mobilePhone: [ '' ],
      }),
      highestEducationalAttainment: [ '', Validators.required ],
      occupation: [ '' ],
      workAddress: [ '' ],
      relationToVictim:  [ '', Validators.required],
      emailAddress:  [ '' ],
      govRank:  [ '' ],
      unitAssignment: [ '' ],
      groupAffiliation:  [ '' ],
      previousRecord:  [ '', Validators.required],
      recordStatus:  [ '' ],
      otherDistinguishingFeatures: [ '', Validators.required],
    });
    this.reportTypeCForm = this.formBuilder.group({
      name: this.formBuilder.group({
        familyName: [ '' ],
        firstName: [ ''],
        middleName: [ '' ],
        qualifier: [ '' ],
        nickName: [ '' ],
      }),
      citizenship: [''],
      sex: [ ''],
      civilStatus: [ ''],
      birthDate: [''],
      age: [ ''],
      birthPlace: [ ''],
      currentAddress: this.formBuilder.group({
        houseNumber: [  ''],
        village: [ ''],
        barangay: [ ''],
        town: [''],
        province: [  ''],
      }),
      otherAddress: this.formBuilder.group({
        houseNumber: [ '' ],
        village: [ '' ],
        barangay: [ '' ],
        town: ['' ],
        province: [  '' ],
      }),
      highestEducationalAttainment: [  ''],
      occupation: [ '' ],
      idCardPresented: [  ''],
      contactInfo: this.formBuilder.group({
        emailAddress: [ '' ],
        homePhone: [  '' ],
        mobilePhone: [ ''],
      }),
    });
    this.reportTypeDForm = this.formBuilder.group({
      incidentNarrative: [ '', Validators.required ],
    });
  }

  setValues() {
    this.reportInfoForm.setValue({
      blotterNo: this.report.blotterNo,
      status: this.report.status,
      incidentType: this.report.incidentType,
      incidentLocation:  this.report.incidentLocation ,
      incidentDateAndTime:  this.report.incidentDateAndTime ,
    });
    this.reportTypeAForm.setValue({
      name: {
        familyName: this.report.typeA.name.familyName,
        firstName: this.report.typeA.name.firstName,
        middleName: this.report.typeA.name.middleName ,
        qualifier: this.report.typeA.name.qualifier ,
        nickName: this.report.typeA.name.nickName ,
      },
      citizenship: this.report.typeA.citizenship,
      sex: this.report.typeA.sex,
      civilStatus: this.report.typeA.civilStatus,
      birthDate: this.report.typeA.birthDate,
      age: this.report.typeA.age,
      birthPlace: this.report.typeA.birthPlace,
      currentAddress:{
        houseNumber: this.report.typeA.currentAddress.houseNumber,
        village: this.report.typeA.currentAddress.village,
        barangay: this.report.typeA.currentAddress.barangay,
        town: this.report.typeA.currentAddress.town,
        province: this.report.typeA.currentAddress.province,
      },
      otherAddress: {
        houseNumber: this.report.typeA.currentAddress.houseNumber ,
        village: this.report.typeA.currentAddress.village ,
        barangay: this.report.typeA.currentAddress.barangay ,
        town: this.report.typeA.currentAddress.town ,
        province: this.report.typeA.currentAddress.province ,
      },
      highestEducationalAttainment: this.report.typeA.highestEducationalAttainment,
      occupation: this.report.typeA.occupation ,
      idCardPresented: this.report.typeA.idCardPresented,
      contactInfo: {
        emailAddress: this.report.typeA.contactInfo.emailAddress ,
        homePhone: this.report.typeA.contactInfo.homePhone ,
        mobilePhone: this.report.typeA.contactInfo.mobilePhone,
      },
    });
    this.reportTypeBForm.setValue({
      name: {
        familyName: this.report.typeB.name.familyName,
        firstName: this.report.typeB.name.firstName,
        middleName: this.report.typeB.name.middleName,
        qualifier: this.report.typeB.name.qualifier,
        nickName: this.report.typeB.name.nickName,
      },
      citizenship: this.report.typeB.citizenship,
      sex: this.report.typeB.sex,
      civilStatus: this.report.typeB.civilStatus,
      birthDate: this.report.typeB.birthDate,
      age: this.report.typeB.age,
      birthPlace: this.report.typeB.birthPlace,
      currentAddress: {
        houseNumber: this.report.typeB.currentAddress.houseNumber,
        village: this.report.typeB.currentAddress.village,
        barangay: this.report.typeB.currentAddress.barangay,
        town: this.report.typeB.currentAddress.town,
        province: this.report.typeB.currentAddress.province,
      },
      otherAddress: {
        houseNumber: this.report.typeB.currentAddress.houseNumber,
        village: this.report.typeB.currentAddress.village,
        barangay: this.report.typeB.currentAddress.barangay,
        town: this.report.typeB.currentAddress.town,
        province: this.report.typeB.currentAddress.province,
      },
      bioData: {
        height: this.report.typeB.bioData.height,
        weight: this.report.typeB.bioData.weight,
        eyeColor: this.report.typeB.bioData.eyeColor,
        eyeDescription: this.report.typeB.bioData.eyeDescription,
        hairColor: this.report.typeB.bioData.hairColor,
        hairDescription: this.report.typeB.bioData.hairDescription,
        influence: this.report.typeB.bioData.influence,
      },
      children: {
        guardianName: this.report.typeB.children.guardianName ,
        guardianAddress: this.report.typeB.children.guardianAddress,
        homePhone: this.report.typeB.children.homePhone,
        mobilePhone: this.report.typeB.children.mobilePhone,
      },
      highestEducationalAttainment: this.report.typeB.highestEducationalAttainment,
      occupation: this.report.typeB.occupation,
      workAddress: this.report.typeB.workAddress,
      relationToVictim:  this.report.typeB.relationToVictim,
      emailAddress:  this.report.typeB.emailAddress,
      govRank:  this.report.typeB.govRank,
      unitAssignment: this.report.typeB.unitAssignment,
      groupAffiliation:  this.report.typeB.groupAffiliation,
      previousRecord:  this.report.typeB.previousRecord,
      recordStatus:  this.report.typeB.recordStatus,
      otherDistinguishingFeatures: this.report.typeB.otherDistinguishingFeatures,
    });
    this.reportTypeCForm.setValue({
      name: {
        familyName: this.report.typeC.name.familyName,
        firstName: this.report.typeC.name.firstName,
        middleName: this.report.typeC.name.middleName ,
        qualifier: this.report.typeC.name.qualifier ,
        nickName: this.report.typeC.name.nickName ,
      },
      citizenship: this.report.typeC.citizenship,
      sex: this.report.typeC.sex,
      civilStatus: this.report.typeC.civilStatus,
      birthDate: this.report.typeC.birthDate,
      age: this.report.typeC.age,
      birthPlace: this.report.typeC.birthPlace,
      currentAddress:{
        houseNumber: this.report.typeC.currentAddress.houseNumber,
        village: this.report.typeC.currentAddress.village,
        barangay: this.report.typeC.currentAddress.barangay,
        town: this.report.typeC.currentAddress.town,
        province: this.report.typeC.currentAddress.province,
      },
      otherAddress: {
        houseNumber: this.report.typeC.currentAddress.houseNumber ,
        village: this.report.typeC.currentAddress.village ,
        barangay: this.report.typeC.currentAddress.barangay ,
        town: this.report.typeC.currentAddress.town ,
        province: this.report.typeC.currentAddress.province ,
      },
      highestEducationalAttainment: this.report.typeC.highestEducationalAttainment,
      occupation: this.report.typeC.occupation ,
      idCardPresented: this.report.typeC.idCardPresented,
      contactInfo: {
        emailAddress: this.report.typeC.contactInfo.emailAddress ,
        homePhone: this.report.typeC.contactInfo.homePhone ,
        mobilePhone: this.report.typeC.contactInfo.mobilePhone,
      },
    });
    this.reportTypeDForm.setValue({
      incidentNarrative: this.report.typeD.incidentNarrative,
    });
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
          this.viewCtrl.dismiss({ update: true });
        }
      });
    } else {
      this.viewCtrl.dismiss()
    }
  }

  // (Button Action) Submit Report
  submit( draft:boolean ) {
    this.report.publishStatus = draft ? 'draft' : 'published';
    if ( !this.new ) {
      this.reportsService.updateReport( this.report )
      .then(
        res => {
          this.report = res.data;
          this.update = false;
          // this.globals.setNotification();
          this.globals.showToast('Report Successfully Updated');
        });
    } else {
      this.reportsService.createReport( this.report )
      .then(
        res => {
          this.viewCtrl.dismiss({ success: true });
          this.globals.showToast('Report Successfully Created');
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
          res => {
            this.viewCtrl.dismiss({ delete: true });
            this.globals.showToast('Report Successfully Deleted');
          },
            err => console.log(err)
        )
      }
    });
  }
  
  // (Button Action) Edit Item
  toggleEdit( editMode:boolean ){
    if ( editMode ) {
      this.edit = true;
    } else {
      this.edit = false;
    }
    this.content.resize();
  }

  editReport( type:string ) {
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
    let modal = this.modalCtrl.create( ReportInfoModal, { form: this.reportInfoForm });
    modal.onDidDismiss( res => {
      if ( typeof res != 'undefined' ) {
        let data = res.data;
        this.report.blotterNo = data.blotterNo;
        this.report.status = data.status;
        this.report.incidentType = data.incidentType;
        this.report.incidentLocation = data.incidentLocation;
        this.report.incidentDateAndTime = data.incidentDateAndTime;
        this.update = true;
      }
    });
    modal.present();
  }
  editTypeA() {
    let modal = this.modalCtrl.create( ReportTypeAModal, { form: this.reportTypeAForm });
    modal.onDidDismiss( res => {
      if ( typeof res != 'undefined' ) {
        let data = res.data;
        this.report.typeA = data;
        this.update = true;
      }
    });
    modal.present();
  }
  editTypeB() {
    let modal = this.modalCtrl.create( ReportTypeBModal, { form: this.reportTypeBForm });
    modal.onDidDismiss( res => {
      if ( typeof res != 'undefined' ) {
        let data = res.data
        this.report.typeB = data;
        this.update = true;
      }
    });
    modal.present();
  }
  editTypeC() {
    let modal = this.modalCtrl.create( ReportTypeCModal, { form: this.reportTypeCForm });
    modal.onDidDismiss( res => {
      if ( typeof res != 'undefined' ) {
        let data = res.data
        this.report.typeC = data;
        this.update = true;
      }
    });
    modal.present();
  }
  editTypeD() {
    let modal = this.modalCtrl.create( ReportTypeDModal, {form: this.reportTypeDForm });
    modal.onDidDismiss( res => {
      if ( typeof res != 'undefined' ) {
        let data = res.data
        this.report.typeD = data;
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
  form: FormGroup;

  constructor(
    private viewCtrl: ViewController,
    private params: NavParams,
    private globals: Globals,
  ) {}

  ionViewWillLoad(){
    this.form = <FormGroup> this.params.get('form');
  }

  dismiss() {
    this.globals.showYesNoConfirmDialog( 'Confirm', `Are you sure you want to close with unsaved changes?`, confirm => {
      if ( confirm ) {
        this.viewCtrl.dismiss();
      }
    });
  }

  onSubmit( value ){
    this.viewCtrl.dismiss({data: value});
  }
} // End of Report Info Modal

@Component({
  templateUrl: './templates/report-modals/report-type-a-modal.html'
})
export class ReportTypeAModal {
  form: FormGroup;

  constructor(
    private viewCtrl: ViewController,
    private params: NavParams,
    private globals: Globals,
  ) {}

  ionViewWillLoad(){
    this.form = <FormGroup> this.params.get('form');
  }

  dismiss() {
    this.globals.showYesNoConfirmDialog( 'Confirm', `Are you sure you want to close with unsaved changes?`, confirm => {
      if ( confirm ) {
        this.viewCtrl.dismiss();
      }
    });
  }

  onSubmit( value ){
    this.viewCtrl.dismiss({data: value});
  }
} // End of Type A Modal
@Component({
  templateUrl: './templates/report-modals/report-type-b-modal.html'
})
export class ReportTypeBModal {
  form: FormGroup;

  constructor(
    private viewCtrl: ViewController,
    private params: NavParams,
    private globals: Globals,
  ) {}

  ionViewWillLoad(){
    this.form = <FormGroup> this.params.get('form');
  }

  dismiss() {
    this.globals.showYesNoConfirmDialog( 'Confirm', `Are you sure you want to close with unsaved changes?`, confirm => {
      if ( confirm ) {
        this.viewCtrl.dismiss();
      }
    });
  }

  onSubmit( value ){
    this.viewCtrl.dismiss({data: value});
  }
} // End of Type B Modal

@Component({
  templateUrl: './templates/report-modals/report-type-a-modal.html'
})
export class ReportTypeCModal {
  form: FormGroup;

  constructor(
    private viewCtrl: ViewController,
    private params: NavParams,
    private globals: Globals,
  ) {}

  ionViewWillLoad(){
    this.form = <FormGroup> this.params.get('form');
  }

  dismiss() {
    this.globals.showYesNoConfirmDialog( 'Confirm', `Are you sure you want to close with unsaved changes?`, confirm => {
      if ( confirm ) {
        this.viewCtrl.dismiss();
      }
    });
  }

  onSubmit( value ){
    this.viewCtrl.dismiss({data: value});
  }
} // End of Type C Modal

@Component({
  templateUrl: './templates/report-modals/report-type-d-modal.html'
})
export class ReportTypeDModal {
  form: FormGroup;

  constructor(
    private viewCtrl: ViewController,
    private params: NavParams,
    private globals: Globals,
  ) {}

  ionViewWillLoad(){
    this.form = <FormGroup> this.params.get('form');
  }

  dismiss() {
    this.globals.showYesNoConfirmDialog( 'Confirm', `Are you sure you want to close with unsaved changes?`, confirm => {
      if ( confirm ) {
        this.viewCtrl.dismiss();
      }
    });
  }

  onSubmit( value ){
    this.viewCtrl.dismiss({data: value});
  }
} // End of Type D Modal


