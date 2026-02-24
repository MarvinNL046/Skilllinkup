import "server-only";
import { StackServerApp } from "@stackframe/stack";

let _app: StackServerApp | null = null;

export function getStackServerApp(): StackServerApp {
  if (!_app) {
    _app = new StackServerApp({
      tokenStore: "nextjs-cookie",
      urls: {
        signIn: "/handler/sign-in",
        signUp: "/handler/sign-up",
        afterSignIn: "/en/dashboard/seller",
        afterSignUp: "/en/dashboard/seller",
      },
    });
  }
  return _app;
}
