"use client";

import { useState } from "react";

const CONTACT_EMAIL = "wl3512@nyu.edu";

export default function GemSuggestion() {
  const [form, setForm] = useState({
    name: "",
    instagram: "",
    crystal: "",
    color: "",
    notes: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent("Gem Suggestion");
    const lines = [
      form.name ? `From: ${form.name}` : null,
      form.instagram ? `Instagram: ${form.instagram}` : null,
      `Crystal / Shape: ${form.crystal}`,
      form.color ? `Color: ${form.color}` : null,
      form.notes ? `\nNotes:\n${form.notes}` : null,
    ]
      .filter(Boolean)
      .join("\n");
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${encodeURIComponent(lines)}`;
  }

  return (
    <section
      id="suggest"
      className="py-28 px-6 relative overflow-hidden"
      style={{ background: "#FAF8FF" }}
    >
      {/* Subtle atmosphere */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 80% 10%, rgba(196,181,232,0.18) 0%, transparent 55%), radial-gradient(ellipse at 10% 90%, rgba(155,143,212,0.12) 0%, transparent 50%)",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <p
            className="font-body text-xs tracking-widest uppercase mb-3"
            style={{ color: "#9B8FD4" }}
          >
            Crystal Wishlist
          </p>
          <h2
            className="reveal-heading font-script mb-4"
            style={{
              fontSize: "clamp(4rem, 11vw, 8rem)",
              color: "#3D2660",
              lineHeight: 1,
            }}
          >
            suggest a gem
          </h2>
          <p
            className="font-body font-light max-w-md mx-auto leading-relaxed"
            style={{ fontSize: "0.95rem", color: "#6B5A9A" }}
          >
            Don&apos;t see the crystal or shape you&apos;re looking for? Let me
            know — I&apos;m always sourcing new gems and love hearing what my
            clients want.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-10 items-start">
          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="md:col-span-3 rounded-3xl p-8 flex flex-col gap-5"
            style={{
              background: "#F2EEFF",
              border: "1px solid rgba(196,181,232,0.3)",
              boxShadow: "0 2px 16px rgba(61,38,96,0.06)",
            }}
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="sg-name"
                  className="font-body text-xs tracking-wide uppercase"
                  style={{ color: "#9B8FD4" }}
                >
                  Name (optional)
                </label>
                <input
                  id="sg-name"
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="rounded-xl px-4 py-3 font-body text-sm transition-all"
                  style={{
                    background: "#fff",
                    border: "1px solid rgba(196,181,232,0.35)",
                    color: "#3D2660",
                  }}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="sg-instagram"
                  className="font-body text-xs tracking-wide uppercase"
                  style={{ color: "#9B8FD4" }}
                >
                  Instagram (optional)
                </label>
                <input
                  id="sg-instagram"
                  type="text"
                  name="instagram"
                  value={form.instagram}
                  onChange={handleChange}
                  placeholder="@yourhandle"
                  className="rounded-xl px-4 py-3 font-body text-sm transition-all"
                  style={{
                    background: "#fff",
                    border: "1px solid rgba(196,181,232,0.35)",
                    color: "#3D2660",
                  }}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="sg-crystal"
                className="font-body text-xs tracking-wide uppercase"
                style={{ color: "#9B8FD4" }}
              >
                Crystal or Shape <span style={{ color: "#C4B5E8" }}>✧</span>
              </label>
              <input
                id="sg-crystal"
                type="text"
                name="crystal"
                value={form.crystal}
                onChange={handleChange}
                required
                placeholder="e.g. heart shape, moon, pear cut, marquise..."
                className="rounded-xl px-4 py-3 font-body text-sm transition-all"
                style={{
                  background: "#fff",
                  border: "1px solid rgba(196,181,232,0.35)",
                  color: "#3D2660",
                }}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="sg-color"
                className="font-body text-xs tracking-wide uppercase"
                style={{ color: "#9B8FD4" }}
              >
                Color Preference (optional)
              </label>
              <input
                id="sg-color"
                type="text"
                name="color"
                value={form.color}
                onChange={handleChange}
                placeholder="e.g. blue, rose gold, iridescent, clear..."
                className="rounded-xl px-4 py-3 font-body text-sm transition-all"
                style={{
                  background: "#fff",
                  border: "1px solid rgba(196,181,232,0.35)",
                  color: "#3D2660",
                }}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="sg-notes"
                className="font-body text-xs tracking-wide uppercase"
                style={{ color: "#9B8FD4" }}
              >
                Anything else (optional)
              </label>
              <textarea
                id="sg-notes"
                name="notes"
                value={form.notes}
                onChange={handleChange}
                rows={3}
                placeholder="Inspo pics, vibe, or any other details..."
                className="rounded-xl px-4 py-3 font-body text-sm transition-all resize-none"
                style={{
                  background: "#fff",
                  border: "1px solid rgba(196,181,232,0.35)",
                  color: "#3D2660",
                }}
              />
            </div>

            <button
              type="submit"
              className="rounded-full py-4 font-body font-semibold text-sm tracking-wide transition-all duration-200 hover:scale-105 mt-1"
              style={{
                background: "linear-gradient(135deg, #3D2660, #6B4A9A)",
                color: "#F2EEFF",
              }}
            >
              Send Suggestion ✧
            </button>
          </form>

          {/* Side note */}
          <div className="md:col-span-2 flex flex-col gap-5 pt-2">
            {[
              {
                icon: "✧",
                title: "No commitment",
                body: "Suggesting a gem doesn't book an appointment — it just lets me know what you're looking for.",
              },
              {
                icon: "✦",
                title: "I source regularly",
                body: "If enough clients ask for the same thing, I'll add it to my inventory. Your suggestion actually matters.",
              },
              {
                icon: "⬡",
                title: "Custom is always an option",
                body: "If you have something very specific in mind, DM me on Instagram and we can figure it out together.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl p-5"
                style={{
                  background: "#F2EEFF",
                  border: "1px solid rgba(196,181,232,0.25)",
                }}
              >
                <div className="flex items-start gap-3">
                  <span
                    className="text-base mt-0.5 shrink-0"
                    style={{ color: "#9B8FD4" }}
                  >
                    {item.icon}
                  </span>
                  <div>
                    <p
                      className="font-body font-semibold text-sm mb-1"
                      style={{ color: "#3D2660" }}
                    >
                      {item.title}
                    </p>
                    <p
                      className="font-body font-light text-xs leading-relaxed"
                      style={{ color: "#6B5A9A" }}
                    >
                      {item.body}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
