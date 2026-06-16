"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

const links = [
  { label: "Gallery", href: "#gallery" },
  { label: "Gems", href: "#in-stock" },
  { label: "Services", href: "#services" },
  { label: "About", href: "/about" },
  { label: "Book", href: "#book" },
];

const careLinks = [
  { label: "FAQ", href: "#faq" },
  { label: "Aftercare", href: "#aftercare" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [careOpen, setCareOpen] = useState(false);
  const [onDark, setOnDark] = useState(true);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const careRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    function update() {
      const y = window.scrollY;
      setScrolled(y > 20);
      const heroH = window.innerHeight;
      setOnDark(y < heroH * 0.8);
    }
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (careRef.current && !careRef.current.contains(e.target as Node)) {
        setCareOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const textColor = onDark ? "#C4B5E8" : "#3D2660";

  function resolveHref(href: string) {
    return !isHome && href.startsWith("#") ? `/${href}` : href;
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        scrolled ? "glass py-3 px-6 shadow-sm" : "bg-transparent py-5 px-6"
      }`}
      style={scrolled ? { borderBottom: "1px solid rgba(196,181,232,0.2)" } : {}}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center">
          <Image
            src="/somped-vector.svg"
            alt="sompednyc"
            width={120}
            height={48}
            className="h-10 w-auto transition-all duration-300"
            style={{ filter: onDark ? "brightness(0) invert(1)" : "none" }}
            priority
            unoptimized
          />
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={resolveHref(l.href)}
                className="font-body text-xs tracking-widest uppercase transition-opacity duration-200 hover:opacity-60"
                style={{ color: textColor }}
              >
                {l.label}
              </a>
            </li>
          ))}

          {/* Suggest modal trigger */}
          <li>
            <button
              onClick={() => window.dispatchEvent(new CustomEvent("open-gem-suggestion"))}
              className="font-body text-xs tracking-widest uppercase transition-opacity duration-200 hover:opacity-60"
              style={{ color: textColor, background: "none", border: "none", cursor: "pointer", padding: 0 }}
            >
              Suggest
            </button>
          </li>

          {/* Care dropdown */}
          <li ref={careRef} className="relative">
            <button
              onClick={() => setCareOpen((o) => !o)}
              aria-expanded={careOpen}
              aria-haspopup="true"
              className="flex items-center gap-1 font-body text-xs tracking-widest uppercase transition-opacity duration-200 hover:opacity-60"
              style={{ color: textColor, background: "none", border: "none", cursor: "pointer" }}
            >
              Care
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                style={{
                  transition: "transform 0.2s",
                  transform: careOpen ? "rotate(180deg)" : "rotate(0deg)",
                }}
              >
                <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {careOpen && (
              <div
                className="absolute top-full right-0 mt-3 rounded-2xl py-2 min-w-[160px] shadow-lg"
                style={{
                  background: onDark ? "rgba(26,15,46,0.92)" : "rgba(242,238,255,0.96)",
                  border: "1px solid rgba(196,181,232,0.2)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                }}
              >
                {careLinks.map((cl) => (
                  <a
                    key={cl.href}
                    href={resolveHref(cl.href)}
                    onClick={() => setCareOpen(false)}
                    className="flex items-center gap-2 px-4 py-2.5 font-body text-xs tracking-widest uppercase transition-opacity hover:opacity-60"
                    style={{ color: onDark ? "#C4B5E8" : "#3D2660" }}
                  >
                    <span aria-hidden="true" style={{ fontSize: "0.6rem", opacity: 0.6 }}>✧</span>
                    {cl.label}
                  </a>
                ))}
              </div>
            )}
          </li>

          <li>
            <a
              href="https://www.instagram.com/sompednyc/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full px-5 py-2 text-xs font-body font-semibold tracking-wide transition-all duration-200 hover:scale-105 hover:shadow-lg"
              style={{
                background: onDark
                  ? "rgba(196,181,232,0.15)"
                  : "linear-gradient(135deg, #3D2660, #6B4A9A)",
                border: onDark ? "1px solid rgba(196,181,232,0.3)" : "none",
                color: onDark ? "#C4B5E8" : "#F2EEFF",
              }}
            >
              <InstagramIcon />
              @sompednyc
            </a>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-[6px] p-3 min-h-[44px] min-w-[44px] items-center justify-center"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          {[0, 1, 2].map((n) => (
            <span
              key={n}
              className="block h-[1.5px] w-6 rounded-full transition-all duration-300"
              style={{
                background: textColor,
                ...(menuOpen && n === 0 ? { transform: "rotate(45deg) translate(4px, 5px)" } : {}),
                ...(menuOpen && n === 1 ? { opacity: 0 } : {}),
                ...(menuOpen && n === 2 ? { transform: "rotate(-45deg) translate(4px, -5px)" } : {}),
              }}
            />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div id="mobile-menu" className="md:hidden glass mt-3 mx-2 rounded-2xl p-6">
          <ul className="flex flex-col gap-5">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={resolveHref(l.href)}
                  onClick={() => setMenuOpen(false)}
                  className="font-display text-xl tracking-widest uppercase block"
                  style={{ color: "#3D2660" }}
                >
                  ✧ {l.label}
                </a>
              </li>
            ))}

            {/* Suggest modal trigger */}
            <li>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  window.dispatchEvent(new CustomEvent("open-gem-suggestion"));
                }}
                className="font-display text-xl tracking-widest uppercase block"
                style={{ color: "#3D2660", background: "none", border: "none", cursor: "pointer", padding: 0 }}
              >
                ✧ Suggest
              </button>
            </li>

            {/* Care sub-links inline in mobile */}
            <li>
              <p className="font-body text-[10px] tracking-widest uppercase mb-3" style={{ color: "rgba(61,38,96,0.45)" }}>
                Care
              </p>
              <div className="flex flex-col gap-3 pl-1">
                {careLinks.map((cl) => (
                  <a
                    key={cl.href}
                    href={resolveHref(cl.href)}
                    onClick={() => setMenuOpen(false)}
                    className="font-display text-xl tracking-widest uppercase block"
                    style={{ color: "#3D2660" }}
                  >
                    ✧ {cl.label}
                  </a>
                ))}
              </div>
            </li>

            <li>
              <a
                href="https://www.instagram.com/sompednyc/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-body font-semibold text-xs tracking-wide"
                style={{
                  background: "linear-gradient(135deg, #3D2660, #6B4A9A)",
                  color: "#F2EEFF",
                }}
              >
                <InstagramIcon />
                @sompednyc on Instagram
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
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
