import { auth } from '@/auth'
import StartupForm from '@/components/startupForm'
import { redirect } from 'next/navigation'
import React from 'react'

const page = async() => {
    const session = await auth()
    if (!session) {
        redirect('/')
    }
    return (
        <>
            <section className="pink_container !min-h-[10px] !h-14  !justify-center  !items-end !px-20">
                <h1 className="heading !h-10 !text-sm !bg-slate-300 !rounded-md !text-black">Submit New startUp </h1>
            </section>
            <StartupForm />
        </>
    )
}

export default page