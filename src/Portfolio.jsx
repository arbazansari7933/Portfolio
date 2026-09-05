import React, { useEffect, useRef, useState } from "react";
import {
  Check,
  ArrowRight,
  Github,
  Linkedin,
  Mail,
  Phone,
  FileDown,
  ExternalLink,
  Menu,
  X,
} from "lucide-react";
//import resume from "../public/resume.pdf";

const SKILL_GROUPS = [
  { name: "Language", items: ["Java", "JavaScript (ES6+)", "C++"] },
  { name: "Frontend", items: ["React", "HTML5", "CSS3", "Tailwind CSS"] },
  {
    name: "Backend",
    items: ["Node.js", "Express.js", "Socket.IO", "REST APIs", "JWT Auth", "Bcrypt", "RBAC"],
  },
  { name: "Database", items: ["PostgreSQL", "MySQL", "Redis", "MongoDB", "Mongoose"] },
  {
    name: "Tools and Deployment",
    items: ["Git", "GitHub", "Linux", "Postman", "VS Code", "Docker", "Docker Compose", "GitHub Actions", "Vercel", "Render", "AWS EC2"],
  },
];

const STACK = [
  "Node.js",
  "MongoDB",
  "React",
  "Express.js",
  "PostgreSQL",
  "Redis",
  "Socket.IO",
  "Docker",
];

const PROJECTS = [
  {
    name: "KGN Collection",
    tag: "Live",
    accent: "emerald",
    github: "https://github.com/arbazansari7933/customer-ledger",
    live: "https://customer-ledger-chi.vercel.app/login",
    desc: "Full-stack POS & inventory system (MERN) for my father's retail shop — QR-based billing and automated inventory cut checkout time by ~85%. 33 REST APIs with JWT auth and role-based access (Owner/Employee/Demo), tracking ₹79.8K+ across 35 live customer accounts and 217+ product SKUs.",
    stack: ["React.js", "Node.js", "Express.js", "MongoDB"],
    bars: [85, 60, 15],
  },
  {
    name: "SentinelTicket",
    tag: "Deployed",
    accent: "violet",
    github: "https://github.com/arbazansari7933/sentinel-ticket",
    desc: "A layered REST API (Routes → Controllers → Services → Repositories) for a movie ticket booking platform. Two-tier concurrency control — Redis distributed locks plus PostgreSQL SELECT FOR UPDATE inside ACID transactions — across a hold → payment → confirm workflow to stop double-booked seats. Dockerized and deployed to AWS EC2 with a GitHub Actions CI/CD pipeline.",
    stack: ["Node.js", "Express.js", "PostgreSQL", "Redis", "Docker", "AWS"],
    bars: [88, 12],
  },
  {
    name: "CryptoSim",
    tag: "Live",
    accent: "sky",
    github: "https://github.com/arbazansari7933/CryptoSim",
    live: "https://cryptosim-gamma.vercel.app/",
    desc: "Real-time MERN crypto trading simulator with live market data for 6 cryptocurrencies. Market and limit orders execute through MongoDB multi-document transactions for atomic trades, with a WebSocket engine streaming Coinbase prices and JWT-secured trading, portfolio, and leaderboard modules.",
    stack: ["React", "Node.js", "Express", "MongoDB", "Socket.IO"],
    bars: [70, 10],
  },
  {
    name: "MultiVendor (E-Commerce Application)",
    tag: "Team Project",
    accent: "amber",
    github: "https://github.com/Jawed-akhtar1/Multivendor_ecommercee",
    desc: "Collaborated as part of a team to containerize an existing multi-vendor e-commerce application using Docker and prepare it for cloud deployment. Handled application deployment on Render and configured the cloud-hosted MySQL database on Aiven, including environment variables and database connectivity.",
    stack: ["Docker", "Spring Boot", "Render", "Aiven"],
    bars: [],
  },
];

const ACCENT = {
  emerald: {
    text: "text-emerald-400",
    border: "border-emerald-500",
    bg: "bg-emerald-500",
    tagBg: "bg-emerald-950",
    tagText: "text-emerald-400",
    tagBorder: "border-emerald-800",
    dot: "bg-emerald-400",
  },
  violet: {
    text: "text-violet-400",
    border: "border-violet-500",
    bg: "bg-violet-500",
    tagBg: "bg-violet-950",
    tagText: "text-violet-400",
    tagBorder: "border-violet-800",
    dot: "bg-violet-400",
  },
  sky: {
    text: "text-sky-400",
    border: "border-sky-500",
    bg: "bg-sky-500",
    tagBg: "bg-sky-950",
    tagText: "text-sky-400",
    tagBorder: "border-sky-800",
    dot: "bg-sky-400",
  },
  amber: {
    text: "text-amber-400",
    border: "border-amber-500",
    bg: "bg-amber-500",
    tagBg: "bg-amber-950",
    tagText: "text-amber-400",
    tagBorder: "border-amber-800",
    dot: "bg-amber-400",
  },
};

