"use client";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiFolder, FiFile, FiChevronRight, FiLayers, FiShare2 } from "react-icons/fi";

export interface FileNode {
  name: string;
  type: "folder" | "file";
  children?: FileNode[];
}

export interface CodeSnippet {
  filename: string;
  language: string;
  code: string;
}

export interface HLDLayer {
  label: string;
  color: string;
  items: string[];
}

export interface HLD {
  title: string;
  layers: HLDLayer[];
}

export interface NetworkNode {
  id: string;
  label: string;
  sublabel?: string;
  color: "sky" | "violet" | "emerald" | "amber" | "rose" | "orange" | "teal" | "slate";
  icon?: string;
  x: number;  // center x in viewBox
  y: number;  // center y in viewBox
}

export interface NetworkEdge {
  from: string;
  to: string;
  label?: string;
  dashed?: boolean;
}

export interface NetworkDiagram {
  nodes: NetworkNode[];
  edges: NetworkEdge[];
  viewBox: string; // e.g. "0 0 860 460"
}

export interface ProjectDetail {
  title: string;
  description: string;
  hld?: HLD;
  networkDiagram?: NetworkDiagram;
  repoStructure: FileNode[];
  snippets: CodeSnippet[];
  tags: string[];
  color: string;
}

interface Props {
  project: ProjectDetail | null;
  onClose: () => void;
}

const layerBorderColor: Record<string, string> = {
  orange: "border-orange-500/40 bg-orange-500/5",
  sky: "border-sky-500/40 bg-sky-500/5",
  violet: "border-violet-500/40 bg-violet-500/5",
  emerald: "border-emerald-500/40 bg-emerald-500/5",
  amber: "border-amber-500/40 bg-amber-500/5",
  rose: "border-rose-500/40 bg-rose-500/5",
  teal: "border-teal-500/40 bg-teal-500/5",
};

const layerLabelColor: Record<string, string> = {
  orange: "text-orange-400",
  sky: "text-sky-400",
  violet: "text-violet-400",
  emerald: "text-emerald-400",
  amber: "text-amber-400",
  rose: "text-rose-400",
  teal: "text-teal-400",
};

const layerDotColor: Record<string, string> = {
  orange: "bg-orange-400",
  sky: "bg-sky-400",
  violet: "bg-violet-400",
  emerald: "bg-emerald-400",
  amber: "bg-amber-400",
  rose: "bg-rose-400",
  teal: "bg-teal-400",
};

