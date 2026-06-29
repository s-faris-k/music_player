import React from 'react'
import './albumSongCard.css'

export default function AlbumSongCard({ song }) {
  return (
    <div className="song-container">

      <div className="album-song-image-container">
        <img
          src={song.image || ""}
          alt={song.title || "Song"}
          className="album-song-image"
        />
      </div>

      <div className="album-song-details">

        <div className="song-name">
          {song.title || "Unknown Song"}
        </div>

        <div className="album-song-artist">
          {song.artistNames || "Unknown Artist"}
        </div>

        <div className="album-song-year">
          {song.year || "Unknown Year"}
        </div>

        <div className="album-song-language">
          {song.language || "Unknown Language"}
        </div>

      </div>

    </div>
  )
}