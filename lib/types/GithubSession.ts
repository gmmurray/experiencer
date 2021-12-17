import { Session } from 'next-auth';
import { GithubUser } from '../../entities/GithubUser';

export interface GithubSession extends Session {
    user?: Session['user'] & GithubUser;
}
