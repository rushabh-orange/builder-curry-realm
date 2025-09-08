import React from "react";
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
          icon={
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" className="text-[#0B98D3]"><path d="M36 20.25C36 20.7424 35.903 21.2301 35.7146 21.685C35.5262 22.14 35.2501 22.5534 34.902 22.9016C34.5538 23.2498 34.1406 23.5261 33.6857 23.7145C33.2309 23.903 32.7434 24 32.2511 24H26.1988L19.8616 33.7304C19.4716 34.4225 18.9038 34.9978 18.2171 35.3968C17.5303 35.7958 16.7494 36.004 15.9552 35.9999C15.318 36.0001 14.6902 35.8458 14.1257 35.5502C13.5611 35.2545 13.0766 34.8264 12.7137 34.3025C12.3507 33.7786 12.1202 33.1745 12.0417 32.5419C11.9633 31.9094 12.0393 31.2672 12.2633 30.6705L15.0345 24H9.00769C7.9503 24 6.91168 23.7205 5.99708 23.1897C5.08248 22.6589 4.3244 21.8957 3.79967 20.9775L0.310168 15.24C0.161066 14.9923 0.0630765 14.7173 0.0219831 14.4311C-0.0191102 14.145 -0.00247449 13.8535 0.0709084 13.5738C0.144291 13.2942 0.272934 13.0321 0.449244 12.803C0.625553 12.5739 0.845957 12.3825 1.09744 12.24C1.49653 12.0307 1.95195 11.9542 2.39749 12.0217C2.84303 12.0891 3.25544 12.297 3.57474 12.615L5.69963 14.742C6.82427 15.8673 8.34971 16.4997 9.94042 16.5H32.2511C32.7434 16.5 33.2309 16.597 33.6857 16.7854C34.1406 16.9739 34.5538 17.2501 34.902 17.5983C35.2501 17.9466 35.5262 18.36 35.7146 18.8149C35.903 19.2699 36 19.7575 36 20.25ZM26.5992 13.5L19.8511 2.26953C19.4616 1.57805 18.8946 1.00313 18.2086 0.60416C17.5227 0.205188 16.7427 -0.00336562 15.9492 4.10762e-05C15.3121 0.000214608 14.6845 0.154776 14.1202 0.450501C13.5558 0.746226 13.0715 1.17431 12.7086 1.69813C12.3457 2.22194 12.1151 2.8259 12.0365 3.45831C11.9579 4.09073 12.0337 4.73278 12.2573 5.14286H26.5992Z" fill="currentColor"/></svg>
          }
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
