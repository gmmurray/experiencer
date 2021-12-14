import '../styles/globals.css';

import { CssBaseline, ThemeProvider } from '@mui/material';

import type { AppProps } from 'next/app';
import Head from 'next/head';
import Layout from '../components/layout/Layout';
import { QueryClientProvider } from 'react-query';
import React from 'react';
import { SessionProvider } from 'next-auth/react';
import { SnackbarWrapper } from '../config/notistack';
import { queryClient } from '../config/queryClient';
import { theme } from '../config/muiTheme';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
    return (
        <>
            <Head>
                <title>experiencer</title>
                <meta
                    name="viewport"
                    content="initial-scale=1, width=device-width"
                />
            </Head>
            <SessionProvider session={session}>
                <ThemeProvider theme={theme}>
                    <SnackbarWrapper>
                        <QueryClientProvider client={queryClient}>
                            <CssBaseline />
                            <Layout>
                                <Component {...pageProps} />
                            </Layout>
                        </QueryClientProvider>
                    </SnackbarWrapper>
                </ThemeProvider>
            </SessionProvider>
        </>
    );
}

export default MyApp;
