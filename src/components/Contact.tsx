"use client";
import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { FiMail, FiMapPin, FiLinkedin, FiGithub, FiSend } from "react-icons/fi";

export default function Contact() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("https://formsubmit.co/ajax/mahmudarif1175@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          _subject: `Portfolio message from ${form.name}`,
        }),
      });
      const data = await res.json();
      if (data.success === "true" || data.success === true) {
        setSent(true);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch {
      setError("Failed to send. Please email me directly at mahmudarif1175@gmail.com");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-28 px-6 bg-[#080d1a]">
      <div className="max-w-5xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sky-400 text-sm font-semibold tracking-widest uppercase">Contact</span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mt-3">Let&apos;s Work Together</h2>
          <p className="text-slate-400 mt-4 max-w-xl mx-auto">
            Open to freelance projects, full-time roles and infrastructure consulting. Drop me a message!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col gap-6"
          >
            {[
                          { icon: <FiMail className="text-sky-400 text-xl" />, label: "Email", value: "mahmudarif1175@gmail.com", href: "mailto:mahmudarif1175@gmail.com" },
              { icon: <FiMapPin className="text-indigo-400 text-xl" />, label: "Location", value: "Dhaka, Bangladesh", href: "#" },
              { icon: <FiLinkedin className="text-violet-400 text-xl" />, label: "LinkedIn", value: "linkedin.com/in/arif-mahmud", href: "https://www.linkedin.com/in/arif-mahmud-03611a138/" },
              { icon: <FiGithub className="text-emerald-400 text-xl" />, label: "GitHub", value: "github.com/mahmud-arif", href: "https://github.com/mahmud-arif" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-[#0f172a] border border-white/5 rounded-xl p-4 hover:border-sky-500/20 transition-all group"
              >
                <div className="flex-shrink-0">{item.icon}</div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">{item.label}</p>
                  <p className="text-slate-200 text-sm font-medium group-hover:text-sky-400 transition-colors">{item.value}</p>
                </div>
              </a>
            ))}
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {sent ? (
              <div className="h-full flex flex-col items-center justify-center bg-[#0f172a] border border-emerald-500/20 rounded-2xl p-10 text-center">
                <div className="text-5xl mb-4">🚀</div>
                <h3 className="text-white font-bold text-xl mb-2">Message Sent!</h3>
                <p className="text-slate-400 text-sm">Thanks for reaching out — I&apos;ll get back to you soon.</p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-[#0f172a] border border-white/5 rounded-2xl p-8 flex flex-col gap-5"
              >
                <div>
                  <label className="block text-xs text-slate-500 font-medium mb-1.5">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="John Doe"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-slate-200 text-sm placeholder-slate-600 focus:outline-none focus:border-sky-500/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-500 font-medium mb-1.5">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="you@company.com"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-slate-200 text-sm placeholder-slate-600 focus:outline-none focus:border-sky-500/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-500 font-medium mb-1.5">Message</label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    placeholder="Tell me about your project..."
                    value={form.message}
                    onChange={handleChange}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-slate-200 text-sm placeholder-slate-600 focus:outline-none focus:border-sky-500/50 transition-colors resize-none"
                  />
                </div>
                {error && (
                  <p className="text-red-400 text-sm text-center">{error}</p>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-400 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-all duration-200 shadow-lg shadow-sky-500/20 hover:shadow-sky-500/40"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <FiSend />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
