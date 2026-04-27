import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Clock, FileText } from "lucide-react";

function timeAgo(timestamp) {
  if (!timestamp) return "Recently";
  const diff = Date.now() - timestamp;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  if (minutes > 0) return `${minutes}m ago`;
  return "Just now";
}

export default function ProjectCard3({ data }) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 lg:items-center">
          <div className="lg:pr-6 lg:border-r lg:border-[var(--border-subtle)]">
            <div className="flex flex-col lg:flex-row gap-4 mb-3">
              <div className="relative flex-shrink-0">
                <Image
                  height={60}
                  width={60}
                  className="rounded-full"
                  src={data.img}
                  alt={data.title}
                />
                <span
                  className="absolute right-0 bottom-0 h-3 w-3 rounded-full bg-success border-2 border-[var(--bg-elevated)]"
                  aria-label="Online"
                />
              </div>
              <div className="min-w-0">
                <h5 className="text-lg font-semibold mb-3">{data.title}</h5>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-[var(--text-secondary)]">
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 text-primary" />
                    {data.location}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-primary" />
                    {timeAgo(data.createdAt)}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <FileText className="h-3.5 w-3.5 text-primary" />
                    {data.bidCount ?? 0} Received
                  </span>
                </div>
              </div>
            </div>
            {data.brief && (
              <p className="text-sm text-[var(--text-secondary)] mb-3">{data.brief}</p>
            )}
            {data.tags?.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {data.tags.map((item, i) => (
                  <Badge key={i} variant="muted">
                    {item}
                  </Badge>
                ))}
              </div>
            )}
          </div>
          <div className="lg:text-right">
            <h4 className="text-lg font-semibold">
              ${data.price.min} - ${data.price.max}
            </h4>
            <p className="text-sm text-[var(--text-secondary)] mb-4">Hourly Rate</p>
            <Button asChild variant="outline" className="w-full">
              <Link href={`/project/${data.slug || data.id}`}>
                Send Proposal
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
