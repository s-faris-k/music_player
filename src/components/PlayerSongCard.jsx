import React from 'react'
import { FaRegCirclePlay } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom'


export default function AlbumSongCard({ song }) {
  // console.log(song)
  const navigate = useNavigate()
  return (
    
<div className="flex items-center gap-3 h-20 w-full glass">
  {/* Image */}
  <div className="w-14 h-14 flex-shrink-0 pl-2" >
    <img
      src={song.image}
      alt={song.title}
      className="w-full h-full rounded object-cover"
    />
  </div>

  {/* Text */}
  <div className="flex-1 min-w-0">
    <div className="text-white font-medium truncate">
      {song.title}
    </div>

    <div className="text-gray-400 text-sm truncate">
      {song.artistNames}
    </div>
  </div>
</div>
  )
}