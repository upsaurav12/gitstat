
"use client"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { GitBranch, Star } from "lucide-react"

interface Repositories {
    id: number
    name: string
    html_url: string
    description: string
}
const Repositories = () => {
    const [repositories, setRepositories] = useState<Repositories[]>([])
    const { data: session } = useSession()
    useEffect(() => {
        async function fetchRepositories() {
            if (!session?.accessToken) return

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
                setRepositories(data)
                console.log(data)
            } catch (err) {
                console.log(err)
            }
        }

        fetchRepositories()
    }, [session])
    return (
        <div>
            {repositories.slice(0, 8).map((repo) => (
                <li key={repo.id} className="flex items-center justify-between p-4 pb-6 bg-muted rounded-lg mb-2">
                    <div>
                        <h3 className="font-semibold">{repo.name}</h3>
                        <p className="text-sm text-muted-foreground">{repo.description}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <span className="flex items-center text-sm">
                            <Star className="mr-1 h-4 w-4" />
                        </span>
                        <span className="flex items-center text-sm">
                            <GitBranch className="mr-1 h-4 w-4" />
                        </span>
                    </div>
                </li>
            ))}
        </div>
    )
}

export default Repositories