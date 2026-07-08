"use client";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { FiServer, FiCloud, FiShield, FiActivity } from "react-icons/fi";

const highlights = [
  { icon: <FiCloud className="text-sky-400 text-xl" />, text: "Own the full infrastructure lifecycle — from first provision to production on AWS EKS, EC2 & Docker" },
  { icon: <FiServer className="text-indigo-400 text-xl" />, text: "Run Hakim, eSIM, Loto, Travluence & internal data platforms in production, today" },
  { icon: <FiShield className="text-emerald-400 text-xl" />, text: "Ship changes safely with GitOps — ArgoCD, Atlantis & Terraform across multi-environment setups" },
  { icon: <FiActivity className="text-cyan-400 text-xl" />, text: "Catch issues before customers do — OpenTelemetry, OpenObserve & Datadog for tracing, logs and alerting" },
];

export default function About() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section id="about" className="py-28 px-6">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sky-400 text-sm font-semibold tracking-widest uppercase">About Me</span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mt-3">
            Who I Am
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left - Bio */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-sky-500/20 to-indigo-500/20 rounded-2xl blur-sm" />
              <div className="relative bg-[#0f172a] border border-white/5 rounded-2xl p-8">
                <p className="text-slate-300 text-base leading-relaxed mb-5">
                  I keep production infrastructure reliable, secure and easy to ship to — so product teams
                  can move fast without breaking things. I&apos;m a{" "}
                  <span className="text-sky-400 font-semibold">DevOps Engineer</span> at{" "}
                  <span className="text-white font-semibold">Newroz Technologies Limited</span>, where I own
                  that end to end: design, build and operate the cloud infrastructure and internal platforms
                  our products run on.
                </p>
                <p className="text-slate-300 text-base leading-relaxed mb-5">
                  Day to day, that means running workloads on{" "}
                  <span className="text-sky-400 font-medium">Amazon EKS</span>,{" "}
                  <span className="text-sky-400 font-medium">Docker</span> and{" "}
                  <span className="text-sky-400 font-medium">Amazon EC2</span>, codifying it all with{" "}
                  <span className="text-emerald-400 font-medium">Terraform</span> and GitOps, and closing the
                  loop with <span className="text-cyan-400 font-medium">OpenTelemetry</span>,{" "}
                  <span className="text-cyan-400 font-medium">OpenObserve</span> and{" "}
                  <span className="text-cyan-400 font-medium">Datadog</span> so problems surface as alerts,
                  not outages.
                </p>
                <p className="text-slate-300 text-base leading-relaxed">
                  This work supports{" "}
                  <span className="text-indigo-400">Hakim</span>,{" "}
                  <span className="text-indigo-400">eSIM</span>,{" "}
                  <span className="text-indigo-400">Loto</span>,{" "}
                  <span className="text-indigo-400">Travluence</span> and our internal data platforms —
                  in production, at the same time, with automation and reliability as the constant.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right - Highlights */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-4"
          >
            {highlights.map((h, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="flex items-start gap-4 bg-[#0f172a] border border-white/5 rounded-xl p-5 hover:border-sky-500/20 transition-colors"
              >
                <div className="mt-0.5 flex-shrink-0">{h.icon}</div>
                <p className="text-slate-300 text-sm leading-relaxed">{h.text}</p>
              </motion.div>
            ))}

            <div className="grid grid-cols-3 gap-4 mt-2">
              {[
                { val: "5+", label: "Years Exp." },
                { val: "10+", label: "Projects" },
                { val: "3", label: "Cloud Platforms" },
              ].map((s) => (
                <div key={s.label} className="bg-[#0f172a] border border-white/5 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-sky-400">{s.val}</div>
                  <div className="text-xs text-slate-500 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
