'use client';

import * as React from 'react';
import MemberTable from "@/components/constructedWorksheets/crewList/MemberTable";
import Worksheet from "@/components/worksheet/Worksheet";
import SearchMember from "@/components/constructedWorksheets/crewList/SearchMember";

export default function CrewList() {

    return (
        <Worksheet title="Crew List">
            <MemberTable/>
            <SearchMember/>
        </Worksheet>
    )
}