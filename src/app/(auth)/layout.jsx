// Sign-in and registration are client pages, so their metadata lives here.
// They carry no search value and must not be indexed.
export const metadata = {
  title: "Sign in or create your account",
  description: "Sign in to Skilllinkup or create your free private-beta account.",
  robots: { index: false, follow: false },
};

export default function AuthLayout({ children }) {
  return children;
}
