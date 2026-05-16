"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { NAV_LINKS } from "@/constants/navigation";
import { Menu, X, ShieldCheck } from "lucide-react";

export default function Navbar() {
  const [open,    setOpen]    = useState(false);
  const [scrolled,setScrolled]= useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: "all 0.3s",
        background: scrolled
          ? "rgba(255,255,255,0.97)"
          : "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 100%)",
        boxShadow: scrolled ? "0 1px 0 rgba(27,42,74,0.1)" : "none",
        backdropFilter: scrolled ? "blur(12px)" : "none",
      }}
    >
      <div className="container-xl flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div
            style={{
              width: 34, height: 34,
              display: "flex", alignItems: "center", justifyContent: "center",
              background: "linear-gradient(135deg,#1B2A4A 0%,#2E7D32 100%)",
            }}
          >
            <ShieldCheck style={{ width: 18, height: 18, color: "#fff" }} />
          </div>
          <div style={{ lineHeight: 1.25 }}>
            <span style={{ display: "block", fontSize: 15, fontWeight: 800, color: scrolled ? "#1B2A4A" : "#fff", letterSpacing: "-0.3px" }}>
              Apex Veritas
            </span>
            <span style={{ display: "block", fontSize: 9, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "#2E7D32" }}>
              Virtual HSEQ Solutions
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-0.5">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                padding: "6px 14px",
                fontSize: 13,
                fontWeight: 600,
                color: scrolled ? "#1A1A2E" : "#fff",
                transition: "color 0.15s",
                textShadow: scrolled ? "none" : "0 1px 3px rgba(0,0,0,0.4)",
              }}
              className="hover:text-green-dark transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/login"
            style={{
              fontSize: 13, fontWeight: 600,
              color: scrolled ? "#1B2A4A" : "#fff",
              textShadow: scrolled ? "none" : "0 1px 3px rgba(0,0,0,0.4)",
            }}
          >
            Sign in
          </Link>
          <Link href="/register" className="btn-primary" style={{ fontSize: 13, padding: "8px 20px" }}>
            Get Started Free
          </Link>
        </div>

        {/* Mobile burger */}
        <button
          style={{
            padding: "6px",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            display: "none",
          }}
          className="lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open
            ? <X style={{ width: 22, height: 22, color: scrolled ? "#1B2A4A" : "#fff" }} />
            : <Menu style={{ width: 22, height: 22, color: scrolled ? "#1B2A4A" : "#fff" }} />
          }
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div style={{ background: "#fff", borderTop: "1px solid #E5E7EB" }}>
          <nav className="container-xl py-4 flex flex-col">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                style={{
                  padding: "12px 16px",
                  fontSize: 14,
                  fontWeight: 500,
                  color: "#1A1A2E",
                  borderBottom: "1px solid #F3F4F6",
                }}
              >
                {link.label}
              </Link>
            ))}
            <div style={{ display: "flex", gap: 12, marginTop: 16, padding: "0 16px 8px" }}>
              <Link href="/login" className="btn-outline" style={{ flex: 1, justifyContent: "center", fontSize: 13 }}>
                Sign in
              </Link>
              <Link href="/register" className="btn-primary" style={{ flex: 1, justifyContent: "center", fontSize: 13 }}>
                Get Started
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
