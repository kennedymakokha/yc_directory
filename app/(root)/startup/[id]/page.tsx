import React from 'react'

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
      <section className="pink_container">
        <h1 className="heading">
          {detail.title}
        </h1>
        <p className="sub-heading !max-w-3xl">
          Submit Ideas,Vote on Pitches, and Get Noticed in Virtual Competitions.
        </p>
        {/* <SearchForm query={query} /> */}
      </section>

    </>
  )
}

export default Page