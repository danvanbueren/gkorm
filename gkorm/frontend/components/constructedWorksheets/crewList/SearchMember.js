import {useState} from "react"
import {Box, Button, Grid, TextField} from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import {useSpaRouter} from "@/context/SpaRouter";
import {useAlert} from "@/context/AlertProvider";

export default function SearchMember({setRefresh}) {

    const { AlertData } = useAlert()

    const {currentPath} = useSpaRouter()
    const mission_id = currentPath.split("/")[2]

    const [amisId, setAmisId] = useState('')
    const amisIdValid = amisId && /^[0-9]+$/.test(amisId)

    // API
    const submit = async () => {
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
                if (amisIdValid) submit()
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
                        onClick={submit}
                    >
                        Add Member
                    </Button>
                </Grid>
            </Grid>
        </Box>
    </>)
}