const decodeHtmlEntities = (text = "") => {

  const textarea = document.createElement("textarea")

  textarea.innerHTML = text

  return textarea.value
}

const getImage = (images) => {

  // old API sends direct string image
  if (typeof images === "string") {
    return images
  }

  // new API sends array
  if (!Array.isArray(images)) {
    return ""
  }

  const lastImage = images[images.length - 1]

  return (
    lastImage?.link ||
    lastImage?.url ||
    ""
  )
}

export const maphomeSong = (song) => {

  // console.log("Mapping song:", song)

  return {

    id: song.id,

    type: "song",

    title: decodeHtmlEntities(song.title),

    image: getImage(song.image),

    year: song.year,

    language: song.language,

    url: song.perma_url,

    albumId: song?.more_info?.album_id || null,

    album: decodeHtmlEntities(
      song?.more_info?.album
    ),

    artists:

      song?.more_info?.artistMap?.primary_artists
        ?.map((artist) => ({
          id: artist.id,
          name: artist.name
        })) || [],

    artistNames:

      song?.more_info?.artistMap?.primary_artists
        ?.map((artist) => artist.name)
        ?.join(", ") || ""
  }
}

export const mapSearchSong = (song) => {

  // console.log("Mapping search song:", song)

  return {

    id: song.id,

    type: "song",

    title: decodeHtmlEntities(
      song.name
    ),

    image: getImage(song.image),

    year: song.year,

    language: song.language,

    url: song.url,

    albumId: song?.album?.id || null,

    album: song?.album?.name || "",

    artists:

      song?.artists?.primary
        ?.map((artist) => ({
          id: artist.id,
          name: artist.name
        })) || [],

    artistNames:

      song?.artists?.primary
        ?.map((artist) => artist.name)
        ?.join(", ") || ""
  }
}

export const mapAlbum = (album) => {

  // console.log("Mapping album:", album)

  return {

    id: album.id,

    type: "album",

    title: decodeHtmlEntities(
      album.name || album.title
    ),

    image: getImage(album.image),

    primaryArtists:

      album?.artists?.primary
        ?.map((artist) => artist.name)
        ?.join(", ") || "",

      year: album.more_info?.release_date?.split("-")[0] || null
  }

 
}

export const mapArtist = (artist) => {

  return {

    id: artist.id,

    name: decodeHtmlEntities(
      artist.title || artist.name
    ),

    image: getImage(artist.image)
  }
}

export const mapPlaylist = (playlist) => {

  return {

    id: playlist.id,

    title: decodeHtmlEntities(
      playlist.title || playlist.name
    ),
    language: decodeHtmlEntities(
      playlist.language
    ),


    image: getImage(playlist.image)
  }
}