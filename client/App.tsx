import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { PlaceholderPage } from "./pages/PlaceholderPage";
import Login from "./pages/Login";
import { isAuthenticated } from "@/lib/auth";

const queryClient = new QueryClient();

function Protected({ children }: { children: JSX.Element }) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <Protected>
                <Index />
              </Protected>
            }
          />
          <Route
            path="/travel-request"
            element={
              <Protected>
                <PlaceholderPage
                  title="Travel Request"
                  description="Manage and submit travel requests"
                />
              </Protected>
            }
          />
          <Route
            path="/bookings"
            element={
              <Protected>
                <PlaceholderPage
                  title="Bookings"
                  description="View and manage travel bookings"
                />
              </Protected>
            }
          />
          <Route
            path="/itineraries"
            element={
              <Protected>
                <PlaceholderPage
                  title="Itineraries"
                  description="Plan and view travel itineraries"
                />
              </Protected>
            }
          />
          <Route
            path="/expense-reports"
            element={
              <Protected>
                <PlaceholderPage
                  title="Expense Reports"
                  description="Submit and track expense reports"
                />
              </Protected>
            }
          />
          <Route
            path="/reimbursements"
            element={
              <Protected>
                <PlaceholderPage
                  title="Reimbursements"
                  description="Manage expense reimbursements"
                />
              </Protected>
            }
          />
          <Route
            path="/approvals"
            element={
              <Protected>
                <PlaceholderPage
                  title="Approvals"
                  description="Review and approve travel requests"
                />
              </Protected>
            }
          />
          <Route
            path="/users"
            element={
              <Protected>
                <PlaceholderPage
                  title="Users"
                  description="Manage user accounts and permissions"
                />
              </Protected>
            }
          />
          <Route
            path="/departments"
            element={
              <Protected>
                <PlaceholderPage
                  title="Departments"
                  description="Organize and manage departments"
                />
              </Protected>
            }
          />
          <Route
            path="/settings"
            element={
              <Protected>
                <PlaceholderPage
                  title="Settings"
                  description="Configure system settings"
                />
              </Protected>
            }
          />
          <Route
            path="/reports"
            element={
              <Protected>
                <PlaceholderPage
                  title="Reports"
                  description="View analytics and reports"
                />
              </Protected>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
