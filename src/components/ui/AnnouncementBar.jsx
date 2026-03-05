"use client";

import { useState, useEffect } from "react";

const STORAGE_KEY = "announcementBar_dismissed_v1";

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem(STORAGE_KEY);
    if (!dismissed) setVisible(true);
  }, []);

  function dismiss() {
    localStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      className="d-flex align-items-center justify-content-center text-white px-3 py-2"
      style={{ background: "#ef2b70", fontSize: 13, lineHeight: 1.4, position: "relative" }}
    >
      <span>
        🚀 <strong>SkillLinkup is in pre-launch.</strong> We're working hard to build the best platform for freelancers and clients — we can't wait to welcome you!
      </span>
      <button
        type="button"
        onClick={dismiss}
        className="btn-close btn-close-white ms-3"
        style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", opacity: 0.8 }}
        aria-label="Close"
      />
    </div>
  );
}
