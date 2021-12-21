import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TextField from '@mui/material/TextField';
import { FC } from 'react';
import { Field, Form } from 'react-final-form';
import { TimelineDataPoint } from '../entities/TimelineTabSettings';
import DateAdapter from '@mui/lab/AdapterMoment';
import ResponsiveDatePicker from '../components/shared/ResponsiveDatePicker';
import LoadingButton from '@mui/lab/LoadingButton';
import { Button, FormGroup } from '@mui/material';
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
                    <LoadingButton type="submit" loading={isLoading}>
                        save
                    </LoadingButton>
                    <Button onClick={onClose}>cancel</Button>
                </form>
            )}
        />
    );
};

export default TimelineDataPointForm;
