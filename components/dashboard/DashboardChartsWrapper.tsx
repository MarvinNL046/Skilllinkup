"use client";

import dynamic from "next/dynamic";

const DashboardCharts = dynamic(
  () => import("@/components/dashboard/DashboardCharts"),
  { ssr: false }
);

interface Props {
  monthlyEarnings: { month: string; monthLabel: string; total: number }[];
  orderDistribution: { gig: number; project: number; pending: number };
}

export default function DashboardChartsWrapper(props: Props) {
  return <DashboardCharts {...props} />;
}
