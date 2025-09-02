import { useEffect } from 'react';
import {useAuth} from "@/context/AuthContext";
import {useSpaRouter} from "@/context/SpaRouter";

export const RequireAuth = ({ children }) => {
    const {session} = useAuth();
    const {navigate, currentPath} = useSpaRouter();

    useEffect(() => {
        if (!session && currentPath !== '/authenticate') {
            navigate('/authenticate')
        }

        if (session && currentPath === '/authenticate')
            navigate('/');

    }, [session]);

    if (currentPath === '/authenticate')
        return children

    if (session)
        return children

    return null
};