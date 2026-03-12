"use client";
import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { FiExternalLink, FiGithub, FiCode } from "react-icons/fi";
import {
  SiKubernetes, SiTerraform, SiArgo,
  SiGooglecloud, SiPostgresql, SiJenkins, SiMysql,
} from "react-icons/si";
import { FiDatabase, FiCloud } from "react-icons/fi";
import ProjectModal, { ProjectDetail } from "./ProjectModal";
import { projectDetails } from "./projectData";

// Map project card → detail key
const detailKeyMap: Record<string, string> = {
  "Loto Project — Full Platform": "loto",
  "Hakim — Healthcare Platform": "hakim",
  "eSIM Platform Infrastructure": "esim",
  "Travluence — Travel Infra": "travluence",
};

const projects = [
  {
    title: "Loto Project — Full Platform",
    description:
      "End-to-end lottery platform infrastructure on Kubernetes with ArgoCD GitOps, public CDN S3 buckets, OpenVPN access, Cloudflare zero-trust, Atlantis for Terraform PRs, and a full observability stack.",
    tags: ["Kubernetes", "ArgoCD", "Terraform", "AWS S3", "Cloudflare", "Atlantis"],
    icons: [<SiKubernetes key="k8s" />, <SiArgo key="argo" />, <SiTerraform key="tf" />, <FiCloud key="aws" />],
    color: "sky",
    category: "Platform Engineering",
  },
  {
    title: "Hakim — Healthcare Platform",
    description:
      "Microservices infrastructure for a B2B/B2C healthcare booking platform. Multi-environment Docker Compose and Kubernetes setups, code-deploy pipelines, admin + service-center portals, finance and ops-tracking services.",
    tags: ["Kubernetes", "Docker", "AWS CodeDeploy", "PostgreSQL", "Nginx"],
    icons: [<SiKubernetes key="k8s" />, <SiPostgresql key="pg" />, <FiCloud key="aws" />],
    color: "indigo",
    category: "Healthcare · SaaS",
  },
  {
    title: "Data Pipeline — GCP & AWS",
    description:
      "Production data pipeline spanning GCP BigQuery, AWS DMS for database migration, event-driven Lambda processors, Airbyte for ELT, and S3 data lake. Terraform-managed from scratch.",
    tags: ["Terraform", "GCP BigQuery", "AWS DMS", "Lambda", "Airbyte", "S3"],
    icons: [<SiTerraform key="tf" />, <SiGooglecloud key="gcp" />, <FiCloud key="aws" />, <FiDatabase key="db" />],
    color: "emerald",
    category: "Data Engineering",
  },
  {
    title: "eSIM Platform Infrastructure",
    description:
      "Full cloud infrastructure for an eSIM backend — Terraform-provisioned VPCs, EC2, RDS, application properties management, Docker Compose dev environments, and AWS CodeDeploy production deployments.",
    tags: ["Terraform", "AWS", "Docker Compose", "RDS", "CodeDeploy"],
    icons: [<SiTerraform key="tf" />, <FiCloud key="aws" />, <SiPostgresql key="pg" />],
    color: "amber",
    category: "Telecom · Cloud",
  },
  {
    title: "Travluence — Travel Infra",
    description:
      "Cloud infrastructure provisioning and server management for a travel-tech platform, including network topology design and service deployment automation.",
    tags: ["Terraform", "AWS", "Linux", "Nginx"],
    icons: [<SiTerraform key="tf" />, <FiCloud key="aws" />],
    color: "teal",
    category: "Travel Tech",
  },
  {
    title: "Fastpay — Mobile Wallet",
    description:
      "Team maintenance and deployment of a mobile wallet application on bare-metal servers. Managed Jenkins + GitHub CI/CD pipelines for continuous delivery of new services, and operated a production MySQL cluster for high-availability transaction processing.",
    tags: ["Jenkins", "GitHub CI/CD", "MySQL Cluster", "Bare Metal", "Linux"],
    icons: [<SiJenkins key="jenkins" />, <SiMysql key="mysql" />, <FiDatabase key="db" />],
    color: "rose",
    category: "FinTech · DevOps",
  },
  {
    title: "Cardselling — Cards & Payments",
    description:
      "Collaborative maintenance of a mobile and gaming card sales platform. Handled payment system upkeep, service integrations, and ad-hoc operational tasks to keep the platform running reliably for end customers.",
    tags: ["Linux", "MySQL", "Nginx", "Payment Systems", "Ad-hoc Ops"],
    icons: [<SiMysql key="mysql" />, <FiDatabase key="db" />, <FiCloud key="cloud" />],
    color: "violet",
    category: "eCommerce · Payments",
  },
];

