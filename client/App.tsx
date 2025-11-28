import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import TravelRequestApprovals from "./pages/TravelRequestApprovals";
import { PlaceholderPage } from "./pages/PlaceholderPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/travel-request" element={<TravelRequestApprovals />} />
          <Route
            path="/bookings"
            element={
              <PlaceholderPage
                title="Bookings"
                description="View and manage travel bookings"
              />
            }
          />
          <Route
            path="/itineraries"
            element={
              <PlaceholderPage
                title="Itineraries"
                description="Plan and view travel itineraries"
              />
            }
          />
          <Route
            path="/expense-reports"
            element={
              <PlaceholderPage
                title="Expense Reports"
                description="Submit and track expense reports"
              />
            }
          />
          <Route
            path="/reimbursements"
            element={
              <PlaceholderPage
                title="Reimbursements"
                description="Manage expense reimbursements"
              />
            }
          />
          <Route path="/approvals" element={<TravelRequestApprovals />} />
          <Route
            path="/users"
            element={
              <PlaceholderPage
                title="Users"
                description="Manage user accounts and permissions"
              />
            }
          />
          <Route
            path="/departments"
            element={
              <PlaceholderPage
                title="Departments"
                description="Organize and manage departments"
              />
            }
          />
          <Route
            path="/settings"
            element={
              <PlaceholderPage
                title="Settings"
                description="Configure system settings"
              />
            }
          />
          <Route
            path="/reports"
            element={
              <PlaceholderPage
                title="Reports"
                description="View analytics and reports"
              />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
