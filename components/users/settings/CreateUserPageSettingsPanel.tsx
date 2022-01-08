import { FC, useCallback } from 'react';
import {
    showErrorSnackbar,
    showSuccessSnackbar,
} from '../../../config/notistack';

import { Box } from '@mui/material';
import { GithubSession } from '../../../lib/types/GithubSession';
import { UserPageSettings } from '../../../entities/UserPageSettings';
import UserPageSettingsForm from '../../../forms/UserPageSettingsForm';
import { useCreateUserPageSettings } from '../../../lib/queries/userPageSettings';
import { useSession } from 'next-auth/react';
import { useSnackbar } from 'notistack';

const CreateUserPageSettingsPanel = () => {
    const { enqueueSnackbar } = useSnackbar();
    const createMutation = useCreateUserPageSettings();
    const { data: session } = useSession();
    const typedSession = session as GithubSession | null;

    const handleCreate = useCallback(
        async (data: Partial<UserPageSettings>) => {
            createMutation.mutate(
                {
                    ...data,
                    userId: typedSession?.user?._id,
                    displayName: data.displayName ?? typedSession?.user?.login,
                },
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
        [createMutation, enqueueSnackbar, typedSession?.user],
    );

    if (!typedSession) {
        return null;
    }
    return (
        <Box sx={{ p: 2, my: 2 }}>
            <UserPageSettingsForm
                isLoading={createMutation.isLoading}
                onSubmit={handleCreate}
            />
        </Box>
    );
};

export default CreateUserPageSettingsPanel;
