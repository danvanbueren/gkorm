'use client';

import {
    Alert,
    Box,
    FormControl,
    FormHelperText,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography
} from "@mui/material";
import {RequireAuth} from "@/components/utility/RequireAuth";
import NavHeader from "@/components/navigation/NavHeader";
import {useEffect, useState} from "react";
import {useAuth} from "@/context/AuthContext";

export default function Profile() {

    const {session, updateUserData} = useAuth();

    const [givenName, setGivenName] = useState(session?.user?.given_name || '');
    const [familyName, setFamilyName] = useState(session?.user?.family_name || '');
    const [crewPosition, setCrewPosition] = useState(session?.user?.crew_position || '');
    const [crewPositionModifier, setCrewPositionModifier] = useState(session?.user?.crew_position_modifier || '');
    const [assignedUnit, setAssignedUnit] = useState(session?.user?.assigned_unit || '');

    const [givenNameStatus, setGivenNameStatus] = useState('');
    const [familyNameStatus, setFamilyNameStatus] = useState('');
    const [crewPositionStatus, setCrewPositionStatus] = useState('');
    const [crewPositionModifierStatus, setCrewPositionModifierStatus] = useState('');
    const [assignedUnitStatus, setAssignedUnitStatus] = useState('');

    const [firstLoad, setFirstLoad] = useState(true);

    // Send API requests to update user data on input change
    useEffect(() => {
        if(firstLoad) {
            setFirstLoad(false);
            return;
        }

        const controller = new AbortController();

        const send = async (propertyName, propertyContent) => {
            const path = `http://localhost:8000/users/update/${propertyName}/${session.user.PKEY_id}?${propertyName}=${propertyContent}`
            try {
                const response = await fetch(path, {method: 'PATCH', headers: {'accept': 'application/json'}})
                const data = await response.json();
                if (!response.ok) {
                    return [false, 'Malformed response: ' + data?.content?.message || 'Unknown error']
                }
                if (data?.content) {
                    updateUserData(data.content)
                    return [true, null]
                }
            } catch (e) {
                return [false, e]
            }
            return [false, 'Generic fetch error']
        }

        if (crewPosition !== session?.user?.crew_position && crewPosition !== '') {
            setCrewPositionStatus('loading')
            send('crew_position', crewPosition).then(result => {
                if (!result[0]) {
                    setCrewPositionStatus('error')
                    console.log(result[1])
                } else {
                    setCrewPositionStatus('success')
                }
            })
        }

        if (crewPositionModifier !== session?.user?.crew_position_modifier && crewPositionModifier !== '') {
            setCrewPositionModifierStatus('loading')
            send('crew_position_modifier', crewPositionModifier).then(result => {
                if (!result[0]) {
                    setCrewPositionModifierStatus('error')
                    console.log(result[1])
                } else {
                    setCrewPositionModifierStatus('success')
                }
            })
        }

        if (assignedUnit !== session?.user?.assigned_unit && assignedUnit !== '') {
            setAssignedUnitStatus('loading')
            send('assigned_unit', assignedUnit).then(result => {
                if (!result[0]) {
                    setAssignedUnitStatus('error')
                    console.log(result[1])
                } else {
                    setAssignedUnitStatus('success')
                }
            })
        }

        // Debounce the API call for typed text inputs
        const timeout = setTimeout(() => {

            if (givenName !== session?.user?.given_name) {
                setGivenNameStatus('loading')
                send('given_name', givenName).then(result => {
                    if (!result) {
                        setGivenNameStatus('error')
                        console.log(result[1])
                    } else {
                        setGivenNameStatus('success')
                    }
                })
            }

            if (familyName !== session?.user?.family_name) {
                setFamilyNameStatus('loading')
                send('family_name', familyName).then(result => {
                    if (!result) {
                        setFamilyNameStatus('error')
                        console.log(result[1])
                    } else {
                        setFamilyNameStatus('success')
                    }
                })
            }
        }, 1000);

        // Cleanup if any value changes or component unmounts
        return () => {
            clearTimeout(timeout);
            controller.abort(); // Cancel the previous API request if still in-flight
        };
    }, [givenName, familyName, crewPosition, crewPositionModifier, assignedUnit]);

    // Reset success status after 5 seconds
    useEffect(() => {
        if (givenNameStatus === 'success') {
            setTimeout(() => {
                setGivenNameStatus('')
            }, 5000);
        }
    }, [givenNameStatus])

    useEffect(() => {
        if (familyNameStatus === 'success') {
            setTimeout(() => {
                setFamilyNameStatus('')
            }, 5000);
        }
    }, [familyNameStatus])

    useEffect(() => {
        if (crewPositionStatus === 'success') {
            setTimeout(() => {
                setCrewPositionStatus('')
            }, 5000);
        }
    }, [crewPositionStatus])

    useEffect(() => {
        if (crewPositionModifierStatus === 'success') {
            setTimeout(() => {
                setCrewPositionModifierStatus('')
            }, 5000);
        }
    }, [crewPositionModifierStatus])

    useEffect(() => {
        if (assignedUnitStatus === 'success') {
            setTimeout(() => {
                setAssignedUnitStatus('')
            }, 5000);
        }
    }, [assignedUnitStatus])

    // Clear status upon input change
    useEffect(() => {
        setGivenNameStatus('')
    }, [givenName])

    useEffect(() => {
        setFamilyNameStatus('')
    }, [familyName])

    useEffect(() => {
        setCrewPositionStatus('')
    }, [crewPosition])

    useEffect(() => {
        setCrewPositionModifierStatus('')
    }, [crewPositionModifier])

    useEffect(() => {
        setAssignedUnitStatus('')
    }, [assignedUnit])

    return (
        <RequireAuth>
            <Box height={'10dvh'}>
                <NavHeader/>
            </Box>
            <Typography variant='h2' sx={{p: 2}}>Profile</Typography>
            <Grid container width={'80%'}>
                <Grid size={{xs: 12, md: 12, lg: 6}} sx={{p: 2, height: '8rem'}}>
                    <TextField
                        id="given-name-input"
                        label="Given Name"
                        variant="outlined"
                        value={givenName}
                        onChange={e => setGivenName(e.target.value)}
                        error={givenNameStatus === 'error'}
                        sx={{
                            '& .MuiFormHelperText-root': {color: 'primary.main'}
                        }}
                        helperText={
                            givenNameStatus === 'error' ? 'Failed to save!' :
                                givenNameStatus === 'loading' ? 'Saving...' :
                                    givenNameStatus === 'success' ? 'Saved!' : ''
                        }
                        fullWidth
                    />
                </Grid>
                <Grid size={{xs: 12, md: 12, lg: 6}} sx={{p: 2, height: '8rem'}}>
                    <TextField
                        id="family-name-input"
                        label="Family Name"
                        variant="outlined"
                        value={familyName}
                        onChange={e => setFamilyName(e.target.value)}
                        error={familyNameStatus === 'error'}
                        sx={{
                            '& .MuiFormHelperText-root': {color: 'primary.main'}
                        }}
                        helperText={
                            familyNameStatus === 'error' ? 'Failed to save!' :
                                familyNameStatus === 'loading' ? 'Saving...' :
                                    familyNameStatus === 'success' ? 'Saved!' : ''
                        }
                        fullWidth
                    />
                </Grid>
                <Grid size={{xs: 12, md: 12, lg: 6}} sx={{p: 2, height: '8rem'}}>
                    <TextField
                        id="amis-id-input"
                        label="AMIS ID"
                        variant="outlined"
                        value={session?.user?.amis_id}
                        fullWidth
                        disabled
                    />
                </Grid>
                <Grid size={{xs: 12, md: 12, lg: 6}} sx={{p: 2, height: '8rem'}}>
                    <FormControl fullWidth>
                        <InputLabel id="assigned-unit-select-label">Assigned Unit</InputLabel>
                        <Select
                            labelId="assigned-unit-select-label"
                            id="assigned-unit-select"
                            value={assignedUnit}
                            label="Assigned Unit"
                            onChange={e => setAssignedUnit(e.target.value)}
                            error={assignedUnitStatus === 'error'}
                            variant="outlined"
                        >
                            <MenuItem value={''} disabled>None</MenuItem>
                            <MenuItem value={'flying_squadron_1'}>Flying Squadron 1</MenuItem>
                            <MenuItem value={'flying_squadron_2'}>Flying Squadron 2</MenuItem>
                            <MenuItem value={'aircrew_training_squadron'}>Aircrew Training Squadron</MenuItem>
                        </Select>
                        <FormHelperText sx={{color: 'primary.main'}}>
                            {
                                assignedUnitStatus === 'error' ? 'Failed to save!' :
                                    assignedUnitStatus === 'loading' ? 'Saving...' :
                                        assignedUnitStatus === 'success' ? 'Saved!' : ''
                            }
                        </FormHelperText>
                    </FormControl>
                </Grid>
                <Grid size={{xs: 12, md: 12, lg: 6}} sx={{p: 2, height: '8rem'}}>
                    <FormControl fullWidth>
                        <InputLabel id="crew-position-select-label">Crew Position</InputLabel>
                        <Select
                            labelId="crew-position-select-label"
                            id="crew-position-select"
                            value={crewPosition}
                            label="Crew Position"
                            onChange={e => setCrewPosition(e.target.value)}
                            error={crewPositionStatus === 'error'}
                            variant="outlined"
                        >
                            <MenuItem value={''} disabled>None</MenuItem>
                            <MenuItem value={'pilot'}>Pilot</MenuItem>
                            <MenuItem value={'flight_engineer'}>Flight Engineer</MenuItem>
                            <MenuItem value={'tactical_director'}>Tactical Director</MenuItem>
                            <MenuItem value={'fighter_allocator'}>Fighter Allocator</MenuItem>
                            <MenuItem value={'weapons_controller'}>Weapons Controller</MenuItem>
                            <MenuItem value={'fighter_allocator_weapons_controller'}>Fighter Allocator / Weapons Controller</MenuItem>
                            <MenuItem value={'surveillance_controller'}>Surveillance Controller</MenuItem>
                            <MenuItem value={'passive_controller'}>Passive Controller</MenuItem>
                            <MenuItem value={'surveillance_operator'}>Surveillance Operator</MenuItem>
                            <MenuItem value={'system_technician'}>System Technician</MenuItem>
                            <MenuItem value={'communications_technician'}>Communications Technician</MenuItem>
                            <MenuItem value={'radar_technician'}>Radar Technician</MenuItem>
                            <MenuItem value={'unqualified'}>Unqualified</MenuItem>
                            <MenuItem value={'passenger'}>Passenger</MenuItem>
                        </Select>
                        <FormHelperText sx={{color: 'primary.main'}}>
                            {
                                crewPositionStatus === 'error' ? 'Failed to save!' :
                                    crewPositionStatus === 'loading' ? 'Saving...' :
                                        crewPositionStatus === 'success' ? 'Saved!' : ''
                            }
                        </FormHelperText>
                    </FormControl>
                </Grid>
                <Grid size={{xs: 12, md: 12, lg: 6}} sx={{p: 2, height: '8rem'}}>
                    <FormControl fullWidth>
                        <InputLabel id="crew-position-modifier-select-label">Crew Position Modifier</InputLabel>
                        <Select
                            labelId="crew-position-modifier-select-label"
                            id="crew-position-modifier-select"
                            value={crewPositionModifier}
                            label="Crew Position Modifier"
                            onChange={e => setCrewPositionModifier(e.target.value)}
                            error={crewPositionModifierStatus === 'error'}
                            variant="outlined"
                        >
                            <MenuItem value={''} disabled>None</MenuItem>
                            <MenuItem value={'link'}>Link</MenuItem>
                            <MenuItem value={'instructor'}>Instructor</MenuItem>
                            <MenuItem value={'evaluator'}>Evaluator</MenuItem>
                        </Select>
                        <FormHelperText sx={{color: 'primary.main'}}>
                            {
                                crewPositionModifierStatus === 'error' ? 'Failed to save!' :
                                    crewPositionModifierStatus === 'loading' ? 'Saving...' :
                                        crewPositionModifierStatus === 'success' ? 'Saved!' : ''
                            }
                        </FormHelperText>
                    </FormControl>
                </Grid>
            </Grid>
        </RequireAuth>
    );
}
