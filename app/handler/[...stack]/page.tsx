"use client";

import { StackHandler } from "@stackframe/stack";
import { getStackApp } from "@/lib/stack-client";

export default function Handler(props: any) {
  return <StackHandler fullPage app={getStackApp()} {...props} />;
}
