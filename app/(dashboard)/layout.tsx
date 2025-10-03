import { redirect } from "next/navigation";
import { stackServerApp } from "../../stack/server";
import { AdminNav } from "../../components/AdminNav";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await stackServerApp.getUser();

  if (!user) {
    redirect("/handler/sign-in");
  }

  return (
    <div className="min-h-screen bg-background-light">
      <AdminNav userEmail={user.primaryEmail} />
      {children}
    </div>
  );
}
