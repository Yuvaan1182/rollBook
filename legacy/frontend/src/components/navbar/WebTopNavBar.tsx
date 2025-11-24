import { LuSearch } from "react-icons/lu";
import { SidebarTrigger } from "../ui/sidebar";
import { ModeToggle } from "../mode-toggle";

const WebTopNavBar = () => {
  return (
    <nav className="flex items-center justify-between w-full py-1 px-4 shadow-2xs">
      <span>
        <SidebarTrigger />
      </span>
      <ul className="flex items-center justify-center gap-6">
        <li>
          <LuSearch />
        </li>
        <li>
          <ModeToggle />
        </li>
      </ul>
    </nav>
  );
};

export default WebTopNavBar;
