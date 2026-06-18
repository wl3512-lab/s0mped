"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Marquee } from "@/components/ui/marquee";
import { getSupabase } from "@/lib/supabase";

type Review = {
  body: string;
  tag: string | null;
};

// Seed testimonials (real client messages). Shown as a fallback before any
// approved reviews exist in the database, so the section is never empty.
const SEED_REVIEWS: Review[] = [
  {
    body: "The tooth gems have stayed for 2 months now and nothing I do can make them come off — thank u xx",
    tag: "2 months & counting",
  },
  {
    body: "It's been so long already and they still look good 😹 I'll def come for more next time, girly — thank u 🤍",
    tag: "coming back",
  },
  {
    body: "Fitness world worker said he liked my grillz and he was SO so gorgeous, I nearly passed out 🥹",
    tag: "got complimented",
  },
  {
    body: "The huzz love the tooth gems — it's the first thing they compliment me on. And it's been since June! thanks girl 🤣",
    tag: "since June",
  },
];

const POLL_MS = 12_000;
const MAX_LEN = 500;

function ReviewCard({ body, tag }: Review) {
  return (
    <figure
      className="relative mx-2 flex h-full w-72 flex-col justify-between rounded-2xl p-5 sm:w-80"
      style={{
        background: "rgba(196, 181, 232, 0.07)",
        border: "1px solid rgba(196, 181, 232, 0.22)",
      }}
    >
      <blockquote className="font-body text-sm leading-relaxed" style={{ color: "#F2EEFF" }}>
        “{body}”
      </blockquote>
      <figcaption className="mt-4 flex items-center gap-2">
        <span
          aria-hidden="true"
          className="flex h-7 w-7 items-center justify-center rounded-full text-xs"
          style={{ background: "rgba(196, 181, 232, 0.18)", color: "#C4B5E8" }}
        >
          ✦
        </span>
        <span className="flex flex-col">
          <span className="font-body text-xs font-semibold" style={{ color: "#C4B5E8" }}>
            Verified client
          </span>
          {tag ? (
            <span className="font-body text-[11px]" style={{ color: "rgba(196, 181, 232, 0.55)" }}>
              {tag}
            </span>
          ) : null}
        </span>
      </figcaption>
    </figure>
  );
}

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>(SEED_REVIEWS);

  // Form state
  const [body, setBody] = useState("");
  const [tag, setTag] = useState("");
  const [honeypot, setHoneypot] = useState(""); // bots fill this; humans never see it
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const fetchApproved = useCallback(async () => {
    const supabase = getSupabase();
    if (!supabase) return; // not configured yet → keep seeds
    const { data, error } = await supabase
      .from("reviews")
      .select("body, tag")
      .eq("status", "approved")
      .order("created_at", { ascending: false })
      .limit(50);
    if (error || !data || data.length === 0) return; // keep seeds if none yet
    // Show approved submissions AND keep the original curated testimonials.
    setReviews([...(data as Review[]), ...SEED_REVIEWS]);
  }, []);

  // Initial fetch + near-live polling.
  useEffect(() => {
    fetchApproved();
    const id = setInterval(fetchApproved, POLL_MS);
    return () => clearInterval(id);
  }, [fetchApproved]);

  const submittingRef = useRef(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submittingRef.current) return;

    const trimmed = body.trim();
    if (trimmed.length < 3) {
      setStatus("error");
      setErrorMsg("Please write a little more 🤍");
      return;
    }
    // Honeypot: silently accept (and discard) bot submissions.
    if (honeypot) {
      setStatus("ok");
      setBody("");
      setTag("");
      return;
    }

    const supabase = getSupabase();
    if (!supabase) {
      setStatus("error");
      setErrorMsg("Review submissions are being set up — check back soon ✦");
      return;
    }

    submittingRef.current = true;
    setSubmitting(true);
    setStatus("idle");

    const { error } = await supabase
      .from("reviews")
      .insert({ body: trimmed, tag: tag.trim() || null, status: "pending" });

    submittingRef.current = false;
    setSubmitting(false);

    if (error) {
      setStatus("error");
      setErrorMsg("Something went wrong — please try again.");
      return;
    }
    setStatus("ok");
    setBody("");
    setTag("");
  }

  const firstRow = reviews.slice(0, Math.ceil(reviews.length / 2));
  const secondRow = reviews.slice(Math.ceil(reviews.length / 2));

  return (
    <section
      id="reviews"
      aria-label="Client reviews"
      className="relative overflow-hidden py-24 sm:py-28"
      style={{ background: "#1A0F2E" }}
    >
      {/* Header */}
      <div className="mx-auto max-w-3xl px-6 text-center">
        <p className="font-body text-xs tracking-[0.3em] uppercase" style={{ color: "#9B8FD4" }}>
          ✧ Word of mouth
        </p>
        <h2
          className="font-script mt-4"
          style={{ fontSize: "clamp(3rem, 9vw, 6rem)", color: "#F2EEFF", lineHeight: 0.95 }}
        >
          happy clients
        </h2>
        <p
          className="font-display italic mt-1"
          style={{ fontSize: "clamp(1.25rem, 3vw, 2rem)", color: "#C4B5E8" }}
        >
          straight from the DMs
        </p>
      </div>

      {/* Marquee rows */}
      {/* Mobile: swipeable carousel (manual scroll, snap) */}
      <div className="md:hidden mt-12">
        <div
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory px-6 pb-4 [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {reviews.map((review, i) => (
            <div key={`m-${i}`} className="snap-center shrink-0">
              <ReviewCard {...review} />
            </div>
          ))}
        </div>
        <p className="mt-2 text-center font-body text-[11px] tracking-widest uppercase" style={{ color: "rgba(196,181,232,0.45)" }}>
          ← swipe →
        </p>
      </div>

      {/* Desktop: auto-scrolling marquee (pause on hover) */}
      <div className="relative mt-14 hidden flex-col gap-4 md:flex">
        <Marquee pauseOnHover className="[--duration:32s]">
          {firstRow.map((review, i) => (
            <ReviewCard key={`a-${i}`} {...review} />
          ))}
        </Marquee>
        {secondRow.length > 0 ? (
          <Marquee reverse pauseOnHover className="[--duration:32s]">
            {secondRow.map((review, i) => (
              <ReviewCard key={`b-${i}`} {...review} />
            ))}
          </Marquee>
        ) : null}

        {/* Edge fades */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-1/6"
          style={{ background: "linear-gradient(to right, #1A0F2E, transparent)" }}
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-1/6"
          style={{ background: "linear-gradient(to left, #1A0F2E, transparent)" }}
        />
      </div>

      {/* Submission form */}
      <div className="mx-auto mt-16 max-w-md px-6">
        <p className="text-center font-body text-sm" style={{ color: "#C4B5E8" }}>
          Got gems from me? Leave a little review ✦
        </p>
        <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-3">
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            maxLength={MAX_LEN}
            rows={3}
            required
            placeholder="How are your gems holding up? 💎"
            className="w-full resize-none rounded-2xl px-4 py-3 font-body text-sm"
            style={{
              background: "rgba(196, 181, 232, 0.08)",
              border: "1px solid rgba(196, 181, 232, 0.25)",
              color: "#F2EEFF",
            }}
          />
          <input
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            maxLength={60}
            placeholder="Your name (optional)"
            className="w-full rounded-full px-4 py-2.5 font-body text-sm"
            style={{
              background: "rgba(196, 181, 232, 0.08)",
              border: "1px solid rgba(196, 181, 232, 0.25)",
              color: "#F2EEFF",
            }}
          />
          {/* Honeypot — hidden from users, catches bots */}
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            aria-hidden="true"
            style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
          />
          <button
            type="submit"
            disabled={submitting}
            className="rounded-full px-7 py-3 font-body text-sm font-semibold transition-all duration-200 hover:scale-105 disabled:opacity-60 disabled:hover:scale-100"
            style={{
              background: "linear-gradient(135deg, #C4B5E8 0%, #9B8FD4 100%)",
              color: "#1A0F2E",
            }}
          >
            {submitting ? "Sending…" : "Submit review ✦"}
          </button>

          {status === "ok" ? (
            <p className="text-center font-body text-xs" style={{ color: "#C4B5E8" }}>
              Thank you! Your review will appear once it&apos;s approved 💜
            </p>
          ) : null}
          {status === "error" ? (
            <p className="text-center font-body text-xs" style={{ color: "#E8A0B0" }}>
              {errorMsg}
            </p>
          ) : null}
        </form>
      </div>
    </section>
  );
}
