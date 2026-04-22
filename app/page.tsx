"use client";

import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  Github, Mail, Instagram, Facebook, Twitch,
  ExternalLink, ArrowDown, ChevronRight,
  Trophy, Heart, Smartphone, Globe, Sparkles, MapPin, Code2,
} from "lucide-react";

// ─── DATA ─────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "About",    href: "#about"    },
  { label: "Projects", href: "#projects" },
  { label: "Skills",   href: "#skills"   },
  { label: "Contact",  href: "#contact"  },
];

const PROJECTS = [
  {
    id: "aolc-web",
    icon: <Globe size={14} />,
    category: "Full-Stack Web App",
    categoryStyle: "bg-primary/15 text-primary",
    title: "Acts of Love Community",
    subtitle: "Web Platform",
    description:
      "A comprehensive volunteer & community management platform for non-profits in the Philippines. Handles events, finance, gamification, and real-time coordination for mission-driven teams.",
    features: [
      "QR code event check-in & attendance",
      "Gamification — points, badges, quests, leaderboard",
      "Finance & donation campaign tracking",
      "Real-time notifications via WebSockets",
      "Decision Support System for planning",
      "200+ granular role-based permissions",
    ],
    tech: ["Laravel 12", "Vue 3", "Inertia.js", "TypeScript", "Tailwind CSS v4", "MySQL", "Redis", "PayMongo"],
    live: "https://actsoflovecommunitybeta.site",
    github: null,
    badge: null,
    mockup: "/mockup-web.png",
    mockupAlt: "AOLC Web App",
    mockupBg: "from-primary/20 via-primary/10 to-accent/10",
    flip: false,
  },
  {
    id: "aolc-mobile",
    icon: <Smartphone size={14} />,
    category: "Mobile App",
    categoryStyle: "bg-accent/20 text-yellow-400",
    title: "Acts of Love Community",
    subtitle: "Mobile App",
    description:
      "Companion native app to the AOLC web platform. Biometric auth, QR scanning, real-time activity feeds — built with Expo for volunteers on the go.",
    features: [
      "Biometric authentication (Face ID / fingerprint)",
      "QR code scanner for event check-in",
      "Push notifications for live updates",
      "Real-time volunteer activity feed",
      "Role-based navigation (member vs admin)",
      "Offline caching for poor connectivity",
    ],
    tech: ["React Native", "Expo", "Expo Router", "React Query", "Zustand", "Axios"],
    live: "https://actsoflovecommunitybeta.site",
    github: null,
    badge: null,
    mockup: null,
    mockupAlt: "",
    mockupBg: "from-accent/15 via-yellow-900/10 to-primary/10",
    flip: true,
  },
  {
    id: "lumba",
    icon: <Trophy size={14} />,
    category: "Mobile App · Personal Project",
    categoryStyle: "bg-teal-500/15 text-teal-400",
    title: "Lumba",
    subtitle: "Pickup Volleyball App",
    description:
      "Built out of personal frustration finding pickup games across 10+ Facebook groups. A free-to-install app for Filipino volleyball players — with real game discovery, skill matching, and community.",
    features: [
      "Map-based pickup game discovery",
      "Real-time in-game chat",
      "Skill tier system L1–L5 (survey-based)",
      "Organizer KYC verification",
      "IAP paywall — ₱100 unlock + ₱299 remove ads",
      "Achievements, quests & gamification",
    ],
    tech: ["React Native", "Expo SDK 54", "TypeScript", "Supabase", "NativeWind", "Zustand", "RevenueCat", "AdMob"],
    live: null,
    github: "https://github.com/jersonlumpas23-eng/lumba",
    badge: "✨ First Mobile App",
    mockup: "/mockup-mobile.png",
    mockupAlt: "Lumba App",
    mockupBg: "from-teal-900/30 via-teal-900/10 to-primary/15",
    flip: false,
  },
];

