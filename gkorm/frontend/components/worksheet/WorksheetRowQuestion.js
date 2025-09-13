import {Box, Grid, Skeleton, ToggleButton, ToggleButtonGroup, Typography, useMediaQuery, useTheme} from '@mui/material'
import WorksheetCellBase from "@/components/worksheet/WorksheetCellBase"
import React, {useState} from 'react'

export default function WorksheetRowQuestion({
                                                 theme = useTheme(),
                                                 bottomBorderThickness = 2,
                                                 questionName = "",
                                                 responses = [[]],
                                                 children,
                                             }) {

    const [editable, setEditable] = useState(false)

    const [responseSelection, setResponseSelection] = useState(null)

    const handleResponseSelection = (event, newResponse) => {
        if (newResponse !== null) {
            setResponseSelection(newResponse)
        }
    }

    const isMdUp = useMediaQuery(theme.breakpoints.up('md'))

    return (<Grid
        container
        sx={{
            borderBottom: bottomBorderThickness !== 0 ? `${bottomBorderThickness}px solid ${theme.palette.custom.borderColor}` : 'none',
            minHeight: '6rem',
        }}
    >
        <Grid size={{xs: 12, md: 4.5}}>
            <WorksheetCellBase
                backgroundColor={theme.palette.custom.headingBackground}
                borderRight={isMdUp && '2px solid'}
                borderBottom={!isMdUp && '2px solid'}
            >
                <Typography
                    variant={'h6'}
                    padding={2}
                    fontWeight='500'
                    sx={{userSelect: 'none'}}
                >
                    {questionName}
                </Typography>
            </WorksheetCellBase>
        </Grid>
        <Grid size={{xs: 12, md: 7.5}}>
            <Box position="relative" height="100%" width="100%">
                {/* Animated background layer */}
                {responseSelection === null && editable && (
                    <Skeleton
                        variant="rectangular"
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            zIndex: 0,
                            opacity: 0.2,
                        }}
                    />
                )}
                <ToggleButtonGroup
                    value={responseSelection}
                    exclusive
                    onChange={handleResponseSelection}
                    aria-label="text alignment"
                    fullWidth
                    sx={{height: '100%', position: 'relative', zIndex: 1}}
                >
                    {responses.length > 0 && responses.map((response, responseIndex) => {
                        const selected = responseSelection === responseIndex

                        return (
                            <Grid size={3.5} height={'100%'} width={'100%'} key={responseIndex}>
                                {response.length > 0 ?
                                    <ToggleButton
                                        disabled={!editable}
                                        value={responseIndex}
                                        sx={{
                                            height: '100%',
                                            width: '100%',
                                            borderRadius: 0,
                                            '&:hover': {
                                                boxShadow: `inset 0px 0px 10px 1px rgba(1, 1, 1, 0.5)`,
                                                borderColor: `rgba(1, 1, 1, 0.5)`,
                                            },
                                            '&.Mui-selected': {
                                                color: `${selected && responseIndex === 0 ? theme.palette.success.contrastText
                                                    : (selected && responseIndex === 1 ? theme.palette.warning.contrastText
                                                        : selected && responseIndex === 2 ? theme.palette.error.contrastText
                                                            : theme.palette.text.primary )}`,
                                                backgroundColor: `${selected && responseIndex === 0 ? theme.palette.success.main
                                                    : (selected && responseIndex === 1 ? theme.palette.warning.main
                                                        : selected && responseIndex === 2 ? theme.palette.error.main
                                                            : theme.palette.background.default )}`,
                                                '&:hover': {
                                                    backgroundColor: `${selected && responseIndex === 0 ? theme.palette.success.main
                                                        : (selected && responseIndex === 1 ? theme.palette.warning.main
                                                            : selected && responseIndex === 2 ? theme.palette.error.main
                                                                : theme.palette.background.default )}`,

                                                },
                                            },
                                        }}
                                    >
                                        {response.length > 0 && <>
                                            <Box>
                                                {response.map((line, lineIndex) => {
                                                    return (<Typography
                                                        key={`line-${responseIndex}-${lineIndex}`}
                                                        textAlign='center'
                                                    >
                                                        {line}
                                                        {selected.valueOf()}
                                                    </Typography>)
                                                })}
                                            </Box>
                                        </>}
                                    </ToggleButton> : <ToggleButton
                                        value={`disabled-${responseIndex}`}
                                        disabled
                                        sx={{
                                            height: '100%', width: '100%',
                                            backgroundColor: theme.palette.background.default,
                                        }}
                                    />}
                            </Grid>)
                    })}

                </ToggleButtonGroup>
            </Box>
        </Grid>
    </Grid>)
}
