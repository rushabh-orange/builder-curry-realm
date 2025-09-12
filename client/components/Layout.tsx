import { useState } from "react";
import { cn } from "@/lib/utils";
import { useNavigate, useLocation } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Bell,
  Menu,
  User,
  PlaneIcon,
  Calendar,
  MapPinTrack,
  FileText,
  CreditCard,
  CheckCircle,
  Users,
  TreeStructure,
  Settings,
  Reports,
} from "@/assets/icons";
import { clearAuth } from "@/lib/auth";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const sidebarExpanded = !sidebarCollapsed;

  const sections = [
    {
      title: "Dashboard",
      items: [{ label: "Overview", path: "/", Icon: User }],
    },
    {
      title: "Travel Management",
      items: [
        { label: "Travel Request", path: "/travel-request", Icon: PlaneIcon },
        { label: "Bookings", path: "/bookings", Icon: Calendar },
        { label: "Itineraries", path: "/itineraries", Icon: MapPinTrack },
      ],
    },
    {
      title: "Expense Management",
      items: [
        { label: "Expense Reports", path: "/expense-reports", Icon: FileText },
        { label: "Reimbursements", path: "/reimbursements", Icon: CreditCard },
        { label: "Approvals", path: "/approvals", Icon: CheckCircle },
      ],
    },
    {
      title: "Administration",
      items: [
        { label: "Users", path: "/users", Icon: Users },
        { label: "Departments", path: "/departments", Icon: TreeStructure },
        { label: "Settings", path: "/settings", Icon: Settings },
        { label: "Reports", path: "/reports", Icon: Reports },
      ],
    },
  ] as const;

  return (
    <div className="min-h-screen bg-background">
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-screen bg-white transition-all duration-700 ease-in-out border-r border-border overflow-hidden",
          sidebarExpanded ? "w-[330px]" : "w-16 sm:w-20",
        )}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-20 items-center px-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-white"
                >
                  <path
                    d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <span
                className={cn(
                  "text-lg font-semibold text-foreground whitespace-nowrap overflow-hidden transition-[opacity,max-width,margin] duration-700",
                  sidebarExpanded
                    ? "opacity-100 max-w-[220px] ml-2"
                    : "opacity-0 max-w-0 ml-0",
                )}
              >
                Travel Expenses Pro
              </span>
            </div>
          </div>

          <nav
            className={cn(
              "flex-1 overflow-y-auto overflow-x-hidden py-4 pb-6",
              sidebarExpanded ? "px-6" : "px-6",
            )}
          >
            <div className="space-y-8">
              {sections.map((section) => (
                <div key={section.title}>
                  {sidebarExpanded && (
                    <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-foreground">
                      {section.title}
                    </h3>
                  )}
                  <div className="space-y-2">
                    {section.items.map(({ label, path, Icon }) => (
                      <NavItem
                        key={label}
                        icon={<Icon className="h-5 w-5" />}
                        label={label}
                        active={location.pathname === path}
                        expanded={sidebarExpanded}
                        onClick={() => navigate(path)}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </nav>
        </div>
      </aside>

      <div
        className={cn(
          "transition-all duration-700 ease-in-out h-screen overflow-hidden",
          sidebarExpanded ? "ml-[330px]" : "ml-16 sm:ml-20",
        )}
      >
        <header className="sticky top-0 z-30 h-20 bg-white border-b border-border px-6">
          <div className="flex h-full items-center justify-between">
            <button
              aria-label="Toggle sidebar"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Menu className="h-6 w-6 text-foreground" />
            </button>

            <div className="flex items-center gap-4">
              <button
                aria-label="Notifications"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <Bell className="h-5 w-5 text-foreground" />
              </button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-3 rounded-md p-1.5 hover:bg-gray-100 transition-colors">
                    <img
                      src="https://api.builder.io/api/v1/image/assets/TEMP/f608110c5bb486e70228637345583ddd9f1e7591?width=80"
                      alt="John Admin"
                      className="h-10 w-10 rounded-md object-cover"
                    />
                    <span className="text-sm font-medium text-foreground">
                      John Admin
                    </span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => { clearAuth(); navigate("/login", { replace: true }); }}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        <main className="h-[calc(100vh-5rem)] overflow-y-auto overflow-x-hidden p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  expanded: boolean;
  onClick?: () => void;
}

function NavItem({ icon, label, active = false, expanded, onClick }: NavItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex w-full items-center rounded-[10px] py-3 transition-colors",
        expanded ? "gap-3 px-5 text-left" : "justify-center px-4",
        active
          ? "bg-primary text-primary-foreground"
          : "text-secondary-foreground hover:bg-gray-50",
      )}
    >
      <span className={cn(active ? "text-white" : "text-[#6B7280]", "[&_*]:fill-current [&_*]:stroke-current")}>{icon}</span>
      <span
        className={cn(
          "text-base font-medium whitespace-nowrap overflow-hidden transition-[opacity,max-width,margin] duration-700 ease-in-out",
          expanded ? "opacity-100 max-w-[200px] ml-2" : "opacity-0 max-w-0 ml-0",
        )}
      >
        {label}
      </span>
    </button>
  );
}
