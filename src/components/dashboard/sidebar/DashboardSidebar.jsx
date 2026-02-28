"use client";
import { clientNavigation, freelancerNavigation } from "@/data/dashboard";
import useConvexUser from "@/hook/useConvexUser";
import { useClerk } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardSidebar() {
  const path = usePathname();
  const { convexUser } = useConvexUser();
  const { signOut } = useClerk();

  const isFreelancer = convexUser?.userType === "freelancer";
  const nav = isFreelancer ? freelancerNavigation : clientNavigation;

  // Filter out the Logout item - we render it separately
  const navItems = nav.filter((item) => item.name !== "Logout");

  // Section splits differ per role
  const startEnd = isFreelancer ? 5 : 5;
  const organizeEnd = isFreelancer ? 10 : 7;

  return (
    <>
      <div className="dashboard__sidebar d-none d-lg-block">
        <div className="dashboard_sidebar_list">
          <p className="fz15 fw400 ff-heading pl30">Start</p>
          {navItems.slice(0, startEnd).map((item, i) => (
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
          {navItems.slice(startEnd, organizeEnd).map((item, i) => (
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
          {navItems.slice(organizeEnd).map((item, i) => (
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
          <div className="sidebar_list_item mb-1">
            <button
              onClick={() => signOut({ redirectUrl: "/" })}
              className="items-center w-100 border-0 bg-transparent text-start"
              style={{ cursor: "pointer" }}
            >
              <i className="flaticon-logout mr15" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
