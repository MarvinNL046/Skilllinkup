"use client";

import { useQuery, useMutation } from "convex/react";
import { useTranslations } from "next-intl";
import { api } from "../../../convex/_generated/api";
import { useState } from "react";

export default function AdminDisputeList() {
  const t = useTranslations("adminDisputes");
  const disputes = useQuery(api.marketplace.disputes.list, { status: "open" }) ?? [];
  const resolve = useMutation(api.marketplace.disputes.resolve);
  const [loading, setLoading] = useState(null);

  async function handleResolve(disputeId, resolution) {
    setLoading(disputeId + resolution);
    try {
      await resolve({
        disputeId,
        resolution,
        resolutionNote: t("resolvedNote", { resolution }),
      });
    } catch (err) {
      alert(t("errorPrefix") + err.message);
    } finally {
      setLoading(null);
    }
  }

  if (disputes.length === 0) {
    return <p className="text-muted">{t("noOpenDisputes")}</p>;
  }

  return (
    <div className="table-responsive">
      <table className="table">
        <thead>
          <tr>
            <th>{t("columnDisputeId")}</th>
            <th>{t("columnOrderId")}</th>
            <th>{t("columnReason")}</th>
            <th>{t("columnOpened")}</th>
            <th>{t("columnActions")}</th>
          </tr>
        </thead>
        <tbody>
          {disputes.map((d) => (
            <tr key={d._id}>
              <td className="text-sm">{d._id.slice(-8)}</td>
              <td className="text-sm">{d.orderId.slice(-8)}</td>
              <td>{d.reason}</td>
              <td>{new Date(d.openedAt).toLocaleDateString()}</td>
              <td>
                <button
                  className="btn btn-success btn-sm me-2"
                  disabled={!!loading}
                  onClick={() => handleResolve(d._id, "freelancer_wins")}
                >
                  {loading === d._id + "freelancer_wins" ? "..." : t("releaseToFreelancer")}
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  disabled={!!loading}
                  onClick={() => handleResolve(d._id, "client_wins")}
                >
                  {loading === d._id + "client_wins" ? "..." : t("refundClient")}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
