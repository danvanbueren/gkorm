'use client';

import * as React from 'react';
import {
    Box,
    Collapse,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Paper,
    Button,
    useTheme
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function createCrewMember(name, rank, position, callsign) {
    return {
        name, rank, position, callsign, formData: null,
    };
}

function Row({row, onFormSubmit}) {
    const [open, setOpen] = React.useState(false);

    return (<>
        <TableRow sx={{'& > *': {borderBottom: 'unset'}}}>
            <TableCell>
                <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={() => setOpen(!open)}
                >
                    {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                </IconButton>
            </TableCell>
            <TableCell component="th" scope="row">{row.name}</TableCell>
            <TableCell>{row.rank}</TableCell>
            <TableCell>{row.position}</TableCell>
            <TableCell>{row.callsign}</TableCell>
            <TableCell align="right">
                <Button variant="contained" size="small" onClick={() => onFormSubmit(row)}>
                    {row.formData ? 'Edit Form' : 'Fill Form'}
                </Button>
            </TableCell>
        </TableRow>
        <TableRow>
            <TableCell style={{
                paddingBottom: 0,
                paddingTop: 0,
                backgroundColor: useTheme().palette.custom.grey["200"],
                color: useTheme().palette.text.primary,
            }} colSpan={6}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box sx={{margin: 1, marginY: 2}}>
                        <Typography variant="h6" gutterBottom component="div">
                            Collapse - Title
                        </Typography>
                        <Typography variant="body2">Collapse - Body</Typography>
                    </Box>
                </Collapse>
            </TableCell>
        </TableRow>
    </>);
}

const initialCrew = [createCrewMember('OF-1', 'John Doe',),];

export default function CrewList() {
    const [crew, setCrew] = React.useState(initialCrew);

    const handleFormSubmit = (crewMember) => {
        const formData = prompt("Enter mission role (e.g., Lead Pilot):"); // Placeholder! Replace with real form/modal.
        const updatedCrew = crew.map(member => member.name === crewMember.name ? {
            ...member, formData: {missionRole: formData, medicalClearance: true}
        } : member);
        setCrew(updatedCrew);
    };

    return (<TableContainer component={Paper} sx={{maxHeight: "70dvh", overflow: "auto", borderRadius: "1rem"}}>
        <Table stickyHeader>
            <TableHead>
                <TableRow>
                    <TableCell/>
                    <TableCell>Grade</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Crew Position</TableCell>
                    <TableCell align="right">Status</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {crew.map((row) => (<Row key={row.name} row={row} onFormSubmit={handleFormSubmit}/>))}
            </TableBody>
        </Table>
    </TableContainer>);
}