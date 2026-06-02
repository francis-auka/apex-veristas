import Link from "next/link";
import { INDUSTRIES } from "@/constants/industries";
import { ArrowRight } from "lucide-react";
import {
  HardHat, Flame, Factory, Utensils, HeartPulse, Truck, BookOpen, Landmark
} from "lucide-react";

const ICON_MAP: Record<string, React.ElementType> = {
  HardHat, Flame, Factory, Utensils, HeartPulse, Truck, BookOpen, Landmark,
};

export default function IndustriesGrid() {
  return (
    <section className="section-responsive" style={{ background: "#F5F7FA" }}>
      <div className="container-xl">
        <div className="mb-14 text-center">
          <span className="badge-green mb-4 inline-block">Industries We Serve</span>
          <h2 className="heading-section mb-4">
            Built for your sector, ready for your regulator
          </h2>
          <p className="mx-auto max-w-xl text-base" style={{ color: "#6B7280" }}>
            Whether you're in construction, healthcare, or hospitality — our
            platform adapts to your specific regulatory requirements, wherever you operate.
          </p>
        </div>

        <div className="responsive-grid responsive-grid-2 responsive-grid-4">
          {INDUSTRIES.map((ind) => {
            const Icon = ICON_MAP[ind.icon] ?? HardHat;
            return (
              <Link
                key={ind.slug}
                href={`/industries/${ind.slug}`}
                className="group flex flex-col rounded-2xl bg-white p-6 transition-all duration-300 card-shadow hover:card-shadow-hover hover:-translate-y-1"
                style={{ border: "1px solid rgba(27,42,74,0.07)" }}
              >
                {/* Icon */}
                <div
                  className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-110"
                  style={{ background: `${ind.color}18` }}
                >
                  <Icon className="h-5 w-5" style={{ color: ind.color }} />
                </div>

                <h3 className="mb-2 font-bold" style={{ color: "#1B2A4A" }}>{ind.title}</h3>
                <p className="mb-4 flex-1 text-xs leading-relaxed" style={{ color: "#6B7280" }}>
                  {ind.description}
                </p>

                {/* Regulation tags */}
                <div className="mb-4 flex flex-wrap gap-1.5">
                  {ind.regulations.slice(0, 2).map((r) => (
                    <span
                      key={r}
                      className="rounded-full px-2.5 py-0.5 text-[10px] font-medium"
                      style={{ background: "rgba(46,125,50,0.1)", color: "#2E7D32" }}
                    >
                      {r}
                    </span>
                  ))}
                  {ind.regulations.length > 2 && (
                    <span
                      className="rounded-full px-2.5 py-0.5 text-[10px] font-medium"
                      style={{ background: "rgba(107,114,128,0.1)", color: "#6B7280" }}
                    >
                      +{ind.regulations.length - 2} more
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1.5 text-xs font-semibold" style={{ color: "#2E7D32" }}>
                  Learn more <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
