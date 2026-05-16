"use client";
import { useState } from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from "lucide-react";

const OFFICES = [
  {
    city: "Nairobi",
    flag: "🇰🇪",
    address: "Upper Hill, Nairobi, Kenya",
    phone: "+254 700 000 000",
    email: "nairobi@apexveritas.com",
    hours: "Mon–Fri, 8:00 AM – 5:00 PM EAT",
  },
  {
    city: "Dubai",
    flag: "🇦🇪",
    address: "Business Bay, Dubai, UAE",
    phone: "+971 4 000 0000",
    email: "dubai@apexveritas.com",
    hours: "Sun–Thu, 8:00 AM – 5:00 PM GST",
  },
];

const TOPICS = [
  "General enquiry",
  "Sales / pricing",
  "Technical support",
  "Partnership",
  "Media / press",
];

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", company: "", topic: "", message: "" });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // In production, call an API route to send email
    setSent(true);
  }

  return (
    <div style={{ paddingTop: 80 }}>
      {/* Hero */}
      <section className="section-responsive" style={{ background: "#1B2A4A" }}>
        <div className="container-xl" style={{ textAlign: "center" }}>
          <span style={{
            display: "inline-flex", alignItems: "center", padding: "4px 14px", marginBottom: 20,
            fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em",
            background: "rgba(76,175,80,0.12)", color: "#66BB6A", borderLeft: "3px solid #2E7D32",
          }}>Contact</span>
          <h1 style={{ fontSize: "clamp(2rem,4vw,3.2rem)", fontWeight: 900, color: "#fff", marginBottom: 16, letterSpacing: "-0.02em" }}>
            Let&apos;s talk HSEQ.
          </h1>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.6)", maxWidth: 500, margin: "0 auto" }}>
            Whether you need a demo, pricing details, or just want advice — our consultants are available.
          </p>
        </div>
      </section>

      {/* Main */}
      <section className="section-responsive" style={{ background: "#F5F7FA" }}>
        <div className="container-xl">
          <div className="flex flex-col gap-0.5 overflow-hidden lg:grid lg:grid-cols-[1fr_1.4fr]" style={{ background: "rgba(27,42,74,0.06)" }}>

            {/* Left: Offices */}
            <div style={{ display: "flex", flexDirection: "column", gap: 2, background: "rgba(27,42,74,0.06)" }}>
              {OFFICES.map((o) => (
                <div key={o.city} style={{ background: "#fff", padding: 32 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20, paddingBottom: 16, borderBottom: "2px solid #2E7D32" }}>
                    <span style={{ fontSize: 24 }}>{o.flag}</span>
                    <span style={{ fontSize: 18, fontWeight: 800, color: "#1B2A4A" }}>{o.city}</span>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                      <MapPin style={{ width: 15, height: 15, color: "#2E7D32", marginTop: 2, flexShrink: 0 }} />
                      <span style={{ fontSize: 13, color: "#374151" }}>{o.address}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <Phone style={{ width: 15, height: 15, color: "#2E7D32", flexShrink: 0 }} />
                      <a href={`tel:${o.phone.replace(/\s/g, "")}`} style={{ fontSize: 13, color: "#374151", textDecoration: "none" }}>{o.phone}</a>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <Mail style={{ width: 15, height: 15, color: "#2E7D32", flexShrink: 0 }} />
                      <a href={`mailto:${o.email}`} style={{ fontSize: 13, color: "#2E7D32", textDecoration: "none" }}>{o.email}</a>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <Clock style={{ width: 15, height: 15, color: "#9CA3AF", flexShrink: 0 }} />
                      <span style={{ fontSize: 12, color: "#9CA3AF" }}>{o.hours}</span>
                    </div>
                  </div>
                </div>
              ))}

              {/* Quick CTA */}
              <div style={{ background: "#2E7D32", padding: 28 }}>
                <p style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 8 }}>Prefer a demo?</p>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", marginBottom: 16 }}>Book a 30-minute walkthrough of the platform with one of our consultants.</p>
                <Link href="/register" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 700, color: "#fff", background: "rgba(255,255,255,0.15)", padding: "10px 18px", textDecoration: "none", border: "1px solid rgba(255,255,255,0.3)" }}>
                  Book a Demo
                </Link>
              </div>
            </div>

            {/* Right: Form */}
            <div style={{ background: "#fff", padding: 40 }}>
              {sent ? (
                <div style={{ textAlign: "center", padding: "60px 0" }}>
                  <CheckCircle2 style={{ width: 48, height: 48, color: "#2E7D32", margin: "0 auto 20px" }} />
                  <h2 style={{ fontSize: 22, fontWeight: 800, color: "#1B2A4A", marginBottom: 10 }}>Message sent!</h2>
                  <p style={{ fontSize: 14, color: "#6B7280" }}>We&apos;ll get back to you within 1 business day.</p>
                </div>
              ) : (
                <>
                  <h2 style={{ fontSize: 20, fontWeight: 800, color: "#1B2A4A", marginBottom: 24 }}>Send us a message</h2>
                  <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                    <div className="flex flex-col gap-4 sm:grid sm:grid-cols-2">
                      <div>
                        <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>Full Name *</label>
                        <input name="name" required value={form.name} onChange={handleChange} placeholder="Jane Doe" style={{ width: "100%", padding: "11px 14px", fontSize: 13, border: "1px solid #D1D5DB", outline: "none", color: "#1A1A2E" }} />
                      </div>
                      <div>
                        <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>Work Email *</label>
                        <input name="email" type="email" required value={form.email} onChange={handleChange} placeholder="jane@company.com" style={{ width: "100%", padding: "11px 14px", fontSize: 13, border: "1px solid #D1D5DB", outline: "none", color: "#1A1A2E" }} />
                      </div>
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>Company</label>
                      <input name="company" value={form.company} onChange={handleChange} placeholder="Acme Ltd." style={{ width: "100%", padding: "11px 14px", fontSize: 13, border: "1px solid #D1D5DB", outline: "none", color: "#1A1A2E" }} />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>Topic *</label>
                      <select name="topic" required value={form.topic} onChange={handleChange} style={{ width: "100%", padding: "11px 14px", fontSize: 13, border: "1px solid #D1D5DB", outline: "none", color: form.topic ? "#1A1A2E" : "#9CA3AF", background: "#fff", appearance: "auto" as const }}>
                        <option value="" style={{ color: "#9CA3AF" }}>Select a topic…</option>
                        {TOPICS.map((t) => <option key={t} value={t} style={{ color: "#1A1A2E" }}>{t}</option>)}
                      </select>
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>Message *</label>
                      <textarea name="message" required rows={5} value={form.message} onChange={handleChange} placeholder="Tell us how we can help…" style={{ width: "100%", padding: "11px 14px", fontSize: 13, border: "1px solid #D1D5DB", outline: "none", color: "#1A1A2E", resize: "vertical" }} />
                    </div>
                    <button type="submit" className="btn-primary" style={{ justifyContent: "center", fontSize: 14, padding: "14px 24px" }}>
                      <Send style={{ width: 15, height: 15 }} /> Send Message
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
