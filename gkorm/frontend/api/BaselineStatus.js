import { useEffect, useState } from 'react';

export default function BaselineStatus() {
    const [status, setStatus] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8000/status/baseline', {
            method: 'GET',
            headers: {
                'accept': 'application/json',
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => setStatus(data))
            .catch((err) => setError(err.message));
    }, []);

    if (error) return <pre>Error: {error}</pre>;
    if (!status) return <pre>Loading...</pre>;

    return (
        <div>
            <pre>Baseline Status</pre>
            <pre>{JSON.stringify(status, null, 2)}</pre>
        </div>
    );
}
