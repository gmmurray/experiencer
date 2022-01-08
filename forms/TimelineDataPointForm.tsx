import { Box, Button, FormGroup } from '@mui/material';
import { Field, Form } from 'react-final-form';

import DateAdapter from '@mui/lab/AdapterMoment';
import { FC } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import ResponsiveDatePicker from '../components/shared/ResponsiveDatePicker';
import TextField from '@mui/material/TextField';
import { TimelineDataPoint } from '../entities/TimelineTabSettings';
import { isRequired } from './validation';

type TimelineDataPointFormProps = {
    onSubmit: (values: TimelineDataPoint) => Promise<void>;
    isLoading: boolean;
    initialValues?: TimelineDataPoint;
    onClose: () => any;
};

const TimelineDataPointForm: FC<TimelineDataPointFormProps> = ({
    onSubmit,
    isLoading,
    initialValues,
    onClose,
}) => {
    return (
        <Form
            onSubmit={onSubmit}
            initialValues={initialValues}
            render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Field
                            name="title"
                            validate={isRequired}
                            render={({ input, meta }) => (
                                <TextField
                                    {...input}
                                    label="title"
                                    fullWidth
                                    variant="standard"
                                    error={meta.error && meta.touched}
                                    helperText={meta.touched && meta.error}
                                    sx={{ mb: 1 }}
                                />
                            )}
                        />
                        <Field
                            name="description"
                            validate={isRequired}
                            render={({ input, meta }) => (
                                <TextField
                                    {...input}
                                    multiline
                                    label="description"
                                    fullWidth
                                    variant="standard"
                                    error={meta.error && meta.touched}
                                    helperText={meta.touched && meta.error}
                                    sx={{ mb: 1 }}
                                />
                            )}
                        />
                        <Field
                            name="date"
                            validate={isRequired}
                            render={({ input, meta }) => (
                                <LocalizationProvider dateAdapter={DateAdapter}>
                                    <ResponsiveDatePicker
                                        {...input}
                                        label="date"
                                        inputFormat="MM/DD/yyyy"
                                        renderInput={params => (
                                            <TextField
                                                {...params}
                                                fullWidth
                                                variant="standard"
                                                error={
                                                    meta.error && meta.touched
                                                }
                                                helperText={
                                                    meta.touched && meta.error
                                                }
                                            />
                                        )}
                                    />
                                </LocalizationProvider>
                            )}
                        />
                    </FormGroup>
                    <Box mt={3}>
                        <LoadingButton
                            type="submit"
                            loading={isLoading}
                            color="primary"
                            variant="contained"
                        >
                            save
                        </LoadingButton>
                        <Button
                            onClick={onClose}
                            color="inherit"
                            sx={{ ml: 2 }}
                        >
                            cancel
                        </Button>
                    </Box>
                </form>
            )}
        />
    );
};

export default TimelineDataPointForm;
