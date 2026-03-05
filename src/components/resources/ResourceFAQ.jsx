"use client";
import { useState } from "react";

export default function ResourceFAQ({ items }) {
  const [open, setOpen] = useState(null);
  if (!items?.length) return null;
  return (
    <section className="pt60 pb60">
      <div className="container">
        <h2 className="fz28 fw700 mb30">Frequently Asked Questions</h2>
        <div className="accordion" id="resourceFAQ">
          {items.map((item, i) => (
            <div key={i} className="accordion-item bdr1 bdrs8 mb10">
              <h3 className="accordion-header">
                <button
                  className={`accordion-button fz16 fw600 ${open !== i ? "collapsed" : ""}`}
                  onClick={() => setOpen(open === i ? null : i)}
                  style={{ background: "none", boxShadow: "none" }}
                >
                  {item.question}
                </button>
              </h3>
              {open === i && (
                <div className="accordion-body fz15 text-muted pt0">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
