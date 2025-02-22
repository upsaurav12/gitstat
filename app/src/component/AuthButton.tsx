'use client'

import { signIn, signOut, useSession } from 'next-auth/react'

export default function AuthButton() {
    const { data: session } = useSession()

    if (session) {
        return (
            <div className='flex justify-between items-center h-[70px] font-bold text-2xl'>
                {session.user?.name} <br />
                <button className='mr-2 text-sm font-light' onClick={() => signOut()}>Sign out</button>
            </div>
        )
    }
    return (
        <>
            Not signed in <br />
            <button onClick={() => signIn('github')}>Sign in with GitHub</button>
        </>
    )
}