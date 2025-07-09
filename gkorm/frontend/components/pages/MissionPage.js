'use client';

import {Box, Grid} from "@mui/material";
import NavHeader from "@/components/navigation/NavHeader";
import MissionPlanningRiskAssessment from "@/components/constructedWorksheets/MissionPlanningRiskAssessment";
import MissionFlowNav from "@/components/navigation/MissionFlowNav";
import DayOfMissionRiskAssessment from "@/components/constructedWorksheets/DayOfMissionRiskAssessment";
import PersonalRiskAssessment from "@/components/constructedWorksheets/PersonalRiskAssessment";
import PilotProficiencyRiskAssessment from "@/components/constructedWorksheets/PilotProficiencyRiskAssessment";
import ProcessFlow from "@/components/constructedWorksheets/ProcessFlow";
import CrewList from "@/components/constructedWorksheets/CrewList";
import {RequireAuth} from "@/components/utility/RequireAuth";

export default function MissionPage({requestedView}) {

    const missionNumber = 'AJ1234M';
    const missionDate = '12-Nov-25';
    const acNameIdNumber = 'OF-3 John Doe, 012345'

    const currentView = () => {
        switch (requestedView) {
            case 'planning':
                return (<MissionPlanningRiskAssessment
                    missionNumber={missionNumber}
                    missionDate={missionDate}
                    acNameIdNumber={acNameIdNumber}
                />)
            case 'pilot':
                return (<PilotProficiencyRiskAssessment/>)
            case 'execution':
                return (<DayOfMissionRiskAssessment/>)
            case 'personal':
                return (<PersonalRiskAssessment/>)
            case 'crewlist':
                return (<CrewList/>)
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
                <Grid size={{xs: 12, lg: 3}}>
                    <Box
                        sx={{
                            maxHeight: '80dvh',
                            overflow: 'auto',
                            padding: '1rem',
                        }}
                    >
                        <MissionFlowNav
                            missionNumber={missionNumber}
                            acNameIdNumber={acNameIdNumber}
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
            </Grid>
        </RequireAuth>
    );
}