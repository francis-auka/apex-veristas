import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";

export default function CTABanner() {
  return (
    <section className="section-responsive">
      <div className="container-xl">
        <div
          className="relative overflow-hidden rounded-3xl px-8 py-16 text-center sm:px-16"
          style={{ background: "linear-gradient(135deg,#1B2A4A 0%,#2E7D32 100%)" }}
        >
          {/* Background pattern */}
          <div
            className="pointer-events-none absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 50%, #66BB6A 0%, transparent 50%), radial-gradient(circle at 80% 50%, #4CAF50 0%, transparent 50%)",
            }}
          />

          <div className="relative z-10">
            <span
              className="mb-4 inline-block rounded-full px-4 py-1.5 text-xs font-semibold"
              style={{ background: "rgba(76,175,80,0.2)", color: "#66BB6A", border: "1px solid rgba(76,175,80,0.3)" }}
            >
              14-Day Free Trial · No Credit Card Required
            </span>

            <h2 className="mb-4 text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
              Ready to transform your <br className="hidden sm:block" />
              HSEQ compliance?
            </h2>
            <p className="mx-auto mb-10 max-w-xl text-base" style={{ color: "rgba(255,255,255,0.75)" }}>
              Join hundreds of companies worldwide that trust Apex Veritas
              to keep their teams safe, compliant and audit-ready — 24/7.
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/register"
                className="flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-sm font-bold transition-all duration-200 hover:scale-105 hover:shadow-xl"
                style={{ color: "#2E7D32" }}
              >
                Start For Free
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="flex items-center gap-2 rounded-xl border-2 border-white/30 px-8 py-4 text-sm font-bold text-white transition-all duration-200 hover:border-white/60 hover:scale-105"
              >
                <Phone className="h-4 w-4" />
                Talk to an Expert
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
              {["Setup in &lt; 10 mins", "Dedicated onboarding", "Cancel anytime", "GDPR Compliant"].map((item) => (
                <span key={item} className="flex items-center gap-2 text-xs font-medium" style={{ color: "rgba(255,255,255,0.65)" }}>
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: "#66BB6A" }} />
                  <span dangerouslySetInnerHTML={{ __html: item }} />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
