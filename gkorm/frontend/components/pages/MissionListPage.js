"use client"

import {RequireAuth} from "@/components/utility/RequireAuth"
import {
    DataGrid,
    FilterPanelTrigger,
    QuickFilter,
    QuickFilterClear,
    QuickFilterControl,
    ToolbarButton,
    Toolbar
} from '@mui/x-data-grid'
import {
    Box,
    Grid,
    Typography,
    Paper, styled, TextField, InputAdornment, Tooltip, IconButton, Button, Modal,
} from "@mui/material"
import CancelIcon from '@mui/icons-material/Cancel'
import SearchIcon from '@mui/icons-material/Search'
import FilterListIcon from '@mui/icons-material/FilterList'
import RefreshIcon from '@mui/icons-material/Refresh'
import SyncProblemIcon from '@mui/icons-material/SyncProblem'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import NavHeader from "@/components/navigation/NavHeader"
import {useEffect, useState} from "react"
import {useAlert} from "@/context/AlertProvider"
import {useAuth} from "@/context/AuthContext"
import {useSpaRouter} from "@/context/SpaRouter"

export default function MissionListPage() {

    const {navigate} = useSpaRouter()
    const {AlertData} = useAlert()
    const {session} = useAuth()

    // ALERTS - Helper function to display errors
    const errorAlert = (message) => {
        new AlertData()
            .title('Runtime Error')
            .content(message)
            .timeout(5000)
            .variant('filled')
            .severity('error')
            .add()
    }

    // MODAL - setup
    const [createMissionModalOpen, setCreateMissionModalOpen] = useState(false)
    const [createMissionModalLoading, setCreateMissionModalLoading] = useState(false)
    const [createMissionModalInputTextField, setCreateMissionModalInputTextField] = useState('')
    const missionNumberRegex = /^[A-Z]{2}[0-9]{4}[A-Z]?$/
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

    // MODAL - element
    const ModalContent = (
            <Modal
                open={createMissionModalOpen}
                onClose={() => setCreateMissionModalOpen(false)}
            >
                <Box sx={modalStyle}>
                    <Typography
                        id="modal-mission-number-title"
                        variant="h6"
                        sx={{mb: 1}}
                    >
                        Create a new mission
                    </Typography>

                    <Typography
                        id="modal-mission-number-description"
                        sx={{mb: 3}}
                        variant="subtitle2"
                        color="text.secondary"
                    >
                        Enter a unique mission number, following the format "LLNNNNX", where L: Required letter (A-Z), N: Required number (0-9), X: Optional letter (A-Z).
                    </Typography>

                    <TextField
                        id="modal-mission-number-textfield"
                        label="Mission Number"
                        variant="outlined"
                        sx={{mb: 2}}
                        fullWidth
                        value={createMissionModalInputTextField}
                        onChange={e => setCreateMissionModalInputTextField(e.target.value.replace(/[^a-z0-9]/gi, '').toUpperCase())}
                    />

                    <Grid container gap={2}>
                        <Grid size='grow'>
                            <Button
                                disabled={createMissionModalLoading || !missionNumberRegex.test(createMissionModalInputTextField)}
                                variant="contained"
                                fullWidth
                                onClick={() => createMission()}
                            >
                                Create
                            </Button>
                        </Grid>
                        <Grid size='auto'>
                            <Button
                                disabled={createMissionModalLoading}
                                variant="outlined"
                                fullWidth
                                color='error'
                                onClick={() => setCreateMissionModalOpen(false)}
                            >
                                Cancel
                            </Button>
                        </Grid>
                    </Grid>

                </Box>
            </Modal>
    )

    // TABLE - setup
    const columns = [
        {
            field: 'PKEY_id',
            headerName: 'PKEY_id',
            width: 70
        },
        {
            field: 'mission_number',
            headerName: 'Mission Number',
            width: 150
        },
        {
            field: 'execution_date',
            headerName: 'Mission Execution Date',
            width: 200,
            renderCell: (params) => (
                params.row.owner?.execution_date ?? 'None'
            )
        },
        {
            field: 'owner',
            headerName: 'Mission Custodian',
            width: 300,
            renderCell: (params) => (
                (params.row.owner?.rank ?? '') + ' ' +
                (params.row.owner?.given_name ?? '') + ' ' +
                (params.row.owner?.family_name ?? '')
            )
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 150
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 110,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderCell: (params) => (
                <Button
                    size="small"
                    variant="outlined"
                    endIcon={<OpenInNewIcon />}
                    onClick={(e) => {
                        e.stopPropagation()
                        navigate(`/mission/${params.row.PKEY_id}`)
                    }}
                >
                    Open
                </Button>
            ),
        },
    ]
    const [loadingMissions, setLoadingMissions] = useState(true)
    const [apiError, setApiError] = useState()
    const [rowData, setRowData] = useState([])

    // MODAL - API
    const createMission = async () => {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 10000)

        try {
            setCreateMissionModalLoading(true)

            if (!missionNumberRegex.test(createMissionModalInputTextField))
                throw new Error('Invalid mission number format - must be "LLNNNNX"')

            if (!session?.user?.PKEY_id)
                throw new Error('Session is invalid' + session?.user?.PKEY_id)

            const url = `http://localhost:8000/missions/add?owner_id=${session?.user?.PKEY_id}&mission_number=${createMissionModalInputTextField}`
            const response = await fetch(url, {
                method: 'POST',
                headers: {'accept': 'application/json'},
                body: JSON.stringify(''),
                signal: controller.signal,
            })

            if (!response.ok)
                throw new Error('Failed to fetch data - ' + response.statusText + ' -- ' + Date.now())

            const data = await response.json()
            setRowData( prev => [...prev, data.content])
            setCreateMissionModalOpen(false)
            setCreateMissionModalInputTextField('')
        }
        catch (error) {
            errorAlert(error.message)
        }
        finally {
            clearTimeout(timeoutId)
            setCreateMissionModalLoading(false)
        }
    }

    // TABLE - API
    const refreshRowData = async () => {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 10000)

        try {
            setApiError(null)
            setLoadingMissions(true)

            const response = await fetch('http://localhost:8000/missions/get', {
                signal: controller.signal,
            })

            if (!response.ok)
                throw new Error('Failed to fetch data - ' + response.statusText)

            const data = await response.json()
            setRowData(data.content)
        } catch (error) {
            setApiError(error.message)
            errorAlert(error.message)
        } finally {
            clearTimeout(timeoutId)
            setLoadingMissions(false)
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

    return (
        <RequireAuth>
            <Box height={'10dvh'}>
                <NavHeader/>
            </Box>
            <Box
                sx={{
                    width: '100%',
                    height: '85dvh',
                }}
            >
                <Grid
                    container
                    gap={2}
                    spacing={2}
                    sx={{
                        maxHeight: '85dvh',
                        overflow: 'auto',
                        padding: '1rem',
                    }}
                >
                    <Grid size={{xs: 12, xl: 12}}>
                        <Typography variant='h2' sx={{p: '1rem'}}>Mission List</Typography>
                    </Grid>
                    <Grid size={{xs: 12, xl: 9}}>
                        <Paper variant="outlined" sx={{ maxHeight: '65dvh', width: '100%', p: '1rem' }}>
                            <DataGrid
                                rows={rowData}
                                getRowId={(row) => row.PKEY_id}
                                columns={columns}
                                initialState={{ pagination: {paginationModel} }}
                                pageSizeOptions={[10, 20, 50, 100]}
                                loading={loadingMissions}
                                slots={{ toolbar: CustomToolbar }}
                                checkboxSelection={false}
                                disableSelectionOnClick
                                showToolbar
                            />
                        </Paper>
                    </Grid>
                    <Grid size={{xs: 12, xl: 3}}>
                        <Paper variant="outlined" sx={{ width: '100%', p: '1rem' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Typography variant='h6'>Actions</Typography>
                                <Button variant='contained' onClick={() => setCreateMissionModalOpen(true)}>Create mission</Button>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>



            {ModalContent}
        </RequireAuth>
    )
}