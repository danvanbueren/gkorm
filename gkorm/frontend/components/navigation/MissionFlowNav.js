'use client';

import {
    Box, Button, Card, Divider, Grid, TextField, Typography, useMediaQuery, useTheme
} from "@mui/material";
import {AssignmentInd, Checklist, Flight, Groups} from '@mui/icons-material';
import {useState} from "react";
import {useParams} from 'next/navigation';
import nextConfig from "@/next.config.mjs";
import {useSpaRouter} from "@/context/SpaRouter";

export default function MissionFlowNav({
                                           theme = useTheme(), missionNumber, acNameIdNumber, currentView,
                                       }) {

    const {navigate} = useSpaRouter();

    const isLgUp = useMediaQuery(theme.breakpoints.up('lg'));

    const [localMissionNumber, setLocalMissionNumber] = useState(missionNumber || '');
    const [localAcNameIdNumber, setLocalAcNameIdNumber] = useState(acNameIdNumber || '');

    const definedViews = ['crewlist', 'planning', 'pilot', 'execution', 'personal'];

    return (<Box sx={{padding: 0, margin: 0}}>
        <Typography
            variant={'h5'}
            textAlign={isLgUp ? 'start' : 'center'}
            padding={2}
            fontWeight='500'
            component="a"
            onClick={() => navigate('/mission/' + missionNumber)}
            sx={{
                display: 'flex', color: 'inherit', textDecoration: 'none', userSelect: 'none', cursor: 'pointer',
            }}
        >
            {missionNumber}
        </Typography>

        <Card sx={{
            minWidth: '100%',
            borderRadius: '1rem',
            overflow: 'hidden',
            userSelect: 'none',
            padding: '1rem',
            marginBottom: '1rem',
        }}>

            <Typography variant='h6' marginBottom={1}>Mission Info</Typography>

            <Divider/>

            <Grid container spacing={2} paddingTop={2}>
                <Grid size={{xs: 12, sm: 6, lg: 12}}>

                    <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
                        <Flight sx={{color: 'action.active', mr: 1.5, my: 0.5}}/>
                        <TextField
                            id="text-field-mission-number"
                            placeholder='AJ1234M'
                            label='Mission Number'
                            value={localMissionNumber}
                            onChange={(e) => setLocalMissionNumber(e.target.value)}
                            variant="standard"
                            fullWidth
                            disabled
                        />
                    </Box>

                </Grid>
                <Grid size={{xs: 12, sm: 6, lg: 12}}>

                    <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
                        <AssignmentInd sx={{color: 'action.active', mr: 1.5, my: 0.5}}/>
                        <TextField
                            id="text-field-aircraft-commander"
                            placeholder='OF-3 John Doe, 012345'
                            label='Aircraft Commander'
                            value={localAcNameIdNumber}
                            onChange={(e) => setLocalAcNameIdNumber(e.target.value)}
                            variant="standard"
                            fullWidth
                            disabled
                        />
                    </Box>

                </Grid>

                <Grid size={{xs: 12, sm: 6, lg: 12}}>

                    <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
                        <Checklist sx={{color: 'action.active', mr: 1.5, my: 0.5}}/>
                        <Button
                            variant={!currentView || !definedViews.includes(currentView) ? 'contained' : 'outlined'}
                            fullWidth
                            onClick={() => navigate('/mission/x')}
                        >
                            Process Flow
                        </Button>
                    </Box>

                </Grid>

                <Grid size={{xs: 12, sm: 6, lg: 12}}>

                    <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
                        <Groups sx={{color: 'action.active', mr: 1.5, my: 0.5}}/>
                        <Button
                            variant={currentView === 'crewlist' ? 'contained' : 'outlined'}
                            fullWidth
                            onClick={() => navigate('/mission/x/crewlist')}
                        >
                            Crew List
                        </Button>
                    </Box>

                </Grid>
            </Grid>

        </Card>

        <Card sx={{
            minWidth: '100%', borderRadius: '1rem', overflow: 'hidden', userSelect: 'none', padding: '1rem',
        }}>

            <Typography variant='h6' marginBottom={1}>Risk Assessment Worksheets</Typography>

            <Divider/>

            <Grid container>
                <Grid size={{xs: 12, sm: 6, lg: 12}}>
                    <Typography variant='subtitle1' fontWeight={700} marginY={2}>
                        Mission Planning
                    </Typography>

                    <Button variant={currentView === 'planning' ? 'contained' : 'outlined'}
                            sx={{marginRight: 2, marginBottom: 2}}
                            onClick={() => navigate('/mission/x/planning')}
                    >
                        Overall
                    </Button>

                    <Button variant={currentView === 'pilot' ? 'contained' : 'outlined'}
                            sx={{marginRight: 2, marginBottom: 2}}
                            onClick={() => navigate('/mission/x/pilot')}
                    >
                        Pilot Proficiency
                    </Button>
                </Grid>
                <Grid size={{xs: 12, sm: 6, lg: 12}}>
                    <Typography variant='subtitle1' fontWeight={700} marginY={2}>Execution</Typography>

                    <Button variant={currentView === 'execution' ? 'contained' : 'outlined'}
                            sx={{marginRight: 2, marginBottom: 2}}
                            onClick={() => navigate('/mission/x/execution')}
                    >Overall</Button>
                    <Button variant={currentView === 'personal' ? 'contained' : 'outlined'}
                            sx={{marginRight: 2, marginBottom: 2}}
                            onClick={() => navigate('/mission/x/personal')}
                    >Personal</Button>
                </Grid>
            </Grid>

        </Card>


    </Box>)
}