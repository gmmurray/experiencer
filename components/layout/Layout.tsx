import {
    AppBar,
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
import NextLink from 'next/link';
import { useRouter } from 'next/router';

const Layout: FC = ({ children }) => {
    const { pathname } = useRouter();
    const { data: session, status } = useSession();
    const [currentRoute, setCurrentRoute] = useState<RouteMapRoute>(
        routeMap.default,
    );

    useEffect(() => {
        const route = routeMap[pathname] ?? routeMap.default;
        setCurrentRoute(route);
    }, [pathname]);

    const renderChildren = () => {
        if (status === 'loading') {
            return <CenteredCircularProgress minHeight="calc(100vh - 64px)" />;
        }
        return children;
    };

    return (
        <Fragment>
            <AppBar position="static">
                <Container>
                    <Toolbar disableGutters>
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
                                        <Link color="inherit" underline="hover">
                                            {r.title}
                                        </Link>
                                    </NextLink>
                                    // <Link
                                    //     key={r.pathname}
                                    //     component={NextLink}
                                    //     href={r.pathname}
                                    //     color="inherit"
                                    //     underline="hover"
                                    // >
                                    //     {r.title}
                                    // </Link>
                                ))}
                                <Typography color="text.primary">
                                    {currentRoute.title}
                                </Typography>
                            </Breadcrumbs>
                        )}
                        {!session && (
                            <Button
                                onClick={() => signIn()}
                                color="inherit"
                                sx={{ ml: 'auto' }}
                            >
                                login
                            </Button>
                        )}
                        {session && (
                            <Button
                                onClick={() => signOut()}
                                color="inherit"
                                sx={{ ml: 'auto' }}
                            >
                                logout
                            </Button>
                        )}
                    </Toolbar>
                </Container>
            </AppBar>
            {renderChildren()}
        </Fragment>
    );
};

export default Layout;
