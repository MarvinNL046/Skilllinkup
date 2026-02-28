"use client";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import ProposalCard1 from "../card/ProposalCard1";
import DashboardNavigation from "../header/DashboardNavigation";
import DeleteModal from "../modal/DeleteModal";
import ProposalModal1 from "../modal/ProposalModal1";
import useConvexProfile from "@/hook/useConvexProfile";
import useConvexUser from "@/hook/useConvexUser";
import Link from "next/link";

export default function ProposalInfo() {
  const { convexUser, isLoaded, isAuthenticated } = useConvexUser();
  const { profile } = useConvexProfile();

  const bids = useQuery(
    api.marketplace.projects.getMyBids,
    profile?._id ? { freelancerId: profile._id } : "skip"
  );

  // Loading: still fetching convexUser or profile or bids
  const isLoading = isAuthenticated && (
    convexUser === undefined ||
    (convexUser?._id && profile === undefined) ||
    (profile?._id && bids === undefined)
  );
  // No freelancer profile exists (convexUser exists but no freelancer record)
  const noProfile = isAuthenticated && convexUser !== undefined && convexUser !== null && profile === null;
  const hasBids = bids && bids.length > 0;

  return (
    <>
      <div className="dashboard__content hover-bgc-color">
        <div className="row pb40">
          <div className="col-lg-12">
            <DashboardNavigation />
          </div>
          <div className="col-lg-12">
            <div className="dashboard_title_area">
              <h2>My Proposals</h2>
              <p className="text">Track all bids you have submitted on projects.</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-12">
            <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
              <div className="packages_table table-responsive">
                {isLoaded && !isAuthenticated ? (
                  <div className="text-center py-5">
                    <p className="text mb-0">Please sign in to view your proposals.</p>
                  </div>
                ) : noProfile ? (
                  <div className="text-center py-5">
                    <p className="text mb-0">
                      You need a freelancer profile to submit proposals.{" "}
                      <Link href="/onboarding" className="text-thm">Complete your profile</Link>
                    </p>
                  </div>
                ) : isLoading ? (
                  <div className="text-center py30">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt10 fz14 text-muted">Loading your proposals...</p>
                  </div>
                ) : !hasBids ? (
                  <div className="text-center py-4">
                    <p className="text mb-0">No proposals yet. Browse open projects and submit your first bid!</p>
                  </div>
                ) : (
                  <>
                    <table className="table-style3 table at-savesearch">
                      <thead className="t-head">
                        <tr>
                          <th scope="col">Project</th>
                          <th scope="col">Bid Amount / Delivery</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody className="t-body">
                        {bids.map((bid) => (
                          <ProposalCard1 key={bid._id} bid={bid} />
                        ))}
                      </tbody>
                    </table>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ProposalModal1 />
      <DeleteModal />
    </>
  );
}
