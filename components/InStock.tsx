"use client";

import { useState } from "react";
import Image from "next/image";

type ColorTag = "Clear" | "Aurora Borealis" | "Pink" | "Purple" | "Chrome";
type Category = "All" | "Round" | "Shaped" | "Micro";

interface Crystal {
  name: string;
  type: "Swarovski" | "Cubic Zirconia";
  colors: ColorTag[];
  sizes?: string[];
  promo?: string;
  category: Exclude<Category, "All">;
  description: string;
  features?: string[];
  tip?: string;
  image: string;
}

const crystals: Crystal[] = [
  {
    name: "Round Crystal",
    type: "Swarovski",
    colors: ["Clear"],
    sizes: ["SS3", "SS5", "SS6", "SS7"],
    category: "Round",
    image: "/gem-round-clear.jpg",
    description:
      "Premium Austrian-made round crystals with multiple facets that catch and reflect light for maximum sparkle. Lead-free glass with a specialized coating for enhanced shine and long-lasting wear.",
    features: [
      "Multiple sizes available",
      "Maximum brilliance & sparkle",
      "Classic, timeless look",
    ],
  },
  {
    name: "Round Crystal",
    type: "Swarovski",
    colors: ["Aurora Borealis"],
    sizes: ["SS3", "SS6"],
    category: "Round",
    image: "/gem-round-ab.jpg",
    description:
      "The iconic Aurora Borealis coating creates a mesmerizing rainbow effect that shifts and sparkles with every movement — soft pinks, blues, greens, and golds all in one gem.",
    features: [
      "Iridescent multi-color shift",
      "Catches light from every angle",
      "Eye-catching in natural & artificial light",
    ],
  },
  {
    name: "Purple Round",
    type: "Swarovski",
    colors: ["Purple"],
    sizes: ["SS5"],
    category: "Round",
    image: "/gem-round-purple.jpg",
    description:
      "A rich, vibrant purple that creates a bold focal point on any tooth. Pairs beautifully with purple micro stars or AB crystals for a layered, dimensional look.",
    features: [
      "Rich light amethyst hue",
      "Pairs well with AB or clear gems",
      "Adds a pop of color",
    ],
  },
  {
    name: "Star",
    type: "Swarovski",
    colors: ["Pink", "Purple", "Clear", "Aurora Borealis"],
    category: "Shaped",
    image: "/gem-star.jpg",
    description:
      "Available in four finishes — each with its own personality. Mix and match or go for a single statement star.",
    features: [
      "Pink — soft, romantic, feminine",
      "Purple (Light Amethyst) — regal & mystical",
      "Aurora Borealis — iridescent showstopper",
      "Clear — timeless, diamond-like shine",
    ],
  },
  {
    name: "Fang",
    type: "Swarovski",
    colors: ["Clear"],
    category: "Shaped",
    image: "/gem-fang.jpg",
    description:
      "Teardrop-shaped with a precision-shaved edge for a bold fang effect. Catches light beautifully and delivers an edgy, statement look. The pointed silhouette mimics a natural canine shape.",
    features: [
      "Bold, edgy aesthetic",
      "Precision-cut teardrop shape",
      "Perfect for canine teeth",
    ],
  },
  {
    name: "Diamond",
    type: "Swarovski",
    colors: ["Clear", "Aurora Borealis"],
    category: "Shaped",
    image: "/gem-diamond-ab.jpg",
    description:
      "Geometric diamond-cut facets catch and reflect light from every angle — bold, refined, and modern. The AB version shifts through the entire color spectrum like the northern sky.",
    features: [
      "Sharp, geometric silhouette",
      "Applied to one tooth only",
      "AB version shifts colors prismatically",
    ],
    tip: "Best applied on one tooth only. DM for exceptions.",
  },
  {
    name: "Oval (Navette)",
    type: "Swarovski",
    colors: ["Clear", "Aurora Borealis"],
    category: "Shaped",
    promo: "$60 PROMO",
    image: "/gem-navette-ab.jpg",
    description:
      "Elongated teardrop silhouette specifically chosen for butterfly designs — the navette shape mimics butterfly wings perfectly. Ideal for paired placements or multi-gem arrangements.",
    features: [
      "Perfect for butterfly tooth art",
      "Clear or Aurora Borealis finish",
      "Smooth flat back for secure bonding",
    ],
  },
  {
    name: "Micro Diamond",
    type: "Swarovski",
    colors: ["Clear"],
    category: "Micro",
    image: "/gem-diamond.jpg",
    description:
      "Tiny Swarovski diamonds ideal for building intricate designs and delicate butterfly patterns. Small size + brilliant sparkle = maximum detail in minimal space.",
    features: [
      "Versatile accent piece",
      "Great for butterfly compositions",
      "Pairs with any larger gem",
    ],
  },
  {
    name: "Micro Navette",
    type: "Cubic Zirconia",
    colors: ["Chrome"],
    sizes: ["1.5×3mm"],
    category: "Micro",
    image: "/gem-navette-clear.jpg",
    description:
      "Sleek, sharp CZ navettes with a unique diamond-cut silhouette and flat bottom. Give off a brilliant shimmer and bring a modern, clean edge to any gem layout.",
    features: [
      "Chrome finish — sharp & modern",
      "Diamond-cut silhouette",
      "Great for butterfly designs",
    ],
  },
  {
    name: "Micro Moon",
    type: "Swarovski",
    colors: ["Clear"],
    category: "Micro",
    image: "/gem-moon.jpg",
    description:
      "Delicate crescent-shaped crystals with an ultra-thin profile that sit flush on the tooth. Each micro moon is precision-shaved for comfortable, long-lasting wear.",
    features: [
      "Crescent shape — celestial & elegant",
      "Ultra-thin for comfortable wear",
      "Ideal on canines, lateral incisors, or premolars",
    ],
    tip: "Pair with small round gems to create a constellation effect across multiple teeth.",
  },
];

