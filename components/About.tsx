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
            style={{ fontSize: "clamp(2.8rem, 7vw, 5rem)", color: "#3D2660", lineHeight: 1.1 }}
          >
            a gem for every smile
          </h2>
        </div>

        {/* Two-col layout */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Text + stats */}
          <div className="flex flex-col items-start">
            <p className="font-body font-light leading-relaxed mb-5" style={{ color: "#6B5A9A", fontSize: "0.95rem" }}>
              Hi — I&apos;m the artist behind s0mped, your go-to for sparkling, professionally
              applied tooth gems in NYC. I only use lead-free Swarovski crystals and premium
              gold charms, bonded safely with dental-grade adhesive.
            </p>
            <p className="font-body font-light leading-relaxed mb-10" style={{ color: "#6B5A9A", fontSize: "0.95rem" }}>
              No drilling. No pain. Completely reversible. Follow me on Instagram for inspo,
              pricing, and to see satisfied clients ✧
            </p>

            <div className="grid grid-cols-2 gap-3 w-full">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl p-4 text-center glass-solid"
                >
                  <div className="font-display font-semibold text-lg mb-0.5" style={{ color: "#3D2660" }}>
                    {s.value}
                  </div>
                  <div className="font-body text-xs tracking-widest uppercase" style={{ color: "#9B8FD4" }}>
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
                alt="s0mped tooth gem artist"
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
