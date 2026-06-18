"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type SetLook = {
  src: string;
  name: string;
  tag: string;
  note: string;
};

const looks: SetLook[] = [
  {
    src: "/set-cluster.jpg",
    name: "The Cluster",
    tag: "Mixed cuts · upper smile",
    note: "round, cross, star & marquise scattered across the front — a constellation that throws light from every angle",
  },
  {
    src: "/set-dagger.jpg",
    name: "The Dagger",
    tag: "Single statement",
    note: "one bold dagger with a ruby-and-clear accent — edge with intent, made to be noticed",
  },
  {
    src: "/set-row.jpg",
    name: "The Row",
    tag: "Lower line · all kite",
    note: "a full row of kite-cut crystals along the bottom teeth — pure white fire, end to end",
  },
];

export default function StonesShowcase() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Gentle fade-up reveal as the looks scroll into view. Motion only.
      gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".look-card", {
          y: 48,
          autoAlpha: 0,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".looks-grid",
            start: "top 80%",
          },
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="stones"
      aria-label="Sets and inspiration"
      className="relative overflow-hidden px-6 py-24 sm:px-10 sm:py-32"
      style={{ background: "#1A0F2E" }}
    >
      {/* Section header */}
      <div className="mx-auto max-w-6xl text-center">
        <p
          className="font-body text-xs tracking-[0.3em] uppercase"
          style={{ color: "#9B8FD4" }}
        >
          ✧ Sets &amp; Inspo
        </p>
        <h2
          className="font-script mt-4"
          style={{ fontSize: "clamp(3rem, 9vw, 6rem)", color: "#F2EEFF", lineHeight: 0.95 }}
        >
          looks to steal
        </h2>
        <p
          className="font-display italic mt-1"
          style={{ fontSize: "clamp(1.25rem, 3vw, 2.25rem)", color: "#C4B5E8" }}
        >
          sets I can do for you
        </p>
        <p
          className="font-body font-light mt-6 mx-auto max-w-sm text-sm leading-relaxed"
          style={{ color: "#9B8FD4" }}
        >
          Bring a reference or borrow one of these — every set is fully custom.
        </p>
      </div>

      {/* Grid of inspo sets */}
      <div className="looks-grid mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {looks.map((look) => (
          <article key={look.name} className="look-card group flex flex-col">
            {/* The placement photo */}
            <div
              className="relative w-full overflow-hidden rounded-[24px]"
              style={{
                aspectRatio: "4 / 5",
                boxShadow: "0 0 28px rgba(196,181,232,0.2), 0 0 56px rgba(196,181,232,0.08)",
              }}
            >
              <Image
                src={look.src}
                alt={`${look.name} — ${look.tag} tooth gem set`}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="iridescent absolute inset-0 mix-blend-soft-light opacity-25" />
            </div>

            {/* Caption */}
            <div className="mt-6 text-center sm:text-left">
              <p
                className="font-body text-xs tracking-[0.3em] uppercase mb-2"
                style={{ color: "#9B8FD4" }}
              >
                {look.tag}
              </p>
              <h3
                className="font-script"
                style={{ fontSize: "clamp(2.25rem, 4.5vw, 3rem)", color: "#F2EEFF", lineHeight: 1 }}
              >
                {look.name}
              </h3>
              <p
                className="font-display italic mt-3 text-base leading-relaxed"
                style={{ color: "#C4B5E8" }}
              >
                {look.note}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
