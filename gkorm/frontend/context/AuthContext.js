import React, { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [session, setSession] = useState(null)

    useEffect(() => {
        const raw = localStorage.getItem('session')
        if (raw) setSession(JSON.parse(raw))
    }, []);

    useEffect(() => {
        if (session) {
            localStorage.setItem('session', JSON.stringify(session))
        } else {
            localStorage.removeItem('session')
        }
    }, [session])

    const callAuthApi = (amisId) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (!amisId) {
                    reject(new Error('Invalid credentials'))
                }

                fetch('http://localhost:8000/auth/no_crypto/' + amisId, {
                    method: 'GET',
                    headers: {
                        'accept': 'application/json',
                    },
                })
                    .then((response) => {
                        if (!response.ok) reject(new Error(`HTTP error! Status: ${response.status}`))
                    })
                    .then((data) => {
                        resolve({
                            user: data.content,
                            token: 'NO_TOKEN',
                        })
                    })
                    .catch((err) => reject(new Error("Generic fetching error: " + err)))
            }, 1000)
        })
    }

    const signIn = async (amisId) => {
        const newSession = await callAuthApi(amisId)
        setSession(newSession)

        console.log("New session:", session)
    }

    const signOut = () => {
        setSession(null)
    }

    return (
        <AuthContext.Provider value={{ session, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) throw new Error('useAuth must be used inside AuthProvider')
    return context
};