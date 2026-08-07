import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useSearchParams } from "react-router-dom";

import { searchWithKey } from "../../library/SongApis";

import {
  mapSearchSong,
  mapAlbum,
  mapArtist,
  mapPlaylist,
} from "../../mappers/songMapper";

import { usePlayer } from "../../context/PlayerContext";

import Songcard from "../../components/SongCard";
import AlbumCard from "../../components/AlbumCard";
import ArtistCard from "../../components/ArtistCard";

import "./search.css";

export default function Search() {
  const [searchParams] = useSearchParams();

  const { playSong } = usePlayer();

  const query = searchParams.get("q") || "";

  const [searchResults, setSearchResults] = useState({
    songs: [],
    albums: [],
    artists: [],
    playlists: [],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [searchText, setSearchText] = useState(query);

  // --------------------------------
  // Sync input with URL query
  // --------------------------------
  useEffect(() => {
    setSearchText(query);
  }, [query]);

  // --------------------------------
  // Fetch search results
  // --------------------------------
  useEffect(() => {
    if (!query.trim()) {
      return;
    }

    const searchSong = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await searchWithKey(query);

        console.log("Search results:", response);

        const mappedData = {
          songs:
            response?.songs?.results?.map(mapSearchSong) || [],

          albums:
            response?.albums?.results?.map(mapAlbum) || [],

          artists:
            response?.artists?.results?.map(mapArtist) || [],

          playlists:
            response?.playlists?.results?.map(mapPlaylist) || [],
        };

        setSearchResults(mappedData);

      } catch (err) {
        console.error(err);
        setError(err?.message || String(err));
      } finally {
        setLoading(false);
      }
    };

    searchSong();
  }, [query]);

  // --------------------------------
  // Search
  // --------------------------------
  const handleSearch = () => {
    if (!searchText.trim()) {
      alert("Please enter a search term.");
      return;
    }

    // Use your existing navigation logic here
    window.history.pushState(
      {},
      "",
      `/search?q=${encodeURIComponent(searchText.trim())}`
    );

    // Since pushState doesn't notify React Router,
    // use location navigation instead if needed.
    window.location.reload();
  };

  // --------------------------------
  // Empty query
  // --------------------------------
  if (!query.trim()) {
    return (
      <div className="flex h-full min-w-0 flex-col">

        {/* Search */}
        <header className="flex flex-shrink-0 items-center py-4">
          <div className="relative ml-auto w-60">

            <input
              className="w-full rounded-full bg-white py-2 pl-4 pr-10 text-black outline-none"
              type="text"
              placeholder="Search songs..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
            />

            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-black"
              onClick={handleSearch}
            >
              <CiSearch size={20} />
            </button>

          </div>
        </header>

        {/* Empty content */}
        <div className="flex-1 min-w-0 overflow-y-auto rounded-lg bg-[#455675] online-content pb-2">
        </div>

      </div>
    );
  }

  // --------------------------------
  // Search results
  // --------------------------------
  return (
    <div className="flex h-full min-w-0 flex-col">

      {/* Search */}
      <header className="flex flex-shrink-0 items-center py-4">
        <div className="relative ml-auto w-60">

          <input
            className="w-full rounded-full bg-white py-2 pl-4 pr-10 text-black outline-none"
            type="text"
            placeholder="Search songs..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />

          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-black"
            onClick={handleSearch}
          >
            <CiSearch size={20} />
          </button>

        </div>
      </header>

      {/* Content */}
      <div className="flex-1 min-w-0 overflow-y-auto rounded-lg bg-[#455675] online-content p-2">

        {/* Loading */}
        {loading && (
          <p className="p-5 text-white">
            Loading songs...
          </p>
        )}

        {/* Error */}
        {error && (
          <p className="p-5 text-white">
            Error: {error}
          </p>
        )}

        {/* Results */}
        {!loading && !error && (
          <>

            {/* ---------------- Songs ---------------- */}

            <div className="language-section">

              <h2 className="language-title text-white pt-2 pb-2">
                Songs
              </h2>

              <div className="flex min-w-0 gap-4 overflow-x-auto overflow-y-hidden song-list">

                {searchResults.songs.length > 0 ? (

                  searchResults.songs.map((song) => (

                    <Songcard
                      key={song.id}
                      song={song}
                      onClick={() => playSong(song)}
                    />

                  ))

                ) : (

                  <p className="text-white">
                    No songs found.
                  </p>

                )}

              </div>

            </div>


            {/* ---------------- Albums ---------------- */}

            <div className="language-section">

              <h2 className="language-title text-white pt-2 pb-2">
                Albums
              </h2>

              <div className="flex min-w-0 gap-4 overflow-x-auto overflow-y-hidden song-list">

                {searchResults.albums.length > 0 ? (

                  searchResults.albums.map((album) => (

                    <AlbumCard
                      key={album.id}
                      album={album}
                    />

                  ))

                ) : (

                  <p className="text-white">
                    No albums found.
                  </p>

                )}

              </div>

            </div>


            {/* ---------------- Artists ---------------- */}

            <div className="language-section">

              <h2 className="language-title text-white pt-2 pb-2">
                Albums
              </h2>

              <div className="flex min-w-0 gap-4 overflow-x-auto overflow-y-hidden song-list">

                {searchResults.artists.length > 0 ? (

                  searchResults.artists.map((artist) => (

                    <ArtistCard
                      key={artist.id}
                      artist={artist}
                    />

                  ))

                ) : (

                  <p className="text-white">
                    No artists found.
                  </p>

                )}

              </div>

            </div>

          </>
        )}

      </div>

    </div>
  );
}