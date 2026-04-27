import ServiceDetailExtra1 from "@/components/element/ServiceDetailExtra1";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ExtraService() {
  return (
    <Card className="mb-6 overflow-hidden">
      <CardHeader className="border-b border-[var(--border-subtle)] pb-4">
        <CardTitle className="text-lg font-semibold">Add extra services</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="max-w-3xl">
          <ServiceDetailExtra1 />
        </div>
      </CardContent>
    </Card>
  );
}
