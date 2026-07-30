import {react, useState, useEffect} from "react";
import "./player.css";
import { useLocation } from "react-router-dom";
import { mapSearchSong , mapAlbum} from '../../mappers/songMapper'
import PlayerSongCard from '../../components/PlayerSongCard'
import { usePlayer } from "../../context/PlayerContext";






export default function Player() {

  const {
    currentSong,
    queue,
    currentIndex,
    isPlaying,
    currentTime,
    duration,
    playSong,
    pauseSong,
    resumeSong,
    nextSong,
    previousSong,
  } = usePlayer();
  return (
    <div className="screen-container">
      <div className="flex-row lg:flex-row h-screen p-5">
        <div className="flex flex-row h-1/2 w-full gap-3 pb-2">
          <div className="w-full lg:w-120 border-2 border-white">
            <img
                src={currentSong.image}
                className="w-full h-full object-cover rounded-lg"
              />
          </div>

          <div className="flex flex-col border-2 border-white justify-center items-center gap-4">
            <div>{currentSong.title}</div>
            <div>{currentSong?.duration
                  ? `${Math.floor(
                      currentSong.duration / 60
                    )}:${String(
                      currentSong.duration % 60
                    ).padStart(2, '0')}`
                  : 'Unknown'}</div>
            <div>Buttons</div>
          </div>

          <div className="w-120 border-2 border-white flex flex-col items-center p-4 glass">
            <div className="w-[80%] h-[80%] flex justify-center items-center">
              <img
                src={currentSong.image}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>

            <div className="mt-2 text-center text-white">
              <strong className="text-xl">
                {currentSong.title}
              </strong>

              <p className="text-gray-400 mt-2">
                {currentSong.artistNames}
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
             {queue.map((song) => (
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