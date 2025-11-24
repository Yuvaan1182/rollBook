import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Home,
  Users,
  FileText,
  Settings,
  Calendar,
  Briefcase,
  DollarSign,
  Plus,
} from "lucide-react";
import { cn } from "@/lib/utils";

// -------------------------
// Reusable NavButton Component
// -------------------------
function NavButton({
  to,
  icon: Icon,
  isActive,
}: {
  to: string;
  icon: React.ElementType;
  isActive: boolean;
}) {
  return (
    <Button
      asChild
      variant="ghost"
      size="icon"
      className={cn(
        "flex flex-col items-center transition-colors",
        isActive ? "text-primary" : "text-muted-foreground"
      )}
    >
      <Link to={to}>
        <Icon className="h-5 w-5" />
      </Link>
    </Button>
  );
}

// -------------------------
// BottomNav Component
// -------------------------
export function BottomNav() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  // Centralized navigation config
  const mainNavItems = [
    { to: "/dashboard", icon: Home },
    { to: "/payments", icon: DollarSign },
    { to: "/invoices", icon: FileText },
    { to: "/settings", icon: Settings },
  ];

  const dropdownItems = [
    { to: "/projects", icon: Briefcase, label: "Project" },
    { to: "/services", icon: Calendar, label: "Service" },
    { to: "/invoices/new", icon: FileText, label: "Invoice" },
    { to: "/clients", icon: Users, label: "Client" },
  ];

  return (
    <nav
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border flex justify-around items-center py-2 shadow-lg md:hidden"
      )}
    >
      {/* Render first two nav items */}
      {mainNavItems.slice(0, 2).map((item) => (
        <NavButton
          key={item.to}
          to={item.to}
          icon={item.icon}
          isActive={isActive(item.to)}
        />
      ))}

      {/* Center Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="relative bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Plus className="h-6 w-6" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="center" className="mb-2">
          {dropdownItems.map((item) => (
            <DropdownMenuItem key={item.to} asChild>
              <Link to={item.to} className="flex items-center">
                <item.icon className="mr-2 h-4 w-4" /> {item.label}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Render last two nav items */}
      {mainNavItems.slice(2).map((item) => (
        <NavButton
          key={item.to}
          to={item.to}
          icon={item.icon}
          isActive={isActive(item.to)}
        />
      ))}
    </nav>
  );
}
