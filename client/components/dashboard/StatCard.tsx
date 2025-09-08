import React from "react";

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  bgColor: string; // tailwind bg class
}

export function StatCard({ title, value, icon, bgColor }: StatCardProps) {
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

export type { StatCardProps };
