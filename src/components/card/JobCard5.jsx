"use client";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function JobCard5({ data }) {
  const t = useTranslations("jobsHub");
  return (
    <>
      <div className="job-list-style1 bdr1 d-xl-flex align-items-start">
        <div className="icon d-flex align-items-center mb20">
          <Image
            height={60}
            width={60}
            className="wa"
            src={data.img}
            alt="icon"
          />
          <span className="fav-icon flaticon-star" />
        </div>
        <div className="details ml20 ml0-xl">
          <h5>{data.title}</h5>
          <h6 className="mb-3 text-thm">{data.server}</h6>
          <p className="list-inline-item mb-0">$125k-$135k {t("hourly")}</p>
          <p className="list-inline-item mb-0 bdrl1 pl15">1-5 {t("days")}</p>
          <p className="list-inline-item mb-0 bdrl1 pl15">{t("expensive")}</p>
          <p className="list-inline-item mb-0 bdrl1 pl15">{t("remote")}</p>
        </div>
      </div>
    </>
  );
}
