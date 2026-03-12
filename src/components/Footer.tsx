import { FaTerminal } from "react-icons/fa";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-[#0a0f1e] py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-2 text-sky-400 font-bold text-lg">
          <FaTerminal />
          <span className="text-white">mahmud</span>
          <span className="text-sky-400">.devops</span>
        </a>

        {/* Links */}
        <div className="flex gap-6 text-sm text-slate-500">
          {["About", "Skills", "Projects", "Contact"].map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              className="hover:text-sky-400 transition-colors"
            >
              {l}
            </a>
          ))}
        </div>

        {/* Socials */}
        <div className="flex gap-4 text-slate-500 text-xl">
          <a href="https://github.com/mahmud-arif" target="_blank" rel="noopener noreferrer" className="hover:text-sky-400 transition-colors">
            <FiGithub />
          </a>
          <a href="https://www.linkedin.com/in/arif-mahmud-03611a138/" target="_blank" rel="noopener noreferrer" className="hover:text-sky-400 transition-colors">
            <FiLinkedin />
          </a>
          <a href="mailto:mahmudarif1175@gmail.com" className="hover:text-sky-400 transition-colors">
            <FiMail />
          </a>
        </div>
      </div>

      <div className="text-center mt-8 text-slate-600 text-xs">
        © {year} Mahmud. Built with Next.js &amp; Tailwind CSS.
      </div>
    </footer>
  );
}
