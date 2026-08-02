import AppErrorState from "@/components/error/AppErrorState";

export default function NotFound() {
  return (
    <AppErrorState
      eyebrow="404 · Page not found"
      title="This page has moved or does not exist."
      message="Check the address or return to the marketplace to continue."
    />
  );
}
