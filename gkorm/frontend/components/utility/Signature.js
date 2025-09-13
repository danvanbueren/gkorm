import {Box, Grid, Typography, useTheme} from '@mui/material'
import FingerprintIcon from '@mui/icons-material/Fingerprint'

export default function Signature({
                                      theme = useTheme(),
                                      signatureDisplayName = "",
                                      signatureFullName = "",
                                      signatureDate = "",
                                      backgroundColor,
                                      color,
                                      children,
                                  }) {

    const rows = 10
    const cols = 10

    const forceGreedyWrap = (text) => text.replace(/ /g, '\u00A0')

    return (<Box
        sx={{
            position: 'relative', height: '100%', width: '100%'
        }}
    >
        <Grid
            container
            sx={{
                height: "100%",
                width: "100%",
                border: `1px solid ${theme.palette.custom.borderColor}`,
                position: 'relative', // Ensure z-index works properly
                zIndex: 2,
                padding: 1,
                paddingX: 2,
                overflow: 'hidden',
            }}
        >

            <Grid
                size={6}
                height='100%'
                display='flex'
                alignItems='center'
                sx={{
                    paddingRight: 1,
                    overflow: 'hidden',
                }}
            >
                <Box>
                    <Typography
                        color={color ? color : theme.palette.text.primary}
                        fontSize={`${1.8 - 0.01 * signatureDisplayName.length}rem`}
                    >
                        {signatureDisplayName}
                    </Typography>
                </Box>
            </Grid>

            <Grid
                size={6}
                height='100%'
                display='flex'
                alignItems='center'
                justifyContent='center'
                sx={{
                    overflow: 'hidden',
                }}
            >
                <Box>

                    <Typography
                        color={color ? color : theme.palette.text.primary}
                        sx={{
                            overflowWrap: 'anywhere',
                            wordBreak: 'break-word',
                            whiteSpace: 'pre-wrap',
                            fontFamily: 'Roboto Mono',
                            fontSize: '0.5dvw',
                        }}
                    >
                        {forceGreedyWrap("Digitally signed by " + signatureFullName)}
                    </Typography>

                    <Typography
                        color={color ? color : theme.palette.text.primary}
                        sx={{
                            overflowWrap: 'anywhere',
                            wordBreak: 'break-word',
                            whiteSpace: 'pre-wrap',
                            fontFamily: 'Roboto Mono',
                            fontSize: '0.5dvw',
                        }}
                    >
                        {forceGreedyWrap("Date: " + signatureDate)}
                    </Typography>

                </Box>
            </Grid>

        </Grid>

        {signatureDisplayName === '' || signatureFullName === '' || signatureDate === '' ? <>
            <Box
                sx={{
                    position: 'absolute',
                    overflow: 'hidden',
                    width: '100%',
                    height: '100%',
                    bottom: 0,
                    left: 0,
                    zIndex: 1,
                    pointerEvents: 'none',
                    opacity: 0.2,
                    display: 'grid',
                    gridTemplateRows: `repeat(${rows}, 1fr)`,
                    gridTemplateColumns: `repeat(${cols}, 1fr)`,
                    gap: 2,
                }}
            >
                {Array.from({length: rows * cols}).map((_, i) => (
                    <Typography
                        key={i}
                        variant="caption"
                        sx={{
                            fontStyle: 'italic',
                            fontWeight: 'bold',
                            color: 'error.main',
                            fontSize: '0.9rem',
                            textAlign: 'center',
                            whiteSpace: 'nowrap',
                            transform: 'rotate(-20deg)',
                            userSelect: 'none',
                        }}
                    >
                        Invalid Signature!
                    </Typography>
                ))}
            </Box>
        </> : <>
            <Box
                sx={{
                    position: 'absolute',
                    overflow: 'hidden',
                    width: '100%',
                    height: '100%',
                    bottom: 0,
                    left: 0,
                    zIndex: 1,
                    pointerEvents: 'none',
                    opacity: 0.2,
                    display: 'grid',
                    gridTemplateRows: `repeat(${rows}, 1fr)`,
                    gridTemplateColumns: `repeat(${cols}, 1fr)`,
                    gap: 1,
                }}
            >
                {Array.from({length: rows * cols}).map((_, i) => (
                    <Typography
                        key={i}
                        variant="caption"
                        sx={{
                            fontStyle: 'italic',
                            fontWeight: 'bold',
                            color: theme.palette.success.main,
                            fontSize: '0.6rem',
                            textAlign: 'center',
                            whiteSpace: 'nowrap',
                            transform: 'rotate(-20deg)',
                            userSelect: 'none',
                        }}
                    >
                        .
                    </Typography>
                ))}
            </Box>

            <Box
                sx={{
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    overflow: 'hidden',
                    width: '100%',
                    height: '100%',
                    zIndex: 1,
                    pointerEvents: 'none',
                    opacity: 0.1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignContent: 'center',
                }}
            >
                <FingerprintIcon
                    sx={{
                        color: theme.palette.success.main,
                        fontSize: '12rem',
                        transform: 'rotate(-20deg)',
                    }}
                />
            </Box>
        </>}

        <Box
            sx={{
                position: 'absolute',
                overflow: 'hidden',
                width: '100%',
                height: '100%',
                bottom: 0,
                left: 0,
                zIndex: 0,
                backgroundColor: `${backgroundColor ? backgroundColor : (theme.palette.custom.signatureBackground)}`,
                pointerEvents: 'none',
                opacity: 1,
            }}
        >

        </Box>

    </Box>)
}
