import { Octokit } from 'octokit';

export const octokitClient = new Octokit({
    auth: process.env.NEXT_PUBLIC_GITHUB_PERSONAL_ACCESS_TOKEN,
});
