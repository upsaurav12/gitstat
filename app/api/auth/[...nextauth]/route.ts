import NextAuth from "next-auth"
import GitHubProvider from "next-auth/providers/github"

export const authOptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
            // Add scope for accessing public repos
            authorization: {
                params: {
                    scope: "repo" // This gives access to repositories
                }
            }
        }),
    ],
    callbacks: {
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.sub;
                // Add access token to session
                session.accessToken = token.accessToken;
            }
            return session;
        },
        async jwt({ token, account }) {
            // Persist the OAuth access token to the token
            if (account) {
                token.accessToken = account.access_token;
            }
            return token;
        }
    },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }