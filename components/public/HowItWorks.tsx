import { UserPlus, Settings, BarChart2, CheckCircle, ArrowRight } from "lucide-react";

const STEPS = [
  {
    step:        "01",
    icon:        UserPlus,
    title:       "Register & Onboard",
    description: "Create your company workspace in minutes. We map your industry, country (Kenya or UAE) and applicable regulations automatically.",
    color:       "#2E7D32",
  },
  {
    step:        "02",
    icon:        Settings,
    title:       "Configure Your HSEQ System",
    description: "Set up compliance registers, upload existing documents, assign team roles and connect your regulation library. We guide you every step.",
    color:       "#4CAF50",
  },
  {
    step:        "03",
    icon:        BarChart2,
    title:       "Track, Audit & Report",
    description: "Monitor your compliance score in real-time. Run audits, report incidents and manage training — all from one dashboard.",
    color:       "#1B2A4A",
  },
  {
    step:        "04",
    icon:        CheckCircle,
    title:       "Achieve & Maintain Compliance",
    description: "Stay perpetually compliant with automated reminders, virtual consultant support and evidence-backed audit reports.",
    color:       "#2E7D32",
  },
];

export default function HowItWorks() {
  return (
    <section className="section-responsive" style={{ background: "#fff" }}>
      <div className="container-xl">
        <div className="mb-14 text-center">
          <span className="badge-navy mb-4 inline-block">How It Works</span>
          <h2 className="heading-section mb-4">
            Compliance made simple in 4 steps
          </h2>
          <p className="mx-auto max-w-xl text-base" style={{ color: "#6B7280" }}>
            From onboarding to certification-ready — our platform walks you through
            the entire HSEQ compliance journey.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line (desktop) */}
          <div
            className="absolute top-14 left-0 right-0 hidden h-0.5 lg:block"
            style={{
              background: "linear-gradient(90deg,transparent 4%,rgba(46,125,50,0.2) 10%,rgba(46,125,50,0.2) 90%,transparent 96%)",
              margin: "0 12.5%",
            }}
          />

          <div className="responsive-grid responsive-grid-2 responsive-grid-4" style={{ gap: "2rem" }}>
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={step.step} className="relative flex flex-col items-center text-center">
                  {/* Step number + icon */}
                  <div className="relative mb-6">
                    <div
                      className="flex h-20 w-20 items-center justify-center rounded-2xl shadow-lg transition-transform duration-300 hover:scale-110"
                      style={{
                        background: `linear-gradient(135deg,${step.color} 0%,${i % 2 === 0 ? "#66BB6A" : "#4CAF50"} 100%)`,
                        boxShadow: `0 8px 24px ${step.color}33`,
                      }}
                    >
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <span
                      className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-extrabold text-white"
                      style={{ background: "#1B2A4A" }}
                    >
                      {step.step}
                    </span>
                  </div>

                  <h3 className="heading-card mb-3">{step.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#6B7280" }}>
                    {step.description}
                  </p>

                  {/* Arrow (not on last) */}
                  {i < STEPS.length - 1 && (
                    <ArrowRight
                      className="mt-4 h-5 w-5 rotate-90 lg:hidden"
                      style={{ color: "#4CAF50" }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
