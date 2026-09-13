"use client";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ContextMessageButton from "@/components/ui/ContextMessageButton";
import useMyProjectProposal from "@/hook/useMyProjectProposal";

function AcceptedOrder({ projectId }) {
  const proposal = useMyProjectProposal(projectId);
  return proposal?.orderId ? (
    <Button asChild size="sm">
      <Link href={`/orders/${proposal.orderId}`}>Open order</Link>
    </Button>
  ) : (
    <Button asChild variant="outline" size="sm">
      <Link href="/orders">View orders</Link>
    </Button>
  );
}

export default function ProposalCard1({ bid }) {
  const t = useTranslations("proposals");
  const labels = {
    pending: "Awaiting decision",
    accepted: t("statusAccepted"),
    rejected: t("statusRejected"),
    withdrawn: "Withdrawn",
  };
  const hints = {
    pending:
      bid.projectStatus === "open"
        ? "Your proposal is with the client. You can message them if needed."
        : "This project is closed. Your proposal has not been accepted.",
    accepted: "Continue the work and review delivery details in your order.",
    rejected:
      "The client did not select this proposal. You can explore other projects.",
    withdrawn: "This proposal is no longer active.",
  };
  const publicProject = bid.projectSlug && bid.projectStatus === "open";
  return (
    <tr>
      <td data-label={t("columnProject")} className="align-top">
        <h3 className="text-base font-semibold mb-2">
          {bid.projectTitle || t("untitledProject")}
        </h3>
        <Badge
          variant={
            {
              pending: "warning",
              accepted: "success",
              rejected: "muted",
              withdrawn: "muted",
            }[bid.status] || "muted"
          }
        >
          {labels[bid.status] || bid.status}
        </Badge>
        <p className="mt-2 text-sm text-[var(--text-secondary)]">
          {hints[bid.status]}
        </p>
        <p className="mt-2 text-sm text-[var(--text-secondary)]">
          {t("submitted", {
            date: new Date(bid.createdAt).toLocaleDateString("en-GB"),
          })}
        </p>
        <details className="mt-3">
          <summary className="cursor-pointer text-sm">
            Read your proposal
          </summary>
          <p className="mt-2 whitespace-pre-wrap break-words text-sm">
            {bid.pitch}
          </p>
        </details>
      </td>
      <td data-label={t("columnBidAmount")} className="align-top">
        <p className="font-semibold">
          {new Intl.NumberFormat("en-GB", {
            style: "currency",
            currency: bid.currency || bid.projectCurrency || "EUR",
          }).format(bid.amount)}
        </p>
        <p className="text-sm text-[var(--text-secondary)]">
          {bid.deliveryDays === 1
            ? t("dayDelivery")
            : t("daysDelivery", { count: bid.deliveryDays })}
        </p>
      </td>
      <td data-label={t("columnAction")} className="align-top">
        <div className="flex flex-wrap gap-2">
          {bid.status === "accepted" && (
            <AcceptedOrder projectId={bid.projectId} />
          )}
          {publicProject && (
            <Button asChild variant="outline" size="sm">
              <Link href={`/online/project/${bid.projectSlug}`}>
                View project
              </Link>
            </Button>
          )}
          {["pending", "accepted"].includes(bid.status) && (
            <ContextMessageButton
              context={{ type: "project_bid", bidId: bid._id }}
              label="Message client"
            />
          )}
        </div>
      </td>
    </tr>
  );
}
