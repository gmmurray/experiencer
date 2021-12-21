import { Button, FormGroup, TextField } from '@mui/material';
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
                                    />
                                )}
                            />
                        )}
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

export default ExperienceDataPointForm;
