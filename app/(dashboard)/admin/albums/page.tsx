import React from 'react'

async function Albums() {
    const response = await fetch("https://jsonplaceholder.typicode.com/albums")
    if(!response.ok) throw new Error("failed to fetch data")
  const albums = await response.json();
        return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols px-10 gap-2'>
        {albums.map((albums:{id:number,title:string})=>(
<div className="bg-white shadow-md rounded-lg p-4 transition flex items-center" key={albums.id}>
<h3 className="text-lg font-bold  flex ">{albums.title}</h3>
</div>
            ))}
    </div>
  )
}

export default Albums