import { Session } from 'next-auth';
import GithubUser from '../../components/github/GithubUser';

export interface GithubUser {
    _id: string;
    login: string;
    providerAccountId: number;
    githubUrl: string;
}

export interface GithubSession extends Session {
    user?: Session['user'] & GithubUser;
}
