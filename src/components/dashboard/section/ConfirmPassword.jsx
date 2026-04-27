"use client";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, ArrowRight } from "lucide-react";

export default function ConfirmPassword() {
  return (
    <Card className="mb-6 overflow-hidden">
      <CardHeader className="border-b border-[var(--border-subtle)] pb-4">
        <CardTitle className="text-lg font-semibold">Change password</CardTitle>
      </CardHeader>
      <CardContent className="pt-6 max-w-2xl space-y-5">
        <div className="space-y-2">
          <h6 className="text-base font-semibold">Close account</h6>
          <Alert variant="warning">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Warning: If you close your account, you will be unsubscribed from all your 5
              courses, and will lose access forever.
            </AlertDescription>
          </Alert>
        </div>
        <form className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Enter Password</Label>
              <Input id="confirm-password" type="password" placeholder="********" />
            </div>
          </div>
          <div>
            <Button asChild>
              <Link href="/contact">
                Change Password
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
