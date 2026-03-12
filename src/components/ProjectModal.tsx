"use client";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiFolder, FiFile, FiChevronRight, FiLayers } from "react-icons/fi";

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

export interface ProjectDetail {
  title: string;
  description: string;
  hld?: HLD;
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

function FileTree({ nodes, depth = 0 }: { nodes: FileNode[]; depth?: number }) {
  return (
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
                className="ml-4 shrink-0 text-slate-500 hover:text-white transition-colors p-1.5 hover:bg-white/5 rounded-lg"
              >
                <FiX className="text-xl" />
              </button>
            </div>

            {/* HLD — only when hld data is present */}
            {project.hld && <HLDDiagram hld={project.hld} />}

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
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
