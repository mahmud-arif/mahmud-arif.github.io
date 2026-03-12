"use client";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import {
  SiKubernetes, SiTerraform, SiArgo,
  SiGooglecloud, SiDocker, SiHelm, SiGithubactions, SiPrometheus,
  SiGrafana, SiPostgresql, SiNginx, SiLinux, SiGit,
  SiAnsible, SiJenkins, SiMysql, SiPython, SiGo, SiDatadog,
} from "react-icons/si";
import { FiDatabase, FiCloud, FiTerminal } from "react-icons/fi";

const categories = [
  {
    name: "Container & Orchestration",
    color: "sky",
    skills: [
      { icon: <SiKubernetes />, name: "Kubernetes (EKS)" },
      { icon: <SiDocker />, name: "Docker" },
      { icon: <SiHelm />, name: "Helm" },
      { icon: <SiArgo />, name: "ArgoCD" },
    ],
  },
  {
    name: "Infrastructure as Code",
    color: "indigo",
    skills: [
      { icon: <SiTerraform />, name: "Terraform / OpenTofu" },
      { icon: <SiAnsible />, name: "Ansible" },
      { icon: <FiDatabase />, name: "Kustomize" },
      { icon: <FiCloud />, name: "Atlantis" },
    ],
  },
  {
    name: "Cloud Platforms",
    color: "violet",
    skills: [
      { icon: <FiCloud />, name: "AWS" },
      { icon: <SiGooglecloud />, name: "GCP" },
      { icon: <SiLinux />, name: "Linux" },
      { icon: <SiNginx />, name: "Nginx" },
    ],
  },
  {
    name: "CI/CD & Observability",
    color: "emerald",
    skills: [
      { icon: <SiGithubactions />, name: "GitHub Actions" },
      { icon: <SiJenkins />, name: "Jenkins" },
      { icon: <SiPrometheus />, name: "Prometheus" },
      { icon: <SiGrafana />, name: "Grafana / Loki" },
      { icon: <SiDatadog />, name: "Datadog" },
    ],
  },
  {
    name: "Data & Databases",
    color: "amber",
    skills: [
      { icon: <SiPostgresql />, name: "PostgreSQL" },
      { icon: <SiMysql />, name: "MySQL" },
      { icon: <SiGooglecloud />, name: "BigQuery" },
      { icon: <FiDatabase />, name: "AWS DMS / DynamoDB" },
    ],
  },
  {
    name: "Languages & Scripting",
    color: "rose",
    skills: [
      { icon: <SiPython />, name: "Python" },
      { icon: <SiGo />, name: "Go" },
      { icon: <FiTerminal />, name: "Bash / Shell" },
      { icon: <SiGit />, name: "Git / SVN" },
    ],
  },
];

const colorMap: Record<string, string> = {
  sky: "border-sky-500/20 hover:border-sky-500/50 group-hover:text-sky-400",
  indigo: "border-indigo-500/20 hover:border-indigo-500/50 group-hover:text-indigo-400",
  violet: "border-violet-500/20 hover:border-violet-500/50 group-hover:text-violet-400",
  emerald: "border-emerald-500/20 hover:border-emerald-500/50 group-hover:text-emerald-400",
  amber: "border-amber-500/20 hover:border-amber-500/50 group-hover:text-amber-400",
  rose: "border-rose-500/20 hover:border-rose-500/50 group-hover:text-rose-400",
};

const titleColorMap: Record<string, string> = {
  sky: "text-sky-400",
  indigo: "text-indigo-400",
  violet: "text-violet-400",
  emerald: "text-emerald-400",
  amber: "text-amber-400",
  rose: "text-rose-400",
};

export default function Skills() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="skills" className="py-28 px-6 bg-[#080d1a]">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sky-400 text-sm font-semibold tracking-widest uppercase">Tech Stack</span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mt-3">Skills & Tools</h2>
          <p className="text-slate-400 mt-4 max-w-xl mx-auto">
            The technologies and platforms I work with daily to build and operate production infrastructure.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, ci) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: ci * 0.1 }}
              className="bg-[#0f172a] border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-all"
            >
              <h3 className={`text-sm font-semibold mb-4 ${titleColorMap[cat.color]}`}>
                {cat.name}
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {cat.skills.map((s) => (
                  <div
                    key={s.name}
                    className={`group flex items-center gap-3 bg-white/[0.02] border rounded-xl px-3 py-2.5 transition-all cursor-default ${colorMap[cat.color]}`}
                  >
                    <span className={`text-xl text-slate-500 transition-colors ${colorMap[cat.color]}`}>
                      {s.icon}
                    </span>
                    <span className="text-slate-300 text-sm font-medium">{s.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
