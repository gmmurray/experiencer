import { UserPageSettings } from './UserPageSettings';

export interface GithubUser {
    _id: string;
    login: string;
    providerAccountId: number;
    githubUrl: string;
}

export interface GithubUserWithPageSettings extends GithubUser {
    userPageSettings?: UserPageSettings;
}

export const githubUsersCollection = 'users';
