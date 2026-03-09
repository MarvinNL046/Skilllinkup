"use client";
import { useTranslations } from "next-intl";

export default function StatementCard1({ data }) {
  const t = useTranslations("statements");

  return (
    <>
      <tr>
        <th scope="row">{data.date}</th>
        <td className="vam">
          {data.type === 1 && (
            <span className="pending-style style4">{t("servicePurchased")}</span>
          )}
          {data.type === 2 && (
            <span className="pending-style style5">{t("walletTopup")}</span>
          )}
        </td>
        <td className="vam">{data.detail}</td>
        <td className="vam">${data.price}</td>
        <td className="vam">${data.amount}</td>
      </tr>
    </>
  );
}
