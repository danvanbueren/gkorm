'use client';

import { Box, Typography, Button } from '@mui/material';
import Link from 'next/link';

export default function NotFound() {
    return (
        <Box
            sx={{
                height: '100dvh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                px: 2,
            }}
        >
            <Typography variant="h2" gutterBottom>
                404 - Page Not Found
            </Typography>
            <Typography variant="body1" sx={{ mb: 4 }}>
                The page you're looking for doesn’t exist or has been moved.
            </Typography>
            <Button component={Link} href="/" variant="contained">
                Go Home
            </Button>
        </Box>
    );
}