'use client'

import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { Card, CardContent, CardTitle, CardDescription, CardHeader } from '../../../components/ui/card'

interface Repository {
    id: number
    name: string
    description: string | null
    html_url: string
}

export default function RepoList() {
    const { data: session } = useSession()
    const [repos, setRepos] = useState<Repository[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function fetchRepos() {
            if (!session?.accessToken) return

            setLoading(true)
            try {
                const response = await fetch('https://api.github.com/user/repos', {
                    headers: {
                        Authorization: `Bearer ${session.accessToken}`,
                        Accept: 'application/vnd.github.v3+json',
                    },
                })

                if (!response.ok) {
                    throw new Error('Failed to fetch repositories')
                }

                const data = await response.json()
                setRepos(data)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred')
            } finally {
                setLoading(false)
            }
        }

        fetchRepos()
    }, [session])

    if (!session) {
        return <div>Please sign in to view your repositories</div>
    }

    if (loading) return <div>Loading repositories...</div>
    if (error) return <div>Error: {error}</div>

    return (
        <div>
            <h2>Your GitHub Repositories</h2>
            {repos.length === 0 ? (
                <p>No repositories found</p>
            ) : (
                <ul className='grid grid-cols-4 w-9/12 m-auto'>
                    {repos.map((repo) => (
                        <li key={repo.id} className='w-[250px] h-[300px] border rounded-[0.74rem] mt-3'>
                            <Card className='h-full'>
                                <CardHeader>
                                    <CardTitle>
                                        {repo.name}
                                    </CardTitle>
                                </CardHeader>
                                <CardDescription>{repo.description}</CardDescription>
                            </Card>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}