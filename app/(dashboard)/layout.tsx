/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'

function layout({children}:any) {
  return (
    <div className='h-[100vh] w-[100vw] bg-green-200'>
      <div className="flex h-10 w-full bg-slate-300 text-xl text-green-400 items-center justify-end px-10">
        Dashboard
      </div>
{children}
    </div>
  )
}

export default layout