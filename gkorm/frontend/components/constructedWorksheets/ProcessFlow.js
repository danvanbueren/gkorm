'use client';

import {Box, Button, Grid, Typography, useMediaQuery, useTheme} from "@mui/material";
import Worksheet from "@/components/worksheet/Worksheet";
import {Close, Done, MoreHoriz, QuestionMark, South, SubdirectoryArrowRight} from '@mui/icons-material';

export default function ProcessFlow({
                                        theme = useTheme(),
                                        missionNumber = 'AJ1234M',
                                        statusMPRA = 'COMPLETE',
                                        statusPPRA = 'COMPLETE',
                                        statusDOMRA = 'IN_PROGRESS',
                                        statusPRA = 'NOT_STARTED',
                                    }) {

    const isMdUp = useMediaQuery(theme.breakpoints.up('md'));

    const getIcon = (status) => {
        switch (status) {
            case 'NOT_STARTED':
                return <Close sx={{padding: 0}}/>;
            case 'IN_PROGRESS':
                return <MoreHoriz sx={{padding: 0}}/>;
            case 'COMPLETE':
                return <Done sx={{padding: 0}}/>;
            default:
                return <QuestionMark sx={{padding: 0}}/>;
        }
    }

    const getColor = (status) => {
        switch (status) {
            case 'NOT_STARTED':
                return 'secondary';
            case 'IN_PROGRESS':
                return 'warning';
            case 'COMPLETE':
                return 'success';
            default:
                return 'error';
        }
    }

    return (<Worksheet title="Operational Risk Management Process Flow">
        <Box sx={{padding: '1rem', alignItems: 'center', display: 'flex', flexDirection: 'column'}}>

            <Typography variant='h5' fontWeight={'700'} sx={{marginY: '1rem'}}>Risk Assessment
                Worksheets</Typography>

            <Typography variant='h6' sx={{marginBottom: '1rem'}}>Mission Planning</Typography>

            <Box display={'inline-flex'} width={'16rem'} marginBottom={2}>
                <Button fullWidth startIcon={getIcon(statusMPRA)} color={getColor(statusMPRA)}
                        variant='outlined' size='large' sx={{height: '4rem'}}>
                    <Typography sx={{width: '100%'}}>Mission Planning</Typography>
                </Button>
            </Box>

            <Box display={'inline-flex'} width={'16rem'} marginBottom={2}>
                <SubdirectoryArrowRight sx={{alignSelf: 'center', marginBottom: '0.4rem', color: `${theme.palette.grey.A400}`}}/>
                <Button fullWidth startIcon={getIcon(statusPPRA)} color={getColor(statusPPRA)}
                        variant='outlined' size='large' sx={{marginLeft: '1rem'}}>
                    <Typography sx={{width: '100%'}}>Pilot Proficiency</Typography>
                </Button>
            </Box>

            <South sx={{marginTop: '0.5rem', color: `${theme.palette.grey.A400}`}} />

            <Typography variant='h6' sx={{marginY: '1rem'}}>Execution</Typography>

            <Box display={'inline-flex'} width={'16rem'} marginBottom={2}>
                <Button fullWidth startIcon={getIcon(statusDOMRA)} color={getColor(statusDOMRA)}
                        variant='outlined' size='large' sx={{height: '4rem'}}>
                    <Typography sx={{width: '100%'}}>Day of Mission</Typography>
                </Button>
            </Box>

            <Box display={'inline-flex'} width={'16rem'} marginBottom={2}>
                <SubdirectoryArrowRight sx={{alignSelf: 'center', marginBottom: '0.4rem', color: `${theme.palette.grey.A400}`}}/>
                <Button fullWidth startIcon={getIcon(statusPRA)} color={getColor(statusPRA)}
                        variant='outlined' size='large' sx={{marginLeft: '1rem'}}>
                    <Typography sx={{width: '100%'}}>Personal</Typography>
                </Button>
            </Box>
        </Box>
    </Worksheet>)
}