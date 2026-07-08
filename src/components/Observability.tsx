"use client";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { SiOpentelemetry, SiDatadog } from "react-icons/si";
import {
  FiActivity,
  FiAlertTriangle,
  FiFileText,
  FiServer,
  FiArrowRight,
} from "react-icons/fi";

const pipeline = [
  {
    label: "Services",
    sublabel: "eSIM backend · Booking engine",
    icon: <FiServer />,
    color: "slate",
  },
  {
    label: "OpenTelemetry",
    sublabel: "SDK instrumentation + Collector",
    icon: <SiOpentelemetry />,
    color: "indigo",
  },
  {
    label: "OpenObserve",
    sublabel: "Traces · logs · infra metrics",
    icon: <FiActivity />,
    color: "sky",
  },
  {
    label: "Datadog APM",
    sublabel: "Distributed tracing",
    icon: <SiDatadog />,
    color: "violet",
  },
];

const capabilities = [
  {
    icon: <FiActivity className="text-sky-400 text-xl" />,
    title: "Distributed Tracing",
    description:
      "Propagated trace context across services with OpenTelemetry so a single request can be followed end-to-end, correlated in OpenObserve and Datadog APM.",
    projects: ["eSIM", "Booking Engine"],
  },
  {
    icon: <FiFileText className="text-indigo-400 text-xl" />,
    title: "Centralized Logging",
    description:
      "Shipped application and infrastructure logs into OpenObserve for fast full-text search and correlation with traces during incident debugging.",
    projects: ["eSIM", "Booking Engine"],
  },
  {
    icon: <FiAlertTriangle className="text-amber-400 text-xl" />,
    title: "Alerting",
    description:
      "Configured OpenObserve alert rules on error rates, latency and infra thresholds to catch issues before customers report them.",
    projects: ["eSIM", "Booking Engine"],
  },
  {
    icon: <FiServer className="text-emerald-400 text-xl" />,
    title: "Infra Monitoring",
    description:
      "Tracked host and container-level metrics (CPU, memory, disk, network) alongside application telemetry in one place.",
    projects: ["eSIM", "Booking Engine"],
  },
];

const colorRing: Record<string, string> = {
  slate: "border-slate-500/30 text-slate-300 bg-slate-500/5",
  indigo: "border-indigo-500/30 text-indigo-400 bg-indigo-500/5",
  sky: "border-sky-500/30 text-sky-400 bg-sky-500/5",
  violet: "border-violet-500/30 text-violet-400 bg-violet-500/5",
};

export default function Observability() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="observability" className="py-28 px-6 bg-[#080d1a]">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sky-400 text-sm font-semibold tracking-widest uppercase">
            Observability
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mt-3">
            Seeing Into Production
          </h2>
          <p className="text-slate-400 mt-4 max-w-2xl mx-auto">
            I instrument services with OpenTelemetry and route traces, logs and infra
            metrics into OpenObserve and Datadog APM — so problems surface as alerts,
            not as customer tickets.
          </p>
        </motion.div>

        {/* Pipeline flow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-[#0f172a] border border-white/5 rounded-2xl p-6 md:p-8 mb-10"
        >
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 md:gap-2">
            {pipeline.map((step, i) => (
              <div key={step.label} className="flex items-center gap-2 flex-1">
                <div
                  className={`flex-1 flex items-center gap-3 rounded-xl border px-4 py-3.5 ${colorRing[step.color]}`}
                >
                  <span className="text-xl shrink-0">{step.icon}</span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white leading-tight">
                      {step.label}
                    </p>
                    <p className="text-xs text-slate-500 leading-tight mt-0.5 truncate">
                      {step.sublabel}
                    </p>
                  </div>
                </div>
                {i < pipeline.length - 1 && (
                  <FiArrowRight className="hidden md:block text-slate-600 shrink-0" />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Capability cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {capabilities.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.08 }}
              className="bg-[#0f172a] border border-white/5 rounded-2xl p-5 hover:border-sky-500/20 transition-colors flex flex-col gap-3"
            >
              <div>{c.icon}</div>
              <h3 className="text-white font-semibold text-sm">{c.title}</h3>
              <p className="text-slate-400 text-xs leading-relaxed flex-1">
                {c.description}
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {c.projects.map((p) => (
                  <span
                    key={p}
                    className="text-[10px] font-medium text-slate-400 bg-white/5 border border-white/5 px-2 py-0.5 rounded-full"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