const SKILL_GROUPS = [
  { label: "Languages",    icon: "{ }", color: "text-primary",    bg: "bg-primary/15",   skills: ["TypeScript", "PHP", "JavaScript", "SQL"] },
  { label: "Frontend",     icon: "◻",  color: "text-primary",    bg: "bg-primary/15",   skills: ["Vue 3", "React Native", "Expo", "Tailwind CSS", "NativeWind", "Inertia.js"] },
  { label: "Backend",      icon: "⚡", color: "text-yellow-400", bg: "bg-accent/15",    skills: ["Laravel 12", "Supabase", "Node.js"] },
  { label: "Database",     icon: "▤",  color: "text-primary",    bg: "bg-primary/15",   skills: ["MySQL", "PostgreSQL", "Redis"] },
  { label: "Mobile",       icon: "▣",  color: "text-teal-400",   bg: "bg-teal-500/15",  skills: ["React Native", "Expo SDK", "RevenueCat", "AdMob", "expo-router", "EAS Build"] },
  { label: "Tools & Other",icon: "◈",  color: "text-yellow-400", bg: "bg-accent/15",    skills: ["Git", "GitHub", "Figma", "WebSockets", "REST APIs", "Row-Level Security", "PayMongo"] },
];

const SOCIALS = [
  { icon: Github,    href: "https://github.com/jersonlumpas23-eng",            label: "GitHub"    },
  { icon: Facebook,  href: "https://www.facebook.com/jerson.lumpas.2024",      label: "Facebook"  },
  { icon: Instagram, href: "https://www.instagram.com/jersonlumpas23/",        label: "Instagram" },
  { icon: Twitch,    href: "https://www.twitch.tv/shoyobabi",                  label: "Twitch"    },
];

const TAGS = [
  { icon: <MapPin size={12} />,    label: "Philippines"       },
  { icon: <Trophy size={12} />,    label: "Volleyball Player" },
  { icon: <Code2 size={12} />,     label: "Vibe Coder"        },
  { icon: <Heart size={12} />,     label: "Community Builder" },
  { icon: <Sparkles size={12} />,  label: "Solo Dev"          },
];

// ─── ANIMATION HELPERS ────────────────────────────────────────────────────────

