"use client";
import { clientNavigation, freelancerNavigation } from "@/data/dashboard";
import useConvexUser from "@/hook/useConvexUser";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function DashboardNavigation() {
  const [isActive, setActive] = useState(false);
  const path = usePathname();
  const { convexUser } = useConvexUser();

  const isFreelancer = convexUser?.userType === "freelancer";
  const nav = isFreelancer ? freelancerNavigation : clientNavigation;
  const startEnd = isFreelancer ? 5 : 5;
  const organizeEnd = isFreelancer ? 10 : 7;

  return (
    <>
      <div className="dashboard_navigationbar d-block d-lg-none">
        <div className="dropdown">
          <button onClick={() => setActive(!isActive)} className="dropbtn">
            <i className="fa fa-bars pr10" /> Dashboard Navigation
          </button>
          <ul className={`dropdown-content ${isActive ? "show" : ""}`}>
            <li>
              <p className="fz15 fw400 ff-heading mt30 pl30">Start</p>
            </li>
            {nav.slice(0, startEnd).map((item, i) => (
              <li className={path == item.path ? 'mobile-dasboard-menu-active' : ''} onClick={() => setActive(false)} key={i}>
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
            {nav.slice(startEnd, organizeEnd).map((item, i) => (
              <li className={path == item.path ? 'mobile-dasboard-menu-active' : ''} onClick={() => setActive(false)} key={i}>
                <Link href={item.path}>
                  <i className={`${item.icon} mr10`} />
                  {item.name}
                </Link>
              </li>
            ))}
            <li>
              <p className="fz15 fw400 ff-heading mt30 pl30">Account</p>
            </li>
            {nav.slice(organizeEnd).map((item, i) => (
              <li className={path == item.path ? 'mobile-dasboard-menu-active' : ''} onClick={() => setActive(false)} key={i}>
                <Link href={item.path}>
                  <i className={`${item.icon} mr10`} />
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
