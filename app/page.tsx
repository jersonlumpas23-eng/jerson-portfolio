"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  Github,
  Mail,
  Instagram,
  Facebook,
  Twitch,
  ExternalLink,
  ArrowDown,
  ChevronRight,
  MapPin,
  Trophy,
  Heart,
  Smartphone,
  Globe,
  Sparkles,
} from "lucide-react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

const PROJECTS = [
  {
    id: "aolc-web",
    icon: <Globe size={20} />,
    category: "Full-Stack Web App",
    categoryStyle: "bg-primary/10 text-primary",
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
    tech: ["Laravel 12", "Vue 3", "Inertia.js", "TypeScript", "Tailwind CSS v4", "MySQL", "Redis", "PayMongo", "WebSockets"],
    live: "https://actsoflovecommunitybeta.site",
    github: null,
    badge: null,
    accentClass: "from-primary/5 to-primary/10",
    borderHover: "hover:border-primary/30",
  },
  {
    id: "aolc-mobile",
    icon: <Smartphone size={20} />,
    category: "Mobile App",
    categoryStyle: "bg-accent/20 text-yellow-700",
    title: "Acts of Love Community",
    subtitle: "Mobile App",
    description:
      "Companion native app to the AOLC web platform. Built from the ground up with Expo, featuring biometric auth, QR scanning, and a real-time activity feed for volunteers on the go.",
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
    accentClass: "from-accent/5 to-accent/10",
    borderHover: "hover:border-accent/40",
  },
  {
    id: "lumba",
    icon: <Trophy size={20} />,
    category: "Mobile App · Personal Project",
    categoryStyle: "bg-teal-50 text-teal-700",
    title: "Lumba",
    subtitle: "Pickup Volleyball App",
    description:
      "Built out of personal frustration finding pickup games across 10+ Facebook groups. Lumba is a free-to-install app for Filipino volleyball players — with real game discovery, skill matching, and community features.",
    features: [
      "Map-based pickup game discovery",
      "Real-time in-game chat",
      "Skill tier system L1–L5 (survey-based)",
      "Organizer KYC verification",
      "IAP paywall — ₱100 unlock + ₱299 remove ads",
      "Achievements, quests & gamification",
    ],
    tech: ["React Native", "Expo SDK 54", "TypeScript", "Supabase", "NativeWind", "Zustand", "RevenueCat", "Google AdMob"],
    live: null,
    github: "https://github.com/jersonlumpas23-eng/lumba",
    badge: "✨ First Mobile App",
    accentClass: "from-teal-50/50 to-teal-50",
    borderHover: "hover:border-teal-200",
  },
];

const SKILL_GROUPS = [
  {
    label: "Languages",
    icon: "{ }",
    color: "text-primary",
    bg: "bg-primary/8",
    skills: ["TypeScript", "PHP", "JavaScript", "SQL"],
  },
  {
    label: "Frontend",
    icon: "◻",
    color: "text-primary",
    bg: "bg-primary/8",
    skills: ["Vue 3", "React Native", "Expo", "Tailwind CSS", "NativeWind", "Inertia.js"],
  },
  {
    label: "Backend",
    icon: "⚡",
    color: "text-accent",
    bg: "bg-accent/10",
    skills: ["Laravel 12", "Supabase", "Node.js"],
  },
  {
    label: "Database",
    icon: "▤",
    color: "text-primary",
    bg: "bg-primary/8",
    skills: ["MySQL", "PostgreSQL", "Redis"],
  },
  {
    label: "Mobile",
    icon: "▣",
    color: "text-teal-600",
    bg: "bg-teal-50",
    skills: ["React Native", "Expo SDK", "RevenueCat", "AdMob", "expo-router", "EAS Build"],
  },
  {
    label: "Tools & Other",
    icon: "◈",
    color: "text-accent",
    bg: "bg-accent/10",
    skills: ["Git", "GitHub", "Figma", "WebSockets", "REST APIs", "Row-Level Security", "PayMongo"],
  },
];

const SOCIALS = [
  { icon: Github, href: "https://github.com/jersonlumpas23-eng", label: "GitHub" },
  { icon: Facebook, href: "https://www.facebook.com/jerson.lumpas.2024", label: "Facebook" },
  { icon: Instagram, href: "https://www.instagram.com/jersonlumpas23/", label: "Instagram" },
  { icon: Twitch, href: "https://www.twitch.tv/shoyobabi", label: "Twitch" },
];

// ─── ANIMATION HELPERS ───────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

