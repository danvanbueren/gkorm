'use client';

import LandingPage from "@/components/pages/LandingPage";
import {useSpaRouter} from "@/context/SpaRouter";
import MissionPage from "@/components/pages/MissionPage";

export default function AppPage() {

    const {currentPath} = useSpaRouter();

    const routeContent = {
        '/': <LandingPage/>,
        '/mission/x': <MissionPage/>,
        '/mission/x/planning': <MissionPage requestedView={'planning'}/>,
        '/mission/x/pilot': <MissionPage requestedView={'pilot'}/>,
        '/mission/x/execution': <MissionPage requestedView={'execution'}/>,
        '/mission/x/personal': <MissionPage requestedView={'personal'}/>,
        '/mission/x/crewlist': <MissionPage requestedView={'crewlist'}/>,
    }

    return (
        <>
            {routeContent[currentPath]}
        </>
    );
}
