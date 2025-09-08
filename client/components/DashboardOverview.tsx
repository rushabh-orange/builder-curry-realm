import React from "react";
import { Plane } from "lucide-react";
import { StatCard, TravelRequestItem, ExpenseReportItem, ExpenseTrendChart } from "@/components/dashboard";

export function DashboardOverview() {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  const values = [2750, 1800, 3800, 1120, 3760, 2300, 2130, 3446, 3910, 780, 1873, 2836];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-[26px] font-bold text-foreground">Dashboard Overview</h1>
        <p className="mt-2 text-lg text-foreground">
          Welcome back, John. Here's what's happening with your travel & expenses.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Active Trips"
          value="24"
          icon={<Plane className="h-8 w-8 text-[#0B98D3]" />}
          bgColor="bg-blue-50"
        />
        <StatCard
          title="Pending Expenses"
          value="$12,450"
          icon={<svg width="32" height="36" viewBox="0 0 32 36" fill="none" className="text-[#FD5E65]"><path fillRule="evenodd" clipRule="evenodd" d="M26.6667 27H5.33333V23.4H26.6667V27ZM26.6667 19.8H5.33333V16.2H26.6667V19.8ZM26.6667 12.6H5.33333V9H26.6667V12.6ZM0 36L2.66667 33.3L5.33333 36L8 33.3L10.6667 36L13.3333 33.3L16 36L18.6667 33.3L21.3333 36L24 33.3L26.6667 36L29.3333 33.3L32 36V0L29.3333 2.7L26.6667 0L24 2.7L21.3333 0L18.6667 2.7L16 0L13.3333 2.7L10.6667 0L8 2.7L5.33333 0L2.66667 2.7L0 0V36Z" fill="currentColor"/></svg>}
          bgColor="bg-red-50"
        />
        <StatCard
          title="Awaiting Approval"
          value="18"
          icon={<svg width="36" height="36" viewBox="0 0 36 36" fill="none" className="text-[#FF7502]"><path d="M18 0C8.07188 0 0 8.07187 0 18C0 27.9281 8.07188 36 18 36C27.9281 36 36 27.9281 36 18C36 8.07187 27.9281 0 18 0ZM23.4094 23.6156C23.0156 24.0094 22.5094 24.2063 21.9938 24.2063C21.4781 24.2063 20.9719 24.0094 20.5781 23.6156L16.575 19.6125C16.2 19.2375 15.9844 18.7312 15.9844 18.1969V10.2C15.9844 9.09375 16.8844 8.20313 17.9812 8.20313C19.0781 8.20313 19.9781 9.10313 19.9781 10.2V17.3719L23.3906 20.7844C24.1969 21.5719 24.1969 22.8375 23.4094 23.6156Z" fill="currentColor"/></svg>}
          bgColor="bg-orange-50"
        />
        <StatCard
          title="Monthly Budget"
          value="$45,000"
          icon={<svg width="20" height="36" viewBox="0 0 20 36" fill="none" className="text-[#41A34C]"><path d="M20 23.1429C20 27.396 16.6354 30.8571 12.5009 30.8571V33.4286C12.5009 34.8506 11.3836 36 10.0012 36C8.61892 36 7.50156 34.8506 7.50156 33.4286V30.8571H6.83165C4.16448 30.8571 1.67479 29.3811 0.337457 27.0026C-0.354957 25.7709 0.0549938 24.1997 1.24734 23.49C2.4447 22.7726 3.9745 23.1994 4.66192 24.426C5.10936 25.2231 5.93926 25.7143 6.82915 25.7143H12.4984C13.8783 25.7143 14.9981 24.5623 14.9981 23.1429C14.9981 22.1709 14.3207 21.348 13.3883 21.1886L5.78678 19.8849C2.4322 19.3114 0 16.3543 0 12.8571C0 8.604 3.36458 5.14286 7.49906 5.14286V2.57143C7.49906 1.152 8.61642 0 9.99875 0C11.3811 0 12.4984 1.152 12.4984 2.57143V5.14286H13.1684C15.8355 5.14286 18.3252 6.62143 19.6625 9C20.355 10.2291 19.945 11.8003 18.7527 12.5126C17.5528 13.2249 16.0255 12.8031 15.3381 11.574C14.8906 10.7794 14.0607 10.2883 13.1709 10.2883H7.50156C6.12173 10.2883 5.00188 11.4429 5.00188 12.8597C5.00188 13.8317 5.67929 14.6546 6.61167 14.814L14.2132 16.1177C17.5678 16.6911 20 19.6483 20 23.1454V23.1429Z" fill="currentColor"/></svg>}
          bgColor="bg-green-50"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-[10px] bg-white p-6 shadow-[0_2px_2px_0_rgba(59,130,247,0.30)]">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold text-foreground">Recent Travel Requests</h2>
            <button className="text-base font-bold text-primary underline">View All</button>
          </div>
          <div className="space-y-4">
            <TravelRequestItem
              name="Sarah Johnson"
              avatar="https://api.builder.io/api/v1/image/assets/TEMP/4fa4c38ef3892012b166bc2fbb474ffbd49bda2e?width=100"
              from="New York"
              to="London"
              status="pending"
            />
            <div className="h-px bg-foreground/10" />
            <TravelRequestItem
              name="Mike Chen"
              avatar="https://api.builder.io/api/v1/image/assets/TEMP/584eb215fe812bf81c2c9ffc953c457482b1f3de?width=100"
              from="San Francisco"
              to="Tokyo"
              status="approved"
            />
            <div className="h-px bg-foreground/10" />
            <TravelRequestItem
              name="Emma Davis"
              avatar="https://api.builder.io/api/v1/image/assets/TEMP/39373ec2416a0763f8d322ef0bcb73c6be64dd70?width=100"
              from="Chicago"
              to="Berlin"
              status="rejected"
            />
          </div>
        </div>

        <div className="rounded-[10px] bg-white p-6 shadow-[0_2px_2px_0_rgba(59,130,247,0.30)]">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold text-foreground">Expense Reports</h2>
            <button className="text-base font-bold text-primary underline">View All</button>
          </div>
          <div className="space-y-4">
            <ExpenseReportItem
              title="Q1 2025 Business Travel"
              submittedBy="Submitted by Alex Rivera"
              amount="$3.245"
              status="pending"
            />
            <div className="h-px bg-foreground/10" />
            <ExpenseReportItem
              title="Client Meeting Expenses"
              submittedBy="Submitted by Lisa Park"
              amount="$3.245"
              status="approved"
            />
            <div className="h-px bg-foreground/10" />
            <ExpenseReportItem
              title="Conference Attendance"
              submittedBy="Submitted by David Kim"
              amount="$3.245"
              status="rejected"
            />
          </div>
        </div>
      </div>

      <div className="rounded-[10px] bg-white p-6 shadow-[0_2px_2px_0_rgba(59,130,247,0.30)]">
        <h2 className="mb-8 text-xl font-bold text-foreground">Monthly Expense Trends</h2>
        <ExpenseTrendChart months={months} values={values} />
      </div>

      <div className="flex items-center justify-between py-4 text-base text-primary">
        <span>© 2025 Travel Expense Pro. All rights reserved.</span>
        <div className="flex gap-8">
          <a href="#" className="hover:underline">Privacy</a>
          <a href="#" className="hover:underline">Terms</a>
          <a href="#" className="hover:underline">Support</a>
        </div>
      </div>
    </div>
  );
}
