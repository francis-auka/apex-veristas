import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SOLUTIONS } from "@/constants/solutions";
import { Check, ArrowRight, ShieldCheck, FolderOpen, ClipboardList, AlertTriangle, GraduationCap, Users } from "lucide-react";
import CTABanner from "@/components/public/CTABanner";

const ICON_MAP: Record<string, React.ElementType> = {
  ShieldCheck, FolderOpen, ClipboardList, AlertTriangle, GraduationCap, Users,
};

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const solution = SOLUTIONS.find(s => s.slug === params.slug);
  if (!solution) return { title: "Solution Not Found" };

  return {
    title: `${solution.title} | Apex Veritas`,
    description: solution.description,
  };
}

export default function SolutionDetail({ params }: Props) {
  const solution = SOLUTIONS.find(s => s.slug === params.slug);
  if (!solution) notFound();

  const Icon = ICON_MAP[solution.icon] ?? ShieldCheck;

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="section-responsive" style={{ background: "#1B2A4A", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.1, backgroundImage: "radial-gradient(circle at 20% 50%, #66BB6A 0%, transparent 50%)" }} />
        <div className="container-xl relative z-10">
          <div className="max-w-3xl">
            <Link href="/solutions" className="inline-flex items-center gap-2 text-sm font-semibold mb-8 hover:translate-x-[-4px] transition-transform" style={{ color: "#66BB6A" }}>
              <ArrowRight style={{ width: 16, height: 16, transform: "rotate(180deg)" }} /> Back to Solutions
            </Link>
            <div style={{ width: 56, height: 56, background: "rgba(76,175,80,0.1)", borderLeft: "4px solid #2E7D32", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24 }}>
              <Icon style={{ width: 28, height: 28, color: "#66BB6A" }} />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight">
              {solution.title}
            </h1>
            <p className="text-xl text-white/70 mb-10 leading-relaxed max-w-2xl">
              {solution.description}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/register" className="btn-primary">
                Get Started Free
              </Link>
              <Link href="/contact" className="btn-outline !border-white/20 !text-white hover:!bg-white/10">
                Book a Demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Detail */}
      <section className="section-responsive bg-white">
        <div className="container-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="badge-green mb-6">Key Capabilities</span>
              <h2 className="heading-section mb-8">
                {solution.tagline}
              </h2>
              <div className="space-y-6">
                {solution.features.map((feature, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex-shrink-0 w-6 h-6 rounded-none bg-green-50 border border-green-200 flex items-center justify-center mt-1">
                      <Check className="w-4 h-4 text-green-700" />
                    </div>
                    <div>
                      <p className="text-gray-800 font-semibold mb-1">{feature.split('.')[0]}</p>
                      {feature.includes('.') && <p className="text-gray-500 text-sm">{feature.split('.').slice(1).join('.')}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
               <div className="aspect-square bg-gray-50 border border-gray-100 flex items-center justify-center p-12">
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto rounded-none bg-brand-navy/5 flex items-center justify-center mb-6">
                       <Icon className="w-10 h-10 text-brand-navy" style={{ color: "#1B2A4A" }} />
                    </div>
                    <p className="text-sm font-bold text-brand-navy uppercase tracking-widest mb-2" style={{ color: "#1B2A4A" }}>{solution.title}</p>
                    <p className="text-xs text-gray-400">Previewing module dashboard interface...</p>
                  </div>
               </div>
               {/* Decorative floating elements */}
               <div className="absolute -top-6 -right-6 w-32 h-32 bg-green-500/10 -z-10" />
               <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-brand-navy/5 -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Industry relevance */}
      <section className="section-responsive bg-brand-navy" style={{ background: "#F5F7FA" }}>
        <div className="container-xl text-center">
          <h2 className="heading-section mb-12">Built for high-stakes industries</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
             {["Construction", "Oil & Gas", "Manufacturing", "Logistics"].map(industry => (
               <div key={industry} className="bg-white p-8 border border-gray-100">
                  <p className="font-bold text-gray-900">{industry}</p>
                  <p className="text-xs text-gray-500 mt-2">Tailored workflows available</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </div>
  );
}

export async function generateStaticParams() {
  return SOLUTIONS.map((s) => ({
    slug: s.slug,
  }));
}
