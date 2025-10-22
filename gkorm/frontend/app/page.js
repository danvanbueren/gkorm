/******************************************************************************
 * COPYRIGHT © 2025 DANIEL VAN BUEREN. ALL RIGHTS RESERVED.                   *
 *                                                                            *
 * THIS MATERIAL IS PROTECTED BY COPYRIGHT LAW. NO PART OF THIS WORK MAY BE   *
 * COPIED, REPRODUCED, DISTRIBUTED, TRANSMITTED, DISPLAYED, OR PERFORMED IN   *
 * ANY FORM OR BY ANY MEANS, ELECTRONIC, MECHANICAL, PHOTOCOPYING, RECORDING, *
 * OR OTHERWISE, WITHOUT PRIOR WRITTEN PERMISSION FROM THE COPYRIGHT OWNER.   *
 ******************************************************************************/

'use client'

import LandingPage from "@/components/pages/LandingPage"
import {useSpaRouter} from "@/context/SpaRouter"
import MissionPage from "@/components/pages/MissionPage"
import AuthenticatePage from "@/components/pages/AuthenticatePage"
import ProfilePage from "@/components/pages/ProfilePage"
import {useEffect} from "react"
import {useAlert} from "@/context/AlertProvider"
import {useAuth} from "@/context/AuthContext"
import MissionsPage from "@/components/pages/MissionsPage"

export default function AppPage() {

    const {navigate, currentPath} = useSpaRouter()
    const pathAsArray = currentPath.split("/")

    const {AlertData} = useAlert()
    const {session} = useAuth()

    useEffect(() => {
        if (!session)
            return

        if (
            session?.user?.rank &&
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

    }, [session])

    // TODO: Replace with API call
    const checkIfMissionExists = (missionNumber) => {
        return missionNumber !== 'x1'
    }

    const ResolvePath = () => {
        // If the array size is zero, reject
        if (pathAsArray.length < 1)
            throw new Error('Path resolution failed due to path being empty.')

        // Check if the first entry is hash
        if (pathAsArray[0] !== "")
            throw new Error('Tried to resolve path but no hash exists as a prefix.')

        // Check which base view is requested
        switch (pathAsArray[1]) {
            case '':
                return <LandingPage/>

            case 'authenticate':

                if (pathAsArray.length > 2) {
                    navigate('/authenticate')
                    return false
                }

                return <AuthenticatePage/>

            case 'profile':

                if (pathAsArray.length > 2) {
                    navigate('/profile')
                    return false
                }

                return <ProfilePage/>

            case 'missions':

                if (pathAsArray.length > 2) {
                    navigate('/missions')
                    return false
                }

                return <MissionsPage/>

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
                            case 'settings':
                                return <MissionPage requestedView={'settings'}/>
                            default:
                                navigate('/mission/' + pathAsArray[2])
                        }

                    }

                    return <MissionPage/>

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
            {/*
            Debug helper to view the current path
            <NavPathDebugViewer/>
            */}

            <ResolvePath/>
        </>
    )
}
