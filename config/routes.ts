type RouteBreadcrumb = { title: string; pathname: string };

export type RouteMapRoute = {
    title: string;
    breadcrumbs?: RouteBreadcrumb[];
    isDefault?: boolean;
};

export type RouteMap = Record<string, RouteMapRoute>;

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
    ['/users/[userId]']: {
        title: 'users',
        breadcrumbs: [
            {
                title: 'home',
                pathname: '/',
            },
        ],
    },
    default: { title: 'home', isDefault: true },
};
