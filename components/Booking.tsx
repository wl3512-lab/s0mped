"use client";

import { useState } from "react";

// Create a free form at formspree.io and paste your endpoint here:
const FORMSPREE_ENDPOINT = "https://formspree.io/f/mjgzgbpg";

export default function Booking() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    instagram: "",
    service: "",
    message: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(false);
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      id="book"
      className="py-28 px-6 relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, #4a3065 0%, #6b4a9a 40%, #9b8fd4 100%)" }}
    >
      {/* Decorative sparkles */}
      <span aria-hidden="true" className="absolute top-12 left-[10%] text-2xl float opacity-30" style={{ color: "#D4C6F0" }}>✧</span>
      <span aria-hidden="true" className="absolute top-1/3 right-[8%] text-xl float twinkle opacity-20" style={{ color: "#C4B5E8", animationDelay: "1s" }}>✧</span>
      <span aria-hidden="true" className="absolute bottom-20 left-[20%] text-lg float opacity-25" style={{ color: "#D4C6F0", animationDelay: "1.5s" }}>✧</span>
      <span aria-hidden="true" className="absolute bottom-1/3 right-[15%] text-3xl float twinkle opacity-15" style={{ color: "#C4B5E8", animationDelay: "0.5s" }}>✧</span>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-14">
          <p
            className="font-body text-xs tracking-widest uppercase mb-3 opacity-70"
            style={{ color: "#D4C6F0" }}
          >
            Book Your Appointment
          </p>
          <h2
            className="reveal-heading font-script mb-4"
            style={{ fontSize: "clamp(3.5rem, 9vw, 6.5rem)", color: "#F2EEFF", lineHeight: 1 }}
          >
            get your gem
          </h2>
          <p
            className="font-body font-light max-w-md mx-auto"
            style={{ color: "rgba(212, 198, 240, 0.85)", fontSize: "0.95rem" }}
          >
            Fill out the form below or DM me on Instagram to book your appointment.
            Mobile services available in NYC.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-10">
          {/* Form */}
          <div className="md:col-span-3">
            {submitted ? (
              <div
                className="rounded-3xl p-10 text-center"
                style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)" }}
              >
                <div aria-hidden="true" className="text-5xl mb-4 float" style={{ color: "#D4C6F0" }}>✧</div>
                <h3
                  className="font-script text-4xl mb-3"
                  style={{ color: "#F2EEFF" }}
                >
                  you&apos;re on the list!
                </h3>
                <p className="font-body font-light" style={{ color: "rgba(212, 198, 240, 0.85)" }}>
                  I&apos;ll reach out via Instagram or email within 24 hours to confirm your appointment.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-3xl p-8 flex flex-col gap-5"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.12)",
                }}
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="name" className="font-body text-xs tracking-wide uppercase" style={{ color: "rgba(212,198,240,0.7)" }}>
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
                      className="rounded-xl px-4 py-3 font-body text-sm transition-all"
                      style={{
                        background: "rgba(255,255,255,0.1)",
                        border: "1px solid rgba(255,255,255,0.15)",
                        color: "#F2EEFF",
                      }}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="font-body text-xs tracking-wide uppercase" style={{ color: "rgba(212,198,240,0.7)" }}>
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="your@email.com"
                      className="rounded-xl px-4 py-3 font-body text-sm transition-all"
                      style={{
                        background: "rgba(255,255,255,0.1)",
                        border: "1px solid rgba(255,255,255,0.15)",
                        color: "#F2EEFF",
                      }}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="instagram" className="font-body text-xs tracking-wide uppercase" style={{ color: "rgba(212,198,240,0.7)" }}>
                    Instagram Handle
                  </label>
                  <input
                    id="instagram"
                    type="text"
                    name="instagram"
                    value={form.instagram}
                    onChange={handleChange}
                    placeholder="@yourhandle"
                    className="rounded-xl px-4 py-3 font-body text-sm transition-all"
                    style={{
                      background: "rgba(255,255,255,0.1)",
                      border: "1px solid rgba(255,255,255,0.15)",
                      color: "#F2EEFF",
                    }}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="service" className="font-body text-xs tracking-wide uppercase" style={{ color: "rgba(212,198,240,0.7)" }}>
                    Service
                  </label>
                  <div className="relative">
                    <select
                      id="service"
                      name="service"
                      value={form.service}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl px-4 py-3 pr-10 font-body text-sm transition-all"
                      style={{
                        background: "rgba(255,255,255,0.12)",
                        border: "1px solid rgba(255,255,255,0.15)",
                        color: form.service ? "#F2EEFF" : "rgba(255,255,255,0.45)",
                      }}
                    >
                      <option value="" disabled>Select a service</option>
                      <option value="single">Single Crystal</option>
                      <option value="star-circle">Star &amp; Circle</option>
                      <option value="crystal-line">Crystal Line</option>
                      <option value="mock-braces">Mock Braces</option>
                      <option value="gold-charm">Gold Charm</option>
                      <option value="freestyle">Freestyle (5–6 crystals · $80)</option>
                      <option value="custom">Custom / Not Sure</option>
                    </select>
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs"
                      style={{ color: "rgba(212,198,240,0.5)" }}
                    >
                      ▾
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className="font-body text-xs tracking-wide uppercase" style={{ color: "rgba(212,198,240,0.7)" }}>
                    Message (optional)
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Inspo, questions, or anything you want me to know..."
                    className="rounded-xl px-4 py-3 font-body text-sm transition-all resize-none"
                    style={{
                      background: "rgba(255,255,255,0.1)",
                      border: "1px solid rgba(255,255,255,0.15)",
                      color: "#F2EEFF",
                    }}
                  />
                </div>

                {error && (
                  <p className="font-body text-xs text-center" style={{ color: "rgba(255,180,180,0.9)" }}>
                    Something went wrong. Try again or DM me on Instagram.
                  </p>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-full py-3.5 font-body font-semibold text-sm tracking-wide transition-all duration-200 hover:scale-105 hover:shadow-2xl mt-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
                  style={{
                    background: "linear-gradient(135deg, #C4B5E8, #8B7AC8)",
                    color: "#4a3065",
                  }}
                >
                  {loading ? "Sending…" : "Request Appointment ✧"}
                </button>
              </form>
            )}
          </div>

          {/* Info sidebar */}
          <div className="md:col-span-2 flex flex-col gap-5">
            {[
              { icon: "✧", title: "Lead-Free Crystals", body: "Swarovski certified, safe for teeth and gums." },
              { icon: "✦", title: "3-Week Warranty", body: "Gems replaced free within 3 weeks if they fall off." },
              { icon: "⬡", title: "Mobile Service", body: "I come to you anywhere in NYC." },
              { icon: "✧", title: "NYU Student Discount", body: "Show your NYU ID for 10% off any service." },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl p-5"
                style={{
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <div className="flex items-start gap-3">
                  <span className="text-lg mt-0.5" style={{ color: "#D4C6F0" }}>{item.icon}</span>
                  <div>
                    <p className="font-body font-semibold text-sm mb-1" style={{ color: "#F2EEFF" }}>
                      {item.title}
                    </p>
                    <p className="font-body font-light text-xs leading-relaxed" style={{ color: "rgba(212,198,240,0.7)" }}>
                      {item.body}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* DM CTA */}
            <a
              href="https://www.instagram.com/s0mped/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl p-5 flex items-center gap-3 transition-all duration-200 hover:scale-[1.02]"
              style={{
                background: "linear-gradient(135deg, rgba(196,181,232,0.2), rgba(139,122,200,0.2))",
                border: "1px solid rgba(196, 181, 232, 0.3)",
              }}
            >
              <InstagramIcon />
              <div>
                <p className="font-body font-semibold text-sm" style={{ color: "#F2EEFF" }}>
                  Prefer to DM?
                </p>
                <p className="font-body font-light text-xs" style={{ color: "rgba(212,198,240,0.7)" }}>
                  Slide into @s0mped on Instagram
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function InstagramIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(212,198,240,0.9)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="rgba(212,198,240,0.9)" />
    </svg>
  );
}
