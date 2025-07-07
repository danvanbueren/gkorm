import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import SensorOccupiedIcon from '@mui/icons-material/SensorOccupied';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import SchoolIcon from '@mui/icons-material/School';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import {Tooltip} from "@mui/material";

function createRowData(rank, givenName, familyName, crewPosition, crewPositionModifiers, status, personalRiskAssessment = null) {
    let displayName = rank + ' ' + givenName + ' ' + familyName;
    let displayCrewPosition = crewPosition + ' ' + crewPositionModifiers;

    return {
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
    };
}

function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
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
                            { row.displayCrewPosition === 'pilot' &&
                                <Tooltip title="Mission Planning - Overall">
                                    <IconButton>
                                        <NoteAltIcon sx={{ color: 'error.main' }}/>
                                    </IconButton>
                                </Tooltip>
                            }

                            { row.displayCrewPosition === 'pilot' &&
                                <Tooltip title="Mission Planning - Pilot Proficiency">
                                    <IconButton>
                                        <SchoolIcon sx={{ color: 'error.main' }}/>
                                    </IconButton>
                                </Tooltip>
                            }

                            { row.displayCrewPosition === 'pilot' &&
                                <IconButton disabled={true}>
                                    <HorizontalRuleIcon sx={{ color: 'text.secondary' }}/>
                                </IconButton>
                            }

                            { row.displayCrewPosition === 'pilot' &&
                                <Tooltip title="Execution - Overall">
                                    <IconButton>
                                        <FlightTakeoffIcon sx={{ color: 'error.main' }}/>
                                    </IconButton>
                                </Tooltip>
                            }

                            <Tooltip title="Execution - Personal">
                                <IconButton>
                                    <SensorOccupiedIcon sx={{ color: 'error.main' }}/>
                                </IconButton>
                            </Tooltip>


                            <IconButton disabled={true}>
                                <HorizontalRuleIcon sx={{ color: 'text.secondary' }}/>
                            </IconButton>

                            <Tooltip title="Remove crew member">
                                <IconButton>
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
        </React.Fragment>
    );
}

Row.propTypes = {
    row: PropTypes.shape({
        calories: PropTypes.number.isRequired,
        carbs: PropTypes.number.isRequired,
        fat: PropTypes.number.isRequired,
        history: PropTypes.arrayOf(
            PropTypes.shape({
                amount: PropTypes.number.isRequired,
                customerId: PropTypes.string.isRequired,
                date: PropTypes.string.isRequired,
            }),
        ).isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        protein: PropTypes.number.isRequired,
    }).isRequired,
};

const rows = [
    createRowData('OF-1', 'John', 'Doe', 'pilot', '', 'complete', {id: 1, q1: 1, q2: 2, q3: 3, q4: 4}),
    createRowData('OF-3', 'Jane', 'Smith', 'system_technician', '', 'incomplete', {id: 2, q1: 1, q2: 2, q3: 3, q4: 4}),
];

export default function MemberTable() {
    return (
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
                        <Row key={index} row={row}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}