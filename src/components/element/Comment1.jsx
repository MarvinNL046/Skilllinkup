"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, ThumbsUp, ThumbsDown } from "lucide-react";

const COMMENTS = [
  {
    name: "Bessie Cooper",
    date: "12 March 2022",
    avatar: "/images/blog/comments-2.png",
    body: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
  },
  {
    name: "Darrell Steward",
    date: "12 March 2022",
    avatar: "/images/blog/comments-2.png",
    body: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
  },
];

export default function Comment1() {
  return (
    <div className="mb-12">
      <h4 className="text-xl font-semibold mb-5">80 Reviews</h4>
      <div className="space-y-8">
        {COMMENTS.map((comment, i) => (
          <div key={i}>
            <div className="flex items-center gap-3 mb-4">
              <Image
                height={60}
                width={60}
                src={comment.avatar}
                alt={comment.name}
                className="rounded-full object-contain h-[60px] w-[60px]"
              />
              <div>
                <h6 className="text-base font-semibold mb-0">{comment.name}</h6>
                <span className="text-sm text-[var(--text-secondary)]">
                  {comment.date}
                </span>
              </div>
            </div>
            <p className="text-base text-[var(--text-secondary)] mb-4">{comment.body}</p>
            <div className="flex gap-4">
              <button
                type="button"
                className="inline-flex items-center gap-1.5 text-sm text-[var(--text-secondary)] hover:text-foreground"
              >
                <ThumbsUp className="h-4 w-4" />
                Helpful
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-1.5 text-sm text-[var(--text-secondary)] hover:text-foreground"
              >
                <ThumbsDown className="h-4 w-4" />
                Not helpful
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="border-b border-[var(--border-subtle)] pb-12 mt-8">
        <Button asChild variant="outline">
          <Link href="/services">
            See More
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
