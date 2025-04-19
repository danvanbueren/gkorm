import {Box, Container, Typography, useTheme} from "@mui/material";

export default function Worksheet({
                                      theme = useTheme(), title = 'SET TITLE PROP IN \<WORKSHEET\>', children,
                                  }) {

    const questionName = "Deviation from Established Wake-Sleep Cycle";
    const responses = [["Usual Showtime", "(0630-1159)"], ["a", ""], ["ab", "a"]];

    return (<Container maxWidth="lg">
        <Typography
            variant={'h5'}
            textAlign={'center'}
            padding={2}
            fontWeight='500'
            sx={{userSelect: 'none'}}
        >
            {title}
        </Typography>

        <Box
            sx={{
                borderRadius: '1rem',
                overflow: 'hidden',
                border: `4px solid ${theme.palette.custom.borderColor}`,
                userSelect: 'none',
            }}>

            {children}

        </Box>


    </Container>)
}