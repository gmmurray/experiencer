import {
    Checkbox,
    Divider,
    FormControlLabel,
    FormGroup,
    FormHelperText,
    TextField,
} from '@mui/material';
import { FC, Fragment } from 'react';
import { Field, Form } from 'react-final-form';

import { DEFAULT_USER_SETTINGS } from '../lib/constants/defaultUserSettings';
import { LoadingButton } from '@mui/lab';
import { UserPageSettings } from '../entities/UserPageSettings';

type UserPageSettingsFormProps = {
    onSubmit: (values: Partial<UserPageSettings>) => any;
    isLoading: boolean;
    initialValues?: UserPageSettings;
};

const UserPageSettingsForm: FC<UserPageSettingsFormProps> = ({
    onSubmit,
    isLoading,
    initialValues = DEFAULT_USER_SETTINGS,
}) => {
    return (
        <Form
            onSubmit={onSubmit}
            initialValues={initialValues}
            render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Field
                            type="checkbox"
                            name="enableTimeline"
                            render={({ input }) => (
                                <Fragment>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                {...input}
                                                defaultChecked={input.value}
                                            />
                                        }
                                        label="show timeline tab"
                                    />
                                    <FormHelperText>
                                        customizable space to show your progress
                                        and journey over time
                                    </FormHelperText>
                                </Fragment>
                            )}
                        />
                        <Field
                            type="checkbox"
                            name="enableExperiences"
                            render={({ input }) => (
                                <Fragment>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                {...input}
                                                defaultChecked={input.value}
                                            />
                                        }
                                        label="show experiences tab"
                                    />
                                    <FormHelperText>
                                        customizable tab to show off some of
                                        your experiences such as personal
                                        projects or events
                                    </FormHelperText>
                                </Fragment>
                            )}
                        />
                        <Field
                            type="checkbox"
                            name="enableGithub"
                            render={({ input }) => (
                                <Fragment>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                {...input}
                                                defaultChecked={input.value}
                                            />
                                        }
                                        label="show github tab"
                                    />
                                    <FormHelperText>
                                        this tab shows basic info from your
                                        github including language and repository
                                        info
                                    </FormHelperText>
                                </Fragment>
                            )}
                        />
                    </FormGroup>
                    <Divider sx={{ my: 2 }} />
                    <FormGroup>
                        <Field
                            name="displayName"
                            render={({ input }) => (
                                <TextField
                                    {...input}
                                    label="display name"
                                    variant="standard"
                                    sx={{ mb: 1 }}
                                />
                            )}
                        />
                        <Field
                            name="avatarUrl"
                            render={({ input }) => (
                                <TextField
                                    {...input}
                                    label="avatar url"
                                    variant="standard"
                                />
                            )}
                        />
                    </FormGroup>
                    <LoadingButton
                        type="submit"
                        loading={isLoading}
                        className="special-button special-button-outlined"
                        color="inherit"
                        variant="outlined"
                        sx={{ mt: 2 }}
                    >
                        save
                    </LoadingButton>
                </form>
            )}
        />
    );
};

export default UserPageSettingsForm;
