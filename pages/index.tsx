import {
    Box,
    Button,
    Container,
    Grid,
    Link,
    Paper,
    Stack,
    Typography,
} from '@mui/material';
import { signIn, signOut } from 'next-auth/react';

import { Fragment, useCallback } from 'react';
import NextLink from 'next/link';
import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { Masonry } from '@mui/lab';
import Image from 'next/image';
import CenteredCircularProgress from '../components/shared/CenteredCircularProgress';

const Home: NextPage = () => {
    const { data: session, status: sessionStatus } = useSession();
    const sessionIsLoading = sessionStatus === 'loading';
    const isAuthenticated = sessionStatus === 'authenticated' && !!session;

    const handleLoginClick = useCallback(() => signIn('github'), []);
    const handleLogoutClick = useCallback(() => signOut(), []);

    const renderSecondPaneContents = useCallback(() => {
        if (sessionIsLoading) {
            return <CenteredCircularProgress minHeight="100%" />;
        }
        return (
            <Fragment>
                {!isAuthenticated && (
                    <Box>
                        <Typography variant="h4">get started now</Typography>
                        <Button
                            onClick={handleLoginClick}
                            size="large"
                            color="inherit"
                            variant="outlined"
                            className="special-button special-button-outlined"
                            sx={{ my: 1 }}
                        >
                            login with github
                        </Button>
                    </Box>
                )}
                <Stack>
                    <Typography variant="h4">
                        {isAuthenticated ? 'get started' : 'actions'}
                    </Typography>
                    <NextLink href="/github" passHref>
                        <Button
                            size="large"
                            color="inherit"
                            variant="outlined"
                            className="special-button special-button-outlined"
                            sx={{ my: 1 }}
                        >
                            search github profiles
                        </Button>
                    </NextLink>
                    {isAuthenticated && (
                        <Fragment>
                            <NextLink
                                // @ts-ignore
                                href={`/github/${session.user.login}`}
                                passHref
                            >
                                <Button
                                    size="large"
                                    color="inherit"
                                    variant="outlined"
                                    className="special-button special-button-outlined"
                                    sx={{ my: 1 }}
                                >
                                    my github profile
                                </Button>
                            </NextLink>
                            <NextLink
                                // @ts-ignore
                                href={`/users/${session.user._id}`}
                                passHref
                            >
                                <Button
                                    size="large"
                                    color="inherit"
                                    variant="outlined"
                                    className="special-button special-button-outlined"
                                    sx={{ my: 1 }}
                                >
                                    my experiencer profile
                                </Button>
                            </NextLink>
                            <Button
                                size="large"
                                color="inherit"
                                variant="outlined"
                                className="special-button special-button-outlined"
                                sx={{ my: 1 }}
                                onClick={handleLogoutClick}
                            >
                                sign out
                            </Button>
                        </Fragment>
                    )}
                </Stack>
            </Fragment>
        );
    }, [
        handleLoginClick,
        isAuthenticated,
        session,
        sessionIsLoading,
        handleLogoutClick,
    ]);

    return (
        <Masonry
            columns={{ xs: 1, sm: 2 }}
            spacing={0}
            sx={{ minHeight: '100vh' }}
            component={Paper}
        >
            <Grid
                component={Paper}
                square
                container
                direction="column"
                alignItems="center"
                justifyContent="center"
                className="landing-page-pane landing-page-pane--first"
                sx={{ height: { xs: '50vh', sm: '100vh ' } }}
            >
                <Image
                    src="/logo.png"
                    height="201"
                    width="534"
                    alt="experiencer logo"
                />
            </Grid>
            <Grid
                container
                direction="column"
                alignItems="center"
                justifyContent="center"
                className="landing-page-pane landing-page-pane--second"
                sx={{ height: { xs: '50vh', sm: '100vh ' } }}
            >
                <Paper className="content" square>
                    <Stack
                        textAlign="center"
                        spacing={3}
                        padding={3}
                        component={Paper}
                        minHeight="50%"
                        minWidth="50%"
                        maxWidth="75%"
                        className="theme-paper"
                        justifyContent="center"
                    >
                        {renderSecondPaneContents()}
                    </Stack>
                </Paper>
            </Grid>
        </Masonry>
    );
};

export default Home;
