import React, {
  useEffect,
  useState
} from 'react'
import { FaPlayCircle } from "react-icons/fa";

import {
  useParams
} from 'react-router-dom'

import './song.css'

import {
  fetchSongById
} from '../../library/SongApis'

const decodeHtmlEntities = (text = "") => {

  const textarea = document.createElement("textarea")

  textarea.innerHTML = text

  return textarea.value
}

const getImage = (images) => {

  if (!Array.isArray(images)) return ""

  return images[images.length - 1]?.url || ""
}

export default function Song() {

  const { id } = useParams()

  const [songDetails, setSongDetails] =
    useState(null)

  const [loading, setLoading] =
    useState(true)

  const [error, setError] =
    useState(null)

  useEffect(() => {

    const fetchSongDetails = async () => {

      try {

        setLoading(true)

        setError(null)

        const response =
          await fetchSongById(id)

        console.log(
          "Fetched song details:",
          response
        )

        setSongDetails(response)

      } catch (error) {

        console.error(
          "Error fetching song details:",
          error
        )

        setError(
          error?.message ||
          "Failed to fetch song details"
        )

      } finally {

        setLoading(false)
      }
    }

    if (id) {

      fetchSongDetails()
    }

  }, [id])

  if (loading) {

    return (

      <div className='screen-container'>

        <div className='song-content'>

          <p>Loading...</p>

        </div>

      </div>
    )
  }

  if (error) {

    return (

      <div className='screen-container'>

        <div className='song-content'>

          <p>{error}</p>

        </div>

      </div>
    )
  }

  if (!songDetails) {

    return (

      <div className='screen-container'>

        <div className='song-content'>

          <p>Song not found.</p>

        </div>

      </div>
    )
  }

  return (

    <div className='screen-container'>

      <div className='song-content'>

        {/* Song Title */}

        <div className='song-name'>

          {
            decodeHtmlEntities(
              songDetails?.name
            ) || 'Unknown Title'
          }

        </div>

        {/* Song Details */}

        <div className='song-details'>

          {/* Left Section */}

          <div className='song-detail-image-container'>

            <img
              src={getImage(songDetails?.image)}
              alt={
                songDetails?.name || 'Song'
              }
              className='song-image'
            />

          </div>

          {/* Right Section */}

          <div className='song-info'>

            <div>

              <strong> 

              {
                decodeHtmlEntities(
                  songDetails?.name
                ) || 'Unknown Title'
              }
              </strong>

            </div>

            <div>



              {
                decodeHtmlEntities(
                  songDetails?.album?.name
                ) || 'Unknown Album'
              }

            </div>

            <div>

     



              {
                songDetails?.artists?.primary
                  ?.map(
                    (artist) => artist.name
                  )
                  ?.join(", ")
                  || 'Unknown Artists'
              }

            </div>

            <div>
              <strong>{songDetails?.language || 'Unknown'} . {songDetails?.year || 'Unknown'} . {
                songDetails?.duration
                  ? `${Math.floor(
                      songDetails.duration / 60
                    )}:${String(
                      songDetails.duration % 60
                    ).padStart(2, '0')}`
                  : 'Unknown'
              } . {
                songDetails?.playCount ||
                '0'
              } plays
              </strong>
            </div>

  
            <div className='button-group'>
              <button>Play Now</button>
              <button>Play Next</button>
              <select
                onChange={(e) => {
                  if (e.target.value) {
                    window.open(e.target.value)
                  }
                }}
              >
                <option value="">Download</option>

                {songDetails?.downloadUrl
                  ?.slice(-3)
                  ?.map((audio) => (
                    <option
                      key={audio.quality}
                      value={audio.url}
                    >
                      {audio.quality}
                    </option>
                  ))}
              </select>
            </div>

          </div>

        </div>

      </div>

    </div>
  )
}