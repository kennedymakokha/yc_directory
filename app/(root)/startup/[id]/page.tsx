import { Skeleton } from '@/components/ui/skeleton'
import View from '@/components/view'
import { formatDate } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import React, { Suspense } from 'react'

export const experimental_ppr = true
const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id
  const response = await fetch(`http://localhost:8000/api/v1/startup/${id}`)
  
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  const post = await response.json()
  const detail = post.startUp
  return (
    <>
      <section className="pink_container !min-h-[230px]">
        <p className="tag">{formatDate(detail?.createdAt)}</p>
        <h1 className="heading">
          {detail?.title}
        </h1>
        <p className="sub-heading !max-w-5xl">
          {detail?.description}
        </p>
        {/* <SearchForm query={query} /> */}
      </section>
      <section className="section_container">
        <img src="/unsplash.jpg"
          alt="thumbnail"
          className="w-full h-auto rounded-xl" />
        <div className="space-y-5 mt-5 max-w-4xl mx-auto">
          <div className="flex-between gap-5">
            <Link href={`/user/${detail?.author?._id}`} className='flex gap-2 items-center mb-3'>
              <Image src='/unsplash.jpg'
                // detail?.author?.image 
                alt="avatar" height={64} width={64} className='rounded-full drop-shadow-lg' />
              <div>
                <div className="text-20-medium">{detail?.author?.name}</div>
                <div className="text-20-medium !text-black-300">@{detail?.author?.name}</div>
              </div>
            </Link>
            <p className="category-tag">
              {detail?.category}
            </p>
          </div>
          <h3 className="text-30-bold">Pitch Details</h3>
          <p className="no-result">No details provided</p>
        </div>
        <hr className="divider" />
        {/* Editor selected startups */}

        <Suspense fallback={<Skeleton className='view_skeleton' />}>
          <View id={id} />
        </Suspense>
      </section>


    </>
  )
}

export default Page