import {Box, useTheme} from '@mui/material';

export default function WorksheetTableBox({
                                              theme = useTheme(),
                                              color = (theme.palette.getContrastText(theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[200])),
                                              backgroundColor = (theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[100]),
                                              borderRight = false,
                                              borderColor = (theme.palette.mode === 'dark' ? '#111' : '#333'),
                                              justifyContent = '',
                                              children,
                                          }) {

    return (<Box
        display="flex"
        alignItems="center"
        justifyContent={justifyContent}
        height="100%"
        sx={{
            backgroundColor: {backgroundColor}, color: {color}, borderRight: borderRight ? `2px solid ${borderColor}` : 'none',
        }}
    >
        {children}
    </Box>);
}
