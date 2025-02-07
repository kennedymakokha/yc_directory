'use client' // Error boundaries must be Client Components

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.log(error)
  }, [error])
  console.log(error)
  return (
    <div className='w-full h-full bg-gray-300 flex items-center justify-center flex-col'>
      <h2 className='tracking-widest '>Something went wrong!</h2><br />
      {/* <h2>{error}</h2> */}
      <button className=' rounded-sm  tracking-widest shadow-sm bg-primary px-4 py-2 flex items-center text-white  font-bold  '
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >

        Try again
      </button>
    </div>
  )
}