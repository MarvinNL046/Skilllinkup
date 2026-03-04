"use client";
import { useState, useEffect } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import useConvexUser from "@/hook/useConvexUser";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";

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

export default function SettingsTab() {
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
      toast.success("Account type updated");
    } catch (err) {
      toast.error(err.message || "Failed");
    } finally {
      setSavingType(false);
    }
  };

  const handleSaveNotifs = async () => {
    setSavingNotifs(true);
    try {
      await upsertNotifications(notifs);
      toast.success("Notification preferences saved");
    } catch (err) {
      toast.error(err.message || "Failed");
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
      toast.success("Privacy settings saved");
    } catch (err) {
      toast.error(err.message || "Failed");
    } finally {
      setSavingPrivacy(false);
    }
  };

  if (!isLoaded) {
    return (
      <div className="ps-widget bgc-white bdrs4 p30 mb30">
        <div className="spinner-border text-thm" role="status" />
      </div>
    );
  }

  return (
    <>
      {/* Account */}
      <div className="ps-widget bgc-white bdrs4 p30 mb20">
        <h5 className="list-title bdrb1 pb15 mb20">Account</h5>
        <div className="row">
          <div className="col-sm-6 mb20">
            <label className="heading-color ff-heading fw500 mb10">Email</label>
            <input
              className="form-control"
              value={
                clerkUser?.primaryEmailAddress?.emailAddress ||
                convexUser?.email ||
                ""
              }
              disabled
            />
            <small className="text-muted">To change your email, contact support.</small>
          </div>
        </div>
        <button
          className="ud-btn btn-white"
          onClick={() =>
            clerkUser?.openUserProfile?.() ||
            window.open("https://accounts.clerk.dev/user", "_blank")
          }
        >
          <i className="flaticon-security me-2" /> Change Password
        </button>
      </div>

      {/* Account Type */}
      <div className="ps-widget bgc-white bdrs4 p30 mb20">
        <h5 className="list-title bdrb1 pb15 mb20">Account Type</h5>
        <p className="text fz14 mb15">
          Your account type determines which features and dashboard sections are
          available to you.
        </p>
        <div className="d-flex gap-2 mb20 flex-wrap">
          {ACCOUNT_TYPES.map((t) => (
            <button
              key={t.key}
              className={`ud-btn ${accountType === t.key ? "btn-thm" : "btn-white"}`}
              onClick={() => setAccountType(t.key)}
            >
              {t.label}
            </button>
          ))}
        </div>
        <button
          className="ud-btn btn-thm"
          onClick={handleSaveType}
          disabled={savingType}
        >
          {savingType ? "Saving..." : "Save Account Type"}
        </button>
      </div>

      {/* Notifications */}
      <div className="ps-widget bgc-white bdrs4 p30 mb20">
        <h5 className="list-title bdrb1 pb15 mb20">Notification Preferences</h5>
        {[
          { key: "newMessage", label: "New message received" },
          { key: "orderUpdate", label: "Order status update" },
          { key: "reviewReceived", label: "Review received" },
          { key: "marketingEmails", label: "Marketing & tips from SkillLinkup" },
        ].map(({ key, label }) => (
          <div
            key={key}
            className="d-flex justify-content-between align-items-center bdrb1 pb15 mb15"
          >
            <span className="fz15">{label}</span>
            <div className="form-check form-switch mb-0">
              <input
                className="form-check-input"
                type="checkbox"
                checked={notifs[key]}
                onChange={(e) =>
                  setNotifs((prev) => ({ ...prev, [key]: e.target.checked }))
                }
              />
            </div>
          </div>
        ))}
        <button
          className="ud-btn btn-thm mt10"
          onClick={handleSaveNotifs}
          disabled={savingNotifs}
        >
          {savingNotifs ? "Saving..." : "Save Preferences"}
        </button>
      </div>

      {/* Privacy */}
      <div className="ps-widget bgc-white bdrs4 p30 mb20">
        <h5 className="list-title bdrb1 pb15 mb20">Privacy</h5>
        <div className="mb20">
          <label className="heading-color ff-heading fw500 mb10">
            Profile Visibility
          </label>
          <select
            className="form-control"
            value={visibility}
            onChange={(e) => setVisibility(e.target.value)}
          >
            {VISIBILITY_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
        <div className="mb20">
          <label className="heading-color ff-heading fw500 mb10">
            Who can contact me
          </label>
          <select
            className="form-control"
            value={contactPermission}
            onChange={(e) => setContactPermission(e.target.value)}
          >
            {CONTACT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
        {!profile && (
          <p className="fz13 text-muted mb15">
            Privacy settings are available for freelancer profiles.
          </p>
        )}
        <button
          className="ud-btn btn-thm"
          onClick={handleSavePrivacy}
          disabled={savingPrivacy || !profile}
        >
          {savingPrivacy ? "Saving..." : "Save Privacy Settings"}
        </button>
      </div>
    </>
  );
}
