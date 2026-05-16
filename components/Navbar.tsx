"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const links = [
  { label: "Gallery", href: "#gallery" },
  { label: "Gems", href: "#in-stock" },
  { label: "Services", href: "#services" },
  { label: "Book", href: "#book" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [onDark, setOnDark] = useState(true);

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

  const textColor = onDark ? "#C4B5E8" : "#3D2660";
  const logoColor = onDark ? "#F2EEFF" : "#3D2660";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        scrolled ? "glass py-3 px-6 shadow-sm" : "bg-transparent py-5 px-6"
      }`}
      style={scrolled ? { borderBottom: "1px solid rgba(196,181,232,0.2)" } : {}}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="flex items-center">
          <Image
            src="/somped-vector.svg"
            alt="s0mped"
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
                href={l.href}
                className="font-body text-xs tracking-widest uppercase transition-opacity duration-200 hover:opacity-60"
                style={{ color: textColor }}
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="https://www.instagram.com/s0mped/"
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
              @s0mped
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
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-display text-xl tracking-widest uppercase block"
                  style={{ color: "#3D2660" }}
                >
                  ✧ {l.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="https://www.instagram.com/s0mped/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-body font-semibold text-xs tracking-wide"
                style={{
                  background: "linear-gradient(135deg, #3D2660, #6B4A9A)",
                  color: "#F2EEFF",
                }}
              >
                <InstagramIcon />
                @s0mped on Instagram
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
