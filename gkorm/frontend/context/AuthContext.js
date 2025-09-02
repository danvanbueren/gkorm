import React, { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [session, setSession] = useState(null)

    // Load session from localStorage on mount
    useEffect(() => {
        const raw = localStorage.getItem('session')
        if (raw) setSession(JSON.parse(raw))
    }, []);

    // Save session to localStorage on change
    useEffect(() => {
        if (session) {
            localStorage.setItem('session', JSON.stringify(session))
        } else {
            localStorage.removeItem('session')
        }

        console.log("Session changed:", session)
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
        console.log("Data:", data.content)

        return {
            user: data.content,
            token: 'NO_TOKEN',
        }
    }

    // Sign in and sign out functions
    const signIn = async (amisId) => {
        const newSession = await callAuthApi(amisId)
        setSession(newSession)
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
        <AuthContext.Provider value={{ session, signIn, signOut, updateUserData }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) throw new Error('useAuth must be used inside AuthProvider')
    return context
};