"use client";
import Image from "next/image";
import { Tooltip } from "react-tooltip";
import { useTranslations } from "next-intl";

export default function JobCard1({ data, i }) {
  const t = useTranslations("jobsHub");
  return (
    <>
      <tr>
        <th className={`ps-0 ${i === 0 ? "pt-0" : ""}`} scope="row">
          <div className="job-list-style1 at-dashboard p-0 xl:flex items-start mb-0">
            <div className="icon2 mb10-lg mb-0 me-3 bg-transparent">
              <Image
                height={60}
                width={60}
                className="wa"
                src={data.img}
                alt="icon2"
              />
            </div>
            <div className="details">
              <h5>{data.title}</h5>
              <h6 className="mb-3 text-thm">{data.server}</h6>
            </div>
          </div>
        </th>
        <td className="vam">
          <p className="list-inline-item mb-0">$125k-$135k {t("hourly")}</p>
          <p className="list-inline-item mb-0 bdrl1 pl15 bdrn-lg pl5-lg">
            1-5 {t("days")}
          </p>
          <p className="list-inline-item mb-0 bdrl1 pl15 bdrn-lg pl5-lg">
            {t("expensive")}
          </p>
          <p className="list-inline-item mb-0 bdrl1 pl15 bdrn-lg pl5-lg">
            {t("remote")}
          </p>
        </td>
        <td className="vam">
          <a className="icon" id={`delete${data.id}`}>
            <Tooltip
              anchorSelect={`#delete${data.id}`}
              events={["click"]}
              place={"left-start"}
              className="ui-tooltip"
            >
              {t("deleteItem")}
            </Tooltip>
            <span className="flaticon-delete" />
          </a>
        </td>
      </tr>
    </>
  );
}
