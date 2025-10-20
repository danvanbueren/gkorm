/******************************************************************************
 * COPYRIGHT © 2025 DANIEL VAN BUEREN. ALL RIGHTS RESERVED.                   *
 *                                                                            *
 * THIS MATERIAL IS PROTECTED BY COPYRIGHT LAW. NO PART OF THIS WORK MAY BE   *
 * COPIED, REPRODUCED, DISTRIBUTED, TRANSMITTED, DISPLAYED, OR PERFORMED IN   *
 * ANY FORM OR BY ANY MEANS, ELECTRONIC, MECHANICAL, PHOTOCOPYING, RECORDING, *
 * OR OTHERWISE, WITHOUT PRIOR WRITTEN PERMISSION FROM THE COPYRIGHT OWNER.   *
 ******************************************************************************/

import {useEffect} from 'react'
import {useAuth} from "@/context/AuthContext"
import {useSpaRouter} from "@/context/SpaRouter"

export const RequireAuth = ({children}) => {
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