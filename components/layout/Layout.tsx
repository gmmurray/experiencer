import {
    AppBar,
    Breadcrumbs,
    Container,
    Link,
    Toolbar,
    Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { FC, Fragment, useEffect, useState } from 'react';
import { RouteMapRoute, routeMap } from '../../config/routes';

const Layout: FC = ({ children }) => {
    const { pathname } = useRouter();
    const [currentRoute, setCurrentRoute] = useState<RouteMapRoute>(
        routeMap.default,
    );
    useEffect(() => {
        const route = routeMap[pathname] ?? routeMap.default;
        setCurrentRoute(route);
    }, [pathname]);
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
                                    <Link
                                        key={r.pathname}
                                        component={NextLink}
                                        href={r.pathname}
                                        passHref
                                        color="inherit"
                                        underline="hover"
                                    >
                                        {r.title}
                                    </Link>
                                ))}
                                <Typography color="text.primary">
                                    {currentRoute.title}
                                </Typography>
                            </Breadcrumbs>
                        )}
                    </Toolbar>
                </Container>
            </AppBar>
            {children}
        </Fragment>
    );
};

export default Layout;
