/******************************************************************************
 * COPYRIGHT © 2025 DANIEL VAN BUEREN. ALL RIGHTS RESERVED.                   *
 *                                                                            *
 * THIS MATERIAL IS PROTECTED BY COPYRIGHT LAW. NO PART OF THIS WORK MAY BE   *
 * COPIED, REPRODUCED, DISTRIBUTED, TRANSMITTED, DISPLAYED, OR PERFORMED IN   *
 * ANY FORM OR BY ANY MEANS, ELECTRONIC, MECHANICAL, PHOTOCOPYING, RECORDING, *
 * OR OTHERWISE, WITHOUT PRIOR WRITTEN PERMISSION FROM THE COPYRIGHT OWNER.   *
 ******************************************************************************/

'use client'

import {Box, Typography, useMediaQuery, useTheme} from "@mui/material"

export default function Worksheet({
                                      theme = useTheme(), title = 'SET TITLE PROP IN \<WORKSHEET\>', children,
                                  }) {

    const isLgUp = useMediaQuery(theme.breakpoints.up('lg'))

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
                    position: 'relative',
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