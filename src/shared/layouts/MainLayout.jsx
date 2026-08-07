import { Outlet } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import MiniPlayer from "../../components/miniplayer/MiniPlayer";

export default function MainLayout() {
  return (
    <div className="flex h-screen bg-[#20253d]">

      <div className="w-24 flex-shrink-0 mb-2 mt-2 ml-2">
        <Sidebar />
      </div>

      <div className="flex min-w-0 flex-1 flex-col">

        <main className="min-w-0 flex-1 overflow-hidden m-2">
          <Outlet />
        </main>

     <footer className="
        h-36
        sm:h-28
        lg:h-24
        flex-shrink-0
        border-t border-white/10
        bg-[#18181f]
        m-2
        rounded-xl
      ">
        <MiniPlayer />
      </footer>

      </div>

    </div>
  );
}