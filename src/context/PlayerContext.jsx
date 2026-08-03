import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

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

    const playSong = (song) => {
    if (!song) return;

    const existingIndex = queue.findIndex((s) => s.id === song.id);

    if (existingIndex !== -1) {
        setCurrentIndex(existingIndex);
        setCurrentSong(queue[existingIndex]);
        return;
    }

    const newQueue = [...queue, song];

    setQueue(newQueue);
    setCurrentIndex(newQueue.length - 1);
    setCurrentSong(song);
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
    // console.log(currentSong);
    if (!currentSong) return;

    if (!currentSong.play_link) return;

    audio.src = currentSong.play_link;

    currentSong

    audio.play();

    setIsPlaying(true);
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