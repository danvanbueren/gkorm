/******************************************************************************
 * COPYRIGHT © 2025 DANIEL VAN BUEREN. ALL RIGHTS RESERVED.                   *
 *                                                                            *
 * THIS MATERIAL IS PROTECTED BY COPYRIGHT LAW. NO PART OF THIS WORK MAY BE   *
 * COPIED, REPRODUCED, DISTRIBUTED, TRANSMITTED, DISPLAYED, OR PERFORMED IN   *
 * ANY FORM OR BY ANY MEANS, ELECTRONIC, MECHANICAL, PHOTOCOPYING, RECORDING, *
 * OR OTHERWISE, WITHOUT PRIOR WRITTEN PERMISSION FROM THE COPYRIGHT OWNER.   *
 ******************************************************************************/

import {Box} from "@mui/material"
import {useSpaRouter} from "@/context/SpaRouter"

export default function NavPathDebugViewer() {

    const {currentPath} = useSpaRouter()
    const pathAsArray = currentPath.split("/")

    return (
        <Box position='relative'>
            <Box position='absolute' right='0' top='10rem'>
                <table style={{
                    border: '1px solid yellow',
                    borderCollapse: 'collapse',
                    background: 'black',
                    opacity: 0.5,
                    color: 'yellow'
                }}>
                    <tbody>
                    <tr style={{border: '1px solid yellow', borderCollapse: 'collapse'}}>
                        {pathAsArray.map((item, i) => {
                            return (<td key={i + '1'} style={{
                                width: '5rem',
                                border: '1px solid yellow',
                                borderCollapse: 'collapse',
                                padding: '1rem'
                            }}>{i}</td>)
                        })}
                    </tr>
                    <tr>
                        {pathAsArray.map((item, i) => {
                            return (<td key={i + '2'} style={{
                                border: '1px solid yellow',
                                borderCollapse: 'collapse',
                                padding: '1rem'
                            }}>'{item}'</td>)
                        })}
                    </tr>
                    </tbody>
                </table>
            </Box>
        </Box>
    )
}