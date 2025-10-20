'use client'

import {useMediaQuery, useTheme} from "@mui/material"
import WorksheetRowInfo from "@/components/worksheet/WorksheetRowInfo"
import WorksheetRowQuestion from "@/components/worksheet/WorksheetRowQuestion"
import Worksheet from "@/components/worksheet/Worksheet"

export default function PilotProficiencyRiskAssessment({
                                                           theme = useTheme(),
                                                       }) {

    const isMdUp = useMediaQuery(theme.breakpoints.up('md'))

    return (<Worksheet title="Pilot Proficiency Risk Assessment Worksheet">
        {isMdUp ? <WorksheetRowInfo
            infoMessageArray={["PERSONAL RISK FACTORS", "LOW (0)", "MEDIUM (1)", "HIGH (2)"]}
            fontWeight='500'
            infoMessageBackgroundColors={[theme.palette.custom.headingBackground, theme.palette.success.main, theme.palette.warning.main, theme.palette.error.main]}
        /> : <>
            <WorksheetRowInfo
                infoMessageArray={["PERSONAL RISK FACTORS"]}
                fontWeight='500'
                infoMessageBackgroundColors={[theme.palette.custom.headingBackground]}
                bottomBorderThickness={2}
            />
            <WorksheetRowInfo
                infoMessageArray={["LOW (0)", "MEDIUM (1)", "HIGH (2)"]}
                fontWeight='500'
                infoMessageBackgroundColors={[theme.palette.success.main, theme.palette.warning.main, theme.palette.error.main]}
                forceEquidistant={true}
                forceCentered={true}
            />
        </>}

        <WorksheetRowQuestion
            questionName="# sorties/FFS in last 30 days"
            responses={[["3+"], ["1 - 2"], ["0"]]}
        />

        <WorksheetRowQuestion
            questionName="# approaches in last 30 days"
            responses={[["4+"], ["2 - 3"], ["0 -1"]]}
        />

        <WorksheetRowQuestion
            questionName="# AAR events in last 30 days"
            responses={[["2+"], ["1"], ["0"]]}
            bottomBorderThickness={0}
        />

    </Worksheet>)
}
