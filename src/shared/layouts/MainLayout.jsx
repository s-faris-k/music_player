import { Outlet } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import MiniPlayer from "../../components/miniplayer/MiniPlayer";

export default function MainLayout() {
  return (
    <div className="main-body h-screen flex border-2 border-white">

      {/* Sidebar */}
      <div className="w-24 flex-shrink-0">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">

        {/* Screen */}
        <div className="flex-1 overflow-hidden">
          <Outlet />
        </div>

        {/* Mini Player */}
        <div id="mini-player" className="h-24 border-t border-white">
          <MiniPlayer />
        </div>

      </div>

    </div>
  );
}