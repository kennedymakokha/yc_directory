/* eslint-disable @typescript-eslint/no-explicit-any */
import { auth } from '@/auth'
import ListStyle from '@/components/listStyle'
import { SkeletoneStartupCard } from '@/components/startupcard'
import UserStartup from '@/components/userStartup'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import React, { Suspense } from 'react'

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id
  const session: any = await auth()
  const response = await fetch(`http://localhost:8000/api/v1/author/${id}?auth=true`)

  if (!response.ok) {
    return notFound()

  }

  const post = await response.json()
  const detail = post.author

  // const parseContent = md.render(startupdetail?.pitch)
  return (
    <>
      <section className="profile_container">
        <div className="profile_card">
          <div className="profile_title">
            <h3 className="text-24-black uppercase text-center line-clamp-1">
              {detail?.name}
            </h3>
          </div>
          <Image src={detail?.image} alt="" height={220} width={220} className='profile_image' />
          <p className="text-30-etrabold mt-7 text-center">@{detail?.username}</p>
          <p className="mt-1 text-center text-14-normal">{detail?.bio}</p>
        </div>
        <div className="flex-1 flex flex-col  gap-5 lg:-mt-5">
          <div className="flex items-center flex-between  ">
            <p className="text-30-bold">
              {session?.id === id ? "Your" : "All"} Startup
            </p>
            <ListStyle />
          </div>

          <ul className="card_grid-sm">
            <Suspense fallback={<SkeletoneStartupCard />}>
              <UserStartup id={detail?._id} />
            </Suspense>

          </ul>
        </div>

      </section>

    </>
  )
}

export default Page