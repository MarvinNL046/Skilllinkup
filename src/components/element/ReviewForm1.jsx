"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight } from "lucide-react";

export default function ReviewForm1() {
  return (
    <div>
      <h6 className="text-lg font-semibold">Add a Review</h6>
      <p className="text-[var(--text-secondary)] mb-6">
        Your email address will not be published. Required fields are marked *
      </p>
      <form className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="review-comment">Comment</Label>
          <Textarea
            id="review-comment"
            rows={6}
            placeholder="There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable."
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="review-name">Name</Label>
            <Input id="review-name" type="text" placeholder="Ali Tufan" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="review-email">Email</Label>
            <Input id="review-email" type="email" placeholder="your@email.com" />
          </div>
        </div>
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <Checkbox />
          <span>
            Save my name, email, and website in this browser for the next time I
            comment.
          </span>
        </label>
        <div>
          <Button type="submit">
            Send
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
}
