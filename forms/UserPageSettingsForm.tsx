import {
    Button,
    Checkbox,
    FormControlLabel,
    FormGroup,
    FormHelperText,
} from '@mui/material';
import { FC, Fragment } from 'react';
import { Form, Field } from 'react-final-form';
import { DEFAULT_USER_SETTINGS } from '../lib/constants/defaultUserSettings';
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
                    <Button type="submit" disabled={isLoading}>
                        submit
                    </Button>
                </form>
            )}
        />
    );
};

export default UserPageSettingsForm;
