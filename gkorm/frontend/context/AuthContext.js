/******************************************************************************
 * COPYRIGHT © 2025 DANIEL VAN BUEREN. ALL RIGHTS RESERVED.                   *
 *                                                                            *
 * THIS MATERIAL IS PROTECTED BY COPYRIGHT LAW. NO PART OF THIS WORK MAY BE   *
 * COPIED, REPRODUCED, DISTRIBUTED, TRANSMITTED, DISPLAYED, OR PERFORMED IN   *
 * ANY FORM OR BY ANY MEANS, ELECTRONIC, MECHANICAL, PHOTOCOPYING, RECORDING, *
 * OR OTHERWISE, WITHOUT PRIOR WRITTEN PERMISSION FROM THE COPYRIGHT OWNER.   *
 ******************************************************************************/

import React, {createContext, useContext, useEffect, useState} from 'react'

const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [session, setSession] = useState(undefined)
    const [ready, setReady] = useState(false)

    // Load session from localStorage on mount
    useEffect(() => {
        try {
            const raw = localStorage.getItem('session')
            setSession(raw ? JSON.parse(raw) : null)
        } finally {
            setReady(true)
        }
    }, [])

    // Save session to localStorage on change
    useEffect(() => {
        if (session) {
            localStorage.setItem('session', JSON.stringify(session))
        } else {
            localStorage.removeItem('session')
        }
    }, [session])

    // API calls
    const callAuthApi = async (amisId) => {

        if (!amisId)
            throw new Error('Invalid credentials')

        const response = await fetch('http://localhost:8000/auth/no_crypto/' + amisId, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
            },
        })

        if (!response.ok)
            throw new Error(`HTTP error! Status: ${response.status}`)

        const data = await response.json()

        return {
            user: data.content,
            token: 'NO_TOKEN',
        }
    }

    // Sign in and sign out functions
    const signIn = async (amisId) => {
        const newSession = await callAuthApi(amisId)
        setSession(newSession)
        setReady(true)
    }

    const signOut = () => {
        setSession(null)
    }

    const updateUserData = (newUserData) => {
        setSession({
            user: newUserData,
            token: 'NO_TOKEN',
        })
    }

    return (
        <AuthContext.Provider value={{session, ready, signIn, signOut, updateUserData}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) throw new Error('useAuth must be used inside AuthProvider')
    return context
}