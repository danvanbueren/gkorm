'use client';

import {Box, Button, Grid, Typography} from "@mui/material";
import {RequireAuth} from "@/components/utility/RequireAuth";
import NavHeader from "@/components/navigation/NavHeader";

export default function Profile() {

    return (
        <RequireAuth>
            <Box height={'10dvh'}>
                <NavHeader/>
            </Box>
            <Grid container spacing={2} width={'100%'} height={'85dvh'}>
                <Grid size={{xs: 12, lg: 9}}>
                    <Box
                        sx={{
                            maxHeight: '80dvh', overflow: 'auto', padding: '1rem', display: 'block',
                        }}
                    >
                        <Typography variant='h1'>Profile</Typography>
                    </Box>
                </Grid>
            </Grid>
        </RequireAuth>
    );
}
