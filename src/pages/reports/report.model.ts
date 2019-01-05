import { Timestamp } from "rxjs";

export class Report {

    constructor (){
        this.blotterNo = 0;
        this.status = '';
        this.publishStatus = '';
        this.incidentType = '';
        this.incidentLocation = '';
        this.incidentDateAndTime = '';
        // this.documentId = '';
        // this.createdOn = '';
        // this.updatedOn ='';
        this.userId = '';
        this.typeA = {
            name: {
                familyName: '',
                firstName: '',
                middleName: '',
                qualifier: '',
                nickName: '',
            },
            citizenship: '',
            sex: '',
            civilStatus: '',
            birthDate: '',
            age: '',
            birthPlace: '',
            currentAddress: {
                houseNumber: '',
                village: '',
                barangay: '',
                town: '',
                province: '',
            },
            otherAddress: {
                houseNumber: '',
                village: '',
                barangay: '',
                town: '',
                province: '',
            },
            highestEducationalAttainment: '',
            occupation: '',
            idCardPresented: '',
            contactInfo: {
                emailAddress: '',
                homePhone: '',
                mobilePhone: '',
            }
        };
        this.typeB = {
            name: {
                familyName: '',
                firstName: '',
                middleName: '',
                qualifier: '',
                nickName: '',
            },
            citizenship: '',
            sex: '',
            civilStatus: '',
            birthDate: '',
            age: '',
            birthPlace: '',
            currentAddress: {
                houseNumber: '',
                village: '',
                barangay: '',
                town: '',
                province: '',
            },
            otherAddress: {
                houseNumber: '',
                village: '',
                barangay: '',
                town: '',
                province: '',
            },
            highestEducationalAttainment: '',
            occupation: '',
            workAddress: '',
            relationToVictim: '',
            emailAddress: '',
            govRank: '',
            unitAssignment:'',
            groupAffiliation: '',
            previousRecord: '',
            recordStatus: '',
            bioData: {
                height: '',
                weight: '',
                eyeColor: '',
                eyeDescription: '',
                hairColor: '',
                hairDescription: '',
                influence: '',
            },
            children: {
                guardianName: '',
                guardianAddress: '',
                homePhone: '',
                mobilePhone: '',
            },
            otherDistinguishingFeatures: '',
        };
        this.typeC = {
            name: {
                familyName: '',
                firstName: '',
                middleName: '',
                qualifier: '',
                nickName: '',
            },
            citizenship: '',
            sex: '',
            civilStatus: '',
            birthDate: '',
            age: '',
            birthPlace: '',
            currentAddress: {
                houseNumber: '',
                village: '',
                barangay: '',
                town: '',
                province: '',
            },
            otherAddress: {
                houseNumber: '',
                village: '',
                barangay: '',
                town: '',
                province: '',
            },
            highestEducationalAttainment: '',
            occupation: '',
            idCardPresented: '',
            contactInfo: {
                emailAddress: '',
                homePhone: '',
                mobilePhone: '',
            }
        };
        this.typeD = {
            incidentNarrative: '',
        }
    }

   
    blotterNo: number;
    status: string;
    publishStatus: string;
    incidentType: string;
    incidentLocation: string;
    incidentDateAndTime: string;
    documentId: string;
    createdOn: any;
    updatedOn: any;
    userId: string;
    typeA: {
        name: {
            familyName: string;
            firstName: string;
            middleName: string;
            qualifier: string;
            nickName: string;
        };
        citizenship: string;
        sex: string;
        civilStatus: string;
        birthDate: string;
        age: string;
        birthPlace: string;
        currentAddress: {
            houseNumber: string;
            village: string;
            barangay: string;
            town: string;
            province: string;
        };
        otherAddress: {
            houseNumber: string;
            village: string;
            barangay: string;
            town: string;
            province: string;
        };
        highestEducationalAttainment: string;
        occupation: string;
        idCardPresented: string;
        contactInfo: {
            emailAddress: string;
            homePhone: string;
            mobilePhone: string;
        };
    };
    typeB: {
        name: {
            familyName: string;
            firstName: string;
            middleName: string;
            qualifier: string;
            nickName: string;
        };
        citizenship: string;
        sex: string;
        civilStatus: string;
        birthDate: string;
        age: string;
        birthPlace: string;
        currentAddress: {
            houseNumber: string;
            village: string;
            barangay: string;
            town: string;
            province: string;
        };
        otherAddress: {
            houseNumber: string;
            village: string;
            barangay: string;
            town: string;
            province: string;
        };
        highestEducationalAttainment: string;
        occupation: string;

        workAddress: string;
        relationToVictim: string;
        emailAddress: string;
        govRank: string;
        unitAssignment:string;
        groupAffiliation: string;
        previousRecord: string;
        recordStatus: string;

        bioData: {
            height: string;
            weight: string;
            eyeColor: string;
            eyeDescription: string;
            hairColor: string;
            hairDescription: string;
            influence: string;
        };
        children: {
            guardianName: string;
            guardianAddress: string;
            homePhone: string;
            mobilePhone: string;
        };
        otherDistinguishingFeatures: string;
    };
    typeC: {
        name: {
            familyName: string;
            firstName: string;
            middleName: string;
            qualifier: string;
            nickName: string;
        };
        citizenship: string;
        sex: string;
        civilStatus: string;
        birthDate: string;
        age: string;
        birthPlace: string;
        currentAddress: {
            houseNumber: string;
            village: string;
            barangay: string;
            town: string;
            province: string;
        };
        otherAddress: {
            houseNumber: string;
            village: string;
            barangay: string;
            town: string;
            province: string;
        };
        highestEducationalAttainment: string;
        occupation: string;
        idCardPresented: string;
        contactInfo: {
            emailAddress: string;
            homePhone: string;
            mobilePhone: string;
        };
    };
    typeD: {
        incidentNarrative: string;
    }
}