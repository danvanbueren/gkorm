/******************************************************************************
 * COPYRIGHT © 2025 DANIEL VAN BUEREN. ALL RIGHTS RESERVED.                   *
 *                                                                            *
 * THIS MATERIAL IS PROTECTED BY COPYRIGHT LAW. NO PART OF THIS WORK MAY BE   *
 * COPIED, REPRODUCED, DISTRIBUTED, TRANSMITTED, DISPLAYED, OR PERFORMED IN   *
 * ANY FORM OR BY ANY MEANS, ELECTRONIC, MECHANICAL, PHOTOCOPYING, RECORDING, *
 * OR OTHERWISE, WITHOUT PRIOR WRITTEN PERMISSION FROM THE COPYRIGHT OWNER.   *
 ******************************************************************************/

'use client'

import {Box, Button, Typography} from '@mui/material'
import Link from 'next/link'

export default function NotFound() {
    return (
        <Box
            sx={{
                height: '95dvh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                px: 2,
            }}
        >
            <Typography variant="h2" gutterBottom>
                404 - Page Not Found
            </Typography>

            <Typography variant="body1" sx={{mb: 4}}>
                The page you're looking for doesn’t exist or has been moved.
            </Typography>

            <Button component={Link} href="/" variant="contained">
                Go Back
            </Button>
        </Box>
    )
}