'use client';

import {Box, Button, Grid, Typography} from "@mui/material";
import NavHeader from "@/components/navigation/NavHeader";
import ClassificationContainer from "@/components/utility/ClassificationContainer";

export default function AppPage() {

    return (
        <div>
            <main>
                <ClassificationContainer>
                    <Box height={'10dvh'}>
                        <NavHeader/>
                    </Box>
                    <Grid container spacing={2} width={'100%'} height={'85dvh'}>
                        <Grid size={{xs: 12, lg: 9}}>
                            <Box
                                sx={{
                                    maxHeight: '80dvh', overflow: 'auto', padding: '1rem',
                                    display: 'block',
                                }}
                            >
                                <Typography variant='h1'>Dashboard</Typography>
                                <Button variant='h3'>Awaiting your approval</Button>
                                <Button variant='h3'>Managed by you</Button>
                                <Button variant='h3'>Relevant to you</Button>
                                <Button variant='h3'>Older</Button>
                            </Box>
                        </Grid>
                    </Grid>
                </ClassificationContainer>
            </main>
        </div>
    );
}
