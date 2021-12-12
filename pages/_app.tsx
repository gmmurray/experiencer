import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from '../config/muiTheme';
import { QueryClientProvider } from 'react-query';
import { queryClient } from '../config/queryClient';
import Layout from '../components/layout/Layout';
import { SessionProvider } from 'next-auth/react';
import { SnackbarWrapper } from '../config/notistack';

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
