import { useState } from "react";

const TABS = ["Overview", "Rides", "Packing", "Budget", "Weather", "Contacts"];

export default function ValleyfairPlanner() {
  const [tab, setTab] = useState(0);

  return (
    <div style={{ position: "relative", minHeight: "100vh", zIndex: 1 }}>
      {/* Header */}
      <div style={{
        textAlign: "center", padding: "40px 20px 20px",
        background: "linear-gradient(180deg, rgba(167,139,250,0.12) 0%, transparent 100%)",
      }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-0.02em" }}>
          🎢 Valleyfair Day Trip
        </h1>
        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", marginTop: 6 }}>
          Jacob & Taylor — Shakopee, MN
        </p>
      </div>

      {/* Tab bar */}
      <div className="no-print" style={{
        display: "flex", gap: 6, padding: "12px 16px", overflowX: "auto",
        position: "sticky", top: 0, zIndex: 10, background: "rgba(15,10,26,0.95)",
        backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}>
        {TABS.map((t, i) => (
          <button key={t} onClick={() => setTab(i)} style={{
            padding: "8px 16px", borderRadius: 99, border: "none", cursor: "pointer",
            fontSize: 13, fontWeight: 600, fontFamily: "inherit", whiteSpace: "nowrap",
            background: tab === i ? "linear-gradient(135deg, #a78bfa, #6366f1)" : "rgba(255,255,255,0.06)",
            color: tab === i ? "#fff" : "rgba(255,255,255,0.5)",
            transition: "all 0.2s",
          }}>{t}</button>
        ))}
      </div>

      {/* Tab content */}
      <div style={{ padding: "16px", maxWidth: 640, margin: "0 auto" }}>
        {tab === 0 && (
          <div style={{ animation: "slideUp 0.3s ease" }}>
            <Card title="🎢 Trip Details">
              <InfoRow label="Destination" value="Valleyfair — 1 Valleyfair Drive, Shakopee, MN 55379" />
              <InfoRow label="Who" value="Jacob & Taylor" />
              <InfoRow label="When" value="TBD — waiting for nice weather" />
              <InfoRow label="Drive" value="~35 min from Coon Rapids" />
            </Card>
            <Card title="📝 To Do">
              <div style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.8 }}>
                This planner is ready to be built out! Start a conversation in this repo to add rides, packing lists, budget tracking, weather checks, and more.
              </div>
            </Card>
          </div>
        )}

        {tab === 1 && (
          <div style={{ animation: "slideUp 0.3s ease" }}>
            <Card title="🎢 Rides">
              <div style={{ fontSize: 14, color: "rgba(255,255,255,0.5)" }}>Ride list coming soon</div>
            </Card>
          </div>
        )}

        {tab === 2 && (
          <div style={{ animation: "slideUp 0.3s ease" }}>
            <Card title="🎒 Packing List">
              <div style={{ fontSize: 14, color: "rgba(255,255,255,0.5)" }}>Packing checklist coming soon</div>
            </Card>
          </div>
        )}

        {tab === 3 && (
          <div style={{ animation: "slideUp 0.3s ease" }}>
            <Card title="💰 Budget">
              <div style={{ fontSize: 14, color: "rgba(255,255,255,0.5)" }}>Budget tracker coming soon</div>
            </Card>
          </div>
        )}

        {tab === 4 && (
          <div style={{ animation: "slideUp 0.3s ease" }}>
            <Card title="🌤️ Weather">
              <div style={{ fontSize: 14, color: "rgba(255,255,255,0.5)" }}>Weather forecast coming soon</div>
            </Card>
          </div>
        )}

        {tab === 5 && (
          <div style={{ animation: "slideUp 0.3s ease" }}>
            <Card title="👤 Jacob">
              <InfoRow label="Phone" value="763-291-8151" />
              <InfoRow label="Email" value="smikahopkins@gmail.com" />
              <InfoRow label="Emergency contact" value="Finley Hopkins — 763-377-3444" />
            </Card>
            <Card title="👤 Taylor">
              <div style={{ fontSize: 14, color: "rgba(255,255,255,0.5)" }}>Contact info can be added here</div>
            </Card>
            <Card title="🎢 Valleyfair">
              <InfoRow label="Address" value="1 Valleyfair Drive, Shakopee, MN 55379" />
              <InfoRow label="Phone" value="952-445-6500" />
              <InfoRow label="Website" value="valleyfair.com" />
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}

function Card({ title, children }) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.04)", borderRadius: 16,
      border: "1px solid rgba(255,255,255,0.07)", padding: 20, marginBottom: 16,
    }}>
      {title && <h3 style={{ fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 14, letterSpacing: "-0.01em" }}>{title}</h3>}
      {children}
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.05)", fontSize: 14, gap: 16 }}>
      <span style={{ color: "rgba(255,255,255,0.45)", flexShrink: 0 }}>{label}</span>
      <span style={{ color: "#e2e8f0", textAlign: "right" }}>{value}</span>
    </div>
  );
}
