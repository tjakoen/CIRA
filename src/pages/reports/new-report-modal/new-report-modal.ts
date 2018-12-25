import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';
import { Globals } from '../../services/globals';

@Component({
  templateUrl: 'new-report-modal.html'
})
export class NewReportModalPage {

  validations_form: FormGroup;
  loading: any;
  reportData;
  update = false;

  constructor(
    private viewCtrl: ViewController,
    private formBuilder: FormBuilder,
    private firebaseService: FirebaseService,
    private globals: Globals,
    private params: NavParams,
  ) {
    this.reportData =  params.get('data') 
  }

  ionViewWillLoad(){
    this.globals.presentLoading( 'Please Wait...', 2000 );
    this.resetFields()
    if ( typeof this.reportData != 'undefined' ) {
      this.update = true;
      this.setFields( this.reportData );
    }
  }

  setFields( data ) {
    this.validations_form = this.formBuilder.group({

      blotterNo: [data.blotterNo, Validators.required],
      // status: ['', Validators.required],
      incidentType: [data.incidentType, Validators.required],
      incidentLocation: [data.incidentLocation, Validators.required],
      incidentDateAndTime: [data.incidentDateAndTime, Validators.required],
      
      // ITEM A
      itemA_name_familyName: [data.itemA.name.familyName, Validators.required],
      itemA_name_firstName: [data.itemA.name.firstName, Validators.required],
      itemA_name_middleName: [data.itemA.name.middleName, Validators.required],
      itemA_name_qualifier: [data.itemA.name.qualifier],
      itemA_name_nickName: [data.itemA.name.nickName],
      itemA_citizenship: [data.itemA.citizenship, Validators.required],
      itemA_sex: [data.itemA.sex, Validators.required],
      itemA_civilStatus: [data.itemA.civilStatus, Validators.required],
      itemA_birthDate: [data.itemA.birthDate, Validators.required],
      itemA_age: [data.itemA.age, Validators.required],
      itemA_birthPlace: [data.itemA.birthPlace, Validators.required],
     
      itemA_currentAddress_houseNumber: [data.itemA.currentAddress.houseNumber, Validators.required],
      itemA_currentAddress_village: [data.itemA.currentAddress.village, Validators.required],
      itemA_currentAddress_barangay: [data.itemA.currentAddress.barangay, Validators.required],
      itemA_currentAddress_town: [data.itemA.currentAddress.town, Validators.required],
      itemA_currentAddress_province: [data.itemA.currentAddress.province, Validators.required],
    
      itemA_otherAddress_houseNumber: [data.itemA.otherAddress.houseNumber],
      itemA_otherAddress_village: [data.itemA.otherAddress.houseNumber],
      itemA_otherAddress_barangay: [data.itemA.otherAddress.houseNumber],
      itemA_otherAddress_town: [data.itemA.otherAddress.houseNumber,],
      itemA_otherAddress_province: [data.itemA.otherAddress.houseNumber],
      
      itemA_highestEducationalAttainment: [data.itemA.highestEducationalAttainment, Validators.required],
      itemA_occupation: [data.itemA.occupation],
      itemA_idCardPresented: [data.itemA.idCardPresented, Validators.required],
  
      itemA_contactInfo_emailAddress: [data.itemA.contactInfo.emailAddress],
      itemA_contactInfo_homePhone: [data.itemA.contactInfo.homePhone, Validators.required],
      itemA_contactInfo_mobilePhone: [data.itemA.contactInfo.mobilePhone, Validators.required],
      
      // ITEM B
      itemB_name_familyName: [data.itemB.name.familyName, Validators.required],
      itemB_name_firstName: [data.itemB.name.firstName, Validators.required],
      itemB_name_middleName: [data.itemB.name.middleName, Validators.required],
      itemB_name_qualifier: [data.itemB.name.qualifier],
      itemB_name_nickName: [data.itemB.name.nickName],
      itemB_citizenship: [data.itemB.citizenship, Validators.required],
      itemB_sex: [data.itemB.sex, Validators.required],
      itemB_civilStatus: [data.itemB.civilStatus, Validators.required],
      itemB_birthDate: [data.itemB.birthDate, Validators.required],
      itemB_age: [data.itemB.age, Validators.required],
      itemB_birthPlace: [data.itemB.birthPlace, Validators.required],
      
      itemB_currentAddress_houseNumber: [data.itemB.currentAddress.houseNumber, Validators.required],
      itemB_currentAddress_village: [data.itemB.currentAddress.village, Validators.required],
      itemB_currentAddress_barangay: [data.itemB.currentAddress.barangay, Validators.required],
      itemB_currentAddress_town: [data.itemB.currentAddress.town, Validators.required],
      itemB_currentAddress_province: [data.itemB.currentAddress.province, Validators.required],
    
      itemB_otherAddress_houseNumber: [data.itemB.otherAddress.houseNumber],
      itemB_otherAddress_village: [data.itemB.otherAddress.houseNumber],
      itemB_otherAddress_barangay: [data.itemB.otherAddress.houseNumber],
      itemB_otherAddress_town: [data.itemB.otherAddress.houseNumber,],
      itemB_otherAddress_province: [data.itemB.otherAddress.houseNumber],
      
      itemB_highestEducationalAttainment: [data.itemB.highestEducationalAttainment, Validators.required],
      itemB_occupation: [data.itemB.occupation],
      
      itemB_bioData_height: [data.itemB.bioData.height],
      itemB_bioData_weight: [data.itemB.bioData.weight],
      itemB_bioData_eyeColor: [data.itemB.bioData.eyeColor],
      itemB_bioData_eyeDescription: [data.itemB.bioData.eyeDescription],
      itemB_bioData_hairColor: [data.itemB.bioData.hairColor],
      itemB_bioData_hairDescription: [data.itemB.bioData.hairDescription],
      itemB_bioData_influence: [data.itemB.bioData.influence, Validators.required],
    
      itemB_children_guardianName: [data.itemB.children.guardianName],
      itemB_children_guardianAddress: [data.itemB.children.guardianAddress],
      itemB_children_homePhone: [data.itemB.children.homePhone],
      itemB_children_mobilePhone: [data.itemB.children.mobilePhone],
      
      itemB_otherDistinguishingFeatures: [data.itemB.otherDistinguishingFeatures],
    
      // ITEM C      
      itemC_name_familyName: [data.itemC.name.familyName, Validators.required],
      itemC_name_firstName: [data.itemC.name.firstName, Validators.required],
      itemC_name_middleName: [data.itemC.name.middleName, Validators.required],
      itemC_name_qualifier: [data.itemC.name.qualifier],
      itemC_name_nickName: [data.itemC.name.nickName],
      itemC_citizenship: [data.itemC.citizenship, Validators.required],
      itemC_sex: [data.itemC.sex, Validators.required],
      itemC_civilStatus: [data.itemC.civilStatus, Validators.required],
      itemC_birthDate: [data.itemC.birthDate, Validators.required],
      itemC_age: [data.itemC.age, Validators.required],
      itemC_birthPlace: [data.itemC.birthPlace, Validators.required],
     
      itemC_currentAddress_houseNumber: [data.itemC.currentAddress.houseNumber, Validators.required],
      itemC_currentAddress_village: [data.itemC.currentAddress.village, Validators.required],
      itemC_currentAddress_barangay: [data.itemC.currentAddress.barangay, Validators.required],
      itemC_currentAddress_town: [data.itemC.currentAddress.town, Validators.required],
      itemC_currentAddress_province: [data.itemC.currentAddress.province, Validators.required],
    
      itemC_otherAddress_houseNumber: [data.itemC.otherAddress.houseNumber],
      itemC_otherAddress_village: [data.itemC.otherAddress.houseNumber],
      itemC_otherAddress_barangay: [data.itemC.otherAddress.houseNumber],
      itemC_otherAddress_town: [data.itemC.otherAddress.houseNumber,],
      itemC_otherAddress_province: [data.itemC.otherAddress.houseNumber],
      
      itemC_highestEducationalAttainment: [data.itemC.highestEducationalAttainment, Validators.required],
      itemC_occupation: [data.itemC.occupation],
      itemC_idCardPresented: [data.itemC.idCardPresented, Validators.required],
  
      itemC_contactInfo_emailAddress: [data.itemC.contactInfo.emailAddress],
      itemC_contactInfo_homePhone: [data.itemC.contactInfo.homePhone, Validators.required],
      itemC_contactInfo_mobilePhone: [data.itemC.contactInfo.mobilePhone, Validators.required],
      
      // ITEM D
      itemD_incidentNarrative: [data.itemD.incidentNarrative, Validators.required],
    });
  }

