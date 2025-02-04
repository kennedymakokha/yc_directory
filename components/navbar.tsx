
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import {auth,signIn, signOut} from "@/auth"
async function Navbar() {
    const session = await  auth()
  return (
    <header className='px-10 py-3 overflow-x-hidden   bg-white shadow-sm font-work-sans'>
<nav className="flex justify-between items-center">
    <Link href="/" className=' rounded-l-full py-2 px-4 flex items-center'>
    <Image src="/logo.png" alt='logo' width={144} height={30}/>
    </Link>
    <div className="flex gap-5 items-center">
        {session&& session.user?(
            <>
            <Link href="/startup/create">
            <span>Create</span>
            </Link>
            <form
        action={async () => {
          "use server"
          await signOut({redirectTo:"/"})
        }}
      >
          <button type="submit">
              Log Out 
               </button>  
      </form>
            <Link href={`/user/${session?.user?.id}`}>
            <span>{session?.user?.name}</span>
            </Link>
            </>
        ): <form
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