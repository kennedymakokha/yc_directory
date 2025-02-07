import React from 'react'
import Ping from './pink'
import {  after } from 'next/server'

const View = async ({ id }: { id: string }) => {
    const response = await fetch(`http://localhost:8000/api/v1/startup/${id}?views=true`)
    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }

    const post = await response.json()
    const detail = post.startUp
    const requestOptions = {
        method: "PUT", // Specify the request method
        headers: { "Content-Type": "application/json" }, // Specify the content type
        body: JSON.stringify({ views: detail?.views + 1 }) // Send the data in JSON format
    };
    after(async () => await fetch(`http://localhost:8000/api/v1/startup/${id}`, requestOptions))
    return (
        <div className='view-container'>
            <div className="absolute -top-2 -right-2">
                <Ping />
            </div>
            <p className="view-text">
                <span className="font-black">Views:{detail?.views} </span>
            </p>
        </div>
    )
}

export default View