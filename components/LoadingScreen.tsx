"use client";

import { useState, useEffect } from "react";

function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

/* Prismatic diamond gems scattered around the centered logo */
const DIAMONDS = [
  { cls: "loading-diamond-1", w: 50, h: 50, top: "22%",   left: "9%",    opacity: 1   },
  { cls: "loading-diamond-2", w: 30, h: 30, top: "15%",   right: "14%",  opacity: 0.9 },
  { cls: "loading-diamond-3", w: 56, h: 56, top: "48%",   left: "5%",    opacity: 0.95},
  { cls: "loading-diamond-4", w: 24, h: 24, top: "62%",   right: "7%",   opacity: 0.8 },
  { cls: "loading-diamond-5", w: 40, h: 40, bottom: "20%",left: "18%",   opacity: 0.9 },
  { cls: "loading-diamond-6", w: 20, h: 20, top: "34%",   right: "21%",  opacity: 0.75},
  { cls: "loading-diamond-7", w: 46, h: 46, bottom: "16%",right: "14%",  opacity: 0.9 },
  { cls: "loading-diamond-8", w: 16, h: 16, top: "74%",   left: "40%",   opacity: 0.7 },
] as const;

export default function LoadingScreen() {
  const [hiding, setHiding] = useState(false);
  const [gone, setGone] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const t1 = setTimeout(() => setHiding(true), 1900);
    const t2 = setTimeout(() => setGone(true), 2700);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (gone) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: "linear-gradient(160deg, #1A0F2E 0%, #2E1A52 55%, #3D2660 100%)",
        opacity: hiding ? 0 : 1,
        transform: hiding ? "scale(0.97) translateY(-8px)" : "scale(1) translateY(0)",
        transition: prefersReducedMotion
          ? "opacity 0.01ms"
          : "opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1), transform 0.75s cubic-bezier(0.16, 1, 0.3, 1)",
        pointerEvents: hiding ? "none" : "all",
      }}
    >
      {/* Primary radial bloom — contracts as crystal forms */}
      <div
        aria-hidden="true"
        className="loading-bloom absolute rounded-full pointer-events-none"
        style={{
          width: "72vmax",
          height: "72vmax",
          top: "50%",
          left: "50%",
          marginTop: "-36vmax",
          marginLeft: "-36vmax",
          background:
            "radial-gradient(circle, rgba(196,181,232,0.24) 0%, rgba(155,143,212,0.1) 42%, transparent 68%)",
        }}
      />
      {/* Secondary deep bloom */}
      <div
        aria-hidden="true"
        className="absolute rounded-full pointer-events-none opacity-10"
        style={{
          width: "38vmax",
          height: "38vmax",
          bottom: "8%",
          right: "12%",
          background: "radial-gradient(circle, rgba(107,74,154,0.3) 0%, transparent 60%)",
        }}
      />

      {/* Prismatic diamond gems */}
      {DIAMONDS.map((d) => (
        <div
          key={d.cls}
          aria-hidden="true"
          className={`loading-diamond ${d.cls} absolute pointer-events-none select-none`}
          style={{
            width: d.w,
            height: d.h,
            top: "top" in d ? d.top : undefined,
            left: "left" in d ? d.left : undefined,
            right: "right" in d ? d.right : undefined,
            bottom: "bottom" in d ? d.bottom : undefined,
            opacity: d.opacity,
          }}
        />
      ))}

      {/* Logo — horizontal navette clip-path crystallizes into full wordmark */}
      <div className="relative loading-logo" style={{ overflow: "hidden" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/somped-vector.svg"
          alt=""
          className="w-64 sm:w-80 md:w-[360px] h-auto block"
          style={{ filter: "brightness(0) invert(1)" }}
        />
        {/* Shimmer sweep confined to letterform paths via SVG mask */}
        <div
          className="loading-shine-sweep absolute inset-0 pointer-events-none"
          style={{
            WebkitMaskImage: "url('/somped-vector.svg')",
            WebkitMaskSize: "100% 100%",
            WebkitMaskRepeat: "no-repeat",
            WebkitMaskPosition: "center",
            WebkitMaskMode: "alpha",
            maskImage: "url('/somped-vector.svg')",
            maskSize: "100% 100%",
            maskRepeat: "no-repeat",
            maskPosition: "center",
            maskMode: "alpha",
          } as React.CSSProperties}
        />
      </div>

      {/* Tagline — rises as logo settles */}
      <p
        aria-hidden="true"
        className="loading-tagline font-body select-none mt-6 text-[0.6rem] tracking-[0.28em] uppercase"
        style={{ color: "rgba(196, 181, 232, 0.42)" }}
      >
        tooth gem artist · nyc
      </p>

      {/* Progress line — fills and shimmers across the bottom */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-px pointer-events-none overflow-hidden"
      >
        <div className="loading-progress h-full w-full" />
      </div>
    </div>
  );
}
