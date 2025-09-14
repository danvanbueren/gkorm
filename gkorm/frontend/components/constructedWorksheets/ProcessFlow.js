'use client'

import {Box, Button, Typography, useMediaQuery, useTheme} from "@mui/material"
import Worksheet from "@/components/worksheet/Worksheet"
import {Close, Done, MoreHoriz, Pending, QuestionMark, South, SubdirectoryArrowRight} from '@mui/icons-material'
import {useSpaRouter} from "@/context/SpaRouter"
import {useEffect, useState} from "react";
import {useAlert} from "@/context/AlertProvider";

export default function ProcessFlow({
                                        theme = useTheme(),
                                    }) {

    const {navigate, currentPath} = useSpaRouter()
    const pathAsArray = currentPath.split("/")
    const missionIdFromUrl = pathAsArray[2]

    const { AlertData } = useAlert()

    const isMdUp = useMediaQuery(theme.breakpoints.up('md'))

    const getIcon = (status) => {
        switch (status) {
            case 'NOT_STARTED':
                return <Close sx={{padding: 0}}/>
            case 'IN_PROGRESS':
                return <MoreHoriz sx={{padding: 0}}/>
            case 'COMPLETE':
                return <Done sx={{padding: 0}}/>
            case 'LOADING':
                return <Pending sx={{padding: 0}}/>
            default:
                return <QuestionMark sx={{padding: 0}}/>
        }
    }

    const getPrimaryColor = (status) => {
        switch (status) {
            case 'NOT_STARTED':
                return 'secondary'
            case 'IN_PROGRESS':
                return 'warning'
            case 'COMPLETE':
                return 'success'
            case 'LOADING':
                return 'white'
            default:
                return 'error'
        }
    }

    const [data, setData] = useState()

    // API call
    useEffect(() => {
        fetch(`http://localhost:8000/missions/get/${missionIdFromUrl}/status`, {
            method: 'GET',
            headers: { 'accept': 'application/json' }
        })
            .then((response) => {
                if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`)
                return response.json()
            })
            .then((json) => {
                setData(json.content)
            })
            .catch((err) => {
                new AlertData()
                    .title('API Error')
                    .content(err.message)
                    .variant('filled')
                    .severity('error')
                    .add()
            })
    }, [])

    return (<Worksheet title="Operational Risk Management Process Flow">
        <Box sx={{padding: '1rem', alignItems: 'center', display: 'flex', flexDirection: 'column'}}>

            <Typography variant='h5' fontWeight={'700'} sx={{marginY: '1rem'}}>Risk Assessment
                Worksheets</Typography>

            <Typography variant='h6' sx={{marginBottom: '1rem'}}>Mission Planning</Typography>

            <Box display={'inline-flex'} width={'16rem'} marginBottom={2}>
                <Button
                    onClick={() => {navigate(`/mission/${missionIdFromUrl}/planning`)}}
                    fullWidth
                    startIcon={getIcon(data?.MISSION_PLANNING_WORKSHEET_STATUS || 'LOADING')}
                    color={getPrimaryColor(data?.MISSION_PLANNING_WORKSHEET_STATUS || 'LOADING')}
                    variant='outlined'
                    size='large'
                    sx={{
                        height: '4rem',
                        background: `${theme.palette.primary.contrastText}`
                    }}
                >
                    <Typography sx={{width: '100%'}}>Mission Planning</Typography>
                </Button>
            </Box>

            <Box display={'inline-flex'} width={'16rem'} marginBottom={2}>
                <SubdirectoryArrowRight sx={{alignSelf: 'center', marginBottom: '0.4rem', color: `${theme.palette.grey.A400}`}}/>
                <Button
                    onClick={() => {navigate(`/mission/${missionIdFromUrl}/pilot`)}}
                    fullWidth
                    startIcon={getIcon(data?.PILOT_PROFICIENCY_WORKSHEET_STATUS || 'LOADING')}
                    color={getPrimaryColor(data?.PILOT_PROFICIENCY_WORKSHEET_STATUS || 'LOADING')}
                    variant='outlined'
                    size='large'
                    sx={{
                        marginLeft: '1rem',
                        background: `${theme.palette.primary.contrastText}`
                    }}
                >
                    <Typography sx={{width: '100%'}}>Pilot Proficiency</Typography>
                </Button>
            </Box>

            <South sx={{marginTop: '0.5rem', color: `${theme.palette.grey.A400}`}} />

            <Typography variant='h6' sx={{marginY: '1rem'}}>Execution</Typography>

            <Box display={'inline-flex'} width={'16rem'} marginBottom={2}>
                <Button
                    onClick={() => {navigate(`/mission/${missionIdFromUrl}/execution`)}}
                    fullWidth
                    startIcon={getIcon(data?.DAY_OF_MISSION_WORKSHEET_STATUS || 'LOADING')}
                    color={getPrimaryColor(data?.DAY_OF_MISSION_WORKSHEET_STATUS || 'LOADING')}
                    variant='outlined'
                    size='large'
                    sx={{
                        height: '4rem',
                        background: `${theme.palette.primary.contrastText}`
                    }}
                >
                    <Typography sx={{width: '100%'}}>Day of Mission</Typography>
                </Button>
            </Box>

            <Box display={'inline-flex'} width={'16rem'} marginBottom={2}>
                <SubdirectoryArrowRight sx={{alignSelf: 'center', marginBottom: '0.4rem', color: `${theme.palette.grey.A400}`}}/>
                <Button
                    onClick={() => {navigate(`/mission/${missionIdFromUrl}/personal`)}}
                    fullWidth
                    startIcon={getIcon(data?.PERSONAL_WORKSHEET_STATUS || 'LOADING')}
                    color={getPrimaryColor(data?.PERSONAL_WORKSHEET_STATUS || 'LOADING')}
                    variant='outlined'
                    size='large'
                    sx={{
                        marginLeft: '1rem',
                        background: `${theme.palette.primary.contrastText}`
                    }}
                >
                    <Typography sx={{width: '100%'}}>Personal</Typography>
                </Button>
            </Box>
        </Box>
    </Worksheet>)
}