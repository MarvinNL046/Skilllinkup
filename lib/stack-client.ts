import { StackClientApp } from "@stackframe/stack";

let _app: StackClientApp<true, string>| null = null;

export function getStackApp(): StackClientApp<true, string>{
 if (!_app) {
 _app = new StackClientApp({
 tokenStore: "nextjs-cookie",
 urls: {
 signIn: "/handler/sign-in",
 signUp: "/handler/sign-up",
 afterSignIn: "/dashboard",
 afterSignUp: "/onboarding",
 },
 });
 }
 return _app;
}