function HLDDiagram({ hld }: { hld: HLD }) {
  return (
    <div className="p-6 border-b border-white/5">
      <h3 className="text-xs font-semibold text-slate-500 tracking-widest uppercase mb-4 flex items-center gap-2">
        <FiLayers className="text-indigo-400" />
        High Level Architecture Diagram
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {hld.layers.map((layer, i) => (
          <div
            key={i}
            className={`rounded-xl border p-3 ${layerBorderColor[layer.color] ?? "border-white/10 bg-white/5"}`}
          >
            <p className={`text-xs font-bold mb-2 tracking-wide ${layerLabelColor[layer.color] ?? "text-slate-300"}`}>
              {layer.label}
            </p>
            <ul className="space-y-1">
              {layer.items.map((item, j) => (
                <li key={j} className="flex items-start gap-1.5 text-xs text-slate-400">
                  <span className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${layerDotColor[layer.color] ?? "bg-slate-500"}`} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

const NW = 148;
const NH = 64;
const HW = NW / 2;
const HH = NH / 2;

const SVG_C: Record<string, { fill: string; stroke: string; label: string; sub: string }> = {
  sky:     { fill: "rgba(14,165,233,0.14)",  stroke: "#0ea5e9", label: "#7dd3fc", sub: "#475569" },
  violet:  { fill: "rgba(139,92,246,0.14)",  stroke: "#8b5cf6", label: "#c4b5fd", sub: "#475569" },
  emerald: { fill: "rgba(16,185,129,0.14)",  stroke: "#10b981", label: "#6ee7b7", sub: "#475569" },
  amber:   { fill: "rgba(245,158,11,0.14)",  stroke: "#f59e0b", label: "#fcd34d", sub: "#475569" },
  rose:    { fill: "rgba(244,63,94,0.14)",   stroke: "#f43f5e", label: "#fda4af", sub: "#475569" },
  orange:  { fill: "rgba(249,115,22,0.14)",  stroke: "#f97316", label: "#fdba74", sub: "#475569" },
  teal:    { fill: "rgba(20,184,166,0.14)",  stroke: "#14b8a6", label: "#5eead4", sub: "#475569" },
  slate:   { fill: "rgba(100,116,139,0.14)", stroke: "#64748b", label: "#cbd5e1", sub: "#475569" },
};

function edgePt(cx: number, cy: number, tx: number, ty: number) {
  const dx = tx - cx, dy = ty - cy;
  if (!dx && !dy) return { x: cx, y: cy };
  const s = Math.min(
    Math.abs(dx) > 0.01 ? HW / Math.abs(dx) : Infinity,
    Math.abs(dy) > 0.01 ? HH / Math.abs(dy) : Infinity,
  );
  return { x: cx + dx * s, y: cy + dy * s };
}

function NetworkDiagramView({ diagram }: { diagram: NetworkDiagram }) {
  const parts = diagram.viewBox.split(" ");
  const vw = Number(parts[2]);
  const vh = Number(parts[3]);
  const nodeMap = new Map(diagram.nodes.map((n) => [n.id, n]));

  return (
    <div className="p-6 border-b border-white/5">
      <h3 className="text-xs font-semibold text-slate-500 tracking-widest uppercase mb-4 flex items-center gap-2">
        <FiShare2 className="text-sky-400" />
        Network Diagram
      </h3>
      <div className="overflow-x-auto rounded-xl bg-[#040810] border border-white/5 p-3">
        <svg
          viewBox={diagram.viewBox}
          className="w-full h-auto"
          style={{ minWidth: 480, display: "block" }}
        >
          <defs>
            {/* dot grid background */}
            <pattern id="dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="0.8" fill="#0f1d30" />
            </pattern>
            {/* arrowhead */}
            <marker id="ah" viewBox="0 0 10 8" markerWidth="10" markerHeight="8"
              refX="9" refY="4" orient="auto" markerUnits="userSpaceOnUse">
              <path d="M 0 0 L 10 4 L 0 8 Z" fill="#475569" />
            </marker>
            <marker id="ahd" viewBox="0 0 10 8" markerWidth="10" markerHeight="8"
              refX="9" refY="4" orient="auto" markerUnits="userSpaceOnUse">
              <path d="M 0 0 L 10 4 L 0 8 Z" fill="#2d3f55" />
            </marker>
          </defs>

          {/* background */}
          <rect width={vw} height={vh} fill="url(#dots)" />

          {/* edges — drawn first so nodes sit on top */}
          {diagram.edges.map((edge, i) => {
            const fn = nodeMap.get(edge.from);
            const tn = nodeMap.get(edge.to);
            if (!fn || !tn) return null;
            const p1 = edgePt(fn.x, fn.y, tn.x, tn.y);
            const p2 = edgePt(tn.x, tn.y, fn.x, fn.y);
            // pull endpoint back 6px so arrowhead tip sits just outside box
            const dx = tn.x - fn.x, dy = tn.y - fn.y;
            const len = Math.sqrt(dx * dx + dy * dy);
            const p2adj = len > 0
              ? { x: p2.x + (dx / len) * 6, y: p2.y + (dy / len) * 6 }
              : p2;
            const mx = (p1.x + p2adj.x) / 2;
            const my = (p1.y + p2adj.y) / 2;
            const lw = edge.label ? Math.max(edge.label.length * 6 + 8, 28) : 0;
            return (
              <g key={i}>
                <line
                  x1={p1.x} y1={p1.y} x2={p2adj.x} y2={p2adj.y}
                  stroke={edge.dashed ? "#2d3f55" : "#334155"}
                  strokeWidth={1.5}
                  strokeDasharray={edge.dashed ? "6 4" : undefined}
                  markerEnd={edge.dashed ? "url(#ahd)" : "url(#ah)"}
                />
                {edge.label && (
                  <g>
                    <rect
                      x={mx - lw / 2} y={my - 9}
                      width={lw} height={16} rx={4}
                      fill="#070d1a" stroke="#1e293b" strokeWidth={0.8}
                    />
                    <text
                      x={mx} y={my + 3.5}
                      textAnchor="middle"
                      fill="#64748b"
                      fontSize={9}
                      fontFamily="ui-monospace, monospace"
                    >{edge.label}</text>
                  </g>
                )}
              </g>
            );
          })}

          {/* nodes */}
          {diagram.nodes.map((node) => {
            const c = SVG_C[node.color] ?? SVG_C.slate;
            const nx = node.x - HW;
            const ny = node.y - HH;
            return (
              <g key={node.id}>
                {/* shadow */}
                <rect x={nx + 2} y={ny + 3} width={NW} height={NH} rx={9} fill="rgba(0,0,0,0.35)" />
                {/* box */}
                <rect x={nx} y={ny} width={NW} height={NH} rx={9}
                  fill={c.fill} stroke={c.stroke} strokeWidth={1.5} />
                {/* icon */}
                {node.icon && (
                  <text x={node.x} y={ny + 19} textAnchor="middle" fontSize={13}>{node.icon}</text>
                )}
                {/* label */}
                <text
                  x={node.x}
                  y={node.icon ? ny + 37 : (node.sublabel ? ny + 30 : ny + 36)}
                  textAnchor="middle"
                  fill={c.label}
                  fontSize={11}
                  fontWeight="600"
                  fontFamily="system-ui, -apple-system, sans-serif"
                >{node.label}</text>
                {/* sublabel */}
                {node.sublabel && (
                  <text
                    x={node.x}
                    y={node.icon ? ny + 51 : ny + 47}
                    textAnchor="middle"
                    fill={c.sub}
                    fontSize={8.5}
                    fontFamily="system-ui, -apple-system, sans-serif"
                  >{node.sublabel}</text>
                )}
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}

function FileTree({ nodes, depth = 0 }: { nodes: FileNode[]; depth?: number }) {  return (
    <ul className="space-y-0.5">
      {nodes.map((node, i) => (
        <li key={i}>
          <div
            className="flex items-center gap-1.5 text-sm py-0.5 hover:text-slate-200 transition-colors"
            style={{ paddingLeft: `${depth * 16}px` }}
          >
            {node.type === "folder" ? (
              <>
                <FiChevronRight className="text-slate-500 text-xs shrink-0" />
                <FiFolder className="text-amber-400 text-sm shrink-0" />
                <span className="text-slate-300 font-medium">{node.name}</span>
              </>
            ) : (
              <>
                <span className="w-3 shrink-0" />
                <FiFile className="text-slate-500 text-sm shrink-0" />
                <span className="text-slate-400">{node.name}</span>
              </>
            )}
          </div>
          {node.children && <FileTree nodes={node.children} depth={depth + 1} />}
        </li>
      ))}
    </ul>
  );
}

const langColors: Record<string, string> = {
  terraform: "text-violet-400",
  yaml: "text-sky-400",
  dockerfile: "text-blue-400",
  bash: "text-emerald-400",
  hcl: "text-violet-400",
};

export default function ProjectModal({ project, onClose }: Props) {
  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [project]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-100 flex items-start justify-center bg-black/70 backdrop-blur-sm p-4 md:p-8 overflow-y-auto"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative w-full max-w-5xl bg-[#0d1424] border border-white/10 rounded-2xl shadow-2xl my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between p-6 border-b border-white/5">
              <div>
                <p className={`text-xs font-semibold tracking-widest uppercase mb-1 text-sky-400`}>
                  Project Deep Dive
                </p>
                <h2 className="text-white text-2xl font-bold">{project.title}</h2>
                <p className="text-slate-400 text-sm mt-1 max-w-2xl">{project.description}</p>
              </div>
              <button
                onClick={onClose}
                className="ml-4 shrink-0 flex items-center gap-1.5 bg-white/10 hover:bg-red-500/20 border border-white/15 hover:border-red-500/40 text-slate-300 hover:text-white transition-all duration-200 px-3 py-2 rounded-xl text-sm font-medium"
              >
                <FiX className="text-base" />
                <span className="hidden sm:inline">Close</span>
              </button>
            </div>

            {/* HLD — only when hld data is present */}
            {project.hld && <HLDDiagram hld={project.hld} />}

            {/* Network Diagram */}
            {project.networkDiagram && <NetworkDiagramView diagram={project.networkDiagram} />}

            {/* Body */}
            <div className="grid md:grid-cols-2 gap-0 divide-y md:divide-y-0 md:divide-x divide-white/5">
              {/* Left: File Structure */}
              <div className="p-6">
                <h3 className="text-xs font-semibold text-slate-500 tracking-widest uppercase mb-4 flex items-center gap-2">
                  <FiFolder className="text-amber-400" />
                  Repository Structure
                </h3>
                <div className="bg-[#080e1c] rounded-xl border border-white/5 p-4 font-mono text-xs max-h-96 overflow-y-auto">
                  <FileTree nodes={project.repoStructure} />
                </div>
              </div>

              {/* Right: Code Snippets */}
              <div className="p-6 flex flex-col gap-5">
                <h3 className="text-xs font-semibold text-slate-500 tracking-widest uppercase flex items-center gap-2">
                  <FiFile className="text-sky-400" />
                  Code Snippets
                </h3>
                {project.snippets.map((snippet, i) => (
                  <div key={i} className="rounded-xl border border-white/5 overflow-hidden">
                    {/* Tab bar */}
                    <div className="flex items-center gap-2 bg-[#080e1c] px-4 py-2 border-b border-white/5">
                      <div className="flex gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                        <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                      </div>
                      <span className={`text-xs font-mono ml-2 ${langColors[snippet.language] ?? "text-slate-400"}`}>
                        {snippet.filename}
                      </span>
                    </div>
                    <pre className="bg-[#060b18] p-4 text-xs font-mono text-slate-300 overflow-x-auto max-h-64 leading-relaxed whitespace-pre">
                      {snippet.code.trim()}
                    </pre>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Tags */}
            <div className="flex flex-wrap gap-2 p-6 border-t border-white/5">
              {project.tags.map((t) => (
                <span key={t} className="text-xs bg-white/5 text-slate-400 px-3 py-1 rounded-full border border-white/5">
                  {t}
                </span>
              ))}
            </div>

            {/* Mobile sticky close button */}
            <div className="md:hidden sticky bottom-0 p-4 bg-[#0d1424] border-t border-white/10">
              <button
                onClick={onClose}
                className="w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-red-500/20 border border-white/15 hover:border-red-500/30 text-white font-semibold py-3 rounded-xl transition-all duration-200"
              >
                <FiX className="text-lg" />
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
