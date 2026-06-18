"use client";

import { useState, useEffect, useRef } from "react";

export default function MobileBookingPill() {
  const [visible, setVisible] = useState(false);
  const [pulsed, setPulsed] = useState(false);
  const pillRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let hasShown = false;

    function onScroll() {
      const scrolled = window.scrollY;
      const heroH = window.innerHeight;
      const shouldShow = scrolled > heroH * 0.75;

      if (shouldShow && !hasShown) {
        hasShown = true;
        setVisible(true);
        setTimeout(() => {
          setPulsed(true);
          setTimeout(() => setPulsed(false), 600);
        }, 400);
      } else if (!shouldShow) {
        setVisible(false);
        hasShown = false;
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const booking = document.getElementById("book");
    if (!booking) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(false); },
      { rootMargin: "0px 0px -20% 0px" }
    );
    observer.observe(booking);
    return () => observer.disconnect();
  }, []);

  return (
    <a
      href="/book"
      aria-label="Book your gem appointment"
      className="md:hidden fixed bottom-6 left-1/2 z-40"
      style={{
        transform: `translateX(-50%) translateY(${visible ? "0px" : "72px"})`,
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        transition: "transform 0.5s cubic-bezier(0.2, 0, 0, 1), opacity 0.4s ease",
      }}
    >
      <span
        ref={pillRef}
        className={pulsed ? "pill-pulse-once" : ""}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          borderRadius: "9999px",
          padding: "14px 28px",
          fontFamily: "var(--font-jost), sans-serif",
          fontWeight: 600,
          fontSize: "0.875rem",
          letterSpacing: "0.04em",
          color: "#F2EEFF",
          background: "linear-gradient(135deg, #3D2660 0%, #6B4A9A 60%, #9B8FD4 100%)",
          boxShadow: "0 8px 32px rgba(61,38,96,0.45), 0 2px 8px rgba(0,0,0,0.2)",
          whiteSpace: "nowrap",
        }}
      >
        Book Now ✧
      </span>
    </a>
  );
}