const categories: Category[] = ["All", "Round", "Shaped", "Micro"];

const COLOR_STYLES: Record<ColorTag, { bg: string; text: string; border: string }> = {
  Clear:            { bg: "#F8F6FF", text: "#6B5A9A", border: "rgba(196,181,232,0.5)" },
  "Aurora Borealis":{ bg: "linear-gradient(90deg,#fce4ec,#e8eaf6,#e0f7fa,#f9fbe7)", text: "#5a4a7a", border: "rgba(196,181,232,0.4)" },
  Pink:             { bg: "#FFF0F5", text: "#b05080", border: "rgba(255,182,193,0.6)" },
  Purple:           { bg: "#F3EEFF", text: "#6B3FA0", border: "rgba(196,181,232,0.6)" },
  Chrome:           { bg: "#F0F0F4", text: "#555570", border: "rgba(150,150,180,0.5)" },
};

function ColorPill({ color }: { color: ColorTag }) {
  const s = COLOR_STYLES[color];
  return (
    <span
      className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-body font-medium"
      style={{
        background: s.bg,
        color: s.text,
        border: `1px solid ${s.border}`,
      }}
    >
      {color}
    </span>
  );
}

function TypeBadge({ type }: { type: Crystal["type"] }) {
  return (
    <span
      className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-body font-medium"
      style={{
        background: type === "Swarovski" ? "#EEE8FF" : "#F0F0F4",
        color: type === "Swarovski" ? "#3D2660" : "#555570",
        border: `1px solid ${type === "Swarovski" ? "rgba(196,181,232,0.5)" : "rgba(150,150,180,0.4)"}`,
      }}
    >
      ✧ {type}
    </span>
  );
}

