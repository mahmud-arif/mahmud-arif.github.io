"use client";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import {
  FiGitCommit,
  FiGitBranch,
  FiGitPullRequest,
  FiGitMerge,
  FiStar,
  FiTag,
  FiGlobe,
  FiMessageSquare,
  FiAlertCircle,
  FiActivity,
  FiExternalLink,
  FiRefreshCw,
  FiGithub,
} from "react-icons/fi";

const GITHUB_USER = "arifmahmud-devops";
const GITHUB_URL = `https://github.com/${GITHUB_USER}`;

type GhActor = { login: string; avatar_url: string };
type GhRepo = { name: string };
type GhEvent = {
  id: string;
  type: string;
  actor: GhActor;
  repo: GhRepo;
  payload: {
    action?: string;
    ref_type?: string;
    commits?: { message: string }[];
    pull_request?: { html_url: string };
    issue?: { html_url: string };
    release?: { html_url: string };
    forkee?: { html_url: string; full_name: string };
  };
  created_at: string;
};

type FeedItem = {
  id: string;
  icon: React.ReactNode;
  color: string;
  text: string;
  repo: string;
  href: string;
  time: string;
};

const colorRing: Record<string, string> = {
  sky: "border-sky-500/30 text-sky-400 bg-sky-500/10",
  emerald: "border-emerald-500/30 text-emerald-400 bg-emerald-500/10",
  indigo: "border-indigo-500/30 text-indigo-400 bg-indigo-500/10",
  amber: "border-amber-500/30 text-amber-400 bg-amber-500/10",
  violet: "border-violet-500/30 text-violet-400 bg-violet-500/10",
  slate: "border-slate-500/30 text-slate-300 bg-slate-500/10",
};

function timeAgo(iso: string): string {
  const seconds = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  const ranges: [number, string][] = [
    [31536000, "y"],
    [2592000, "mo"],
    [86400, "d"],
    [3600, "h"],
    [60, "m"],
  ];
  for (const [secs, label] of ranges) {
    const value = Math.floor(seconds / secs);
    if (value >= 1) return `${value}${label} ago`;
  }
  return "just now";
}

function describeEvent(ev: GhEvent): { icon: React.ReactNode; color: string; text: string } | null {
  switch (ev.type) {
    case "PushEvent": {
      const count = ev.payload.commits?.length ?? 0;
      return {
        icon: <FiGitCommit />,
        color: "sky",
        text: `Pushed ${count} commit${count === 1 ? "" : "s"} to`,
      };
    }
    case "CreateEvent": {
      const kind = ev.payload.ref_type ?? "repository";
      return {
        icon: kind === "repository" ? <FiGithub /> : <FiGitBranch />,
        color: "emerald",
        text: kind === "repository" ? "Created repository" : `Created ${kind} in`,
      };
    }
    case "PullRequestEvent": {
      const action = ev.payload.action ?? "updated";
      const merged = action === "closed";
      return {
        icon: merged ? <FiGitMerge /> : <FiGitPullRequest />,
        color: "indigo",
        text: `${action[0].toUpperCase()}${action.slice(1)} a pull request in`,
      };
    }
    case "IssuesEvent": {
      const action = ev.payload.action ?? "updated";
      return {
        icon: <FiAlertCircle />,
        color: "amber",
        text: `${action[0].toUpperCase()}${action.slice(1)} an issue in`,
      };
    }
    case "IssueCommentEvent":
      return { icon: <FiMessageSquare />, color: "violet", text: "Commented in" };
    case "WatchEvent":
      return { icon: <FiStar />, color: "amber", text: "Starred" };
    case "ForkEvent":
      return { icon: <FiGitBranch />, color: "emerald", text: "Forked" };
    case "PublicEvent":
      return { icon: <FiGlobe />, color: "sky", text: "Open-sourced" };
    case "ReleaseEvent":
      return { icon: <FiTag />, color: "violet", text: "Published a release in" };
    case "PullRequestReviewEvent":
      return { icon: <FiGitPullRequest />, color: "indigo", text: "Reviewed a pull request in" };
    default:
      return { icon: <FiActivity />, color: "slate", text: `${ev.type.replace("Event", "")} in` };
  }
}

