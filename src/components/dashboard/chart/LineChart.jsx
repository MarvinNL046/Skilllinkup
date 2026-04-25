"use client";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { ChevronDown, Check } from "lucide-react";
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
  const t = useTranslations("common");
  const [getSelected, setSelected] = useState(2);
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    function onDoc(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    function onKey(e) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const chartData = useQuery(
    api.marketplace.dashboard.getChartData,
    userId ? { userId } : "skip"
  );

  const isLoading = userId && chartData === undefined;
  const monthlyOrders = chartData?.monthlyOrders ?? [];

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
        backgroundColor: "rgba(167, 139, 250, 0.18)",
        borderColor: "oklch(46% 0.17 284)",
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
    <div
      className="card"
      style={{
        padding: "var(--space-6)",
        marginBottom: "var(--space-6)",
        overflow: "visible",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "var(--space-3)",
          flexWrap: "wrap",
          marginBottom: "var(--space-5)",
        }}
      >
        <h4
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--text-h4)",
            fontWeight: 500,
            letterSpacing: "-0.01em",
            margin: 0,
          }}
        >
          Orders
        </h4>

        <div ref={wrapperRef} style={{ position: "relative" }}>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-haspopup="listbox"
            className="btn btn--secondary btn--sm"
            style={{ minWidth: 180, justifyContent: "space-between", fontWeight: 500 }}
          >
            {dropdownData[getSelected]}
            <ChevronDown
              size={14}
              style={{
                transition: "transform 160ms var(--ease-standard, ease-out)",
                transform: open ? "rotate(180deg)" : "rotate(0deg)",
                flexShrink: 0,
              }}
            />
          </button>
          {open && (
            <ul
              role="listbox"
              style={{
                position: "absolute",
                top: "calc(100% + 6px)",
                right: 0,
                minWidth: 200,
                padding: "var(--space-1)",
                listStyle: "none",
                margin: 0,
                background: "var(--bg-elevated)",
                border: "1px solid var(--border-subtle)",
                borderRadius: "var(--radius-md)",
                boxShadow: "var(--shadow-3)",
                zIndex: 100,
              }}
            >
              {dropdownData.map((item, i) => {
                const active = getSelected === i;
                return (
                  <li key={i} role="option" aria-selected={active}>
                    <button
                      type="button"
                      onClick={() => {
                        setSelected(i);
                        setOpen(false);
                      }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "100%",
                        padding: "var(--space-2) var(--space-3)",
                        borderRadius: "var(--radius-sm)",
                        background: active ? "var(--primary-50)" : "transparent",
                        color: active ? "var(--primary-700)" : "var(--text-primary)",
                        fontSize: "var(--text-body-sm)",
                        fontWeight: active ? 600 : 500,
                        border: "none",
                        cursor: "pointer",
                        fontFamily: "inherit",
                        textAlign: "left",
                      }}
                    >
                      <span>{item}</span>
                      {active && <Check size={14} style={{ flexShrink: 0 }} />}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>

      {isLoading ? (
        <div style={{ display: "flex", justifyContent: "center", padding: "var(--space-12) 0" }}>
          <div
            role="status"
            aria-label={t("loading")}
            style={{
              width: 28,
              height: 28,
              border: "3px solid var(--border-subtle)",
              borderTopColor: "var(--primary-600)",
              borderRadius: "999px",
              animation: "spin 0.9s linear infinite",
            }}
          />
        </div>
      ) : !hasData ? (
        <div style={{ textAlign: "center", padding: "var(--space-12) 0" }}>
          <p className="body-sm" style={{ color: "var(--text-tertiary)", margin: 0 }}>
            No orders yet
          </p>
        </div>
      ) : (
        <Line options={options} data={data} />
      )}
    </div>
  );
}
