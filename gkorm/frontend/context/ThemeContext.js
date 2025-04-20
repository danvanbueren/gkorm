'use client';

import {createContext, useContext, useMemo, useState} from 'react';
import {ThemeProvider, createTheme} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const ThemeContext = createContext();

export const useColorMode = () => useContext(ThemeContext);

export default function ThemeContextProvider({children}) {
    const [mode, setMode] = useState('dark');

    const colorMode = useMemo(() => ({
        toggleColorMode: () => {
            setMode(prev => (prev === 'light' ? 'dark' : 'light'));
        },
    }), []);

    const theme = useMemo(() => createTheme({
        palette: {
            mode, custom: {
                borderColor: mode === 'dark' ? '#1c1c1c' : '#333',
                headingBackground: mode === 'dark' ? '#424242' : '#bdbdbd',
                signatureBackground: mode === 'dark' ? '#2c2c2c' : '#dfdfdf',
                salmonBackground: mode === 'dark' ? '#ca958a' : '#d8998c',
                defaultTextColor: mode === 'dark' ? '#fff' : '#000',
                infoBackground: mode === 'dark' ? '#252525' : '#dfdfdf',
                clickableBackground: mode === 'dark' ? '#c9d8ff' : '#c9d8ff',
                clickableBackgroundActive: mode === 'dark' ? '#789fff' : '#789fff',
            },
        }, typography: {
            fontFamily: 'Roboto, sans-serif',
        },
    }), [mode]);

    return (<ThemeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            {children}
        </ThemeProvider>
    </ThemeContext.Provider>);
}