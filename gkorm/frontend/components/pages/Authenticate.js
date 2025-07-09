'use client';

import {Button, TextField, Typography} from "@mui/material";
import {useAuth} from "@/context/AuthContext";
import {useState} from "react";
import {useSpaRouter} from "@/context/SpaRouter";

export default function Authenticate() {

    const { signIn } = useAuth();
    const {navigate} = useSpaRouter();
    const [amisId, setAmisId] = useState('');
    const [err, setErr] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signIn(amisId);
            navigate('/');
        } catch (e) {
            setErr(e.message);
        }
    };

    return (
        <>
            <Typography variant='h4' sx={{my: '2rem'}}>Welcome to GKORM</Typography>

            <Typography>No session found!</Typography>
            <Typography color='secondary'>Skip UUID token during fetch (DEV)</Typography>
            <Typography>Request manual entry from user</Typography>

            <Typography variant='h4' sx={{mt: '2rem'}}>Please enter your AMIS ID to create a session.</Typography>

            <TextField
                id="amis-id-login-token"
                label="AMIS ID"
                variant="outlined"
                sx={{ my: '2rem' }}
                value={amisId}
                onChange={(e) => setAmisId(e.target.value)}
            />

            <Button variant="outlined" sx={{ m: '2rem' }} onClick={handleSubmit}>
                Create session
            </Button>

            <Typography>Waiting for user input...</Typography>

            {err && <Typography color="error" sx={{ mt: '2rem' }}>{err}</Typography>}

        </>
    );
}
