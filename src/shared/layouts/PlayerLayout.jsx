import { Outlet } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";

export default function PlayerLayout() {
  return (
      <div className="main-body h-screen flex border-2 ">
        <div className="w-24 flex-shrink-0">
          <Sidebar />
      </div>

      <div className="flex-1 overflow-hidden">
          <Outlet />
      </div>
    </div>
  );
}