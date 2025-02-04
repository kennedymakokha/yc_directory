/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import Navbar from '../components/navbar'

function layout({children}:Readonly<{children:React.ReactNode}>) {
  return (
    <div className=' font-work-sans h-[100vh] w-[100vw] bg-green-200'>
      <Navbar/>
{children}
    </div>
  )
}

export default layout