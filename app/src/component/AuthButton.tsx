'use client'

import { signIn, signOut, useSession } from 'next-auth/react'

export default function AuthButton() {
    const { data: session } = useSession()

    if (session) {
        return (
            <>
                Welcome {session.user?.name} <br />
                <button onClick={() => signOut()}>Sign out</button>
            </>
        )
    }
    return (
        <>
            Not signed in <br />
            <button onClick={() => signIn('github')}>Sign in with GitHub</button>
        </>
    )
}