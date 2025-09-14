'use client'

import * as React from 'react'
import MemberTable from "@/components/constructedWorksheets/crewList/MemberTable"
import Worksheet from "@/components/worksheet/Worksheet"
import SearchMember from "@/components/constructedWorksheets/crewList/SearchMember"
import {Card, Typography} from "@mui/material";

export default function CrewList(props) {

    return (
        <Worksheet title="Crew List">
            <MemberTable missionPkeyId={props?.missionData?.PKEY_id}/>

                <Card sx={{m: 4, p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', borderRadius: 1}}>
                    <Typography variant="h5" component="h5">Add members</Typography>
                    <SearchMember/>
                </Card>

        </Worksheet>
    )
}