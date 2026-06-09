import React, { useEffect, useState } from 'react'
import { CiSearch } from "react-icons/ci";


import {
  useSearchParams,
  useNavigate
} from 'react-router-dom'

import { searchWithKey } from "../../library/SongApis"

import {
  mapSearchSong,
  mapAlbum,
  mapArtist,
  mapPlaylist
} from '../../mappers/songMapper'

import Songcard from '../../components/SongCard'
import AlbumCard from '../../components/AlbumCard'
import ArtistCard from '../../components/ArtistCard'

import './search.css'

export default function Search() {

  const [searchParams] = useSearchParams()

  const navigate = useNavigate()

  const query = searchParams.get("q") || ""

  const [searchResults, setSearchResults] = useState({
    songs: [],
    albums: [],
    artists: [],
    playlists: []
  })

  const [loading, setLoading] = useState(false)

  const [error, setError] = useState(null)

  const [searchText, setSearchText] = useState(query)

  // Sync input with URL query
  useEffect(() => {

    setSearchText(query)

  }, [query])

  // Fetch search results
  useEffect(() => {

    if (!query.trim()) return

    const searchSong = async () => {

      try {

        setLoading(true)

        setError(null)

        const response = await searchWithKey(query)

        console.log("Search results:", response)

        const mappedData = {

          songs:
            response?.songs?.results?.map(mapSearchSong) || [],

          albums:
            response?.albums?.results?.map(mapAlbum) || [],

          artists:
            response?.artists?.results?.map(mapArtist) || [],

          playlists:
            response?.playlists?.results?.map(mapPlaylist) || []
        }

        setSearchResults(mappedData)

      } catch (err) {

        console.error(err)

        setError(err?.message || String(err))

      } finally {

        setLoading(false)
      }
    }

    searchSong()

  }, [query])

  const handleSearch = () => {

    if (!searchText.trim()) {

      alert("Please enter a search term.")

      return
    }

    navigate(
      `/search?q=${encodeURIComponent(searchText)}`
    )
  }

  // Empty query screen
  if (!query.trim()) {

    return (

      <div className='screen-container'>

        <div className='online-content'>

          <div className='header'>

            <h1>Search</h1>

            <div className='search-container'>

              <input
                type="text"
                placeholder="Search songs..."
                className='search-input'
                value={searchText}
                onChange={(e) =>
                  setSearchText(e.target.value)
                }
                onKeyDown={(e) => {

                  if (e.key === "Enter") {

                    handleSearch()
                  }
                }}
              />

              <CiSearch
                className='search-button'
                onClick={handleSearch}
              >
               
              </CiSearch>

            </div>

          </div>

          <div className='no-query'>

            <h2>
              Enter a search term to find songs,
              albums, artists, and playlists.
            </h2>

          </div>

        </div>

      </div>
    )
  }

  return (

    <div className='screen-container'>

      <div className='online-content'>

        {/* Header */}

        <div className='header'>

          <h1>Search</h1>

          <div className='search-container'>

            <input
              type="text"
              placeholder="Search songs..."
              className='search-input'
              value={searchText}
              onChange={(e) =>
                setSearchText(e.target.value)
              }
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
              Search
            </button>

          </div>

        </div>

        {/* Loading */}

        {loading && (

          <p>Loading songs...</p>

        )}

        {/* Error */}

        {error && (

          <p>Error: {error}</p>

        )}

        {/* Results */}

        {!loading && !error && (

          <>

            {/* Songs */}

            <div className='language-section'>

              <h2 className='language-title'>
                Songs
              </h2>

              <div className='songs_list'>

                {searchResults.songs.length > 0 ? (

                  searchResults.songs.map((song) => (

                    <Songcard
                      song={song}
                      onClick={() =>
                        navigate(`/song/${song.id}`)
                      }
                    />

                  ))

                ) : (

                  <p>No songs found.</p>

                )}

              </div>

            </div>

            {/* Albums */}

            <div className='language-section'>

              <h2 className='language-title'>
                Albums
              </h2>

              <div className='songs_list'>

                {searchResults.albums.length > 0 ? (

                  searchResults.albums.map((album) => (

                    <AlbumCard
                      key={album.id}
                      album={album}
                      onClick={() =>
                        navigate(`/album/${album.id}`)
                      }
                    />

                  ))

                ) : (

                  <p>No albums found.</p>

                )}

              </div>

            </div>

            {/* Artists */}

            <div className='language-section'>

              <h2 className='language-title'>
                Artists
              </h2>

              <div className='songs_list'>

                {searchResults.artists.length > 0 ? (

                  searchResults.artists.map((artist) => (

                    <ArtistCard
                      key={artist.id}
                      artist={artist}
                    />

                  ))

                ) : (

                  <p>No artists found.</p>

                )}

              </div>

            </div>

            {/* Playlists */}

            <div className='language-section'>

              <h2 className='language-title'>
                Playlists
              </h2>

              <div className='songs_list'>

                {searchResults.playlists.length > 0 ? (

                  searchResults.playlists.map((playlist) => (

                    <AlbumCard
                      key={playlist.id}
                      album={playlist}
                    />

                  ))

                ) : (

                  <p>No playlists found.</p>

                )}

              </div>

            </div>

          </>

        )}

      </div>

    </div>
  )
}