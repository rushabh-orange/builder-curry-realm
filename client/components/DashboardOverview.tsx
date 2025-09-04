import { TrendingUp, Clock, FileText, DollarSign, ArrowRight } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  bgColor: string;
}

function StatCard({ title, value, icon, bgColor }: StatCardProps) {
  return (
    <div className="rounded-[10px] bg-white p-6 shadow-[0_2px_2px_0_rgba(59,130,247,0.30)]">
      <div className="flex items-center gap-4">
        <div className={`flex h-[70px] w-[70px] items-center justify-center rounded-lg ${bgColor}`}>
          {icon}
        </div>
        <div>
          <p className="text-lg font-normal text-secondary-foreground">{title}</p>
          <p className="text-[26px] font-bold text-foreground">{value}</p>
        </div>
      </div>
    </div>
  );
}

interface TravelRequestProps {
  name: string;
  avatar: string;
  from: string;
  to: string;
  status: "pending" | "approved" | "rejected";
}

function TravelRequestItem({ name, avatar, from, to, status }: TravelRequestProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-orange-50 text-orange-500";
      case "approved":
        return "bg-green-50 text-green-600";
      case "rejected":
        return "bg-red-50 text-red-500";
      default:
        return "bg-gray-50 text-gray-500";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Pending";
      case "approved":
        return "Approved";
      case "rejected":
        return "Rejected";
      default:
        return "Unknown";
    }
  };

  return (
    <div className="flex items-center justify-between py-4">
      <div className="flex items-center gap-4">
        <img
          src={avatar}
          alt={name}
          className="h-12 w-12 rounded-md object-cover"
        />
        <div>
          <h4 className="text-lg font-medium text-foreground">{name}</h4>
          <div className="flex items-center gap-2 text-base text-secondary-foreground">
            <span>{from}</span>
            <ArrowRight className="h-4 w-4 text-secondary-foreground" />
            <span>{to}</span>
          </div>
        </div>
      </div>
      <div
        className={`rounded px-3 py-1 text-sm font-medium ${getStatusColor(status)}`}
      >
        {getStatusText(status)}
      </div>
    </div>
  );
}

interface ExpenseReportProps {
  title: string;
  submittedBy: string;
  amount: string;
  status: "pending" | "approved" | "rejected";
}

function ExpenseReportItem({ title, submittedBy, amount, status }: ExpenseReportProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-orange-50 text-orange-500";
      case "approved":
        return "bg-green-50 text-green-600";
      case "rejected":
        return "bg-red-50 text-red-500";
      default:
        return "bg-gray-50 text-gray-500";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Pending";
      case "approved":
        return "Approved";
      case "rejected":
        return "Rejected";
      default:
        return "Unknown";
    }
  };

  return (
    <div className="flex items-center justify-between py-4">
      <div>
        <h4 className="text-lg font-medium text-foreground">{title}</h4>
        <p className="text-base text-secondary-foreground">{submittedBy}</p>
      </div>
      <div className="flex items-center gap-4">
        <p className="text-lg font-bold text-foreground">{amount}</p>
        <div
          className={`rounded px-3 py-1 text-sm font-medium ${getStatusColor(status)}`}
        >
          {getStatusText(status)}
        </div>
      </div>
    </div>
  );
}

