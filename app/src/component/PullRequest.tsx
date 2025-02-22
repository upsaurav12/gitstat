"use client"

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'

interface PullRequest {
    id: number
    title: string
    html_url: string
    state: string
}

const PullRequest = () => {
    /*
    const [pullRequest, setPullRequest] = useState<PullRequest[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { data: session } = useSession();

    useEffect(() => {

        async function fetchPullRequest() {
            if (!session?.accessToken) return
            setLoading(true)


            try {
                const response = await fetch('https://api.github.com/repos/nextauthjs/next-auth/pulls', {
                    headers: {
                        Authorization: `Bearer ${session.accessToken}`,
                        Accept: 'application/vnd.github.v3+json',
                    }
                })

                if (!response.ok) {
                    throw new Error('Failed to fetch pull request')
                }

                const data = await response.json()
                setPullRequest(data)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred')
            } finally {
                setLoading(false)
            }
        }


        fetchPullRequest()

    }, [session])

    if (!session) {
        return <div>Please sign in to view your pull request</div>
    }
*/

    {/*}
    if (loading) return <div>Loading pull request...</div>

    if (error) return <div>Error: {error}</div>*/}
    return (
        <div>
            <h1 className='xl'>Hello</h1>
        </div>
    );
}


export default PullRequest;