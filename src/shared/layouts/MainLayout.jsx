import { Outlet } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import MiniPlayer from "../../components/miniplayer/MiniPlayer";

export default function MainLayout() {
  return (
    <div className="flex h-screen w-screen bg-[#20253d]">

      {/* Sidebar */}
      <div className="w-24 mt-5 mb-2 ml-2">
        <Sidebar />
      </div>

      {/* Right */}
      <div className="flex flex-1 flex-col">

        <main className="flex-1 overflow-hidden m-5">
          <Outlet />
        </main>

        <footer className="h-24  border-t border-white/10 bg-[#18181f] rounded-lg mr-5 ml-5 mb-2">
          <MiniPlayer />
        </footer>

      </div>
    </div>
  );
}