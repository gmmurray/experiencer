export interface UserPageSettings {
    _id: string; // stored as objectid
    userId: string; // stored as objectid
    enableTimeline: boolean;
    enableExperiences: boolean;
    enableGithub: boolean;
}

export const userPageSettingsCollection = 'userPageSettings';
