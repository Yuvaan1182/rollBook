import {
  LuBriefcase,
  LuCalendar,
  LuChevronUp,
  LuDollarSign,
  LuFileText,
  LuLayoutDashboard,
  LuLogOut,
  LuSettings,
  LuUser,
  LuUsers,
} from "react-icons/lu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "../ui/sidebar";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const items = [
  {
    title: "dashboard",
    url: "/dashboard",
    icon: LuLayoutDashboard,
  },
  {
    title: "clients",
    url: "/clients",
    icon: LuUsers,
  },
  {
    title: "invoices",
    url: "/invoices",
    icon: LuFileText,
  },
  {
    title: "projects",
    url: "/projects",
    icon: LuBriefcase,
  },
  {
    title: "settings",
    url: "/settings",
    icon: LuSettings,
  },
  {
    title: "payments",
    url: "/payments",
    icon: LuDollarSign,
  },
  {
    title: "events",
    url: "/events",
    icon: LuCalendar,
  },
];

const AppSideBar = () => {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link to="/">
                <div className="flex items-center">
                  <Avatar className="rounded-sm h-[1.5rem] w-[1.5rem] mr-2">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <span className="font-bold capitalize">Invoxyhub</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url} className="flex items-center">
                      <item.icon />
                      <span className="capitalize">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarSeparator />
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="w-full flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <Avatar className="h-[1.5rem] w-[1.5rem]">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <span>John Doe</span>
                  </div>
                  <span>
                    <LuChevronUp />
                  </span>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <LuUser size={20} /> Account
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LuSettings size={20} /> Settings
                </DropdownMenuItem>
                <DropdownMenuItem variant="destructive">
                  <LuLogOut size={20} /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSideBar;
