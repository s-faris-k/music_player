import React, { useEffect, useState } from 'react'
import { CiSearch } from "react-icons/ci"
import { useNavigate } from 'react-router-dom'

import { fetchHomeData } from "../../library/SongApis"
import { maphomeSong , mapAlbum} from '../../mappers/songMapper'


import Songcard from '../../components/SongCard'
import AlbumCard from '../../components/AlbumCard'



import './online.css'

export default function Online() {

  const [homeData, setHomeData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchText, setSearchText] = useState("")

  const navigate = useNavigate()

  const handleSearch = () => {
    if (!searchText.trim()) {
      alert("Please enter a search term.")
      return
    }

    navigate(`/search?q=${encodeURIComponent(searchText.trim())}`)
  }

  useEffect(() => {

    const loadHomeData = async () => {

      try {

        const response = await fetchHomeData()

        const mappedData = response.map((item) => ({
          language: item.language,
            items: item.items.map((entry) => {
            if (entry.type === "album") {
              return mapAlbum(entry)
            }
            // console.log(entry)
            return maphomeSong(entry)
          })
        }))

        // console.log("Mapped home data:", mappedData)
        setHomeData(mappedData)

      } catch (err) {

        console.error(err)

        setError(err?.message || String(err))

      } finally {

        setLoading(false)
      }
    }

    loadHomeData()

  }, [])

  return (
    <div className="flex h-full flex-col">
      <header className="flex flex-wrap items-center justify-between gap-4 py-4 flex-shrink-0">
        <div className="text-white text-2xl font-bold">
          Latest Songs
        </div>

        <div className="relative w-full sm:w-60">
          <input
            className="w-full rounded-full bg-white py-2 pl-4 pr-10 text-black outline-none"
            type="text"
            placeholder="Search songs..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />

          <button
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-black"
            onClick={handleSearch}
          >
            <CiSearch size={20} />
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-auto bg-[#1E2A3E] rounded-lg" >
        ...
      </div>
    </div>
  );}