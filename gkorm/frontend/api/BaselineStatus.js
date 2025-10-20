/******************************************************************************
 * COPYRIGHT © 2025 DANIEL VAN BUEREN. ALL RIGHTS RESERVED.                   *
 *                                                                            *
 * THIS MATERIAL IS PROTECTED BY COPYRIGHT LAW. NO PART OF THIS WORK MAY BE   *
 * COPIED, REPRODUCED, DISTRIBUTED, TRANSMITTED, DISPLAYED, OR PERFORMED IN   *
 * ANY FORM OR BY ANY MEANS, ELECTRONIC, MECHANICAL, PHOTOCOPYING, RECORDING, *
 * OR OTHERWISE, WITHOUT PRIOR WRITTEN PERMISSION FROM THE COPYRIGHT OWNER.   *
 ******************************************************************************/

import {useEffect, useState} from 'react'

export default function BaselineStatus() {
    const [status, setStatus] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetch('http://localhost:8000/status/baseline', {
            method: 'GET',
            headers: {
                'accept': 'application/json',
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`)
                }
                return response.json()
            })
            .then((data) => setStatus(data))
            .catch((err) => setError(err.message))
    }, [])

    if (error) return <pre>Error: {error}</pre>
    if (!status) return <pre>Loading...</pre>

    return (
        <div>
            <pre>Baseline Status</pre>
            <pre>{JSON.stringify(status, null, 2)}</pre>
        </div>
    )
}
