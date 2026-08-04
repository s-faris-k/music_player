import "./player.css";
import PlayerSongCard from "../../components/PlayerSongCard";
import { usePlayer } from "../../context/PlayerContext";
import { ImNext } from "react-icons/im";
import { FaRegCirclePause, FaPlay } from "react-icons/fa6";
import { RxTrackPrevious,RxTrackNext } from "react-icons/rx";



// Put a placeholder image in:
// public/images/default-album.png

export default function Player() {
const {
  currentSong,
  queue,
  isPlaying,
  currentTime,
  duration,
  seek,
  pauseSong,
  resumeSong,
  nextSong,
  previousSong,
} = usePlayer();

  const defaultSong = {
    title: "No Song Playing",
    artistNames: "Select a song to start listening",
    image: "/images/default.png",
    duration: 0,
  };

  const song = currentSong || defaultSong;


  function formatDuration(seconds) {
  if (!seconds || isNaN(seconds)) return "0:00";

  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);

  return `${min}:${sec.toString().padStart(2, "0")}`;
}

  return (
    <div className="screen-container">
      <div className="flex flex-col lg:flex-row h-screen p-5 gap-5">

        {/* LEFT SIDE */}
        <div className="flex flex-col w-full lg:w-2/3 gap-5">

          {/* Album + Details */}
          <div className="flex gap-5 h-1/2">

            {/* Album Image */}
              <div className="relative h-[100%] w-[40%] flex items-center justify-center">

              {/* Vinyl */}
              <img
                src="/images/default.png"
                alt="Vinyl"
                className={`w-[100%] h-[100%] object-contain ${
                  isPlaying ? "spin-record" : ""
                }`}
              />

              {/* Album Cover */}
              <img
                src={song.image}
                alt={song.title}
                className="absolute w-[220px] h-[220px] object-cover rounded-xl shadow-2xl"
              />

            </div>

            {/* Song Details */}
          <div className="flex flex-col items-center justify-center flex-1 border-2 border-white rounded-lg glass p-6">

            <div className="w-[70%] h-[60%] aspect-square mb-2">
              <img
                src={song.image}
                alt={song.title}
                className="w-full h-full rounded-xl shadow-lg"
              />
            </div>

            <h1 className="text-xl font-bold text-white text-center">
              {song.title}
            </h1>

            <p className="text-gray-300 mt-2 text-center">
              {song.artistNames}
            </p>

       <div className="w-full mt-2">
          <div className="relative h-2 bg-gray-600 rounded-full overflow-hidden">

            <div
              className="absolute left-0 top-0 h-full bg-[oklch(0.74_0.1_270.37)] rounded-full"
              style={{
                width: `${duration ? (currentTime / duration) * 100 : 0}%`,
              }}
            />

            <input
              type="range"
              min={0}
              max={duration || 0}
              value={currentTime}
              step={1}
              onChange={(e) => seek(Number(e.target.value))}
              className="absolute inset-0 w-full opacity-0 cursor-pointer"
            />
          </div>

          <div className="flex justify-between text-sm text-gray-400 mt-2">
            <span>{formatDuration(currentTime)}</span>
            <span>{formatDuration(duration)}</span>
          </div>
        </div> 

            {/* Controls */}
            <div className="flex justify-center gap-4 mt-2">

              <button
                className="px-4 py-2 rounded bg-white text-black disabled:opacity-40"
                disabled={!currentSong}
                onClick={previousSong}
              >
                <RxTrackPrevious />

              </button>

              <button
                className="px-4 py-2 rounded bg-green-500 text-white disabled:opacity-40"
                disabled={!currentSong}
                onClick={() => (isPlaying ? pauseSong() : resumeSong())}
              >
                {isPlaying ? <FaRegCirclePause />: <FaPlay />}
              </button>

              <button
                className="px-4 py-2 rounded bg-white text-black disabled:opacity-40"
                disabled={!currentSong}
                onClick={nextSong}
              >
                <RxTrackNext />

              </button>

            </div>

          </div>
          </div>

          {/* Recommendations */}
          <div className="flex gap-5 h-1/2">

            <div className="w-1/2 border-2 border-white rounded-lg glass flex justify-center items-center text-gray-400">
              Latest Songs
            </div>

            <div className="w-1/2 border-2 border-white rounded-lg glass flex justify-center items-center text-gray-400">
              More From Artist
            </div>

          </div>

        </div>

        {/* RIGHT SIDE - Queue */}
        <div className="w-full lg:w-1/3 border-2 border-white rounded-lg glass p-3 flex flex-col">

          <h2 className="text-xl font-semibold text-white mb-3 mt-3">
            Currently Playing
          </h2>

          <div className="overflow-y-auto hide-scrollbar flex-1">

            {queue.length > 0 ? (
              queue.map((song) => (
                <PlayerSongCard
                  key={song.id}
                  song={song}
                />
              ))
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400">
                Queue is empty
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}