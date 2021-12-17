import { axiosGetRequest } from '../../config/axios';
import { useQuery } from 'react-query';
import { GithubUser } from '../../entities/GithubUser';

export const usersQueryKeys = {
    all: 'users' as const,
    view: (userId: string | null) =>
        [usersQueryKeys.all, 'view', { userId }] as const,
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
