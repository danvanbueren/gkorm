'use client';

import {Box, Button, Grid, Typography} from "@mui/material";
import NavHeader from "@/components/navigation/NavHeader";
import MissionPlanningRiskAssessment from "@/components/constructedWorksheets/MissionPlanningRiskAssessment";
import MissionFlowNav from "@/components/navigation/MissionFlowNav";
import DayOfMissionRiskAssessment from "@/components/constructedWorksheets/DayOfMissionRiskAssessment";
import PersonalRiskAssessment from "@/components/constructedWorksheets/PersonalRiskAssessment";
import PilotProficiencyRiskAssessment from "@/components/constructedWorksheets/PilotProficiencyRiskAssessment";
import ProcessFlow from "@/components/constructedWorksheets/ProcessFlow";
import CrewList from "@/components/constructedWorksheets/CrewList";
import {RequireAuth} from "@/components/utility/RequireAuth";
import {useEffect, useState} from "react";
import {useSpaRouter} from "@/context/SpaRouter";

export default function MissionPage({requestedView}) {

    const {navigate, currentPath} = useSpaRouter();
    const pathAsArray = currentPath.split("/");
    const missionIdFromUrl = pathAsArray[2]

    const [missionData, setMissionData] = useState()
    const [dataLoadError, setDataLoadError] = useState()

    // API
    const missionDataFromApi = async () => {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 10000)

        try {
            setDataLoadError('')
            const response = await fetch(`http://localhost:8000/missions/get/${missionIdFromUrl}`, {
                signal: controller.signal,
            })

            if (!response.ok)
                throw new Error('Failed to fetch data - ' + response.statusText)

            const data = await response.json()
            setMissionData(data.content)
        } catch (error) {
            setDataLoadError(error.message)
        } finally {
            clearTimeout(timeoutId)
        }
    }

    // TABLE - Initial API fetch
    useEffect(() => {
        missionDataFromApi()
    }, [])

    const currentView = () => {
        switch (requestedView) {
            case 'planning':
                return (<MissionPlanningRiskAssessment missionData={missionData}/>)
            case 'pilot':
                return (<PilotProficiencyRiskAssessment missionData={missionData}/>)
            case 'execution':
                return (<DayOfMissionRiskAssessment missionData={missionData}/>)
            case 'personal':
                return (<PersonalRiskAssessment missionData={missionData}/>)
            case 'crewlist':
                return (<CrewList missionData={missionData} />)
            default:
                return (<ProcessFlow/>)
        }
    }

    return (
        <RequireAuth>
            <Box height={'10dvh'}>
                <NavHeader/>
            </Box>
            <Grid container spacing={2} width={'100%'} height={'85dvh'}>
                {
                    (!missionData && dataLoadError) ?
                        <Grid size={{xs: 12}} sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%'}}>
                            <Typography
                                variant='h3'
                                sx={{ mb: 2 }}
                            >
                                Failed to load mission!
                            </Typography>

                            <Typography
                                variant='body2'
                                sx={{ mb: 3 }}
                            >
                                {dataLoadError}
                            </Typography>

                            <Button
                                variant="contained"
                                size='large'
                                sx={{ px: 3, py: 2, mb: '20dvh' }}
                                onClick={() => navigate('/')}
                            >
                                Return to homepage
                            </Button>
                        </Grid> :
                        <>
                            <Grid size={{xs: 12, lg: 3}}>
                                <Box
                                    sx={{
                                        maxHeight: '80dvh',
                                        overflow: 'auto',
                                        padding: '1rem',
                                    }}
                                >
                                    <MissionFlowNav
                                        missionData={missionData}
                                        currentView={requestedView}
                                    />
                                </Box>
                            </Grid>
                            <Grid size={{xs: 12, lg: 9}}>
                                <Box
                                    sx={{
                                        maxHeight: '80dvh', overflow: 'auto', padding: '1rem',
                                    }}
                                >
                                    {currentView()}
                                </Box>
                            </Grid>
                        </>
                }
            </Grid>
        </RequireAuth>
    );
}