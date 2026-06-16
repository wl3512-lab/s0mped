import Image from "next/image";

export default function Footer() {
  return (
    <footer
      className="py-16 px-6 relative overflow-hidden"
      style={{ background: "#1A0F2E" }}
    >
      {/* Subtle bg glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-1/2 opacity-15 blur-3xl"
        style={{ background: "radial-gradient(ellipse, #C4B5E8, transparent)" }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <Image
              src="/somped-vector.svg"
              alt="sompednyc"
              width={160}
              height={64}
              className="h-12 w-auto mb-3"
              style={{ filter: "brightness(0) invert(1)", opacity: 0.75 }}
              unoptimized
            />
            <p
              className="font-body font-light text-sm leading-relaxed mb-5"
              style={{ color: "rgba(196, 181, 232, 0.6)" }}
            >
              Luxury tooth gems applied safely and beautifully. Certified ✧ 2024.
            </p>
            <a
              href="https://www.instagram.com/sompednyc/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-body font-medium transition-opacity hover:opacity-80"
              style={{ color: "#C4B5E8" }}
            >
              <InstagramIcon />
              @sompednyc
            </a>
          </div>

          {/* Nav */}
          <div>
            <p
              className="font-body text-xs tracking-widest uppercase mb-5"
              style={{ color: "rgba(196, 181, 232, 0.4)" }}
            >
              Navigate
            </p>
            <ul className="flex flex-col gap-3">
              {[
                { label: "Gallery", href: "#gallery" },
                { label: "Services", href: "#services" },
                { label: "FAQ", href: "#faq" },
                { label: "Aftercare", href: "#aftercare" },
                { label: "Book", href: "#book" },
                { label: "About", href: "/about" },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="font-body text-sm transition-opacity hover:opacity-80"
                    style={{ color: "rgba(196, 181, 232, 0.7)" }}
                  >
                    ✧ {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <p
              className="font-body text-xs tracking-widest uppercase mb-5"
              style={{ color: "rgba(196, 181, 232, 0.4)" }}
            >
              Details
            </p>
            <ul className="flex flex-col gap-3">
              {[
                "NYC ✧ Mobile Service",
                "Lead-Free Swarovski Crystals",
                "3-Week Warranty",
                "NYU Student 10% Off",
                "Lasts 3–12+ Months",
              ].map((item) => (
                <li
                  key={item}
                  className="font-body text-sm"
                  style={{ color: "rgba(196, 181, 232, 0.6)" }}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-body"
          style={{
            borderTop: "1px solid rgba(196, 181, 232, 0.12)",
            color: "rgba(196, 181, 232, 0.55)",
          }}
        >
          <span>© {new Date().getFullYear()} sompednyc. All rights reserved.</span>
          <span aria-hidden="true" className="font-script text-xl" style={{ color: "rgba(196, 181, 232, 0.2)" }}>
            ✧
          </span>
          <span>luxury gems, applied with care</span>
        </div>
      </div>
    </footer>
  );
}

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  );
}
