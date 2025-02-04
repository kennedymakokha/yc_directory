/* eslint-disable @typescript-eslint/no-explicit-any */
import Navbar from '@/components/navbar'
import React from 'react'


function layout({children}:Readonly<{children:React.ReactNode}>) {
  return (
    <div className=' font-work-sans h-[100vh] w-[100vw] '>
      <Navbar/>
{children}
    </div>
  )
}

export default layout