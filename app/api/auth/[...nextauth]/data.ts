/* eslint-disable @typescript-eslint/no-explicit-any */
// pages/api/data.ts

import type { NextApiRequest, NextApiResponse } from 'next';

// Define the type for the data you're fetching (adjust it based on the actual data structure)
interface Data {
  id: number;
  name: string;
  // add more fields depending on the actual response data
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data | { error: string }>) {
  try {
    const response = await fetch('https://api.example.com/data');

    // If the fetch fails or returns an error status, handle it here
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const data: Data = await response.json();
    
    res.status(200).json(data); // Return the fetched data
  } catch (error:any) {
    res.status(500).json({ error: `Failed to fetch data ${error}` }); // Handle errors
  }
}
