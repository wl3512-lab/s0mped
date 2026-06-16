"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Stone = {
  src: string;
  name: string;
  cut: string;
  note: string;
};

const stones: Stone[] = [
  { src: "/gem-round-ab.jpg", name: "Aurora", cut: "Round · AB", note: "the candlelight catcher — throws every colour" },
  { src: "/gem-navette-clear.jpg", name: "Navette", cut: "Marquise · Clear", note: "elongates the tooth, pure white fire" },
  { src: "/gem-star.jpg", name: "Star", cut: "Five-point", note: "the signature — a little wish on enamel" },
  { src: "/gem-moon.jpg", name: "Crescent", cut: "Moon", note: "soft, celestial, worn close to the canine" },
  { src: "/gem-fang.jpg", name: "Fang", cut: "Teardrop", note: "edge with intent — sharp where it counts" },
  { src: "/gem-round-purple.jpg", name: "Amethyst", cut: "Round · Violet", note: "house colour, deep committed purple" },
];

export default function StonesShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Full immersive horizontal scroll — only when motion is welcome.
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const track = trackRef.current!;
        const viewport = viewportRef.current!;

        // Lock the viewport so the only horizontal motion is GSAP-driven.
        viewport.style.overflowX = "hidden";

        const getDistance = () => track.scrollWidth - window.innerWidth;

        // Drive the track left as the user scrolls down. ease:"none" keeps
        // scroll position and horizontal position perfectly in sync.
        const scrollTween = gsap.to(track, {
          x: () => -getDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            pin: true,
            scrub: 1,
            start: "top top",
            end: () => "+=" + getDistance(),
            invalidateOnRefresh: true,
          },
        });

        const panels = gsap.utils.toArray<HTMLElement>(".stone-panel");

        panels.forEach((panel) => {
          const img = panel.querySelector<HTMLElement>(".stone-img");
          const caption = panel.querySelector<HTMLElement>(".stone-caption");

          // Layered parallax: the stone drifts opposite the caption as each
          // panel crosses the viewport, tied to the horizontal containerAnimation.
          if (img) {
            gsap.fromTo(
              img,
              { xPercent: 18, scale: 1.12 },
              {
                xPercent: -18,
                scale: 1,
                ease: "none",
                scrollTrigger: {
                  trigger: panel,
                  containerAnimation: scrollTween,
                  start: "left right",
                  end: "right left",
                  scrub: true,
                },
              }
            );
          }

          if (caption) {
            gsap.fromTo(
              caption,
              { xPercent: -10, autoAlpha: 0.2 },
              {
                xPercent: 0,
                autoAlpha: 1,
                ease: "none",
                scrollTrigger: {
                  trigger: panel,
                  containerAnimation: scrollTween,
                  start: "left 80%",
                  end: "center center",
                  scrub: true,
                },
              }
            );
          }
        });

        // Refresh once the gem images have decoded — their size affects layout.
        const imgs = track.querySelectorAll("img");
        let pending = imgs.length;
        imgs.forEach((el) => {
          if (el.complete) {
            if (--pending === 0) ScrollTrigger.refresh();
          } else {
            el.addEventListener("load", () => {
              if (--pending === 0) ScrollTrigger.refresh();
            });
          }
        });

        return () => {
          viewport.style.overflowX = "";
        };
      });

      // Reduced motion: native horizontal scroll, no pinning, no parallax.
      mm.add("(prefers-reduced-motion: reduce)", () => {
        viewportRef.current!.style.overflowX = "auto";
        return () => {
          if (viewportRef.current) viewportRef.current.style.overflowX = "";
        };
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="stones"
      aria-label="The stones"
      className="relative overflow-hidden"
      style={{ background: "#1A0F2E" }}
    >
      {/* Eyebrow / fixed label that sits over the pinned panels */}
      <div className="pointer-events-none absolute top-8 left-6 z-20 sm:top-10 sm:left-10">
        <p
          className="font-body text-xs tracking-[0.3em] uppercase"
          style={{ color: "#9B8FD4" }}
        >
          ✧ The Stones
        </p>
        <p className="font-body text-xs mt-1" style={{ color: "rgba(196,181,232,0.5)" }}>
          scroll to drift through the collection
        </p>
      </div>

      <div ref={viewportRef} className="w-full">
        <div
          ref={trackRef}
          className="flex flex-nowrap h-[100svh] will-change-transform"
        >
          {/* Intro panel */}
          <div className="stone-panel relative flex h-full w-screen flex-shrink-0 flex-col items-center justify-center px-8 text-center">
            <div className="iridescent twinkle mb-6 text-4xl" style={{ WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
              ✦
            </div>
            <h2
              className="font-script"
              style={{ fontSize: "clamp(3.5rem, 12vw, 9rem)", color: "#F2EEFF", lineHeight: 0.95 }}
            >
              every stone
            </h2>
            <p
              className="font-display italic mt-2"
              style={{ fontSize: "clamp(1.5rem, 4vw, 3rem)", color: "#C4B5E8" }}
            >
              has a personality
            </p>
            <p
              className="font-body font-light mt-8 max-w-sm text-sm leading-relaxed"
              style={{ color: "#9B8FD4" }}
            >
              Six cuts, infinite placements. Keep scrolling — they come to you.
            </p>
            <div className="mt-10 font-body text-xs tracking-widest" style={{ color: "rgba(196,181,232,0.6)" }}>
              {stones.length} cuts →
            </div>
          </div>

          {/* Stone panels */}
          {stones.map((stone, i) => (
            <article
              key={stone.name}
              className="stone-panel relative flex h-full w-screen flex-shrink-0 items-center justify-center px-8"
            >
              {/* Oversized index numeral, faint, for editorial depth */}
              <span
                className="font-display pointer-events-none absolute select-none"
                style={{
                  fontSize: "clamp(14rem, 40vw, 34rem)",
                  color: "rgba(196,181,232,0.05)",
                  lineHeight: 1,
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="relative z-10 flex flex-col items-center gap-7 sm:flex-row sm:gap-12">
                {/* The gem */}
                <div
                  className="stone-img relative overflow-hidden rounded-[24px]"
                  style={{
                    width: "min(72vw, 30rem)",
                    aspectRatio: "1 / 1",
                    boxShadow: "0 0 28px rgba(196,181,232,0.25), 0 0 56px rgba(196,181,232,0.1)",
                  }}
                >
                  <Image
                    src={stone.src}
                    alt={`${stone.name} — ${stone.cut} tooth gem`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 72vw, 30rem"
                    priority={i === 0}
                  />
                  <div className="iridescent absolute inset-0 mix-blend-soft-light opacity-30" />
                </div>

                {/* Caption */}
                <div className="stone-caption max-w-xs text-center sm:text-left">
                  <p
                    className="font-body text-xs tracking-[0.3em] uppercase mb-3"
                    style={{ color: "#9B8FD4" }}
                  >
                    {stone.cut}
                  </p>
                  <h3
                    className="font-script"
                    style={{ fontSize: "clamp(3rem, 8vw, 5.5rem)", color: "#F2EEFF", lineHeight: 1 }}
                  >
                    {stone.name}
                  </h3>
                  <p
                    className="font-display italic mt-4 text-base leading-relaxed"
                    style={{ color: "#C4B5E8" }}
                  >
                    {stone.note}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
