import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { INDUSTRIES } from "@/constants/industries";
import { HardHat, Flame, Factory, Utensils, HeartPulse, Truck, BookOpen, Landmark, ArrowRight, ShieldCheck, Check } from "lucide-react";
import CTABanner from "@/components/public/CTABanner";

const ICON_MAP: Record<string, React.ElementType> = {
  HardHat, Flame, Factory, Utensils, HeartPulse, Truck, BookOpen, Landmark,
};

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const industry = INDUSTRIES.find(i => i.slug === params.slug);
  if (!industry) return { title: "Industry Not Found" };

  return {
    title: `${industry.title} HSEQ Solutions | Apex Veritas`,
    description: industry.description,
  };
}

export default function IndustryDetail({ params }: Props) {
  const industry = INDUSTRIES.find(i => i.slug === params.slug);
  if (!industry) notFound();

  const Icon = ICON_MAP[industry.icon] ?? HardHat;

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="section-responsive" style={{ background: "#F5F7FA", borderBottom: "1px solid #E5E7EB" }}>
        <div className="container-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <Link href="/industries" className="inline-flex items-center gap-2 text-sm font-semibold mb-8 hover:translate-x-[-4px] transition-transform text-gray-500">
                <ArrowRight style={{ width: 16, height: 16, transform: "rotate(180deg)" }} /> Back to Industries
              </Link>
              <span className="badge-green mb-4">Targeted Industry Solution</span>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-brand-navy mb-6 tracking-tighter" style={{ color: "#1B2A4A" }}>
                {industry.title}
              </h1>
              <p className="text-xl text-gray-600 mb-10 leading-relaxed">
                {industry.description}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/register" className="btn-primary">
                  Start Your Free Trial
                </Link>
                <Link href="/contact" className="btn-outline">
                  Talk to an Industry Expert
                </Link>
              </div>
            </div>
            <div className="flex justify-center">
               <div style={{
                 width: "100%", maxWidth: 440, height: 380,
                 background: industry.color,
                 display: "flex", alignItems: "center", justifyContent: "center",
                 position: "relative",
               }}>
                  <Icon className="w-40 h-40 text-white/20 absolute opacity-50" />
                  <div className="bg-white p-12 card-shadow-hover relative z-10" style={{ transform: "translate(20px, 20px)" }}>
                     <Icon className="w-16 h-16 mb-6" style={{ color: industry.color }} />
                     <h3 className="text-xl font-bold mb-2">HSEQ Excellence</h3>
                     <p className="text-sm text-gray-500">Customized compliance library for the {industry.title} sector.</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Regulations */}
      <section className="section-responsive bg-white">
        <div className="container-xl">
          <div className="max-w-4xl mx-auto">
            <h2 className="heading-section text-center mb-12">Compliance coverage you can trust</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {industry.regulations.map((reg) => (
                 <div key={reg} className="bg-gray-50 p-8 border-l-4 border-brand-navy" style={{ borderLeftColor: industry.color }}>
                    <ShieldCheck className="w-8 h-8 mb-4 text-brand-navy" style={{ color: "#1B2A4A" }} />
                    <p className="font-bold text-gray-900 mb-2">{reg}</p>
                    <p className="text-xs text-gray-500">Fully integrated regulatory guidelines and audit templates.</p>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Apex */}
      <section className="section-responsive" style={{ background: "#1B2A4A" }}>
         <div className="container-xl">
            <div className="text-center mb-16">
               <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why {industry.title} leaders choose Apex</h2>
               <p className="text-white/60">Built for the unique safety challenges of your industry.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {[
                 { t: "Automated Workflows", d: "Say goodbye to spreadsheets. Automate incident reporting and audit scheduling." },
                 { t: "Local Expertise", d: "Specific regulation libraries for Kenya (OSHA/NEMA) and UAE (OSHAD/ESMA)." },
                 { t: "Real-time Visibility", d: "Unified dashboard showing compliance scores across all your sites or projects." }
               ].map(benefit => (
                 <div key={benefit.t} className="bg-white/5 p-8 border border-white/10">
                    <Check className="w-6 h-6 text-green-500 mb-4" />
                    <h3 className="text-lg font-bold text-white mb-2">{benefit.t}</h3>
                    <p className="text-sm text-white/60">{benefit.d}</p>
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
  return INDUSTRIES.map((i) => ({
    slug: i.slug,
  }));
}
