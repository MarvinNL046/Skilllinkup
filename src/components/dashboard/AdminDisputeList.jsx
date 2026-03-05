"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useState } from "react";

export default function AdminDisputeList() {
  const disputes = useQuery(api.marketplace.disputes.list, { status: "open" }) ?? [];
  const resolve = useMutation(api.marketplace.disputes.resolve);
  const [loading, setLoading] = useState(null);

  async function handleResolve(disputeId, resolution) {
    setLoading(disputeId + resolution);
    try {
      await resolve({
        disputeId,
        resolution,
        resolutionNote: `Resolved via admin dashboard: ${resolution}`,
      });
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setLoading(null);
    }
  }

  if (disputes.length === 0) {
    return <p className="text-muted">No open disputes.</p>;
  }

  return (
    <div className="table-responsive">
      <table className="table">
        <thead>
          <tr>
            <th>Dispute ID</th>
            <th>Order ID</th>
            <th>Reason</th>
            <th>Opened</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {disputes.map((d) => (
            <tr key={d._id}>
              <td className="fz13">{d._id.slice(-8)}</td>
              <td className="fz13">{d.orderId.slice(-8)}</td>
              <td>{d.reason}</td>
              <td>{new Date(d.openedAt).toLocaleDateString()}</td>
              <td>
                <button
                  className="btn btn-success btn-sm me-2"
                  disabled={!!loading}
                  onClick={() => handleResolve(d._id, "freelancer_wins")}
                >
                  {loading === d._id + "freelancer_wins" ? "..." : "Release to Freelancer"}
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  disabled={!!loading}
                  onClick={() => handleResolve(d._id, "client_wins")}
                >
                  {loading === d._id + "client_wins" ? "..." : "Refund Client"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
