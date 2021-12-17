import {
    Avatar,
    CircularProgress,
    Container,
    Link,
    Stack,
    Typography,
} from '@mui/material';
import { Box, SxProps } from '@mui/system';

import { useGetGithubUser } from '../../lib/queries/github';
import { useRouter } from 'next/router';
import { FC } from 'react';
import GithubUserLanguages from './GithubUserLanguages';
import GithubUserProfile from './GithubUserProfile';

const containerProps: SxProps = { textAlign: 'center', pt: 5 };

type GithubUserProps = {
    username?: string;
};

const GithubUser: FC<GithubUserProps> = ({ username }) => {
    const router = useRouter();

    const { username: queryUsername } = router.query;
    let resolvedUsername;
    if (username) {
        resolvedUsername = username;
    } else {
        resolvedUsername = !!queryUsername
            ? typeof queryUsername === 'string'
                ? queryUsername
                : queryUsername[0]
            : null;
    }

    const { data, isLoading } = useGetGithubUser(resolvedUsername);

    if (isLoading) {
        return (
            <Container sx={{ ...containerProps }}>
                <CircularProgress />
            </Container>
        );
    } else if (!resolvedUsername || !data) {
        return (
            <Container sx={{ ...containerProps }}>
                that user cannot be found
            </Container>
        );
    }

    return (
        <Container sx={{ pt: containerProps.pt, textAlign: 'left' }}>
            <Stack direction="row" spacing={2}>
                <Avatar
                    // @ts-ignore
                    src={data!.userData.avatar_url}
                    sx={{ height: 100, width: 100 }}
                />
                <Link
                    // @ts-ignore
                    href={data!.userData.html_url}
                    target="_blank"
                    rel="noopener"
                >
                    <Typography variant="h2">{resolvedUsername}</Typography>
                </Link>
            </Stack>
            <Box my={2}>
                <Typography variant="h4" sx={{ my: 2 }}>
                    languages
                </Typography>
                <GithubUserLanguages data={data.languageCounts} />
            </Box>
            <Box my={2}>
                <Typography variant="h4" sx={{ my: 2 }}>
                    profile
                </Typography>
                <GithubUserProfile data={data.userData} />
            </Box>
        </Container>
    );
};

export default GithubUser;
