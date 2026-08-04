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
        <div className="main-screen flex flex-col h-full">
          <div className="header-part flex justify-between items-center h-15 flex-shrink-0">

          <div className = "page-heading text-white strong h-[100%]">
          Latest Songs
          </div>
          <div className="search">
          <input className="bg-white"
              type="text"
              placeholder="Search songs..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch()
                }
              }}
            />

            <button
              className='search-button'
              onClick={handleSearch}
            >
              <CiSearch />
            </button>
          </div>
        </div>
        <div className="online-content-part flex-1 min-h-0 overflow-y-auto">
        {loading && <p>Loading...</p>}

        {error && <p>Error: {error}</p>}

        {!loading &&
          !error &&
          homeData.map((section) => (
            <div key={section.language} className="language-section">
              <h2 className="language-title">
                {section.language}
              </h2>

              <div className="song-list flex gap-3 overflow-x-auto overflow-y-hidden">
                {section.items.map((item) =>
                  item.type === "album" ? (
                    <AlbumCard
                      key={item.id}
                      album={item}
                    />
                  ) : (
                    <Songcard
                      key={item.id}
                      song={item}
                    />
                  )
                )}
              </div>
            </div>
          ))}
      </div>

    </div>
  )
}