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
  row: number;
  col: number;
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
  cols: number;
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

const nodeColors: Record<string, { border: string; bg: string; text: string; dot: string }> = {
  sky:     { border: "border-sky-500/50",     bg: "bg-sky-500/10",     text: "text-sky-300",     dot: "bg-sky-400" },
  violet:  { border: "border-violet-500/50",  bg: "bg-violet-500/10",  text: "text-violet-300",  dot: "bg-violet-400" },
  emerald: { border: "border-emerald-500/50", bg: "bg-emerald-500/10", text: "text-emerald-300", dot: "bg-emerald-400" },
  amber:   { border: "border-amber-500/50",   bg: "bg-amber-500/10",   text: "text-amber-300",   dot: "bg-amber-400" },
  rose:    { border: "border-rose-500/50",    bg: "bg-rose-500/10",    text: "text-rose-300",    dot: "bg-rose-400" },
  orange:  { border: "border-orange-500/50",  bg: "bg-orange-500/10",  text: "text-orange-300",  dot: "bg-orange-400" },
  teal:    { border: "border-teal-500/50",    bg: "bg-teal-500/10",    text: "text-teal-300",    dot: "bg-teal-400" },
  slate:   { border: "border-slate-500/50",   bg: "bg-slate-500/10",   text: "text-slate-300",   dot: "bg-slate-400" },
};

function NetworkDiagramView({ diagram }: { diagram: NetworkDiagram }) {
  const rows = Math.max(...diagram.nodes.map((n) => n.row)) + 1;

  return (
    <div className="p-6 border-b border-white/5">
      <h3 className="text-xs font-semibold text-slate-500 tracking-widest uppercase mb-5 flex items-center gap-2">
        <FiShare2 className="text-sky-400" />
        Network Diagram
      </h3>
      <div className="overflow-x-auto">
        <div className="min-w-[520px]">
          {Array.from({ length: rows }, (_, rowIdx) => {
            const rowNodes = diagram.nodes.filter((n) => n.row === rowIdx);
            const maxCols = diagram.cols;
            return (
              <div key={rowIdx}>
                {/* Row of nodes */}
                <div
                  className="grid gap-3"
                  style={{ gridTemplateColumns: `repeat(${maxCols}, 1fr)` }}
                >
                  {Array.from({ length: maxCols }, (_, colIdx) => {
                    const node = rowNodes.find((n) => n.col === colIdx);
                    if (!node) return <div key={colIdx} />;
                    const c = nodeColors[node.color] ?? nodeColors.slate;
                    return (
                      <motion.div
                        key={node.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: rowIdx * 0.08 + colIdx * 0.04 }}
                        className={`relative rounded-xl border ${c.border} ${c.bg} px-3 py-2.5 text-center`}
                      >
                        {node.icon && (
                          <div className="text-lg mb-1">{node.icon}</div>
                        )}
                        <p className={`text-xs font-semibold ${c.text} leading-tight`}>{node.label}</p>
                        {node.sublabel && (
                          <p className="text-[10px] text-slate-500 mt-0.5 leading-tight">{node.sublabel}</p>
                        )}
                      </motion.div>
                    );
                  })}
                </div>

                {/* Connectors to next row */}
                {rowIdx < rows - 1 && (() => {
                  const edges = diagram.edges.filter((e) => {
                    const fromNode = diagram.nodes.find((n) => n.id === e.from);
                    const toNode = diagram.nodes.find((n) => n.id === e.to);
                    return fromNode?.row === rowIdx && toNode?.row === rowIdx + 1;
                  });

                  if (edges.length === 0) return null;

                  return (
                    <div className="relative flex justify-center py-2 gap-4 flex-wrap">
                      {edges.map((edge, ei) => {
                        const fromNode = diagram.nodes.find((n) => n.id === edge.from);
                        const toNode = diagram.nodes.find((n) => n.id === edge.to);
                        if (!fromNode || !toNode) return null;
                        return (
                          <div key={ei} className="flex flex-col items-center">
                            <div className={`w-px h-5 ${edge.dashed ? "border-l border-dashed border-slate-600" : "bg-slate-600"}`} />
                            <div className="w-1.5 h-1.5 rotate-45 border-r border-b border-slate-500 -mt-1" />
                            {edge.label && (
                              <span className="text-[10px] text-slate-500 mt-0.5 whitespace-nowrap">{edge.label}</span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  );
                })()}
              </div>
            );
          })}

          {/* Lateral edges legend */}
          {diagram.edges.filter((e) => {
            const f = diagram.nodes.find((n) => n.id === e.from);
            const t = diagram.nodes.find((n) => n.id === e.to);
            return f && t && f.row === t.row;
          }).length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {diagram.edges
                .filter((e) => {
                  const f = diagram.nodes.find((n) => n.id === e.from);
                  const t = diagram.nodes.find((n) => n.id === e.to);
                  return f && t && f.row === t.row;
                })
                .map((e, i) => {
                  const f = diagram.nodes.find((n) => n.id === e.from);
                  const t = diagram.nodes.find((n) => n.id === e.to);
                  return (
                    <span key={i} className="text-[10px] text-slate-500 bg-white/5 border border-white/5 rounded-lg px-2 py-1">
                      {f?.label} → {t?.label}{e.label ? ` (${e.label})` : ""}
                    </span>
                  );
                })}
            </div>
          )}
        </div>
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
