import React, { useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'

import { searchWithKey } from "../../library/SongApis"

import {
  mapSong,
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

  const [searchResults, setSearchResults] = React.useState({
    songs: [],
    albums: [],
    artists: [],
    playlists: [],
    topQuery: []
  })

  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState(null)
  const [searchText, setSearchText] = React.useState("")

  const query = searchParams.get("q")

  useEffect(() => {

    const searchSong = async () => {

      try {

        setLoading(true)

        const response = await searchWithKey(query)

        console.log("Search results:", response)

        const mappedData = {

          songs: response?.songs?.results?.map(mapSong) || [],

          albums: response?.albums?.results?.map(mapAlbum) || [],

          artists: response?.artists?.results?.map(mapArtist) || [],

          playlists: response?.playlists?.results?.map(mapPlaylist) || [],

          topQuery: response?.topQuery?.results || []
        }

        setSearchResults(mappedData)

      } catch (err) {

        console.error(err)

        setError(err?.message || String(err))

      } finally {

        setLoading(false)
      }
    }

    if (query) {
      searchSong()
    }

  }, [query])

  return (

    <div className='screen-container'>

      <div className='online-content'>

        <div className='header'>

          <h1>Search ..</h1>

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

                if (!searchText.trim()) {

                  alert("Please enter a search term.")

                } else {

                  navigate(`/search?q=${encodeURIComponent(searchText)}`)
                }
              }}
            >
              Search
            </button>

          </div>

        </div>

        {loading && <p>Loading songs...</p>}

        {error && <p>Error: {error}</p>}

        {!loading && !error && (

  <>
    {/* Songs Section */}
    <div className='language-section'>

      <h2 className='language-title'>
        Songs
      </h2>

      <div className='songs_list'>

        {searchResults.songs.length > 0 ? (

          searchResults.songs.map((song) => (

            <Songcard
              key={song.id}
              song={song}
            />

          ))

        ) : (

          <p>No songs found.</p>

        )}

      </div>

    </div>

    {/* Albums Section */}
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
            />

          ))

        ) : (

          <p>No albums found.</p>

        )}

      </div>

    </div>

        {/* artists section */}
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

          <p>No albums found.</p>

        )}

      </div>

    </div>
  </>

)}
  

      </div>

    </div>
  )
}