"use client";

import { StackHandler, StackProvider, StackTheme } from "@stackframe/stack";
import { getStackApp } from "@/lib/stack-client";

export default function Handler(props: any) {
  return (
    <StackProvider app={getStackApp()}>
      <StackTheme>
        <StackHandler fullPage app={getStackApp()} {...props} />
      </StackTheme>
    </StackProvider>
  );
}
