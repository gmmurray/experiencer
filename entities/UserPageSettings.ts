import { UserTabSetup } from './UserTabSetup';

export interface UserPageSettings {
    _id: string; // stored as objectid
    userId: string; // stored as objectid
    enableTimeline: boolean;
    enableExperiences: boolean;
    enableGithub: boolean;
    displayName?: string;
    avatarUrl?: string;
    tabSetup: UserTabSetup;
}

export const userPageSettingsCollection = 'userPageSettings';
