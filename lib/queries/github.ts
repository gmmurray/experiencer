import { PagingState } from '../types/pagingState';
import { UserProfileResponseDataType } from '../types/octokitTypes';
import { octokitClient } from '../../config/octokit';
import { useQuery } from 'react-query';

export const githubQueryKeys = {
    all: 'github' as const,
    users: (pageState: PagingState, search: string | null) =>
        [githubQueryKeys.all, 'users', { search, pageState }] as const,
    user: (username: string | null) =>
        [githubQueryKeys.all, 'user', { username }] as const,
};

const searchGithubUsers = async (
    { page, size }: PagingState,
    search: string | null,
) => {
    if (!search) return null;
    const { data } = await octokitClient.rest.search.users({
        q: search,
        page,
        per_page: size,
    });
    return data;
};
export const useSearchGithubUsers = (
    pageState: PagingState,
    search: string | null,
) =>
    useQuery(
        githubQueryKeys.users(pageState, search),
        () => searchGithubUsers(pageState, search),
        {
            enabled: !!search,
            retry: false,
        },
    );

type GithubUserResponseType = {
    userData: UserProfileResponseDataType;
    languageCounts: { [language: string]: number };
};
const getGithubUser = async (
    username: string | null,
): Promise<GithubUserResponseType | null> => {
    if (!username) return null;

    const { data: userData } = await octokitClient.rest.users.getByUsername({
        username,
    });
    if (!userData) return null;

    const { data: repos } = await octokitClient.rest.repos.listForUser({
        username,
        per_page: 100,
    });
    const languageCounts = repos.reduce((prev, curr) => {
        const language = curr.language;
        if (language) {
            const prevCount = Object.keys(prev).includes(language)
                ? prev[language]
                : 0;
            const count = prevCount + 1;
            return {
                ...prev,
                [language]: count,
            };
        } else return prev;
    }, {} as Record<string, number>);

    return {
        userData,
        languageCounts,
    };
};

export const useGetGithubUser = (username: string | null) =>
    useQuery(githubQueryKeys.user(username), () => getGithubUser(username), {
        enabled: !!username,
        retry: false,
    });
