'use client';

import LandingPage from "@/components/pages/LandingPage";
import {useSpaRouter} from "@/context/SpaRouter";
import MissionPage from "@/components/pages/MissionPage";
import {AuthProvider} from "@/context/AuthContext";
import Authenticate from "@/components/pages/Authenticate";
import Profile from "@/components/pages/Profile";
import {Box} from "@mui/material";

export default function AppPage() {

    const {currentPath} = useSpaRouter();
    const pathAsArray = currentPath.split("/");

    const {navigate} = useSpaRouter();

    function checkIfMissionExists(missionNumber) {
        // replace with API call
        return missionNumber === 'x';
    }

    function ResolvePath() {

        // If array size is zero, reject
        if (pathAsArray.length < 1)
            throw new Error('Path resolution failed due to path being empty.')

        // Check first entry is hash
        if (pathAsArray[0] !== "")
            throw new Error('Tried to resolve path but no hash exists as a prefix.')

        // check which base view is requested
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

                // check if mission id exists
                if (pathAsArray[2]) {

                    // check if mission id is valid
                    if (!checkIfMissionExists(pathAsArray[2])) {
                        navigate('/')
                        return false
                    }

                    // check if requesting specific view
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
        <AuthProvider>

            <Box position='relative'>
                <Box position='absolute' left='0' top='53rem'>
                    <table style={{border: '1px solid yellow', borderCollapse: 'collapse', background: 'black', opacity: 0.5, color: 'yellow'}}>
                        <tbody>
                            <tr style={{border: '1px solid yellow', borderCollapse: 'collapse'}}>
                                {pathAsArray.map((item, i) => {
                                    return (<td key={i+'1'} style={{width: '5rem', border: '1px solid yellow', borderCollapse: 'collapse', padding: '1rem'}}>{i}</td>)
                                })}
                            </tr>
                            <tr>
                                {pathAsArray.map((item, i) => {
                                    return (<td key={i+'2'} style={{border: '1px solid yellow', borderCollapse: 'collapse', padding: '1rem'}}>'{item}'</td>)
                                })}
                            </tr>
                        </tbody>
                    </table>
                </Box>
            </Box>

            {<ResolvePath/>}
        </AuthProvider>
    );
}
