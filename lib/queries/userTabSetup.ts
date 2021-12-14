import { UserTabKey, UserTabSetup } from '../../entities/UserTabSetup';

import { axiosGetRequest } from '../../config/axios';
import { useQuery } from 'react-query';

export const userTabSetupQueryKeys = {
    all: 'userTabSetup' as const,
    view: (userId: string | null, tab?: UserTabKey) =>
        [userTabSetupQueryKeys.all, 'view', { userId, tab }] as const,
};
const apiEndpoint = 'api/users/tab-setup/';

const getUserTabSetup = async (userId: string | null, tab?: UserTabKey) => {
    if (!userId) return null;
    let uri = apiEndpoint + userId;
    if (tab) {
        uri += `?tab=${tab}`;
    }
    return await axiosGetRequest(uri);
};
export const useGetUserTabSetup = async (
    userId: string | null,
    tab?: UserTabKey,
) =>
    useQuery<UserTabSetup | null>(
        userTabSetupQueryKeys.view(userId, tab),
        () => getUserTabSetup(userId, tab),
        {
            enabled: !!userId,
            retry: false,
        },
    );
