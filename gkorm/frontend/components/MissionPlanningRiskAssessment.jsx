'use client';

import {Box, Container, Grid, Typography, useTheme} from "@mui/material";
import WorksheetTableBox from "@/components/WorksheetTableBox";

export default function MissionPlanningRiskAssessment() {
    const theme = useTheme();

    const getTitleText = (content) => {
        return (<Typography
            variant={'h5'}
            textAlign={'center'}
            padding={2}
            fontWeight='500'
        >
            {content}
        </Typography>)
    }
    const getReadOnlyFieldWithTitleText = (title, content) => {
        return (<>
            <Typography variant="body1" fontWeight="bold" padding={2}>
                {title}
            </Typography>
            <Typography
                variant="body1"
                sx={{
                    borderBottom: '1px solid', borderColor: 'text.primary', lineHeight: 1.5, pb: 0.25,
                }}>
                {content}
            </Typography>
        </>)
    }
    const getHeadingText = (content) => {
        return (<Typography
            variant={'h6'}
            padding={2}
            fontWeight='500'
        >
            {content}
        </Typography>)
    }

    const borderColor = theme.palette.mode === 'dark' ? '#111' : '#333';

    const refFieldBackgroundColor = theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[100];
    const leftHeadingBackgroundColor = theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[400];
    const salmonBackgroundColor = theme.palette.mode === 'dark' ? '#b37f75' : '#d8998c';

    const defaultTextColor = theme.palette.getContrastText(theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[200]);

    return (<Container maxWidth="lg">

        {getTitleText('Mission Planning Risk Assessment')}

        <Box
            sx={{
                borderRadius: '1rem', overflow: 'hidden', border: `4px solid ${borderColor}`,
            }}>

            {/** Mission Information **/}

            <Grid
                container
                sx={{
                    borderBottom: `4px solid ${borderColor}`,
                }}
            >
                <Grid size={4.5}>
                    <WorksheetTableBox
                        borderRight={true}
                    >
                        {getReadOnlyFieldWithTitleText("Mission #", "AJ1234M")}
                    </WorksheetTableBox>
                </Grid>

                <Grid size={2.5}>
                    <WorksheetTableBox
                        borderRight={true}
                    >
                        {getReadOnlyFieldWithTitleText("Date", "12-Jun-25")}
                    </WorksheetTableBox>
                </Grid>

                <Grid size={5}>
                    <WorksheetTableBox>
                        {getReadOnlyFieldWithTitleText("AC Name, ID #", "OF-8 Doe, John, 12345")}
                    </WorksheetTableBox>
                </Grid>
            </Grid>

            {/** Risk Factors Header **/}

            <Grid
                container
                sx={{
                    borderBottom: `4px solid ${borderColor}`,
                }}
            >
                <Grid size={4.5}>
                    <WorksheetTableBox
                        backgroundColor={leftHeadingBackgroundColor}
                        borderRight={true}
                    >
                        {getHeadingText('RISK FACTORS')}
                    </WorksheetTableBox>
                </Grid>

                <Grid size={2.5}>
                    <WorksheetTableBox
                        backgroundColor={theme.palette.success.main}
                        color={theme.palette.getContrastText(theme.palette.success.main)}
                        borderRight={true}
                    >
                        {getHeadingText('LOW')}
                    </WorksheetTableBox>
                </Grid>

                <Grid size={2.5}>
                    <WorksheetTableBox
                        backgroundColor={theme.palette.warning.main}
                        color={theme.palette.getContrastText(theme.palette.warning.main)}
                        borderRight={true}
                    >
                        {getHeadingText('MEDIUM')}
                    </WorksheetTableBox>
                </Grid>

                <Grid size={2.5}>
                    <WorksheetTableBox
                        backgroundColor={theme.palette.error.main}
                        color={theme.palette.getContrastText(theme.palette.error.main)}
                    >
                        {getHeadingText('HIGH')}
                    </WorksheetTableBox>
                </Grid>
            </Grid>

            {/** Timeline Divider **/}

            <Grid
                container
                sx={{
                    borderBottom: `4px solid ${borderColor}`,
                }}
            >
                <Grid size={12}>
                    <WorksheetTableBox
                        backgroundColor={salmonBackgroundColor}
                        color={'#000'}
                        justifyContent={'center'}
                    >
                        <Typography variant={'h6'} fontWeight='800' padding={1}>TIMELINE</Typography>
                    </WorksheetTableBox>
                </Grid>
            </Grid>

            {/** Question 1 **/}

            <Grid
                container
            >
                <Grid size={4.5}>
                    <WorksheetTableBox
                        backgroundColor={leftHeadingBackgroundColor}
                        borderRight={true}
                    >
                        {getHeadingText('Deviation from Established Wake-Sleep Cycle')}
                    </WorksheetTableBox>
                </Grid>

                <Grid size={2.5}>
                    <WorksheetTableBox
                        borderRight={true}
                        justifyContent={'center'}
                    >
                        {
                            <Box>
                                <Typography textAlign='center'>Usual Showtime</Typography>
                                <Typography textAlign='center'>(0630-1159)</Typography>
                            </Box>
                        }
                    </WorksheetTableBox>
                </Grid>

                <Grid size={2.5}>
                    <WorksheetTableBox
                        borderRight={true}
                        justifyContent={'center'}
                    >
                        {
                            <Box>
                                <Typography textAlign='center'>Late Show</Typography>
                                <Typography textAlign='center'>(1200-1959)</Typography>
                            </Box>
                        }
                    </WorksheetTableBox>
                </Grid>

                <Grid size={2.5}>
                    <WorksheetTableBox
                        borderRight={true}
                        justifyContent={'center'}
                    >
                        {
                            <Box>
                                <Typography textAlign='center'>During Sleeping Hours</Typography>
                                <Typography textAlign='center'>(2000-0629)</Typography>
                            </Box>
                        }
                    </WorksheetTableBox>
                </Grid>
            </Grid>


        </Box>
    </Container>)
}