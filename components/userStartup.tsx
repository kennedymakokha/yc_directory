/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import StartupCard from './startupcard';


const UserStartup = async ({ id }: any) => {

  const result = await fetch(`http://localhost:8000/api/v1/startup/author/${id}`)

  if (!result.ok) {
    throw new Error('Failed to fetch data');
  }

  const startup = await result.json()
  const startupdetail = startup.startUp
  // console.log(startupdetail[0])
  // for (let index = 0; index < startupdetail.length; index++) {
  //   const element = startupdetail[index];


  // }
  console.log(startupdetail[0])
  return (
    <>
      <StartupCard post={startupdetail[0]} />
      {startupdetail.map(({ data,i }: any) => (
        <StartupCard key={i} post={startupdetail[0]} />
        // <StartupCard key={data._id} post={} />
      ))}

    </>
  )
}

export default UserStartup