  resetFields(){
    this.validations_form = this.formBuilder.group({
      blotterNo: new FormControl('', Validators.required),
      // status: new FormControl('', Validators.required),
      incidentType: new FormControl('', Validators.required),
      incidentLocation: new FormControl('', Validators.required),
      incidentDateAndTime: new FormControl('', Validators.required),
      
      // ITEM A
      itemA_name_familyName: new FormControl('', Validators.required),
      itemA_name_firstName: new FormControl('', Validators.required),
      itemA_name_middleName: new FormControl('', Validators.required),
      itemA_name_qualifier: new FormControl(''),
      itemA_name_nickName: new FormControl(''),
      itemA_citizenship: new FormControl('', Validators.required),
      itemA_sex: new FormControl('', Validators.required),
      itemA_civilStatus: new FormControl('', Validators.required),
      itemA_birthDate: new FormControl('', Validators.required),
      itemA_age: new FormControl('', Validators.required),
      itemA_birthPlace: new FormControl('', Validators.required),
     
      itemA_currentAddress_houseNumber: new FormControl('', Validators.required),
      itemA_currentAddress_village: new FormControl('', Validators.required),
      itemA_currentAddress_barangay: new FormControl('', Validators.required),
      itemA_currentAddress_town: new FormControl('', Validators.required),
      itemA_currentAddress_province: new FormControl('', Validators.required),
    
      itemA_otherAddress_houseNumber: new FormControl(''),
      itemA_otherAddress_village: new FormControl(''),
      itemA_otherAddress_barangay: new FormControl(''),
      itemA_otherAddress_town: new FormControl('',),
      itemA_otherAddress_province: new FormControl(''),
      
      itemA_highestEducationalAttainment: new FormControl('', Validators.required),
      itemA_occupation: new FormControl(''),
      itemA_idCardPresented: new FormControl('', Validators.required),
  
      itemA_contactInfo_emailAddress: new FormControl(''),
      itemA_contactInfo_homePhone: new FormControl('', Validators.required),
      itemA_contactInfo_mobilePhone: new FormControl('', Validators.required),
      
      // ITEM B
      itemB_name_familyName: new FormControl(''),
      itemB_name_firstName: new FormControl(''),
      itemB_name_middleName: new FormControl(''),
      itemB_name_qualifier: new FormControl(''),
      itemB_name_nickName: new FormControl(''),
      itemB_citizenship: new FormControl(''),
      itemB_sex: new FormControl(''),
      itemB_civilStatus: new FormControl(''),
      itemB_birthDate: new FormControl(''),
      itemB_age: new FormControl(''),
      itemB_birthPlace: new FormControl(''),
      
      itemB_currentAddress_houseNumber: new FormControl(''),
      itemB_currentAddress_village: new FormControl(''),
      itemB_currentAddress_barangay: new FormControl(''),
      itemB_currentAddress_town: new FormControl(''),
      itemB_currentAddress_province: new FormControl(''),
    
      itemB_otherAddress_houseNumber: new FormControl(''),
      itemB_otherAddress_village: new FormControl(''),
      itemB_otherAddress_barangay: new FormControl(''),
      itemB_otherAddress_town: new FormControl(''),
      itemB_otherAddress_province: new FormControl(''),
      
      itemB_highestEducationalAttainment: new FormControl(''),
      itemB_occupation: new FormControl(''),
      
      itemB_bioData_height: new FormControl(''),
      itemB_bioData_weight: new FormControl(''),
      itemB_bioData_eyeColor: new FormControl(''),
      itemB_bioData_eyeDescription: new FormControl(''),
      itemB_bioData_hairColor: new FormControl(''),
      itemB_bioData_hairDescription: new FormControl(''),
      itemB_bioData_influence: new FormControl(''),
    
      itemB_children_guardianName: new FormControl(''),
      itemB_children_guardianAddress: new FormControl(''),
      itemB_children_homePhone: new FormControl(''),
      itemB_children_mobilePhone: new FormControl(''),
      
      itemB_otherDistinguishingFeatures: new FormControl(''),
    
      // ITEM C      
      itemC_name_familyName: new FormControl(''),
      itemC_name_firstName: new FormControl(''),
      itemC_name_middleName: new FormControl(''),
      itemC_name_qualifier: new FormControl(''),
      itemC_name_nickName: new FormControl(''),
      itemC_citizenship: new FormControl(''),
      itemC_sex: new FormControl(''),
      itemC_civilStatus: new FormControl(''),
      itemC_birthDate: new FormControl(''),
      itemC_age: new FormControl(''),
      itemC_birthPlace: new FormControl(''),
     
      itemC_currentAddress_houseNumber: new FormControl(''),
      itemC_currentAddress_village: new FormControl(''),
      itemC_currentAddress_barangay: new FormControl(''),
      itemC_currentAddress_town: new FormControl(''),
      itemC_currentAddress_province: new FormControl(''),
    
      itemC_otherAddress_houseNumber: new FormControl(''),
      itemC_otherAddress_village: new FormControl(''),
      itemC_otherAddress_barangay: new FormControl(''),
      itemC_otherAddress_town: new FormControl(''),
      itemC_otherAddress_province: new FormControl(''),
      
      itemC_highestEducationalAttainment: new FormControl(''),
      itemC_occupation: new FormControl(''),
      itemC_idCardPresented: new FormControl(''),
  
      itemC_contactInfo_emailAddress: new FormControl(''),
      itemC_contactInfo_homePhone: new FormControl(''),
      itemC_contactInfo_mobilePhone: new FormControl(''),
      
      // ITEM D
      itemD_incidentNarrative: new FormControl('', Validators.required),
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  onSubmit(value){
    let data = {
      blotterNo: value.blotterNo,
      // status: value.staus,
      incidentType: value.incidentType,
      incidentLocation: value.incidentLocation,
      incidentDateAndTime: value.incidentDateAndTime,
      itemA: {
        name: {
          familyName: value.itemA_name_familyName,
          firstName: value.itemA_name_firstName,
          middleName: value.itemA_name_middleName,
          qualifier: value.itemA_name_qualifier,
          nickName: value.itemA_name_nickName,
        },
        citizenship: value.itemA_citizenship,
        sex: value.itemA_sex,
        civilStatus: value.itemA_civilStatus,
        birthDate: value.itemA_birthDate,
        age: value.itemA_age,
        birthPlace: value.itemA_birthPlace,
        currentAddress: {
          houseNumber: value.itemA_currentAddress_houseNumber,
          village: value.itemA_currentAddress_village,
          barangay: value.itemA_currentAddress_barangay,
          town: value.itemA_currentAddress_town,
          province: value.itemA_currentAddress_province,
        },
        otherAddress: {
          houseNumber: value.itemA_otherAddress_houseNumber,
          village: value.itemA_otherAddress_village,
          barangay: value.itemA_otherAddress_barangay,
          town: value.itemA_otherAddress_town,
          province: value.itemA_otherAddress_province,
        },
        highestEducationalAttainment: value.itemA_highestEducationalAttainment,
        occupation: value.itemA_occupation,
        idCardPresented: value.itemA_idCardPresented,
        contactInfo: {
          emailAddress: value.itemA_contactInfo_emailAddress,
          homePhone: value.itemA_contactInfo_homePhone,
          mobilePhone: value.itemA_contactInfo_mobilePhone,
        }
      },
      itemB: {
        name: {
          familyName: value.itemB_name_familyName,
          firstName: value.itemB_name_firstName,
          middleName: value.itemB_name_middleName,
          qualifier: value.itemB_name_qualifier,
          nickName: value.itemB_name_nickName,
        },
        citizenship: value.itemB_citizenship,
        sex: value.itemB_sex,
        civilStatus: value.itemB_civilStatus,
        birthDate: value.itemB_birthDate,
        age: value.itemB_age,
        birthPlace: value.itemB_birthPlace,
        currentAddress: {
          houseNumber: value.itemB_currentAddress_houseNumber,
          village: value.itemB_currentAddress_village,
          barangay: value.itemB_currentAddress_barangay,
          town: value.itemB_currentAddress_town,
          province: value.itemB_currentAddress_province,
        },
        otherAddress: {
          houseNumber: value.itemB_otherAddress_houseNumber,
          village: value.itemB_otherAddress_village,
          barangay: value.itemB_otherAddress_barangay,
          town: value.itemB_otherAddress_town,
          province: value.itemB_otherAddress_province,
        },
        highestEducationalAttainment: value.itemB_highestEducationalAttainment,
        occupation: value.itemB_occupation,
        bioData: {
          height: value.itemB_bioData_height,
          weight: value.itemB_bioData_weight,
          eyeColor: value.itemB_bioData_eyeColor,
          eyeDescription: value.itemB_bioData_eyeDescription,
          hairColor: value.itemB_bioData_hairColor,
          hairDescription: value.itemB_bioData_hairDescription,
          influence: value.itemB_bioData_influence,
        },
        children: {
          guardianName: value.itemB_children_guardianName,
          guardianAddress: value.itemB_children_guardianAddress,
          homePhone: value.itemB_children_homePhone,
          mobilePhone: value.itemB_children_mobilePhone,
        },
        otherDistinguishingFeatures: value.itemB_otherDistinguishingFeatures,
      },
      itemC: {
        name: {
          familyName: value.itemC_name_familyName,
          firstName: value.itemC_name_firstName,
          middleName: value.itemC_name_middleName,
          qualifier: value.itemC_name_qualifier,
          nickName: value.itemC_name_nickName,
        },
        citizenship: value.itemC_citizenship,
        sex: value.itemC_sex,
        civilStatus: value.itemC_civilStatus,
        birthDate: value.itemC_birthDate,
        age: value.itemC_age,
        birthPlace: value.itemC_birthPlace,
        currentAddress: {
          houseNumber: value.itemC_currentAddress_houseNumber,
          village: value.itemC_currentAddress_village,
          barangay: value.itemC_currentAddress_barangay,
          town: value.itemC_currentAddress_town,
          province: value.itemC_currentAddress_province,
        },
        otherAddress: {
          houseNumber: value.itemC_otherAddress_houseNumber,
          village: value.itemC_otherAddress_village,
          barangay: value.itemC_otherAddress_barangay,
          town: value.itemC_otherAddress_town,
          province: value.itemC_otherAddress_province,
        },
        highestEducationalAttainment: value.itemC_highestEducationalAttainment,
        occupation: value.itemC_occupation,
        idCardPresented: value.itemC_idCardPresented,
        contactInfo: {
          emailAddress: value.itemC_contactInfo_emailAddress,
          homePhone: value.itemC_contactInfo_homePhone,
          mobilePhone: value.itemC_contactInfo_mobilePhone,
        },
      },
      itemD: {
        incidentNarrative: value.itemD_incidentNarrative,
      }
    }

    if ( this.update ) {
      this.firebaseService.updateReport(data, this.reportData.documentId)
      .then(
        res => {
          this.resetFields();
          this.viewCtrl.dismiss({success: true});
        }
      )
    } else {
      this.firebaseService.createReport(data, 'posted')
      .then(
        res => {
          this.resetFields();
          this.viewCtrl.dismiss({success: true});
        }
      )
    }

   
  }

}
