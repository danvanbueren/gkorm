/******************************************************************************
 * COPYRIGHT © 2025 DANIEL VAN BUEREN. ALL RIGHTS RESERVED.                   *
 *                                                                            *
 * THIS MATERIAL IS PROTECTED BY COPYRIGHT LAW. NO PART OF THIS WORK MAY BE   *
 * COPIED, REPRODUCED, DISTRIBUTED, TRANSMITTED, DISPLAYED, OR PERFORMED IN   *
 * ANY FORM OR BY ANY MEANS, ELECTRONIC, MECHANICAL, PHOTOCOPYING, RECORDING, *
 * OR OTHERWISE, WITHOUT PRIOR WRITTEN PERMISSION FROM THE COPYRIGHT OWNER.   *
 ******************************************************************************/

'use client'

import {Alert, Button, TextField, Typography} from "@mui/material"
import {useAuth} from "@/context/AuthContext"
import {useState} from "react"
import {useSpaRouter} from "@/context/SpaRouter"
import SendIcon from '@mui/icons-material/Send'
import {RequireAuth} from "@/components/utility/RequireAuth"

export default function AuthenticatePage() {

    const {signIn} = useAuth()
    const {navigate} = useSpaRouter()
    const [amisId, setAmisId] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e?.preventDefault()
        setError('')
        setLoading(true)

        try {
            await signIn(amisId)
            navigate('/')
        } catch (e) {
            setError(e.message)
        }
        setLoading(false)
    }

    return (
        <RequireAuth>
            <Typography variant='h4' sx={{my: '2rem'}}>Welcome to GKORM</Typography>

            <Typography>No session found!</Typography>
            <Typography color='secondary'>Skip UUID token during fetch (DEV)</Typography>
            <Typography>Request manual entry from user</Typography>

            <Typography variant='h4' sx={{mt: '2rem'}}>Login</Typography>

            <form onSubmit={handleSubmit}>
                <TextField
                    id="amis-id-login-token"
                    label="AMIS ID"
                    variant="outlined"
                    sx={{my: '2rem'}}
                    value={amisId}
                    onChange={(e) => setAmisId(e.target.value)}
                />

                <Button
                    variant="outlined"
                    sx={{m: '2rem', height: '3.5rem'}}
                    type="submit"
                    endIcon={<SendIcon/>}
                    loading={loading}
                    loadingPosition="end"
                    disabled={!amisId}
                >
                    Create session
                </Button>
            </form>

            {!amisId && <Alert variant="filled" severity="info">Please enter an AMIS ID.</Alert>}
            {loading && <Alert variant="filled" severity="warning">Loading...</Alert>}
            {error && <Alert variant="filled" severity="error" onClose={() => {
                setError('')
            }}>{error}</Alert>}
            {(amisId && !error && !loading) &&
                <Alert variant="filled" severity="success">Ready to submit request!</Alert>}

        </RequireAuth>
    )
}
