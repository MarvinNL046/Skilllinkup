"use client";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { useState } from "react";
import { Line } from "react-chartjs-2";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

const dropdownData = ["Last 3 Months", "Last 6 Months", "Last 12 Months"];

export default function LineChart({ userId }) {
  const [getSelected, setSelected] = useState(2); // default: 12 months

  const chartData = useQuery(
    api.marketplace.dashboard.getChartData,
    userId ? { userId } : "skip"
  );

  const isLoading = userId && chartData === undefined;
  const monthlyOrders = chartData?.monthlyOrders ?? [];

  // Slice based on selected timeframe
  const sliceMap = { 0: 3, 1: 6, 2: 12 };
  const sliceCount = sliceMap[getSelected] ?? 12;
  const visible = monthlyOrders.slice(-sliceCount);

  const labels = visible.map((m) => m.month);
  const values = visible.map((m) => m.count);
  const maxVal = Math.max(...values, 5);
  const hasData = values.some((v) => v > 0);

  const data = {
    labels,
    datasets: [
      {
        label: "Orders",
        backgroundColor: "rgba(251, 247, 237, 0.9)",
        borderColor: "#5BBB7B",
        data: values,
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        min: 0,
        max: maxVal + Math.ceil(maxVal * 0.2),
        ticks: {
          stepSize: Math.max(1, Math.ceil(maxVal / 5)),
        },
      },
    },
  };

  return (
    <>
      <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
        <div className="navtab-style1">
          <div className="d-sm-flex align-items-center justify-content-between">
            <h4 className="title fz17 mb20">Orders</h4>
            <div className="page_control_shorting dark-color pr10 text-center text-md-end">
              <div className="dropdown bootstrap-select show-tick">
                <button
                  type="button"
                  className="btn dropdown-toggle btn-light"
                  data-bs-toggle="dropdown"
                >
                  <div className="filter-option">
                    <div className="filter-option-inner">
                      <div className="filter-option-inner-inner">
                        {dropdownData[getSelected]}
                      </div>
                    </div>
                  </div>
                </button>
                <div className="dropdown-menu">
                  <div className="inner show">
                    <ul className="dropdown-menu inner show">
                      {dropdownData.map((item, i) => (
                        <li
                          key={i}
                          className={getSelected === i ? "selected active" : ""}
                        >
                          <a
                            onClick={() => setSelected(i)}
                            className={`dropdown-item ${
                              getSelected === i ? "selected active" : ""
                            }`}
                          >
                            <span className="bs-ok-default check-mark" />
                            <span className="text">{item}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
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
            <Line options={options} data={data} />
          )}
        </div>
      </div>
    </>
  );
}