const SPIN_FRAMES = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];

const GRADIENT_BTN_STYLE = {
  backgroundImage:
    "linear-gradient(90deg, rgba(147,51,234,0.8), rgba(30,58,138,0.8), rgba(20,184,166,0.8), rgba(16,185,129,0.8), rgba(134,239,172,0.8))",
  backgroundSize: "100% 100%",
  backgroundRepeat: "no-repeat",
  backgroundClip: "padding-box",
  border: "none",
};
const GRADIENT_BTN_CLASS =
  "text-white font-semibold rounded-md transition-opacity hover:opacity-90";

function TermBar({ path, dot1 = "bg-red-500", dot2 = "bg-amber-500", dot3 = "bg-emerald-500" }) {
  return (
    <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-800 bg-zinc-950">
      <span className={`w-2.5 h-2.5 rounded-full ${dot1}`} />
      <span className={`w-2.5 h-2.5 rounded-full ${dot2}`} />
      <span className={`w-2.5 h-2.5 rounded-full ${dot3}`} />
      <span className="ml-2 text-xs text-zinc-600 font-mono">{path}</span>
    </div>
  );
}

function SkillInstaller() {
  const steps = [];
  SKILL_GROUPS.forEach((group) => {
    steps.push({ type: "header", label: group.name });
    group.items.forEach((item) => steps.push({ type: "item", label: item }));
  });

  const [status, setStatus] = useState(steps.map(() => "pending"));
  const [frame, setFrame] = useState(0);
  const [ready, setReady] = useState(false);
  const started = useRef(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started.current) {
            started.current = true;
            runInstall();
          }
        });
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const anyLoading = status.some((s) => s === "loading");
    if (!anyLoading) return;
    const iv = setInterval(() => setFrame((f) => (f + 1) % SPIN_FRAMES.length), 70);
    return () => clearInterval(iv);
  }, [status]);

  function runInstall(i = 0) {
    if (i >= steps.length) {
      setTimeout(() => setReady(true), 200);
      return;
    }
    const isHeader = steps[i].type === "header";
    setStatus((s) => {
      const next = [...s];
      next[i] = isHeader ? "done" : "loading";
      return next;
    });
    setTimeout(
      () => {
        setStatus((s) => {
          const next = [...s];
          next[i] = "done";
          return next;
        });
        runInstall(i + 1);
      },
      isHeader ? 220 : 420
    );
  }

  return (
    <div ref={sectionRef} className="border border-zinc-800 bg-zinc-950 rounded-lg overflow-hidden">
      <TermBar path="~/stack" />
      <div className="p-5 sm:p-6 font-mono text-sm">
        <div className="text-zinc-600 mb-4">$ npm install skills</div>
        <div className="flex flex-col gap-1.5">
          {steps.map((step, i) =>
            step.type === "header" ? (
              <div
                key={`h-${step.label}`}
                className={`text-base sm:text-lg font-bold text-white transition-opacity duration-200 ${status[i] === "pending" ? "opacity-0" : "opacity-100"
                  } ${i === 0 ? "mt-0" : "mt-4"} mb-1`}
              >
                {step.label}
              </div>
            ) : (
              <div
                key={`i-${step.label}`}
                className={`flex items-center gap-3 pl-1 transition-opacity duration-200 ${status[i] === "pending" ? "opacity-0" : "opacity-100"
                  }`}
              >
                <span
                  className={`w-4 text-center ${status[i] === "done" ? "text-emerald-400" : "text-amber-400"
                    }`}
                >
                  {status[i] === "done" ? "✓" : status[i] === "loading" ? SPIN_FRAMES[frame] : ""}
                </span>
                <span className={status[i] === "done" ? "text-zinc-300" : "text-zinc-500"}>
                  {step.label}
                </span>
              </div>
            )
          )}
          {ready && (
            <div className="flex items-center gap-2 text-emerald-400 mt-3">
              <span>▲</span>
              <span>Ready</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ResumeAdmin() {
  const [file, setFile] = useState(null);
  const [secret, setSecret] = useState("");
  const [status, setStatus] = useState("idle"); // idle | uploading | success | error
  const [message, setMessage] = useState("");

  async function handleUpload() {
    if (!file) {
      setMessage("Choose a PDF first.");
      setStatus("error");
      return;
    }
    if (!secret) {
      setMessage("Enter the upload secret.");
      setStatus("error");
      return;
    }
    setStatus("uploading");
    setMessage("");
    try {
      const res = await fetch("/api/upload-resume", {
        method: "POST",
        headers: {
          "x-upload-secret": secret,
          "Content-Type": "application/pdf",
        },
        body: file,
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setMessage("Resume uploaded. It's live at /api/resume now.");
      } else {
        setStatus("error");
        setMessage(data.error || "Upload failed.");
      }
    } catch (err) {
      setStatus("error");
      setMessage(err.message);
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 border border-zinc-700 bg-zinc-950 rounded-lg p-4 w-72 shadow-xl font-mono">
      <div className="text-xs font-bold text-zinc-300 mb-3">Resume Admin</div>
      <input
        type="password"
        placeholder="Upload secret"
        value={secret}
        onChange={(e) => setSecret(e.target.value)}
        className="w-full mb-2 px-2 py-1.5 text-xs bg-zinc-900 border border-zinc-700 rounded text-zinc-200"
      />
      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="w-full mb-3 text-xs text-zinc-400"
      />
      <button
        type="button"
        onClick={handleUpload}
        disabled={status === "uploading"}
        className="w-full text-xs px-3 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 rounded text-white font-semibold transition-colors"
      >
        {status === "uploading" ? "Uploading..." : "Upload Resume"}
      </button>
      {message && (
        <div
          className={`mt-2 text-[11px] ${status === "error" ? "text-red-400" : "text-emerald-400"
            }`}
        >
          {message}
        </div>
      )}
    </div>
  );
}

const NAV_LINKS = [
  { href: "#process", label: "Process" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
];

const EXPERIENCE = [
  {
    date: "Dec 2025 — present",
    role: "Freelance Full-Stack Developer",
    org: "KGN Collection — QR Billing & Stock Manager",
    accent: "text-emerald-400",
    desc: "Built a full-stack MERN POS and inventory system for a real retail shop — 33 REST APIs with JWT auth and role-based access, cutting checkout time by ~85% and tracking ₹79.8K+ across 35 live customer accounts and 217+ SKUs, in continuous production for 3+ months.",
  },
];

function scrollToSection(id) {
  const el = document.getElementById(id);

  if (el) {
    const headerOffset = 80;
    const elementPosition = el.getBoundingClientRect().top;
    const offsetPosition =
      elementPosition + window.scrollY - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
}

export default function Portfolio() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-zinc-100 font-mono">
      {/* HEADER */}
      <header className="sticky top-0 z-20 bg-black/90 backdrop-blur border-b border-zinc-800">
        <div className="max-w-4xl mx-auto flex items-center justify-between px-5 py-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 border-2 border-white flex items-center justify-center font-black text-sm rounded-md">
              A
            </div>
            <span className="font-bold text-sm tracking-tight">arbaz.dev</span>
          </div>

          <nav className="hidden sm:flex gap-6 text-xs text-zinc-400">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(l.href.slice(1));
                }}
                className="hover:text-white"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="/api/resume"
              download
              className="inline-flex items-center gap-1.5 text-xs px-3 sm:px-4 py-2 border border-zinc-700 hover:border-zinc-400 hover:bg-zinc-800 transition-colors rounded-md text-zinc-300"
            >
              <FileDown size={13} /> Resume
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("contact");
              }}
              style={GRADIENT_BTN_STYLE}
              className={`hidden sm:inline-block text-xs px-4 py-2 ${GRADIENT_BTN_CLASS}`}
            >
              Contact
            </a>
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileOpen}
              className="sm:hidden w-9 h-9 flex items-center justify-center border border-zinc-700 hover:border-zinc-400 hover:bg-zinc-800 transition-colors rounded-md text-zinc-300"
            >
              {mobileOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>

        {/* mobile menu */}
        {mobileOpen && (
          <div className="sm:hidden border-t border-zinc-800 bg-black px-5 py-4 flex flex-col gap-4">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => {
                  e.preventDefault();
                  setMobileOpen(false);
                  scrollToSection(l.href.slice(1));
                }}
                className="text-sm text-zinc-300 hover:text-white"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                setMobileOpen(false);
                scrollToSection("contact");
              }}
              style={GRADIENT_BTN_STYLE}
              className={`text-sm px-4 py-2.5 text-center ${GRADIENT_BTN_CLASS}`}
            >
              Contact
            </a>
          </div>
        )}
      </header>

      <main className="max-w-4xl mx-auto px-5">
        {/* HERO */}
        <section className="pt-14 pb-10">
          <div className="text-xs text-emerald-400 mb-3">
            <span className="text-zinc-600">arbaz@bhopal</span>:~$ whoami
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-3">
            Arbaz Ansari
          </h1>
          <p className="text-lg sm:text-xl text-zinc-400 mb-5">
            <span className="bg-gradient-to-r from-white via-violet-300 to-emerald-300 bg-clip-text text-transparent font-semibold">
              Backend-focused full-stack developer
            </span>{" "}
            — MERN stack
          </p>
          <p className="text-sm text-zinc-500 max-w-xl mb-8 leading-relaxed">
            3rd-year CSE student at IES College of Technology, Bhopal, building
            production-grade backend systems — not tutorial projects. One of
            them is running live in my father's retail shop today. Currently
            sharpening DSA for placement season.
          </p>
          <div className="flex flex-wrap gap-3 mb-12">
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("projects");
              }}
              className="flex items-center gap-2 px-5 py-2.5 border border-zinc-700 text-sm hover:border-zinc-400 rounded-md"
            >
              View projects <ArrowRight size={14} />
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("contact");
              }}
              style={GRADIENT_BTN_STYLE}
              className={`flex items-center gap-2 px-5 py-2.5 text-sm ${GRADIENT_BTN_CLASS}`}
            >
              Get in touch <ArrowRight size={14} />
            </a>
          </div>

          <div className="grid grid-cols-3 border border-zinc-800 rounded-lg overflow-hidden">
            {[
              ["150+", "LeetCode problems solved"],
              ["Top 2%", "DSA using Java NPTEL (IIT KGP)"],
              ["3+", "Projects deployed"],
            ].map(([num, label], i) => (
              <div
                key={num}
                className={`p-4 sm:p-5 ${i !== 2 ? "border-r border-zinc-800" : ""}`}
              >
                <div className="text-lg sm:text-xl font-bold">{num}</div>
                <div className="text-[11px] sm:text-xs text-zinc-500 mt-1">{label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* STACK STRIP */}
        <section className="py-10 border-t border-zinc-900">
          <div className="text-center text-[11px] tracking-wide text-zinc-600 mb-6">
            Built &amp; battle-tested with
          </div>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm text-zinc-400 font-semibold">
            {STACK.map((s) => (
              <span key={s}>{s}</span>
            ))}
          </div>
        </section>

        {/* PROCESS — numbered steps, Render-style */}
        <section id="process" className="py-14 border-t border-zinc-900">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-10">
            Build, ship, maintain.
          </h2>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              {
                n: "1",
                color: "rgba(147,51,234,0.9)",   // purple — start of gradient
                title: "Understand the problem",
                desc: "Start with the real problem, understand the requirements, and focus on what actually needs to be solved before writing code.",
              },
              {
                n: "2",
                color: "rgba(20,184,166,0.9)",   // teal — middle of gradient
                title: "Build for production",
                desc: "Design and develop reliable, scalable solutions with clean architecture, practical engineering, and real-world use cases in mind.",
              },
              {
                n: "3",
                color: "rgba(134,239,172,0.9)",  // light green — end of gradient
                title: "Ship and maintain",
                desc: "Deploy, test, monitor, and continuously improve the product so it stays reliable, useful, and ready to grow.",
              },
            ].map((step) => (
              <div key={step.n}>
                <div className="flex items-center gap-3 mb-3">
                  <div
                    style={{ backgroundColor: step.color }}
                    className="w-6 h-6 text-white flex items-center justify-center text-xs font-bold rounded-md shrink-0"
                  >
                    {step.n}
                  </div>
                  <div className="font-bold text-base">{step.title}</div>
                </div>
                <div className="text-sm text-zinc-500 leading-relaxed">{step.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" className="py-14 border-t border-zinc-900">
          <h2 className="text-xl font-bold mb-6">Skills</h2>
          <SkillInstaller />
        </section>

        {/* PROJECTS */}
        <section id="projects" className="py-14 border-t border-zinc-900">
          <h2 className="text-xl font-bold mb-2">Projects</h2>
          <p className="text-sm text-zinc-500 mb-8">
            Real systems solving real problems — most run beyond just localhost.
          </p>

          <div className="flex flex-col gap-6">
            {PROJECTS.map((p) => {
              const a = ACCENT[p.accent];
              return (
                <div key={p.name} className="border border-zinc-800 bg-zinc-950 rounded-lg overflow-hidden">
                  <TermBar path={`~/projects/${p.name.toLowerCase().replace(/\s+/g, "")}`} />
                  <div className="p-5 sm:p-6">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <h3 className="text-base sm:text-lg font-bold">{p.name}</h3>
                      <div className="flex items-center gap-3 shrink-0 pt-0.5">
                        <span className={`flex items-center gap-1.5 text-xs ${a.text}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${a.dot}`} />
                          {p.tag}
                        </span>
                        {p.live && (
                          <a
                            href={p.live}
                            aria-label={`${p.name} live link`}
                            className="text-zinc-500 hover:text-white"
                          >
                            <ExternalLink size={15} />
                          </a>
                        )}
                        <a
                          href={p.github}
                          aria-label={`${p.name} on GitHub`}
                          className="text-zinc-500 hover:text-white"
                        >
                          <Github size={15} />
                        </a>
                      </div>
                    </div>
                    <p className="text-sm text-zinc-500 leading-relaxed mb-4 max-w-2xl">
                      {p.desc}
                    </p>
                    {p.bars.length > 0 && (
                      <div className="flex flex-col gap-2 mb-4">
                        {p.bars.map((w, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <span
                              className={`w-2.5 text-xs ${i === p.bars.length - 1 && p.bars.length > 1
                                  ? "text-red-500"
                                  : a.text
                                }`}
                            >
                              {i === p.bars.length - 1 && p.bars.length > 1 ? "−" : "+"}
                            </span>
                            <div className="flex-1 h-1.5 bg-zinc-900 rounded-full overflow-hidden">
                              <div
                                className={`h-full ${i === p.bars.length - 1 && p.bars.length > 1
                                    ? "bg-red-500"
                                    : a.bg
                                  }`}
                                style={{ width: `${w}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-zinc-900">
                      {p.stack.map((s) => (
                        <span
                          key={s}
                          className="text-[11px] px-2.5 py-1 bg-zinc-900 border border-zinc-800 text-zinc-400 rounded-full"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* EXPERIENCE */}
        <section id="experience" className="py-14 border-t border-zinc-900">
          <h2 className="text-xl font-bold mb-6">Experience</h2>
          <div className="border border-zinc-800 bg-zinc-950 divide-y divide-zinc-900 rounded-lg overflow-hidden">
            {EXPERIENCE.map((item) => (
              <div key={item.role} className="p-5 sm:p-6">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                  <h3 className="font-bold text-base">{item.role}</h3>
                  <span className="text-xs text-zinc-600">{item.date}</span>
                </div>
                <div className={`text-sm font-semibold mb-2 ${item.accent}`}>{item.org}</div>
                <p className="text-sm text-zinc-500 leading-relaxed max-w-2xl">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="py-14 border-t border-zinc-900 pb-20">
          <h2 className="text-xl font-bold mb-2">Get in touch</h2>
          <p className="text-sm text-zinc-500 mb-8 max-w-xl">
            Open to full-stack and backend roles, freelance projects, and placement
            opportunities. Reach out through any of the channels below.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="mailto:arbazansari7934@gmail.com"
              style={GRADIENT_BTN_STYLE}
              className={`flex items-center gap-2 px-5 py-2.5 text-sm ${GRADIENT_BTN_CLASS}`}
            >
              <Mail size={14} /> Email
            </a>
            <a
              href="https://github.com/arbazansari7933"
              className="flex items-center gap-2 px-5 py-2.5 border border-zinc-700 text-sm hover:border-zinc-400 rounded-md"
            >
              <Github size={14} /> GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/arbazansari7934"
              className="flex items-center gap-2 px-5 py-2.5 border border-zinc-700 text-sm hover:border-zinc-400 rounded-md"
            >
              <Linkedin size={14} /> LinkedIn
            </a>
            <a
              href="/api/resume"
              download
              className="flex items-center gap-2 px-5 py-2.5 border border-zinc-700 text-sm hover:border-zinc-400 rounded-md"
            >
              <FileDown size={14} /> Resume
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-zinc-900 py-6">
        <div className="max-w-4xl mx-auto px-5 text-center text-xs text-zinc-600">
          Arbaz Ansari — Bhopal, India
        </div>
      </footer>

      {typeof window !== "undefined" &&
        window.location.search.includes("admin") && <ResumeAdmin />}
    </div>
  );
}