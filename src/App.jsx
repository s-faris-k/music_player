import { Routes, Route } from "react-router-dom";

import MainLayout from "./shared/layouts/MainLayout";
import PlayerLayout from "./shared/layouts/PlayerLayout";

import Online from "./screens/online/Online";
import Search from "./screens/search/Search";
import Library from "./screens/library/Library";
import Album from "./screens/album/Album";
import Song from "./screens/song/Song";
import Player from "./screens/player/Player";

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Online />} />
        {/* <Route path="/online" element={<Online />} /> */}
        <Route path="/search" element={<Search />} />
        <Route path="/library" element={<Library />} />
        <Route path="/album/:id" element={<Album />} />
        <Route path="/song/:id" element={<Song />} />
      </Route>

      <Route element={<PlayerLayout />}>
        <Route path="/player" element={<Player />} />
      </Route>
    </Routes>
  );
}