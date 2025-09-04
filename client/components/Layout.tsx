import { useState } from "react";
import { cn } from "@/lib/utils";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Bell,
  Menu,
  Users,
  Plane,
  Calendar,
  MapPin,
  FileText,
  CreditCard,
  CheckCircle,
  Settings,
  BarChart3,
  Building2
} from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarHover, setSidebarHover] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const sidebarExpanded = !sidebarCollapsed || sidebarHover;

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-screen bg-white transition-all duration-300 ease-in-out border-r border-border",
          sidebarExpanded ? "w-[330px]" : "w-20"
        )}
        onMouseEnter={() => sidebarCollapsed && setSidebarHover(true)}
        onMouseLeave={() => setSidebarHover(false)}
      >
        <div className="flex h-full flex-col">
          {/* Logo Section */}
          <div className="flex h-20 items-center px-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
                  <path
                    d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              {sidebarExpanded && (
                <span className="text-lg font-semibold text-foreground">
                  Travel Expenses Pro
                </span>
              )}
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-6 py-4">
            <div className="space-y-8">
              {/* Dashboard Section */}
              <div>
                {sidebarExpanded && (
                  <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-foreground">
                    Dashboard
                  </h3>
                )}
                <div className="space-y-2">
                  <NavItem
                    icon={<Users className="h-5 w-5" />}
                    label="Overview"
                    active={location.pathname === '/'}
                    expanded={sidebarExpanded}
                    onClick={() => navigate('/')}
                  />
                </div>
              </div>

              {/* Travel Management Section */}
              <div>
                {sidebarExpanded && (
                  <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-foreground">
                    Travel Management
                  </h3>
                )}
                <div className="space-y-2">
                  <NavItem
                    icon={<Plane className="h-5 w-5" />}
                    label="Travel Request"
                    active={location.pathname === '/travel-request'}
                    expanded={sidebarExpanded}
                    onClick={() => navigate('/travel-request')}
                  />
                  <NavItem
                    icon={<Calendar className="h-5 w-5" />}
                    label="Bookings"
                    active={location.pathname === '/bookings'}
                    expanded={sidebarExpanded}
                    onClick={() => navigate('/bookings')}
                  />
                  <NavItem
                    icon={<MapPin className="h-5 w-5" />}
                    label="Itineraries"
                    active={location.pathname === '/itineraries'}
                    expanded={sidebarExpanded}
                    onClick={() => navigate('/itineraries')}
                  />
                </div>
              </div>

              {/* Expense Management Section */}
              <div>
                {sidebarExpanded && (
                  <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-foreground">
                    Expense Management
                  </h3>
                )}
                <div className="space-y-2">
                  <NavItem
                    icon={<FileText className="h-5 w-5" />}
                    label="Expense Reports"
                    active={location.pathname === '/expense-reports'}
                    expanded={sidebarExpanded}
                    onClick={() => navigate('/expense-reports')}
                  />
                  <NavItem
                    icon={<CreditCard className="h-5 w-5" />}
                    label="Reimbursements"
                    active={location.pathname === '/reimbursements'}
                    expanded={sidebarExpanded}
                    onClick={() => navigate('/reimbursements')}
                  />
                  <NavItem
                    icon={<CheckCircle className="h-5 w-5" />}
                    label="Approvals"
                    active={location.pathname === '/approvals'}
                    expanded={sidebarExpanded}
                    onClick={() => navigate('/approvals')}
                  />
                </div>
              </div>

              {/* Administration Section */}
              <div>
                {sidebarExpanded && (
                  <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-foreground">
                    Administration
                  </h3>
                )}
                <div className="space-y-2">
                  <NavItem
                    icon={<Users className="h-5 w-5" />}
                    label="Users"
                    active={location.pathname === '/users'}
                    expanded={sidebarExpanded}
                    onClick={() => navigate('/users')}
                  />
                  <NavItem
                    icon={<Building2 className="h-5 w-5" />}
                    label="Departments"
                    active={location.pathname === '/departments'}
                    expanded={sidebarExpanded}
                    onClick={() => navigate('/departments')}
                  />
                  <NavItem
                    icon={<Settings className="h-5 w-5" />}
                    label="Settings"
                    active={location.pathname === '/settings'}
                    expanded={sidebarExpanded}
                    onClick={() => navigate('/settings')}
                  />
                  <NavItem
                    icon={<BarChart3 className="h-5 w-5" />}
                    label="Reports"
                    active={location.pathname === '/reports'}
                    expanded={sidebarExpanded}
                    onClick={() => navigate('/reports')}
                  />
                </div>
              </div>
            </div>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div
        className={cn(
          "transition-all duration-300 ease-in-out",
          sidebarExpanded ? "ml-[330px]" : "ml-20"
        )}
      >
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 h-20 bg-white border-b border-border px-6">
          <div className="flex h-full items-center justify-between">
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Menu className="h-6 w-6 text-foreground" />
            </button>

            <div className="flex items-center gap-4">
              <button className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                <Bell className="h-5 w-5 text-foreground" />
              </button>
              <div className="flex items-center gap-3">
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/f608110c5bb486e70228637345583ddd9f1e7591?width=80"
                  alt="John Admin"
                  className="h-10 w-10 rounded-md object-cover"
                />
                <span className="text-sm font-medium text-foreground">
                  John Admin
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">{children}</main>
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
        "flex w-full items-center gap-3 rounded-[10px] px-5 py-3 text-left transition-colors",
        active
          ? "bg-primary text-primary-foreground"
          : "text-secondary-foreground hover:bg-gray-50"
      )}
    >
      <span className={cn(active ? "text-white" : "text-secondary")}>{icon}</span>
      {expanded && (
        <span className="text-base font-medium">{label}</span>
      )}
    </button>
  );
}
