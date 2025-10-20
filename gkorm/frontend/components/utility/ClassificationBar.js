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