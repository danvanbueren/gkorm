"use client";

import {RequireAuth} from "@/components/utility/RequireAuth";
import {
    DataGrid,
    FilterPanelTrigger,
    QuickFilter,
    QuickFilterClear,
    QuickFilterControl,
    ToolbarButton,
    Toolbar
} from '@mui/x-data-grid';
import {
    Box,
    Grid,
    Typography,
    Paper, styled, TextField, InputAdornment, Tooltip, IconButton,
} from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import RefreshIcon from '@mui/icons-material/Refresh';
import SyncProblemIcon from '@mui/icons-material/SyncProblem';
import NavHeader from "@/components/navigation/NavHeader";
import {useEffect, useState} from "react";

export default function MissionListPage() {

    const columns = [
        { field: 'id', headerName: 'Primary Key ID', width: 150 },
        { field: 'mission_number', headerName: 'Mission Number', width: 200 },
    ];

    const [loadingMissions, setLoadingMissions] = useState(true);
    const [apiError, setApiError] = useState();
    const [rowData, setRowData] = useState([])

    useEffect(() => {
        refreshRowData()
    }, [])

    const refreshRowData = async () => {
        //wrap this is a timeout that way it cant load forever

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);

        try {
            setApiError(null)
            setLoadingMissions(true)

            const response = await fetch('http://localhost:8000/missions/get', {
                signal: controller.signal,
            })

            if (!response.ok)
                throw new Error('Failed to fetch data - ' + response.statusText + ' -- ' + Date.now())

            const data = await response.json()
            setRowData(data.content)
        } catch (error) {
            setApiError(error.message)
        } finally {
            clearTimeout(timeoutId);
            setLoadingMissions(false)
        }
    }

    const paginationModel = { page: 0, pageSize: 5 };

    const StyledQuickFilter = styled(QuickFilter)({
        marginLeft: 'auto',
    });

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
        );
    }

    return (
        <RequireAuth>
            <Box height={'10dvh'}>
                <NavHeader/>
            </Box>
            <Grid container spacing={2} width={'100%'} height={'85dvh'}>
                <Grid size={{xs: 12, lg: 9}}>
                    <Box
                        sx={{
                            maxHeight: '80dvh',
                            overflow: 'auto',
                            padding: '1rem',
                            display: 'block',
                        }}
                    >
                        <Typography variant='h2'>Mission List</Typography>

                        <Paper variant="outlined" sx={{ height: 400, width: '100%', p: 2, mt: 2 }}>
                            <DataGrid
                                rows={rowData}
                                getRowId={(row) => row.PKEY_id}
                                columns={columns}
                                initialState={{ pagination: { paginationModel } }}
                                pageSizeOptions={[5, 10]}
                                checkboxSelection={false}
                                disableSelectionOnClick={true}
                                sx={{ border: 0 }}
                                loading={loadingMissions}
                                slots={{ toolbar: CustomToolbar }}
                                showToolbar
                            />
                        </Paper>

                    </Box>
                </Grid>
            </Grid>
        </RequireAuth>
    );
}