import React from 'react'
import './albumSongCard.css'
import { FaRegCirclePlay } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom'


export default function AlbumSongCard({ song }) {
  console.log(song)
  const navigate = useNavigate()
  return (
    
    <div className="flex flex-row gap-5 h-30">

      <div className="w-[15%] h-[100%]">
        <img
          src={song.image || ""}
          alt={song.title || "Song"}
          className="rounded-sm"
        />
      </div>

      <div className="flex flex-col gap-1 pt-2 w-[70%]">

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
              state: { song: song, type: "song" },

            })
          }
        >
          <FaRegCirclePlay />
        </div>
    </div>
  )
}