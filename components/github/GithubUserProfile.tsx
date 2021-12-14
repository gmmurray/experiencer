import { FC, ReactNode } from 'react';
import { Grid, GridSize, Link, Stack, Typography } from '@mui/material';

import { Box } from '@mui/system';
import { UserProfileResponseDataType } from '../../lib/types/octokitTypes';

type ProfileField = {
    field: keyof UserProfileResponseDataType;
    title: string;
    gridSize: GridSize;
    renderValue?: (value: any) => ReactNode;
};
const profileFields: ProfileField[] = [
    {
        field: 'name',
        title: 'name',
        gridSize: 6,
    },
    {
        field: 'created_at',
        title: 'joined',
        gridSize: 6,
        renderValue: value => new Date(value).toLocaleDateString(),
    },
    {
        field: 'bio',
        title: 'bio',
        gridSize: 12,
    },
    {
        field: 'location',
        title: 'location',
        gridSize: 6,
    },
    {
        field: 'blog',
        title: 'blog',
        gridSize: 6,
        renderValue: value => (
            <Link href={value} target="_blank" rel="noopener">
                {value}
            </Link>
        ),
    },
    {
        field: 'twitter_username',
        title: 'twitter',
        gridSize: 6,
    },
    {
        field: 'company',
        title: 'company',
        gridSize: 6,
    },
    {
        field: 'public_repos',
        title: 'repos',
        gridSize: 6,
    },
    {
        field: 'public_gists',
        title: 'gists',
        gridSize: 6,
        renderValue: value => (value > 0 ? value : null),
    },
    {
        field: 'followers',
        title: 'followers',
        gridSize: 6,
    },
];

const defaultRenderValue = (value: any) => value;

type GithubUserProfileProps = {
    data: UserProfileResponseDataType;
};

const GithubUserProfile: FC<GithubUserProfileProps> = ({ data }) => {
    return (
        <Grid container rowSpacing={2}>
            {profileFields.map(
                ({
                    field,
                    gridSize,
                    title,
                    renderValue = defaultRenderValue,
                }: ProfileField) => {
                    const value = data[field];
                    if (!value) return null;
                    return (
                        <Grid key={field} item xs={gridSize}>
                            <Stack>
                                <Box>
                                    <Typography variant="overline">
                                        {title}
                                    </Typography>
                                    <Typography variant="body2">
                                        {renderValue(value)}
                                    </Typography>
                                </Box>
                            </Stack>
                        </Grid>
                    );
                },
            )}
        </Grid>
    );
};

export default GithubUserProfile;
