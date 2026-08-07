import React, { useEffect, useState } from 'react'
import { CiSearch } from "react-icons/ci"
import { useNavigate } from 'react-router-dom'

import { fetchHomeData } from "../../library/SongApis"
import { maphomeSong , mapAlbum} from '../../mappers/songMapper'


import Songcard from '../../components/SongCard'
import AlbumCard from '../../components/AlbumCard'

import { usePlayer } from "../../context/PlayerContext";




import './online.css'

export default function Online() {

  const { playSong } = usePlayer();
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
  <div className="flex h-full min-w-0 flex-col">

    {/* Header */}
    <header className="flex flex-shrink-0 flex-wrap items-center justify-between gap-4 py-4">
      <div className="text-2xl font-bold text-white">
        Latest Songs
      </div>

      {/* Search */}
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

    {/* Content */}
    <div className="flex-1 min-w-0 overflow-y-auto rounded-lg bg-[#455675] online-content pb-2">

      {loading && <p>Loading...</p>}

      {error && <p>Error: {error}</p>}

      {!loading &&
        !error &&
        homeData.map((section) => (
          <div
            key={section.language}
            className="min-w-0 pl-5 pt-2 gap-2"
          >
          <h2 className="language-title mb-2 text-white">
            {section.language}
          </h2>

            {/* Horizontal song list */}
            <div className="flex min-w-0 gap-4 overflow-x-auto overflow-y-hidden song-list">
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
                    onClick={() => playSong(item)}
                  />
                )
              )}
            </div>
          </div>
        ))}

    </div>
  </div>
)};