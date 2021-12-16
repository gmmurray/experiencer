import {
    Button,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    TextField,
    Typography,
} from '@mui/material';
import { FC, Fragment, useCallback, useEffect, useState } from 'react';
import { Field, Form } from 'react-final-form';
import {
    LoadingButton,
    LocalizationProvider,
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
} from '../../../entities/UserTabSetup';
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
import DateAdapter from '@mui/lab/AdapterMoment';
import DeleteIcon from '@mui/icons-material/Delete';
import ResponsiveDatePicker from '../../shared/ResponsiveDatePicker';
import { UserPageSettings } from '../../../entities/UserPageSettings';
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
    const { data: settings } = useGetUserPageSettings(userId);
    const updateMutation = useUpdateUserPageSettings();

    const handleModifyItems = useCallback(
        async (
            operation: 'add' | 'update' | 'delete',
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
                    showSuccessSnackbar(enqueueSnackbar, 'items modified'),
                onError: async () =>
                    showErrorSnackbar(enqueueSnackbar, 'error modifying items'),
            });
        },
        [enqueueSnackbar, settings, updateMutation],
    );

    const handleAddItem = useCallback(
        async (data: TimelineDataPoint) => {
            await handleModifyItems('add', data);
            setIsModalOpen(false);
        },
        [handleModifyItems],
    );

    const handleUpdateItem = useCallback(
        async (data: TimelineDataPoint, index?: number) => {
            await handleModifyItems('update', data, index);
            setIsModalOpen(false);
        },
        [handleModifyItems],
    );

    const handleDeleteItem = useCallback(
        async (index?: number) => {
            await handleModifyItems('delete', undefined, index);
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

    useEffect(() => {
        if (!isModalOpen) {
            setSelectedItem(null);
        }
    }, [isModalOpen]);

    const timelineData = settings?.tabSetup.timeline;

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
                <List>
                    {(timelineData?.dataPoints ?? [])
                        .sort((a, b) => (a.date > b.date ? -1 : 1))
                        .map((d, i) => (
                            <Fragment key={i}>
                                <ListItem
                                    disablePadding
                                    secondaryAction={
                                        <IconButton
                                            edge="end"
                                            aria-label="delete"
                                            onClick={() => handleDeleteItem(i)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    }
                                >
                                    <ListItemButton
                                        onClick={() => handleSelectItem(i, d)}
                                    >
                                        <ListItemText
                                            primary={d.title}
                                            secondary={
                                                <Fragment>
                                                    <Typography>
                                                        {d.description}
                                                    </Typography>
                                                    <Typography>
                                                        {new Date(
                                                            d.date,
                                                        ).toLocaleDateString()}
                                                    </Typography>
                                                </Fragment>
                                            }
                                        />
                                    </ListItemButton>
                                </ListItem>
                                {i !==
                                    (timelineData?.dataPoints ?? []).length -
                                        1 && <Divider />}
                            </Fragment>
                        ))}
                </List>
                <Dialog
                    open={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                >
                    <DialogTitle>add new timeline item</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            you can any add sort of date-based event that you
                            think is important
                        </DialogContentText>
                        <Form
                            onSubmit={onSubmitFunction}
                            initialValues={selectedValues}
                            render={({ handleSubmit }) => (
                                <form onSubmit={handleSubmit}>
                                    <Field
                                        name="title"
                                        render={({ input }) => (
                                            <TextField
                                                {...input}
                                                autoFocus
                                                label="title"
                                                fullWidth
                                                variant="standard"
                                            />
                                        )}
                                    />
                                    <Field
                                        name="description"
                                        render={({ input }) => (
                                            <TextField
                                                {...input}
                                                multiline
                                                label="description"
                                                fullWidth
                                                variant="standard"
                                            />
                                        )}
                                    />
                                    <Field
                                        name="date"
                                        render={({ input }) => (
                                            <LocalizationProvider
                                                dateAdapter={DateAdapter}
                                            >
                                                <ResponsiveDatePicker
                                                    {...input}
                                                    label="date"
                                                    inputFormat="MM/DD/yyyy"
                                                    renderInput={params => (
                                                        <TextField
                                                            {...params}
                                                            fullWidth
                                                            variant="standard"
                                                        />
                                                    )}
                                                />
                                            </LocalizationProvider>
                                        )}
                                    />
                                    <LoadingButton
                                        type="submit"
                                        loading={updateMutation.isLoading}
                                    >
                                        save
                                    </LoadingButton>
                                </form>
                            )}
                        />
                    </DialogContent>
                </Dialog>
            </Fragment>
        );
    }

    if (!timelineData || !(timelineData.dataPoints.length > 0)) {
        return (
            <div>
                {isCurrentUser && (
                    <Button onClick={() => setIsEditMode(true)}>edit</Button>
                )}
                no timeline data
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
            <Timeline position="alternate">
                {(timelineData?.dataPoints ?? [])
                    .sort((a, b) => (a.date > b.date ? -1 : 1))
                    .map((d, i) => (
                        <TimelineItem key={i}>
                            <TimelineOppositeContent color="text.secondary">
                                {new Date(d.date).toLocaleDateString()}
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                                <TimelineDot />
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
