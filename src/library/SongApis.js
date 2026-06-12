const languages = [
  "malayalam",
  "tamil",
  "telugu",
  "hindi",
  "english"
]

export async function fetchHomeData() {

  try {

    const results = await Promise.all(

      languages.map(async (language) => {

        const response = await fetch(
          `/api/songs?language=${language}`
        )

        const data = await response.json()
        
        return {
          language,
          items: data.data || []
        }
      })
    )

    // console.log("Fetched songs:", results)

    return results

  } catch (error) {

    console.error("Error fetching songs:", error)

    return []
  }
}

export async function searchWithKey(query) {

  try {

    const [
      songsResponse,
      albumsResponse,
      artistsResponse,
      playlistsResponse
    ] = await Promise.all([

      fetch(
        `https://saavn.sumit.co/api/search/songs?query=${encodeURIComponent(query)}&page=0&limit=10`
      ),

      fetch(
        `https://saavn.sumit.co/api/search/albums?query=${encodeURIComponent(query)}&page=0&limit=10`
      ),

      fetch(
        `https://saavn.sumit.co/api/search/artists?query=${encodeURIComponent(query)}&page=0&limit=10`
      ),

      fetch(
        `https://saavn.sumit.co/api/search/playlists?query=${encodeURIComponent(query)}&page=0&limit=10`
      )

    ])

    const [
      songsData,
      albumsData,
      artistsData,
      playlistsData
    ] = await Promise.all([

      songsResponse.json(),
      albumsResponse.json(),
      artistsResponse.json(),
      playlistsResponse.json()

    ])

    console.log("Songs:", songsData)
    console.log("Albums:", albumsData)
    console.log("Artists:", artistsData)
    console.log("Playlists:", playlistsData)

    return {

      songs: songsData.data || [],
      albums: albumsData.data || [],
      artists: artistsData.data || [],
      playlists: playlistsData.data || []

    }

  } catch (error) {

    console.error("Error fetching search results:", error)

    return {
      songs: [],
      albums: [],
      artists: [],
      playlists: []
    }

  }
}


export async function fetchSongById(id) {

  try {

    const response = await fetch(

      `https://saavn.sumit.co/api/songs?ids=${encodeURIComponent(id)}`

    )

    const data = await response.json()

    console.log(data)

    return data.data[0] || null

  } catch (error) {

    console.error(
      "Error fetching song:",
      error
    )

    return null
  }
}



export async function fetchAlbumById(id) {

  try {

    const response = await fetch(`https://saavn.sumit.co/api/albums?id=${id}`

 

    )

    const data = await response.json()

    console.log("fetchAlbumById response:", data)

    return data.data[0] || null

  } catch (error) {

    console.error(
      "Error fetching song:",
      error
    )

    return null
  }
}