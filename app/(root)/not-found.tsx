import Button from '@/components/button'
import { AlertTriangle } from 'lucide-react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className='flex items-center   justify-center flex-col w-[100vw] h-[100vh]'>
      <AlertTriangle color="red" size={210} />
      <div className="primary_button">
        <h2>Not Found</h2>
      </div>
      <p>Could not find requested resource</p>
      <Button asChild={true}  >
        <Link href="/">Return Home</Link>
      </Button>
    </div>
  )
}