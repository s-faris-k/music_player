import React from 'react'
import './albumSongCard.css'
import { FaRegCirclePlay } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom'


export default function AlbumSongCard({ song }) {
  console.log(song)
  const navigate = useNavigate()
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
        <div
          className="play-song"
          onClick={() =>
            navigate(`/player`, {
              state: { song, type: "song" },

            })
          }
        >
          <FaRegCirclePlay />
        </div>
    </div>
  )
}