import {
    GithubUser,
    GithubUserWithPageSettings,
} from '../../entities/GithubUser';

import { GithubUserResponseType } from './github';
import { axiosGetRequest } from '../../config/axios';
import { useQuery } from 'react-query';

export const usersQueryKeys = {
    all: 'users' as const,
    view: (userId: string | null) =>
        [usersQueryKeys.all, 'view', { userId }] as const,
    search: (username: string | null) =>
        [usersQueryKeys.all, 'search', { username }] as const,
};
const apiEndpoint = 'api/users/';

const getUser = async (userId: string | null) => {
    if (!userId) return null;

    return await axiosGetRequest(apiEndpoint + userId);
};
export const useGetUser = (userId: string | null) =>
    useQuery<GithubUser | null>(
        usersQueryKeys.view(userId),
        () => getUser(userId),
        {
            enabled: !!userId,
            retry: false,
        },
    );

const getUserByGithubProfile = async (
    profile?: GithubUserResponseType | null,
) => {
    if (!profile) return null;

    return await axiosGetRequest(
        apiEndpoint + 'github/' + profile.userData.login,
    );
};
export const useGetUserByGithubProfile = (
    profile?: GithubUserResponseType | null,
) =>
    useQuery<GithubUserWithPageSettings | null>(
        usersQueryKeys.search((profile?.userData?.login as string) ?? null),
        () => getUserByGithubProfile(profile),
        {
            enabled: !!profile && !!profile.userData,
            retry: false,
        },
    );
