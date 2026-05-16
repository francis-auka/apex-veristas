"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    name:    "James Mwangi",
    role:    "HSEQ Manager",
    company: "BuildRight Construction, Nairobi",
    country: "🇰🇪",
    text:    "Apex Veritas transformed how we manage OSHA compliance. Our audit readiness score went from 52% to 91% in just 3 months. The virtual consultant sessions are outstanding.",
    rating:  5,
  },
  {
    name:    "Fatima Al Hassan",
    role:    "Head of EHS",
    company: "Gulf Industries LLC, Dubai",
    country: "🇦🇪",
    text:    "Managing OSHAD-SF requirements across 3 sites used to be a nightmare. Now it's all in one place. The incident reporting module alone saved us countless hours every month.",
    rating:  5,
  },
  {
    name:    "Dr. Aisha Wambua",
    role:    "Compliance Director",
    company: "NairobiHealthcare Group",
    country: "🇰🇪",
    text:    "The training matrix and certificate tracking features are exactly what we needed. We achieved ISO 45001 certification in 8 months with Apex Veritas guiding us.",
    rating:  5,
  },
  {
    name:    "Mohammed Al Rashid",
    role:    "Safety Officer",
    company: "Emirates Logistics, Abu Dhabi",
    country: "🇦🇪",
    text:    "As a logistics company operating under UAE's EHS framework, we needed a platform that understands local regulations. Apex Veritas delivers exactly that.",
    rating:  5,
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => setCurrent((c) => (c + 1) % TESTIMONIALS.length);

  return (
    <section className="section-responsive" style={{ background: "#fff" }}>
      <div className="container-xl">
        <div className="mb-14 text-center">
          <span className="badge-green mb-4 inline-block">Client Stories</span>
          <h2 className="heading-section mb-4">
            Trusted by compliance teams across Africa & the Gulf
          </h2>
        </div>

        {/* Desktop grid */}
        <div className="hidden grid-cols-2 gap-6 lg:grid">
          {TESTIMONIALS.map((t) => (
            <TestimonialCard key={t.name} t={t} />
          ))}
        </div>

        {/* Mobile carousel */}
        <div className="lg:hidden">
          <TestimonialCard t={TESTIMONIALS[current]} />
          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              onClick={prev}
              className="flex h-10 w-10 items-center justify-center rounded-full border transition-colors hover:bg-gray-50"
              style={{ borderColor: "#e5e7eb" }}
            >
              <ChevronLeft className="h-5 w-5" style={{ color: "#1B2A4A" }} />
            </button>
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className="h-2 w-2 rounded-full transition-all"
                  style={{
                    background: i === current ? "#2E7D32" : "#e5e7eb",
                    width: i === current ? "24px" : "8px",
                  }}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="flex h-10 w-10 items-center justify-center rounded-full border transition-colors hover:bg-gray-50"
              style={{ borderColor: "#e5e7eb" }}
            >
              <ChevronRight className="h-5 w-5" style={{ color: "#1B2A4A" }} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ t }: { t: (typeof TESTIMONIALS)[number] }) {
  return (
    <div
      className="relative flex flex-col rounded-2xl p-7 card-shadow"
      style={{ background: "#fff", border: "1px solid rgba(27,42,74,0.07)" }}
    >
      <Quote
        className="mb-4 h-8 w-8"
        style={{ color: "rgba(46,125,50,0.2)" }}
      />
      <p className="mb-6 flex-1 text-sm leading-relaxed" style={{ color: "#4B5563" }}>
        &ldquo;{t.text}&rdquo;
      </p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white"
            style={{ background: "linear-gradient(135deg,#1B2A4A,#2E7D32)" }}
          >
            {t.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-sm font-semibold" style={{ color: "#1B2A4A" }}>
              {t.name} <span>{t.country}</span>
            </div>
            <div className="text-xs" style={{ color: "#6B7280" }}>
              {t.role} · {t.company}
            </div>
          </div>
        </div>
        <div className="flex gap-0.5">
          {Array.from({ length: t.rating }).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-current" style={{ color: "#F59E0B" }} />
          ))}
        </div>
      </div>
    </div>
  );
}