function Section({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      variants={stagger}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────

export default function Portfolio() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main className="min-h-screen bg-[#F8F9FC] text-ink overflow-x-hidden">

      {/* ── NAV ─────────────────────────────────────────────────────────── */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white/80 backdrop-blur-md shadow-sm shadow-ink/5" : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          <motion.a
            href="#"
            className="font-display font-extrabold text-xl text-ink"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            JL<span className="text-primary">.</span>
          </motion.a>

          <motion.nav
            className="hidden md:flex items-center gap-8"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {NAV_LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-sm font-medium text-ink/50 hover:text-primary transition-colors duration-200"
              >
                {l.label}
              </a>
            ))}
            <a
              href="mailto:jersonlumpas23@gmail.com"
              className="text-sm font-semibold bg-ink text-white px-5 py-2 rounded-full hover:bg-primary transition-all duration-200"
            >
              Hire Me
            </a>
          </motion.nav>
        </div>
      </header>

      {/* ── HERO ────────────────────────────────────────────────────────── */}
      <section
        id="home"
        className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-16 overflow-hidden"
      >
        {/* Bg blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-16 right-[5%] w-[480px] h-[480px] rounded-full bg-primary/10 blur-3xl animate-float" />
          <div className="absolute bottom-16 left-[5%] w-[400px] h-[400px] rounded-full bg-accent/15 blur-3xl animate-float-b" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] rounded-full bg-primary/5 blur-3xl animate-float-c" />

          {/* Watermark */}
          <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none">
            <span
              className="font-display font-black leading-none tracking-tighter text-[22vw] text-primary/[0.04]"
              aria-hidden
            >
              JERSON
            </span>
          </div>

          {/* Subtle dot grid */}
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage: "radial-gradient(circle, #1E2235 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="inline-flex items-center gap-2 bg-white border border-primary/20 rounded-full px-4 py-1.5 text-sm text-primary font-semibold mb-8 shadow-sm shadow-primary/10"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            4th Year BSIT · Open to Opportunities
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-extrabold text-[clamp(3rem,10vw,6.5rem)] text-ink leading-[0.95] tracking-tight mb-6"
          >
            Jerson{" "}
            <span className="relative inline-block">
              <span className="text-primary">Lumpas</span>
              {/* Gold underline */}
              <motion.span
                className="absolute -bottom-1.5 left-0 right-0 h-[5px] bg-accent rounded-full"
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.9, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
              />
            </span>
          </motion.h1>

          {/* Role */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-2xl font-display font-semibold text-ink/40 mb-4"
          >
            Full-Stack &amp; Mobile Developer
          </motion.p>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.52 }}
            className="text-base md:text-lg text-ink/40 max-w-lg mx-auto mb-10 leading-relaxed"
          >
            Building real apps that solve real problems — from volleyball courts
            to volunteer communities.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.64 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 bg-ink text-white font-semibold px-7 py-3.5 rounded-full hover:bg-primary transition-all duration-250 shadow-xl shadow-ink/10"
            >
              View My Work
              <ChevronRight
                size={16}
                className="group-hover:translate-x-1 transition-transform duration-200"
              />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-white text-ink font-semibold px-7 py-3.5 rounded-full border border-ink/10 hover:border-primary hover:text-primary transition-all duration-250 shadow-sm"
            >
              Let's Talk
            </a>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-ink/25"
        >
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-1"
          >
            <span className="text-[10px] font-semibold tracking-[0.2em] uppercase">scroll</span>
            <ArrowDown size={13} />
          </motion.div>
        </motion.div>
      </section>

      {/* ── ABOUT ───────────────────────────────────────────────────────── */}
      <section id="about" className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <Section>
            <motion.div variants={fadeUp} className="mb-16">
              <span className="inline-block text-xs font-bold text-primary tracking-[0.18em] uppercase mb-3">
                About Me
              </span>
              <h2 className="font-display font-extrabold text-4xl md:text-5xl text-ink leading-tight">
                The Developer
                <br />
                <span className="text-primary">Behind the Code</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-5 gap-10 md:gap-16 items-start">
              {/* Story */}
              <motion.div variants={fadeUp} className="md:col-span-3 space-y-5">
                <p className="text-[1.05rem] text-ink/65 leading-relaxed">
                  I'm a <strong className="text-ink font-semibold">4th year BSIT student</strong> from
                  the Philippines who doesn't just study development — I actually build and ship things.
                  Not homework projects. Real apps, with real users, solving real pain.
                </p>
                <p className="text-[1.05rem] text-ink/65 leading-relaxed">
                  I built{" "}
                  <strong className="text-primary font-semibold">Acts of Love Community</strong> — a full
                  platform helping non-profit volunteer organizations manage events, track finances, and
                  keep members engaged with gamification. It's live. It's used. It matters.
                </p>
                <p className="text-[1.05rem] text-ink/65 leading-relaxed">
                  Then, as a volleyball player tired of hunting across 10+ Facebook groups just to find a
                  pickup game, I decided to fix it myself. I picked up React Native from zero and built{" "}
                  <strong className="text-primary font-semibold">Lumba</strong> — solo, from scratch, with
                  full IAP monetization, real-time chat, and a skill-matching system.
                </p>
                <p className="text-[1.05rem] text-ink/65 leading-relaxed">
                  That's who I am: someone who sees a problem, learns what it takes, and ships the
                  solution.
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {[
                    { icon: <MapPin size={13} />, label: "Philippines" },
                    { icon: <Trophy size={13} />, label: "Volleyball Player" },
                    { icon: <Heart size={13} />, label: "Community Builder" },
                    { icon: <Sparkles size={13} />, label: "Solo Dev" },
                  ].map((t) => (
                    <span
                      key={t.label}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold bg-white border border-ink/8 text-ink/50 px-3 py-1.5 rounded-full"
                    >
                      {t.icon}
                      {t.label}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Stats */}
              <motion.div variants={fadeUp} className="md:col-span-2 grid grid-cols-2 gap-3">
                {[
                  { val: "2", label: "Production Apps", sub: "Shipped & live" },
                  { val: "3", label: "Projects Built", sub: "Solo, from scratch" },
                  { val: "2026", label: "Graduating", sub: "BSIT · Philippines" },
                  { val: "∞", label: "Games Found", sub: "Thanks to Lumba" },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="bg-white rounded-2xl p-5 border border-ink/5 hover:border-primary/25 hover:shadow-md hover:shadow-primary/5 transition-all duration-300"
                  >
                    <div className="font-display font-extrabold text-3xl text-primary mb-1">
                      {s.val}
                    </div>
                    <div className="font-semibold text-ink text-sm leading-tight mb-1">{s.label}</div>
                    <div className="text-ink/35 text-xs">{s.sub}</div>
                  </div>
                ))}
              </motion.div>
            </div>
          </Section>
        </div>
      </section>

      {/* ── PROJECTS ────────────────────────────────────────────────────── */}
      <section id="projects" className="py-28 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <Section>
            <motion.div variants={fadeUp} className="mb-16">
              <span className="inline-block text-xs font-bold text-primary tracking-[0.18em] uppercase mb-3">
                Projects
              </span>
              <h2 className="font-display font-extrabold text-4xl md:text-5xl text-ink leading-tight mb-4">
                Things I've Built
              </h2>
              <p className="text-ink/45 text-lg max-w-lg">
                Every project here is real — live users, real infrastructure, real problems solved.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-6">
              {PROJECTS.map((p, i) => (
                <motion.article
                  key={p.id}
                  variants={fadeUp}
                  transition={{ delay: i * 0.08 }}
                  className={`group relative bg-gradient-to-b ${p.accentClass} rounded-3xl p-6 border border-ink/5 ${p.borderHover} hover:shadow-xl hover:shadow-ink/5 transition-all duration-350 flex flex-col`}
                >
                  {/* Category + badge */}
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full ${p.categoryStyle}`}>
                      {p.icon}
                      {p.category}
                    </span>
                    {p.badge && (
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-accent/20 text-yellow-700">
                        {p.badge}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="font-display font-extrabold text-xl text-ink leading-tight mb-0.5">
                    {p.title}
                  </h3>
                  <p className="text-primary font-semibold text-sm mb-4">{p.subtitle}</p>

                  {/* Description */}
                  <p className="text-ink/55 text-sm leading-relaxed mb-5 flex-1">
                    {p.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2 mb-5">
                    {p.features.slice(0, 4).map((f) => (
                      <li key={f} className="flex items-start gap-2 text-xs text-ink/55">
                        <span className="mt-[5px] w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                    {p.features.length > 4 && (
                      <li className="text-xs text-ink/35 pl-3.5">
                        +{p.features.length - 4} more features
                      </li>
                    )}
                  </ul>

                  {/* Tech pills */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {p.tech.slice(0, 5).map((t) => (
                      <span
                        key={t}
                        className="text-[11px] font-semibold bg-white/80 text-ink/55 px-2.5 py-1 rounded-full border border-ink/6"
                      >
                        {t}
                      </span>
                    ))}
                    {p.tech.length > 5 && (
                      <span className="text-[11px] font-semibold bg-white/80 text-ink/35 px-2.5 py-1 rounded-full border border-ink/6">
                        +{p.tech.length - 5}
                      </span>
                    )}
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-4 pt-4 border-t border-ink/6">
                    {p.live && (
                      <a
                        href={p.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/70 transition-colors"
                      >
                        <ExternalLink size={13} />
                        Live Site
                      </a>
                    )}
                    {p.github && (
                      <a
                        href={p.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink/45 hover:text-ink transition-colors"
                      >
                        <Github size={13} />
                        GitHub
                      </a>
                    )}
                  </div>
                </motion.article>
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
              <span className="inline-block text-xs font-bold text-primary tracking-[0.18em] uppercase mb-3">
                Skills
              </span>
              <h2 className="font-display font-extrabold text-4xl md:text-5xl text-ink leading-tight">
                My Tech Stack
              </h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {SKILL_GROUPS.map((g, i) => (
                <motion.div
                  key={g.label}
                  variants={fadeUp}
                  transition={{ delay: i * 0.07 }}
                  className="bg-white rounded-2xl p-6 border border-ink/5 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-5">
                    <span
                      className={`w-9 h-9 rounded-xl flex items-center justify-center font-display font-black text-base ${g.bg} ${g.color}`}
                    >
                      {g.icon}
                    </span>
                    <h3 className="font-display font-bold text-ink">{g.label}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {g.skills.map((s) => (
                      <span
                        key={s}
                        className="text-sm font-medium bg-[#F8F9FC] text-ink/60 px-3 py-1.5 rounded-full border border-ink/5 hover:bg-primary/8 hover:text-primary hover:border-primary/15 transition-all duration-200 cursor-default"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </Section>
        </div>
      </section>

      {/* ── CONTACT ─────────────────────────────────────────────────────── */}
      <section id="contact" className="py-28 px-6 bg-ink">
        <div className="max-w-3xl mx-auto text-center">
          <Section>
            {/* Eyebrow */}
            <motion.span
              variants={fadeUp}
              className="inline-block text-xs font-bold text-primary tracking-[0.18em] uppercase mb-4"
            >
              Contact
            </motion.span>

            {/* Heading */}
            <motion.h2
              variants={fadeUp}
              className="font-display font-extrabold text-4xl md:text-[3.5rem] text-white leading-tight mb-5"
            >
              Let's Build Something
              <br />
              <span className="text-primary">Together</span>
            </motion.h2>

            {/* Body */}
            <motion.p variants={fadeUp} className="text-white/35 text-lg mb-10 max-w-sm mx-auto leading-relaxed">
              I'm graduating soon and open to work — jobs, freelance, or interesting projects. Let's talk.
            </motion.p>

            {/* Email CTA */}
            <motion.a
              variants={fadeUp}
              href="mailto:jersonlumpas23@gmail.com"
              className="inline-flex items-center gap-3 bg-primary text-white font-semibold text-base px-8 py-4 rounded-full hover:bg-primary/80 transition-all duration-200 shadow-2xl shadow-primary/30 mb-14"
            >
              <Mail size={18} />
              jersonlumpas23@gmail.com
            </motion.a>

            {/* Divider */}
            <motion.div variants={fadeUp} className="flex items-center gap-4 max-w-xs mx-auto mb-10">
              <div className="flex-1 h-px bg-white/8" />
              <span className="text-white/20 text-xs font-semibold tracking-widest uppercase">or find me on</span>
              <div className="flex-1 h-px bg-white/8" />
            </motion.div>

            {/* Socials */}
            <motion.div
              variants={fadeUp}
              className="flex items-center justify-center gap-8"
            >
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="group flex flex-col items-center gap-2 text-white/25 hover:text-white transition-all duration-200"
                >
                  <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center group-hover:bg-primary/20 group-hover:border-primary/30 transition-all duration-200">
                    <Icon size={18} />
                  </div>
                  <span className="text-[11px] font-medium">{label}</span>
                </a>
              ))}
            </motion.div>
          </Section>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────────────── */}
      <footer className="bg-ink border-t border-white/5 py-6 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-white/20 text-sm">
          <span className="font-display font-extrabold text-base text-white/30">
            JL<span className="text-primary">.</span>
          </span>
          <span>© 2026 Jerson Lumpas · Built with Next.js &amp; Tailwind CSS</span>
          <span>Philippines 🇵🇭</span>
        </div>
      </footer>
    </main>
  );
}
