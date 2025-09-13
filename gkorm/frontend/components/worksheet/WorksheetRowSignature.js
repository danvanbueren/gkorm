import {Box, Grid, Typography, useTheme} from '@mui/material'
import WorksheetCellBase from "@/components/worksheet/WorksheetCellBase"
import Signature from "@/components/utility/Signature"

export default function WorksheetRowSignature({
                                                  theme = useTheme(),
                                                  bottomBorderThickness = 2,
                                                  description = "",
                                                  authority = "",
                                                  signatureData = [],
                                                  backgroundColor,
                                                  color,
                                                  children,
                                              }) {
    return (
        <Grid
            container
            sx={{
                borderBottom: bottomBorderThickness !== 0 ? `${bottomBorderThickness}px solid ${theme.palette.custom.borderColor}` : 'none',
                minHeight: '6rem',
            }}
        >

            <Grid size={4.5}>
                <WorksheetCellBase
                    backgroundColor={theme.palette.custom.headingBackground}
                    borderRight='2px solid'
                >
                    <Typography
                        variant={'h6'}
                        padding={2}
                        fontSize={17}
                        fontWeight='500'
                        sx={{userSelect: 'none'}}
                    >
                        {description}
                    </Typography>
                </WorksheetCellBase>
            </Grid>

            <Grid size={2.5}>
                <WorksheetCellBase
                    borderRight='2px solid'
                    justifyContent={'center'}
                    backgroundColor={backgroundColor}
                    color={color}
                >
                    <Box>
                        <Typography textAlign='center'>{authority}</Typography>
                    </Box>
                </WorksheetCellBase>
            </Grid>

            <Grid size={5}>
                <WorksheetCellBase
                    justifyContent={'center'}
                    backgroundColor={theme.palette.background.default}
                >
                    { signatureData.length > 0 &&
                        <Signature
                            signatureDisplayName={signatureData[0]}
                            signatureFullName={signatureData[1]}
                            signatureDate={signatureData[2]}
                        />
                    }

                </WorksheetCellBase>
            </Grid>

        </Grid>
    )
}
