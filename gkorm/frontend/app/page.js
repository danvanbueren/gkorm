'use client';

import {Box, Button, Container, Grid} from "@mui/material";
import NavHeader from "@/components/NavHeader";
import MissionPlanningRiskAssessment from "@/components/MissionPlanningRiskAssessment";

export default function Home() {
    return (<div>
            <main>
                <Container maxWidth="xl">
                    <Box
                        sx={{
                            height: '100dvh', overflow: 'hidden',
                        }}
                    >
                        <NavHeader/>

                        <MissionPlanningRiskAssessment/>
                    </Box>
                </Container>
            </main>
        </div>);
}
