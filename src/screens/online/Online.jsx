import React, { useEffect, useState } from 'react'

import { fetchSongsByLanguages } from "../../library/SongApis"

import { mapSong } from '../../mappers/songMapper'

import Songcard from '../../components/SongCard'

import './online.css'

import { useNavigate } from 'react-router-dom'
// import { useState } from 'react'

export default function Online() {

  const [songsByLanguage, setSongsByLanguage] = useState([])

  const [loading, setLoading] = useState(true)

  const [error, setError] = useState(null)
  const [searchText, setSearchText] = useState("")

  const navigate = useNavigate()

  useEffect(() => {

    const loadSongs = async () => {

      try {

        const response = await fetchSongsByLanguages()

        const mappedData = response.map((item) => ({
          language: item.language,
          songs: item.songs.map(mapSong)
        }))

        setSongsByLanguage(mappedData)

      } catch (err) {

        console.error(err)

        setError(err?.message || String(err))

      } finally {

        setLoading(false)
      }
    }

    loadSongs()

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
            className='search-input'
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            />

            <button
            className='search-button'
            onClick={() => {

              if (!searchText.trim()) 
                alert("Please enter a search term.")
              else
                navigate(`/search?q=${encodeURIComponent(searchText)}`)
              
            }}
          >
            Search
          </button>

          </div>
        </div>

      {loading && <p>Loading songs...</p>}

      {error && <p>Error: {error}</p>}

      {!loading && !error && (

        songsByLanguage.map((section) => (

          <div
            key={section.language}
            className='language-section'
          >

            <h2 className='language-title'>
              {section.language.charAt(0).toUpperCase() +
                section.language.slice(1)} Songs
            </h2>

            {section.songs.length > 0 ? (

              <div className='songs_list'>

                {section.songs.map((song) => (

                  <Songcard
                    key={song.id}
                    song={song}
                  />

                ))}

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