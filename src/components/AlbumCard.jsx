import React from 'react'
import './songCard.css'

export default function AlbumCard({ album }) {

  console.log("Rendering AlbumCard for song:", album)

//   const artists = song.primaryArtists
//     ?.map((artist) => artist.name)
//     .join(', ')

  return (
    <div className='song-card'>

      <div className='song-image-container'>

        <img
          src={album.image.url || ''}
          alt={album.title}
          className='song-image'
        />

        <div className='song-overlay'>
          <h3 className='song-title'>
            {album.title}
          </h3>

          {/* <p className='song-artists'>
            {artists || 'Unknown Artist'}
          </p> */}

        </div>

      </div>

    </div>
  )
}