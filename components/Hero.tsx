import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(160deg, #1A0F2E 0%, #2E1A52 55%, #3D2660 100%)" }}
    >
      {/* Background blobs */}
      <div
        className="absolute top-1/3 -left-40 w-[48rem] h-[48rem] rounded-full opacity-30 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #C4B5E8, transparent)" }}
      />
      <div
        className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full opacity-22 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #9B8FD4, transparent)" }}
      />

      {/* Ambient sparkles */}
      {[
        { top: "12%",  left:  "8%",  size: "2rem",   delay: "0s",   op: 0.45 },
        { top: "22%",  right: "10%", size: "0.85rem",delay: "0.7s", op: 0.32 },
        { top: "55%",  left:  "5%",  size: "1.1rem", delay: "1.4s", op: 0.28 },
        { bottom:"18%",right: "16%", size: "1.4rem", delay: "0.3s", op: 0.38 },
        { top: "42%",  right: "4%",  size: "0.65rem",delay: "1.9s", op: 0.22 },
        { bottom:"32%",left:  "20%", size: "2.6rem", delay: "1s",   op: 0.25 },
      ].map((s, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="absolute float twinkle pointer-events-none select-none"
          style={{ ...s, fontSize: s.size, animationDelay: s.delay, color: "#C4B5E8", opacity: s.op }}
        >
          ✧
        </span>
      ))}

      {/* Content — padded top so it clears the fixed navbar */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 w-full max-w-2xl mx-auto pt-20 pb-16">

        {/* Pill badge */}
        <div
          className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs font-body tracking-widest uppercase mb-10"
          style={{
            background: "rgba(196, 181, 232, 0.12)",
            border: "1px solid rgba(196, 181, 232, 0.32)",
            color: "#C4B5E8",
          }}
        >
          <span aria-hidden="true" className="twinkle text-xs">✧</span>
          Tooth Gem Artist · NYC
          <span aria-hidden="true" className="twinkle text-xs" style={{ animationDelay: "1.1s" }}>✧</span>
        </div>

        {/* Logo */}
        <Image
          src="/somped-vector.svg"
          alt="sompednyc"
          width={520}
          height={180}
          className="w-72 sm:w-88 md:w-[28rem] lg:w-[38rem] xl:w-[44rem] h-auto mb-7"
          style={{ filter: "brightness(0) invert(1)" }}
          priority
          unoptimized
        />

        {/* Body */}
        <p
          className="font-body font-light max-w-md mx-auto mb-12 leading-relaxed"
          style={{ fontSize: "1rem", color: "rgba(196, 181, 232, 0.8)" }}
        >
          Custom Swarovski crystal tooth gems applied safely, painlessly,
          and beautifully. Certified 2024 ✧ Lead-free crystals only.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center w-full max-w-sm mx-auto">
          <a
            href="#book"
            className="w-full sm:w-auto rounded-full px-9 py-4 font-body font-semibold text-sm tracking-wide text-center transition-all duration-200 hover:scale-105 glow"
            style={{
              background: "linear-gradient(135deg, #C4B5E8 0%, #9B8FD4 100%)",
              color: "#1A0F2E",
            }}
          >
            Book Now ✧
          </a>
          <a
            href="https://www.instagram.com/sompednyc/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto rounded-full px-9 py-4 font-body font-medium text-sm tracking-wide text-center transition-all duration-200 hover:scale-105"
            style={{
              background: "rgba(196, 181, 232, 0.08)",
              border: "1px solid rgba(196, 181, 232, 0.25)",
              color: "#C4B5E8",
            }}
          >
            See the work →
          </a>
        </div>
      </div>

      {/* Scroll cue — anchored to bottom */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" style={{ opacity: 0.38 }}>
        <span className="font-body text-[10px] tracking-widest uppercase" style={{ color: "#C4B5E8" }}>
          scroll
        </span>
        <div
          className="w-px h-8 rounded-full"
          style={{ background: "linear-gradient(to bottom, #C4B5E8, transparent)" }}
        />
      </div>
    </section>
  );
}
