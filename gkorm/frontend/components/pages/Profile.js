'use client';

import {Box, Grid, InputLabel, MenuItem, Select, TextField, Typography} from "@mui/material";
import {RequireAuth} from "@/components/utility/RequireAuth";
import NavHeader from "@/components/navigation/NavHeader";
import {useEffect, useState} from "react";
import {useAuth} from "@/context/AuthContext";

export default function Profile() {

    const {session} = useAuth();

    const [givenName, setGivenName] = useState('');
    const [familyName, setFamilyName] = useState('');
    const [crewPosition, setCrewPosition] = useState('unqualified');
    const [crewPositionModifier, setCrewPositionModifier] = useState('none');
    const [assignedUnit, setAssignedUnit] = useState('none');

    const [firstLoad, setFirstLoad] = useState(true);

    useEffect(() => {
        if(firstLoad) {
            setFirstLoad(false);
            return;
        }

        const controller = new AbortController(); // optional: cancel in-flight requests if needed

        const timeout = setTimeout(() => {
            const payload = {
                givenName,
                familyName,
                crewPosition,
                crewPositionModifier,
                assignedUnit
            };

            console.log("Sending API update:", payload);

            // Replace with your API call (e.g., fetch or axios)
            fetch('/api/profile/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
                signal: controller.signal,
            }).catch((err) => {
                if (err.name === 'AbortError') return;
                console.error("Failed to update profile:", err);
            });

        }, 1000); // 1 second debounce

        // Cleanup if any value changes or component unmounts
        return () => {
            clearTimeout(timeout);
            controller.abort(); // cancel previous API request if still in-flight
        };
    }, [givenName, familyName, crewPosition, crewPositionModifier, assignedUnit]);

    return (
        <RequireAuth>
            <Box height={'10dvh'}>
                <NavHeader/>
            </Box>
            <Grid container spacing={2} width={'100%'} height={'85dvh'}>
                <Grid size={{xs: 12, lg: 9}}>
                    <Box
                        sx={{
                            maxHeight: '80dvh', overflow: 'auto', padding: '1rem', display: 'block',
                        }}
                    >
                        <Typography variant='h1'>Profile</Typography>

                        <TextField
                            id="amis-id-input"
                            label="AMIS ID"
                            variant="outlined"
                            value={session?.user?.id}
                            disabled
                            sx={{my: '0.5rem'}}
                        />

                        <TextField
                            id="given-name-input"
                            label="Given Name"
                            variant="outlined"
                            value={givenName}
                            onChange={e => setGivenName(e.target.value)}
                            sx={{my: '0.5rem'}}
                        />

                        <TextField
                            id="family-name-input"
                            label="Family Name"
                            variant="outlined"
                            value={familyName}
                            onChange={e => setFamilyName(e.target.value)}
                            sx={{my: '0.5rem'}}
                        />

                        <InputLabel
                            id="crew-position-select-label"
                            sx={{mt: '0.5rem'}}
                        >
                            Crew Position
                        </InputLabel>

                        <Select
                            labelId="crew-position-select-label"
                            id="crew-position-select"
                            value={crewPosition}
                            label="Crew Position"
                            onChange={e => setCrewPosition(e.target.value)}
                            sx={{mb: '0.5rem'}}
                        >
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

                        <InputLabel
                            id="crew-position-modifier-select-label"
                            sx={{mt: '0.5rem'}}
                        >
                            Crew Position Modifier
                        </InputLabel>

                        <Select
                            labelId="crew-position-modifier-select-label"
                            id="crew-position-modifier-select"
                            value={crewPositionModifier}
                            label="Crew Position Modifier"
                            onChange={e => setCrewPositionModifier(e.target.value)}
                            sx={{mb: '0.5rem'}}
                        >
                            <MenuItem value={'none'}>-</MenuItem>
                            <MenuItem value={'link'}>Link</MenuItem>
                            <MenuItem value={'instructor'}>Instructor</MenuItem>
                            <MenuItem value={'evaluator'}>Evaluator</MenuItem>
                        </Select>

                        <InputLabel
                            id="assigned-unit-select-label"
                            sx={{mt: '0.5rem'}}
                        >
                            Assigned Unit
                        </InputLabel>

                        <Select
                            labelId="assigned-unit-select-label"
                            id="assigned-unit-select"
                            value={assignedUnit}
                            label="Assigned Unit"
                            onChange={e => setAssignedUnit(e.target.value)}
                            sx={{mb: '0.5rem'}}
                        >
                            <MenuItem value={'none'}>-</MenuItem>
                            <MenuItem value={'flying_squadron_1'}>Flying Squadron 1</MenuItem>
                            <MenuItem value={'flying_squadron_2'}>Flying Squadron 2</MenuItem>
                            <MenuItem value={'aircrew_training_squadron'}>Aircrew Training Squadron</MenuItem>
                        </Select>
                    </Box>
                </Grid>
            </Grid>
        </RequireAuth>
    );
}
