'use client'

import * as React from 'react'
import {useEffect, useState} from "react"
import {
    Box,
    Button,
    Grid,
    TextField,
    Modal,
    Typography,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Collapse,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Tooltip, styled, InputAdornment
} from "@mui/material"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import SensorOccupiedIcon from '@mui/icons-material/SensorOccupied'
import NoteAltIcon from '@mui/icons-material/NoteAlt'
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff'
import DeleteIcon from '@mui/icons-material/Delete'
import SchoolIcon from '@mui/icons-material/School'
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule'
import AddIcon from "@mui/icons-material/Add"
import EditIcon from '@mui/icons-material/Edit'
import RefreshIcon from '@mui/icons-material/Refresh'
import {useSpaRouter} from "@/context/SpaRouter"
import {useAlert} from "@/context/AlertProvider"
import Worksheet from "@/components/worksheet/Worksheet"
import {
    DataGrid,
    FilterPanelTrigger,
    QuickFilter,
    QuickFilterClear,
    QuickFilterControl,
    ToolbarButton,
    Toolbar
} from '@mui/x-data-grid'
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";
import CancelIcon from "@mui/icons-material/Cancel";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

export default function CrewList({missionData, refresh, setRefresh, ...props}) {
    const {AlertData} = useAlert()
    const {navigate, currentPath} = useSpaRouter()
    const mission_id = currentPath.split("/")[2]

    const [modalOpen, setModalOpen] = useState(false)
    const [modalLoading, setModalLoading] = useState(false)
    const [modalPkeyId, setModalPkeyId] = useState('')
    const [modalRank, setModalRank] = useState('')
    const [modalGivenName, setModalGivenName] = useState('')
    const [modalFamilyName, setModalFamilyName] = useState('')
    const [modalAmisId, setModalAmisId] = useState('')
    const [modalAssignedUnit, setModalAssignedUnit] = useState('')
    const [modalCrewPosition, setModalCrewPosition] = useState('')
    const [modalCrewPositionModifier, setModalCrewPositionModifier] = useState('')
    const resetModal = () => {
        setModalOpen(false)
        setModalLoading(false)
        setModalPkeyId('')
        setModalRank('')
        setModalGivenName('')
        setModalFamilyName('')
        setModalAmisId('')
        setModalAssignedUnit('')
        setModalCrewPosition('')
        setModalCrewPositionModifier('')
    }
    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    }
    const modalSubmit = async () => {
        setModalLoading(true)

        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 10000)

        try {
            let url = `http://localhost:8000/users/patch/${modalPkeyId}`
            let args = '?'

            if (modalRank !== '') args += `rank=${modalRank}&`
            if (modalGivenName !== '') args += `given_name=${modalGivenName}&`
            if (modalFamilyName !== '') args += `family_name=${modalFamilyName}&`
            if (modalCrewPosition !== '') args += `crew_position=${modalCrewPosition}&`
            if (modalCrewPositionModifier !== '') args += `crew_position_modifier=${modalCrewPositionModifier}&`
            if (modalAssignedUnit !== '') args += `assigned_unit=${modalAssignedUnit}&`

            if (args !== '') url += args.slice(0, -1)

            const response = await fetch(url, {
                signal: controller.signal,
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            if (!response.ok) throw new Error('Failed to fetch data - ' + response.statusText)
            setRefresh(true)
            resetModal()
        } catch (error) {
            new AlertData()
                .title('API Error')
                .content(error.message)
                .variant('filled')
                .severity('error')
                .add()
        } finally {
            clearTimeout(timeoutId)
            setModalLoading(false)
        }
    }
    useEffect(() => {
        if (!modalOpen) resetModal()
    }, [modalOpen])
    const modalElement = (<>
        <Modal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
        >
            <Box sx={modalStyle}>
                <Typography
                    id="modal-mission-number-title"
                    variant="h6"
                    sx={{mb: 2}}
                >
                    Update user details
                </Typography>

                <TextField
                    id="modal-amis-id-textfield"
                    label="AMIS ID"
                    variant="outlined"
                    sx={{mb: 2}}
                    fullWidth
                    value={modalAmisId}
                    onChange={e => setModalAmisId(e.target.value)}
                    disabled
                />

                <FormControl fullWidth sx={{mb: 2}}>
                    <InputLabel id="modal-rank-select-label">Rank</InputLabel>
                    <Select
                        labelId="modal-rank-select-label"
                        id="modal-rank-select"
                        label="Rank"
                        variant="outlined"
                        value={modalRank}
                        onChange={e => setModalRank(e.target.value)}
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
                </FormControl>

                <TextField
                    id="modal-given-name-textfield"
                    label="Given Name"
                    variant="outlined"
                    sx={{mb: 2}}
                    fullWidth
                    value={modalGivenName}
                    onChange={e => setModalGivenName(e.target.value)}
                />

                <TextField
                    id="modal-family-name-textfield"
                    label="Family Name"
                    variant="outlined"
                    sx={{mb: 2}}
                    fullWidth
                    value={modalFamilyName}
                    onChange={e => setModalFamilyName(e.target.value)}
                />

                <FormControl fullWidth sx={{mb: 2}}>
                    <InputLabel id="modal-crew-position-select-label">Crew Position</InputLabel>
                    <Select
                        labelId="modal-crew-position-select-label"
                        id="modal-crew-position-select"
                        label="Crew Position"
                        variant="outlined"
                        value={modalCrewPosition}
                        onChange={e => setModalCrewPosition(e.target.value)}
                    >
                        <MenuItem value={''} disabled>Select a Crew Position</MenuItem>
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
                </FormControl>

                <FormControl fullWidth sx={{mb: 2}}>
                    <InputLabel id="modal-crew-position-modifier-select-label">Crew Position Modifier</InputLabel>
                    <Select
                        labelId="modal-crew-position-modifier-select-label"
                        id="modal-crew-position-modifier-select"
                        label="Crew Position Modifier"
                        variant="outlined"
                        value={modalCrewPositionModifier}
                        onChange={e => setModalCrewPositionModifier(e.target.value)}
                    >
                        <MenuItem value={''} disabled>Select a Crew Position Modifier</MenuItem>
                        <MenuItem value={'basic'}>Basic</MenuItem>
                        <MenuItem value={'link'}>Link</MenuItem>
                        <MenuItem value={'instructor'}>Instructor</MenuItem>
                        <MenuItem value={'evaluator'}>Evaluator</MenuItem>
                    </Select>
                </FormControl>

                <FormControl fullWidth sx={{mb: 2}}>
                    <InputLabel id="modal-assigned-unit-select-label">Assigned Unit</InputLabel>
                    <Select
                        labelId="modal-assigned-unit-select-label"
                        id="modal-assigned-unit-select"
                        label="Assigned Unit"
                        variant="outlined"
                        value={modalAssignedUnit}
                        onChange={e => setModalAssignedUnit(e.target.value)}
                    >
                        <MenuItem value={''} disabled>Select an Assigned Unit</MenuItem>
                        <MenuItem value={'flying_squadron_1'}>Flying Squadron 1</MenuItem>
                        <MenuItem value={'flying_squadron_2'}>Flying Squadron 2</MenuItem>
                        <MenuItem value={'aircrew_training_squadron'}>Aircrew Training Squadron</MenuItem>
                        <MenuItem value={'unassigned'}>Unassigned</MenuItem>
                    </Select>
                </FormControl>

                <Grid container gap={2}>

                    <Grid size='grow'>
                        <Button
                            disabled={modalLoading}
                            variant="contained"
                            fullWidth
                            onClick={() => modalSubmit()}
                        >
                            Update
                        </Button>
                    </Grid>

                    <Grid size='auto'>
                        <Button
                            disabled={modalLoading}
                            variant="outlined"
                            fullWidth
                            color='error'
                            onClick={() => setModalOpen(false)}
                        >
                            Cancel
                        </Button>
                    </Grid>

                </Grid>

            </Box>
        </Modal>
    </>)

    function NewMemberTable() {

        // Actions
        const editMember = async (member_id) => {
            setModalOpen(true)
            setModalLoading(true)

            const controller = new AbortController()
            const timeoutId = setTimeout(() => controller.abort(), 10000)

            try {
                const url = `http://localhost:8000/users/get/${member_id}`
                const response = await fetch(url, {
                    signal: controller.signal,
                })
                if (!response.ok) throw new Error('Failed to fetch data - ' + response.statusText)
                const data = await response.json()
                const user = data.content
                if (user?.PKEY_id) setModalPkeyId(user?.PKEY_id)
                if (user?.rank) setModalRank(user?.rank)
                if (user?.given_name) setModalGivenName(user?.given_name)
                if (user?.family_name) setModalFamilyName(user?.family_name)
                if (user?.amis_id) setModalAmisId(user?.amis_id)
                if (user?.assigned_unit) setModalAssignedUnit(user?.assigned_unit)
                if (user?.crew_position) setModalCrewPosition(user?.crew_position)
                if (user?.crew_position_modifier) setModalCrewPositionModifier(user?.crew_position_modifier)
            } catch (error) {
                resetModal()
                new AlertData()
                    .title('API Error')
                    .content(error.message)
                    .variant('filled')
                    .severity('error')
                    .add()
            } finally {
                clearTimeout(timeoutId)
                setModalLoading(false)
            }
        }
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

        // TABLE - setup
        const columns = [
            {
                field: 'user_amis_id',
                headerName: 'AMIS ID',
                flex: 1,
                valueGetter: (value, params) => params?.user?.amis_id ?? '',
            },
            {
                field: 'user_rank',
                headerName: 'Rank',
                flex: 1,
                valueGetter: (value, params) => params?.user?.rank ?? '',
            },
            {
                field: 'user_given_name',
                headerName: 'Given Name',
                flex: 2,
                valueGetter: (value, params) => params?.user?.given_name ?? '',
            },
            {
                field: 'user_family_name',
                headerName: 'Family Name',
                flex: 2,
                valueGetter: (value, params) => params?.user?.family_name ?? '',
            },
            {
                field: 'display_crew_position',
                headerName: 'Crew Position',
                flex: 3,
                valueGetter: (value, params) => {
                    const mod = params?.crew_position_modifier_override ?? params?.user?.crew_position_modifier ?? '';
                    const pos = params?.crew_position_override ?? params?.user?.crew_position ?? '';
                    return `${mod ? mod + ' ' : ''}${pos}`;
                },
            },
            {
                field: 'actions',
                headerName: 'Actions',
                sortable: false,
                filterable: false,
                disableColumnMenu: true,
                flex: 1,
                minWidth: 260,
                align: 'right',
                headerAlign: 'right',
                renderCell: (params) => (
                    <>
                        { params.row.user?.crew_position === 'pilot' &&
                            <Tooltip title="Mission Planning - Overall">
                                <IconButton onClick={() => navigate(`/mission/${mission_id}/planning`)}>
                                    <NoteAltIcon sx={{ color: 'success.main' }}/>
                                </IconButton>
                            </Tooltip>
                        }

                        { params.row.user?.crew_position === 'pilot' &&
                            <Tooltip title="Mission Planning - Pilot Proficiency">
                                <IconButton onClick={() => navigate(`/mission/${mission_id}/pilot`)}>
                                    <SchoolIcon sx={{ color: 'success.main' }}/>
                                </IconButton>
                            </Tooltip>
                        }

                        { params.row.user?.crew_position === 'pilot' &&
                            <Tooltip title="Execution - Overall">
                                <IconButton onClick={() => navigate(`/mission/${mission_id}/execution`)}>
                                    <FlightTakeoffIcon sx={{ color: 'warning.main' }}/>
                                </IconButton>
                            </Tooltip>
                        }

                        <Tooltip title="Execution - Personal">
                            <IconButton onClick={() => navigate(`/mission/${mission_id}/personal`)}>
                                <SensorOccupiedIcon sx={{ color: 'error.main' }}/>
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Edit crew member">
                            <IconButton onClick={() => {
                                editMember(params.row.user?.PKEY_id)
                            }}>
                                <EditIcon/>
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Remove crew member">
                            <IconButton onClick={() => {
                                removeMember(params.row.user?.PKEY_id)
                            }}>
                                <DeleteIcon/>
                            </IconButton>
                        </Tooltip>
                    </>
                ),
            },
        ]
        const [loadingTable, setLoadingTable] = useState(true)
        const [apiError, setApiError] = useState()
        const [rows, setRows] = useState([])

        // TABLE - API
        const refreshRowData = async () => {
            const controller = new AbortController()
            const timeoutId = setTimeout(() => controller.abort(), 10000)

            try {
                setApiError(null)
                setLoadingTable(true)

                const response = await fetch(`http://localhost:8000/missions/get/${mission_id}`, {
                    signal: controller.signal,
                })

                if (!response.ok)
                    throw new Error('Failed to fetch data - ' + response.statusText)

                const data = await response.json()
                setRows(data.content.members)
            } catch (error) {
                setApiError(error.message)
                new AlertData()
                    .title('API Error')
                    .content(error.message)
                    .variant('filled')
                    .severity('error')
                    .add()
            } finally {
                clearTimeout(timeoutId)
                setLoadingTable(false)
            }
        }

        // TABLE - Initial API fetch
        useEffect(() => {
            refreshRowData()
        }, [])

        // TABLE - Pagination state and style, quick filter styling
        const paginationModel = { page: 0, pageSize: 10 }
        const StyledQuickFilter = styled(QuickFilter)({
            marginLeft: 'auto',
        })

        // Custom toolbar with refresh, error display, filter, and search
        function CustomToolbar() {
            return (
                <Toolbar>
                    <Tooltip title="Refresh">
                        <IconButton onClick={() => {refreshRowData()}}>
                            { apiError ?
                                <SyncProblemIcon fontSize="small" color="error" /> :
                                <RefreshIcon fontSize="small" />
                            }
                        </IconButton>
                    </Tooltip>
                    <Typography variant="caption" color="error">{apiError}</Typography>
                    <StyledQuickFilter expanded>
                        <Tooltip title="Filters" sx={{mr: 1}}>
                            <FilterPanelTrigger render={<ToolbarButton />}>
                                <FilterListIcon fontSize="small" />
                            </FilterPanelTrigger>
                        </Tooltip>
                        <QuickFilterControl
                            render={({ ref, ...other }) => (
                                <TextField
                                    {...other}
                                    sx={{ width: 260 }}
                                    inputRef={ref}
                                    aria-label="Search"
                                    placeholder="Search..."
                                    size="small"
                                    slotProps={{
                                        input: {
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <SearchIcon fontSize="small" />
                                                </InputAdornment>
                                            ),
                                            endAdornment: other.value ? (
                                                <InputAdornment position="end">
                                                    <QuickFilterClear
                                                        edge="end"
                                                        size="small"
                                                        aria-label="Clear search"
                                                        material={{ sx: { marginRight: -0.75 } }}
                                                    >
                                                        <CancelIcon fontSize="small" />
                                                    </QuickFilterClear>
                                                </InputAdornment>
                                            ) : null,
                                            ...other.slotProps?.input,
                                        },
                                        ...other.slotProps,
                                    }}
                                />
                            )}
                        />
                    </StyledQuickFilter>
                </Toolbar>
            )
        }

        return (<>
            <DataGrid
                rows={rows}
                getRowId={(row) => row?.PKEY_id}
                columns={columns}
                initialState={{ pagination: {paginationModel} }}
                pageSizeOptions={[10, 20, 50, 100]}
                loading={loadingTable}
                slots={{ toolbar: CustomToolbar }}
                checkboxSelection={false}
                disableSelectionOnClick
                showToolbar
            />
        </>)
    }

    function SearchMember({setRefresh}) {
        const { AlertData } = useAlert()

        const {currentPath} = useSpaRouter()
        const mission_id = currentPath.split("/")[2]

        const [amisId, setAmisId] = useState('')
        const amisIdValid = amisId && /^[0-9]+$/.test(amisId)

        // API
        const addMemberSubmit = async () => {
            const controller = new AbortController()
            const timeoutId = setTimeout(() => controller.abort(), 10000)

            try {
                // Check if user exists
                const urlA = `http://localhost:8000/users/get/amis/${amisId}`
                const responseA = await fetch(urlA, {
                    signal: controller.signal,
                })
                if (!responseA.ok) throw new Error('Failed to fetch data - ' + responseA.statusText)
                const dataA = await responseA.json()

                let member_id = null

                if (dataA.content) {
                    member_id = dataA.content.PKEY_id
                } else {
                    const url = `http://localhost:8000/users/add?amis_id=${amisId}`
                    const response = await fetch(url, {
                        signal: controller.signal,
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    })
                    if (!response.ok) throw new Error('Failed to fetch data - ' + response.statusText)
                    const data = await response.json()
                    member_id = data.content.PKEY_id

                    resetModal()
                    setModalAmisId(data.content.amis_id)
                    setModalPkeyId(member_id)
                    setModalOpen(true)
                }

                const url = `http://localhost:8000/missions/add_member?mission_id=${mission_id}&member_id=${member_id}`
                const response = await fetch(url, {
                    signal: controller.signal,
                    method: "POST",
                })
                if (!response.ok) throw new Error('Failed to fetch data - ' + response.statusText)
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
                setAmisId('')
            }
        }

        return (<>
            <Box
                component="form"
                onSubmit={(e) => {
                    e.preventDefault()
                    if (amisIdValid) addMemberSubmit()
                }}
                sx={{
                    display: 'flex',
                    justifySelf: 'center',
                }}
            >
                <Grid container spacing={2}>
                    <Grid size={6}>
                        <TextField
                            label="AMIS ID"
                            variant="standard"
                            fullWidth
                            value={amisId}
                            onChange={e => setAmisId(e.target.value)}
                        />
                    </Grid>
                    <Grid size={6}>
                        <Button
                            variant="contained"
                            startIcon={<AddIcon/>}
                            fullWidth
                            sx={{
                                height: '2rem',
                                marginTop: '1rem',
                            }}
                            disabled={!amisIdValid}
                            onClick={addMemberSubmit}
                        >
                            Add Member
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </>)
    }

    return (<>
        <Worksheet title="Crew List">

            <Box sx={{m: 2}}>
                <NewMemberTable/>
                <Box sx={{py: 2}}>
                    <SearchMember setRefresh={setRefresh} />
                </Box>
            </Box>
            {modalElement}
        </Worksheet>
    </>)
}