export default function InStock() {
  const [active, setActive] = useState<Category>("All");

  const filtered = active === "All" ? crystals : crystals.filter((c) => c.category === active);

  return (
    <section
      id="in-stock"
      className="py-28 px-6 relative overflow-hidden"
      style={{ background: "#1A0F2E" }}
    >
      {/* Bg glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-64 opacity-10 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(ellipse, #C4B5E8, transparent)" }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="font-body text-xs tracking-widest uppercase mb-3" style={{ color: "rgba(196,181,232,0.6)" }}>
            Tooth Gem Inventory
          </p>
          <h2
            className="font-script mb-4"
            style={{ fontSize: "clamp(2.8rem, 7vw, 5rem)", color: "#F2EEFF", lineHeight: 1 }}
          >
            in stock
          </h2>
          <p className="font-body font-light max-w-sm mx-auto" style={{ color: "rgba(196,181,232,0.65)", fontSize: "0.9rem" }}>
            All gems are lead-free Swarovski crystals unless noted. Every gem is +$10 on top of the $55 base.
          </p>
        </div>

        {/* Category tabs */}
        <div className="flex items-center justify-center gap-2 mb-10 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className="rounded-full px-5 py-2 font-body text-sm font-medium transition-all duration-200"
              style={
                active === cat
                  ? { background: "linear-gradient(135deg, #C4B5E8, #9B8FD4)", color: "#1A0F2E" }
                  : {
                      background: "rgba(196,181,232,0.08)",
                      color: "rgba(196,181,232,0.65)",
                      border: "1px solid rgba(196,181,232,0.15)",
                    }
              }
            >
              {cat === "All" ? "All Gems" : cat}
            </button>
          ))}
        </div>

        {/* Crystal cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((c, i) => (
            <div
              key={`${c.name}-${i}`}
              className="rounded-3xl flex flex-col overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(196,181,232,0.12)",
              }}
            >
              {/* Product image */}
              <div className="relative w-full h-44 overflow-hidden">
                <Image
                  src={c.image}
                  alt={c.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to bottom, transparent 50%, rgba(26,15,46,0.85) 100%)" }}
                />
                {c.promo && (
                  <span
                    className="absolute top-3 right-3 rounded-full px-2.5 py-0.5 text-xs font-body font-semibold"
                    style={{ background: "rgba(201,164,76,0.85)", color: "#1A0F2E", backdropFilter: "blur(4px)" }}
                  >
                    {c.promo}
                  </span>
                )}
              </div>

              <div className="p-6 flex flex-col gap-4 flex-1">
                {/* Top row: name */}
                <h3 className="font-display font-semibold text-lg leading-tight" style={{ color: "#F2EEFF" }}>
                  {c.name}
                </h3>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  <TypeBadge type={c.type} />
                  {c.colors.map((col) => (
                    <ColorPill key={col} color={col} />
                  ))}
                  {c.sizes && c.sizes.map((sz) => (
                    <span
                      key={sz}
                      className="rounded-full px-2.5 py-0.5 text-xs font-body"
                      style={{ background: "rgba(196,181,232,0.08)", color: "rgba(196,181,232,0.55)", border: "1px solid rgba(196,181,232,0.12)" }}
                    >
                      {sz}
                    </span>
                  ))}
                </div>

                {/* Description */}
                <p className="font-body font-light text-sm leading-relaxed" style={{ color: "rgba(196,181,232,0.7)" }}>
                  {c.description}
                </p>

                {/* Features */}
                {c.features && (
                  <ul className="flex flex-col gap-1.5">
                    {c.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 font-body text-xs" style={{ color: "rgba(196,181,232,0.6)" }}>
                        <span className="mt-0.5 shrink-0" style={{ color: "#9B8FD4" }}>✧</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                )}

                {/* Tip */}
                {c.tip && (
                  <div
                    className="rounded-xl px-3.5 py-2.5 text-xs font-body font-light leading-relaxed"
                    style={{ background: "rgba(196,181,232,0.08)", color: "rgba(196,181,232,0.6)", border: "1px solid rgba(196,181,232,0.2)", borderRadius: "0.75rem" }}
                  >
                    💡 {c.tip}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <div className="text-center mt-10">
          <p className="font-body text-xs" style={{ color: "rgba(196,181,232,0.4)" }}>
            Inventory updated regularly. DM{" "}
            <a
              href="https://www.instagram.com/s0mped/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:opacity-80"
              style={{ color: "rgba(196,181,232,0.6)" }}
            >
              @s0mped
            </a>{" "}
            to confirm availability or request a gem not listed.
          </p>
        </div>
      </div>
    </section>
  );
}
