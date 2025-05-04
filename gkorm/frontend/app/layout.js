import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@fontsource/roboto-mono/400.css';
import '@fontsource/roboto-mono/700.css';
import ThemeContextProvider from "@/context/ThemeContext";
import ClassificationContainer from "@/components/utility/ClassificationContainer";
import {SpaRouterProvider} from "@/context/SpaRouter";

export const metadata = {
    title: "gkorm", description: "gkorm",
};

export default function RootLayout({children}) {
    return (
        <html lang="en">
        <head>
            <meta name="viewport" content="initial-scale=1, width=device-width"/>
            <title>gkorm</title>
        </head>
        <body style={{fontFamily: 'Roboto, sans-serif'}}>
        <SpaRouterProvider>
            <ThemeContextProvider>
                <main>
                    <div suppressHydrationWarning>
                        <ClassificationContainer>
                            {children}
                        </ClassificationContainer>
                    </div>
                </main>
            </ThemeContextProvider>
        </SpaRouterProvider>
        </body>
        </html>
    );
}
