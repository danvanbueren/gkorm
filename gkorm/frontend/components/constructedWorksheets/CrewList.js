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
    useTheme, TextField, Select, MenuItem, InputLabel, FormControl, Grid
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ClearIcon from '@mui/icons-material/Clear';
import AddIcon from '@mui/icons-material/Add';
import {useEffect} from "react";
import MemberTable from "@/components/constructedWorksheets/crewList/MemberTable";

function createCrewMember(name, rank, position, callsign) {
    return {
        name, rank, position, callsign, formData: null,
    };
}

function Row({row, onFormSubmit}) {
    const [open, setOpen] = React.useState(false);

    return (
        <>
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
                <TableCell component="th" scope="row" size="large">{row.name}</TableCell>
                <TableCell>{row.rank}</TableCell>
                <TableCell>{row.position}</TableCell>
                <TableCell>{row.callsign}</TableCell>
                <TableCell align="right">
                    <IconButton aria-label="delete">
                        <ClearIcon />
                    </IconButton>
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

    const [rankFilter, setRankFilter] = React.useState('');

    useEffect(() => {
        console.log('useEffect ran with rankFilter: ' + rankFilter)
        if (rankFilter === 'IGNORE') {
            console.log('useEffect met condition 0')
            setRankFilter('')

            const activeElement = document.activeElement
            if (activeElement) {
                activeElement.blur()
            }
        }
    }, [rankFilter]);

    return (
        <>
            <MemberTable/>

            <TableContainer component={Paper} sx={{maxHeight: "70dvh", overflow: "auto", borderRadius: "1rem"}}>
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
            </TableContainer>

            <Box
                sx={{
                    display: 'flex',
                    justifySelf: 'center',
                }}
            >
                <Grid
                    container
                    spacing={2}
                    sx={{
                        width: '100%',
                        mt: 5,
                        display: 'flex',
                        justifySelf: 'center',
                        alignItems: 'center',
                    }}
                >

                    <Grid item xs={12} sm={6} md={3}>

                        <FormControl variant="standard" sx={{ minWidth: 120 }}>
                            <InputLabel>Rank</InputLabel>
                            <Select
                                value={rankFilter}
                                onChange={e => {
                                    setRankFilter(e.target.value)
                                }}
                            >
                                <MenuItem value={'IGNORE'}>Ignore</MenuItem>
                                <MenuItem value={'OR-1'}>OR-1</MenuItem>
                                <MenuItem value={'OR-2'}>OR-2</MenuItem>
                                <MenuItem value={'OR-3'}>OR-3</MenuItem>
                                <MenuItem value={'OR-4'}>OR-4</MenuItem>
                                <MenuItem value={'OR-5'}>OR-5</MenuItem>
                                <MenuItem value={'OR-6'}>OR-6</MenuItem>
                                <MenuItem value={'OR-7'}>OR-7</MenuItem>
                                <MenuItem value={'OR-8'}>OR-8</MenuItem>
                                <MenuItem value={'OR-9'}>OR-9</MenuItem>
                                <MenuItem value={'OF-1'}>OF-1</MenuItem>
                                <MenuItem value={'OF-2'}>OF-2</MenuItem>
                                <MenuItem value={'OF-3'}>OF-3</MenuItem>
                                <MenuItem value={'OF-4'}>OF-4</MenuItem>
                                <MenuItem value={'OF-5'}>OF-5</MenuItem>
                                <MenuItem value={'OF-6'}>OF-6</MenuItem>
                                <MenuItem value={'OF-7'}>OF-7</MenuItem>
                                <MenuItem value={'OF-8'}>OF-8</MenuItem>
                                <MenuItem value={'OF-9'}>OF-9</MenuItem>
                            </Select>
                        </FormControl>

                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <TextField
                            label="Given Name"
                            variant="standard"
                            fullWidth
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <TextField
                            label="Family Name"
                            variant="standard"
                            fullWidth
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <TextField
                            label="AMIS ID"
                            variant="standard"
                            fullWidth
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            sx={{
                                height: '2rem',
                                marginTop: '1rem',
                            }}
                        >
                            Add Member
                        </Button>
                    </Grid>

                </Grid>
            </Box>
        </>
    )
}