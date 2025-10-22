/******************************************************************************
 * COPYRIGHT © 2025 DANIEL VAN BUEREN. ALL RIGHTS RESERVED.                   *
 *                                                                            *
 * THIS MATERIAL IS PROTECTED BY COPYRIGHT LAW. NO PART OF THIS WORK MAY BE   *
 * COPIED, REPRODUCED, DISTRIBUTED, TRANSMITTED, DISPLAYED, OR PERFORMED IN   *
 * ANY FORM OR BY ANY MEANS, ELECTRONIC, MECHANICAL, PHOTOCOPYING, RECORDING, *
 * OR OTHERWISE, WITHOUT PRIOR WRITTEN PERMISSION FROM THE COPYRIGHT OWNER.   *
 ******************************************************************************/

'use client'

import {Box, Button, Divider, Grid, Typography, useTheme} from "@mui/material"
import Worksheet from "@/components/worksheet/Worksheet"
import {Close, Done, MoreHoriz, Pending, QuestionMark} from '@mui/icons-material'
import {useSpaRouter} from "@/context/SpaRouter"
import {useEffect, useState} from "react";
import {useAlert} from "@/context/AlertProvider";

export default function Settings({
                                     theme = useTheme(),
                                 }) {

    const {navigate, currentPath} = useSpaRouter()
    const pathAsArray = currentPath.split("/")
    const missionIdFromUrl = pathAsArray[2]

    const {AlertData} = useAlert()

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
        fetch(`http://localhost:8000/status/mission/${missionIdFromUrl}`, {
            method: 'GET',
            headers: {'accept': 'application/json'}
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

    return (<Worksheet title="Settings">
        <Box sx={{padding: '1rem', alignItems: 'center', display: 'flex', flexDirection: 'column'}}>


            <Grid container spacing={2} width={'100%'} sx={{p: '1rem'}}>
                <Grid size={12}>
                    <Typography variant='h5' fontWeight={'700'} sx={{marginY: '1rem'}}>Mission Settings</Typography>
                </Grid>
                <Grid size={12}>
                    <Divider/>
                </Grid>

                <Grid size={{sm: 12, md: 6}}>
                    <Typography variant='h6' sx={{marginBottom: '1rem'}}>Change Mission Number</Typography>
                    <Typography variant='subtitle1' color='text.secondary'>
                        Change the mission number of this mission.
                    </Typography>
                </Grid>
                <Grid size={{xs: 12, sm: 6}}>
                    <Button
                        variant='outlined'
                        onClick={() => {
                            alert('todo')
                        }}
                    >
                        Change Mission Number
                    </Button>
                </Grid>
                <Grid size={12}>
                    <Divider/>
                </Grid>

                <Grid size={{sm: 12, md: 6}}>
                    <Typography variant='h6' sx={{marginBottom: '1rem'}}>Change Execution Date</Typography>
                    <Typography variant='subtitle1' color='text.secondary'>
                        Change the execution date of this mission.
                    </Typography>
                </Grid>
                <Grid size={{xs: 12, sm: 6}}>
                    <Button
                        variant='outlined'
                        onClick={() => {
                            alert('todo')
                        }}
                    >
                        Change Execution Date
                    </Button>
                </Grid>
                <Grid size={12}>
                    <Divider/>
                </Grid>

                <Grid size={{sm: 12, md: 6}}>
                    <Typography variant='h6' sx={{marginBottom: '1rem'}}>Transfer Ownership</Typography>
                    <Typography variant='subtitle1' color='text.secondary'>
                        Transfer operational control of this mission to a new custodian.
                    </Typography>
                </Grid>
                <Grid size={{xs: 12, sm: 6}}>
                    <Button
                        variant='outlined'
                        color='warning'
                        onClick={() => {
                            alert('todo')
                        }}
                    >
                        Transfer Ownership
                    </Button>
                </Grid>
                <Grid size={12}>
                    <Divider/>
                </Grid>

                <Grid size={{sm: 12, md: 6}}>
                    <Typography variant='h6' sx={{marginBottom: '1rem'}}>Manual Archive</Typography>
                    <Typography variant='subtitle1' color='text.secondary'>
                        Force this mission to be archived manually. (e.g. cancellation)
                    </Typography>
                </Grid>
                <Grid size={{xs: 12, sm: 6}}>
                    <Button
                        variant='outlined'
                        color='error'
                        onClick={() => {
                            alert('todo')
                        }}
                    >
                        Manual Archive
                    </Button>
                </Grid>
                <Grid size={12}>
                    <Divider/>
                </Grid>
            </Grid>

        </Box>
    </Worksheet>)
}