import {Box, Container, Grid, Typography} from "@mui/material";
import NavHeader from "@/components/navigation/NavHeader";
import MissionPlanningRiskAssessment from "@/components/constructedWorksheets/MissionPlanningRiskAssessment";
import MissionFlowNav from "@/components/navigation/MissionFlowNav";
import DayOfMissionRiskAssessment from "@/components/constructedWorksheets/DayOfMissionRiskAssessment";
import PersonalRiskAssessment from "@/components/constructedWorksheets/PersonalRiskAssessment";
import PilotProficiencyRiskAssessment from "@/components/constructedWorksheets/PilotProficiencyRiskAssessment";
import ProcessFlow from "@/components/constructedWorksheets/ProcessFlow";
import ClassificationBar from "@/components/utility/ClassificationBar";
import ClassificationContainer from "@/components/utility/ClassificationContainer";

export default async function AppMissionSlugPage({params}) {

    const missionNumber = 'AJ1234M';
    const missionDate = '12-Nov-25';
    const acNameIdNumber = 'OF-3 John Doe, 012345'

    const param = await params;
    const slug = param?.slug;
    const currentRequestedView = slug[1];

    const currentView = () => {
        switch (currentRequestedView) {
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
                return (<Typography>Crew list</Typography>)
            default:
                return (<ProcessFlow/>)
        }
    }

    return (
        <div>
            <main>
                <ClassificationContainer>
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
                </ClassificationContainer>
            </main>
        </div>
    );
}

/*

// Only for SSG

export async function generateStaticParams() {
    return [
        { slug: ['example'] },
        { slug: ['example', 'planning'] },
        { slug: ['example', 'pilot'] },
        { slug: ['example', 'execution'] },
        { slug: ['example', 'personal'] },
    ];
}

export const dynamicParams = false;

 */