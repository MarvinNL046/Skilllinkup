"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="our-error">
      <div className="container">
        <div className="row align-items-center justify-content-center">
          <div className="col-xl-6 text-center">
            <div className="error_page_content">
              <div
                className="mb30"
                style={{ fontSize: "5rem", color: "#ef2b70" }}
              >
                <i className="fal fa-triangle-exclamation" />
              </div>
              <div
                className="erro_code"
                style={{ color: "#1e1541" }}
              >
                Oops<span className="text-thm">!</span>
              </div>
              <div className="h2 error_title">Something went wrong</div>
              <p className="text fz15 mb30">
                An unexpected error occurred. Please try again or go back to the
                homepage.
              </p>
              <div className="d-flex gap-3 justify-content-center">
                <button
                  onClick={reset}
                  className="ud-btn btn-thm"
                >
                  Try again
                  <i className="fal fa-rotate-right ms-2" />
                </button>
                <Link href="/" className="ud-btn btn-white2">
                  Go Home
                  <i className="fal fa-house ms-2" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
