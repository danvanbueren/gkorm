/******************************************************************************
 * COPYRIGHT © 2025 DANIEL VAN BUEREN. ALL RIGHTS RESERVED.                   *
 *                                                                            *
 * THIS MATERIAL IS PROTECTED BY COPYRIGHT LAW. NO PART OF THIS WORK MAY BE   *
 * COPIED, REPRODUCED, DISTRIBUTED, TRANSMITTED, DISPLAYED, OR PERFORMED IN   *
 * ANY FORM OR BY ANY MEANS, ELECTRONIC, MECHANICAL, PHOTOCOPYING, RECORDING, *
 * OR OTHERWISE, WITHOUT PRIOR WRITTEN PERMISSION FROM THE COPYRIGHT OWNER.   *
 ******************************************************************************/

import {Box, useTheme} from '@mui/material'

export default function WorksheetCellBase({
                                              theme = useTheme(),
                                              color = (theme.palette.getContrastText(theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[200])),
                                              backgroundColor = (theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[100]),
                                              borderRight = 'none',
                                              borderBottom = 'none',
                                              borderColor = (theme.palette.mode === 'dark' ? '#111' : '#333'),
                                              justifyContent = '',
                                              children,
                                          }) {

    return (<Box
        display="flex"
        alignItems="center"
        justifyContent={justifyContent}
        height="100%"
        width="100%"
        sx={{
            backgroundColor: backgroundColor,
            color: color,
            borderRight: borderRight !== 'none' ? `${borderRight} ${borderColor}` : 'none',
            borderBottom: borderBottom !== 'none' ? `${borderBottom} ${borderColor}` : 'none',
        }}
    >
        {children}
    </Box>)
}
