'use client';

import {Box, Typography, useMediaQuery, useTheme} from "@mui/material";

export default function Worksheet({
                                      theme = useTheme(), title = 'SET TITLE PROP IN \<WORKSHEET\>', children,
                                  }) {

    const isLgUp = useMediaQuery(theme.breakpoints.up('lg'));

    return (
        <Box sx={{padding: 0, margin: 0}}>
            <Typography
                variant={'h5'}
                textAlign={isLgUp ? 'start' : 'center'}
                padding={2}
                fontWeight='500'
                sx={{userSelect: 'none'}}
            >
                {title}
            </Typography>

            <Box
                sx={{
                    borderRadius: '1rem',
                    overflow: 'hidden',
                    border: `4px solid ${theme.palette.custom.borderColor}`,
                    userSelect: 'none',
                    background: `${theme.palette.custom.worksheetBackgroundColor}`,
                }}>

                {children}

            </Box>


        </Box>)
}