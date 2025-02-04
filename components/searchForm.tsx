import React from 'react'
import Form from "next/form"
import SearchFormReset from './searchFormReset'
import { Search } from 'lucide-react'
const SearchForm = ({query}:{query?:string}) => {
    
  console.log(query)
  return (
    <Form action="/" scroll={false} className='search-form'>
        <input type="text" name="query" defaultValue={query}
        placeholder='Search Startups'
        className="search-input" />
        <div className="flex gap-2">
            {query && <SearchFormReset/>}
            <button type="submit" className='search-btn text-white'>
                <Search className='size-5'/>
            </button>
        </div>
        
    </Form>
  )
}

export default SearchForm