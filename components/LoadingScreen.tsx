"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function LoadingScreen() {
  const [hiding, setHiding] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setHiding(true), 1600);
    const t2 = setTimeout(() => setGone(true), 2350);
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
        transition: "opacity 0.75s cubic-bezier(0.4, 0, 0.2, 1)",
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

      {/* Logo with shimmer sweep */}
      <div
        className="relative mb-10 loading-logo"
        style={{ overflow: "hidden" }}
      >
        <Image
          src="/somped-vector.svg"
          alt=""
          width={340}
          height={118}
          className="w-64 sm:w-80 md:w-[340px] h-auto"
          style={{ filter: "brightness(0) invert(1)" }}
          unoptimized
          priority
        />
        <div className="loading-shine-sweep absolute inset-0 pointer-events-none" />
      </div>

      {/* Pulsing sparkles */}
      <div className="flex items-center gap-5">
        {[0, 0.35, 0.7].map((delay, i) => (
          <span
            key={i}
            className="twinkle text-sm select-none"
            style={{ color: "#C4B5E8", animationDelay: `${delay}s`, opacity: 0.7 }}
          >
            ✧
          </span>
        ))}
      </div>
    </div>
  );
}
