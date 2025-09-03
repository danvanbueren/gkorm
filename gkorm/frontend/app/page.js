'use client';

import LandingPage from "@/components/pages/LandingPage";
import {useSpaRouter} from "@/context/SpaRouter";
import MissionPage from "@/components/pages/MissionPage";
import Authenticate from "@/components/pages/Authenticate";
import Profile from "@/components/pages/Profile";
import NavPathDebugViewer from "@/components/devtools/NavPathDebugViewer";
import {useEffect, useState} from "react";
import {useAlert} from "@/context/AlertProvider";
import {useAuth} from "@/context/AuthContext";
import {Button} from "@mui/material";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

export default function AppPage() {

    const {navigate, currentPath} = useSpaRouter();
    const pathAsArray = currentPath.split("/");

    const {AlertData} = useAlert()
    const {session} = useAuth()

    useEffect(() => {
        if (!session)
            return

        if (
            session?.user?.given_name &&
            session?.user?.family_name &&
            session?.user?.assigned_unit &&
            session?.user?.crew_position &&
            session?.user?.crew_position_modifier
        )
            return

        if (currentPath === '/profile')
            return

        new AlertData()
            .title('Setup your profile')
            .content('Welcome to GKORM! Please open your Profile page with the top-right button. Then, add any missing information before continuing.')
            .variant('filled')
            .severity('info')
            .add()

    }, [session]);

    // TODO: Replace with API call
    function checkIfMissionExists(missionNumber) {
        return missionNumber === 'x';
    }

    function ResolvePath() {
        // If the array size is zero, reject
        if (pathAsArray.length < 1)
            throw new Error('Path resolution failed due to path being empty.')

        // Check if the first entry is hash
        if (pathAsArray[0] !== "")
            throw new Error('Tried to resolve path but no hash exists as a prefix.')

        // Check which base view is requested
        switch (pathAsArray[1]) {
            case '':
                return <LandingPage />

            case 'authenticate':

                if (pathAsArray.length > 2) {
                    navigate('/authenticate')
                    return false
                }

                return <Authenticate />

            case 'profile':

                if (pathAsArray.length > 2) {
                    navigate('/profile')
                    return false
                }

                return <Profile />

            case 'mission':

                // check if the mission id exists
                if (pathAsArray[2]) {

                    // check if the mission id is valid
                    if (!checkIfMissionExists(pathAsArray[2])) {
                        navigate('/')
                        return false
                    }

                    // check if requesting a specific view
                    if (pathAsArray[3]) {

                        switch (pathAsArray[3]) {
                            case 'planning':
                                return <MissionPage requestedView={'planning'}/>
                            case 'pilot':
                                return <MissionPage requestedView={'pilot'}/>
                            case 'execution':
                                return <MissionPage requestedView={'execution'}/>
                            case 'personal':
                                return <MissionPage requestedView={'personal'}/>
                            case 'crewlist':
                                return <MissionPage requestedView={'crewlist'}/>
                            default:
                                navigate('/mission/' + pathAsArray[2])
                        }

                    }

                    return <MissionPage />

                } else {
                    navigate('')
                    return false
                }
            default:
                navigate('/')
                return false
        }
    }

    return (
        <>
            <NavPathDebugViewer/>
            <ResolvePath/>
        </>
    );
}
