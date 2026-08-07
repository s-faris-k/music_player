import { usePlayer } from "../../context/PlayerContext";
import { FaPlay, FaPause } from "react-icons/fa";
import { RxTrackPrevious, RxTrackNext,RxDownload } from "react-icons/rx";
import {useState} from 'react'

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
  const [showDownloads, setShowDownloads] = useState(false);
  // console.log("DOWNLOAD LINKS:", currentSong?.play_link);
  const song = currentSong || {
    title: "No Song Playing",
    artistNames: "Select a song to start listening",
    image: "/images/default.png",
  };

const downloadFile = async (item) => {
  if (!item?.url || !currentSong) return;

  try {
    const response = await fetch(item.url);

    if (!response.ok) {
      throw new Error(`Download failed: ${response.status}`);
    }

    const blob = await response.blob();

    const blobUrl = URL.createObjectURL(blob);

    const filename =
      `${currentSong.title || "song"}.mp4`
        .replace(/[<>:"/\\|?*]/g, "")
        .trim();

    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = filename;

    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(blobUrl);

  } catch (error) {
    console.error("Download failed:", error);
  }
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
<div className="relative w-1/3 flex items-center justify-center">

  {/* Download button */}
  <button
    type="button"
    className="text-gray-300 hover:text-white"
    onClick={() => setShowDownloads((prev) => !prev)}
  >
    <RxDownload size={20} />
  </button>

  {/* Download options */}
  {showDownloads && (
    <div className="absolute bottom-full right-0 mb-2 w-32 rounded-lg bg-[#1E2A3E] p-2 shadow-lg">

{currentSong?.down_links?.map((item) => (
  <button
    key={item.quality}
    onClick={() => {
      downloadFile(item);
      setShowDownloads(false);
    }}
    className="block w-full rounded px-3 py-2 text-left text-white hover:bg-[#455675]"
  >
    {item.quality}
  </button>
))}

    </div>
  )}

</div>


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