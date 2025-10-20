'use client'

import {Box, Typography, useMediaQuery, useTheme} from "@mui/material"

export default function ClassificationBar({
                                              theme = useTheme(),
                                              classificationText = 'CLASSIFICATION MARKING',
                                              textColor = '#000',
                                              backgroundColor = '#fff',
                                              height = '2.5dvh',
                                          }) {

    const isLgUp = useMediaQuery(theme.breakpoints.up('lg'))

    return (
        <Box
            sx={{
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'center',
                background: backgroundColor,
                color: textColor,
                minHeight: height,
                maxHeight: height,
            }}
        >
            <Typography fontFamily={'monospace'}
                        fontSize={isLgUp ? '1.0rem' : '0.7rem'}>{classificationText}</Typography>
        </Box>
    )
}