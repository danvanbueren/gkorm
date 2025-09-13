'use client'

import {useMediaQuery, useTheme} from "@mui/material"
import WorksheetRowInfo from "@/components/worksheet/WorksheetRowInfo"
import WorksheetRowQuestion from "@/components/worksheet/WorksheetRowQuestion"
import Worksheet from "@/components/worksheet/Worksheet"
import WorksheetRowSignature from "@/components/worksheet/WorksheetRowSignature"

export default function MissionPlanningRiskAssessment({theme = useTheme(), ...props}) {

    const isMdUp = useMediaQuery(theme.breakpoints.up('md'))

    const owner = props?.missionData?.owner
    const ownerDisplayName = `${owner?.rank} ${owner?.given_name} ${owner?.family_name}, ${owner?.amis_id}`

    return (
        <Worksheet title="Mission Planning Risk Assessment Worksheet">
            <WorksheetRowInfo
                missionNumber={props?.missionData?.mission_number}
                missionDate={props?.missionData?.execution_date}
                acNameIdNumber={ownerDisplayName}
            />

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
                infoMessageArray={["Timeline"]}
            />

            <WorksheetRowQuestion
                questionName="Deviation from Established Wake-Sleep Cycle"
                responses={[["Usual Showtime", "(0630-1159)"], ["Late Show", "(1200-1959)"], ["During Sleeping Hours", "(2000-0629)"]]}
            />

            <WorksheetRowQuestion
                bottomBorderThickness={4}
                questionName="Crew Duty Period (Hours) [Augmented]"
                responses={[["< 12", "[< 15]"], ["12 - 16", "[15 - 19]"], ["> 16", "[> 19]"]]}
            />

            <WorksheetRowInfo
                infoMessageArray={["Mission"]}
            />

            <WorksheetRowQuestion
                questionName="Special Departure Procedure"
                responses={[["N/A or MOB"], ["Any Other Location"], []]}
            />

            <WorksheetRowQuestion
                questionName="# of AAR Factors (Auto-off / Night / Limits / Students)"
                responses={[["0 - 1"], ["2 - 3"], ["≥ 4"]]}
            />

            <WorksheetRowQuestion
                questionName="Mission Complexity"
                responses={[["Familiar Mission Training", "or Assurance Measure"], ["Unfamiliar Mission Training", "or Familiar Exercise /", "Operational Mission"], ["Unfamiliar Exercise /", "Operational Mission"]]}
            />

            <WorksheetRowQuestion
                bottomBorderThickness={4}
                questionName="Weapons Activity"
                responses={[["N/A or ≤ 4vX"], ["> 4vX"], ["Control + Jamming / ≥ 8vX"]]}
            />

            <WorksheetRowInfo
                infoMessageArray={["Environment"]}
            />

            <WorksheetRowQuestion
                questionName="Mountainous Terrain (Departure and/or Arrival Airfield"
                responses={[["No"], ["Yes"], []]}
            />

            <WorksheetRowQuestion
                questionName="Air Traffic Control (Arrival and/or Departure)"
                responses={[["Terminal Radar Available"], ["Terminal Radar Not Available"], []]}
            />

            <WorksheetRowQuestion
                questionName="Night Landing (Best Available Approach)"
                responses={[["N/A or Precision"], ["Non-Precision"], ["Circling"]]}
                bottomBorderThickness={4}
            />

            <WorksheetRowInfo
                infoMessageArray={["Human Factors"]}
            />

            <WorksheetRowQuestion
                questionName="Pilot Proficiency (average)"
                responses={[["< 2"], ["2 - 4"], ["> 4"]]}
            />

            <WorksheetRowQuestion
                questionName="AC (*) Airfield Familiarity"
                responses={[["Familiar Airfield"], ["1 Prior Visit"], ["Unfamiliar Airfield"]]}
            />

            <WorksheetRowQuestion
                questionName="AAR + Transition Duration (Hours per IP)"
                responses={[["< 2"], ["2 - 4"], ["> 4"]]}
                bottomBorderThickness={4}
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
    )
}
