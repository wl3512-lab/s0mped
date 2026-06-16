import Image from "next/image";

const stats = [
  { value: "Swarovski", label: "Lead-Free Only" },
  { value: "Certified", label: "2024" },
  { value: "3-Week", label: "Warranty" },
  { value: "3–12 mo+", label: "Wear Time" },
];

export default function About() {
  return (
    <section
      id="about"
      className="py-28 px-6 relative overflow-hidden"
      style={{ background: "#F2EEFF" }}
    >
      <div
        className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle at top right, #C4B5E8, transparent 70%)" }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Centered header */}
        <div className="text-center mb-16">
          <p className="font-body text-xs tracking-widest uppercase mb-3" style={{ color: "#9B8FD4" }}>
            About the Artist
          </p>
          <h2
            className="reveal-heading font-script"
            style={{ fontSize: "clamp(3.5rem, 10vw, 7rem)", color: "#3D2660", lineHeight: 1.05 }}
          >
            a gem for every smile
          </h2>
        </div>

        {/* Two-col layout */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Text + stats */}
          <div className="flex flex-col items-start">
            <p className="font-body font-light leading-relaxed mb-5" style={{ color: "#6B5A9A", fontSize: "0.95rem" }}>
              Hi, I&apos;m the artist behind sompednyc, your go-to for sparkling, professionally
              applied tooth gems in NYC. I only use lead-free Swarovski crystals and premium
              gold charms, bonded safely with dental-grade adhesive.
            </p>
            <p className="font-body font-light leading-relaxed mb-6" style={{ color: "#6B5A9A", fontSize: "0.95rem" }}>
              No drilling. No pain. Completely reversible. Follow me on Instagram for inspo,
              pricing, and to see satisfied clients ✧
            </p>

            <a
              href="https://www.instagram.com/lucyy.liuu/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-body text-sm font-medium mb-10 transition-opacity hover:opacity-70"
              style={{ color: "#9B8FD4" }}
            >
              <InstagramIcon />
              @lucyy.liuu
            </a>

            <div
              className="grid grid-cols-2 lg:grid-cols-4 gap-y-6 gap-x-4 w-full pt-6"
              style={{ borderTop: "1px solid rgba(196,181,232,0.25)" }}
            >
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="font-display font-light text-2xl mb-1" style={{ color: "#3D2660" }}>
                    {s.value}
                  </div>
                  <div className="font-body text-[10px] tracking-widest uppercase" style={{ color: "#9B8FD4" }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Photo */}
          <div className="flex justify-center">
            <div
              className="relative w-72 h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden shrink-0"
              style={{
                boxShadow: "0 8px 40px rgba(61, 38, 96, 0.2), 0 0 0 6px rgba(196, 181, 232, 0.25)",
              }}
            >
              <Image
                src="/me.JPG"
                alt="sompednyc tooth gem artist"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 288px, 320px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function InstagramIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  );
}
