import { useSnackbar } from 'notistack';
import { FC, useCallback } from 'react';
import {
    showErrorSnackbar,
    showSuccessSnackbar,
} from '../../../config/notistack';
import { UserPageSettings } from '../../../entities/UserPageSettings';
import UserPageSettingsForm from '../../../forms/UserPageSettingsForm';
import {
    useGetUserPageSettings,
    useUpdateUserPageSettings,
} from '../../../lib/queries/userPageSettings';
import { UserTabComponent } from './ViewUserTabs';

const UserPageSettingsTab: FC<UserTabComponent> = ({ userId }) => {
    const { enqueueSnackbar } = useSnackbar();
    const { data: settings } = useGetUserPageSettings(userId);
    const updateMutation = useUpdateUserPageSettings();

    const handleUpdate = useCallback(
        async (data: Partial<UserPageSettings>) => {
            updateMutation.mutate(data as UserPageSettings, {
                onSuccess: async () =>
                    showSuccessSnackbar(enqueueSnackbar, 'settings updated'),
                onError: async () =>
                    showErrorSnackbar(
                        enqueueSnackbar,
                        'error updating settings',
                    ),
            });
        },
        [enqueueSnackbar, updateMutation],
    );

    if (!settings) return null;

    return (
        <div>
            <UserPageSettingsForm
                onSubmit={handleUpdate}
                isLoading={updateMutation.isLoading}
                initialValues={settings}
            />
        </div>
    );
};

export default UserPageSettingsTab;
