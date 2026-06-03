const decodeHtmlEntities = (text) => {

  const textarea = document.createElement("textarea")

  textarea.innerHTML = text

  return textarea.value
}

export const mapSongfromList = (song) => {
  // console.log("Mapping song:", song)

  return {
    id: song.id,

    title: decodeHtmlEntities(song.title),

    image: song.image,

    albumId: song?.more_info?.album_id || null,

    primaryArtists:
      song?.more_info?.artistMap?.artists?.map((artist) => ({
        id: artist.id,
        name: artist.name
      })) || []
  }
}


export const mapSong = (song) => {

  // console.log("Mapping song:", song)

  return {

    id: song.id,

    title: decodeHtmlEntities(song.title),

    image: Array.isArray(song.image)
      ? (
          song.image[song.image.length - 1]?.link ||
          song.image[song.image.length - 1]?.url ||
          ''
        )
      : song.image || '',
      
    albumId: song?.more_info?.album_id || null,

    primaryArtists:

      Array.isArray(song?.more_info?.artistMap?.primary_artists)

        ? song.more_info.artistMap.primary_artists.map((artist) => ({
            id: artist.id,
            name: artist.name
          }))

        : song?.primaryArtists
            ?.split(",")
            ?.map((name, index) => ({
              id: index,
              name: name.trim()
            })) || []
  }
}

export const mapAlbum = (album) => {
  // console.log("Mapping album:", album)

  return {
    id: album.id,

    title: decodeHtmlEntities(album.title),

    image: album.image?.[2] || null,

    artist: album.artist,

    more_songs: Array.isArray(album.songIds)
      ? album.songIds.map((songId) => ({
          id: songId,
        }))
      : [],
  }
}

export const mapArtist = (artist) => {
  console.log("Mapping artist:", artist)

  return {

    id: artist.id,
    name: decodeHtmlEntities(artist.title),
    image: artist.image[2]
  }
}

export const mapPlaylist = (playlist) => {

  return {

    id: playlist.id || null,
  }
}