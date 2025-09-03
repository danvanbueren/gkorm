'use client'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@fontsource/roboto-mono/400.css';
import '@fontsource/roboto-mono/700.css';
import ThemeContextProvider from "@/context/ThemeContext";
import ClassificationContainer from "@/components/utility/ClassificationContainer";
import {SpaRouterProvider} from "@/context/SpaRouter";
import {AuthProvider} from "@/context/AuthContext";
import AlertProvider from "@/context/AlertProvider";

function SafeHydrate({ children }) {
    return (
        <div suppressHydrationWarning>
            {children}
        </div>
    )
}

export default function RootLayout({children}) {

    return (
        <html lang="en">
        <head>
            <meta name="viewport" content="initial-scale=1, width=device-width"/>
            <title>gkorm</title>
        </head>
        <body style={{fontFamily: 'Roboto, sans-serif'}}>
        <SafeHydrate>
            <SpaRouterProvider>
                <ThemeContextProvider>
                    <main>
                        <ClassificationContainer classificationText='UNCLASSIFIED' textColor="#fff" backgroundColor='#007a33'>
                            <AuthProvider>
                                <AlertProvider>
                                    {children}
                                </AlertProvider>
                            </AuthProvider>
                        </ClassificationContainer>
                    </main>
                </ThemeContextProvider>
            </SpaRouterProvider>
        </SafeHydrate>
        </body>
        </html>
    );
}
