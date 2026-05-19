"use client";

import { useState } from "react";

const faqs = [
  {
    q: "How long do tooth gems last?",
    a: "With proper care, gems last 3–12+ months. Avoid hard biting and acidic drinks to maximize longevity. Most clients come back for a refresh after 6–9 months.",
  },
  {
    q: "How are the gems bonded?",
    a: "I use a professional 2-in-1 self-etching primer and adhesive (combines both steps into one applicator) followed by Tetric EvoFlow, the same dental-grade light-cure composite used by orthodontists for braces. It&apos;s long-lasting, wear-resistant, and fully safe for enamel.",
  },
  {
    q: "Does the application hurt?",
    a: "Not at all. Completely painless. No drilling, no needles, no damage to your enamel. The gem is bonded with dental-grade adhesive, the same used by orthodontists.",
  },
  {
    q: "Is it reversible?",
    a: "Yes, fully reversible. Only have a professional remove it: the process is quick, painless, and leaves no marks on your enamel.",
  },
  {
    q: "Is it safe for my teeth?",
    a: "Yes. Lead-free Swarovski crystals + dental-grade adhesive = no enamel damage, no drilling. The gem sits on the surface of your tooth only.",
  },
  {
    q: "Can I eat and drink normally?",
    a: "After 48 hours, yes. The first 48 hours require care: soft foods only, avoid front-tooth biting, no extreme heat or acidic drinks while the glue fully sets.",
  },
];

const aftercareRules = [
  { time: "2 hrs", rule: "No eating for 2 hours after your appointment" },
  { time: "24 hrs", rule: "No brushing teeth for 24 hours" },
  { time: "24 hrs", rule: "No candy, gum, or extremely hot drinks" },
  { time: "24 hrs", rule: "No mouthwash or white strips" },
  { time: "48 hrs", rule: "Soft foods only for first 48 hours" },
  { time: "48 hrs", rule: "Avoid biting into hard foods with front teeth (apples, corn, etc.)" },
  { time: "48 hrs", rule: "No smoking, vaping, or alcohol" },
  { time: "always", rule: "Avoid touching or playing with the gem" },
  { time: "always", rule: "Acidic drinks like soda reduce longevity; minimize them." },
  { time: "24–48 hrs", rule: "Glue takes 24–48 hours to fully develop; be gentle." },
];

export default function Aftercare() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section
      id="aftercare"
      className="py-28 px-6 relative overflow-hidden"
      style={{ background: "#1A0F2E" }}
    >
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-64 opacity-10 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(ellipse, #C4B5E8, transparent)" }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-14">
          <p className="font-body text-xs tracking-widest uppercase mb-3" style={{ color: "rgba(196,181,232,0.55)" }}>
            FAQ & Aftercare
          </p>
          <h2
            className="reveal-heading font-script mb-4"
            style={{ fontSize: "clamp(3.5rem, 9vw, 6.5rem)", color: "#F2EEFF", lineHeight: 1 }}
          >
            good to know
          </h2>
          <p className="font-body font-light max-w-sm mx-auto" style={{ color: "rgba(196,181,232,0.6)", fontSize: "0.9rem" }}>
            Common questions and how to keep your gem looking perfect.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* FAQ accordion */}
          <div className="flex flex-col gap-2">
            <p className="font-body text-xs tracking-widest uppercase mb-4" style={{ color: "rgba(196,181,232,0.4)" }}>
              Questions
            </p>
            {faqs.map((item, i) => (
              <div
                key={i}
                className="rounded-2xl overflow-hidden transition-all duration-200"
                style={{
                  background: open === i ? "rgba(196,181,232,0.1)" : "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(196,181,232,0.12)",
                }}
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                  aria-expanded={open === i}
                >
                  <span className="font-body text-sm font-medium" style={{ color: "#F2EEFF" }}>
                    {item.q}
                  </span>
                  <span
                    aria-hidden="true"
                    className="shrink-0 text-base transition-transform duration-200"
                    style={{ color: "#9B8FD4", transform: open === i ? "rotate(45deg)" : "none" }}
                  >
                    ✦
                  </span>
                </button>
                <div
                  style={{
                    display: "grid",
                    gridTemplateRows: open === i ? "1fr" : "0fr",
                    transition: "grid-template-rows 0.28s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                >
                  <div style={{ overflow: "hidden" }}>
                    <p
                      className="px-5 pb-4 font-body font-light text-sm leading-relaxed"
                      style={{ color: "rgba(196,181,232,0.65)" }}
                    >
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Aftercare checklist */}
          <div>
            <p className="font-body text-xs tracking-widest uppercase mb-4" style={{ color: "rgba(196,181,232,0.4)" }}>
              Aftercare
            </p>
            <div
              className="rounded-2xl p-6"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(196,181,232,0.12)",
              }}
            >
              <ul className="flex flex-col gap-3">
                {aftercareRules.map((r, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span
                      className="shrink-0 rounded-full px-2 py-0.5 text-[10px] font-body font-semibold mt-0.5"
                      style={{
                        background: "rgba(196,181,232,0.12)",
                        color: "rgba(196,181,232,0.55)",
                        minWidth: "4.75rem",
                        textAlign: "center",
                      }}
                    >
                      {r.time}
                    </span>
                    <span className="font-body text-sm font-light leading-relaxed" style={{ color: "rgba(196,181,232,0.7)" }}>
                      {r.rule}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
