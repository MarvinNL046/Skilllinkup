"use client";
import Image from "next/image";
import { Tooltip } from "react-tooltip";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trash2, MapPin, Clock, FileText } from "lucide-react";

export default function ProjectCard1({ data }) {
  return (
    <Card className="relative">
      <CardContent className="p-5">
        <button
          type="button"
          id={`delete${data.id}`}
          aria-label="Delete"
          className="absolute right-4 top-4 text-[var(--text-tertiary)] hover:text-destructive"
        >
          <Trash2 className="h-4 w-4" />
        </button>
        <Tooltip anchorSelect={`#delete${data.id}`} events={["click"]} place="left-start">
          Delete Item
        </Tooltip>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-4 lg:items-end">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-shrink-0">
              <Image
                height={60}
                width={60}
                className="rounded-full"
                src={data.img}
                alt="thumb"
              />
              <span
                className="absolute right-0 bottom-0 h-3 w-3 rounded-full bg-success border-2 border-[var(--bg-elevated)]"
                aria-label="Online"
              />
            </div>
            <div className="min-w-0">
              <h5 className="text-base font-semibold mb-2">{data.title}</h5>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-[var(--text-secondary)]">
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-primary" />
                  {data.location}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5 text-primary" />2 hours ago
                </span>
                <span className="inline-flex items-center gap-1">
                  <FileText className="h-3.5 w-3.5 text-primary" />1 Received
                </span>
              </div>
              {data.tags?.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {data.tags.map((item, i) => (
                    <Badge key={i} variant="muted">
                      {item}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="lg:text-right">
            <h4 className="text-lg font-semibold">
              ${data.price.min} - ${data.price.max}
            </h4>
            <p className="text-sm text-[var(--text-secondary)] mb-0">Hourly Rate</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
