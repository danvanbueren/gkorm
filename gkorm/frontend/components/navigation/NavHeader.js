'use client';

import React from 'react';
import {AppBar, Toolbar, Typography, Box, Button, IconButton, Avatar, Container, MenuItem, Menu} from '@mui/material';
import {Brightness4, Brightness7} from '@mui/icons-material';
import {useTheme} from "@mui/material";
import {useColorMode} from "@/context/ThemeContext";
import nextConfig from "@/next.config.mjs";
import {useSpaRouter} from "@/context/SpaRouter";

export default function NavHeader({user = {name: 'Undefined Session'}}) {

    const {navigate} = useSpaRouter();

    const theme = useTheme();
    const colorMode = useColorMode();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box sx={{padding: '1rem'}}>
            <AppBar
                position="sticky"
                color="primary"
                elevation={4}
                sx={{
                    justifyContent: 'space-between',
                    borderRadius: '1rem',
                    padding: '0.2rem',
                }}
            >
                <Container
                    maxWidth="xl"
                >
                    <Toolbar
                        disableGutters
                        sx={{
                            justifyContent: 'space-between',
                        }}
                    >
                        {/* Logo or Title */}
                        <Button
                            size="large"
                            noWrap
                            component="a"
                            onClick={() => navigate('/')}
                            sx={{
                                mr: 2,
                                display: 'flex',
                                fontWeight: 700,
                                letterSpacing: '.1rem',
                                color: 'inherit',
                                textDecoration: 'none',
                                userSelect: 'none',
                            }}
                        >
                            gkorm
                        </Button>

                        <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                            {/* Links */}
                            <Box sx={{display: 'flex', gap: 2}}>
                                <Button color="inherit" onClick={() => navigate('/mission/x')}>Example
                                    Mission</Button>
                                <Button color="inherit" onClick={() => navigate('/')} disabled>Missions</Button>
                            </Box>

                            {/* Right: Theme toggle + user info */}

                            <IconButton color="inherit" onClick={colorMode.toggleColorMode}>
                                {theme.palette.mode === 'dark' ? <Brightness7/> : <Brightness4/>}
                            </IconButton>

                            <IconButton
                                id="basic-button"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                                sx={{
                                    borderRadius: 4,
                                    backgroundColor: open ? 'action.selected' : 'transparent',
                                    '&:hover': {
                                        backgroundColor: open ? 'action.selected' : 'action.hover',
                                    },
                                    color: 'inherit',
                                }}
                            >

                                <Avatar
                                    sx={{
                                        width: 32, height: 32
                                    }}
                                >
                                    {user.name[0]}
                                </Avatar>

                                <Typography
                                    variant="button"
                                    sx={{
                                        ml: 1,
                                        color: 'inherit',
                                    }}
                                >
                                    {user.name}
                                </Typography>

                            </IconButton>

                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                PaperProps={{
                                    sx: {
                                        minWidth: anchorEl ? anchorEl.clientWidth : undefined, // match button width
                                    },
                                }}
                            >
                                <MenuItem onClick={handleClose}>Options1</MenuItem>
                                <MenuItem onClick={handleClose}>Options2</MenuItem>
                                <MenuItem onClick={handleClose}>Options3</MenuItem>
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </Box>
    );
}