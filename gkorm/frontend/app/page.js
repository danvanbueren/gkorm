'use client';

import {Box, Button, Container, Grid, Typography} from "@mui/material";
import NavHeader from "@/components/navigation/NavHeader";
import {useEffect, useRef, useState} from "react";
import MissionFlowNav from "@/components/navigation/MissionFlowNav";

export default function AppPage() {

    const headerRef = useRef(null);
    const [headerHeight, setHeaderHeight] = useState(0);

    useEffect(() => {
        if (typeof window !== 'undefined' && headerRef.current) {
            const observer = new ResizeObserver((entries) => {
                for (let entry of entries) {
                    setHeaderHeight(entry.contentRect.height);
                }
            });
            observer.observe(headerRef.current);
            return () => observer.disconnect();
        }
    }, []);

    return (
        <div>
            <main>
                <Container maxWidth="xl" sx={{minWidth: '30rem'}}>
                    <Box
                    >
                        <Box height={'10dvh'}>
                            <NavHeader/>
                        </Box>

                        <Grid container spacing={2} width={'100%'} height={'90dvh'}>

                            <Grid size={{xs: 12, lg: 9}}>

                                <Box
                                    sx={{
                                        maxHeight: '85dvh', overflow: 'auto', padding: '1rem',
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

                    </Box>
                </Container>
            </main>
        </div>
    );
}
