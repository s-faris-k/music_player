import {react, useState, useEffect} from "react";
import "./player.css";
import { useLocation } from "react-router-dom";
import { mapSearchSong , mapAlbum} from '../../mappers/songMapper'
import PlayerSongCard from '../../components/PlayerSongCard'




export default function Player() {
  const location = useLocation();

  const [songDetails, setSongDetails] = useState(null);
  const [currentList, setCurrentList] = useState([]);

  useEffect(() => {
    if (!location.state) return;

    if (location.state.type === "song") {
      const song = location.state.song;

      // Set the currently playing song
      setSongDetails(song);

      // Add to queue if not already present
      setCurrentList((prev) => {
        if (prev.some((s) => s.id === song.id)) {
          return prev;
        }

        return [...prev, song];
      });
    }

    if (location.state.type === "album") {
      // Convert album songs to the same structure as normal songs
      const songs = location.state.songs.map((song) => mapSearchSong(song));

      // Add only songs that aren't already in the queue
      setCurrentList((prev) => {
        const existingIds = new Set(prev.map((s) => s.id));

        const newSongs = songs.filter(
          (song) => !existingIds.has(song.id)
        );

        return [...prev, ...newSongs];
      });

      // Start playing the first song if nothing is currently playing
      setSongDetails((currentSong) => currentSong ?? songs[0]);
    }
  }, [location.state]);

  console.log("Current Song:", songDetails);
  console.log("Queue:", currentList);

  if (!songDetails) {
    return <div>Loading...</div>;
  }


  return (
    <div className="screen-container">
      <div className="flex-row lg:flex-row h-screen p-5">
        <div className="flex flex-row h-1/2 w-full gap-3 pb-2">
          <div className="w-full lg:w-120 border-2 border-white"></div>

          <div className="flex-1 flex flex-col border-2 border-white justify-center items-center gap-4">
            <div>{songDetails.title}</div>
            <div>{songDetails.duration || "--:--"}</div>
            <div>Buttons</div>
          </div>

          <div className="w-120 border-2 border-white flex flex-col items-center p-4 glass">
            <div className="w-[80%] h-[80%] flex justify-center items-center">
              <img
                src={songDetails.image}
                alt={songDetails.title}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>

            <div className="mt-2 text-center text-white">
              <strong className="text-xl">
                {songDetails.title}
              </strong>

              <p className="text-gray-400 mt-2">
                {songDetails.artistNames}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-row h-1/2 w-full gap-3 pt-2">
          <div className="h-full w-1/3 border-2 border-white">
            Latest
          </div>

          <div className="h-full w-1/3 border-2 border-white">
            From the artist
          </div>

          <div className="h-full w-1/3 border-2 border-white overflow-y-auto hide-scrollbar flex flex-col gap-2 p-2">
            {currentList.map((song) => (
              <PlayerSongCard
                key={song.id}
                song={song}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}