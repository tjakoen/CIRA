import { Component } from '@angular/core';
import { ViewController, normalizeURL, ToastController, LoadingController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';
import { ImagePicker } from '@ionic-native/image-picker';

@Component({
  templateUrl: 'new-report-modal.html'
})
export class NewReportModalPage {

  validations_form: FormGroup;
  loading: any;

  constructor(
    private viewCtrl: ViewController,
    private toastCtrl: ToastController,
    private formBuilder: FormBuilder,
    private imagePicker: ImagePicker,
    private firebaseService: FirebaseService,
    private loadingCtrl: LoadingController
  ) {
    this.loading = this.loadingCtrl.create();
  }

  ionViewWillLoad(){
    this.resetFields()
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
      itemB_name_familyName: new FormControl('', Validators.required),
      itemB_name_firstName: new FormControl('', Validators.required),
      itemB_name_middleName: new FormControl('', Validators.required),
      itemB_name_qualifier: new FormControl(''),
      itemB_name_nickName: new FormControl(''),
      itemB_citizenship: new FormControl('', Validators.required),
      itemB_sex: new FormControl('', Validators.required),
      itemB_civilStatus: new FormControl('', Validators.required),
      itemB_birthDate: new FormControl('', Validators.required),
      itemB_age: new FormControl('', Validators.required),
      itemB_birthPlace: new FormControl('', Validators.required),
      
      itemB_currentAddress_houseNumber: new FormControl('', Validators.required),
      itemB_currentAddress_village: new FormControl('', Validators.required),
      itemB_currentAddress_barangay: new FormControl('', Validators.required),
      itemB_currentAddress_town: new FormControl('', Validators.required),
      itemB_currentAddress_province: new FormControl('', Validators.required),
    
      itemB_otherAddress_houseNumber: new FormControl(''),
      itemB_otherAddress_village: new FormControl(''),
      itemB_otherAddress_barangay: new FormControl(''),
      itemB_otherAddress_town: new FormControl(''),
      itemB_otherAddress_province: new FormControl(''),
      
      itemB_highestEducationalAttainment: new FormControl('', Validators.required),
      itemB_occupation: new FormControl(''),
      
      itemB_bioData_height: new FormControl(''),
      itemB_bioData_weight: new FormControl(''),
      itemB_bioData_eyeColor: new FormControl(''),
      itemB_bioData_eyeDescription: new FormControl(''),
      itemB_bioData_hairColor: new FormControl(''),
      itemB_bioData_hairDescription: new FormControl(''),
      itemB_bioData_influence: new FormControl('', Validators.required),
    
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
    console.log(data)
    this.firebaseService.createReport(data, 'posted')
    .then(
      res => {
        this.resetFields();
        this.viewCtrl.dismiss({success: true});
      }
    )
  }

}
