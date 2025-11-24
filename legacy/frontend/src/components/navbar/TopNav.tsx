import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
// import logo from "../../assets/images/logo.png";
import { ModeToggle } from "../mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { IoLogOutOutline } from "react-icons/io5";
import { UserCircleIcon } from "lucide-react";

const TopNav = () => {
  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 bg-background border-b border-border flex justify-between items-center py-2 px-4 shadow-lg md:hidden"
      )}
    >
      {/* Logo  */}
      <div className="uppercase font-bold">
        <Link to="/dashboard">
          {/* <img src={logo} className="w-24 border" alt="logo" /> */}
          Invoxyhub
        </Link>
      </div>
      <div className="flex gap-4">
        <div>
          <ModeToggle />
        </div>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent sideOffset={10}>
              <DropdownMenuItem>
                <Link to="/profile" className="flex items-center gap-2">
                  <UserCircleIcon className="mr-2 text-primary" size={24} />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem variant="destructive">
                <IoLogOutOutline className="mr-2" size={24} />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default TopNav;
