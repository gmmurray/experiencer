import { createTheme, responsiveFontSizes } from '@mui/material/styles';

declare module '@mui/material/styles' {
    interface Theme {}
    // allow configuration using `createTheme`
    interface ThemeOptions {}
}

export const theme = responsiveFontSizes(
    createTheme({
        palette: {
            mode: 'dark',
            primary: {
                main: '#4014f5',
            },
            secondary: {
                main: '#ff0077',
            },
            background: {
                default: '#121212',
                paper: '#121212',
            },
        },
    }),
);
