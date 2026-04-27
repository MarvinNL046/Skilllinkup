"use client";
import { useState } from "react";

const initialAlerts = [
  { id: "info", style: "alart_style_one", text: "Info: User pending action" },
  { id: "warning", style: "alart_style_two", text: "Warning: User has to be admin" },
  { id: "error", style: "alart_style_three", text: "Error: Internal Server Error" },
  { id: "success", style: "alart_style_four", text: "Success: Updated members status" },
];

export default function Alert1() {
  const [dismissed, setDismissed] = useState(new Set());
  const dismiss = (id) => setDismissed((prev) => new Set(prev).add(id));

  return (
    <div className="ui-content">
      <h5 className="title">Message Boxes</h5>
      <div className="message-alart-style1">
        {initialAlerts.map((alert) =>
          dismissed.has(alert.id) ? null : (
            <div
              key={alert.id}
              className={`alert ${alert.style} alert-dismissible fade show mb-5`}
              role="alert"
            >
              {alert.text}
              <button
                type="button"
                onClick={() => dismiss(alert.id)}
                className="btn-close"
                aria-label="Close"
              >
                <i className="far fa-xmark" aria-hidden="true" />
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
}
