import {Box, Grid, Skeleton, ToggleButton, ToggleButtonGroup, Typography, useTheme} from '@mui/material';
import WorksheetCellBase from "@/components/worksheet/WorksheetCellBase";
import React from 'react';

export default function WorksheetRowQuestion({
                                                 theme = useTheme(),
                                                 bottomBorderThickness = 2,
                                                 questionName = "",
                                                 responses = [[]],
                                                 children,
                                             }) {

    const [responseSelection, setResponseSelection] = React.useState(null);

    const handleResponseSelection = (event, newResponse) => {
        if (newResponse !== null) {
            setResponseSelection(newResponse);
        }
    };

    return (<Grid
        container
        sx={{
            borderBottom: bottomBorderThickness !== 0 ? `${bottomBorderThickness}px solid ${theme.palette.custom.borderColor}` : 'none',
        }}
    >
        <Grid size={4.5}>
            <WorksheetCellBase
                backgroundColor={theme.palette.custom.headingBackground}
                borderRight={true}
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
        <Grid size={7.5}>
            <Box position="relative" height="100%" width="100%">
                {/* Animated background layer */}
                {responseSelection === null && (
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
                    sx={{ height: '100%', position: 'relative', zIndex: 1 }}
                >
                    {responses.length > 0 && responses.map((response, responseIndex) => {
                        return (<Grid size={3.5} height={'100%'} width={'100%'} key={responseIndex}>
                            {response.length > 0 ? <ToggleButton
                                value={responseIndex}
                                sx={{
                                    height: '100%',
                                    width: '100%',
                                    borderRadius: 0,
                                }}
                                color={responseIndex === 0 ? 'success' : (responseIndex === 1 ? 'warning' : 'error')}
                            >
                                {response.length > 0 && <>
                                    <Box>
                                        {response.map((line, lineIndex) => {
                                            return (<Typography
                                                key={`line-${responseIndex}-${lineIndex}`}
                                                textAlign='center'
                                            >
                                                {line}
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
                        </Grid>);
                    })}

                </ToggleButtonGroup>
            </Box>
        </Grid>
    </Grid>);
}
