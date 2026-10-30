"use client";
import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { motion, AnimatePresence } from "framer-motion";
import { FiExternalLink, FiImage } from "react-icons/fi";
import type { MonitoringShot } from "./monitoringShots";

type Shot = MonitoringShot & { available: boolean };

export default function MonitoringGallery({ shots }: { shots: Shot[] }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [shotIndex, setShotIndex] = useState(0);
  const [active, setActive] = useState<number | null>(null);
  const shot = shots[shotIndex];

  const selectShot = (i: number) => {
    setShotIndex(i);
    setActive(null);
  };

  return (
    <section id="dashboards" className="py-28 px-6 bg-[#080d1a] border-t border-white/5">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-sky-400 text-sm font-semibold tracking-widest uppercase">
            Monitoring in practice
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mt-3">
            Dashboards I Built for EKS
          </h2>
          <p className="text-slate-400 mt-4 max-w-2xl mx-auto">
            Real OpenObserve dashboards from a production EKS platform. Each one answers a
            question on-call actually asks. Hover a highlight to see what it shows and how it
            was built.
          </p>
        </motion.div>

        {/* Dashboard picker */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6 -mx-1 px-1">
          {shots.map((s, i) => (
            <button
              key={s.id}
              onClick={() => selectShot(i)}
              className={`shrink-0 text-xs font-medium px-3.5 py-2 rounded-full border transition-colors ${
                i === shotIndex
                  ? "bg-sky-500/15 border-sky-500/40 text-sky-300"
                  : "bg-white/5 border-white/5 text-slate-400 hover:text-white"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={shot.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="grid lg:grid-cols-5 gap-6"
          >
            {/* Screenshot with highlights */}
            <div className="lg:col-span-3 bg-[#0f172a] border border-white/5 rounded-2xl overflow-hidden self-start">
              <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
                <p className="text-xs text-slate-500 ml-2 truncate">
                  OpenObserve · {shot.dashboard} › {shot.tab}
                </p>
                {shot.flows && (
                  <span className="hidden sm:inline-flex items-center gap-1.5 text-[10px] text-emerald-300/80 shrink-0 motion-reduce:hidden">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    traffic animated
                  </span>
                )}
                {shot.available && (
                  <a
                    href={`/${shot.image}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-auto text-slate-500 hover:text-sky-400 shrink-0"
                    aria-label="Open full-size screenshot"
                  >
                    <FiExternalLink />
                  </a>
                )}
              </div>

              <div className="relative overflow-hidden">
                {shot.available ? (
                  // Plain img: screenshots have different aspect ratios.
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={`/${shot.image}`}
                    alt={`OpenObserve ${shot.dashboard} dashboard, ${shot.tab} tab`}
                    className="block w-full h-auto"
                  />
                ) : (
                  <div className="aspect-[16/10] flex flex-col items-center justify-center gap-2 text-slate-600 border-2 border-dashed border-white/10 m-3 rounded-xl">
                    <FiImage className="text-3xl" />
                    <p className="text-xs">public/{shot.image}</p>
                  </div>
                )}

                {shot.available && shot.size && shot.flows && (
                  <svg
                    viewBox={`0 0 ${shot.size.w} ${shot.size.h}`}
                    className="absolute inset-0 w-full h-full pointer-events-none motion-reduce:hidden"
                    aria-hidden="true"
                  >
                    <defs>
                      <filter id="flow-glow" x="-100%" y="-100%" width="300%" height="300%">
                        <feGaussianBlur stdDeviation="6" result="blur" />
                        <feMerge>
                          <feMergeNode in="blur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>
                    {shot.flows.map((f) =>
                      Array.from({ length: f.dots }, (_, i) => {
                        // Negative begin spreads a flow's dots evenly along it.
                        const begin = `${(-i * f.dur) / f.dots}s`;
                        return (
                          <circle
                            key={`${f.label}-${i}`}
                            r={f.kind === "tcp" ? 11 : 10}
                            fill={f.kind === "tcp" ? "#7cb6ff" : "#8fdc7a"}
                            filter="url(#flow-glow)"
                            opacity="0"
                          >
                            <animateMotion dur={`${f.dur}s`} begin={begin} repeatCount="indefinite" path={f.d} />
                            <animate
                              attributeName="opacity"
                              values="0;1;1;0"
                              keyTimes="0;0.12;0.85;1"
                              dur={`${f.dur}s`}
                              begin={begin}
                              repeatCount="indefinite"
                            />
                          </circle>
                        );
                      }),
                    )}
                  </svg>
                )}

                {shot.callouts.map((c, i) => (
                  <button
                    key={c.title}
                    onMouseEnter={() => setActive(i)}
                    onMouseLeave={() => setActive(null)}
                    onFocus={() => setActive(i)}
                    onBlur={() => setActive(null)}
                    aria-label={c.title}
                    style={{
                      left: `${c.box.x}%`,
                      top: `${c.box.y}%`,
                      width: `${c.box.w}%`,
                      height: `${c.box.h}%`,
                    }}
                    className={`absolute rounded-lg border-2 transition-all duration-200 ${
                      active === i
                        ? "border-sky-400 shadow-[0_0_0_9999px_rgba(2,6,23,0.6)] z-10"
                        : active === null
                          ? "border-sky-400/50"
                          : "border-transparent"
                    }`}
                  >
                    <span
                      className={`absolute -top-2.5 -left-2.5 w-6 h-6 rounded-full text-[11px] font-bold flex items-center justify-center transition-colors ${
                        active === i ? "bg-sky-400 text-slate-950" : "bg-sky-500/80 text-white"
                      }`}
                    >
                      {i + 1}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Explanation */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider">The question</p>
                <p className="text-white font-semibold mt-1 leading-snug">{shot.question}</p>
              </div>

              <ol className="flex flex-col gap-2">
                {shot.callouts.map((c, i) => (
                  <li key={c.title}>
                    <button
                      onMouseEnter={() => setActive(i)}
                      onMouseLeave={() => setActive(null)}
                      onClick={() => setActive(active === i ? null : i)}
                      className={`w-full text-left flex gap-3 rounded-xl border p-3 transition-colors ${
                        active === i
                          ? "bg-sky-500/10 border-sky-500/30"
                          : "bg-[#0f172a] border-white/5 hover:border-white/10"
                      }`}
                    >
                      <span className="shrink-0 w-6 h-6 rounded-full bg-sky-500/20 text-sky-300 text-[11px] font-bold flex items-center justify-center">
                        {i + 1}
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm text-white font-medium">{c.title}</span>
                        <span className="block text-xs text-slate-400 leading-relaxed mt-0.5">
                          {c.body}
                        </span>
                      </span>
                    </button>
                  </li>
                ))}
              </ol>

              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">How it&apos;s built</p>
                <div className="flex flex-wrap gap-1.5">
                  {shot.built.map((b) => (
                    <span
                      key={b}
                      className="text-[11px] text-slate-300 bg-white/5 border border-white/5 px-2.5 py-1 rounded-full"
                    >
                      {b}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
