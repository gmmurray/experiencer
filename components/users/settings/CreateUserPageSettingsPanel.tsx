import { FC, useCallback } from 'react';
import {
    showErrorSnackbar,
    showSuccessSnackbar,
} from '../../../config/notistack';

import { Paper } from '@mui/material';
import { UserPageSettings } from '../../../entities/UserPageSettings';
import UserPageSettingsForm from '../../../forms/UserPageSettingsForm';
import { useCreateUserPageSettings } from '../../../lib/queries/userPageSettings';
import { useSession } from 'next-auth/react';
import { useSnackbar } from 'notistack';

type CreateUserPageSettingsPanelProps = {
    userId: string | null;
};

const CreateUserPageSettingsPanel: FC<CreateUserPageSettingsPanelProps> = ({
    userId,
}) => {
    const { enqueueSnackbar } = useSnackbar();
    const createMutation = useCreateUserPageSettings();

    const handleCreate = useCallback(
        async (data: Partial<UserPageSettings>) => {
            createMutation.mutate(
                { ...data, userId: userId ?? undefined },
                {
                    onSuccess: async () =>
                        showSuccessSnackbar(
                            enqueueSnackbar,
                            'settings created',
                        ),
                    onError: async () =>
                        showErrorSnackbar(
                            enqueueSnackbar,
                            'error creating settings',
                        ),
                },
            );
        },
        [createMutation, enqueueSnackbar, userId],
    );
    return (
        <Paper elevation={1} sx={{ p: 2, my: 2 }}>
            <UserPageSettingsForm
                isLoading={createMutation.isLoading}
                onSubmit={handleCreate}
            />
        </Paper>
    );
};

export default CreateUserPageSettingsPanel;
