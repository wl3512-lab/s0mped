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
      className="py-16 px-6"
      style={{ background: "#FAF8FF", borderTop: "1px solid rgba(196,181,232,0.18)" }}
    >
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <p
            className="font-body text-[10px] tracking-widest uppercase mb-2"
            style={{ color: "#9B8FD4" }}
          >
            Crystal Wishlist
          </p>
          <h2
            className="font-script mb-2"
            style={{ fontSize: "clamp(2.2rem, 6vw, 3.5rem)", color: "#3D2660", lineHeight: 1.05 }}
          >
            suggest a gem
          </h2>
          <p
            className="font-body font-light text-sm leading-relaxed"
            style={{ color: "#6B5A9A", maxWidth: "38ch" }}
          >
            Don&apos;t see the crystal or shape you want? Let me know — I love hearing what my clients are into.
          </p>
        </div>

        {/* Compact form */}
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl p-6 flex flex-col gap-4"
          style={{
            background: "#F2EEFF",
            border: "1px solid rgba(196,181,232,0.28)",
            boxShadow: "0 2px 12px rgba(61,38,96,0.05)",
          }}
        >
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label htmlFor="sg-name" className="font-body text-[10px] tracking-wide uppercase" style={{ color: "#9B8FD4" }}>
                Name (optional)
              </label>
              <input
                id="sg-name"
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                className="rounded-xl px-3.5 py-2.5 font-body text-sm transition-all"
                style={{ background: "#fff", border: "1px solid rgba(196,181,232,0.3)", color: "#3D2660" }}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="sg-instagram" className="font-body text-[10px] tracking-wide uppercase" style={{ color: "#9B8FD4" }}>
                Instagram (optional)
              </label>
              <input
                id="sg-instagram"
                type="text"
                name="instagram"
                value={form.instagram}
                onChange={handleChange}
                placeholder="@yourhandle"
                className="rounded-xl px-3.5 py-2.5 font-body text-sm transition-all"
                style={{ background: "#fff", border: "1px solid rgba(196,181,232,0.3)", color: "#3D2660" }}
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label htmlFor="sg-crystal" className="font-body text-[10px] tracking-wide uppercase" style={{ color: "#9B8FD4" }}>
                Crystal or Shape ✧
              </label>
              <input
                id="sg-crystal"
                type="text"
                name="crystal"
                value={form.crystal}
                onChange={handleChange}
                required
                placeholder="e.g. heart, moon, pear cut..."
                className="rounded-xl px-3.5 py-2.5 font-body text-sm transition-all"
                style={{ background: "#fff", border: "1px solid rgba(196,181,232,0.3)", color: "#3D2660" }}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="sg-color" className="font-body text-[10px] tracking-wide uppercase" style={{ color: "#9B8FD4" }}>
                Color (optional)
              </label>
              <input
                id="sg-color"
                type="text"
                name="color"
                value={form.color}
                onChange={handleChange}
                placeholder="e.g. blue, rose gold, AB..."
                className="rounded-xl px-3.5 py-2.5 font-body text-sm transition-all"
                style={{ background: "#fff", border: "1px solid rgba(196,181,232,0.3)", color: "#3D2660" }}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="sg-notes" className="font-body text-[10px] tracking-wide uppercase" style={{ color: "#9B8FD4" }}>
              Anything else (optional)
            </label>
            <textarea
              id="sg-notes"
              name="notes"
              value={form.notes}
              onChange={handleChange}
              rows={2}
              placeholder="Inspo, vibe, reference..."
              className="rounded-xl px-3.5 py-2.5 font-body text-sm transition-all resize-none"
              style={{ background: "#fff", border: "1px solid rgba(196,181,232,0.3)", color: "#3D2660" }}
            />
          </div>

          <button
            type="submit"
            className="self-start rounded-full px-7 py-2.5 font-body font-semibold text-xs tracking-wide transition-all duration-200 hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #3D2660, #6B4A9A)",
              color: "#F2EEFF",
            }}
          >
            Send Suggestion ✧
          </button>
        </form>
      </div>
    </section>
  );
}
