export default function Services() {
  return (
    <section
      id="services"
      className="py-28 px-6 relative overflow-hidden"
      style={{ background: "#FAF8FF" }}
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 15% 80%, rgba(196,181,232,0.2) 0%, transparent 55%), radial-gradient(ellipse at 85% 20%, rgba(155,143,212,0.15) 0%, transparent 50%)",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="font-body text-xs tracking-widest uppercase mb-3" style={{ color: "#9B8FD4" }}>
            Menu & Pricing
          </p>
          <h2
            className="font-script mb-4"
            style={{ fontSize: "clamp(2.8rem, 7vw, 5rem)", color: "#3D2660", lineHeight: 1 }}
          >
            services
          </h2>

          {/* Pricing formula callout */}
          <div
            className="inline-flex flex-col sm:flex-row items-center gap-3 sm:gap-5 rounded-2xl px-7 py-4 mt-2"
            style={{
              background: "linear-gradient(135deg, #3D2660, #6B4A9A)",
              boxShadow: "0 8px 32px rgba(61,38,96,0.25)",
            }}
          >
            <div className="text-center">
              <span className="font-body font-semibold text-2xl" style={{ color: "#F2EEFF" }}>$55</span>
              <p className="font-body text-xs mt-0.5" style={{ color: "rgba(196,181,232,0.75)" }}>base price</p>
            </div>
            <span className="font-body text-xl" style={{ color: "rgba(196,181,232,0.4)" }}>+</span>
            <div className="text-center">
              <span className="font-body font-semibold text-2xl" style={{ color: "#F2EEFF" }}>$10</span>
              <p className="font-body text-xs mt-0.5" style={{ color: "rgba(196,181,232,0.75)" }}>per extra gem</p>
            </div>
            <span className="font-body text-xl hidden sm:block" style={{ color: "rgba(196,181,232,0.4)" }}>=</span>
            <div className="text-center hidden sm:block">
              <span className="font-body font-semibold text-base" style={{ color: "#C4B5E8" }}>any style,</span>
              <p className="font-body text-xs mt-0.5" style={{ color: "rgba(196,181,232,0.75)" }}>flat rate always</p>
            </div>
          </div>
        </div>

        {/* Base row: Single Gem + Additional Gems */}
        <div className="grid sm:grid-cols-2 gap-5 mb-4">
          {/* Single Gem — base service */}
          <div
            className="rounded-3xl p-7 relative overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1"
            style={{
              background: "#F2EEFF",
              border: "1px solid rgba(196,181,232,0.3)",
              boxShadow: "0 2px 16px rgba(61,38,96,0.06)",
            }}
          >
            <div className="text-2xl mb-5" style={{ color: "#9B8FD4" }}>✧</div>
            <div className="flex items-start justify-between gap-2 mb-3">
              <h3 className="font-display font-semibold text-xl leading-tight" style={{ color: "#3D2660" }}>
                Single Gem
              </h3>
              <span className="font-body font-semibold text-sm shrink-0 mt-0.5" style={{ color: "#9B8FD4" }}>
                $55
              </span>
            </div>
            <p className="font-body font-light text-sm leading-relaxed" style={{ color: "#6B5A9A" }}>
              One gem, placed exactly where you want it. Covers consultation, application, and aftercare — your base for any look.
            </p>
          </div>

          {/* Additional Gems — the rule, featured */}
          <div
            className="rounded-3xl p-7 relative overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1"
            style={{
              background: "linear-gradient(145deg, #3D2660 0%, #6B4A9A 60%, #9B8FD4 100%)",
              boxShadow: "0 12px 40px rgba(61,38,96,0.35)",
            }}
          >
            <div
              className="absolute top-4 right-4 rounded-full px-3 py-1 text-xs font-body font-medium"
              style={{ background: "rgba(242,238,255,0.15)", color: "#F2EEFF" }}
            >
              Flat rate
            </div>
            <div className="text-2xl mb-5" style={{ color: "rgba(242,238,255,0.8)" }}>✧✧</div>
            <div className="flex items-start justify-between gap-2 mb-3">
              <h3 className="font-display font-semibold text-xl leading-tight" style={{ color: "#F2EEFF" }}>
                Additional Gems
              </h3>
              <span className="font-body font-semibold text-sm shrink-0 mt-0.5" style={{ color: "rgba(242,238,255,0.75)" }}>
                +$10 each
              </span>
            </div>
            <p className="font-body font-light text-sm leading-relaxed" style={{ color: "rgba(242,238,255,0.7)" }}>
              Every extra gem is a flat $10 — no matter the style, shape, or color. Stack as many as you want.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 my-8">
          <div className="flex-1 h-px" style={{ background: "rgba(196,181,232,0.2)" }} />
          <span className="font-body text-xs tracking-widest uppercase" style={{ color: "#9B8FD4" }}>
            examples
          </span>
          <div className="flex-1 h-px" style={{ background: "rgba(196,181,232,0.2)" }} />
        </div>

        {/* Example combos — 3-col grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          {[
            {
              icon: "✧ ✦",
              name: "Star & Circle",
              price: "from $65",
              description: "Star + round crystal = 2 gems. Base $55 + $10. A popular combo — mix any shapes you like.",
            },
            {
              icon: "✧✧✧✧",
              name: "Crystal Line",
              price: "from $85",
              description: "4-gem row = base $55 + 3 add-ons ($30). More gems, more sparkle — same flat rate per gem.",
            },
            {
              icon: "✧✧✧✧✧",
              name: "Freestyle",
              price: "$80",
              description: "You pick which teeth — I design the layout. 5–6 crystals, custom arrangement, cheaper than building it gem by gem.",
            },
          ].map((s) => (
            <div
              key={s.name}
              className="rounded-2xl p-6 relative overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5"
              style={{
                background: "rgba(196,181,232,0.07)",
                border: "1px solid rgba(196,181,232,0.2)",
              }}
            >
              <div className="flex items-center gap-1 mb-1 text-base" style={{ color: "#9B8FD4" }}>
                {s.icon}
              </div>
              <div className="flex items-start justify-between gap-2 mb-2 mt-3">
                <h3 className="font-display font-semibold text-lg leading-tight" style={{ color: "#3D2660" }}>
                  {s.name}
                </h3>
                <span className="font-body font-semibold text-sm shrink-0 mt-0.5" style={{ color: "#9B8FD4" }}>
                  {s.price}
                </span>
              </div>
              <p className="font-body font-light text-sm leading-relaxed" style={{ color: "#6B5A9A" }}>
                {s.description}
              </p>
            </div>
          ))}
        </div>

        {/* Premium — full width */}
        <div
          className="rounded-3xl p-7 flex flex-col sm:flex-row sm:items-center gap-6 transition-all duration-300 hover:scale-[1.01]"
          style={{
            background: "#F2EEFF",
            border: "1px solid rgba(196,181,232,0.3)",
            boxShadow: "0 2px 16px rgba(61,38,96,0.06)",
          }}
        >
          <div className="text-3xl shrink-0" style={{ color: "#9B8FD4" }}>⬡</div>
          <div className="flex-1">
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="font-display font-semibold text-xl leading-tight" style={{ color: "#3D2660" }}>
                18k Gold / White Gold
              </h3>
              <span className="font-body font-semibold text-sm shrink-0 mt-0.5" style={{ color: "#9B8FD4" }}>
                from $140
              </span>
            </div>
            <p className="font-body font-light text-sm leading-relaxed" style={{ color: "#6B5A9A" }}>
              Premium solid 18k gold or white gold charms. Preorder required — DM @s0mped to reserve yours before booking.
            </p>
          </div>
          <a
            href="https://www.instagram.com/s0mped/"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 rounded-full px-5 py-2.5 font-body text-xs font-semibold tracking-wide transition-all hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #3D2660, #6B4A9A)",
              color: "#F2EEFF",
            }}
          >
            Preorder →
          </a>
        </div>

        {/* Footer notes */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <div
            className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-body text-sm font-medium"
            style={{
              background: "linear-gradient(135deg, #F2EEFF, #E8E0FF)",
              border: "1px solid rgba(196,181,232,0.4)",
              color: "#3D2660",
            }}
          >
            ✧ NYU students get 10% off — show your ID
          </div>
          <div className="font-body text-xs text-center" style={{ color: "#9B8FD4" }}>
            Mobile service available throughout NYC
          </div>
        </div>
      </div>
    </section>
  );
}
