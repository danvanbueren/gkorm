import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {useAuth} from "@/context/AuthContext";
import {useSpaRouter} from "@/context/SpaRouter";

export const RequireAuth = ({ children }) => {
    const { session } = useAuth();
    const router = useRouter();

    const {navigate} = useSpaRouter();

    useEffect(() => {
        if (!session) {
            navigate('/authenticate');
        }
    }, [session]);

    return session ? <>{children}</> : null;
};