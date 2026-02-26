"use client";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import Pagination1 from "@/components/section/Pagination1";
import ProposalCard1 from "../card/ProposalCard1";
import DashboardNavigation from "../header/DashboardNavigation";
import DeleteModal from "../modal/DeleteModal";
import ProposalModal1 from "../modal/ProposalModal1";
import useConvexProfile from "@/hook/useConvexProfile";

export default function ProposalInfo() {
  const { profile } = useConvexProfile();

  const bids = useQuery(
    api.marketplace.projects.getMyBids,
    profile?._id ? { freelancerId: profile._id } : "skip"
  );

  const isLoading = profile === undefined || (profile?._id && bids === undefined);
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
                {isLoading ? (
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
                    <div className="mt30">
                      <Pagination1 />
                    </div>
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
