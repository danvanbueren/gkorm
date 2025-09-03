import {RequireAuth} from "@/components/utility/RequireAuth";
import {
    Box,
    Grid,
    Typography
} from "@mui/material";
import NavHeader from "@/components/navigation/NavHeader";

export default function MissionListPage() {
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

                        {
                        // TODO: Add a table of all missions here. Must be searchable, filterable, and sortable.
                        // Each row in the table should display the mission number, date, and AC name ID number.
                        // The table should also have a column for the mission status.
                        }
                        
                    </Box>
                </Grid>
            </Grid>
        </RequireAuth>
    );
}