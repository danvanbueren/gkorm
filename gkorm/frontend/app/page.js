'use client';

import {Box, Button, Container, Grid} from "@mui/material";
import NavHeader from "@/components/NavHeader";

export default function Home() {
    return (
        <div>
            <main>
                <Container maxWidth="xl">
                    <Box
                        sx={{
                            height: '100dvh',
                            overflow: 'hidden',
                        }}
                    >
                        <NavHeader/>

                        <Grid container spacing={2}>
                            <Grid size={8}>

                            </Grid>
                            <Grid size={4}>

                            </Grid>
                        </Grid>

                        <Button variant="contained">Hello world</Button>
                    </Box>
                </Container>
            </main>
        </div>
    );
}
