import {Grid, Typography, useMediaQuery, useTheme} from "@mui/material";
import WorksheetCellBase from "@/components/worksheet/WorksheetCellBase";

export default function WorksheetRowInfo({
                                             theme = useTheme(),
                                             infoMessageArray = [],
                                             infoMessageBackgroundColors = [],
                                             missionNumber = "",
                                             missionDate = "",
                                             acNameIdNumber = "",
                                             backgroundColor = theme.palette.custom.infoBackground,
                                             color = theme.palette.text.primary,
                                             bottomBorderThickness = 4,
                                             fontWeight = '800',
                                             forceEquidistant = false,
                                             forceCentered = false,
                                             children,
                                         }) {

    const topLineTextComponent = (title, content) => {
        return (<>
            <Typography variant="body1" fontWeight={fontWeight} padding={2}>
                {title}
            </Typography>
            <Typography
                variant="body1"
                sx={{
                    borderBottom: '1px solid', borderColor: 'text.primary', lineHeight: 1.5, pb: 0.25,
                }}>
                {content}
            </Typography>
        </>)
    }

    const isMdUp = useMediaQuery(theme.breakpoints.up('md'));

    return (<Grid
        container
        sx={{
            borderBottom: bottomBorderThickness !== 0 ? `${bottomBorderThickness}px solid ${theme.palette.custom.borderColor}` : 'none',
            minHeight: '4rem',
        }}
    >

        {/* Info message heading */}

        {infoMessageArray.length > 0 ? <>
            {infoMessageArray.map((value, index) => {
                return (<Grid
                    key={`info-message-${index}`}
                    size={forceEquidistant ? 12/infoMessageArray.length : index === 0 && infoMessageArray.length === 1 ? 12 : (index === 0 ? 4.5 : ((index === infoMessageArray.length - 1) && (infoMessageArray.length < 4) ? (5 - infoMessageArray.length) * 2.5 : infoMessageArray.length >= 4 ? 7.5 / (infoMessageArray.length - 1) : 7.5 / (infoMessageArray.length)))}>
                    <WorksheetCellBase
                        backgroundColor={infoMessageBackgroundColors.length > 0 ? infoMessageBackgroundColors[index] : backgroundColor === theme.palette.custom.infoBackground ? theme.palette.custom.salmonBackground : backgroundColor}
                        color={infoMessageBackgroundColors.length > 0 ? theme.palette.getContrastText(infoMessageBackgroundColors[index]) : color}

                        justifyContent={forceCentered ? 'center' : infoMessageArray.length === 1 ? 'center' : (index !== 0 ) ? 'center' : 'start'}
                        borderRight={index < infoMessageArray.length - 1 ? `2px solid` : 'none'}
                    >
                        <Typography
                            fontSize={infoMessageArray.length > 1 && '1.2rem'}
                            variant={'h6'}
                            fontWeight={fontWeight}
                            padding={1}
                            paddingX={2}
                            textAlign={(index !== 0 ) ? 'center' : 'start'}
                        >
                            {value}
                        </Typography>
                    </WorksheetCellBase>
                </Grid>)
            })}
        </> : null}

        {/* Mission number, date, name and ID */}

        {missionNumber !== '' ? <>
            <Grid size={{xs: 6, md: 4.5}}>
                <WorksheetCellBase
                    backgroundColor={backgroundColor}
                    borderRight={'2px solid'}
                    borderBottom={!isMdUp ? '2px solid' : 'none'}
                >
                    {topLineTextComponent("Mission #", missionNumber)}
                </WorksheetCellBase>
            </Grid>
        </> : null}

        {missionDate !== '' ? <>
            <Grid size={{xs: 6, md: 2.5}}>
                <WorksheetCellBase
                    backgroundColor={backgroundColor}
                    borderRight={isMdUp ? '2px solid' : 'none'}
                    borderBottom={!isMdUp ? '2px solid' : 'none'}
                >
                    {topLineTextComponent("Date", missionDate)}
                </WorksheetCellBase>
            </Grid>
        </> : null}

        {acNameIdNumber !== '' ? <>
            <Grid size={{xs: 12, md: 5}}>
                <WorksheetCellBase
                    backgroundColor={backgroundColor}
                >
                    {topLineTextComponent("AC Name, ID #", acNameIdNumber)}
                </WorksheetCellBase>
            </Grid>
        </> : null}

        {/* Error message - props not correctly assigned */}
        {infoMessageArray.length === 0 && (missionNumber === '' || missionDate === '' || acNameIdNumber === '') ? <>
            <Grid size={12}>
                <WorksheetCellBase
                    backgroundColor={theme.palette.error.main}
                >
                    <Typography
                        padding={2}
                        color={theme.palette.error.contrastText}
                    >
                        Props not assigned properly
                    </Typography>
                </WorksheetCellBase>
            </Grid>
        </> : null}
    </Grid>)
}