"use client";

import { Suspense } from "react";
import { StackHandler, StackProvider, StackTheme } from "@stackframe/stack";
import { getStackApp } from "@/lib/stack-client";

export default function Handler(props: any) {
 return (
 <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
 <StackProvider app={getStackApp()}>
 <StackTheme>
 <StackHandler fullPage app={getStackApp()} {...props} />
 </StackTheme>
 </StackProvider>
 </Suspense>
 );
}
