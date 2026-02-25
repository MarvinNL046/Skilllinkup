"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler
);

interface MonthlyEarningsPoint {
  month: string;
  monthLabel: string;
  total: number;
}

interface OrderDistribution {
  gig: number;
  project: number;
  pending: number;
}

interface DashboardChartsProps {
  monthlyEarnings: MonthlyEarningsPoint[];
  orderDistribution: OrderDistribution;
}

export default function DashboardCharts({
  monthlyEarnings,
  orderDistribution,
}: DashboardChartsProps) {
  // Line chart: earnings over time
  const lineLabels =
    monthlyEarnings.length > 0
      ? monthlyEarnings.map((d) => d.monthLabel)
      : ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

  const lineValues =
    monthlyEarnings.length > 0
      ? monthlyEarnings.map((d) => d.total)
      : [0, 0, 0, 0, 0, 0];

  const lineData = {
    labels: lineLabels,
    datasets: [
      {
        label: "Earnings (EUR)",
        data: lineValues,
        fill: true,
        borderColor: "#ef2b70",
        backgroundColor: "rgba(239, 43, 112, 0.08)",
        pointBackgroundColor: "#ef2b70",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointRadius: 4,
        tension: 0.4,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx: any) => `€${ctx.parsed.y.toFixed(2)}`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#94a3b8", font: { size: 11 } },
      },
      y: {
        grid: { color: "rgba(148,163,184,0.1)" },
        ticks: {
          color: "#94a3b8",
          font: { size: 11 },
          callback: (value: any) => `€${value}`,
        },
        beginAtZero: true,
      },
    },
  };

  // Doughnut chart: order type distribution
  const { gig, project, pending } = orderDistribution;
  const hasOrders = gig + project + pending > 0;

  const doughnutData = {
    labels: ["Gig Orders", "Project Orders", "Pending"],
    datasets: [
      {
        data: hasOrders ? [gig, project, pending] : [1, 1, 1],
        backgroundColor: ["#ef2b70", "#1e1541", "#22c55e"],
        borderColor: ["#fff", "#fff", "#fff"],
        borderWidth: 2,
        hoverOffset: 4,
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: { color: "#64748b", font: { size: 11 }, padding: 16 },
      },
      tooltip: {
        callbacks: {
          label: (ctx: any) =>
            hasOrders
              ? ` ${ctx.label}: ${ctx.parsed}`
              : ` ${ctx.label}: 0`,
        },
      },
    },
    cutout: "70%",
  };

  return (
    <div className="row">
      {/* Line chart — earnings */}
      <div className="col-lg-8">
        <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
          <h4 className="title fz17 mb20">Earnings Overview</h4>
          <p className="fz14 text mb-3">Monthly earnings from completed orders</p>
          <div style={{ height: 220 }}>
            <Line data={lineData} options={lineOptions as any} />
          </div>
        </div>
      </div>

      {/* Doughnut chart — order distribution */}
      <div className="col-lg-4">
        <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
          <h4 className="title fz17 mb20">Order Types</h4>
          <p className="fz14 text mb-3">Distribution of your orders</p>
          <div style={{ height: 220 }}>
            <Doughnut data={doughnutData} options={doughnutOptions as any} />
          </div>
        </div>
      </div>
    </div>
  );
}
