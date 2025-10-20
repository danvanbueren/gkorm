/******************************************************************************
 * COPYRIGHT © 2025 DANIEL VAN BUEREN. ALL RIGHTS RESERVED.                   *
 *                                                                            *
 * THIS MATERIAL IS PROTECTED BY COPYRIGHT LAW. NO PART OF THIS WORK MAY BE   *
 * COPIED, REPRODUCED, DISTRIBUTED, TRANSMITTED, DISPLAYED, OR PERFORMED IN   *
 * ANY FORM OR BY ANY MEANS, ELECTRONIC, MECHANICAL, PHOTOCOPYING, RECORDING, *
 * OR OTHERWISE, WITHOUT PRIOR WRITTEN PERMISSION FROM THE COPYRIGHT OWNER.   *
 ******************************************************************************/

'use client'

import {createContext, useContext, useEffect, useState} from 'react'

const SpaRouterContext = createContext()

export const useSpaRouter = () => {
    const context = useContext(SpaRouterContext)
    if (!context) {
        throw new Error('useSpaRouter must be used within a SpaRouterProvider')
    }
    return context
}

export const SpaRouterProvider = ({children}) => {
    const [currentPath, setCurrentPath] = useState(() => {
        if (typeof window === 'undefined') return '/'
        return window.location.hash.slice(1) || '/'
    })

    useEffect(() => {
        const readHash = () => window.location.hash.slice(1) || '/'
        const handleHashChange = () => {
            setCurrentPath(readHash())
        }
        window.addEventListener('hashchange', handleHashChange)
        return () => {
            window.removeEventListener('hashchange', handleHashChange)
        }
    }, [])

    const navigate = (to) => {
        if (typeof window !== 'undefined')
            window.location.hash = to
    }

    const value = {
        currentPath,
        navigate,
        // Helper method to check if current path matches a pattern
        isActive: (path) => currentPath === path || currentPath.startsWith(`${path}/`),
    }

    return (
        <SpaRouterContext.Provider value={value}>
            {children}
        </SpaRouterContext.Provider>
    )
}

// Route component to conditionally render children based on path
export const Route = ({path, children}) => {
    const {currentPath} = useSpaRouter()

    // Check if current path matches this route's path
    const isMatch = path === '*' || currentPath === path ||
        (path.endsWith('/*') && currentPath.startsWith(path.slice(0, -2)))

    return isMatch ? <>{children}</> : null
}

export default SpaRouterContext
