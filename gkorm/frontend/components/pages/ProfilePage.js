/******************************************************************************
 * COPYRIGHT © 2025 DANIEL VAN BUEREN. ALL RIGHTS RESERVED.                   *
 *                                                                            *
 * THIS MATERIAL IS PROTECTED BY COPYRIGHT LAW. NO PART OF THIS WORK MAY BE   *
 * COPIED, REPRODUCED, DISTRIBUTED, TRANSMITTED, DISPLAYED, OR PERFORMED IN   *
 * ANY FORM OR BY ANY MEANS, ELECTRONIC, MECHANICAL, PHOTOCOPYING, RECORDING, *
 * OR OTHERWISE, WITHOUT PRIOR WRITTEN PERMISSION FROM THE COPYRIGHT OWNER.   *
 ******************************************************************************/

'use client'

import {
    Box,
    FormControl,
    FormHelperText,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography
} from "@mui/material"
import {RequireAuth} from "@/components/utility/RequireAuth"
import NavHeader from "@/components/navigation/NavHeader"
import {useEffect, useState} from "react"
import {useAuth} from "@/context/AuthContext"

export default function ProfilePage() {

    const {session, updateUserData} = useAuth()

    const [rank, setRank] = useState(session?.user?.rank || '')
    const [givenName, setGivenName] = useState(session?.user?.given_name || '')
    const [familyName, setFamilyName] = useState(session?.user?.family_name || '')
    const [crewPosition, setCrewPosition] = useState(session?.user?.crew_position || '')
    const [crewPositionModifier, setCrewPositionModifier] = useState(session?.user?.crew_position_modifier || '')
    const [assignedUnit, setAssignedUnit] = useState(session?.user?.assigned_unit || '')

    const [rankStatus, setRankStatus] = useState('')
    const [givenNameStatus, setGivenNameStatus] = useState('')
    const [familyNameStatus, setFamilyNameStatus] = useState('')
    const [crewPositionStatus, setCrewPositionStatus] = useState('')
    const [crewPositionModifierStatus, setCrewPositionModifierStatus] = useState('')
    const [assignedUnitStatus, setAssignedUnitStatus] = useState('')

    const [firstLoad, setFirstLoad] = useState(true)

    // Send API requests to update user data on input change
    useEffect(() => {
        if (firstLoad) {
            setFirstLoad(false)
            return
        }

        const controller = new AbortController()

        const send = async (propertyName, propertyContent) => {
            const path = `http://localhost:8000/users/update/${propertyName}/${session.user.PKEY_id}?${propertyName}=${propertyContent}`
            try {
                const response = await fetch(path, {method: 'PATCH', headers: {'accept': 'application/json'}})
                const data = await response.json()
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

        if (rank !== session?.user?.rank && rank !== '') {
            setRankStatus('loading')
            send('rank', rank).then(result => {
                if (!result[0]) {
                    setRankStatus('error')
                } else {
                    setRankStatus('success')
                }
            })
        }

        if (crewPosition !== session?.user?.crew_position && crewPosition !== '') {
            setCrewPositionStatus('loading')
            send('crew_position', crewPosition).then(result => {
                if (!result[0]) {
                    setCrewPositionStatus('error')
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
                    if (!result[0]) {
                        setGivenNameStatus('error')
                    } else {
                        setGivenNameStatus('success')
                    }
                })
            }

            if (familyName !== session?.user?.family_name) {
                setFamilyNameStatus('loading')
                send('family_name', familyName).then(result => {
                    if (!result[0]) {
                        setFamilyNameStatus('error')
                    } else {
                        setFamilyNameStatus('success')
                    }
                })
            }
        }, 1000)

        // Cleanup if any value changes or component unmounts
        return () => {
            clearTimeout(timeout)
            controller.abort() // Cancel the previous API request if still in-flight
        }
    }, [rank, givenName, familyName, crewPosition, crewPositionModifier, assignedUnit])

    // Reset success status after 5 seconds
    useEffect(() => {
        let timeout
        if (rankStatus === 'success') {
            timeout = setTimeout(() => {
                setRankStatus('')
            }, 5000)
        }
        return () => clearTimeout(timeout)
    }, [rankStatus])

    useEffect(() => {
        let timeout
        if (givenNameStatus === 'success') {
            timeout = setTimeout(() => {
                setGivenNameStatus('')
            }, 5000)
        }
        return () => clearTimeout(timeout)
    }, [givenNameStatus])

    useEffect(() => {
        let timeout
        if (familyNameStatus === 'success') {
            timeout = setTimeout(() => {
                setFamilyNameStatus('')
            }, 5000)
        }
        return () => clearTimeout(timeout)
    }, [familyNameStatus])

    useEffect(() => {
        let timeout
        if (crewPositionStatus === 'success') {
            timeout = setTimeout(() => {
                setCrewPositionStatus('')
            }, 5000)
        }
        return () => clearTimeout(timeout)
    }, [crewPositionStatus])

    useEffect(() => {
        let timeout
        if (crewPositionModifierStatus === 'success') {
            timeout = setTimeout(() => {
                setCrewPositionModifierStatus('')
            }, 5000)
        }
        return () => clearTimeout(timeout)
    }, [crewPositionModifierStatus])

    useEffect(() => {
        let timeout
        if (assignedUnitStatus === 'success') {
            timeout = setTimeout(() => {
                setAssignedUnitStatus('')
            }, 5000)
        }
        return () => clearTimeout(timeout)
    }, [assignedUnitStatus])

    // Clear status upon input change
    useEffect(() => {
        setRankStatus('')
    }, [rank])

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
            <Grid container>
                <Grid size={{xs: 12, md: 2, lg: 2}} sx={{p: 2, height: '8rem'}}>
                    <FormControl fullWidth>
                        <InputLabel id="rank-select-label">Rank</InputLabel>
                        <Select
                            labelId="rank-select-label"
                            id="rank-select"
                            value={rank}
                            label="Rank"
                            onChange={e => setRank(e.target.value)}
                            error={rankStatus === 'error'}
                            variant="outlined"
                        >
                            <MenuItem value={'-1'} disabled>Select a Rank</MenuItem>
                            <MenuItem value={'OR-1'}>OR-1</MenuItem>
                            <MenuItem value={'OR-2'}>OR-2</MenuItem>
                            <MenuItem value={'OR-3'}>OR-3</MenuItem>
                            <MenuItem value={'OR-4'}>OR-4</MenuItem>
                            <MenuItem value={'OR-5'}>OR-5</MenuItem>
                            <MenuItem value={'OR-6'}>OR-6</MenuItem>
                            <MenuItem value={'OR-7'}>OR-7</MenuItem>
                            <MenuItem value={'OR-8'}>OR-8</MenuItem>
                            <MenuItem value={'OR-9'}>OR-9</MenuItem>
                            <MenuItem value={'-2'} disabled>-</MenuItem>
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
                        <FormHelperText sx={{color: 'primary.main'}}>
                            {
                                rankStatus === 'error' ? 'Failed to save!' :
                                    rankStatus === 'loading' ? 'Saving...' :
                                        rankStatus === 'success' ? 'Saved!' : ''
                            }
                        </FormHelperText>
                    </FormControl>
                </Grid>
                <Grid size={{xs: 12, md: 5, lg: 5}} sx={{p: 2, height: '8rem'}}>
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
                <Grid size={{xs: 12, md: 5, lg: 5}} sx={{p: 2, height: '8rem'}}>
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
                <Grid size={{xs: 12, md: 6, lg: 2}} sx={{p: 2, height: '8rem'}}>
                    <TextField
                        id="amis-id-input"
                        label="AMIS ID"
                        variant="outlined"
                        value={session?.user?.amis_id}
                        fullWidth
                        disabled
                    />
                </Grid>
                <Grid size={{xs: 12, md: 6, lg: 3}} sx={{p: 2, height: '8rem'}}>
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
                            <MenuItem value={''} disabled>Select an Assigned Unit</MenuItem>
                            <MenuItem value={'flying_squadron_1'}>Flying Squadron 1</MenuItem>
                            <MenuItem value={'flying_squadron_2'}>Flying Squadron 2</MenuItem>
                            <MenuItem value={'aircrew_training_squadron'}>Aircrew Training Squadron</MenuItem>
                            <MenuItem value={'unassigned'}>Unassigned</MenuItem>

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
                <Grid size={{xs: 12, md: 6, lg: 4}} sx={{p: 2, height: '8rem'}}>
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
                            <MenuItem value={''} disabled>Select a Crew Position</MenuItem>
                            <MenuItem value={'pilot'}>Pilot</MenuItem>
                            <MenuItem value={'flight_engineer'}>Flight Engineer</MenuItem>
                            <MenuItem value={'tactical_director'}>Tactical Director</MenuItem>
                            <MenuItem value={'fighter_allocator'}>Fighter Allocator</MenuItem>
                            <MenuItem value={'weapons_controller'}>Weapons Controller</MenuItem>
                            <MenuItem value={'fighter_allocator_weapons_controller'}>Fighter Allocator / Weapons
                                Controller</MenuItem>
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
                <Grid size={{xs: 12, md: 6, lg: 3}} sx={{p: 2, height: '8rem'}}>
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
                            <MenuItem value={''} disabled>Select a Crew Position Modifier</MenuItem>
                            <MenuItem value={'basic'}>Basic</MenuItem>
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
    )
}
