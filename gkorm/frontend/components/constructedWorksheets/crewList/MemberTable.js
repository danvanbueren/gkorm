import * as React from 'react'
import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import SensorOccupiedIcon from '@mui/icons-material/SensorOccupied'
import NoteAltIcon from '@mui/icons-material/NoteAlt'
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff'
import DeleteIcon from '@mui/icons-material/Delete'
import SchoolIcon from '@mui/icons-material/School'
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule'
import {Tooltip} from "@mui/material"
import {useSpaRouter} from "@/context/SpaRouter"
import {useEffect, useState} from "react";
import {useAuth} from "@/context/AuthContext";
import {useAlert} from "@/context/AlertProvider";

function createRowData(member, rank, givenName, familyName, crewPosition, crewPositionModifiers, status, personalRiskAssessment = null) {
    let displayName = rank + ' ' + givenName + ' ' + familyName
    let displayCrewPosition = crewPositionModifiers + ' ' + crewPosition

    return {
        member,
        rank,
        givenName,
        familyName,
        crewPosition,
        crewPositionModifiers,
        displayName,
        displayCrewPosition,
        status,
        personalRiskAssessment: [
            {
                id: personalRiskAssessment && personalRiskAssessment.id,
                q1: personalRiskAssessment && personalRiskAssessment.q1,
                q2: personalRiskAssessment && personalRiskAssessment.q2,
                q3: personalRiskAssessment && personalRiskAssessment.q3,
                q4: personalRiskAssessment && personalRiskAssessment.q4,
            },
        ],
    }
}

function Row({setRefresh, missionData, ...props}) {

    const { AlertData } = useAlert()

    const {currentPath} = useSpaRouter()
    const mission_id = currentPath.split("/")[2]

    const {row} = props
    const {navigate} = useSpaRouter()
    const [open, setOpen] = useState(false)

    const removeMember = async (member_id) => {
        const url = `http://localhost:8000/missions/remove_member?mission_id=${mission_id}&member_id=${member_id}`

        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 10000)

        try {
            const response = await fetch(url, {
                signal: controller.signal,
                method: "DELETE",
            })
            if (!response.ok) throw new Error('Failed to fetch data - ' + response.statusText)
            const data = await response.json()
        } catch (error) {
            new AlertData()
                .title('API Error')
                .content(error.message)
                .variant('filled')
                .severity('error')
                .add()
        } finally {
            clearTimeout(timeoutId)
            setRefresh(true)
        }
    }

    return (
        <>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell>{row.displayName}</TableCell>
                <TableCell>{row.displayCrewPosition}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell align="right">
                    {
                        <>
                            { row.crewPosition === 'pilot' &&
                                <Tooltip title="Mission Planning - Overall">
                                    <IconButton onClick={() => navigate('/mission/' + missionData?.PKEY_id + '/planning')}>
                                        <NoteAltIcon sx={{ color: 'success.main' }}/>
                                    </IconButton>
                                </Tooltip>
                            }

                            { row.crewPosition === 'pilot' &&
                                <Tooltip title="Mission Planning - Pilot Proficiency">
                                    <IconButton onClick={() => navigate('/mission/' + missionData?.PKEY_id + '/pilot')}>
                                        <SchoolIcon sx={{ color: 'success.main' }}/>
                                    </IconButton>
                                </Tooltip>
                            }

                            { row.crewPosition === 'pilot' &&
                                <IconButton disabled={true}>
                                    <HorizontalRuleIcon sx={{ color: 'text.secondary' }}/>
                                </IconButton>
                            }

                            { row.crewPosition === 'pilot' &&
                                <Tooltip title="Execution - Overall">
                                    <IconButton onClick={() => navigate('/mission/' + missionData?.PKEY_id + '/execution')}>
                                        <FlightTakeoffIcon sx={{ color: 'warning.main' }}/>
                                    </IconButton>
                                </Tooltip>
                            }

                            <Tooltip title="Execution - Personal">
                                <IconButton onClick={() => navigate('/mission/' + missionData?.PKEY_id + '/personal')}>
                                    <SensorOccupiedIcon sx={{ color: 'error.main' }}/>
                                </IconButton>
                            </Tooltip>

                            <IconButton disabled={true}>
                                <HorizontalRuleIcon sx={{ color: 'text.secondary' }}/>
                            </IconButton>

                            <Tooltip title="Remove crew member">
                                <IconButton onClick={() => {
                                    removeMember(row?.member?.user?.PKEY_id)
                                }}>
                                    <DeleteIcon/>
                                </IconButton>
                            </Tooltip>
                        </>
                    }
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Additional info
                            </Typography>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    )
}

export default function MemberTable({missionData, setRefresh, ...props}) {

    const [rows, setRows] = useState([])

    useEffect(() => {
        if (!missionData?.members?.length) return

        const builtRows = missionData.members.map((member, index) =>
            createRowData(
                member,
                member?.user?.rank,
                member?.user?.given_name,
                member?.user?.family_name,
                member?.crew_position_override || member?.user?.crew_position,
                member?.crew_position_modifier_override || member?.user?.crew_position_modifier,
                "(api todo)",
                {id: index, q1: 1, q2: 2, q3: 3, q4: 4}
            )
        );

        setRows(builtRows);
    }, [missionData]);

    return (
        missionData?.members.length === 0
            ?
            <Typography variant='h6' sx={{m: 5, display: 'flex', justifySelf: 'center'}}>No members added to this mission yet.</Typography>
            :
            <TableContainer component={Paper} sx={{borderRadius: '1rem'}}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell>Member</TableCell>
                            <TableCell>Crew Position</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell align="right">Tools</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <Row key={index} row={row} missionData={missionData} setRefresh={setRefresh}/>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
    )
}