import { useEffect } from 'react'
import {useAuth} from "@/context/AuthContext"
import {useSpaRouter} from "@/context/SpaRouter"

export const RequireAuth = ({ children }) => {
    const {session, ready} = useAuth()
    const {navigate, currentPath} = useSpaRouter()

    useEffect(() => {
        if (!ready) return

        if (!session && currentPath !== '/authenticate') {
            navigate('/authenticate')
        }

        if (session && currentPath === '/authenticate')
            navigate('/')

    }, [ready, session])

    if (currentPath === '/authenticate')
        return children

    if (session)
        return children

    return null
}