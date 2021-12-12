import React, { useCallback, useRef } from 'react';
import { FC } from 'react';
import {
    SnackbarProvider,
    SnackbarMessage,
    OptionsObject,
    SnackbarKey,
} from 'notistack';
import { Button, Collapse } from '@mui/material';

export const SnackbarWrapper: FC = ({ children }) => {
    const ref = useRef<SnackbarProvider>(null);
    const handleDismiss = useCallback(
        key => () => {
            ref.current?.closeSnackbar(key);
        },
        [ref],
    );

    return (
        <SnackbarProvider
            ref={ref}
            action={key => (
                <Button
                    variant="text"
                    color="inherit"
                    onClick={handleDismiss(key)}
                >
                    dismiss
                </Button>
            )}
        >
            {children}
        </SnackbarProvider>
    );
};
type EnqueueSnackbar = (
    message: SnackbarMessage,
    options?: OptionsObject,
) => SnackbarKey;

const showSnackbar = (
    enqueueSnackbar: EnqueueSnackbar,
    message: SnackbarMessage,
    options?: OptionsObject,
) =>
    enqueueSnackbar(message, {
        ...options,
        anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'center',
        },
        TransitionComponent: Collapse,
    });

export const showSuccessSnackbar = (
    enqueueSnackbar: EnqueueSnackbar,
    message: string,
) => showSnackbar(enqueueSnackbar, message, { variant: 'success' });

export const showErrorSnackbar = (
    enqueueSnackbar: EnqueueSnackbar,
    message: string,
) => showSnackbar(enqueueSnackbar, message, { variant: 'error' });