function SimpleChart() {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const values = [1500, 2500, 1000, 2700, 1800, 1600, 2800, 2900, 800, 700, 1900, 2000];
  const maxValue = Math.max(...values);

  return (
    <div className="space-y-6">
      <div className="relative h-80">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 flex h-full flex-col justify-between text-right">
          <span className="text-base font-medium text-foreground">$4,000</span>
          <span className="text-base font-medium text-foreground">$3,000</span>
          <span className="text-base font-medium text-foreground">$2,000</span>
          <span className="text-base font-medium text-foreground">$1,000</span>
          <span className="text-base font-medium text-foreground">0</span>
        </div>

        {/* Grid lines */}
        <div className="absolute left-16 top-0 h-full w-full">
          {[0, 1, 2, 3, 4].map((index) => (
            <div
              key={index}
              className="absolute w-full border-t border-dashed border-foreground/20"
              style={{ top: `${index * 25}%` }}
            />
          ))}
        </div>

        {/* Chart bars */}
        <div className="absolute left-16 top-0 flex h-full w-full items-end justify-between px-4">
          {values.map((value, index) => {
            const height = (value / maxValue) * 100;
            const isHighlighted = index === 4; // May
            
            return (
              <div key={index} className="relative flex flex-col items-center">
                {/* Highlighted value tooltip */}
                {isHighlighted && (
                  <div className="absolute -top-16 flex flex-col items-center">
                    <div className="rounded-md bg-orange-500 px-3 py-2 text-white text-sm font-medium">
                      $2,750
                    </div>
                    <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-orange-500" />
                  </div>
                )}
                
                {/* Background bar */}
                <div className="w-12 bg-blue-50 rounded-[10px] mb-0" style={{ height: `${height}%` }}>
                  {/* Foreground bar */}
                  <div
                    className="w-full bg-primary rounded-b-[10px]"
                    style={{ 
                      height: `${height * 0.7}%`,
                      marginTop: `${height * 0.3}%`
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* X-axis labels */}
      <div className="flex justify-between px-20">
        {months.map((month) => (
          <span key={month} className="text-base font-medium text-secondary-foreground">
            {month}
          </span>
        ))}
      </div>
    </div>
  );
}

export function DashboardOverview() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-[26px] font-bold text-foreground">Dashboard Overview</h1>
        <p className="mt-2 text-lg text-foreground">
          Welcome back, John. Here's what's happening with your travel & expenses.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Active Trips"
          value="24"
          icon={
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" className="text-[#0B98D3]">
              <path
                d="M36 20.25C36 20.7424 35.903 21.2301 35.7146 21.685C35.5262 22.14 35.2501 22.5534 34.902 22.9016C34.5538 23.2498 34.1406 23.5261 33.6857 23.7145C33.2309 23.903 32.7434 24 32.2511 24H26.1988L19.8616 33.7304C19.4716 34.4225 18.9038 34.9978 18.2171 35.3968C17.5303 35.7958 16.7494 36.004 15.9552 35.9999C15.318 36.0001 14.6902 35.8458 14.1257 35.5502C13.5611 35.2545 13.0766 34.8264 12.7137 34.3025C12.3507 33.7786 12.1202 33.1745 12.0417 32.5419C11.9633 31.9094 12.0393 31.2672 12.2633 30.6705L15.0345 24H9.00769C7.9503 24 6.91168 23.7205 5.99708 23.1897C5.08248 22.6589 4.3244 21.8957 3.79967 20.9775L0.310168 15.24C0.161066 14.9923 0.0630765 14.7173 0.0219831 14.4311C-0.0191102 14.145 -0.00247449 13.8535 0.0709084 13.5738C0.144291 13.2942 0.272934 13.0321 0.449244 12.803C0.625553 12.5739 0.845957 12.3825 1.09744 12.24C1.49653 12.0307 1.95195 11.9542 2.39749 12.0217C2.84303 12.0891 3.25544 12.297 3.57474 12.615L5.69963 14.742C6.82427 15.8673 8.34971 16.4997 9.94042 16.5H32.2511C32.7434 16.5 33.2309 16.597 33.6857 16.7854C34.1406 16.9739 34.5538 17.2501 34.902 17.5983C35.2501 17.9466 35.5262 18.36 35.7146 18.8149C35.903 19.2699 36 19.7575 36 20.25ZM26.5992 13.5L19.8511 2.26953C19.4616 1.57805 18.8946 1.00313 18.2086 0.60416C17.5227 0.205188 16.7427 -0.00336562 15.9492 4.10762e-05C15.3121 0.000214608 14.6845 0.154776 14.1202 0.450501C13.5558 0.746226 13.0715 1.17431 12.7086 1.69813C12.3457 2.22194 12.1151 2.8259 12.0365 3.45831C11.9579 4.09073 12.0337 4.73278 12.2573 5.32953L15.4334 13.5H26.5992Z"
                fill="currentColor"
              />
            </svg>
          }
          bgColor="bg-blue-50"
        />

        <StatCard
          title="Pending Expenses"
          value="$12,450"
          icon={
            <svg width="32" height="36" viewBox="0 0 32 36" fill="none" className="text-[#FD5E65]">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M26.6667 27H5.33333V23.4H26.6667V27ZM26.6667 19.8H5.33333V16.2H26.6667V19.8ZM26.6667 12.6H5.33333V9H26.6667V12.6ZM0 36L2.66667 33.3L5.33333 36L8 33.3L10.6667 36L13.3333 33.3L16 36L18.6667 33.3L21.3333 36L24 33.3L26.6667 36L29.3333 33.3L32 36V0L29.3333 2.7L26.6667 0L24 2.7L21.3333 0L18.6667 2.7L16 0L13.3333 2.7L10.6667 0L8 2.7L5.33333 0L2.66667 2.7L0 0V36Z"
                fill="currentColor"
              />
            </svg>
          }
          bgColor="bg-red-50"
        />

        <StatCard
          title="Awaiting Approval"
          value="18"
          icon={
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" className="text-[#FF7502]">
              <path
                d="M18 0C8.07188 0 0 8.07187 0 18C0 27.9281 8.07188 36 18 36C27.9281 36 36 27.9281 36 18C36 8.07187 27.9281 0 18 0ZM23.4094 23.6156C23.0156 24.0094 22.5094 24.2063 21.9938 24.2063C21.4781 24.2063 20.9719 24.0094 20.5781 23.6156L16.575 19.6125C16.2 19.2375 15.9844 18.7312 15.9844 18.1969V10.2C15.9844 9.09375 16.8844 8.20313 17.9812 8.20313C19.0781 8.20313 19.9781 9.10313 19.9781 10.2V17.3719L23.3906 20.7844C24.1969 21.5719 24.1969 22.8375 23.4094 23.6156Z"
                fill="currentColor"
              />
            </svg>
          }
          bgColor="bg-orange-50"
        />

        <StatCard
          title="Monthly Budget"
          value="$45,000"
          icon={
            <svg width="20" height="36" viewBox="0 0 20 36" fill="none" className="text-[#41A34C]">
              <path
                d="M20 23.1429C20 27.396 16.6354 30.8571 12.5009 30.8571V33.4286C12.5009 34.8506 11.3836 36 10.0012 36C8.61892 36 7.50156 34.8506 7.50156 33.4286V30.8571H6.83165C4.16448 30.8571 1.67479 29.3811 0.337457 27.0026C-0.354957 25.7709 0.0549938 24.1997 1.24734 23.49C2.4447 22.7726 3.9745 23.1994 4.66192 24.426C5.10936 25.2231 5.93926 25.7143 6.82915 25.7143H12.4984C13.8783 25.7143 14.9981 24.5623 14.9981 23.1429C14.9981 22.1709 14.3207 21.348 13.3883 21.1886L5.78678 19.8849C2.4322 19.3114 0 16.3543 0 12.8571C0 8.604 3.36458 5.14286 7.49906 5.14286V2.57143C7.49906 1.152 8.61642 0 9.99875 0C11.3811 0 12.4984 1.152 12.4984 2.57143V5.14286H13.1684C15.8355 5.14286 18.3252 6.62143 19.6625 9C20.355 10.2291 19.945 11.8003 18.7527 12.5126C17.5528 13.2249 16.0255 12.8031 15.3381 11.574C14.8906 10.7794 14.0607 10.2883 13.1709 10.2883H7.50156C6.12173 10.2883 5.00188 11.4429 5.00188 12.8597C5.00188 13.8317 5.67929 14.6546 6.61167 14.814L14.2132 16.1177C17.5678 16.6911 20 19.6483 20 23.1454V23.1429Z"
                fill="currentColor"
              />
            </svg>
          }
          bgColor="bg-green-50"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Travel Requests */}
        <div className="rounded-[10px] bg-white p-6 shadow-[0_2px_2px_0_rgba(59,130,247,0.30)]">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold text-foreground">Recent Travel Requests</h2>
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

        {/* Expense Reports */}
        <div className="rounded-[10px] bg-white p-6 shadow-[0_2px_2px_0_rgba(59,130,247,0.30)]">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold text-foreground">Expense Reports</h2>
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

      {/* Monthly Expense Trends */}
      <div className="rounded-[10px] bg-white p-6 shadow-[0_2px_2px_0_rgba(59,130,247,0.30)]">
        <h2 className="mb-8 text-xl font-bold text-foreground">Monthly Expense Trends</h2>
        <SimpleChart />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between py-4 text-base text-primary">
        <span>© 2025 Travel Expense Pro. All rights reserved.</span>
        <div className="flex gap-8">
          <span>Privacy</span>
          <span>Terms</span>
          <span>Support</span>
        </div>
      </div>
    </div>
  );
}
