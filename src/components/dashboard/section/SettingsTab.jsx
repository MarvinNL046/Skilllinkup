"use client";
import { useState, useEffect } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import useConvexUser from "@/hook/useConvexUser";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Switch from "@/components/ui/Switch";
import { Lock } from "lucide-react";
import { cn } from "@/lib/utils";

const ACCOUNT_TYPES = [
  { key: "client", label: "Client" },
  { key: "freelancer", label: "Freelancer" },
  { key: "job_seeker", label: "Job Seeker" },
];

const VISIBILITY_OPTIONS = [
  { value: "public", label: "Public — visible to everyone" },
  { value: "private", label: "Private — only visible to you" },
];

const CONTACT_OPTIONS = [
  { value: "everyone", label: "Everyone" },
  { value: "clients_only", label: "Clients & employers only" },
  { value: "nobody", label: "Nobody" },
];

const NOTIFICATIONS = [
  { key: "newMessage", label: "New message received" },
  { key: "orderUpdate", label: "Order status update" },
  { key: "reviewReceived", label: "Review received" },
  { key: "marketingEmails", label: "Marketing & tips from SkillLinkup" },
];

export default function SettingsTab() {
  const tt = useTranslations("toasts");
  const { convexUser, isLoaded } = useConvexUser();
  const { user: clerkUser } = useUser();

  const setUserType = useMutation(api.users.setUserType);
  const upsertNotifications = useMutation(api.marketplace.notificationSettings.upsert);
  const updateProfile = useMutation(api.marketplace.freelancers.updateProfile);

  const profile = useQuery(
    api.marketplace.freelancers.getByUserId,
    convexUser?._id ? { userId: convexUser._id } : "skip"
  );

  const notifSettings = useQuery(
    api.marketplace.notificationSettings.getByUser,
    convexUser?._id ? { userId: convexUser._id } : "skip"
  );

  const [accountType, setAccountType] = useState("");
  const [notifs, setNotifs] = useState({
    newMessage: true,
    orderUpdate: true,
    reviewReceived: true,
    marketingEmails: false,
  });
  const [visibility, setVisibility] = useState("public");
  const [contactPermission, setContactPermission] = useState("everyone");
  const [savingType, setSavingType] = useState(false);
  const [savingNotifs, setSavingNotifs] = useState(false);
  const [savingPrivacy, setSavingPrivacy] = useState(false);

  useEffect(() => {
    if (convexUser) setAccountType(convexUser.userType || "client");
  }, [convexUser]);

  useEffect(() => {
    if (notifSettings) {
      setNotifs({
        newMessage: notifSettings.newMessage ?? true,
        orderUpdate: notifSettings.orderUpdate ?? true,
        reviewReceived: notifSettings.reviewReceived ?? true,
        marketingEmails: notifSettings.marketingEmails ?? false,
      });
    }
  }, [notifSettings]);

  useEffect(() => {
    if (profile) {
      setVisibility(profile.profileVisibility || "public");
      setContactPermission(profile.contactPermission || "everyone");
    }
  }, [profile]);

  const handleSaveType = async () => {
    setSavingType(true);
    try {
      await setUserType({ userType: accountType });
      toast.success(tt("accountTypeUpdated"));
    } catch (err) {
      toast.error(err.message || tt("failed"));
    } finally {
      setSavingType(false);
    }
  };

  const handleSaveNotifs = async () => {
    setSavingNotifs(true);
    try {
      await upsertNotifications(notifs);
      toast.success(tt("notificationsSaved"));
    } catch (err) {
      toast.error(err.message || tt("failed"));
    } finally {
      setSavingNotifs(false);
    }
  };

  const handleSavePrivacy = async () => {
    if (!profile?._id) return;
    setSavingPrivacy(true);
    try {
      await updateProfile({
        profileId: profile._id,
        profileVisibility: visibility,
        contactPermission,
      });
      toast.success(tt("privacySaved"));
    } catch (err) {
      toast.error(err.message || tt("failed"));
    } finally {
      setSavingPrivacy(false);
    }
  };

  if (!isLoaded) {
    return (
      <Card>
        <CardContent className="p-8 flex justify-center">
          <div
            role="status"
            aria-label="Loading"
            className="h-6 w-6 animate-spin rounded-full border-3 border-[var(--border-subtle)] border-t-primary"
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-5 max-w-3xl">
      {/* Account */}
      <Card className="overflow-hidden">
        <CardHeader className="border-b border-[var(--border-subtle)] pb-4">
          <CardTitle className="text-lg font-semibold">Account</CardTitle>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div className="space-y-2 max-w-md">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              value={
                clerkUser?.primaryEmailAddress?.emailAddress ||
                convexUser?.email ||
                ""
              }
              disabled
            />
            <p className="text-xs text-[var(--text-tertiary)]">
              To change your email, contact support.
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() =>
              clerkUser?.openUserProfile?.() ||
              window.open("https://accounts.clerk.dev/user", "_blank")
            }
          >
            <Lock className="mr-2 h-4 w-4" />
            Change Password
          </Button>
        </CardContent>
      </Card>

      {/* Account Type */}
      <Card className="overflow-hidden">
        <CardHeader className="border-b border-[var(--border-subtle)] pb-4">
          <CardTitle className="text-lg font-semibold">Account Type</CardTitle>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <p className="text-sm text-[var(--text-secondary)]">
            Your account type determines which features and dashboard sections are
            available to you.
          </p>
          <div className="flex flex-wrap gap-2">
            {ACCOUNT_TYPES.map((tier) => (
              <Button
                key={tier.key}
                variant={accountType === tier.key ? "default" : "outline"}
                onClick={() => setAccountType(tier.key)}
              >
                {tier.label}
              </Button>
            ))}
          </div>
          <Button onClick={handleSaveType} disabled={savingType}>
            {savingType ? "Saving..." : "Save Account Type"}
          </Button>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card className="overflow-hidden">
        <CardHeader className="border-b border-[var(--border-subtle)] pb-4">
          <CardTitle className="text-lg font-semibold">Notification Preferences</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="divide-y divide-[var(--border-subtle)]">
            {NOTIFICATIONS.map(({ key, label }) => (
              <div key={key} className="flex justify-between items-center py-4">
                <span className="text-sm font-medium">{label}</span>
                <Switch
                  checked={notifs[key]}
                  onChange={(checked) =>
                    setNotifs((prev) => ({ ...prev, [key]: checked }))
                  }
                  aria-label={label}
                />
              </div>
            ))}
          </div>
          <Button
            onClick={handleSaveNotifs}
            disabled={savingNotifs}
            className={cn("mt-4")}
          >
            {savingNotifs ? "Saving..." : "Save Preferences"}
          </Button>
        </CardContent>
      </Card>

      {/* Privacy */}
      <Card className="overflow-hidden">
        <CardHeader className="border-b border-[var(--border-subtle)] pb-4">
          <CardTitle className="text-lg font-semibold">Privacy</CardTitle>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div className="space-y-2 max-w-md">
            <Label htmlFor="visibility">Profile Visibility</Label>
            <Select value={visibility} onValueChange={setVisibility}>
              <SelectTrigger id="visibility">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {VISIBILITY_OPTIONS.map((o) => (
                  <SelectItem key={o.value} value={o.value}>
                    {o.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2 max-w-md">
            <Label htmlFor="contact-permission">Who can contact me</Label>
            <Select value={contactPermission} onValueChange={setContactPermission}>
              <SelectTrigger id="contact-permission">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CONTACT_OPTIONS.map((o) => (
                  <SelectItem key={o.value} value={o.value}>
                    {o.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {!profile && (
            <p className="text-xs text-[var(--text-tertiary)]">
              Privacy settings are available for freelancer profiles.
            </p>
          )}
          <Button onClick={handleSavePrivacy} disabled={savingPrivacy || !profile}>
            {savingPrivacy ? "Saving..." : "Save Privacy Settings"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
