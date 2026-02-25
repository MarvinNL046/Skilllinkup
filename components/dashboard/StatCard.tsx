"use client";

interface StatCardProps {
  icon: string;
  label: string;
  value: string | number;
  change?: string;
}

export default function StatCard({ icon, label, value, change }: StatCardProps) {
  return (
    <div className="d-flex align-items-center justify-content-between statistics_funfact">
      <div className="details">
        <div className="fz15">{label}</div>
        <div className="title">{value}</div>
        {change && (
          <div className="text fz14">
            <span className="text-thm">{change}</span>
          </div>
        )}
      </div>
      <div className="icon text-center">
        <i className={icon} />
      </div>
    </div>
  );
}
