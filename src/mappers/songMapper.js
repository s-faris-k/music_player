const decodeHtmlEntities = (text) => {

  const textarea = document.createElement("textarea")

  textarea.innerHTML = text

  return textarea.value
}

export const mapSong = (song) => {

  return {

    id: song.id,

    title: decodeHtmlEntities(song.title),

    image: song.image,

    albumId: song.more_info.album_id,

    primaryArtists:
      song.more_info.artistMap.primary_artists.map((artist) => ({
        id: artist.id,
        name: artist.name
      }))
  }
}