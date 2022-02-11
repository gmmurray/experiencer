import {
    Button,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Typography,
} from '@mui/material';
import { FC, Fragment, useCallback, useEffect, useState } from 'react';
import {
    OperationType,
    OperationTypes,
} from '../../../lib/types/operationTypes';
import {
    Timeline,
    TimelineConnector,
    TimelineContent,
    TimelineDot,
    TimelineItem,
    TimelineOppositeContent,
    TimelineSeparator,
} from '@mui/lab';
import {
    TimelineDataPoint,
    modifyTimelineDataPoints,
} from '../../../entities/TimelineTabSettings';
import {
    showErrorSnackbar,
    showSuccessSnackbar,
} from '../../../config/notistack';
import {
    useGetUserPageSettings,
    useUpdateUserPageSettings,
} from '../../../lib/queries/userPageSettings';

import AddIcon from '@mui/icons-material/Add';
import { Box } from '@mui/system';
import TimelineDataPointForm from '../../../forms/TimelineDataPointForm';
import TimelineDataPointList from './TimelineDataPointList';
import { UserTabComponent } from './ViewUserTabs';
import { useSnackbar } from 'notistack';

const TimeLineTab: FC<UserTabComponent> = ({ userId, isCurrentUser }) => {
    const { enqueueSnackbar } = useSnackbar();
    const [isEditMode, setIsEditMode] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<Record<
        number,
        TimelineDataPoint
    > | null>(null);
    const { data: settings, isLoading: settingsAreLoading } =
        useGetUserPageSettings(userId);
    const updateMutation = useUpdateUserPageSettings();

    const handleModifyItems = useCallback(
        async (
            operation: OperationType,
            data?: TimelineDataPoint,
            index?: number,
        ) => {
            if (!settings) return;

            const modifiedSettings = modifyTimelineDataPoints(
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
        async (data: TimelineDataPoint) => {
            await handleModifyItems(OperationTypes.ADD, data);
            setIsModalOpen(false);
        },
        [handleModifyItems],
    );

    const handleUpdateItem = useCallback(
        async (data: TimelineDataPoint, index?: number) => {
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
        (index: number, data: TimelineDataPoint) => {
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

    const timelineData = settings?.tabSetup?.timeline;
    const sortedDataPoints = timelineData?.dataPoints.sort((a, b) =>
        a.date > b.date ? -1 : 1,
    );

    if (isEditMode && isCurrentUser) {
        const selectedValues = selectedItem
            ? Object.values(selectedItem)[0]
            : undefined;
        const selectedIndex = selectedItem
            ? parseInt(Object.keys(selectedItem)[0])
            : undefined;
        const onSubmitFunction = selectedValues
            ? (data: TimelineDataPoint) => handleUpdateItem(data, selectedIndex)
            : (data: TimelineDataPoint) => handleAddItem(data);
        return (
            <Fragment>
                <Box display="flex">
                    <Button
                        startIcon={<AddIcon />}
                        onClick={() => setIsModalOpen(true)}
                        color="inherit"
                        className="special-button special-button-outlined"
                        variant="outlined"
                    >
                        add item
                    </Button>
                    <Button
                        onClick={() => setIsEditMode(false)}
                        sx={{ ml: 'auto' }}
                        color="inherit"
                        className="special-button special-button-outlined"
                        variant="outlined"
                    >
                        stop editing
                    </Button>
                </Box>
                <TimelineDataPointList
                    data={sortedDataPoints ?? []}
                    onDelete={handleDeleteItem}
                    onSelect={handleSelectItem}
                    isLoading={settingsAreLoading || updateMutation.isLoading}
                />
                <Dialog
                    open={isModalOpen}
                    onClose={handleCloseDialog}
                    PaperProps={{
                        elevation: 1,
                    }}
                >
                    <DialogTitle>add new timeline item</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            you can any add sort of date-based event that you
                            think is important
                        </DialogContentText>
                        <TimelineDataPointForm
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

    if (!timelineData || !(timelineData.dataPoints.length > 0)) {
        return (
            <Fragment>
                {isCurrentUser && (
                    <Box display="flex">
                        <Button
                            onClick={() => setIsEditMode(true)}
                            sx={{ ml: 'auto' }}
                            color="inherit"
                            className="special-button special-button-outlined"
                            variant="outlined"
                        >
                            edit
                        </Button>
                    </Box>
                )}
                <Typography variant="h5" mt={5}>
                    no timeline data
                </Typography>
            </Fragment>
        );
    }

    return (
        <Fragment>
            {isCurrentUser && (
                <Box display="flex">
                    <Button
                        onClick={() => setIsEditMode(true)}
                        sx={{ ml: 'auto' }}
                        color="inherit"
                        className="special-button special-button-outlined"
                        variant="outlined"
                    >
                        edit
                    </Button>
                </Box>
            )}
            <Timeline position="alternate">
                {(sortedDataPoints ?? []).map((d, i) => (
                    <TimelineItem key={i}>
                        <TimelineOppositeContent color="text.secondary">
                            {new Date(d.date).toLocaleDateString()}
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                            <TimelineDot
                                color={!!(i % 2) ? 'primary' : 'secondary'}
                            />
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent>
                            <Typography variant="h6">{d.title}</Typography>
                            <Typography variant="body2">
                                {d.description}
                            </Typography>
                        </TimelineContent>
                    </TimelineItem>
                ))}
            </Timeline>
        </Fragment>
    );
};

export default TimeLineTab;
