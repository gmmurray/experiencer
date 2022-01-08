import { Box, Button, FormGroup, TextField } from '@mui/material';
import { Field, Form } from 'react-final-form';
import { isRequired, isValidUrl } from './validation';

import { ExperiencesDataPoint } from '../entities/ExperiencesTabSettings';
import { FC } from 'react';
import { LoadingButton } from '@mui/lab';

type ExperienceDataPointFormProps = {
    onSubmit: (values: ExperiencesDataPoint) => Promise<void>;
    isLoading: boolean;
    initialValues?: ExperiencesDataPoint;
    onClose: () => any;
};

const ExperienceDataPointForm: FC<ExperienceDataPointFormProps> = ({
    onSubmit,
    isLoading,
    initialValues,
    onClose,
}) => {
    return (
        <Form
            onSubmit={onSubmit}
            initialValues={initialValues}
            render={({ handleSubmit, values: allValues }) => (
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
                            name="firstLinkTo"
                            validate={isValidUrl}
                            render={({ input, meta }) => (
                                <TextField
                                    {...input}
                                    label="link url"
                                    fullWidth
                                    variant="standard"
                                    error={meta.error && meta.touched}
                                    helperText={meta.touched && meta.error}
                                    sx={{ mb: 1 }}
                                />
                            )}
                        />
                        {allValues?.firstLinkTo && (
                            <Field
                                name="firstLinkText"
                                validate={isRequired}
                                render={({ input, meta }) => (
                                    <TextField
                                        {...input}
                                        label="link text"
                                        fullWidth
                                        variant="standard"
                                        error={meta.error && meta.touched}
                                        helperText={meta.touched && meta.error}
                                        sx={{ mb: 1 }}
                                    />
                                )}
                            />
                        )}
                        <Field
                            name="secondLinkTo"
                            validate={isValidUrl}
                            render={({ input, meta }) => (
                                <TextField
                                    {...input}
                                    label="additional link url"
                                    fullWidth
                                    variant="standard"
                                    error={meta.error && meta.touched}
                                    helperText={meta.touched && meta.error}
                                    sx={{ mb: 1 }}
                                />
                            )}
                        />
                        {allValues?.secondLinkTo && (
                            <Field
                                name="secondLinkText"
                                validate={isRequired}
                                render={({ input, meta }) => (
                                    <TextField
                                        {...input}
                                        label="additional link text"
                                        fullWidth
                                        variant="standard"
                                        error={meta.error && meta.touched}
                                        helperText={meta.touched && meta.error}
                                        sx={{ mb: 1 }}
                                    />
                                )}
                            />
                        )}
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

export default ExperienceDataPointForm;
