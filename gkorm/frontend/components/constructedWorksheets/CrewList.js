'use client'

import * as React from 'react'
import MemberTable from "@/components/constructedWorksheets/crewList/MemberTable"
import Worksheet from "@/components/worksheet/Worksheet"
import SearchMember from "@/components/constructedWorksheets/crewList/SearchMember"
import {Box} from "@mui/material"

export default function CrewList({missionData, refresh, setRefresh, ...props}) {

    return (
        <Worksheet title="Crew List">
            <MemberTable missionData={missionData} setRefresh={setRefresh} />
            <Box sx={{m: 4}}>
                <SearchMember setRefresh={setRefresh}/>
            </Box>
        </Worksheet>
    )
}