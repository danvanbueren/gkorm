'use client';

import {useMediaQuery, useTheme} from "@mui/material";
import WorksheetRowInfo from "@/components/worksheet/WorksheetRowInfo";
import WorksheetRowQuestion from "@/components/worksheet/WorksheetRowQuestion";
import Worksheet from "@/components/worksheet/Worksheet";
import WorksheetRowSignature from "@/components/worksheet/WorksheetRowSignature";

export default function DayOfMissionRiskAssessment({
                                                       theme = useTheme(),
                                                   }) {

    const isMdUp = useMediaQuery(theme.breakpoints.up('md'));

    return (
        <Worksheet title="Day of Mission Risk Assessment">
            {isMdUp ?
                <WorksheetRowInfo
                    infoMessageArray={["RISK FACTORS", "LOW", "MEDIUM", "HIGH"]}
                    fontWeight='500'
                    infoMessageBackgroundColors={[theme.palette.custom.headingBackground, theme.palette.success.main, theme.palette.warning.main, theme.palette.error.main]}
                />
                :
                <>
                    <WorksheetRowInfo
                        infoMessageArray={["RISK FACTORS"]}
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
                </>
            }


            <WorksheetRowInfo
                infoMessageArray={["Mission"]}
            />

            <WorksheetRowQuestion
                questionName="Same-Day Mission Changes"
                responses={[["No changes"], ["Minor Route / AAR", "/ Timing Changes"], ["Total Re-Planning", "Required"]]}
            />

            <WorksheetRowQuestion
                bottomBorderThickness={4}
                questionName="Aircraft Status (Airframe)"
                responses={[["FMC"], ["PMC"], ["One-Time Ferry Flight", "or FCF"]]}
            />

            <WorksheetRowInfo
                infoMessageArray={["Environment"]}
            />

            <WorksheetRowQuestion
                questionName="Take-off Weather"
                responses={[["Usable Visual Pattern"], ["At or Above", "Approach Mins"], ["Alternate Required", "(any reason)"]]}
            />

            <WorksheetRowQuestion
                questionName="De-Ice / Anti-Ice Used"
                responses={[["No"], ["Yes"], []]}
            />

            <WorksheetRowQuestion
                questionName="Thunderstorms Forecasted"
                responses={[["None"], ["Along Planned Route"], ["Within 10 NM of", "Airfield"]]}
            />

            <WorksheetRowQuestion
                questionName="BIRDTAM"
                responses={[["0 - 4"], ["5 - 6"], ["7 - 8"]]}
            />

            <WorksheetRowQuestion
                questionName="Forecast Crosswind (kts)"
                responses={[["Within Touch and Go Limits"], ["> 15"], ["> 20"]]}
            />

            <WorksheetRowQuestion
                bottomBorderThickness={4}
                questionName="Landing Weather"
                responses={[["Usable Visual Pattern"], ["At or Above Approach Mins"], []]}
            />

            <WorksheetRowInfo
                infoMessageArray={["Numbers and Types of Risk Factors", "Risk Acceptance Authority Prior to FA Signature is:", "SIGNATURE"]}
            />

            <WorksheetRowSignature
                description="Up to 3 MEDIUM risk factors"
                authority="Aircraft Commander"
                color={theme.palette.success.contrastText}
                backgroundColor={theme.palette.success.main}
                signatureData={['John Doe', 'John Doe DN: cn=John Doe, o=SoftwareSystem, ou=Editor, email=johndoe@email.com, c=IN', '2021.10.12 21:30:28 +05\'30\'']}
            />

            <WorksheetRowSignature
                description="4 MEDIUM risk factors and/or 1 HIGH risk factor"
                authority="Sq DO / CC"
                color={theme.palette.warning.contrastText}
                backgroundColor={theme.palette.warning.main}
            />

            <WorksheetRowSignature
                description="5+ MEDIUM risk factors and/or 2+ HIGH risk factors"
                authority="OWC"
                color={theme.palette.error.contrastText}
                backgroundColor={theme.palette.error.main}
                bottomBorderThickness={0}
            />
        </Worksheet>
    );
}
