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
  Award,
} from "lucide-react";

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
    name: "SentinelTicket",
    tag: "Deployed",
    accent: "violet",
    github: "https://github.com/arbazansari7933/sentinel-ticket",
    desc: "A layered REST API (Routes → Controllers → Services → Repositories) for a movie ticket booking platform. Two-tier concurrency control — Redis distributed locks plus PostgreSQL SELECT FOR UPDATE inside ACID transactions — across a hold → payment → confirm workflow to stop double-booked seats. Dockerized and deployed to AWS EC2 with a GitHub Actions CI/CD pipeline.",
    stack: ["Node.js", "Express.js", "PostgreSQL", "Redis", "Docker", "AWS"],
    metrics: [],
  },
  {
    name: "CryptoSim",
    tag: "Live",
    accent: "sky",
    github: "https://github.com/arbazansari7933/CryptoSim",
    live: "https://cryptosim-gamma.vercel.app/",
    desc: "Real-time MERN crypto trading simulator with live market data for 6 cryptocurrencies. Market and limit orders execute through MongoDB multi-document transactions for atomic trades, with a WebSocket engine streaming Coinbase prices and JWT-secured trading, portfolio, and leaderboard modules.",
    stack: ["React", "Node.js", "Express", "MongoDB", "Socket.IO"],
    metrics: [{ value: 6, suffix: "", label: "Cryptocurrencies supported" }],
  },
  {
    name: "MultiVendor (E-Commerce Application)",
    tag: "Team Project",
    accent: "amber",
    github: "https://github.com/Jawed-akhtar1/Multivendor_ecommercee",
    desc: "Collaborated as part of a team to containerize an existing multi-vendor e-commerce application using Docker and prepare it for cloud deployment. Handled application deployment on Render and configured the cloud-hosted MySQL database on Aiven, including environment variables and database connectivity.",
    stack: ["Docker", "Spring Boot", "Render", "Aiven"],
    metrics: [],
  },
  {
    name: "Ejaz Constructions",
    tag: "UI Project",
    accent: "rose",
    github: "https://github.com/arbazansari7933/Constructions-website",
    live: "https://ejazconstruction1.netlify.app/",
    desc: "A responsive marketing website UI built with React, Vite, and Tailwind CSS. Component-based, data-driven layout with smooth section transitions and a clean, professional design system built for easy content swaps.",
    stack: ["React", "Vite", "Tailwind CSS"],
    metrics: [],
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
  rose: {
    text: "text-rose-400",
    border: "border-rose-500",
    bg: "bg-rose-500",
    tagBg: "bg-rose-950",
    tagText: "text-rose-400",
    tagBorder: "border-rose-800",
    dot: "bg-rose-400",
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
  "text-white font-semibold rounded-md transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5";

const GRADIENT_RING_IMAGE =
  "conic-gradient(rgba(147,51,234,0.9), rgba(20,184,166,0.9), rgba(134,239,172,0.9), rgba(147,51,234,0.9))";

const HEADING_GRADIENT_STYLE = {
  backgroundImage:
    "linear-gradient(90deg, rgba(147,51,234,1), rgba(30,58,138,1), rgba(20,184,166,1), rgba(16,185,129,1), rgba(134,239,172,1))",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
};

/* ---------- Reveal: scroll-triggered fade+slide-in wrapper ---------- */
function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      } ${className}`}
    >
      {typeof children === "function" ? children(visible) : children}
    </div>
  );
}

/* ---------- useTapHold: keeps a "tapped" state true for a fixed duration
   regardless of how briefly the actual tap/click lasted. This is what makes
   the gradient-ring effect reliably visible on mobile taps, instead of
   depending on the raw (and very short) CSS :active window. ---------- */
function useTapHold(duration = 1400) {
  const [tapped, setTapped] = useState(false);
  const timeoutRef = useRef(null);

  function trigger() {
    setTapped(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setTapped(false), duration);
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return [tapped, trigger];
}

/* ---------- GradientCard: SAME SentinelTicket effect on every card ---------- */
function GradientCard({
  id,
  children,
  delay = 0,
  shine = true,
  activeCardId,
  setActiveCardId,
}) {
  const active = activeCardId === id;

  const activateCard = () => {
    setActiveCardId(id);
  };

  const handlePointerEnter = (e) => {
    // Mouse/pen hover: entering another card immediately switches the effect.
    if (e.pointerType !== "touch") {
      setActiveCardId(id);
    }
  };

  return (
    <Reveal delay={delay}>
      {(visible) => (
        <div
          data-gradient-card="true"
          onPointerDown={activateCard}
          onPointerEnter={handlePointerEnter}
          className={`group relative rounded-lg p-px overflow-hidden transition-all duration-300 ${
            active
              ? "-translate-y-1 shadow-lg shadow-black/40"
              : "hover:-translate-y-1 hover:shadow-lg hover:shadow-black/40"
          }`}
        >
          {/* SAME rotating border used by SentinelTicket */}
          <div
            className={`absolute -inset-full transition-opacity duration-500 animate-spin-border pointer-events-none ${
              active ? "opacity-100" : "opacity-0 group-hover:opacity-100"
            }`}
            style={{ backgroundImage: GRADIENT_RING_IMAGE }}
          />

          {/* SAME inner card styling */}
          <div
            className={`relative bg-zinc-950 border border-zinc-800 rounded-lg overflow-hidden transition-colors duration-300 ${
              active ? "border-transparent" : "group-hover:border-transparent"
            }`}
          >
            {/* SAME shine animation */}
            {shine && (
              <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
                <div
                  className={`absolute inset-y-0 -left-1/2 w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full transition-transform duration-1000 ease-out ${
                    active ? "translate-x-[400%]" : "group-hover:translate-x-[400%]"
                  }`}
                />
              </div>
            )}

            {typeof children === "function"
              ? children(visible, active)
              : children}
          </div>
        </div>
      )}
    </Reveal>
  );
}

/* ---------- GradientButton: border-only rotating gradient ring for plain
   outline buttons (no shine). children can be a plain node or a function
   receiving (tapped), useful for elements like an arrow icon that also
   needs to react to the tap. ---------- */
function GradientButton({
  as: As = "a",
  fill = false,
  className = "",
  innerClassName = "",
  onClick,
  children,
  ...props
}) {
  const [tapped, trigger] = useTapHold(5000);

  function handleClick(e) {
    trigger();
    if (onClick) onClick(e);
  }

  return (
    <span className={`group/gb relative inline-block rounded-md p-px overflow-hidden ${className}`}>
      <span
        className={`absolute -inset-full opacity-0 group-hover/gb:opacity-100 transition-opacity duration-500 animate-spin-border pointer-events-none ${
          tapped ? "opacity-100" : ""
        }`}
        style={{ backgroundImage: GRADIENT_RING_IMAGE }}
      />
      <As
        {...props}
        onClick={handleClick}
        className={`relative bg-black border border-zinc-700 transition-all duration-200 rounded-md hover:border-transparent hover:-translate-y-0.5 ${
          fill ? "hover:bg-zinc-800" : ""
        } ${tapped ? `border-transparent -translate-y-0.5 ${fill ? "bg-zinc-800" : ""}` : ""} ${innerClassName}`}
      >
        {typeof children === "function" ? children(tapped) : children}
      </As>
    </span>
  );
}

/* ---------- CountUp: animates a number from 0 to target once visible ---------- */
function CountUp({ target, suffix = "", duration = 1200 }) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            const startTime = performance.now();
            function tick(now) {
              const progress = Math.min((now - startTime) / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              setValue(Math.round(eased * target));
              if (progress < 1) requestAnimationFrame(tick);
            }
            requestAnimationFrame(tick);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}

/* ---------- ScrollProgress: thin bar tracking page scroll ---------- */
function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function handleScroll() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-0.5 z-30 bg-transparent">
      <div
        style={{
          width: `${progress}%`,
          backgroundImage:
            "linear-gradient(90deg, rgba(147,51,234,0.9), rgba(20,184,166,0.9), rgba(134,239,172,0.9))",
        }}
        className="h-full transition-[width] duration-100 ease-out"
      />
    </div>
  );
}

/* ---------- useRipple: click ripple effect for buttons ---------- */
function useRipple() {
  return function onClick(e) {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const span = document.createElement("span");
    span.className = "ripple-effect";
    span.style.width = span.style.height = `${size}px`;
    span.style.left = `${e.clientX - rect.left - size / 2}px`;
    span.style.top = `${e.clientY - rect.top - size / 2}px`;
    button.appendChild(span);
    setTimeout(() => span.remove(), 600);
  };
}

/* ---------- Typewriter: types out text once on mount ---------- */
function Typewriter({ text, speed = 70, startDelay = 300 }) {
  const [shown, setShown] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    let interval;
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        i += 1;
        setShown(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(interval);
          setDone(true);
        }
      }, speed);
    }, startDelay);
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [text, speed, startDelay]);

  return (
    <>
      {shown}
      {!done && <span className="inline-block w-1.5 h-8 sm:h-10 bg-white ml-1 align-middle animate-blink-cursor" />}
    </>
  );
}

/* ---------- CustomCursor: replaces default pointer on larger screens ---------- */
function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [visible, setVisible] = useState(false);
  const [hoveringInteractive, setHoveringInteractive] = useState(false);

  useEffect(() => {
    function handleMove(e) {
      setPos({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);
      setHoveringInteractive(!!e.target.closest("a, button"));
    }
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [visible]);

  return (
    <div
      className="pointer-events-none fixed z-40 hidden sm:block"
      style={{
        left: pos.x,
        top: pos.y,
        transform: `translate(-50%, -50%) scale(${hoveringInteractive ? 1.8 : 1})`,
        opacity: visible ? 1 : 0,
        transition:
          "transform 150ms ease-out, opacity 200ms ease-out, left 80ms linear, top 80ms linear",
      }}
    >
      <div className="w-5 h-5 rounded-full border border-emerald-400/70" />
    </div>
  );
}

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
    <div ref={sectionRef}>
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
                  className={`w-4 text-center ${status[i] === "done" ? "text-emerald-400 animate-pop-in" : "text-amber-400"
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
    accent: "emerald",
    tag: "Live",
    github: "https://github.com/arbazansari7933/customer-ledger",
    live: "https://customer-ledger-chi.vercel.app/login",
    desc: "Full-stack POS & inventory system (MERN) for my father's retail shop — QR-based billing and automated inventory cut checkout time by ~85%. 33 REST APIs with JWT auth and role-based access (Owner/Employee/Demo), tracking ₹79.8K+ across 35 live customer accounts and 217+ product SKUs, in continuous production for 3+ months.",
    stack: ["React.js", "Node.js", "Express.js", "MongoDB"],
    metrics: [
      { value: 85, suffix: "%", label: "Faster checkout" },
      { value: 35, suffix: "", label: "Live customer accounts" },
      { value: 217, suffix: "+", label: "Product SKUs tracked" },
    ],
  },
];

