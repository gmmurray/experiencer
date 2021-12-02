type RouteBreadcrumb = { title: string; pathname: string };

export type RouteMapRoute = {
    title: string;
    breadcrumbs?: RouteBreadcrumb[];
    isDefault?: boolean;
};

export type RouteMap = {
    [key: string]: RouteMapRoute;
};

export const routeMap: RouteMap = {
    ['/']: {
        title: 'home',
    },
    ['/github']: {
        title: 'github',
        breadcrumbs: [
            {
                title: 'home',
                pathname: '/',
            },
        ],
    },
    ['/github/[username]']: {
        title: 'user',
        breadcrumbs: [
            {
                title: 'home',
                pathname: '/',
            },
            {
                title: 'github',
                pathname: '/github',
            },
        ],
    },
    default: { title: 'experiencer', isDefault: true },
};

// export const getRouteTitle = (pathname: string) =>
//     routeMap[
//         Object.keys(routeMap).filter(key =>
//             pathname.toLocaleLowerCase().includes(key.toLocaleLowerCase()),
//         )[0] ?? 'default'
//     ];
