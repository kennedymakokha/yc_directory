import SearchForm from "@/components/searchForm";




export default async  function Home(searchParams:{query?:string}) {
  const query = (await searchParams).query
  console.log(query)
  return (
<>
<section className="pink_container">
  <h1 className="heading">
    Pitch Your StartUp ,<br/>
    connect with Entrepreneurs
  </h1>
  <p className="sub-heading !max-w-3xl">
    Submit Ideas,Vote on Pitches, and Get Noticed in Virtual Competitions.
  </p>
  <SearchForm query={query}/>
</section>
<section className="section_container">
  <p className="text-30-semibold">
    {query?`Search results for ${query}`:"All startups"}
  </p>
</section>
</>
  );
}