const colorBorderMap: Record<string, string> = {
  sky: "hover:border-sky-500/40 hover:shadow-sky-500/10",
  indigo: "hover:border-indigo-500/40 hover:shadow-indigo-500/10",
  emerald: "hover:border-emerald-500/40 hover:shadow-emerald-500/10",
  amber: "hover:border-amber-500/40 hover:shadow-amber-500/10",
  teal: "hover:border-teal-500/40 hover:shadow-teal-500/10",
  rose: "hover:border-rose-500/40 hover:shadow-rose-500/10",
  violet: "hover:border-violet-500/40 hover:shadow-violet-500/10",
};

const tagColorMap: Record<string, string> = {
  sky: "bg-sky-500/10 text-sky-400",
  indigo: "bg-indigo-500/10 text-indigo-400",
  emerald: "bg-emerald-500/10 text-emerald-400",
  amber: "bg-amber-500/10 text-amber-400",
  teal: "bg-teal-500/10 text-teal-400",
  rose: "bg-rose-500/10 text-rose-400",
  violet: "bg-violet-500/10 text-violet-400",
};

const catColorMap: Record<string, string> = {
  sky: "text-sky-400",
  indigo: "text-indigo-400",
  emerald: "text-emerald-400",
  amber: "text-amber-400",
  teal: "text-teal-400",
  rose: "text-rose-400",
  violet: "text-violet-400",
};

export default function Projects() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });
  const [activeProject, setActiveProject] = useState<ProjectDetail | null>(null);

  const openDetail = (title: string) => {
    const key = detailKeyMap[title];
    if (key && projectDetails[key]) setActiveProject(projectDetails[key]);
  };

  return (
    <section id="projects" className="py-28 px-6">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sky-400 text-sm font-semibold tracking-widest uppercase">Portfolio</span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mt-3">Featured Projects</h2>
          <p className="text-slate-400 mt-4 max-w-xl mx-auto">
            Real-world infrastructure and platform engineering projects I&apos;ve built and operated at Newroz.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08 }}
              className={`group relative bg-[#0f172a] border border-white/5 rounded-2xl p-6 flex flex-col gap-4 transition-all duration-300 hover:shadow-xl ${colorBorderMap[p.color]}`}
            >
              {/* Category badge */}
              <span className={`text-xs font-semibold tracking-wide ${catColorMap[p.color]}`}>
                {p.category}
              </span>

              {/* Title */}
              <h3 className="text-white font-bold text-lg leading-snug group-hover:text-white transition-colors">
                {p.title}
              </h3>

              {/* Description */}
              <p className="text-slate-400 text-sm leading-relaxed flex-1">
                {p.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {p.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`text-xs px-2.5 py-1 rounded-full font-medium ${tagColorMap[p.color]}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Footer icons */}
              <div className="flex items-center justify-between pt-2 border-t border-white/5">
                <div className="flex gap-3 text-slate-600 text-xl">
                  {p.icons.map((icon, idx) => (
                    <span key={idx}>{icon}</span>
                  ))}
                </div>
                <div className="flex items-center gap-3 text-slate-500">
                  {detailKeyMap[p.title] && (
                    <button
                      onClick={() => openDetail(p.title)}
                      className="flex items-center gap-1.5 text-xs font-medium text-sky-400 hover:text-sky-300 bg-sky-500/10 hover:bg-sky-500/20 px-2.5 py-1 rounded-lg transition-all"
                    >
                      <FiCode className="text-sm" />
                      View Code
                    </button>
                  )}
                  <a href="#" className="hover:text-sky-400 transition-colors" aria-label="GitHub">
                    <FiGithub />
                  </a>
                  <a href="#" className="hover:text-sky-400 transition-colors" aria-label="Link">
                    <FiExternalLink />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </section>
  );
}
