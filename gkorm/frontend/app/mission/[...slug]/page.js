import {Box, Container, Grid, Typography} from "@mui/material";
import NavHeader from "@/components/navigation/NavHeader";
import MissionPlanningRiskAssessment
    from "@/components/constructedWorksheets/MissionPlanningRiskAssessment";
import MissionFlowNav from "@/components/navigation/MissionFlowNav";
import DayOfMissionRiskAssessment from "@/components/constructedWorksheets/DayOfMissionRiskAssessment";
import PersonalRiskAssessment from "@/components/constructedWorksheets/PersonalRiskAssessment";
import PilotProficiencyRiskAssessment from "@/components/constructedWorksheets/PilotProficiencyRiskAssessment";

export default function AppMissionSlugPage({ params }) {

    const missionNumber = 'AJ1234M';
    const missionDate = '12-Nov-25';
    const acNameIdNumber = 'OF-3 John Doe, 012345'

    const slug = params?.slug;
    const currentView = slug[1];

    return (<div>
        <main>
            <Container maxWidth="xl" sx={{minWidth: '30rem'}}>
                <Box
                >
                    <Box>
                        <NavHeader/>
                    </Box>

                    <Grid container spacing={2} width={'100%'}>

                        <Grid size={{xs: 12, lg: 3}}>
                            <Box
                                sx={{
                                    maxHeight: '90dvh',
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
                                    maxHeight: '90dvh',
                                    overflow: 'auto',
                                    padding: '1rem',
                                }}
                            >
                                {currentView === 'planning' ?

                                    <MissionPlanningRiskAssessment
                                        missionNumber={missionNumber}
                                        missionDate={missionDate}
                                        acNameIdNumber={acNameIdNumber}
                                    />

                                    : currentView === 'pilot' ?

                                        <PilotProficiencyRiskAssessment/>

                                        : currentView === 'execution' ?

                                            <DayOfMissionRiskAssessment/>

                                            : currentView === 'personal' ?

                                                <PersonalRiskAssessment/>

                                                : <Typography>Summary view (planned)</Typography>

                                }
                            </Box>

                        </Grid>

                    </Grid>

                </Box>
            </Container>
        </main>
    </div>)
        ;
}

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