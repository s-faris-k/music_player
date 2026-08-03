import { Outlet } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import MiniPlayer from "../../components/miniplayer/MiniPlayer";

export default function MainLayout() {
  return (
    <div className="h-screen flex bg-[#20253d]">

      {/* Sidebar */}
      <div className="w-24 flex-shrink-0">
        <Sidebar />
      </div>

      {/* Right Side */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Main Screen */}
      <main className="flex-1 overflow-hidden p-5">
        <Outlet />
      </main>

        {/* Fixed Player */}
        <footer className="h-24 border-t border-white/10 bg-[#18181f]">
          <MiniPlayer />
        </footer>

      </div>
    </div>
  );
}