export default function GitHubActivity() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [items, setItems] = useState<FeedItem[] | null>(null);
  const [status, setStatus] = useState<"loading" | "ok" | "empty" | "error">("loading");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setStatus("loading");
      try {
        const res = await fetch(
          `https://api.github.com/users/${GITHUB_USER}/events/public?per_page=10`,
          { headers: { Accept: "application/vnd.github+json" } }
        );
        if (!res.ok) throw new Error(`GitHub API ${res.status}`);
        const data: GhEvent[] = await res.json();
        if (cancelled) return;

        const feed = data
          .map((ev): FeedItem | null => {
            const desc = describeEvent(ev);
            if (!desc) return null;
            return {
              id: ev.id,
              icon: desc.icon,
              color: desc.color,
              text: desc.text,
              repo: ev.repo.name,
              href: `https://github.com/${ev.repo.name}`,
              time: timeAgo(ev.created_at),
            };
          })
          .filter((x): x is FeedItem => x !== null)
          .slice(0, 6);

        if (feed.length === 0) {
          setStatus("empty");
        } else {
          setItems(feed);
          setStatus("ok");
        }
      } catch {
        if (!cancelled) setStatus("error");
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="activity" className="py-28 px-6">
      <div className="max-w-4xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-sky-400 text-sm font-semibold tracking-widest uppercase">
            GitHub Activity
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mt-3">
            What I&apos;m Shipping
          </h2>
          <p className="text-slate-400 mt-4 max-w-xl mx-auto">
            Live feed of my recent public activity on GitHub — commits, pull requests and
            repositories, pulled straight from{" "}
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-400 hover:text-sky-300 font-medium"
            >
              @{GITHUB_USER}
            </a>
            .
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-[#0f172a] border border-white/5 rounded-2xl overflow-hidden"
        >
          {/* Header bar */}
          <div className="flex items-center justify-between px-5 md:px-6 py-4 border-b border-white/5">
            <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Live from GitHub
            </div>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-semibold text-sky-400 hover:text-sky-300 transition-colors"
            >
              <FiGithub />
              View Profile
              <FiExternalLink className="text-[10px]" />
            </a>
          </div>

          {/* Body */}
          <div className="p-3 md:p-4">
            {status === "loading" && (
              <div className="flex flex-col gap-2 p-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-14 rounded-xl bg-white/[0.03] animate-pulse" />
                ))}
              </div>
            )}

            {status === "error" && (
              <div className="flex flex-col items-center text-center gap-3 py-10 px-4">
                <FiRefreshCw className="text-slate-500 text-2xl" />
                <p className="text-slate-400 text-sm max-w-sm">
                  Couldn&apos;t load live activity right now (GitHub&apos;s API may be rate-limited).
                  Check out everything directly on GitHub instead.
                </p>
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-400 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
                >
                  <FiGithub />
                  Open GitHub Profile
                </a>
              </div>
            )}

            {status === "empty" && (
              <div className="flex flex-col items-center text-center gap-3 py-10 px-4">
                <FiActivity className="text-slate-500 text-2xl" />
                <p className="text-slate-400 text-sm max-w-sm">
                  No recent public activity to show yet — most of my day-to-day work lives in
                  private infrastructure repos. Take a look at my public profile.
                </p>
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-400 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
                >
                  <FiGithub />
                  Open GitHub Profile
                </a>
              </div>
            )}

            {status === "ok" && items && (
              <ul className="flex flex-col gap-2">
                {items.map((item, i) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.15 + i * 0.06 }}
                  >
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 rounded-xl px-3 py-3 hover:bg-white/[0.03] transition-colors group"
                    >
                      <div
                        className={`shrink-0 w-9 h-9 rounded-lg border flex items-center justify-center text-base ${colorRing[item.color]}`}
                      >
                        {item.icon}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm text-slate-300 truncate">
                          {item.text}{" "}
                          <span className="text-white font-medium group-hover:text-sky-400 transition-colors">
                            {item.repo}
                          </span>
                        </p>
                      </div>
                      <span className="shrink-0 text-xs text-slate-600">{item.time}</span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
