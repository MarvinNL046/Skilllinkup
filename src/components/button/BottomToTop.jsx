"use client";
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import styles from "./BottomToTop.module.css";

export default function BottomToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Button
      type="button"
      size="icon"
      className={`${styles.button} ${isVisible ? styles.visible : ""}`}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      title="Back to top"
      tabIndex={isVisible ? 0 : -1}
    >
      <ArrowUp size={20} strokeWidth={2.2} aria-hidden="true" />
    </Button>
  );
}
