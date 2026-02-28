"use client";
import { dashboardNavigation } from "@/data/dashboard";
import useConvexUser from "@/hook/useConvexUser";
import { useClerk } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

const WORLDS = [
  { key: "online", label: "Online", icon: "flaticon-wifi" },
  { key: "local",  label: "Local",  icon: "flaticon-place" },
  { key: "jobs",   label: "Jobs",   icon: "flaticon-briefcase" },
];

export default function DashboardNavigation() {
  const [isActive, setActive] = useState(false);
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
    <div className="dashboard_navigationbar d-block d-lg-none">
      <div className="dropdown">
        <button onClick={() => setActive(!isActive)} className="dropbtn">
          <i className="fa fa-bars pr10" /> Dashboard Navigation
        </button>
        <ul className={`dropdown-content ${isActive ? "show" : ""}`}>
          {/* World Switcher */}
          <li>
            <div className="d-flex gap-2 px-3 py-2">
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
          </li>

          <li>
            <p className="fz15 fw400 ff-heading mt30 pl30">Start</p>
          </li>
          {sections.start.map((item, i) => (
            <li
              className={path === item.path ? "mobile-dasboard-menu-active" : ""}
              onClick={() => setActive(false)}
              key={i}
            >
              <Link href={item.path}>
                <i className={`${item.icon} mr10`} />
                {item.name}
              </Link>
            </li>
          ))}

          <li>
            <p className="fz15 fw400 ff-heading mt30 pl30">
              Organize and Manage
            </p>
          </li>
          {sections.organize.map((item, i) => (
            <li
              className={path === item.path ? "mobile-dasboard-menu-active" : ""}
              onClick={() => setActive(false)}
              key={i}
            >
              <Link href={item.path}>
                <i className={`${item.icon} mr10`} />
                {item.name}
              </Link>
            </li>
          ))}

          <li>
            <p className="fz15 fw400 ff-heading mt30 pl30">Account</p>
          </li>
          {sections.account.map((item, i) => (
            <li
              className={path === item.path ? "mobile-dasboard-menu-active" : ""}
              onClick={() => setActive(false)}
              key={i}
            >
              <Link href={item.path}>
                <i className={`${item.icon} mr10`} />
                {item.name}
              </Link>
            </li>
          ))}

          {/* Logout — rendered separately at the bottom */}
          <li onClick={() => { setActive(false); signOut({ redirectUrl: "/" }); }}>
            <a style={{ cursor: "pointer" }}>
              <i className="flaticon-logout mr10" />
              Logout
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
