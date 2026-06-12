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
    <div className='screen-container'>

      <div className='online-content'>

        <div className='header'>

          <h1>Latest Songs</h1>

          <div className='search-container'>

            <input
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

        {loading && <p>Loading songs...</p>}

        {error && <p>Error: {error}</p>}

        {!loading && !error && (

          homeData.map((section) => (

            <div
              key={section.language}
              className='language-section'
            >

              <h2 className='language-title'>
                {section.language.charAt(0).toUpperCase() +
                  section.language.slice(1)} Songs
              </h2>

              {section.items.length > 0 ? (

                <div className='songs_list'>

                  {section.items.map((item) =>
                  // {console.log("Rendering item:", item)},
                        item.type === "album" ? (
                          <AlbumCard
                            key={item.id}
                            album={item}
                            onClick={() => navigate(`/album/${item.id}`)}
                          />
                        ) : (
                          <Songcard
                            key={item.id}
                            song={item}
                            onClick={() => navigate(`/song/${item.id}`)}
                          />
                        )
                      )}
              

                </div>

              ) : (

                <p>No songs found.</p>

              )}

            </div>

          ))

        )}

      </div>

    </div>
  )
}