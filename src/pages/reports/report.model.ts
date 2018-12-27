export class Report {
    
    private _blotterNo: number;
    public get blotterNo(): number {
        return this._blotterNo;
    }
    public set blotterNo(value: number) {
        this._blotterNo = value;
    }
    
    private _status: string;
    public get status(): string {
        return this._status;
    }
    public set status(value: string) {
        this._status = value;
    }
    private _incidentType: string;
    public get incidentType(): string {
        return this._incidentType;
    }
    public set incidentType(value: string) {
        this._incidentType = value;
    }
    private _incidentLocation: string;
    public get incidentLocation(): string {
        return this._incidentLocation;
    }
    public set incidentLocation(value: string) {
        this._incidentLocation = value;
    }
    private _incidentDateAndTime: string;
    public get incidentDateAndTime(): string {
        return this._incidentDateAndTime;
    }
    public set incidentDateAndTime(value: string) {
        this._incidentDateAndTime = value;
    }
    
    documentId: string;
    createdOn:any;
    updatedOn:any;
    userId:string;
    typeA: {
        name: {
            familyName: string,
            firstName: string,
            middleName: string,
            qualifier: string,
            nickName: string,
        },
        citizenship: string,
        sex: string,
        civilStatus: string,
        birthDate: string,
        age: string,
        birthPlace: string,
        currentAddress: {
            houseNumber: string,
            village: string,
            barangay: string,
            town: string,
            province: string,
        },
        otherAddress: {
            houseNumber: string,
            village: string,
            barangay: string,
            town: string,
            province: string,
        },
        highestEducationalAttainment: string,
        occupation: string,
        idCardPresented: string,
        contactInfo: {
            emailAddress: string,
            homePhone: string,
            mobilePhone: string,
        }   
    };
    typeB: {
        name: {
            familyName: string,
            firstName: string,
            middleName: string,
            qualifier: string,
            nickName: string,
        },
        citizenship: string,
        sex: string,
        civilStatus: string,
        birthDate: string,
        age: string,
        birthPlace: string,
        currentAddress: {
            houseNumber: string,
            village: string,
            barangay: string,
            town: string,
            province: string,
        },
        otherAddress: {
            houseNumber: string,
            village: string,
            barangay: string,
            town: string,
            province: string,
        },
        highestEducationalAttainment: string,
        occupation: string,
        bioData: {
            height: string,
            weight: string,
            eyeColor: string,
            eyeDescription: string,
            hairColor: string,
            hairDescription: string,
            influence: string,
        },
        children: {
            guardianName: string,
            guardianAddress: string,
            homePhone: string,
            mobilePhone: string,
        },
        otherDistinguishingFeatures: string,
    };
    typeC: {
        name: {
            familyName: string,
            firstName: string,
            middleName: string,
            qualifier: string,
            nickName: string,
        },
        citizenship: string,
        sex: string,
        civilStatus: string,
        birthDate: string,
        age: string,
        birthPlace: string,
        currentAddress: {
            houseNumber: string,
            village: string,
            barangay: string,
            town: string,
            province: string,
        },
        otherAddress: {
            houseNumber: string,
            village: string,
            barangay: string,
            town: string,
            province: string,
        },
        highestEducationalAttainment: string,
        occupation: string,
        idCardPresented: string,
        contactInfo: {
            emailAddress: string,
            homePhone: string,
            mobilePhone: string,
        },
    };
    typeD: {
        incidentNarrative: string;
    }
}