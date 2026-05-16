import Image from "next/image";

const photos: { src: string; label: string; note: string; href: string }[] = [
  {
    src: "/ab-crystals.jpg",
    label: "Aurora Borealis half butterfly with pink star",
    note: "scattered Swarovski",
    href: "https://www.instagram.com/p/DXzvxqsD798/?img_index=1",
  },
  {
    src: "/butterfly.png",
    label: "Clear butterfly with clear star",
    note: "custom butterfly gems",
    href: "https://www.instagram.com/p/DAO0guuS4od/?img_index=1",
  },
  {
    src: "/crystal-line.png",
    label: "Crystal Line",
    note: "row placement",
    href: "https://www.instagram.com/p/C93bExYSkMB/?img_index=1",
  },
  {
    src: "/purple-circle-star.png",
    label: "Freestyle",
    note: "5–6 crystals · $80",
    href: "https://www.instagram.com/p/DE-ri13Sg_2/",
  },
];

export default function Gallery() {
  return (
    <section
      id="gallery"
      className="py-28 px-6"
      style={{ background: "#F2EEFF" }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="font-body text-xs tracking-widest uppercase mb-3" style={{ color: "#9B8FD4" }}>
            Portfolio
          </p>
          <h2
            className="font-script mb-4"
            style={{ fontSize: "clamp(2.8rem, 7vw, 5rem)", color: "#3D2660", lineHeight: 1 }}
          >
            sparkle gallery
          </h2>
          <p className="font-body font-light max-w-xs mx-auto" style={{ color: "#6B5A9A", fontSize: "0.9rem" }}>
            Real clients. No filters. Full portfolio on Instagram.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">

          {/* Real photos */}
          {photos.map((item, i) => (
            <a
              key={i}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-2xl overflow-hidden aspect-square cursor-pointer transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl"
            >
              <Image
                src={item.src}
                alt={item.label}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 280px"
              />

              {/* Iridescent catch-light on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-500 iridescent" />

              {/* Label bar — always visible on mobile, revealed on hover on desktop */}
              <div
                className="absolute bottom-0 left-0 right-0 px-4 py-3 sm:translate-y-full sm:group-hover:translate-y-0 transition-transform duration-300"
                style={{ background: "rgba(26, 15, 46, 0.88)" }}
              >
                <p className="font-body font-semibold text-xs" style={{ color: "#F2EEFF" }}>{item.label}</p>
                <p className="font-body text-xs opacity-60" style={{ color: "#C4B5E8" }}>{item.note}</p>
              </div>
            </a>
          ))}

          {/* Slot 5 — Book CTA tile */}
          <a
            href="#book"
            className="group relative rounded-2xl overflow-hidden aspect-square flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:scale-[1.03] hover:shadow-xl"
            style={{
              background: "linear-gradient(145deg, #3D2660 0%, #6B4A9A 60%, #9B8FD4 100%)",
            }}
          >
            <span
              className="text-4xl mb-3 float"
              style={{ color: "rgba(242, 238, 255, 0.8)" }}
            >
              ✧
            </span>
            <p className="font-display font-semibold text-base" style={{ color: "#F2EEFF" }}>Book Your Look</p>
            <p className="font-body text-xs mt-1" style={{ color: "rgba(196,181,232,0.7)" }}>get your gem →</p>
          </a>

          {/* Slot 6 — Instagram CTA tile */}
          <a
            href="https://www.instagram.com/s0mped/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative rounded-2xl overflow-hidden aspect-square flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:scale-[1.03] hover:shadow-xl glass-solid"
            style={{ border: "1px solid rgba(196,181,232,0.35)" }}
          >
            <InstagramIcon />
            <p className="font-body font-semibold text-sm mt-3" style={{ color: "#3D2660" }}>@s0mped</p>
            <p className="font-body text-xs mt-1" style={{ color: "#9B8FD4" }}>see more work</p>
          </a>
        </div>
      </div>
    </section>
  );
}

function InstagramIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#9B8FD4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="#9B8FD4" stroke="none" />
    </svg>
  );
}
