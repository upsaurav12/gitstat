import { GitBranch, GitCommit, GitPullRequest } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"
import Repositories from "./Repositories"
import PullRequest from "./PullRequest"


export const mockUser = {
    name: "Saurav Upadhyay",
    login: "upsaurav12",
    avatar_url: "https://avatars.githubusercontent.com/u/1234567",
    bio: "Passionate developer | Open source enthusiast",
    location: "New Delhi, Delhi",
    public_repos: 42,
    followers: 1337,
}

export default function Page() {

    const user = mockUser
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-8">GitHub Activity Dashboard</h1>
            <div className="grid gap-6 md:grid-cols-4">
                <div className="flex flex-col items-center space-y-4">
                    <Avatar className="h-24 w-24">
                        <AvatarImage src={user.avatar_url} alt={user.name} />
                        <AvatarFallback>{user.login.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <h2 className="text-xl font-semibold">{user.name}</h2>
                    <p className="text-sm text-muted-foreground">@{user.login}</p>
                    <div className="text-sm">
                        <p>{user.bio}</p>
                        <p>{user.location}</p>
                        <p>{user.public_repos} public repos</p>
                        <p>{user.followers} followers</p>
                    </div>
                </div>
                <Card className="md:col-span-3">
                    <CardHeader>
                        <CardTitle>Activity</CardTitle>
                        <CardDescription>Your recent GitHub activity</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Tabs defaultValue="repos">
                            <TabsList className="grid w-full grid-cols-3">
                                <TabsTrigger value="repos">
                                    <GitBranch className="mr-2 h-4 w-4" />
                                    Repositories
                                </TabsTrigger>
                                <TabsTrigger value="prs">
                                    <GitPullRequest className="mr-2 h-4 w-4" />
                                    Pull Requests
                                </TabsTrigger>
                                <TabsTrigger value="commits">
                                    <GitCommit className="mr-2 h-4 w-4" />
                                    Commits
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent value="repos">
                                <Repositories />
                            </TabsContent>
                            <TabsContent value="prs">
                                <PullRequest />
                            </TabsContent>
                            <TabsContent value="commits">
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

