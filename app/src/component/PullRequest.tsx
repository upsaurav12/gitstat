"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"

interface Event {
    id: number
    title: string
    html_url: string
    created_at: string
    updated_at: string
    payload: {
        action: string
        pull_request: {
            head: {
                label: string
                ref: string
            }
        }
    }
    type: string
    body: string
}
const PullRequest = () => {
    const [events, setEvents] = useState<Event[]>([])
    const { data: session } = useSession()

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch('https://api.github.com/users/upsaurav12/events', {
                    headers: {
                        Authorization: `Bearer ${session?.accessToken}`,
                        Accept: 'application/vnd.github.v3+json',
                    },
                })

                if (!response.ok) {
                    throw new Error('Failed to fetch events')
                }

                const data = await response.json()
                const pullRequest = data.filter((event: Event) => event.type === 'PullRequestEvent')
                setEvents(pullRequest)
                console.log(pullRequest)
            } catch (err) {
                console.log(err)
            }
        }

        fetchEvents()
    }, [session])
    return (
        <div>
            {events.slice(0, 8).map((event) => (
                <li key={event.id} className="flex items-center justify-between p-4 pb-6 bg-muted rounded-lg mb-2">
                    <div>
                        <h3 className="font-semibold">{event.payload.pull_request.head.label}</h3>
                        <p className="text-sm text-muted-foreground">{event.body}</p>
                    </div>
                </li>
            ))}
        </div>
    )
}

export default PullRequest