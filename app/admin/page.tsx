"use client";

import { useCallback, useEffect, useState } from "react";

type Review = {
  id: string;
  body: string;
  tag: string | null;
  status: "pending" | "approved" | "rejected";
  created_at: string;
};

const STATUS_COLOR: Record<Review["status"], string> = {
  pending: "#E8C56B",
  approved: "#8FD4A8",
  rejected: "#E8A0B0",
};

export default function AdminPage() {
  const [authed, setAuthed] = useState<boolean | null>(null); // null = checking
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/reviews", { cache: "no-store" });
    setLoading(false);
    if (res.status === 401) {
      setAuthed(false);
      return;
    }
    if (res.ok) {
      const json = await res.json();
      setReviews(json.reviews ?? []);
      setAuthed(true);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      setPassword("");
      await load();
    } else {
      setLoginError("Incorrect password");
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthed(false);
    setReviews([]);
  }

  async function setStatus(id: string, status: Review["status"]) {
    setBusyId(id);
    await fetch("/api/admin/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    await load();
    setBusyId(null);
  }

  async function remove(id: string) {
    if (!confirm("Delete this review permanently?")) return;
    setBusyId(id);
    await fetch("/api/admin/reviews", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    await load();
    setBusyId(null);
  }

  const pageStyle: React.CSSProperties = {
    minHeight: "100vh",
    background: "#1A0F2E",
    color: "#F2EEFF",
    padding: "24px 16px",
  };

  // ── Checking session ──
  if (authed === null) {
    return (
      <main style={pageStyle}>
        <p style={{ textAlign: "center", opacity: 0.6 }}>Loading…</p>
      </main>
    );
  }

  // ── Login ──
  if (!authed) {
    return (
      <main style={pageStyle}>
        <div style={{ maxWidth: 360, margin: "12vh auto 0" }}>
          <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 8 }}>Reviews admin</h1>
          <p style={{ opacity: 0.6, fontSize: 14, marginBottom: 20 }}>
            Enter the admin password to moderate reviews.
          </p>
          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              autoFocus
              style={{
                padding: "12px 16px",
                borderRadius: 12,
                background: "rgba(196,181,232,0.08)",
                border: "1px solid rgba(196,181,232,0.25)",
                color: "#F2EEFF",
                fontSize: 16,
              }}
            />
            <button
              type="submit"
              style={{
                padding: "12px 16px",
                borderRadius: 999,
                background: "linear-gradient(135deg, #C4B5E8 0%, #9B8FD4 100%)",
                color: "#1A0F2E",
                fontWeight: 600,
                border: "none",
                fontSize: 15,
              }}
            >
              Log in
            </button>
            {loginError ? (
              <p style={{ color: "#E8A0B0", fontSize: 13, textAlign: "center" }}>{loginError}</p>
            ) : null}
          </form>
        </div>
      </main>
    );
  }

  // ── Moderation list ──
  const pending = reviews.filter((r) => r.status === "pending");
  const others = reviews.filter((r) => r.status !== "pending");

  return (
    <main style={pageStyle}>
      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h1 style={{ fontSize: 22, fontWeight: 600 }}>Reviews</h1>
          <button
            onClick={handleLogout}
            style={{
              fontSize: 13,
              padding: "6px 14px",
              borderRadius: 999,
              background: "rgba(196,181,232,0.1)",
              border: "1px solid rgba(196,181,232,0.25)",
              color: "#C4B5E8",
            }}
          >
            Log out
          </button>
        </div>

        <button
          onClick={load}
          disabled={loading}
          style={{
            fontSize: 13,
            padding: "6px 14px",
            borderRadius: 999,
            background: "rgba(196,181,232,0.1)",
            border: "1px solid rgba(196,181,232,0.25)",
            color: "#C4B5E8",
            marginBottom: 20,
          }}
        >
          {loading ? "Refreshing…" : "Refresh"}
        </button>

        <Section title={`Pending (${pending.length})`}>
          {pending.length === 0 ? (
            <p style={{ opacity: 0.5, fontSize: 14 }}>Nothing waiting. 🎉</p>
          ) : (
            pending.map((r) => (
              <ReviewItem key={r.id} r={r} busy={busyId === r.id} onSetStatus={setStatus} onRemove={remove} />
            ))
          )}
        </Section>

        <Section title={`Approved & past (${others.length})`}>
          {others.length === 0 ? (
            <p style={{ opacity: 0.5, fontSize: 14 }}>None yet.</p>
          ) : (
            others.map((r) => (
              <ReviewItem key={r.id} r={r} busy={busyId === r.id} onSetStatus={setStatus} onRemove={remove} />
            ))
          )}
        </Section>
      </div>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 28 }}>
      <h2 style={{ fontSize: 13, textTransform: "uppercase", letterSpacing: "0.15em", opacity: 0.6, marginBottom: 12 }}>
        {title}
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>{children}</div>
    </section>
  );
}

function ReviewItem({
  r,
  busy,
  onSetStatus,
  onRemove,
}: {
  r: Review;
  busy: boolean;
  onSetStatus: (id: string, status: Review["status"]) => void;
  onRemove: (id: string) => void;
}) {
  const btn: React.CSSProperties = {
    fontSize: 13,
    padding: "7px 14px",
    borderRadius: 999,
    border: "1px solid rgba(196,181,232,0.25)",
    background: "rgba(196,181,232,0.08)",
    color: "#F2EEFF",
    opacity: busy ? 0.5 : 1,
  };
  return (
    <div
      style={{
        borderRadius: 16,
        padding: 16,
        background: "rgba(196,181,232,0.06)",
        border: "1px solid rgba(196,181,232,0.18)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
        <span style={{ fontSize: 11, fontWeight: 600, color: STATUS_COLOR[r.status], textTransform: "uppercase", letterSpacing: "0.1em" }}>
          {r.status}
        </span>
        <span style={{ fontSize: 11, opacity: 0.4 }}>{new Date(r.created_at).toLocaleDateString()}</span>
      </div>
      <p style={{ marginTop: 10, fontSize: 15, lineHeight: 1.5 }}>“{r.body}”</p>
      {r.tag ? <p style={{ marginTop: 6, fontSize: 13, opacity: 0.6 }}>— {r.tag}</p> : null}

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 14 }}>
        {r.status !== "approved" ? (
          <button style={{ ...btn, borderColor: "#8FD4A8", color: "#8FD4A8" }} disabled={busy} onClick={() => onSetStatus(r.id, "approved")}>
            ✓ Approve
          </button>
        ) : (
          <button style={btn} disabled={busy} onClick={() => onSetStatus(r.id, "pending")}>
            Unpublish
          </button>
        )}
        {r.status !== "rejected" ? (
          <button style={{ ...btn, borderColor: "#E8A0B0", color: "#E8A0B0" }} disabled={busy} onClick={() => onSetStatus(r.id, "rejected")}>
            Reject
          </button>
        ) : null}
        <button style={{ ...btn, opacity: busy ? 0.5 : 0.7 }} disabled={busy} onClick={() => onRemove(r.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}
