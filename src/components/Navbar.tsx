"use client";
import { useState, useEffect } from "react";
import { FiMenu, FiX, FiDownload } from "react-icons/fi";
import { FaTerminal } from "react-icons/fa";

const links = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0a0f1e]/90 backdrop-blur-md border-b border-white/5 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-2 text-sky-400 font-bold text-xl">
          <FaTerminal className="text-sky-400" />
          <span className="text-white">mahmud</span>
          <span className="text-sky-400">.devops</span>
        </a>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-slate-400 hover:text-sky-400 text-sm font-medium transition-colors duration-200"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="/Arif_Mahmud_Resume_DevOps.pdf"
              download
              className="flex items-center gap-1.5 border border-sky-500/40 hover:border-sky-400 text-sky-400 hover:text-sky-300 text-sm font-semibold px-4 py-2 rounded-lg transition-colors duration-200"
            >
              <FiDownload className="text-base" />
              Resume
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className="bg-sky-500 hover:bg-sky-400 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors duration-200"
            >
              Hire Me
            </a>
          </li>
        </ul>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-slate-300 text-2xl"
          onClick={() => setOpen(!open)}
        >
          {open ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-[#0a0f1e]/95 backdrop-blur-md border-t border-white/5 px-6 pb-6">
          <ul className="flex flex-col gap-4 pt-4">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block text-slate-300 hover:text-sky-400 text-base font-medium transition-colors"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="/Arif_Mahmud_Resume_DevOps.pdf"
                download
                className="flex items-center justify-center gap-2 border border-sky-500/40 text-sky-400 text-sm font-semibold px-4 py-2 rounded-lg"
              >
                <FiDownload />
                Download Resume
              </a>
            </li>
            <li>
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="block bg-sky-500 hover:bg-sky-400 text-white text-center text-sm font-semibold px-4 py-2 rounded-lg"
              >
                Hire Me
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
