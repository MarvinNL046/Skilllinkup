"use client";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DoughnutChart({ userId }) {
  const chartData = useQuery(
    api.marketplace.dashboard.getChartData,
    userId ? { userId } : "skip"
  );

  const isLoading = userId && chartData === undefined;
  const breakdown = chartData?.statusBreakdown ?? {
    completed: 0,
    active: 0,
    pending: 0,
    cancelled: 0,
  };

  const total = breakdown.completed + breakdown.active + breakdown.pending + breakdown.cancelled;
  const hasData = total > 0;

  const pct = (v) => (total > 0 ? Math.round((v / total) * 100) : 0);

  const data = {
    labels: [
      `Completed ${pct(breakdown.completed)}%`,
      `Active ${pct(breakdown.active)}%`,
      `Pending ${pct(breakdown.pending)}%`,
      `Cancelled ${pct(breakdown.cancelled)}%`,
    ],
    datasets: [
      {
        label: " ",
        backgroundColor: ["#5BBB7B", "#3B82F6", "#F59E0B", "#9CA3AF"],
        data: [breakdown.completed, breakdown.active, breakdown.pending, breakdown.cancelled],
        borderWidth: 4,
        hoverBorderWidth: 4,
      },
    ],
  };

  const options = {
    cutout: "70%",
    plugins: {
      legend: {
        display: true,
        labels: {
          boxHeight: 16,
        },
      },
    },
  };

  return (
    <>
      <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
        <div className="bdrb1 pb15 mb30">
          <h5 className="title">Order Status</h5>
        </div>
        {isLoading ? (
          <div className="text-center py-5">
            <div className="spinner-border spinner-border-sm text-thm" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : !hasData ? (
          <div className="text-center py-5">
            <p className="text mb-0">No orders yet</p>
          </div>
        ) : (
          <Doughnut data={data} options={options} />
        )}
      </div>
    </>
  );
}
