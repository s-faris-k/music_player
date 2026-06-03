const languages = [
  "malayalam",
  "tamil",
  "telugu",
  "hindi",
  "english"
]

export async function fetchSongsByLanguages() {

  try {

    const results = await Promise.all(

      languages.map(async (language) => {

        const response = await fetch(
          `/api/songs?language=${language}`
        )

        const data = await response.json()

        return {
          language,
          songs: data.data || []
        }
      })
    )

    console.log("Fetched songs:", results)

    return results

  } catch (error) {

    console.error("Error fetching songs:", error)

    return []
  }
}

export async function searchWithKey(query) {

  try {

    const response = await fetch(
      `https://saavn.sumit.co/api/search?query=${encodeURIComponent(query)}&limit=50&type=song`
    )

    const data = await response.json()

    console.log("Fetched songs:", data)

    return data.data || {}

  } catch (error) {

    console.error("Error fetching songs:", error)

    return {}
  }
}

