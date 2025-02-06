/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-explicit-any */
import SearchForm from "@/components/searchForm";
import StartupCard from "@/components/startupcard";




export default async function Home({ searchParams }: { searchParams: Promise<{ query: string }> }) {
  const query = (await searchParams).query

  const response = await fetch(`http://localhost:8000/api/v1/startup?search=${query===undefined?null:query}`)

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  const post = await response.json()
  const posts = post.startUp

  return (
    <>
      <section className="pink_container">
        <h1 className="heading">
          Pitch Your StartUp ,<br />
          connect with Entrepreneurs
        </h1>
        <p className="sub-heading !max-w-3xl">
          Submit Ideas,Vote on Pitches, and Get Noticed in Virtual Competitions.
        </p>
        <SearchForm query={query} />
      </section>
      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search results for "${query}"` : "All startups"}
        </p>
        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post: any) => (
              <StartupCard post={post} key={post?._id} />
            ))
          ) : <p className="no-results">No startups Found</p>}
        </ul>
      </section>
    </>
  );
}
