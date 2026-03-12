"use client";
import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail, FiDownload } from "react-icons/fi";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Gradient background blobs */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl" />
        {/* Grid lines */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#38bdf8 1px, transparent 1px), linear-gradient(to right, #38bdf8 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="inline-flex items-center gap-2 bg-sky-500/10 border border-sky-500/20 text-sky-400 text-sm px-4 py-1.5 rounded-full mb-6"
        >
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          Available for new opportunities
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-5xl md:text-7xl font-extrabold text-white mb-4 leading-tight"
        >
          Hi, I&apos;m{" "}
          <span className="bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent">
            Mahmud
          </span>
        </motion.h1>

        {/* Title */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-xl md:text-2xl text-slate-400 font-medium mb-6"
        >
    
          <span className="text-sky-400 font-semibold">DevOps Engineer</span>{" "}
          | Cloud Infrastructure | Platform Engineering
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="max-w-2xl mx-auto text-slate-400 text-base md:text-lg leading-relaxed mb-10"
        >
          DevOps Engineer experienced in building and operating scalable cloud-native infrastructure using Kubernetes, Terraform, and GitOps practices with ArgoCD, delivering highly available and automated platforms on AWS
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-12"
        >
          <a
            href="#projects"
            className="bg-sky-500 hover:bg-sky-400 text-white font-semibold px-7 py-3 rounded-xl transition-all duration-200 shadow-lg shadow-sky-500/20 hover:shadow-sky-500/40"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="border border-white/10 hover:border-sky-500/50 text-slate-300 hover:text-white font-semibold px-7 py-3 rounded-xl transition-all duration-200 hover:bg-sky-500/5"
          >
            Get In Touch
          </a>
          <a
            href="/Arif_Mahmud_Resume_DevOps.pdf"
            download
            className="flex items-center gap-2 text-slate-400 hover:text-sky-400 font-medium transition-colors"
          >
            <FiDownload className="text-lg" />
            Resume
          </a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex justify-center gap-6"
        >
          {[
            { icon: <FiGithub />, href: "https://github.com/mahmud-arif", label: "GitHub" },
            { icon: <FiLinkedin />, href: "https://www.linkedin.com/in/arif-mahmud-03611a138/", label: "LinkedIn" },
            { icon: <FiMail />, href: "mailto:mahmudarif1175@gmail.com", label: "Email" },
          ].map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="text-slate-500 hover:text-sky-400 text-2xl transition-colors duration-200"
            >
              {s.icon}
            </a>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, repeat: Infinity, repeatType: "reverse", duration: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-600 text-xs"
        >
          <span>scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-slate-600 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
