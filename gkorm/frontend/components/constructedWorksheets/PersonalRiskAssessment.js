'use client'

import {useMediaQuery, useTheme} from "@mui/material"
import WorksheetRowInfo from "@/components/worksheet/WorksheetRowInfo"
import WorksheetRowQuestion from "@/components/worksheet/WorksheetRowQuestion"
import Worksheet from "@/components/worksheet/Worksheet"

export default function PersonalRiskAssessment({
                                                   theme = useTheme(),
                                               }) {

    const isMdUp = useMediaQuery(theme.breakpoints.up('md'))

    return (<Worksheet title="Personal Risk Assessment Worksheet">
            {isMdUp ? <WorksheetRowInfo
                infoMessageArray={["PERSONAL RISK FACTORS", "LOW", "MEDIUM", "HIGH"]}
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
                    infoMessageArray={["LOW", "MEDIUM", "HIGH"]}
                    fontWeight='500'
                    infoMessageBackgroundColors={[theme.palette.success.main, theme.palette.warning.main, theme.palette.error.main]}
                    forceEquidistant={true}
                    forceCentered={true}
                />
            </>}

            <WorksheetRowQuestion
                questionName="# of 12+ hr work days in the past 4 days"
                responses={[["2 or less"], ["3"], ["4"]]}
            />

            <WorksheetRowQuestion
                questionName="Days since last sortie"
                responses={[["Less than 21"], ["21 to 45"], ["More than 45"]]}
            />

            <WorksheetRowQuestion
                questionName="Total hours of sleep in the Crew Rest Period"
                responses={[["More than 6"], ["5 to 6"], ["Less than 5"]]}
            />

            <WorksheetRowQuestion
                bottomBorderThickness={4}
                questionName="Personal stress (health, relationship, finances, family, etc)"
                responses={[["Low impact"], ["Medium impact"], ["High impact"]]}
            />

            <WorksheetRowInfo
                infoMessageArray={["Numbers and Types of Risk Factors", "Notify"]}
            />

            <WorksheetRowInfo
                infoMessageArray={["2 MEDIUM risk factors and/or 1 HIGH risk factor", "Aircraft Commander"]}

                infoMessageBackgroundColors={[theme.palette.custom.headingBackground, theme.palette.custom.headingBackground]}
                bottomBorderThickness={0}
            />

        </Worksheet>)
}
