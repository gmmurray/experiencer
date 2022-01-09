import {
    Avatar,
    Button,
    CircularProgress,
    Container,
    Link,
    Stack,
    Typography,
} from '@mui/material';
import { Box, SxProps } from '@mui/system';

import { FC } from 'react';
import GithubUserLanguages from './GithubUserLanguages';
import GithubUserProfile from './GithubUserProfile';
import NextLink from 'next/link';
import { useGetGithubUser } from '../../lib/queries/github';
import { useGetUserByGithubProfile } from '../../lib/queries/users';
import { useRouter } from 'next/router';

const containerProps: SxProps = { textAlign: 'center', pt: 0 };

type GithubUserProps = {
    username?: string;
};

const GithubUser: FC<GithubUserProps> = ({ username }) => {
    const router = useRouter();
    const isUsersRoute = router.pathname.toLocaleLowerCase().includes('users');
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
    const { data: experiencerUser, isLoading: experiencerUserIsLoading } =
        useGetUserByGithubProfile(isUsersRoute ? null : data);

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
                <Box>
                    <Link
                        // @ts-ignore
                        href={data!.userData.html_url}
                        target="_blank"
                        rel="noopener"
                    >
                        <Typography variant="h2">{resolvedUsername}</Typography>
                    </Link>
                    {!experiencerUserIsLoading &&
                        experiencerUser &&
                        experiencerUser.userPageSettings && (
                            <NextLink
                                href={`/users/${experiencerUser.userPageSettings.userId}`}
                                passHref
                            >
                                <Button
                                    variant="outlined"
                                    color="inherit"
                                    className="special-button special-button-outlined"
                                    sx={{ mt: 1 }}
                                >
                                    experiencer profile
                                </Button>
                            </NextLink>
                        )}
                </Box>
            </Stack>
            <Box my={2}>
                <Typography
                    variant="h4"
                    sx={{ my: 2 }}
                    className="special-text"
                >
                    languages
                </Typography>
                <GithubUserLanguages data={data.languageCounts} />
            </Box>
            <Box my={2}>
                <Typography
                    variant="h4"
                    sx={{ my: 2 }}
                    className="special-text"
                >
                    profile
                </Typography>
                <GithubUserProfile data={data.userData} />
            </Box>
        </Container>
    );
};

export default GithubUser;
