"use client";
import { dashboardNavigation } from "@/data/dashboard";
import useConvexUser from "@/hook/useConvexUser";
import { useClerk } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import Link from "next/link";
import { usePathname } from "next/navigation";

const WORLDS = [
  { key: "online", label: "Online", icon: "flaticon-wifi" },
  { key: "local",  label: "Local",  icon: "flaticon-place" },
  { key: "jobs",   label: "Jobs",   icon: "flaticon-briefcase" },
];

export default function DashboardSidebar() {
  const path = usePathname();
  const { convexUser } = useConvexUser();
  const { signOut } = useClerk();
  const setPreferredWorld = useMutation(api.users.setPreferredWorld);

  const role = convexUser?.userType === "freelancer" ? "freelancer" : "client";
  const world = convexUser?.preferredWorld || "online";

  const sections = dashboardNavigation[role]?.[world]
    || dashboardNavigation[role]?.online;

  const handleWorldSwitch = (newWorld) => {
    if (!convexUser?.email || newWorld === world) return;
    setPreferredWorld({ email: convexUser.email, preferredWorld: newWorld });
  };

  return (
    <div className="dashboard__sidebar d-none d-lg-block">
      <div className="dashboard_sidebar_list">
        {/* World Switcher */}
        <div className="d-flex gap-2 px-3 pb-3 pt-2">
          {WORLDS.map((w) => (
            <button
              key={w.key}
              onClick={() => handleWorldSwitch(w.key)}
              className="btn btn-sm flex-grow-1"
              style={{
                backgroundColor: world === w.key ? "#ef2b70" : "#f1f1f1",
                color: world === w.key ? "#fff" : "#555",
                border: "none",
                borderRadius: "20px",
                fontSize: "13px",
                fontWeight: world === w.key ? 600 : 400,
                padding: "6px 10px",
                transition: "all 0.2s ease",
              }}
            >
              <i className={`${w.icon} mr5`} style={{ fontSize: "12px" }} />
              {w.label}
            </button>
          ))}
        </div>

        <p className="fz15 fw400 ff-heading pl30">Start</p>
        {sections.start.map((item, i) => (
          <div key={i} className="sidebar_list_item mb-1">
            <Link
              href={item.path}
              className={`items-center ${
                path === item.path ? "-is-active" : ""
              }`}
            >
              <i className={`${item.icon} mr15`} />
              {item.name}
            </Link>
          </div>
        ))}

        <p className="fz15 fw400 ff-heading pl30 mt30">Organize and Manage</p>
        {sections.organize.map((item, i) => (
          <div key={i} className="sidebar_list_item mb-1">
            <Link
              href={item.path}
              className={`items-center ${
                path === item.path ? "-is-active" : ""
              }`}
            >
              <i className={`${item.icon} mr15`} />
              {item.name}
            </Link>
          </div>
        ))}

        <p className="fz15 fw400 ff-heading pl30 mt30">Account</p>
        {sections.account.map((item, i) => (
          <div key={i} className="sidebar_list_item mb-1">
            <Link
              href={item.path}
              className={`items-center ${
                path === item.path ? "-is-active" : ""
              }`}
            >
              <i className={`${item.icon} mr15`} />
              {item.name}
            </Link>
          </div>
        ))}

        {/* Logout button — rendered separately at the bottom */}
        <div className="sidebar_list_item mb-1 mt-2">
          <a
            onClick={() => signOut({ redirectUrl: "/" })}
            className="items-center"
            style={{ cursor: "pointer" }}
          >
            <i className="flaticon-logout mr15" />
            Logout
          </a>
        </div>
      </div>
    </div>
  );
}
