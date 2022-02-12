import {
    AppBar,
    Box,
    Breadcrumbs,
    Button,
    Container,
    Link,
    Toolbar,
    Typography,
} from '@mui/material';
import { FC, Fragment, useEffect, useState } from 'react';
import { RouteMapRoute, routeMap } from '../../config/routes';
import { signIn, signOut, useSession } from 'next-auth/react';

import CenteredCircularProgress from '../shared/CenteredCircularProgress';
import Image from 'next/image';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

const appHeaderId = 'app-header';

const Layout: FC = ({ children }) => {
    const { pathname } = useRouter();
    const { data: session, status } = useSession();
    const [currentRoute, setCurrentRoute] = useState<RouteMapRoute>(
        routeMap.default,
    );
    const sessionIsLoading = status === 'loading';

    const [appbarHeight, setAppbarHeight] = useState(0);

    useEffect(() => {
        const route = routeMap[pathname] ?? routeMap.default;
        setCurrentRoute(route);
    }, [pathname]);

    const appbarElement =
        typeof window !== 'undefined'
            ? document.getElementById(appHeaderId)
            : null;

    useEffect(() => {
        setAppbarHeight(appbarElement?.clientHeight ?? 0);
    }, [appbarElement]);

    const renderChildren = () => {
        if (sessionIsLoading) {
            return (
                <CenteredCircularProgress
                    minHeight={`calc(100vh - ${appbarHeight}px)`}
                />
            );
        }
        return children;
    };

    if (pathname === '/') return <Fragment>{children}</Fragment>;

    return (
        <Fragment>
            <AppBar
                id={appHeaderId}
                position="static"
                sx={{
                    backgroundColor: 'background.default',
                    backgroundImage: 'background.default',
                }}
            >
                <Container>
                    <Toolbar disableGutters>
                        <Image
                            src="/logo.png"
                            height={40}
                            width={106}
                            alt="experiencer logo"
                        />
                        {!sessionIsLoading && !session && (
                            <Button
                                onClick={() => signIn()}
                                color="inherit"
                                sx={{ ml: 'auto' }}
                                variant="outlined"
                                className="special-button special-button-outlined"
                            >
                                login
                            </Button>
                        )}
                        {!sessionIsLoading && session && (
                            <Button
                                onClick={() => signOut()}
                                color="inherit"
                                sx={{
                                    ml: 'auto',
                                }}
                                variant="outlined"
                                className="special-button special-button-outlined"
                            >
                                logout
                            </Button>
                        )}
                    </Toolbar>
                </Container>
            </AppBar>
            <Box sx={{ minHeight: `calc(100vh - ${appbarHeight}px)` }}>
                <Container sx={{ my: 1 }}>
                    {currentRoute.isDefault ? (
                        <Typography variant="h6" sx={{ flexGrow: 1 }}>
                            {currentRoute.title}
                        </Typography>
                    ) : (
                        <Breadcrumbs>
                            {(currentRoute.breadcrumbs ?? []).map(r => (
                                <NextLink
                                    key={r.pathname}
                                    href={r.pathname}
                                    passHref
                                >
                                    <Link
                                        underline="hover"
                                        color="text.secondary"
                                    >
                                        <Typography variant="subtitle1">
                                            {r.title}
                                        </Typography>
                                    </Link>
                                </NextLink>
                            ))}
                            <Typography
                                color="text.primary"
                                variant="subtitle1"
                            >
                                {currentRoute.title}
                            </Typography>
                        </Breadcrumbs>
                    )}
                </Container>
                {renderChildren()}
            </Box>
        </Fragment>
    );
};

export default Layout;
