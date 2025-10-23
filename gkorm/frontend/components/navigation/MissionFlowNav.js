/******************************************************************************
 * COPYRIGHT © 2025 DANIEL VAN BUEREN. ALL RIGHTS RESERVED.                   *
 *                                                                            *
 * THIS MATERIAL IS PROTECTED BY COPYRIGHT LAW. NO PART OF THIS WORK MAY BE   *
 * COPIED, REPRODUCED, DISTRIBUTED, TRANSMITTED, DISPLAYED, OR PERFORMED IN   *
 * ANY FORM OR BY ANY MEANS, ELECTRONIC, MECHANICAL, PHOTOCOPYING, RECORDING, *
 * OR OTHERWISE, WITHOUT PRIOR WRITTEN PERMISSION FROM THE COPYRIGHT OWNER.   *
 ******************************************************************************/

'use client'

import {Box, Button, Card, Divider, Grid, TextField, Typography, useMediaQuery, useTheme} from "@mui/material"
import {AssignmentInd, Checklist, Event, Flight, Groups, Settings} from '@mui/icons-material'
import {useSpaRouter} from "@/context/SpaRouter"

export default function MissionFlowNav({
                                           theme = useTheme(), missionData, currentView,
                                       }) {

    const {navigate} = useSpaRouter()
    const isLgUp = useMediaQuery(theme.breakpoints.up('lg'))
    const owner = missionData?.owner
    const ownerDisplayName = `${owner?.rank} ${owner?.given_name} ${owner?.family_name}, ${owner?.amis_id}`
    const missionNumber = `${missionData?.mission_number}`
    const definedViews = ['crewlist', 'planning', 'pilot', 'execution', 'personal', 'settings']

    return (<Box sx={{padding: 0, margin: 0, position: 'relative'}}>
        <Typography
            variant={'h5'}
            textAlign={isLgUp ? 'start' : 'center'}
            padding={2}
            fontWeight='500'
            component="a"
            onClick={() => navigate('/mission/' + missionData?.PKEY_id)}
            sx={{
                display: 'flex', color: 'inherit', textDecoration: 'none', userSelect: 'none', cursor: 'pointer',
            }}
        >
            {missionData?.mission_number || "Loading..."}
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
                            label='Mission Number'
                            value={missionNumber}
                            variant="standard"
                            fullWidth
                            disabled
                        />
                    </Box>
                </Grid>

                <Grid size={{xs: 12, sm: 6, lg: 12}}>
                    <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
                        <Event sx={{color: 'action.active', mr: 1.5, my: 0.5}}/>
                        <TextField
                            id="text-field-mission-execution-date"
                            label='Mission Execution Date'
                            value={missionData?.execution_date || ""}
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
                            id="text-field-mission-custodian"
                            label='Mission Custodian'
                            value={ownerDisplayName}
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
                            onClick={() => navigate(`/mission/${missionData?.PKEY_id}`)}
                            disabled={!missionData?.mission_number}
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
                            onClick={() => navigate(`/mission/${missionData?.PKEY_id}/crewlist`)}
                            disabled={!missionData?.mission_number}
                        >
                            Crew List
                        </Button>
                    </Box>
                </Grid>

                <Grid size={{xs: 12, sm: 6, lg: 12}}>
                    <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
                        <Settings sx={{color: 'action.active', mr: 1.5, my: 0.5}}/>
                        <Button
                            variant={currentView === 'settings' ? 'contained' : 'outlined'}
                            fullWidth
                            onClick={() => navigate(`/mission/${missionData?.PKEY_id}/settings`)}
                            disabled={!missionData?.mission_number}
                        >
                            Settings
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
                            onClick={() => navigate(`/mission/${missionData?.PKEY_id}/planning`)}
                            disabled={!missionData?.mission_number}
                    >
                        Overall
                    </Button>

                    <Button variant={currentView === 'pilot' ? 'contained' : 'outlined'}
                            sx={{marginRight: 2, marginBottom: 2}}
                            onClick={() => navigate(`/mission/${missionData?.PKEY_id}/pilot`)}
                            disabled={!missionData?.mission_number}
                    >
                        Pilot Proficiency
                    </Button>
                </Grid>
                <Grid size={{xs: 12, sm: 6, lg: 12}}>
                    <Typography variant='subtitle1' fontWeight={700} marginY={2}>Execution</Typography>

                    <Button variant={currentView === 'execution' ? 'contained' : 'outlined'}
                            sx={{marginRight: 2, marginBottom: 2}}
                            onClick={() => navigate(`/mission/${missionData?.PKEY_id}/execution`)}
                            disabled={!missionData?.mission_number}
                    >Overall</Button>
                    <Button variant={currentView === 'personal' ? 'contained' : 'outlined'}
                            sx={{marginRight: 2, marginBottom: 2}}
                            onClick={() => navigate(`/mission/${missionData?.PKEY_id}/personal`)}
                            disabled={!missionData?.mission_number}
                    >Personal</Button>
                </Grid>
            </Grid>
        </Card>
    </Box>)
}