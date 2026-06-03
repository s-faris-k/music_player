import React from 'react'
import './songCard.css'

export default function SongCard({ song }) {

  // console.log("Rendering SongCard for song:", song)

  if (!song) return null

  const artists = Array.isArray(song.primaryArtists)
    ? song.primaryArtists.map((artist) => artist.name).join(', ')
    : song.primaryArtists || 'Unknown Artist'

  return (

    <div className='song-card'>

      <div className='song-image-container'>

        <img
          src={song.image || ''}
          alt={song.title || 'Song'}
          className='song-image'
        />

        <div className='song-overlay'>

          <h3 className='song-title'>
            {song.title || 'Unknown Title'}
          </h3>

          <p className='song-artists'>
            {artists}
          </p>

        </div>

      </div>

    </div>
  )
}