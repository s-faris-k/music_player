import React from 'react'
import './songCard.css'

export default function ArtistCard({ artist }) {

  console.log("Rendering ArtistCard for artist:", artist)

//   const artists = song.primaryArtists
//     ?.map((artist) => artist.name)
//     .join(', ')

  return (
    <div className='song-card'>

      <div className='song-image-container'>

        <img
          src={artist.image?.url || ''}
          alt={artist.name || 'Artist'}
          className='song-image'
        />

        <div className='song-overlay'>
          <h3 className='song-title'>
            {artist.name || 'Unknown Artist'}
          </h3>

          {/* <p className='song-artists'>
            {artists || 'Unknown Artist'}
          </p> */}

        </div>

      </div>

    </div>
  )
}