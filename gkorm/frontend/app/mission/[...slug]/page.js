import {Box, Container, Grid, Typography} from "@mui/material";
import NavHeader from "@/components/navigation/NavHeader";
import MissionPlanningRiskAssessment from "@/components/constructedWorksheets/MissionPlanningRiskAssessment";
import MissionFlowNav from "@/components/navigation/MissionFlowNav";
import DayOfMissionRiskAssessment from "@/components/constructedWorksheets/DayOfMissionRiskAssessment";
import PersonalRiskAssessment from "@/components/constructedWorksheets/PersonalRiskAssessment";
import PilotProficiencyRiskAssessment from "@/components/constructedWorksheets/PilotProficiencyRiskAssessment";

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
                return (<Typography>Summary view (planned)</Typography>)
        }
    }

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

                            <Grid size={{xs: 12, lg: 3}}>
                                <Box
                                    sx={{
                                        maxHeight: '85dvh',
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
                                        maxHeight: '85dvh', overflow: 'auto', padding: '1rem',
                                    }}
                                >
                                    {currentView()}
                                </Box>

                            </Grid>

                        </Grid>

                    </Box>
                </Container>
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