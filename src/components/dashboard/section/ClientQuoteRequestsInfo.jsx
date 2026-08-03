"use client";

import Link from "next/link";
import { useQuery } from "convex/react";
import {
  ArrowRight,
  CalendarDays,
  FileText,
  MapPin,
  MessageSquareText,
  Plus,
} from "lucide-react";
import { api } from "../../../../convex/_generated/api";
import useConvexUser from "@/hook/useConvexUser";
import styles from "./ClientQuoteRequestsInfo.module.css";

const statusLabels = {
  draft: "Draft",
  open: "Receiving quotes",
  matched: "Quotes received",
  accepted: "Quote accepted",
  in_progress: "Work in progress",
  completed: "Completed",
  cancelled: "Cancelled",
  closed: "Closed",
};

function formatDate(timestamp) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(timestamp);
}

export default function ClientQuoteRequestsInfo() {
  const { isAuthenticated, isLoaded } = useConvexUser();
  const requests = useQuery(api.marketplace.quotes.listMyRequests, isAuthenticated ? {} : "skip");

  if (!isLoaded || (isAuthenticated && requests === undefined)) {
    return <div className={styles.skeleton} role="status" aria-label="Loading your quote requests">{[0, 1, 2].map((item) => <i key={item} />)}</div>;
  }
  if (!isAuthenticated) return null;

  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <div>
          <span>Customer · Local</span>
          <h1>My quote requests</h1>
          <p>Track responses, compare local professionals and keep every appointment in one place.</p>
        </div>
        <Link href="/local/request-quote"><Plus size={18} /> Request local quotes</Link>
      </header>

      {requests.length === 0 ? (
        <section className={styles.empty}>
          <i><FileText size={28} /></i>
          <h2>Tell us what needs doing</h2>
          <p>Describe the job once and receive suitable quotes from trusted professionals near you.</p>
          <Link href="/local/request-quote">Start a quote request <ArrowRight size={16} /></Link>
        </section>
      ) : (
        <section className={styles.grid} aria-label="Your local quote requests">
          {requests.map((request) => (
            <article key={request._id}>
              <div className={styles.cardHead}>
                <span className={`${styles.status} ${styles[`status_${request.status}`] || ""}`}>{statusLabels[request.status] || request.status}</span>
                <small>Created {formatDate(request.createdAt)}</small>
              </div>
              <h2>{request.title}</h2>
              <p className={styles.category}>{request.categoryName || "Local service"}</p>
              <div className={styles.meta}>
                <span><MapPin size={15} /> {request.locationCity || "Location shared privately"}</span>
                <span><MessageSquareText size={15} /> {request.quoteCount} {request.quoteCount === 1 ? "quote" : "quotes"}</span>
                {request.preferredDate ? <span><CalendarDays size={15} /> Preferred {formatDate(request.preferredDate)}</span> : null}
              </div>
              <footer>
                <strong>{request.budgetIndication || "Budget discussed with professionals"}</strong>
                <Link href={`/local/quote-request/${request._id}`}>Open request <ArrowRight size={15} /></Link>
              </footer>
            </article>
          ))}
        </section>
      )}
    </div>
  );
}
