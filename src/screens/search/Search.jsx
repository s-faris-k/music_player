import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'
import { searchWithKey } from "../../library/SongApis"


export default function Search() {

  const [searchParams] = useSearchParams()

  const query = searchParams.get("q")

  useEffect(() => {

  if (query) {

    searchWithKey(query)
  }

  }, [query])

  return (
    <div className='screen-container'>Search</div>
  )
}
