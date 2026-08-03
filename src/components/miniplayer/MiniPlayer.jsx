import { usePlayer } from "../../context/PlayerContext";
import { FaPlay, FaPause } from "react-icons/fa";
import { RxTrackPrevious, RxTrackNext } from "react-icons/rx";

export default function MiniPlayer() {
  const {
    currentSong,
    isPlaying,
    currentTime,
    duration,
    seek,
    pauseSong,
    resumeSong,
    previousSong,
    nextSong,
  } = usePlayer();

  const song = currentSong || {
    title: "No Song Playing",
    artistNames: "Select a song to start listening",
    image: "/images/default.png",
  };

  const formatTime = (sec) => {
    if (!sec || isNaN(sec)) return "0:00";

    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);

    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="h-full px-6 flex flex-col justify-center">

      {/* Top Row */}
      <div className="flex items-center">

        {/* Album */}
        <div className="flex items-center w-1/3">

          <img
            src={song.image}
            alt={song.title}
            className="w-14 h-14 rounded-lg object-cover"
          />

          <div className="ml-4 overflow-hidden">
            <h3 className="text-white font-semibold truncate">
              {song.title}
            </h3>

            <p className="text-sm text-gray-400 truncate">
              {song.artistNames}
            </p>
          </div>

        </div>

        {/* Controls */}
        <div className="w-1/3 flex justify-center items-center gap-5">

          <button
            disabled={!currentSong}
            onClick={previousSong}
            className="text-gray-300 hover:text-white disabled:opacity-40"
          >
            <RxTrackPrevious size={24} />
          </button>

          <button
            disabled={!currentSong}
            onClick={() =>
              isPlaying ? pauseSong() : resumeSong()
            }
            className="w-11 h-11 rounded-full bg-white text-black flex justify-center items-center hover:scale-105 transition"
          >
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>

          <button
            disabled={!currentSong}
            onClick={nextSong}
            className="text-gray-300 hover:text-white disabled:opacity-40"
          >
            <RxTrackNext size={24} />
          </button>

        </div>

        {/* Right */}
        <div className="w-1/3"></div>

      </div>

      {/* Progress */}
      <div className="flex items-center gap-3 mt-3">

        <span className="text-xs text-gray-400 w-10">
          {formatTime(currentTime)}
        </span>

        <input
          type="range"
          min="0"
          max={duration || 0}
          value={currentTime}
          onChange={(e) => seek(Number(e.target.value))}
          disabled={!currentSong}
          className="flex-1 accent-violet-400 cursor-pointer"
        />

        <span className="text-xs text-gray-400 w-10 text-right">
          {formatTime(duration)}
        </span>

      </div>

    </div>
  );
}