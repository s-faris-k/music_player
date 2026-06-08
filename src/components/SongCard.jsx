import React from 'react'

import './songCard.css'

export default function SongCard({
  song,
  onClick
}) {

  if (!song) return null

  return (

    <div
      className='song-card'
      onClick={onClick}
    >

      <div className='song-image-container'>

        <img
          src={song.image || ''}
          alt={song.title || 'Song'}
          className='song-image'
        />

        <div className='song-overlay'>

          <h3 className='song-title'>

            {
              song.title ||
              'Unknown Title'
            }

          </h3>

          <p className='song-artists'>

            {
              song.artistNames ||
              'Unknown Artist'
            }

          </p>

        </div>

      </div>

    </div>
  )
}