import React, {
  useEffect,
  useState
} from 'react'

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

              <strong>Name :</strong>

              {" "}

              {
                decodeHtmlEntities(
                  songDetails?.name
                ) || 'Unknown Title'
              }

            </div>

            <div>

              <strong>Album :</strong>

              {" "}

              {
                decodeHtmlEntities(
                  songDetails?.album?.name
                ) || 'Unknown Album'
              }

            </div>

            <div>

              <strong>Artists :</strong>

              {" "}

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

              <strong>Language :</strong>

              {" "}

              {
                songDetails?.language ||
                'Unknown'
              }

            </div>

            <div>

              <strong>Year :</strong>

              {" "}

              {
                songDetails?.year ||
                'Unknown'
              }

            </div>

            <div>

              <strong>Duration:</strong>

              {" "}

              {
                songDetails?.duration
                  ? `${Math.floor(
                      songDetails.duration / 60
                    )}:${String(
                      songDetails.duration % 60
                    ).padStart(2, '0')}`
                  : 'Unknown'
              }

            </div>

            <div>

              <strong>Label :</strong>

              {" "}

              {
                songDetails?.label ||
                'Unknown'
              }

            </div>

            <div>

              <strong>Play Count :</strong>

              {" "}

              {
                songDetails?.playCount ||
                '0'
              }

            </div>
                <div className='button-group'>

                {songDetails?.downloadUrl
                    ?.slice(-3)
                    ?.map((audio) => (

                    <button
                        key={audio.quality}
                        onClick={() => {
                        window.open(audio.url)
                        }}
                    >

                        {audio.quality}

                    </button>

                    ))}

                </div>

          </div>

        </div>

      </div>

    </div>
  )
}