import React from 'react'
import './songCard.css'

export default function SongCard({ song }) {

  const artists = song.primaryArtists
    ?.map((artist) => artist.name)
    .join(', ')

  return (
    <div className='song-card'>

      <div className='song-image-container'>

        <img
          src={song.image}
          alt={song.title}
          className='song-image'
        />

        <div className='song-overlay'>
          <h3 className='song-title'>
            {song.title}
          </h3>

          <p className='song-artists'>
            {song.primaryArtists.length > 0 ? artists : 'Unknown Artist'}
          </p>
        </div>

      </div>

    </div>
  )
}