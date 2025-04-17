'use client';

import { createContext, useContext, useMemo, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const ThemeContext = createContext();

export const useColorMode = () => useContext(ThemeContext);

export default function ThemeContextProvider({ children }) {
    const [mode, setMode] = useState('dark');

    const colorMode = useMemo(() => ({
        toggleColorMode: () => {
            setMode(prev => (prev === 'light' ? 'dark' : 'light'));
        },
    }), []);

    const theme = useMemo(() =>
        createTheme({
            palette: {
                mode,
            },
            typography: {
                fontFamily: 'Roboto, sans-serif',
            },
        }), [mode]);

    return (
        <ThemeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
}