const CERTIFICATIONS = [
  {
    title: "Data Structures & Algorithms using Java",
    issuer: "NPTEL (IIT Kharagpur)",
    badge: "Top 2% · Elite+ (73%)",
    link: "https://archive.nptel.ac.in/content/noc/NOC25/SEM2/Ecertificates/106/noc25-cs148/Course/NPTEL25CS148S105320071610380559.pdf",
  },
  {
    title: "Problem Solving through Programming in C",
    issuer: "NPTEL (IIT Kharagpur)",
    badge: "Elite+ (64%)",
    link: "https://archive.nptel.ac.in/content/noc/NOC25/SEM1/Ecertificates/106/noc25-cs56/Course/NPTEL25CS56S65570024404404973.pdf",
  },
];

const ACHIEVEMENTS = [
  {
    title: "150+ DSA problems solved on LeetCode",
    detail: "Across arrays, strings, dynamic programming, graphs, and more",
    link: "https://leetcode.com/u/arbazansari7933/",
    linkLabel: "View profile",
  },
  {
    title: "5★ in C++, 4★ in Problem Solving, Java & C",
    detail: "Skill certifications on HackerRank",
    link: "https://www.hackerrank.com/profile/arbazansari7933",
    linkLabel: "View profile",
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
  const [activeCardId, setActiveCardId] = useState(null);

  // Clicking/tapping anywhere outside a card removes the active effect.
  useEffect(() => {
    const handleOutsidePointer = (e) => {
      if (!e.target.closest('[data-gradient-card="true"]')) {
        setActiveCardId(null);
      }
    };

    document.addEventListener("pointerdown", handleOutsidePointer);
    return () => {
      document.removeEventListener("pointerdown", handleOutsidePointer);
    };
  }, []);
  const [activeSection, setActiveSection] = useState("");
  const ripple = useRipple();

  // iOS Safari won't apply :active styles on tap unless a touchstart
  // listener exists somewhere on the page. This is a required no-op fix.
  useEffect(() => {
    document.addEventListener("touchstart", function () {}, false);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.getElementById(l.href.slice(1))).filter(
      Boolean
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-black text-zinc-100 font-mono relative">
      <CustomCursor />
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-violet-600/10 blur-3xl" />
        <div className="absolute top-1/2 -right-32 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 rounded-full bg-teal-500/10 blur-3xl" />
      </div>
      <ScrollProgress />
      {/* HEADER */}
      <header className="sticky top-0 z-20 bg-black/90 backdrop-blur border-b border-zinc-800">
        <div className="max-w-4xl mx-auto flex items-center justify-between px-5 py-4">
          <div className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 border-2 border-white flex items-center justify-center font-black text-sm rounded-md transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110">
              A
            </div>
            <span className="font-bold text-sm tracking-tight">arbaz.dev</span>
          </div>

          <nav className="hidden sm:flex gap-6 text-xs text-zinc-400">
            {NAV_LINKS.map((l) => {
              const isActive = activeSection === l.href.slice(1);
              return (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(l.href.slice(1));
                  }}
                  className={`relative transition-colors duration-200 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-px after:bg-emerald-400 after:transition-all after:duration-300 hover:bg-[linear-gradient(90deg,rgba(147,51,234,1),rgba(30,58,138,1),rgba(20,184,166,1),rgba(16,185,129,1),rgba(134,239,172,1))] hover:bg-clip-text hover:text-transparent active:bg-[linear-gradient(90deg,rgba(147,51,234,1),rgba(30,58,138,1),rgba(20,184,166,1),rgba(16,185,129,1),rgba(134,239,172,1))] active:bg-clip-text active:text-transparent ${
                    isActive ? "text-white after:w-full" : "after:w-0 hover:after:w-full"
                  }`}
                >
                  {l.label}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <GradientButton
              href="/api/resume"
              download
              fill
              innerClassName="inline-flex items-center gap-1.5 text-xs px-3 sm:px-4 py-2 text-zinc-300"
            >
              <FileDown size={13} /> Resume
            </GradientButton>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                ripple(e);
                scrollToSection("contact");
              }}
              style={GRADIENT_BTN_STYLE}
              className={`relative overflow-hidden hidden sm:inline-block text-xs px-4 py-2 ${GRADIENT_BTN_CLASS}`}
            >
              Contact
            </a>
            <GradientButton
              as="button"
              type="button"
              fill
              className="sm:hidden"
              innerClassName="w-9 h-9 flex items-center justify-center text-zinc-300"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={16} /> : <Menu size={16} />}
            </GradientButton>
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
                className="self-start text-sm text-zinc-300 hover:bg-[linear-gradient(90deg,rgba(147,51,234,1),rgba(30,58,138,1),rgba(20,184,166,1),rgba(16,185,129,1),rgba(134,239,172,1))] hover:bg-clip-text hover:text-transparent active:bg-[linear-gradient(90deg,rgba(147,51,234,1),rgba(30,58,138,1),rgba(20,184,166,1),rgba(16,185,129,1),rgba(134,239,172,1))] active:bg-clip-text active:text-transparent"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                ripple(e);
                setMobileOpen(false);
                scrollToSection("contact");
              }}
              style={GRADIENT_BTN_STYLE}
              className={`relative overflow-hidden text-sm px-4 py-2.5 text-center ${GRADIENT_BTN_CLASS}`}
            >
              Contact
            </a>
          </div>
        )}
      </header>

      <main className="relative z-10 max-w-4xl mx-auto px-5">
        {/* HERO */}
        <section className="pt-14 pb-10">
          <div
            className="text-xs text-emerald-400 mb-3 animate-fade-up"
            style={{ animationDelay: "0ms" }}
          >
            <span className="text-zinc-600">arbaz@dev</span>:~$ whoami
            <span className="inline-block w-2 h-4 bg-emerald-400 ml-1 align-middle animate-blink-cursor" />
          </div>
          <h1
            className="text-4xl sm:text-5xl font-bold tracking-tight mb-3 animate-fade-up"
            style={{ animationDelay: "80ms" }}
          >
            <Typewriter text="Arbaz Ansari" />
          </h1>
          <p
            className="text-lg sm:text-xl text-zinc-400 mb-5 animate-fade-up"
            style={{ animationDelay: "160ms" }}
          >
            <span className="bg-gradient-to-r from-white via-violet-300 to-emerald-300 bg-clip-text text-transparent font-semibold animate-gradient-shimmer">
              Backend-focused full-stack developer
            </span>{" "}
            — MERN stack
          </p>
          <p
            className="text-sm text-zinc-500 max-w-xl mb-8 leading-relaxed animate-fade-up"
            style={{ animationDelay: "240ms" }}
          >
            3rd-year CSE student at IES College of Technology, Bhopal, building
            practical software that solves real problems—not just tutorial
            projects. I've built applications ranging from a retail management
            system used in a real business to CryptoSim, a real-time crypto
            trading simulator. I enjoy working with backend systems, APIs,
            databases, and real-time applications. Currently sharpening my
            DSA and problem-solving skills for placement season.
          </p>
          <div
            className="flex flex-wrap gap-3 mb-12 animate-fade-up"
            style={{ animationDelay: "320ms" }}
          >
            <GradientButton
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("projects");
              }}
              innerClassName="group flex items-center gap-2 px-5 py-2.5 text-sm"
            >
              {(tapped) => (
                <>
                  View projects{" "}
                  <ArrowRight
                    size={14}
                    className={`transition-transform duration-200 group-hover:translate-x-1 ${
                      tapped ? "translate-x-1" : ""
                    }`}
                  />
                </>
              )}
            </GradientButton>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                ripple(e);
                scrollToSection("contact");
              }}
              style={GRADIENT_BTN_STYLE}
              className={`relative overflow-hidden group flex items-center gap-2 px-5 py-2.5 text-sm ${GRADIENT_BTN_CLASS}`}
            >
              Get in touch{" "}
              <ArrowRight
                size={14}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </a>
          </div>

          <div
            className="grid grid-cols-3 border border-zinc-800 rounded-lg overflow-hidden animate-fade-up"
            style={{ animationDelay: "400ms" }}
          >
            {[
              {
                value: 200,
                suffix: "+",
                label: "LeetCode problems solved",
                href: "https://leetcode.com/u/arbazansari7933/",
              },
              {
                value: null,
                display: "Top 2%",
                label: "DSA using Java NPTEL (IIT KGP)",
                href: "https://archive.nptel.ac.in/content/noc/NOC25/SEM2/Ecertificates/106/noc25-cs148/Course/NPTEL25CS148S105320071610380559.pdf",
              },
              {
                value: 4,
                suffix: "+",
                label: "Projects deployed",
                href: "https://github.com/arbazansari7933",
              },
            ].map((stat, i) => (
              <a
                key={i}
                href={stat.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group/stat relative p-4 sm:p-5 transition-colors duration-200 hover:bg-zinc-900 ${i !== 2 ? "border-r border-zinc-800" : ""}`}
              >
                <ExternalLink
                  size={11}
                  className="absolute top-3 right-3 text-zinc-700 transition-colors duration-200 group-hover/stat:text-zinc-400"
                />
                <div className="text-lg sm:text-xl font-bold">
                  {stat.value !== null ? (
                    <CountUp target={stat.value} suffix={stat.suffix} />
                  ) : (
                    stat.display
                  )}
                </div>
                <div className="text-[11px] sm:text-xs text-zinc-500 mt-1">{stat.label}</div>
              </a>
            ))}
          </div>
        </section>

        {/* STACK STRIP */}
        <section className="py-10 border-t border-zinc-900">
          <div className="text-center text-[11px] tracking-wide text-zinc-600 mb-6">
            Built &amp; battle-tested with
          </div>
          <Reveal>
            <div className="overflow-hidden">
              <div className="flex w-max gap-16 text-sm text-zinc-400 font-semibold animate-marquee">
                {[...STACK, ...STACK].map((s, i) => (
                  <span
                    key={`${s}-${i}`}
                    className="transition-colors duration-200 hover:text-emerald-400 shrink-0"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </section>

        {/* PROCESS — numbered steps, Render-style */}
        <section id="process" className="py-14 border-t border-zinc-900">
          <Reveal>
            <h2 style={HEADING_GRADIENT_STYLE} className="inline-block text-xl sm:text-4xl font-bold tracking-tight mb-10 whitespace-nowrap">
              Build, ship, maintain.
            </h2>
          </Reveal>
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
            ].map((step, i) => (
              <Reveal key={step.n} delay={i * 130}>
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      style={{ backgroundColor: step.color }}
                      className="w-6 h-6 text-white flex items-center justify-center text-xs font-bold rounded-md shrink-0 transition-transform duration-200 hover:scale-110 hover:rotate-3"
                    >
                      {step.n}
                    </div>
                    <div className="font-bold text-base">{step.title}</div>
                  </div>
                  <div className="text-sm text-zinc-500 leading-relaxed">{step.desc}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" className="py-14 border-t border-zinc-900">
          <Reveal>
            <h2 style={HEADING_GRADIENT_STYLE} className="inline-block text-xl font-bold mb-4">
              Skills
            </h2>
          </Reveal>
          <GradientCard
            id="skills"
            shine={false}
            activeCardId={activeCardId}
            setActiveCardId={setActiveCardId}
          >
            <SkillInstaller />
          </GradientCard>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="py-14 border-t border-zinc-900">
          <Reveal>
            <h2 style={HEADING_GRADIENT_STYLE} className="inline-block text-xl font-bold mb-4">
              Projects
            </h2>
          </Reveal>
          <p className="text-sm text-zinc-500 mb-8">
            Real systems solving real problems — most run beyond just localhost.
          </p>

          <div className="flex flex-col gap-6">
            {PROJECTS.map((p, i) => {
              const a = ACCENT[p.accent];
              return (
                <GradientCard
                  id={`project-${i}`}
                  key={p.name}
                  delay={i * 130}
                  activeCardId={activeCardId}
                  setActiveCardId={setActiveCardId}
                >
                  {(visible) => (
                    <>
                      <TermBar path={`~/projects/${p.name.toLowerCase().replace(/\s+/g, "")}`} />
                      <div className="p-5 sm:p-6">
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <h3 className="text-base sm:text-lg font-bold">{p.name}</h3>
                          <div className="flex items-center gap-3 shrink-0 pt-0.5">
                            <span className={`flex items-center gap-1.5 text-xs ${a.text}`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${a.dot} animate-soft-glow`} />
                              {p.tag}
                            </span>
                            {p.live && (
                              <a
                                href={p.live}
                                aria-label={`${p.name} live link`}
                                className="text-zinc-500 hover:text-white transition-transform duration-200 hover:scale-125"
                              >
                                <ExternalLink size={15} />
                              </a>
                            )}
                            <a
                              href={p.github}
                              aria-label={`${p.name} on GitHub`}
                              className="text-zinc-500 hover:text-white transition-transform duration-200 hover:scale-125"
                            >
                              <Github size={15} />
                            </a>
                          </div>
                        </div>
                        <p className="text-sm text-zinc-500 leading-relaxed mb-4 max-w-2xl">
                          {p.desc}
                        </p>
                        {p.metrics.length > 0 && (
                          <div className="flex flex-wrap gap-6 mb-4 pb-4 border-b border-zinc-900">
                            {p.metrics.map((m, mi) => (
                              <div key={mi} className="flex flex-col">
                                <div className={`text-lg sm:text-xl font-bold ${a.text}`}>
                                  {visible ? (
                                    <CountUp target={m.value} suffix={m.suffix} />
                                  ) : (
                                    "0"
                                  )}
                                </div>
                                <div className="text-[10px] sm:text-[11px] text-zinc-500 mt-0.5">
                                  {m.label}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                        <div className="flex flex-wrap gap-2 pt-4 border-t border-zinc-900">
                          {p.stack.map((s) => (
                            <span
                              key={s}
                              className="text-[11px] px-2.5 py-1 bg-zinc-900 border border-zinc-800 text-zinc-400 rounded-full transition-colors duration-200 hover:border-zinc-600 hover:text-zinc-200"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </GradientCard>
              );
            })}
          </div>
        </section>

        {/* EXPERIENCE */}
        <section id="experience" className="py-14 border-t border-zinc-900">
          <Reveal>
            <h2 style={HEADING_GRADIENT_STYLE} className="inline-block text-xl font-bold mb-4">
              Experience
            </h2>
          </Reveal>
          <div className="flex flex-col gap-6">
            {EXPERIENCE.map((item, i) => {
              const a = ACCENT[item.accent];
              return (
                <GradientCard
                  id={`experience-${i}`}
                  key={item.role}
                  delay={i * 120}
                  activeCardId={activeCardId}
                  setActiveCardId={setActiveCardId}
                >
                  {(visible, tapped) => (
                    <div
                      className={`p-5 sm:p-6 transition-colors duration-200 group-hover:bg-zinc-900 ${
                        tapped ? "bg-zinc-900" : ""
                      }`}
                    >
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                        <h3 className="font-bold text-base">{item.role}</h3>
                        <div className="flex items-center gap-3 shrink-0">
                          <span className="text-xs text-zinc-600">{item.date}</span>
                          {item.tag && (
                            <span className={`flex items-center gap-1.5 text-xs ${a.text}`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${a.dot} animate-soft-glow`} />
                              {item.tag}
                            </span>
                          )}
                          {item.live && (
                            <a
                              href={item.live}
                              aria-label={`${item.org} live link`}
                              className="text-zinc-500 hover:text-white transition-transform duration-200 hover:scale-125"
                            >
                              <ExternalLink size={15} />
                            </a>
                          )}
                          {item.github && (
                            <a
                              href={item.github}
                              aria-label={`${item.org} on GitHub`}
                              className="text-zinc-500 hover:text-white transition-transform duration-200 hover:scale-125"
                            >
                              <Github size={15} />
                            </a>
                          )}
                        </div>
                      </div>
                      <div className={`text-sm font-semibold mb-2 ${a.text}`}>{item.org}</div>
                      <p className="text-sm text-zinc-500 leading-relaxed max-w-2xl mb-4">
                        {item.desc}
                      </p>
                      {item.metrics && item.metrics.length > 0 && (
                        <div className="flex flex-wrap gap-6 mb-4 pb-4 border-b border-zinc-900">
                          {item.metrics.map((m, mi) => (
                            <div key={mi} className="flex flex-col">
                              <div className={`text-lg sm:text-xl font-bold ${a.text}`}>
                                {visible ? (
                                  <CountUp target={m.value} suffix={m.suffix} />
                                ) : (
                                  "0"
                                )}
                              </div>
                              <div className="text-[10px] sm:text-[11px] text-zinc-500 mt-0.5">
                                {m.label}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                      {item.stack && item.stack.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {item.stack.map((s) => (
                            <span
                              key={s}
                              className="text-[11px] px-2.5 py-1 bg-zinc-900 border border-zinc-800 text-zinc-400 rounded-full transition-colors duration-200 hover:border-zinc-600 hover:text-zinc-200"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </GradientCard>
              );
            })}
          </div>
        </section>

        {/* CERTIFICATIONS & ACHIEVEMENTS */}
        <section id="achievements" className="py-14 border-t border-zinc-900">
          <Reveal>
            <h2 style={HEADING_GRADIENT_STYLE} className="inline-block text-xl font-bold mb-4">
              Certifications &amp; Achievements
            </h2>
          </Reveal>

          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <div className="text-xs text-zinc-600 mb-3 tracking-wide">Certifications</div>
              <div className="flex flex-col gap-3">
                {CERTIFICATIONS.map((c, i) => (
                  <GradientCard
                  id={`certification-${i}`}
                  key={c.title}
                  delay={i * 120}
                  activeCardId={activeCardId}
                  setActiveCardId={setActiveCardId}
                >
                    {(visible, tapped) => (
                      <div
                        className={`p-4 sm:p-5 transition-colors duration-200 group-hover:bg-zinc-900 ${
                          tapped ? "bg-zinc-900" : ""
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <Award
                            size={16}
                            className="text-emerald-400 mt-0.5 shrink-0 transition-transform duration-200 group-hover:scale-110 group-hover:rotate-3"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-sm">{c.title}</div>
                            <div className="text-xs text-zinc-500 mt-0.5">{c.issuer}</div>
                            <div className="text-[11px] text-emerald-400 mt-1">{c.badge}</div>
                          </div>
                          <a
                            href={c.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${c.title} certificate`}
                            className="text-zinc-500 hover:text-white transition-transform duration-200 hover:scale-125 shrink-0"
                          >
                            <FileDown size={15} />
                          </a>
                        </div>
                      </div>
                    )}
                  </GradientCard>
                ))}
              </div>
            </div>

            <div>
              <div className="text-xs text-zinc-600 mb-3 tracking-wide">Achievements</div>
              <div className="flex flex-col gap-3">
                {ACHIEVEMENTS.map((ach, i) => (
                  <GradientCard
                  id={`achievement-${i}`}
                  key={ach.title}
                  delay={i * 120}
                  activeCardId={activeCardId}
                  setActiveCardId={setActiveCardId}
                >
                    {(visible, tapped) => (
                      <div
                        className={`p-4 sm:p-5 transition-colors duration-200 group-hover:bg-zinc-900 ${
                          tapped ? "bg-zinc-900" : ""
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <Award
                            size={16}
                            className="text-violet-400 mt-0.5 shrink-0 transition-transform duration-200 group-hover:scale-110 group-hover:rotate-3"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-sm">{ach.title}</div>
                            <div className="text-xs text-zinc-500 mt-0.5">{ach.detail}</div>
                          </div>
                          <a
                            href={ach.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={ach.linkLabel}
                            className="text-zinc-500 hover:text-white transition-transform duration-200 hover:scale-125 shrink-0"
                          >
                            <ExternalLink size={15} />
                          </a>
                        </div>
                      </div>
                    )}
                  </GradientCard>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="py-14 border-t border-zinc-900 pb-20">
          <Reveal>
            <h2 style={HEADING_GRADIENT_STYLE} className="inline-block text-xl font-bold mb-4">
              Get in touch
            </h2>
          </Reveal>
          <p className="text-sm text-zinc-500 mb-8 max-w-xl">
            Open to full-stack and backend roles, freelance projects, and placement
            opportunities. Reach out through any of the channels below.
          </p>
          <Reveal>
            <div className="flex flex-wrap gap-3">
              <a
                href="mailto:arbazansari7934@gmail.com"
                onClick={ripple}
                style={GRADIENT_BTN_STYLE}
                className={`relative overflow-hidden flex items-center gap-2 px-5 py-2.5 text-sm ${GRADIENT_BTN_CLASS}`}
              >
                <Mail size={14} /> Email
              </a>
              <GradientButton
                href="https://github.com/arbazansari7933"
                innerClassName="flex items-center gap-2 px-5 py-2.5 text-sm"
              >
                <Github size={14} /> GitHub
              </GradientButton>
              <GradientButton
                href="https://www.linkedin.com/in/arbazansari7934"
                innerClassName="flex items-center gap-2 px-5 py-2.5 text-sm"
              >
                <Linkedin size={14} /> LinkedIn
              </GradientButton>
              <GradientButton
                href="/api/resume"
                download
                innerClassName="flex items-center gap-2 px-5 py-2.5 text-sm"
              >
                <FileDown size={14} /> Resume
              </GradientButton>
            </div>
          </Reveal>
        </section>
      </main>

      <footer className="relative z-10 border-t border-zinc-900 py-6">
        <Reveal>
          <div className="max-w-4xl mx-auto px-5 text-center text-xs text-zinc-600">
            Arbaz Ansari — Bhopal, India
          </div>
        </Reveal>
      </footer>

      {typeof window !== "undefined" &&
        window.location.search.includes("admin") && <ResumeAdmin />}
    </div>
  );
}
