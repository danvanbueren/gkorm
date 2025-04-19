import {Box, Grid, Typography, useTheme} from '@mui/material';
import WorksheetCellBase from "@/components/worksheet/WorksheetCellBase";
import WorksheetCellButton from "@/components/worksheet/WorksheetCellButton";
import React from 'react';

export default function WorksheetRowQuestion({
                                                 theme = useTheme(),
                                                 bottomBorderThickness = 2,
                                                 questionName = "",
                                                 responses = [[]],
                                                 children,
                                             }) {

    const [selectedResponse, setSelectedResponse] = React.useState(null);

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

        {responses.length > 0 && responses.map((response, responseIndex) => {
            return (<Grid
                key={responseIndex}
                size={7.5 / responses.length}
                sx={{
                    ':hover': {
                        cursor: response.length > 0 ? 'pointer' : 'auto',
                    },
                }}
                onClick={() => response.length > 0 && setSelectedResponse(responseIndex)}
            >
                <WorksheetCellButton
                    borderRight={responseIndex < responses.length - 1}
                    justifyContent={'center'}
                    selected={selectedResponse === responseIndex}
                >
                    {response.length > 0 && <>
                        <Box>
                            {response.map((line, lineIndex) => {
                                return (<Typography
                                    key={`line-${responseIndex}-${lineIndex}`}
                                    textAlign='center'
                                >
                                    {responseIndex} / {responses.length} || {line}
                                </Typography>)
                            })}
                        </Box>
                    </>}

                </WorksheetCellButton>


            </Grid>);
        })}

    </Grid>);
}
