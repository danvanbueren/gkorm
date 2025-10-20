/******************************************************************************
 * COPYRIGHT © 2025 DANIEL VAN BUEREN. ALL RIGHTS RESERVED.                   *
 *                                                                            *
 * THIS MATERIAL IS PROTECTED BY COPYRIGHT LAW. NO PART OF THIS WORK MAY BE   *
 * COPIED, REPRODUCED, DISTRIBUTED, TRANSMITTED, DISPLAYED, OR PERFORMED IN   *
 * ANY FORM OR BY ANY MEANS, ELECTRONIC, MECHANICAL, PHOTOCOPYING, RECORDING, *
 * OR OTHERWISE, WITHOUT PRIOR WRITTEN PERMISSION FROM THE COPYRIGHT OWNER.   *
 ******************************************************************************/

'use client'

import {createContext, useContext, useMemo, useState} from 'react'
import {createTheme, ThemeProvider} from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

const ThemeContext = createContext()

export const useColorMode = () => useContext(ThemeContext)

export default function ThemeContextProvider({children}) {

    // Set initial mode based on localStorage safely
    const getInitialMode = () => {
        if (typeof window !== 'undefined') {

            // Check localStorage for saved mode
            const savedMode = localStorage.getItem('themeMode')
            if (savedMode === 'light' || savedMode === 'dark') {
                return savedMode
            }

            // Follow system preference if localStorage not set
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
            return prefersDark ? 'dark' : 'light'
        }

        // Fallback during server-side render
        return 'dark'
    }

    // Mode state with initial mode
    const [mode, setMode] = useState(getInitialMode)

    // Toggle color mode / transition speed in seconds
    const colorMode = useMemo(() => ({
        toggleColorMode: () => {
            setMode((prev) => {
                const newMode = prev === 'light' ? 'dark' : 'light'
                localStorage.setItem('themeMode', newMode)
                return newMode
            })
        },
    }), [])

    // Create theme
    const theme = useMemo(() => createTheme({
        palette: {
            mode,
            background: {
                default: mode === 'dark' ? '#121212' : '#eaeaea', // Light mode is now soft grey, not pure white
                paper: mode === 'dark' ? '#1d1d1d' : '#ffffff',   // Paper stays white in light mode
            },
            custom: {
                borderColor: mode === 'dark' ? '#1c1c1c' : '#333',
                headingBackground: mode === 'dark' ? '#424242' : '#bdbdbd',
                signatureBackground: mode === 'dark' ? '#2c2c2c' : '#dfdfdf',
                salmonBackground: mode === 'dark' ? '#97665d' : '#d8998c',
                defaultTextColor: mode === 'dark' ? '#fff' : '#000',
                infoBackground: mode === 'dark' ? '#252525' : '#dfdfdf',
                clickableBackground: mode === 'dark' ? '#c9d8ff' : '#c9d8ff',
                clickableBackgroundActive: mode === 'dark' ? '#789fff' : '#789fff',
                worksheetBackgroundColor: mode === 'dark' ? '#202020' : '#ededed',

                grey: {
                    50: mode === 'dark' ? '#1a1a1a' : '#fafafa',
                    100: mode === 'dark' ? '#2c2c2c' : '#f5f5f5',
                    200: mode === 'dark' ? '#3d3d3d' : '#eeeeee',
                    300: mode === 'dark' ? '#4e4e4e' : '#e0e0e0',
                    400: mode === 'dark' ? '#616161' : '#bdbdbd',
                    500: mode === 'dark' ? '#757575' : '#9e9e9e',
                    600: mode === 'dark' ? '#9e9e9e' : '#757575',
                    700: mode === 'dark' ? '#bdbdbd' : '#616161',
                    800: mode === 'dark' ? '#e0e0e0' : '#424242',
                    900: mode === 'dark' ? '#f5f5f5' : '#212121',
                }
            },
        }, typography: {
            fontFamily: 'Roboto, sans-serif',
        },
    }), [mode])

    // Return context / provider / css baseline
    return (
        <ThemeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    )
}