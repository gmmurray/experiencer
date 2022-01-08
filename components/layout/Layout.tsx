import {
    AppBar,
    Breadcrumbs,
    Button,
    Container,
    Link,
    Theme,
    Toolbar,
    Typography,
} from '@mui/material';
import { FC, Fragment, useEffect, useState } from 'react';
import { RouteMapRoute, routeMap } from '../../config/routes';
import { signIn, signOut, useSession } from 'next-auth/react';

import { Box } from '@mui/system';
import CenteredCircularProgress from '../shared/CenteredCircularProgress';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

const Layout: FC = ({ children }) => {
    const { pathname } = useRouter();
    const { data: session, status } = useSession();
    const [currentRoute, setCurrentRoute] = useState<RouteMapRoute>(
        routeMap.default,
    );
    const sessionIsLoading = status === 'loading';

    useEffect(() => {
        const route = routeMap[pathname] ?? routeMap.default;
        setCurrentRoute(route);
    }, [pathname]);

    const renderChildren = () => {
        if (sessionIsLoading) {
            return <CenteredCircularProgress minHeight="calc(100vh - 64px)" />;
        }
        return children;
    };

    return (
        <Fragment>
            <AppBar
                id="app-header"
                position="static"
                sx={{
                    backgroundColor: 'background.default',
                    backgroundImage: 'background.default',
                }}
            >
                <Container>
                    <Toolbar disableGutters>
                        <Typography variant="h4">experiencer</Typography>
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
            <Container>
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
                                <Link underline="hover" color="text.secondary">
                                    <Typography variant="subtitle1">
                                        {r.title}
                                    </Typography>
                                </Link>
                            </NextLink>
                        ))}
                        <Typography color="text.primary" variant="subtitle1">
                            {currentRoute.title}
                        </Typography>
                    </Breadcrumbs>
                )}
            </Container>
            {renderChildren()}
        </Fragment>
    );
};

export default Layout;
