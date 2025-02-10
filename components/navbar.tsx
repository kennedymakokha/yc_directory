
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { auth, signIn, signOut } from "@/auth"
import { BadgePlus, LogOut } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { AvatarFallback } from '@radix-ui/react-avatar'
async function Navbar() {
  const session = await auth()
  return (
    <header className='px-10 py-3 overflow-x-hidden   bg-white shadow-sm font-work-sans'>
      <nav className="flex justify-between items-center">
        <Link href="/" className=' rounded-l-full py-2 px-4 flex items-center'>
          <Image src="/logo.png" alt='logo' width={144} height={30} />
        </Link>
        <div className="flex gap-5 items-center">
          {session && session.user ? (
            <>
              <Link href="/startup/create">
                <span className='max-sm:hidden'>Create</span>
                <BadgePlus className='size-6 sm:hidden text-red-500' />
              </Link>
              <form
                action={async () => {
                  "use server"
                  await signOut({ redirectTo: "/" })
                }}
              >
                <button type="submit">

                  <span className='max-sm:hidden'>Log Out</span>
                  <LogOut className='size-6 sm:hidden text-red-500' />
                </button>
              </form>
              <Link href={`/user/${session?.user?.id}`}>
                <Avatar className='size-10'>
                  <AvatarImage src={session?.user?.image || ""} alt={session?.user?.name || ""} />

                  <AvatarFallback>Av</AvatarFallback>
                </Avatar>
                {/* <span>{session?.user?.name}</span> */}
              </Link>
            </>
          ) : <form
            action={async () => {
              "use server"
              await signIn("github")
            }}
          >
            <button type="submit">Signin with GitHub</button>
          </form>
          }
        </div>
      </nav>
    </header>
  )
}

export default Navbar