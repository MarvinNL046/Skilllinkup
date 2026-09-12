import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function JobNotFound() {
  return <main className="mx-auto max-w-2xl px-6 py-16">
    <h1 className="text-3xl font-semibold mb-4">This vacancy is no longer available</h1>
    <p className="mb-6">It may have closed or been removed. If you already applied, you can still follow your application in your dashboard.</p>
    <div className="flex flex-wrap gap-3">
      <Button asChild><Link href="/jobs/browse">Browse open jobs</Link></Button>
      <Button asChild variant="secondary"><Link href="/dashboard/applications">My applications</Link></Button>
    </div>
  </main>;
}
