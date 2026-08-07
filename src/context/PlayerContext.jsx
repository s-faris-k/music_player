import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { searchById } from "../library/SongApis"
import { mapSearchSong } from '../mappers/songMapper'



const PlayerContext = createContext();

export function PlayerProvider({ children }) {
  // Audio object (only one for the whole app)
  const audioRef = useRef(new Audio());

  // Current playing song
  const [currentSong, setCurrentSong] = useState(null);

  // Queue
  const [queue, setQueue] = useState([]);

  // Current queue index
  const [currentIndex, setCurrentIndex] = useState(-1);

  // Player state
  const [isPlaying, setIsPlaying] = useState(false);

  // Progress
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Volume
  const [volume, setVolume] = useState(1);

  const audio = audioRef.current;

  /* ----------------------------- */
  /* Play Single Song              */
  /* ----------------------------- */

const playSong = async (song) => {
  if (!song) return;

  try {
    // Already have this song in queue
    const existingIndex = queue.findIndex(
      (s) => s.id === song.id
    );

    if (existingIndex !== -1) {
      setCurrentIndex(existingIndex);
      return;
    }

    // Fetch full song details
    const songData = await searchById(song.id);

    if (!songData) {
      console.error("Unable to fetch song:", song.id);
      return;
    }

    // Convert detailed API response to your app format
    const fullSong = mapSearchSong(songData);
    console.log(fullSong)

    // Add to queue
    const newQueue = [...queue, fullSong];

    setQueue(newQueue);
    setCurrentIndex(newQueue.length - 1);

  } catch (error) {
    console.error("Error playing song:", error);
  }
};

  /* ----------------------------- */
  /* Play Queue                    */
  /* ----------------------------- */

  const playQueue = (songs, startIndex = 0) => {
    if (!songs || songs.length === 0) return;

    setQueue(songs);
    setCurrentIndex(startIndex);
    setCurrentSong(songs[startIndex]);
  };

  /* ----------------------------- */
  /* Add Queue                     */
  /* ----------------------------- */

  const addToQueue = (songs) => {
    const list = Array.isArray(songs) ? songs : [songs];

    setQueue((prev) => {
      const ids = new Set(prev.map((s) => s.id));

      const filtered = list.filter((s) => !ids.has(s.id));

      return [...prev, ...filtered];
    });
  };

  /* ----------------------------- */
  /* Next                          */
  /* ----------------------------- */
    const nextSong = () => {
      if (queue.length === 0) return;

      setCurrentIndex((i) => (i + 1) % queue.length);
    };

  /* ----------------------------- */
  /* Previous                      */
  /* ----------------------------- */

  const previousSong = () => {
    if (queue.length === 0) return;

    setCurrentIndex((i) => (i - 1 + queue.length) % queue.length);
  };
  /* ----------------------------- */
  /* Pause                         */
  /* ----------------------------- */

  const pauseSong = () => {
    audio.pause();
    setIsPlaying(false);
  };

  /* ----------------------------- */
  /* Resume                        */
  /* ----------------------------- */

  const resumeSong = () => {
    audio.play();
    setIsPlaying(true);
  };

  /* ----------------------------- */
  /* Seek                          */
  /* ----------------------------- */

  const seek = (time) => {
    audio.currentTime = time;
  };

  /* ----------------------------- */
  /* Volume                        */
  /* ----------------------------- */

  const changeVolume = (value) => {
    audio.volume = value;
    setVolume(value);
  };

  /* ----------------------------- */
  /* Song Changed                  */
  /* ----------------------------- */

  useEffect(() => {
    if (!currentSong?.play_link) return;

    const playAudio = async () => {
      try {
        audio.src = currentSong.play_link;
        audio.load();

        await audio.play();

        setIsPlaying(true);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Audio play error:", error);
        }
      }
    };

    playAudio();
  }, [currentSong]);

  /* ----------------------------- */
  /* Queue Index Changed           */
  /* ----------------------------- */

  useEffect(() => {
    if (currentIndex < 0) return;

    if (queue.length === 0) return;

    setCurrentSong(queue[currentIndex]);
  }, [currentIndex]);

  /* ----------------------------- */
  /* Audio Events                  */
  /* ----------------------------- */

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(audio.currentTime);
    };

    const loaded = () => {
      setDuration(audio.duration);
    };

    const ended = () => {
      nextSong();
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", loaded);
    audio.addEventListener("ended", ended);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", loaded);
      audio.removeEventListener("ended", ended);
    };
  }, [queue, currentIndex]);

  return (
    <PlayerContext.Provider
      value={{
        audioRef,

        currentSong,
        setCurrentSong,

        queue,
        setQueue,

        currentIndex,

        isPlaying,

        currentTime,

        duration,

        volume,

        playSong,

        playQueue,

        addToQueue,

        pauseSong,

        resumeSong,

        nextSong,

        previousSong,

        seek,

        changeVolume,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  return useContext(PlayerContext);
}