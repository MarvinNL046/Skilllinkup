"use client";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function ChangePassword() {
  return (
    <Card className="mb-6 overflow-hidden">
      <CardHeader className="border-b border-[var(--border-subtle)] pb-4">
        <CardTitle className="text-lg font-semibold">Change password</CardTitle>
      </CardHeader>
      <CardContent className="pt-6 max-w-2xl">
        <form className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="old-password">Old Password</Label>
              <Input id="old-password" type="password" placeholder="********" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-password">New Password</Label>
            <Input id="new-password" type="password" placeholder="********" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm New Password</Label>
            <Input id="confirm-password" type="password" placeholder="********" />
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
