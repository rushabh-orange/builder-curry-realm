import React from "react";
import {
  StatCard,
  TravelRequestItem,
  ExpenseReportItem,
  ExpenseTrendChart,
} from "@/components/dashboard";
import {
  StatCardPlane,
  StatCardFileText,
  StatCardWaiting,
  StatCardExpense,
} from "@/assets/icons";

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
  const values = [
    2750, 1800, 3800, 1120, 3760, 2300, 2130, 3446, 3910, 780, 1873, 2836,
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-[26px] font-bold text-foreground">
          Dashboard Overview
        </h1>
        <p className="mt-2 text-lg text-foreground">
          Welcome back, John. Here's what's happening with your travel &
          expenses.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Active Trips"
          value="24"
          icon={
            <StatCardPlane className="h-9 w-9 text-[#0B98D3] [&_*]:fill-current" />
          }
          bgColor="bg-blue-50"
        />
        <StatCard
          title="Pending Expenses"
          value="$12,450"
          icon={<StatCardFileText className="h-9 w-9" />}
          bgColor="bg-red-50"
        />
        <StatCard
          title="Awaiting Approval"
          value="18"
          icon={<StatCardWaiting className="h-9 w-9" />}
          bgColor="bg-orange-50"
        />
        <StatCard
          title="Monthly Budget"
          value="$45,000"
          icon={<StatCardExpense className="h-9 w-9" />}
          bgColor="bg-green-50"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-[10px] bg-white p-6 shadow-[0_2px_2px_0_rgba(59,130,247,0.30)]">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold text-foreground">
              Recent Travel Requests
            </h2>
            <button className="text-base font-bold text-primary underline">
              View All
            </button>
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
            <h2 className="text-xl font-bold text-foreground">
              Expense Reports
            </h2>
            <button className="text-base font-bold text-primary underline">
              View All
            </button>
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
        <h2 className="mb-8 text-xl font-bold text-foreground">
          Monthly Expense Trends
        </h2>
        <ExpenseTrendChart months={months} values={values} />
      </div>

      <div className="flex items-center justify-between py-4 text-base text-primary">
        <span>© 2025 Travel Expense Pro. All rights reserved.</span>
        <div className="flex gap-8">
          <a href="#" className="hover:underline">
            Privacy
          </a>
          <a href="#" className="hover:underline">
            Terms
          </a>
          <a href="#" className="hover:underline">
            Support
          </a>
        </div>
      </div>
    </div>
  );
}
