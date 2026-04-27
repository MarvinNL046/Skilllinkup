"use client";
import ListingSidebar4 from "../sidebar/ListingSidebar4";
import Pagination1 from "./Pagination1";
import listingStore from "@/store/listingStore";
import EmployeeCard1 from "../card/EmployeeCard1";
import ListingOption2 from "../element/ListingOption2";
import ListingSidebarModal4 from "../modal/ListingSidebarModal4";
import useConvexClients from "@/hook/useConvexClients";
import EmptyState from "@/components/ui/EmptyState";
import { useTranslations } from "next-intl";
import { Building2 } from "lucide-react";

export default function Listing12() {
  const t = useTranslations("common");
  const getCategory = listingStore((state) => state.getCategory);
  const getNoOfEmployee = listingStore((state) => state.getNoOfEmployee);
  const getBestSeller = listingStore((state) => state.getBestSeller);

  // category filter
  const categoryFilter = (item) =>
    getCategory?.length !== 0 ? getCategory.includes(item.category) : true;

  // no of employee
  const noOfEmployeeFilter = (item) =>
    getNoOfEmployee?.length !== 0 ? getNoOfEmployee.includes(item.jobs) : item;

  // sort by filter
  const sortByFilter = (item) =>
    getBestSeller === "best-seller" ? true : item.sort === getBestSeller;

  const clients = useConvexClients();

  // Show spinner while Convex data is loading
  if (clients === undefined) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-thm" role="status">
          <span className="visually-hidden">{t("loading")}</span>
        </div>
      </div>
    );
  }

  // content
  const content = clients
    .slice(0, 12)
    .filter(categoryFilter)
    .filter(noOfEmployeeFilter)
    .filter(sortByFilter)
    .map((item, i) => (
      <div key={i} className="col-sm-6 col-xl-4">
        <EmployeeCard1 data={item} />
      </div>
    ));

  return (
    <>
      <section className="pt-8 pb-24">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <ListingSidebar4 />
            </div>
            <div className="col-lg-9">
              <ListingOption2 itemLength={content?.length} itemLabel="companies" />
              <div className="row">
                {content.length === 0 ? (
                  <EmptyState
                    Icon={Building2}
                    title="No clients yet"
                    description="Be the first to sign up as a client and post a project"
                    actionLabel="Get Started"
                    actionHref="/register"
                  />
                ) : (
                  content
                )}
              </div>
              <div className="row mt-8">
                <Pagination1 />
              </div>
            </div>
          </div>
        </div>
      </section>
      <ListingSidebarModal4 />
    </>
  );
}
