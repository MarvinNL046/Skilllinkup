"use client";
import Image from "next/image";
import Link from "next/link";
import { Tooltip } from "react-tooltip";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Star, Trash2 } from "lucide-react";

export default function ServiceCard1({ data }) {
  return (
    <Card className="overflow-hidden">
      <div className="relative">
        <Image
          height={204}
          width={274}
          src={data.img}
          alt="img"
          className="w-full h-auto object-cover"
        />
        <button
          type="button"
          id={`delete${data.id}`}
          aria-label="Delete"
          className="absolute right-2 top-2 inline-flex h-8 w-8 items-center justify-center rounded-md bg-[var(--bg-elevated)]/90 text-[var(--text-tertiary)] hover:text-destructive shadow"
        >
          <Trash2 className="h-4 w-4" />
        </button>
        <Tooltip anchorSelect={`#delete${data.id}`} events={["click"]} place="left-start">
          Delete Item
        </Tooltip>
      </div>

      <div className="p-5">
        <p className="text-sm text-[var(--text-secondary)] mb-1">{data.category}</p>
        <h5 className="text-base font-semibold mb-2">
          <Link href="/services" className="hover:text-primary">
            {data.title}
          </Link>
        </h5>
        <div className="flex items-center gap-1.5 text-sm">
          <Star className="h-3 w-3 fill-warning text-warning" aria-hidden="true" />
          <span className="font-medium text-foreground">{data.rating}</span>
          <span className="text-[var(--text-secondary)]">{data.review} reviews</span>
        </div>
        <Separator className="my-3" />
        <div className="flex justify-between items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2 min-w-0">
            <div className="relative flex-shrink-0">
              <Image
                height={30}
                width={30}
                className="rounded-full"
                src={data.author.img}
                alt="Freelancer"
              />
              <span
                className="absolute right-0 bottom-0 h-2 w-2 rounded-full bg-success border border-[var(--bg-elevated)]"
                aria-label="Online"
              />
            </div>
            <span className="text-sm truncate">{data.author.name}</span>
          </div>
          <p className="text-sm text-[var(--text-secondary)] mb-0">
            Starting at{" "}
            <span className="text-base font-medium text-foreground ml-1">
              ${data.price}
            </span>
          </p>
        </div>
      </div>
    </Card>
  );
}
