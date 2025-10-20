/******************************************************************************
 * COPYRIGHT © 2025 DANIEL VAN BUEREN. ALL RIGHTS RESERVED.                   *
 *                                                                            *
 * THIS MATERIAL IS PROTECTED BY COPYRIGHT LAW. NO PART OF THIS WORK MAY BE   *
 * COPIED, REPRODUCED, DISTRIBUTED, TRANSMITTED, DISPLAYED, OR PERFORMED IN   *
 * ANY FORM OR BY ANY MEANS, ELECTRONIC, MECHANICAL, PHOTOCOPYING, RECORDING, *
 * OR OTHERWISE, WITHOUT PRIOR WRITTEN PERMISSION FROM THE COPYRIGHT OWNER.   *
 ******************************************************************************/

'use client'

import {Box, Button, Grid, Typography} from "@mui/material"
import NavHeader from "@/components/navigation/NavHeader"
import {RequireAuth} from "@/components/utility/RequireAuth"
import BaselineStatus from "@/api/BaselineStatus"

export default function LandingPage() {

    return (
        <RequireAuth>
            <Box height={'10dvh'}>
                <NavHeader/>
            </Box>
            <Grid container spacing={2} width={'100%'} height={'85dvh'}>
                <Grid size={{xs: 12, lg: 9}}>
                    <Box
                        sx={{
                            maxHeight: '80dvh',
                            overflow: 'auto',
                            padding: '1rem',
                            display: 'block',
                        }}
                    >
                        <Typography variant='h2'>Dashboard</Typography>

                        <Button variant='h3' disabled>Awaiting your approval</Button>
                        <Button variant='h3' disabled>Managed by you</Button>
                        <Button variant='h3' disabled>Relevant to you</Button>
                        <Button variant='h3' disabled>Older</Button>

                        <BaselineStatus/>
                    </Box>
                </Grid>
            </Grid>
        </RequireAuth>
    )
}
