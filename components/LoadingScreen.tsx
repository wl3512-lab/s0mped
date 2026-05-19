"use client";

import { useState, useEffect } from "react";

export default function LoadingScreen() {
  const [hiding, setHiding] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setHiding(true), 1700);
    const t2 = setTimeout(() => setGone(true), 2500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (gone) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{
        background: "linear-gradient(160deg, #1A0F2E 0%, #2E1A52 55%, #3D2660 100%)",
        opacity: hiding ? 0 : 1,
        transform: hiding ? "scale(0.97) translateY(-8px)" : "scale(1) translateY(0)",
        transition: "opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
        pointerEvents: hiding ? "none" : "all",
      }}
    >
      {/* Ambient blobs */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #C4B5E8, transparent)" }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #9B8FD4, transparent)" }}
      />

      {/* Sparkles — appear in sequence to prelude the logo, then twinkle */}
      <div className="flex items-center gap-5 mb-10">
        {(["loading-sparkle-1", "loading-sparkle-2", "loading-sparkle-3"] as const).map((cls, i) => (
          <span
            key={i}
            className={`text-sm select-none ${cls}`}
            style={{ color: "#C4B5E8" }}
          >
            ✧
          </span>
        ))}
      </div>

      {/* Logo — crystallizes into focus */}
      <div
        className="relative loading-logo"
        style={{ overflow: "hidden" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/somped-vector.svg"
          alt=""
          className="w-64 sm:w-80 md:w-[340px] h-auto block"
          style={{ filter: "brightness(0) invert(1)" }}
        />
        {/* Shimmer masked to letterform paths */}
        <div
          className="loading-shine-sweep absolute inset-0 pointer-events-none"
          style={{
            WebkitMaskImage: "url('/somped-vector.svg')",
            WebkitMaskSize: "100% 100%",
            WebkitMaskRepeat: "no-repeat",
            WebkitMaskPosition: "center",
            maskImage: "url('/somped-vector.svg')",
            maskSize: "100% 100%",
            maskRepeat: "no-repeat",
            maskPosition: "center",
          } as React.CSSProperties}
        />
      </div>
    </div>
  );
}
