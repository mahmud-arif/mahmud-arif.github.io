"use client";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { SiOpentelemetry, SiKubernetes } from "react-icons/si";
import {
  FiActivity,
  FiAlertTriangle,
  FiFileText,
  FiArrowRight,
  FiTarget,
  FiCode,
  FiArrowDown,
} from "react-icons/fi";

const pipeline = [
  {
    label: "EKS workloads",
    sublabel: "Apps · Istio Gateway · ztunnel",
    icon: <SiKubernetes />,
    color: "slate",
  },
  {
    label: "OTel agent",
    sublabel: "Every node: logs · kubelet · host",
    icon: <SiOpentelemetry />,
    color: "indigo",
  },
  {
    label: "OTel gateway",
    sublabel: "Filter · enrich · route per service",
    icon: <SiOpentelemetry />,
    color: "violet",
  },
  {
    label: "OpenObserve",
    sublabel: "Logs · metrics · traces (S3)",
    icon: <FiActivity />,
    color: "sky",
  },
  {
    label: "SLOs & alerts",
    sublabel: "Burn-rate paging, as code",
    icon: <FiTarget />,
    color: "amber",
  },
];

const capabilities = [
  {
    icon: <FiActivity className="text-sky-400 text-xl" />,
    title: "Distributed Tracing",
    description:
      "The Istio Gateway starts every trace and services continue it via traceparent, with OTel Operator auto-instrumentation. Log lines carry the trace_id, so a log jumps straight to its trace.",
    projects: ["Crown Routes (EKS)", "eSIM", "Booking Engine"],
  },
  {
    icon: <FiFileText className="text-indigo-400 text-xl" />,
    title: "Centralized Logging",
    description:
      "Per-service log streams; app JSON and Gateway access logs parsed into searchable columns; multi-line container logs rebuilt; health-probe noise dropped before it leaves the cluster.",
    projects: ["Crown Routes (EKS)", "eSIM"],
  },
  {
    icon: <FiTarget className="text-emerald-400 text-xl" />,
    title: "SLOs & Error Budgets",
    description:
      "30-day availability, latency and readiness SLOs per service, measured at the edge, with multi-window burn-rate alerts that page at 14.4× and ticket at 6×.",
    projects: ["Crown Routes (EKS)"],
  },
  {
    icon: <FiAlertTriangle className="text-amber-400 text-xl" />,
    title: "Platform Alerting",
    description:
      "21 Kubernetes alerts: crash-loops, unavailable replicas, NotReady nodes, disk/PVC space, Gateway 5xx, mesh certificate expiry, Karpenter failures and a dead telemetry pipeline.",
    projects: ["Crown Routes (EKS)", "eSIM"],
  },
  {
    icon: <SiKubernetes className="text-violet-400 text-xl" />,
    title: "Kubernetes & Mesh Monitoring",
    description:
      "Node, pod and NodePool capacity, Karpenter decisions, Istio ambient service map and TCP traffic, from kube-state-metrics, kubelet and Istio telemetry.",
    projects: ["Crown Routes (EKS)", "Loto"],
  },
  {
    icon: <FiCode className="text-rose-400 text-xl" />,
    title: "Monitoring as Code",
    description:
      "6 dashboards (30 tabs) generated in Python and applied with OpenTofu alongside SLOs and alerts. Trimmed ~490 noisy metric streams that were overflowing the OpenObserve server.",
    projects: ["Crown Routes (EKS)"],
  },
];

const colorRing: Record<string, string> = {
  slate: "border-slate-500/30 text-slate-300 bg-slate-500/5",
  indigo: "border-indigo-500/30 text-indigo-400 bg-indigo-500/5",
  sky: "border-sky-500/30 text-sky-400 bg-sky-500/5",
  violet: "border-violet-500/30 text-violet-400 bg-violet-500/5",
  amber: "border-amber-500/30 text-amber-400 bg-amber-500/5",
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
            On EKS I run an OpenTelemetry pipeline into a self-hosted OpenObserve, with
            SLOs, alerts and dashboards all defined as code, so problems surface as
            alerts, not as customer tickets. Earlier platforms also used Datadog APM.
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
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
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

        <div className="text-center mt-10">
          <a
            href="#dashboards"
            className="inline-flex items-center gap-2 text-sm text-sky-400 hover:text-sky-300"
          >
            See the dashboards <FiArrowDown />
          </a>
        </div>
      </div>
    </section>
  );
}
