export interface GithubUser {
    _id: string;
    login: string;
    providerAccountId: number;
    githubUrl: string;
}

export const githubUsersCollection = 'users';
