"use client";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { FiServer, FiCloud, FiShield, FiCpu } from "react-icons/fi";

const highlights = [
  { icon: <FiCloud className="text-sky-400 text-xl" />, text: "5+ years designing cloud-native infrastructure on AWS & GCP" },
  { icon: <FiServer className="text-indigo-400 text-xl" />, text: "Kubernetes cluster management for production workloads" },
  { icon: <FiShield className="text-emerald-400 text-xl" />, text: "GitOps workflows with ArgoCD, Atlantis & Terraform" },
  { icon: <FiCpu className="text-violet-400 text-xl" />, text: "Data pipeline engineering with Airbyte, DMS & Lambda" },
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
                  I&apos;m a <span className="text-sky-400 font-semibold">Senior DevOps Engineer</span> at{" "}
                  <span className="text-white font-semibold">Newroz Telecom</span>, where I own the
                  entire cloud infrastructure lifecycle — from provisioning bare-metal
                  environments to deploying production microservices via GitOps.
                </p>
                <p className="text-slate-300 text-base leading-relaxed mb-5">
                  My work spans multiple products including{" "}
                  <span className="text-indigo-400">Hakim</span>,{" "}
                  <span className="text-indigo-400">eSIM</span>,{" "}
                  <span className="text-indigo-400">Loto</span>, and data platforms — each
                  running on a battle-tested Kubernetes foundation with full observability,
                  security and automated deployments.
                </p>
                <p className="text-slate-300 text-base leading-relaxed">
                  I believe in <span className="text-emerald-400 font-medium">infrastructure as code</span>,
                  everything in Git, and platforms that let developers ship faster
                  without worrying about the underlying stack.
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
