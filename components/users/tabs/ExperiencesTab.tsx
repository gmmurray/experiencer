import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    Typography,
} from '@mui/material';
import {
    ExperiencesDataPoint,
    cleanExperiencesDataPoints,
    modifyExperiencesDataPoints,
} from '../../../entities/ExperiencesTabSettings';
import { FC, Fragment, useCallback, useEffect, useState } from 'react';
import {
    OperationType,
    OperationTypes,
} from '../../../lib/types/operationTypes';
import {
    showErrorSnackbar,
    showSuccessSnackbar,
} from '../../../config/notistack';
import {
    useGetUserPageSettings,
    useUpdateUserPageSettings,
} from '../../../lib/queries/userPageSettings';

import AddIcon from '@mui/icons-material/Add';
import ExperienceDataPointForm from '../../../forms/ExperienceDataPointForm';
import ExperienceDataPointList from './ExperienceDataPointList';
import { UserTabComponent } from './ViewUserTabs';
import { isNullOrEmptyString } from '../../../forms/validation';
import { useSnackbar } from 'notistack';

const ExperiencesTab: FC<UserTabComponent> = ({ userId, isCurrentUser }) => {
    const { enqueueSnackbar } = useSnackbar();
    const [isEditMode, setIsEditMode] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<Record<
        number,
        ExperiencesDataPoint
    > | null>(null);

    const { data: settings, isLoading: settingsAreLoading } =
        useGetUserPageSettings(userId);
    const updateMutation = useUpdateUserPageSettings();

    const handleModifyItems = useCallback(
        async (
            operation: OperationType,
            data?: ExperiencesDataPoint,
            index?: number,
        ) => {
            if (!settings) return;

            const modifiedSettings = modifyExperiencesDataPoints(
                settings,
                operation,
                data,
                index,
            );

            updateMutation.mutate(modifiedSettings, {
                onSuccess: async () =>
                    showSuccessSnackbar(enqueueSnackbar, 'timeline modified'),
                onError: async () =>
                    showErrorSnackbar(
                        enqueueSnackbar,
                        'error modifying timeline',
                    ),
            });
        },
        [enqueueSnackbar, settings, updateMutation],
    );

    const handleAddItem = useCallback(
        async (data: ExperiencesDataPoint) => {
            await handleModifyItems(OperationTypes.ADD, data);
            setIsModalOpen(false);
        },
        [handleModifyItems],
    );

    const handleUpdateItem = useCallback(
        async (data: ExperiencesDataPoint, index?: number) => {
            await handleModifyItems(OperationTypes.UPDATE, data, index);
            setIsModalOpen(false);
        },
        [handleModifyItems],
    );

    const handleDeleteItem = useCallback(
        async (index?: number) => {
            await handleModifyItems(OperationTypes.DELETE, undefined, index);
        },
        [handleModifyItems],
    );

    const handleSelectItem = useCallback(
        (index: number, data: ExperiencesDataPoint) => {
            setIsModalOpen(true);
            setSelectedItem({ [index]: data });
        },
        [],
    );

    const handleCloseDialog = useCallback(() => setIsModalOpen(false), []);

    useEffect(() => {
        if (!isModalOpen) {
            setTimeout(() => setSelectedItem(null), 1000);
        }
    }, [isModalOpen]);

    const handleLinkClick = useCallback(
        (url: string) => () =>
            window.open(url, '_blank', 'noopener,noreferrer'),
        [],
    );

    const experiencesData = settings?.tabSetup?.experiences;

    if (isEditMode && isCurrentUser) {
        const selectedValues = selectedItem
            ? Object.values(selectedItem)[0]
            : undefined;
        const selectedIndex = selectedItem
            ? parseInt(Object.keys(selectedItem)[0])
            : undefined;
        const onSubmitFunction = selectedValues
            ? (data: ExperiencesDataPoint) =>
                  handleUpdateItem(data, selectedIndex)
            : (data: ExperiencesDataPoint) => handleAddItem(data);

        return (
            <Fragment>
                <Box display="flex">
                    <Button
                        startIcon={<AddIcon />}
                        onClick={() => setIsModalOpen(true)}
                    >
                        add item
                    </Button>
                    <Button
                        onClick={() => setIsEditMode(false)}
                        sx={{ ml: 'auto' }}
                    >
                        stop editing
                    </Button>
                </Box>
                <ExperienceDataPointList
                    data={experiencesData?.dataPoints ?? []}
                    onDelete={handleDeleteItem}
                    onSelect={handleSelectItem}
                    isLoading={settingsAreLoading || updateMutation.isLoading}
                />
                <Dialog open={isModalOpen} onClose={handleCloseDialog}>
                    <DialogTitle>add new experience</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            add some experience or project you would like to
                            show off
                        </DialogContentText>
                        <ExperienceDataPointForm
                            onSubmit={onSubmitFunction}
                            initialValues={selectedValues}
                            isLoading={
                                settingsAreLoading || updateMutation.isLoading
                            }
                            onClose={handleCloseDialog}
                        />
                    </DialogContent>
                </Dialog>
            </Fragment>
        );
    }

    if (!experiencesData || !(experiencesData.dataPoints.length > 0)) {
        return (
            <div>
                {isCurrentUser && (
                    <Button onClick={() => setIsEditMode(true)}>edit</Button>
                )}
                no experiences data
            </div>
        );
    }

    return (
        <Fragment>
            {isCurrentUser && (
                <Box display="flex">
                    <Button
                        onClick={() => setIsEditMode(true)}
                        sx={{ ml: 'auto' }}
                    >
                        edit
                    </Button>
                </Box>
            )}
            <Grid container spacing={2}>
                {(experiencesData?.dataPoints ?? []).map((exp, i) => {
                    const actions: { url: string; text: string }[] = [];
                    if (
                        !isNullOrEmptyString(exp.firstLinkTo) &&
                        !isNullOrEmptyString(exp.firstLinkText)
                    ) {
                        actions.push({
                            url: exp.firstLinkTo!,
                            text: exp.firstLinkText!,
                        });
                    }
                    if (
                        !isNullOrEmptyString(exp.secondLinkTo) &&
                        !isNullOrEmptyString(exp.secondLinkText)
                    ) {
                        actions.push({
                            url: exp.secondLinkTo!,
                            text: exp.secondLinkText!,
                        });
                    }
                    return (
                        <Grid item xs={12} md={6} key={i}>
                            <Card
                                sx={{
                                    textAlign: 'left',
                                    minHeight: '100%',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    flexDirection: 'column',
                                }}
                                variant="outlined"
                            >
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        {exp.title}
                                    </Typography>
                                    <Typography variant="body2">
                                        {exp.description}
                                    </Typography>
                                </CardContent>
                                {actions.length > 0 && (
                                    <CardActions sx={{ mt: 'auto' }}>
                                        {actions.map((a, i) => (
                                            <Button
                                                key={i}
                                                size="small"
                                                href={a.url}
                                                rel="noopener noreferrer"
                                            >
                                                {a.text}
                                            </Button>
                                        ))}
                                    </CardActions>
                                )}
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>
        </Fragment>
    );
};

export default ExperiencesTab;
