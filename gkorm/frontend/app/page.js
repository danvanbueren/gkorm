'use client';

import {Box, Container} from "@mui/material";
import NavHeader from "@/components/navigation/NavHeader";
import {useEffect, useRef, useState} from "react";

export default function AppPage() {

    const headerRef = useRef(null);
    const [headerHeight, setHeaderHeight] = useState(0);

    useEffect(() => {
        if (typeof window !== 'undefined' && headerRef.current) {
            const observer = new ResizeObserver((entries) => {
                for (let entry of entries) {
                    setHeaderHeight(entry.contentRect.height);
                }
            });
            observer.observe(headerRef.current);
            return () => observer.disconnect();
        }
    }, []);

    return (<div>
        <main>
            <Container maxWidth="xl" sx={{ minWidth: '30rem' }}>
                <Box
                    sx={{
                        height: '100dvh', overflow: 'hidden',
                    }}
                >
                    <Box ref={headerRef}>
                        <NavHeader />
                    </Box>

                    <Box
                        sx={{
                            maxHeight: `calc(90dvh - ${headerHeight}px)`,
                            overflow: 'hidden',
                            display: 'flex',
                        }}
                    >
                        <h1>Dashboard</h1>

                    </Box>
                </Box>
            </Container>
        </main>
    </div>);
}
