import React from 'react'
import './songCard.css'

export default function AlbumCard({ album , onClick }) {

  // console.log("Rendering AlbumCard for song:", album)

//   const artists = song.primaryArtists
//     ?.map((artist) => artist.name)
//     .join(', ')

  return (
    <div className='song-card' onClick={onClick}>

      <div className='song-image-container'>

        <img
          src={album.image || ''}
          alt={album.title}
          className='song-image'
        />

        <div className='song-overlay'>
          <h3 className='song-title'>
            {album.title}
          </h3>
          <p className='song-artists'>
            {album.type}
          </p>
          <p className='song-artists'>
            {album.year}
          </p>
        </div>

      </div>

    </div>
  )
}