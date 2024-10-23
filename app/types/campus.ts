export type CampusDataPhone = {
    text: string;
    indicative: string;
    checked: boolean;
    ext: string;
};

export type CampusScheduleValues = {
    openTime: string;
    closeTime: string;
};

export type CampusFormValues = {
    phones?: CampusDataPhone[];
};

export type CampusDataSchedule = {
    monday: CampusScheduleValues;
    tuesday: CampusScheduleValues;
    wednesday: CampusScheduleValues;
    thursday: CampusScheduleValues;
    friday: CampusScheduleValues;
    saturday: CampusScheduleValues;
    sunday: CampusScheduleValues;
    [key: string]: CampusScheduleValues;
};

export type CampusFormValuesData = {
    uid: string;
    name: [string, boolean];
    address: [string, boolean];
    url: [string, boolean];
    phones?: CampusDataPhone[];
    schedule: CampusDataSchedule;
    timestamp: string;
    isActive: boolean;
    isDeleted: boolean;
};
