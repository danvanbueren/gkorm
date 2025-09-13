import * as React from "react"
import {useEffect, useState} from "react"
import {Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField} from "@mui/material"
import AddIcon from "@mui/icons-material/Add"

export default function SearchMember() {

    const [rankFilter, setRankFilter] = useState('')
    const [givenName, setGivenName] = useState('')
    const [familyName, setFamilyName] = useState('')
    const [amisId, setAmisId] = useState('')

    const amisIdValid = amisId && /^[0-9]+$/.test(amisId)
    const allFieldsFilled = rankFilter && givenName && familyName && amisIdValid

    // Reset rank filter on ignore
    useEffect(() => {
        if (rankFilter === 'IGNORE') {
            setRankFilter('')

            const activeElement = document.activeElement
            if (activeElement) {
                activeElement.blur()
            }
        }
    }, [rankFilter])

    return (
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

                    <FormControl variant="standard" sx={{minWidth: 120}}>
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
                        value={givenName}
                        onChange={e => setGivenName(e.target.value)}
                    />
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        label="Family Name"
                        variant="standard"
                        fullWidth
                        value={familyName}
                        onChange={e => setFamilyName(e.target.value)}
                    />
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        label="AMIS ID"
                        variant="standard"
                        fullWidth
                        value={amisId}
                        onChange={e => setAmisId(e.target.value)}
                    />
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon/>}
                        sx={{
                            height: '2rem',
                            marginTop: '1rem',
                        }}
                        disabled={!allFieldsFilled}
                    >
                        Add Member
                    </Button>
                </Grid>

            </Grid>
        </Box>
    )
}