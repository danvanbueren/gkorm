'use client'

import { createContext, useContext, useState, useEffect } from 'react';

const SpaRouterContext = createContext();

export const useSpaRouter = () => {
    const context = useContext(SpaRouterContext);
    if (!context) {
        throw new Error('useSpaRouter must be used within a SpaRouterProvider');
    }
    return context;
};

export const SpaRouterProvider = ({ children }) => {
    const [currentPath, setCurrentPath] = useState('');

    useEffect(() => {
        const path = window.location.hash.slice(1) || '/';
        setCurrentPath(path);
        const handleHashChange = () => {
            const newPath = window.location.hash.slice(1) || '/';
            setCurrentPath(newPath);
        };
        window.addEventListener('hashchange', handleHashChange);
        return () => {
            window.removeEventListener('hashchange', handleHashChange);
        };
    }, []);

    // Navigate to a path
    const navigate = (to) => {
        window.location.hash = to;
    };

    const value = {
        currentPath,
        navigate,
        // Helper method to check if current path matches a pattern
        isActive: (path) => currentPath === path || currentPath.startsWith(`${path}/`),
    };

    return (
        <SpaRouterContext.Provider value={value}>
            {children}
        </SpaRouterContext.Provider>
    );
};

// Route component to conditionally render children based on path
export const Route = ({ path, children }) => {
    const { currentPath } = useSpaRouter();

    // Check if current path matches this route's path
    const isMatch = path === '*' || currentPath === path ||
        (path.endsWith('/*') && currentPath.startsWith(path.slice(0, -2)));

    return isMatch ? <>{children}</> : null;
};

export default SpaRouterContext;