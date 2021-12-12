import {
    axiosGetRequest,
    axiosPostRequest,
    axiosPutRequest,
} from '../../config/axios';
import { useMutation, useQuery } from 'react-query';
import { UserPageSettings } from '../../entities/UserPageSettings';
import { ReasonPhrases } from 'http-status-codes';
import { queryClient } from '../../config/queryClient';
export const userPageSettingsQueryKeys = {
    all: 'userSettings' as const,
    view: (userId: string | null) =>
        [userPageSettingsQueryKeys.all, 'view', { userId }] as const,
};
const apiEndpoint = 'api/users/settings/';

const getUserPageSettings = async (userId: string | null) => {
    if (!userId) return null;

    return await axiosGetRequest(apiEndpoint + userId);
};
export const useGetUserPageSettings = (userId: string | null) =>
    useQuery<UserPageSettings | null>(
        userPageSettingsQueryKeys.view(userId),
        () => getUserPageSettings(userId),
        {
            enabled: !!userId,
            retry: false,
        },
    );

const createUserPageSettings = async (data: Partial<UserPageSettings>) => {
    if (!data.userId) throw new Error(ReasonPhrases.BAD_REQUEST);
    return await axiosPostRequest(apiEndpoint, data);
};
export const useCreateUserPageSettings = () =>
    useMutation(
        (data: Partial<UserPageSettings>) => createUserPageSettings(data),
        {
            onSuccess: () =>
                queryClient.invalidateQueries(userPageSettingsQueryKeys.all),
        },
    );

const updateUserPageSettings = async (data: UserPageSettings) =>
    await axiosPutRequest(apiEndpoint, data);
export const useUpdateUserPageSettings = () =>
    useMutation((data: UserPageSettings) => updateUserPageSettings(data), {
        onSuccess: (res: UserPageSettings) =>
            queryClient.invalidateQueries(
                userPageSettingsQueryKeys.view(res.userId as string),
            ),
    });
