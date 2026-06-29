import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AlbumSongCard from '../../components/AlbumSongCard'
import { mapSearchSong , mapAlbum} from '../../mappers/songMapper'


import './album.css'

import { fetchAlbumById } from '../../library/SongApis'

const decodeHtmlEntities = (text = "") => {
  const textarea = document.createElement("textarea")
  textarea.innerHTML = text
  return textarea.value
}

const getImage = (images) => {
  if (!Array.isArray(images)) return ""

  return images[images.length - 1]?.url || ""
}

export default function Album() {
  const { id } = useParams()

  const [albumDetails, setAlbumDetails] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchAlbumDetails = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await fetchAlbumById(id)

        // console.log("Fetched album details:", response)

        setAlbumDetails(response)
      } catch (error) {
        console.error("Error fetching album details:", error)

        setError(
          error?.message || "Failed to fetch album details"
        )
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchAlbumDetails()
    }
  }, [id])

  if (loading) {
    return (
      <div className="screen-container">
        <div className="album-content">
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="screen-container">
        <div className="album-content">
          <p>{error}</p>
        </div>
      </div>
    )
  }

  if (!albumDetails) {
    return (
      <div className="screen-container">
        <div className="album-content">
          <p>Album not found.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="screen-container">
      <div className="album-content">
        
    <div className="album-header">

        {/* Album Title */}
        <div className="album-name">
          {decodeHtmlEntities(albumDetails?.name) || "Unknown Title"}
        </div>

        {/* Album Details */}
        <div className="album-details">

          {/* Left Section */}
          <div className="album-detail-image-container">
            <img
              src={getImage(albumDetails?.image)}
              alt={albumDetails?.name || "Album"}
              className="album-image"
            />
          </div>

          {/* Right Section */}
          <div className="album-info">

            <div>
              <strong>
                {decodeHtmlEntities(albumDetails?.name) || "Unknown Title"}

                {albumDetails?.year && (
                  <span> ({albumDetails.year})</span>
                )}
              </strong>
            </div>

            <div>
              {decodeHtmlEntities(albumDetails?.description) || "Unknown Album"}
            </div>

            <div>
              Songs: {albumDetails?.songs?.length || 0}
            </div>

            <div>
              {albumDetails?.artists?.all
                ?.map((artist) => artist.name)
                ?.join(", ") || "Unknown Artists"}
            </div>

          </div>

        </div>
        </div>
       <div className="album-songs">
            {albumDetails?.songs?.length > 0 ? (
              albumDetails.songs.map((song) => (
                <AlbumSongCard
                  key={song.id}
                  song={mapSearchSong(song)}
                />
              ))
            ) : (
              <p>No songs available for this album.</p>
            )}

          </div>

      </div>
    </div>
  )
}

