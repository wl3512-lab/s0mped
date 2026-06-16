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

function PhotoTile({ item }: { item: (typeof photos)[number] }) {
  return (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className="reveal-photo group relative rounded-2xl overflow-hidden aspect-square cursor-pointer hover:scale-[1.03]"
      style={{ transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)" }}
    >
      <Image
        src={item.src}
        alt={item.label}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes="(max-width: 768px) 50vw, 280px"
      />
      <div className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-500 iridescent" />
      <div
        className="absolute bottom-0 left-0 right-0 px-4 py-3 sm:translate-y-full sm:group-hover:translate-y-0 transition-transform duration-300"
        style={{ background: "rgba(26, 15, 46, 0.88)" }}
      >
        <p className="font-body font-semibold text-xs" style={{ color: "#F2EEFF" }}>{item.label}</p>
        <p className="font-body text-xs opacity-60" style={{ color: "#C4B5E8" }}>{item.note}</p>
      </div>
    </a>
  );
}

export default function Gallery() {
  return (
    <section
      id="gallery"
      className="py-28 px-6"
      style={{ background: "#F2EEFF" }}
    >
      <div className="max-w-5xl mx-auto">

        {/* ─── Mobile: photos sandwich the text ─── */}
        <div className="md:hidden">
          <div className="grid grid-cols-2 gap-3 mb-3">
            <PhotoTile item={photos[0]} />
            <PhotoTile item={photos[1]} />
          </div>
          <div className="text-center py-10 px-4">
            <p className="font-body text-xs tracking-widest uppercase mb-3" style={{ color: "#9B8FD4" }}>
              Portfolio
            </p>
            <h2
              className="reveal-heading font-script mb-4"
              style={{ fontSize: "clamp(4rem, 14vw, 7rem)", color: "#3D2660", lineHeight: 1 }}
            >
              work
            </h2>
            <p className="font-body font-light text-sm mb-6" style={{ color: "#6B5A9A" }}>
              Real clients. No filters. Full portfolio on Instagram.
            </p>
            <a
              href="https://www.instagram.com/sompednyc/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-body text-sm font-medium transition-all hover:scale-105"
              style={{ background: "rgba(196,181,232,0.18)", color: "#3D2660", border: "1px solid rgba(196,181,232,0.45)" }}
            >
              @sompednyc →
            </a>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <PhotoTile item={photos[2]} />
            <PhotoTile item={photos[3]} />
          </div>
        </div>

        {/* ─── Desktop: editorial 3-col ─── */}
        <div className="hidden md:grid md:grid-cols-3 gap-4 items-stretch">

          {/* Left column */}
          <div className="flex flex-col gap-4">
            <PhotoTile item={photos[0]} />
            <PhotoTile item={photos[2]} />
          </div>

          {/* Center — text in negative space */}
          <div className="flex flex-col items-center justify-center text-center px-6 py-8">
            <p className="font-body text-xs tracking-widest uppercase mb-4" style={{ color: "#9B8FD4" }}>
              Portfolio
            </p>
            <h2
              className="reveal-heading font-script mb-5"
              style={{ fontSize: "clamp(4.5rem, 10vw, 9.5rem)", color: "#3D2660", lineHeight: 1 }}
            >
              work
            </h2>
            <p
              className="font-body font-light text-sm leading-relaxed mb-8"
              style={{ color: "#6B5A9A" }}
            >
              Real clients. No filters.<br />Full portfolio on Instagram.
            </p>
            <a
              href="https://www.instagram.com/sompednyc/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-body text-sm font-medium transition-all hover:scale-105 hover:opacity-90"
              style={{
                background: "rgba(196,181,232,0.18)",
                color: "#3D2660",
                border: "1px solid rgba(196,181,232,0.45)",
              }}
            >
              <InstagramIcon />
              @sompednyc
            </a>
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-4">
            <PhotoTile item={photos[1]} />
            <PhotoTile item={photos[3]} />
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