const fadeUp = {
  hidden:  { opacity: 0, y: 28, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0,  filter: "blur(0px)", transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};
const fadeIn = {
  hidden:  { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1,    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};
const stagger     = { hidden: {}, visible: { transition: { staggerChildren: 0.10 } } };
const staggerFast = { hidden: {}, visible: { transition: { staggerChildren: 0.065 } } };

// ─── REUSABLE COMPONENTS ──────────────────────────────────────────────────────

function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-70px" });
  return (
    <motion.div ref={ref} variants={stagger} initial="hidden" animate={inView ? "visible" : "hidden"} className={className}>
      {children}
    </motion.div>
  );
}

function Mockup3D({ src, alt }: { src: string; alt: string }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cfg     = { stiffness: 180, damping: 22 };
  const rotateX = useSpring(useTransform(mouseY, [-130, 130], [10, -10]), cfg);
  const rotateY = useSpring(useTransform(mouseX, [-130, 130], [-10, 10]), cfg);

  const onMove  = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - (r.left + r.width  / 2));
    mouseY.set(e.clientY - (r.top  + r.height / 2));
  };
  const onLeave = () => { mouseX.set(0); mouseY.set(0); };

  return (
    <motion.div
      onMouseMove={onMove} onMouseLeave={onLeave}
      style={{ perspective: 900, rotateX, rotateY }}
      animate={{ y: [0, -14, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", repeatType: "mirror" }}
      className="relative cursor-default w-full"
    >
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-primary/25 blur-2xl rounded-full" />
      <img src={src} alt={alt} className="relative w-full drop-shadow-2xl select-none" draggable={false} />
    </motion.div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────

export default function Portfolio() {
  const [scrolled, setScrolled] = useState(false);

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const orbY1 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const orbY2 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const orbY3 = useTransform(scrollYProgress, [0, 1], [0, -30]);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <main className="min-h-screen bg-[#0B0D1A] text-[#F0F2FF] overflow-x-hidden">

      {/* ── NAV ─────────────────────────────────────────────────────────── */}
      <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-400 ${
        scrolled ? "bg-[#0B0D1A]/90 backdrop-blur-xl border-b border-white/6 shadow-lg shadow-black/30" : "bg-transparent"
      }`}>
        <div className="max-w-6xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          <motion.a href="#"
            initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}
            className="font-display font-extrabold text-xl text-white"
          >
            JL<span className="text-primary">.</span>
          </motion.a>

          <motion.nav className="hidden md:flex items-center gap-8"
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.12 }}
          >
            {NAV_LINKS.map((l, i) => (
              <motion.a key={l.label} href={l.href}
                initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15 + i * 0.07 }}
                className="text-sm font-medium text-white/40 hover:text-primary transition-colors duration-200 relative group"
              >
                {l.label}
                <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
              </motion.a>
            ))}
            <motion.a href="mailto:jersonlumpas23@gmail.com"
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.45 }}
              className="text-sm font-semibold bg-primary text-white px-5 py-2 rounded-full hover:bg-primary/80 transition-all duration-200 shadow-lg shadow-primary/25"
            >
              Hire Me
            </motion.a>
          </motion.nav>
        </div>
      </header>

      {/* ── HERO ────────────────────────────────────────────────────────── */}
      <section ref={heroRef} id="home"
        className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-16 overflow-hidden"
      >
        {/* Parallax orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div style={{ y: orbY1 }}
            className="absolute top-16 right-[5%] w-[520px] h-[520px] rounded-full bg-primary/12 blur-3xl animate-float" />
          <motion.div style={{ y: orbY2 }}
            className="absolute bottom-16 left-[5%] w-[420px] h-[420px] rounded-full bg-accent/10 blur-3xl animate-float-b" />
          <motion.div style={{ y: orbY3 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-primary/8 blur-3xl animate-float-c" />
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5, delay: 0.5 }}
            className="absolute inset-0 flex items-center justify-center select-none"
          >
            <span className="font-display font-black leading-none tracking-tighter text-[22vw] text-primary/[0.06]" aria-hidden>
              JERSON
            </span>
          </motion.div>
          <div className="absolute inset-0 opacity-[0.06]"
            style={{ backgroundImage: "radial-gradient(circle, #6B95C4 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.92 }} animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 bg-white/8 backdrop-blur-sm border border-primary/25 rounded-full px-4 py-1.5 text-sm text-primary font-semibold mb-8 shadow-lg shadow-primary/10"
          >
            <motion.span
              animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 rounded-full bg-primary"
            />
            4th Year BSIT · Open to Opportunities
          </motion.div>

          <div className="font-display font-extrabold text-[clamp(3rem,10vw,6.5rem)] text-white leading-[0.95] tracking-tight mb-6">
            {["Jerson", "Lumpas"].map((word, wi) => (
              <motion.span key={word}
                initial={{ opacity: 0, y: 40, rotateX: -20 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 0.75, delay: 0.3 + wi * 0.18, ease: [0.22, 1, 0.36, 1] }}
                className={`inline-block ${wi === 0 ? "mr-[0.2em]" : ""}`}
              >
                {wi === 1 ? (
                  <span className="relative inline-block text-primary">
                    {word}
                    <motion.span
                      initial={{ scaleX: 0, originX: 0 }} animate={{ scaleX: 1 }}
                      transition={{ duration: 0.9, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute -bottom-1.5 left-0 right-0 h-[5px] bg-accent rounded-full"
                    />
                  </span>
                ) : word}
              </motion.span>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 18, filter: "blur(6px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.65, delay: 0.55 }}
            className="text-xl md:text-2xl font-display font-semibold text-white/35 mb-4"
          >
            Full-Stack &amp; Mobile Developer
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 14, filter: "blur(4px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.65, delay: 0.68 }}
            className="text-base md:text-lg text-white/30 max-w-lg mx-auto mb-10 leading-relaxed"
          >
            Building real apps that solve real problems — from volleyball courts to volunteer communities.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <motion.a href="#projects"
              whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="group inline-flex items-center gap-2 bg-primary text-white font-semibold px-7 py-3.5 rounded-full shadow-xl shadow-primary/30 hover:bg-primary/80 transition-colors duration-250"
            >
              View My Work
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
            </motion.a>
            <motion.a href="#contact"
              whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="inline-flex items-center gap-2 bg-white/8 text-white font-semibold px-7 py-3.5 rounded-full border border-white/12 hover:border-primary/50 hover:text-primary transition-all duration-250"
            >
              Let's Talk
            </motion.a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/20"
        >
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-1"
          >
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase">scroll</span>
            <ArrowDown size={13} />
          </motion.div>
        </motion.div>
      </section>

      {/* ── ABOUT ───────────────────────────────────────────────────────── */}
      <section id="about" className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <Section>
            <motion.div variants={fadeUp} className="mb-16">
              <span className="inline-block text-xs font-bold text-primary tracking-[0.2em] uppercase mb-3">About Me</span>
              <h2 className="font-display font-extrabold text-4xl md:text-5xl text-white leading-tight">
                The Developer<br /><span className="text-primary">Behind the Code</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-5 gap-10 md:gap-16 items-start">
              <motion.div variants={fadeUp} className="md:col-span-3 space-y-5">
                {[
                  `I'm a <strong class="text-white font-semibold">4th year BSIT student</strong> from the Philippines who doesn't just study development — I actually build and ship things. Not homework projects. Real apps, with real users, solving real pain.`,
                  `I built <strong class="text-primary font-semibold">Acts of Love Community</strong> — a full platform helping non-profit volunteer organizations manage events, track finances, and keep members engaged through gamification. It's live. It's used. It matters.`,
                  `Then, as a volleyball player tired of hunting across 10+ Facebook groups just to find a pickup game, I fixed it myself. Picked up React Native from zero and built <strong class="text-primary font-semibold">Lumba</strong> — solo, from scratch, with full IAP monetization and real-time chat.`,
                  `That's who I am: someone who sees a problem, learns what it takes, and ships the solution.`,
                ].map((text, i) => (
                  <p key={i} className="text-[1.05rem] text-white/50 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: text }} />
                ))}

                <motion.div variants={staggerFast} className="flex flex-wrap gap-2 pt-2">
                  {TAGS.map((t) => (
                    <motion.span key={t.label} variants={fadeIn}
                      whileHover={{ scale: 1.06, y: -2 }}
                      transition={{ type: "spring", stiffness: 400, damping: 15 }}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold bg-white/6 border border-white/10 text-white/45 px-3 py-1.5 rounded-full cursor-default"
                    >
                      {t.icon}{t.label}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>

              <motion.div variants={staggerFast} className="md:col-span-2 grid grid-cols-2 gap-3">
                {[
                  { val: "2",    label: "Production Apps", sub: "Shipped & live"    },
                  { val: "3",    label: "Projects Built",  sub: "Solo, from scratch"},
                  { val: "2026", label: "Graduating",      sub: "BSIT · Philippines"},
                  { val: "∞",   label: "Games Found",     sub: "Thanks to Lumba"   },
                ].map((s) => (
                  <motion.div key={s.label} variants={fadeIn}
                    whileHover={{ scale: 1.04, y: -3 }}
                    transition={{ type: "spring", stiffness: 380, damping: 18 }}
                    className="bg-[#131627] rounded-2xl p-5 border border-white/7 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 transition-colors duration-300 cursor-default"
                  >
                    <div className="font-display font-extrabold text-3xl text-primary mb-1">{s.val}</div>
                    <div className="font-semibold text-white text-sm leading-tight mb-1">{s.label}</div>
                    <div className="text-white/30 text-xs">{s.sub}</div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </Section>
        </div>
      </section>

      {/* ── PROJECTS ────────────────────────────────────────────────────── */}
      <section id="projects" className="py-28 px-6 bg-[#0F1121]/60">
        <div className="max-w-6xl mx-auto">
          <Section>
            <motion.div variants={fadeUp} className="mb-16">
              <span className="inline-block text-xs font-bold text-primary tracking-[0.2em] uppercase mb-3">Projects</span>
              <h2 className="font-display font-extrabold text-4xl md:text-5xl text-white leading-tight mb-4">Things I've Built</h2>
              <p className="text-white/35 text-lg max-w-lg">Every project here is real — live users, real infrastructure, real problems solved.</p>
            </motion.div>

            <div className="space-y-6">
              {PROJECTS.map((p, i) => (
                <motion.div key={p.id} variants={fadeUp} transition={{ delay: i * 0.1 }}
                  className="group rounded-3xl overflow-hidden bg-[#131627] border border-white/7 hover:border-primary/25 hover:shadow-2xl hover:shadow-primary/8 transition-all duration-400"
                >
                  <div className={`grid md:grid-cols-2 ${p.flip ? "md:[&>*:first-child]:order-2 md:[&>*:last-child]:order-1" : ""}`}>

                    {/* ── Text side ── */}
                    <div className="p-8 md:p-10 flex flex-col justify-center">
                      {/* Top accent bar */}
                      <motion.div
                        initial={{ scaleX: 0, originX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        className="h-px bg-gradient-to-r from-primary/60 via-accent/40 to-transparent mb-8 rounded-full"
                      />

                      <div className="flex flex-wrap items-center gap-2 mb-4">
                        <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full ${p.categoryStyle}`}>
                          {p.icon}{p.category}
                        </span>
                        {p.badge && (
                          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-accent/15 text-yellow-400">{p.badge}</span>
                        )}
                      </div>

                      <h3 className="font-display font-extrabold text-2xl md:text-3xl text-white leading-tight mb-1">{p.title}</h3>
                      <p className="text-primary font-semibold text-sm mb-5">{p.subtitle}</p>
                      <p className="text-white/45 text-sm leading-relaxed mb-6">{p.description}</p>

                      <ul className="space-y-2.5 mb-6">
                        {p.features.map((f) => (
                          <li key={f} className="flex items-start gap-2.5 text-xs text-white/45 group-hover:text-white/55 transition-colors duration-300">
                            <span className="mt-[5px] w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />{f}
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap gap-1.5 mb-7">
                        {p.tech.map((t) => (
                          <span key={t} className="text-[11px] font-semibold bg-white/6 text-white/45 px-2.5 py-1 rounded-full border border-white/8">
                            {t}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-4">
                        {p.live && (
                          <a href={p.live} target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/70 transition-colors"
                          >
                            <ExternalLink size={13} />Live Site
                          </a>
                        )}
                        {p.github && (
                          <a href={p.github} target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-sm font-semibold text-white/35 hover:text-white transition-colors"
                          >
                            <Github size={13} />GitHub
                          </a>
                        )}
                      </div>
                    </div>

                    {/* ── Visual side ── */}
                    <div className={`relative bg-gradient-to-br ${p.mockupBg} flex items-center justify-center p-8 md:p-12 min-h-[300px] overflow-hidden`}>
                      {/* bg blobs */}
                      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
                      <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/8 rounded-full blur-3xl" />

                      {p.mockup ? (
                        <div className="relative w-full max-w-sm md:max-w-full">
                          <Mockup3D src={p.mockup} alt={p.mockupAlt} />
                        </div>
                      ) : (
                        /* AOLC Mobile — animated feature badges */
                        <div className="relative flex flex-wrap justify-center gap-3 max-w-xs">
                          {["Biometric Auth", "QR Scanner", "Push Notifications", "Real-time Feed", "Role-based Nav", "Offline Cache"].map((f, fi) => (
                            <motion.span key={f}
                              animate={{ y: [0, fi % 2 === 0 ? -6 : -4, 0] }}
                              transition={{ duration: 3 + fi * 0.4, repeat: Infinity, ease: "easeInOut" }}
                              className="text-xs font-bold bg-white/8 backdrop-blur-sm text-white/60 px-3 py-2 rounded-xl border border-white/10 shadow-md"
                            >
                              {f}
                            </motion.span>
                          ))}
                        </div>
                      )}
                    </div>

                  </div>
                </motion.div>
              ))}
            </div>
          </Section>
        </div>
      </section>

      {/* ── SKILLS ──────────────────────────────────────────────────────── */}
      <section id="skills" className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <Section>
            <motion.div variants={fadeUp} className="mb-16">
              <span className="inline-block text-xs font-bold text-primary tracking-[0.2em] uppercase mb-3">Skills</span>
              <h2 className="font-display font-extrabold text-4xl md:text-5xl text-white leading-tight">My Tech Stack</h2>
            </motion.div>

            <motion.div variants={stagger} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {SKILL_GROUPS.map((g, i) => (
                <motion.div key={g.label} variants={fadeUp}
                  whileHover={{ y: -4, scale: 1.015 }}
                  transition={{ type: "spring", stiffness: 350, damping: 18 }}
                  className="bg-[#131627] rounded-2xl p-6 border border-white/7 hover:border-primary/25 hover:shadow-xl hover:shadow-primary/8 transition-colors duration-300"
                >
                  <div className="flex items-center gap-3 mb-5">
                    <span className={`w-9 h-9 rounded-xl flex items-center justify-center font-display font-black text-sm ${g.bg} ${g.color}`}>
                      {g.icon}
                    </span>
                    <h3 className="font-display font-bold text-white">{g.label}</h3>
                  </div>
                  <motion.div variants={staggerFast} className="flex flex-wrap gap-2">
                    {g.skills.map((s) => (
                      <motion.span key={s} variants={fadeIn}
                        whileHover={{ scale: 1.08, y: -2 }}
                        transition={{ type: "spring", stiffness: 400, damping: 15 }}
                        className="text-sm font-medium bg-white/6 text-white/45 px-3 py-1.5 rounded-full border border-white/8 hover:bg-primary/15 hover:text-primary hover:border-primary/20 transition-all duration-200 cursor-default"
                      >
                        {s}
                      </motion.span>
                    ))}
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </Section>
        </div>
      </section>

      {/* ── CONTACT ─────────────────────────────────────────────────────── */}
      <section id="contact" className="py-28 px-6 bg-[#080912] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-primary/8 blur-3xl rounded-full" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[200px] bg-accent/6 blur-3xl rounded-full" />
        </div>

        <div className="relative max-w-3xl mx-auto text-center">
          <Section>
            <motion.span variants={fadeUp} className="inline-block text-xs font-bold text-primary tracking-[0.2em] uppercase mb-4">
              Contact
            </motion.span>
            <motion.h2 variants={fadeUp} className="font-display font-extrabold text-4xl md:text-[3.5rem] text-white leading-tight mb-5">
              Let's Build Something<br /><span className="text-primary">Together</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-white/28 text-lg mb-10 max-w-sm mx-auto leading-relaxed">
              Graduating soon and open to work — jobs, freelance, or interesting projects. Let's talk.
            </motion.p>

            <motion.a variants={fadeUp} href="mailto:jersonlumpas23@gmail.com"
              whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 380, damping: 16 }}
              className="inline-flex items-center gap-3 bg-primary text-white font-semibold text-base px-8 py-4 rounded-full shadow-2xl shadow-primary/30 mb-14 hover:bg-primary/80 transition-colors duration-200"
            >
              <Mail size={18} />jersonlumpas23@gmail.com
            </motion.a>

            <motion.div variants={fadeUp} className="flex items-center gap-4 max-w-xs mx-auto mb-10">
              <div className="flex-1 h-px bg-white/8" />
              <span className="text-white/18 text-xs font-bold tracking-widest uppercase">or find me on</span>
              <div className="flex-1 h-px bg-white/8" />
            </motion.div>

            <motion.div variants={staggerFast} className="flex items-center justify-center gap-6">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <motion.a key={label} variants={fadeIn} href={href}
                  target="_blank" rel="noopener noreferrer" aria-label={label}
                  whileHover={{ scale: 1.12, y: -4 }} whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  className="group flex flex-col items-center gap-2 text-white/22 hover:text-white transition-colors duration-200"
                >
                  <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center group-hover:bg-primary/25 group-hover:border-primary/35 transition-all duration-200">
                    <Icon size={18} />
                  </div>
                  <span className="text-[11px] font-semibold">{label}</span>
                </motion.a>
              ))}
            </motion.div>
          </Section>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────────────── */}
      <footer className="bg-[#080912] border-t border-white/5 py-6 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-white/18 text-sm">
          <span className="font-display font-extrabold text-base text-white/25">JL<span className="text-primary">.</span></span>
          <span>© 2026 Jerson Lumpas · Built with Next.js &amp; Tailwind CSS</span>
          <span>Philippines 🇵🇭</span>
        </div>
      </footer>

    </main>
  );
}
