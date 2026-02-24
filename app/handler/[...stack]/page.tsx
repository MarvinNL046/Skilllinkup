"use client";

import { StackHandler } from "@stackframe/stack";
import { stackApp } from "@/lib/stack-client";

export default function Handler(props: any) {
  return <StackHandler fullPage app={stackApp} {...props} />;
}
