import { PermissionTypeEnum } from "./enum/PermissionTypeEnum";

export interface Patient {
    surname: string;
    addressLine: string;
    county: string;
    postcode: string;
    firstName: string;
    middleNames: string;
    startDate: Date;
    prognosis: string;
    city: string;
    id: string;
    diagnoses: string[];
    generalPractioner: IGpSurgery;
    referralId?: number;
    eightWeekReview: Date;
    sixWeekReview: Date;
    telephoneNumber: string;
    dob: Date;
    gpFullname: string;
    updatedAt: string;
    referredBy: string;
    nokDetails: string;
    firstPointOfContact: string;
    additionalContacts: string[];
    assessment: {
        dnacpr: boolean;
        riskOfPressure: boolean;
        reduceMobility: boolean;
        marChart: boolean;
        careAssistant: boolean;
        pressureSore: boolean;
        weightBear: boolean;
        painSymptom: boolean;
        medication: boolean;
        syringeDriver: boolean;
        syringeDriverSetupDate: string;
    }
}

export interface CalendarEvent {
    id: string;
    time: string;
    date: Date;
    startTime: Date;
    endTime: Date;
    startTravelTime: Date;
    endTravelTime: Date;
    patient: Patient;
    staff: IStaff[];
    onSelected: (callId: string) => void;
}

export interface IStaff {
    id: string;
    forename: string;
    surname: string;
    dob: Date;
    emailAddress: string;
    role: IRole;
    avatarFilename?: string;
    // addressLine: string;
    // postcode: string;
}
export interface IGpSurgery {
    id: number;
    phoneNumber: string;
    surgeryName: string;
    address: string;
}

export interface IRole {
    id: string;
    name: string;
    created: Date;
    lastUpdated: Date;
    permissions: PermissionTypeEnum[];
}

export enum NotificationVerbEnum {
    CREATE = 'CREATE',
    UPDATE = 'UPDATE',
    DELETE = 'DELETE',
  }

export type INotificationStaff = {
    forename: string;
    surname: string;
}
export interface INotification {
    id: string;
    content: string;
    read: boolean;
    createdAt: Date;
}