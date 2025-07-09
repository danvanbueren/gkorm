import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [session, setSession] = useState(null);

    useEffect(() => {
        const raw = localStorage.getItem('session');
        if (raw) setSession(JSON.parse(raw));
    }, []);

    useEffect(() => {
        if (session) {
            localStorage.setItem('session', JSON.stringify(session));
        } else {
            localStorage.removeItem('session');
        }
    }, [session]);

    // Replace this with real backend call later
    const fakeAuth = (amisId) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (amisId) {
                    resolve({
                        user: { id: amisId, amisId },
                        token: 'FAKE_TOKEN',
                    });
                } else {
                    reject(new Error('Invalid credentials'));
                }
            }, 400);
        });
    };

    const signIn = async (amisId) => {
        const newSession = await fakeAuth(amisId);
        setSession(newSession);
    };

    const signOut = () => {
        setSession(null);
    };

    return (
        <AuthContext.Provider value={{ session, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
    return ctx;
};