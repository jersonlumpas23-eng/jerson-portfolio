"use client";

import {
  motion, useInView, useScroll, useTransform,
  useSpring, useMotionValue, animate,
} from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  Github, Mail, Instagram, Facebook, Twitch,
  ExternalLink, ArrowDown, ArrowUpRight,
  Trophy, Heart, Smartphone, Globe, Sparkles, MapPin, Code2,
} from "lucide-react";

// ─── DATA ─────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "About",    href: "#about"    },
  { label: "Projects", href: "#projects" },
  { label: "Skills",   href: "#skills"   },
  { label: "Contact",  href: "#contact"  },
];

const MARQUEE = [
  "React Native", "Laravel 12", "Next.js", "TypeScript", "Supabase",
  "Expo SDK 54", "Vue 3", "Tailwind", "PostgreSQL", "Redis", "Inertia.js",
];

const PROJECTS = [
  {
    id: "aolc-web",
    icon: <Globe size={13} />,
    category: "Full-Stack Web App",
    chip: "bg-ink text-paper",
    title: "Acts of Love Community",
    subtitle: "Web Platform",
    description: "A comprehensive volunteer & community management platform for non-profits in the Philippines. Real-time coordination, gamification, and mission-driven tools.",
    features: [
      "QR code event check-in & attendance",
      "Gamification — points, badges, quests, leaderboard",
      "Finance & donation campaign tracking",
      "Real-time WebSocket notifications",
      "Decision Support System for planning",
      "200+ granular role-based permissions",
    ],
    tech: ["Laravel 12", "Vue 3", "Inertia.js", "TypeScript", "Tailwind v4", "MySQL", "Redis", "PayMongo"],
    live: "https://actsoflovecommunity.com",
    github: null, badge: null,
    mockup: "/mockup-web.png", mockupAlt: "AOLC Web App",
    panelBg: "bg-paper-2",
    flip: false,
  },
  {
    id: "aolc-mobile",
    icon: <Smartphone size={13} />,
    category: "Mobile App",
    chip: "bg-lime text-ink",
    title: "Acts of Love Community",
    subtitle: "Mobile App",
    description: "Companion native app to the AOLC web platform. Biometric auth, QR scanning, real-time activity feeds — built with Expo for volunteers on the go.",
    features: [
      "Biometric authentication (Face ID / fingerprint)",
      "QR code scanner for event check-in",
      "Push notifications for live updates",
      "Real-time volunteer activity feed",
      "Role-based navigation (member vs admin)",
      "Offline caching for poor connectivity",
    ],
    tech: ["React Native", "Expo", "Expo Router", "React Query", "Zustand", "Axios"],
    live: "https://actsoflovecommunity.com",
    github: null, badge: null,
    mockup: null, mockupAlt: "",
    panelBg: "bg-lime/20",
    flip: true,
  },
  {
    id: "lumba",
    icon: <Trophy size={13} />,
    category: "Mobile App · Personal Project",
    chip: "bg-ink text-paper",
    title: "Lumba",
    subtitle: "Pickup Volleyball App",
    description: "Built out of personal frustration finding pickup games across 10+ Facebook groups. A free-to-install app for Filipino volleyball players — real discovery, skill matching, community.",
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
    badge: "★ First Mobile App",
    mockup: "/mockup-mobile.png", mockupAlt: "Lumba App",
    panelBg: "bg-paper-2",
    flip: false,
  },
];

const SKILL_GROUPS = [
  { label: "Languages",     icon: "{ }", skills: ["TypeScript","PHP","JavaScript","SQL"] },
  { label: "Frontend",      icon: "◻",  skills: ["Vue 3","React Native","Expo","Tailwind CSS","NativeWind","Inertia.js"] },
  { label: "Backend",       icon: "⚡", skills: ["Laravel 12","Supabase","Node.js"] },
  { label: "Database",      icon: "▤",  skills: ["MySQL","PostgreSQL","Redis"] },
  { label: "Mobile",        icon: "▣",  skills: ["React Native","Expo SDK","RevenueCat","AdMob","expo-router","EAS Build"] },
  { label: "Tools & Other", icon: "◈",  skills: ["Git","GitHub","Figma","WebSockets","REST APIs","Row-Level Security","PayMongo"] },
];

const SOCIALS = [
  { icon: Github,    href: "https://github.com/jersonlumpas23-eng",       label: "GitHub"    },
  { icon: Facebook,  href: "https://www.facebook.com/jerson.lumpas.2024", label: "Facebook"  },
  { icon: Instagram, href: "https://www.instagram.com/jersonlumpas23/",   label: "Instagram" },
  { icon: Twitch,    href: "https://www.twitch.tv/shoyobabi",             label: "Twitch"    },
];

const TAGS = [
  { icon: <MapPin size={12} />,   label: "Philippines"       },
  { icon: <Trophy size={12} />,   label: "Volleyball Player" },
  { icon: <Code2 size={12} />,    label: "Vibe Coder"        },
  { icon: <Heart size={12} />,    label: "Community Builder" },
  { icon: <Sparkles size={12} />, label: "Solo Dev"          },
];

// ─── ANIMATION VARIANTS ───────────────────────────────────────────────────────

const fade3D = {
  hidden:  { opacity: 0, y: 55, rotateX: 14, scale: 0.96, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0,  rotateX: 0,  scale: 1,    filter: "blur(0px)",
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] } },
};

const fadeUp = {
  hidden:  { opacity: 0, y: 30, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0,  filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const fadeIn = {
  hidden:  { opacity: 0, scale: 0.93 },
  visible: { opacity: 1, scale: 1,    transition: { duration: 0.45, ease: [0.22,1,0.36,1] } },
};

const clipReveal = {
  hidden:  { clipPath: "inset(0 0 100% 0)", y: 20 },
  visible: { clipPath: "inset(0 0 0% 0)",   y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
};

const stagger     = { hidden: {}, visible: { transition: { staggerChildren: 0.10 } } };
const staggerFast = { hidden: {}, visible: { transition: { staggerChildren: 0.06 } } };

// ─── PRIMITIVES ───────────────────────────────────────────────────────────────

/* Lime marker-highlight around a word */
function Mark({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative inline-block px-1.5">
      <span className="absolute inset-0 bg-lime" aria-hidden />
      <span className="relative">{children}</span>
    </span>
  );
}

/* Brutalist section header: mono index + thick rule + heading */
function SectionHead({ index, label, children }: { index: string; label: string; children: React.ReactNode }) {
  return (
    <motion.div variants={fadeUp} className="mb-14 border-b-[3px] border-ink pb-5">
      <span className="font-mono text-xs md:text-sm font-bold tracking-[0.2em] text-ink/55 uppercase">
        {index} / {label}
      </span>
      <motion.h2 variants={clipReveal}
        className="font-display font-bold text-4xl md:text-6xl text-ink leading-[0.95] tracking-tight uppercase mt-3"
      >
        {children}
      </motion.h2>
    </motion.div>
  );
}

// ─── PREMIUM COMPONENTS ───────────────────────────────────────────────────────

/* Custom cursor — only renders on pointer devices */
function Cursor() {
  const cx = useMotionValue(-120);
  const cy = useMotionValue(-120);
  const [hover, setHover] = useState(false);
  const [hidden, setHidden] = useState(false);

  const dot = { stiffness: 500, damping: 40 };
  const ring = { stiffness: 160, damping: 22 };

  const dotX  = useSpring(cx, dot);
  const dotY  = useSpring(cy, dot);
  const ringX = useSpring(cx, ring);
  const ringY = useSpring(cy, ring);

  useEffect(() => {
    const move = (e: MouseEvent) => { cx.set(e.clientX); cy.set(e.clientY); setHidden(false); };
    const leave = () => setHidden(true);
    const over  = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setHover(!!(t.closest("a") || t.closest("button")));
    };
    window.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", leave);
    document.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseover", over);
    };
  }, [cx, cy]);

  return (
    <>
      {/* Dot */}
      <motion.div
        style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: hidden ? 0 : 1, scale: hover ? 0 : 1 }}
        transition={{ duration: 0.15 }}
        className="fixed top-0 left-0 w-2 h-2 bg-ink pointer-events-none z-[9999]"
      />
      {/* Ring */}
      <motion.div
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          opacity: hidden ? 0 : 1,
          width:  hover ? 50 : 30,
          height: hover ? 50 : 30,
          backgroundColor: hover ? "rgba(197,242,48,0.5)" : "transparent",
        }}
        transition={{ duration: 0.25, type: "spring", stiffness: 200, damping: 22 }}
        className="fixed top-0 left-0 pointer-events-none z-[9998] border-2 border-ink"
      />
    </>
  );
}

/* Scroll progress bar */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });
  return (
    <motion.div
      style={{ scaleX, transformOrigin: "0%" }}
      className="fixed top-0 left-0 right-0 h-[4px] bg-ink z-[9997]"
    />
  );
}

/* Magnetic button wrapper */
function Magnetic({ children, className }: { children: React.ReactNode; className?: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 20 });
  const sy = useSpring(y, { stiffness: 250, damping: 20 });
  const onMove = (e: React.MouseEvent) => {
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width  / 2)) * 0.28);
    y.set((e.clientY - (r.top  + r.height / 2)) * 0.28);
  };
  const onLeave = () => { x.set(0); y.set(0); };
  return (
    <motion.div style={{ x: sx, y: sy }} onMouseMove={onMove} onMouseLeave={onLeave} className={className}>
      {children}
    </motion.div>
  );
}

/* Animated stat counter */
function Counter({ raw }: { raw: string }) {
  const ref   = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const num   = parseInt(raw);
  useEffect(() => {
    if (!inView || isNaN(num) || !ref.current) return;
    const ctrl = animate(0, num, {
      duration: 2, ease: "easeOut",
      onUpdate: (v) => { if (ref.current) ref.current.textContent = Math.round(v).toString(); },
    });
    return ctrl.stop;
  }, [inView, num]);
  return <span ref={ref}>{isNaN(num) ? raw : "0"}</span>;
}

/* 3D tilt + float mockup */
function Mockup3D({ src, alt }: { src: string; alt: string }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const cfg = { stiffness: 180, damping: 22 };
  const rx  = useSpring(useTransform(my, [-130, 130], [10, -10]), cfg);
  const ry  = useSpring(useTransform(mx, [-130, 130], [-10, 10]), cfg);
  const onMove  = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - (r.left + r.width  / 2));
    my.set(e.clientY - (r.top  + r.height / 2));
  };
  const onLeave = () => { mx.set(0); my.set(0); };
  return (
    <motion.div
      onMouseMove={onMove} onMouseLeave={onLeave}
      style={{ perspective: 900, rotateX: rx, rotateY: ry }}
      animate={{ y: [0, -16, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", repeatType: "mirror" }}
      className="relative cursor-default w-full"
    >
      <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-2/3 h-7 bg-ink/20 blur-xl rounded-full" />
      <img src={src} alt={alt} className="relative w-full select-none" draggable={false}
        style={{ filter: "drop-shadow(8px 10px 0 rgba(17,17,16,0.18))" }} />
    </motion.div>
  );
}

/* Section wrapper with 3D perspective */
function Section3D({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} variants={stagger} initial="hidden" animate={inView ? "visible" : "hidden"}
      style={{ perspective: 1200 }} className={className}>
      {children}
    </motion.div>
  );
}

/* Scrolling brutalist ticker — used as a bold section separator */
function Marquee({ items }: { items: string[] }) {
  const row = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y-[3px] border-ink bg-ink py-3.5">
      <div className="flex w-max animate-marquee whitespace-nowrap">
        {row.map((t, i) => (
          <span key={i} className="mx-7 flex items-center gap-7 font-mono text-sm font-bold uppercase tracking-wider text-paper">
            {t}
            <span className="text-lime">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────

export default function Portfolio() {
  const [scrolled, setScrolled] = useState(false);

  /* Hero scroll-out */
  const heroRef  = useRef(null);
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 480], [1, 0]);
  const heroScale   = useTransform(scrollY, [0, 480], [1, 0.92]);
  const heroBlur    = useTransform(scrollY, [0, 480], [0, 10]);
  const heroY       = useTransform(scrollY, [0, 480], [0, -70]);

  /* Parallax decoration from hero scroll */
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const deco1 = useTransform(heroProgress, [0, 1], [0, -110]);
  const deco2 = useTransform(heroProgress, [0, 1], [0, 70]);
  const deco3 = useTransform(heroProgress, [0, 1], [0, -45]);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      <Cursor />
      <ScrollProgress />

      <main className="min-h-screen bg-paper text-ink overflow-x-hidden">

        {/* ── NAV ─────────────────────────────────────────────────────── */}
        <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b-[3px] ${
          scrolled ? "bg-paper border-ink" : "bg-transparent border-transparent"
        }`}>
          <div className="max-w-6xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
            <motion.a href="#"
              initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}
              className="font-display font-bold text-2xl text-ink tracking-tight"
            >
              JL<span className="text-lime [-webkit-text-stroke:1.5px_#111110]">.</span>
            </motion.a>
            <motion.nav className="hidden md:flex items-center gap-8"
              initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
            >
              {NAV_LINKS.map((l, i) => (
                <motion.a key={l.label} href={l.href}
                  initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.15 + i * 0.07 }}
                  className="font-mono text-xs font-bold uppercase tracking-wider text-ink/70 hover:text-ink transition-colors duration-200 relative group"
                >
                  {l.label}
                  <span className="absolute -bottom-1 left-0 right-0 h-[3px] bg-lime scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
                </motion.a>
              ))}
              <Magnetic>
                <motion.a href="mailto:jersonlumpas23@gmail.com"
                  initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.45 }}
                  className="font-mono text-xs font-bold uppercase tracking-wider bg-lime text-ink px-5 py-2.5 border-[2.5px] border-ink shadow-brutal-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all duration-150"
                >
                  Hire Me
                </motion.a>
              </Magnetic>
            </motion.nav>
          </div>
        </header>

        {/* ── HERO ─────────────────────────────────────────────────────── */}
        <section ref={heroRef} id="home"
          className="relative min-h-screen flex flex-col justify-center px-6 md:px-10 pt-16 overflow-hidden"
        >
          {/* Brutalist parallax background */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* ink dot grid */}
            <div className="absolute inset-0 opacity-[0.6]"
              style={{ backgroundImage: "radial-gradient(circle, rgba(17,17,16,0.16) 1.4px, transparent 1.4px)", backgroundSize: "26px 26px" }} />
            {/* oversized outlined wordmark */}
            <motion.div style={{ y: deco1 }}
              className="absolute -right-[4%] top-[16%] select-none"
              aria-hidden
            >
              <span className="font-display font-bold leading-none tracking-tighter text-[24vw]"
                style={{ color: "transparent", WebkitTextStroke: "2px rgba(17,17,16,0.10)" }}>
                JL
              </span>
            </motion.div>
            {/* sticker badges */}
            <motion.div style={{ y: deco2 }}
              className="hidden md:block absolute top-[24%] right-[10%] -rotate-6 border-[2.5px] border-ink bg-paper px-4 py-2 font-mono text-xs font-bold uppercase shadow-brutal">
              🇵🇭 Philippines
            </motion.div>
            <motion.div style={{ y: deco3 }}
              className="hidden md:block absolute bottom-[24%] right-[18%] rotate-3 border-[2.5px] border-ink bg-lime px-4 py-2 font-mono text-xs font-bold uppercase shadow-brutal">
              Solo Dev
            </motion.div>
          </div>

          {/* Hero content — scroll-driven fade out */}
          <motion.div
            style={{ opacity: heroOpacity, scale: heroScale, y: heroY, filter: useTransform(heroBlur, (v) => `blur(${v}px)`) }}
            className="relative z-10 max-w-6xl mx-auto w-full"
          >
            <div className="max-w-3xl">
              {/* Availability pill */}
              <motion.div
                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="inline-flex items-center gap-2.5 bg-paper border-[2.5px] border-ink px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider mb-8 shadow-brutal-sm"
              >
                <motion.span
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0.4, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2.5 h-2.5 bg-lime border border-ink"
                />
                4th Year BSIT · Open to Opportunities
              </motion.div>

              {/* Name — 3D word reveal */}
              <div style={{ perspective: 800 }}
                className="font-display font-bold text-[clamp(3.2rem,11vw,7.5rem)] text-ink leading-[0.9] tracking-tight uppercase mb-7"
              >
                {["Jerson", "Lumpas"].map((word, wi) => (
                  <motion.div key={word}
                    initial={{ opacity: 0, y: 60, rotateX: -25, filter: "blur(12px)" }}
                    animate={{ opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.85, delay: 0.3 + wi * 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="block"
                  >
                    {wi === 1 ? <Mark>{word}</Mark> : word}
                  </motion.div>
                ))}
              </div>

              {/* Role */}
              <motion.div
                initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
                animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
                transition={{ duration: 0.7, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="font-mono text-base md:text-xl font-bold uppercase tracking-wide text-ink mb-5"
              >
                Full-Stack &amp; Mobile Developer
              </motion.div>

              {/* Tagline */}
              <motion.p
                initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
                animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
                transition={{ duration: 0.7, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
                className="text-base md:text-lg text-ink/70 max-w-xl mb-10 leading-relaxed"
              >
                Building real apps that solve real problems — from volleyball courts to volunteer communities.
              </motion.p>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="flex flex-wrap items-center gap-5"
              >
                <Magnetic>
                  <a href="#projects"
                    className="group inline-flex items-center gap-2 bg-lime text-ink font-mono font-bold uppercase tracking-wider text-sm px-7 py-3.5 border-[2.5px] border-ink shadow-brutal hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none transition-all duration-150"
                  >
                    View My Work
                    <ArrowUpRight size={17} className="group-hover:rotate-45 transition-transform duration-200" />
                  </a>
                </Magnetic>
                <Magnetic>
                  <a href="#contact"
                    className="inline-flex items-center bg-paper text-ink font-mono font-bold uppercase tracking-wider text-sm px-7 py-3.5 border-[2.5px] border-ink shadow-brutal hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none transition-all duration-150"
                  >
                    Let&apos;s Talk
                  </a>
                </Magnetic>
              </motion.div>
            </div>
          </motion.div>

          {/* Scroll cue */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-ink/50"
          >
            <motion.div animate={{ y: [0, 9, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center gap-1"
            >
              <span className="font-mono text-[10px] font-bold tracking-[0.22em] uppercase">scroll</span>
              <ArrowDown size={13} />
            </motion.div>
          </motion.div>
        </section>

        {/* ── MARQUEE ──────────────────────────────────────────────────── */}
        <Marquee items={MARQUEE} />

        {/* ── ABOUT ────────────────────────────────────────────────────── */}
        <section id="about" className="py-24 md:py-28 px-6 md:px-10">
          <div className="max-w-6xl mx-auto">
            <Section3D>
              <SectionHead index="01" label="About">
                The Developer<br />Behind the <Mark>Code</Mark>
              </SectionHead>

              <div className="grid md:grid-cols-5 gap-10 md:gap-14 items-start">
                <motion.div variants={fade3D} className="md:col-span-3 space-y-5">
                  {[
                    `I'm a <strong class="font-bold text-ink">4th year BSIT student</strong> from the Philippines who doesn't just study development — I ship things. Real apps, real users, real problems.`,
                    `I built <strong class="bg-lime px-1 font-bold text-ink">Acts of Love Community</strong> — a full platform for non-profit volunteer orgs. Events, finance, gamification, real-time coordination. It's live and growing.`,
                    `Then, as a volleyball player tired of hunting across 10+ Facebook groups for a pickup game, I fixed it myself. Learned React Native from zero and built <strong class="bg-lime px-1 font-bold text-ink">Lumba</strong> — solo, with full IAP monetization.`,
                    `That's who I am: someone who sees a problem, learns what it takes, and ships the solution.`,
                  ].map((text, i) => (
                    <motion.p key={i} variants={fadeUp} custom={i}
                      className="text-[1.05rem] text-ink/70 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: text }}
                    />
                  ))}

                  <motion.div variants={staggerFast} className="flex flex-wrap gap-2.5 pt-3">
                    {TAGS.map((t) => (
                      <motion.span key={t.label} variants={fadeIn}
                        whileHover={{ y: -2 }}
                        transition={{ type: "spring", stiffness: 400, damping: 15 }}
                        className="inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wide bg-paper border-[2px] border-ink text-ink px-3 py-1.5 hover:bg-lime transition-colors duration-200"
                      >
                        {t.icon}{t.label}
                      </motion.span>
                    ))}
                  </motion.div>
                </motion.div>

                <motion.div variants={staggerFast} className="md:col-span-2 grid grid-cols-2 gap-4">
                  {[
                    { raw: "2",    label: "Production Apps", sub: "Shipped & live"     },
                    { raw: "3",    label: "Projects Built",  sub: "Solo, from scratch" },
                    { raw: "2026", label: "Graduating",      sub: "BSIT · Philippines" },
                    { raw: "∞",   label: "Games Found",     sub: "Thanks to Lumba"    },
                  ].map((s) => (
                    <motion.div key={s.label} variants={fadeIn}
                      style={{ boxShadow: "4px 4px 0 #111110" }}
                      whileHover={{ y: -4, boxShadow: "6px 6px 0 #C5F230" }}
                      transition={{ type: "spring", stiffness: 380, damping: 18 }}
                      className="bg-paper border-[2.5px] border-ink p-5"
                    >
                      <div className="font-display font-bold text-4xl text-ink mb-1">
                        <Counter raw={s.raw} />
                      </div>
                      <div className="font-mono font-bold text-ink text-xs uppercase tracking-wide leading-tight mb-1">{s.label}</div>
                      <div className="text-ink/55 text-xs">{s.sub}</div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </Section3D>
          </div>
        </section>

        {/* ── PROJECTS ─────────────────────────────────────────────────── */}
        <section id="projects" className="py-24 md:py-28 px-6 md:px-10 bg-paper-2 border-y-[3px] border-ink">
          <div className="max-w-6xl mx-auto">
            <Section3D>
              <SectionHead index="02" label="Work">
                Things I&apos;ve <Mark>Built</Mark>
              </SectionHead>
              <motion.p variants={fadeUp} className="text-ink/70 text-lg max-w-xl -mt-8 mb-14">
                Every project here is real — live users, real infrastructure, real problems solved.
              </motion.p>

              <div className="space-y-10" style={{ perspective: 1200 }}>
                {PROJECTS.map((p, i) => (
                  <motion.div key={p.id} variants={fade3D} transition={{ delay: i * 0.1 }}
                    style={{ boxShadow: "7px 7px 0 #111110" }}
                    whileHover={{ boxShadow: "10px 10px 0 #C5F230" }}
                    className="group bg-paper border-[3px] border-ink overflow-hidden"
                  >
                    <div className={`grid md:grid-cols-2 ${p.flip ? "md:[&>*:first-child]:order-2 md:[&>*:last-child]:order-1" : ""}`}>

                      {/* Text */}
                      <div className="p-7 md:p-10 flex flex-col justify-center">
                        <div className="mb-6 inline-flex h-12 w-12 items-center justify-center border-[2.5px] border-ink bg-lime font-display text-xl font-bold text-ink">
                          0{i + 1}
                        </div>
                        <div className="flex flex-wrap items-center gap-2 mb-4">
                          <span className={`inline-flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-wide px-2.5 py-1 border-[2px] border-ink ${p.chip}`}>
                            {p.icon}{p.category}
                          </span>
                          {p.badge && (
                            <span className="font-mono text-[11px] font-bold uppercase tracking-wide px-2.5 py-1 border-[2px] border-ink bg-lime text-ink">{p.badge}</span>
                          )}
                        </div>
                        <h3 className="font-display font-bold text-2xl md:text-3xl text-ink leading-tight tracking-tight uppercase mb-1">{p.title}</h3>
                        <p className="font-mono font-bold text-sm uppercase tracking-wide text-ink/60 mb-5">{p.subtitle}</p>
                        <p className="text-ink/70 text-sm leading-relaxed mb-6">{p.description}</p>
                        <ul className="space-y-2.5 mb-6">
                          {p.features.map((f) => (
                            <li key={f} className="flex items-start gap-2.5 text-xs text-ink/70">
                              <span className="mt-[3px] w-2.5 h-2.5 bg-lime border border-ink flex-shrink-0" />{f}
                            </li>
                          ))}
                        </ul>
                        <div className="flex flex-wrap gap-2 mb-7">
                          {p.tech.map((t) => (
                            <span key={t} className="font-mono text-[11px] font-bold bg-paper text-ink px-2.5 py-1 border-[2px] border-ink hover:bg-lime transition-colors duration-150">
                              {t}
                            </span>
                          ))}
                        </div>
                        <div className="flex flex-wrap items-center gap-3">
                          {p.live && (
                            <a href={p.live} target="_blank" rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wide bg-ink text-paper px-4 py-2.5 border-[2.5px] border-ink shadow-brutal-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all duration-150">
                              <ExternalLink size={13} />Live Site
                            </a>
                          )}
                          {p.github && (
                            <a href={p.github} target="_blank" rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wide bg-paper text-ink px-4 py-2.5 border-[2.5px] border-ink shadow-brutal-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all duration-150">
                              <Github size={13} />GitHub
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Visual */}
                      <div className={`relative ${p.panelBg} flex items-center justify-center p-8 md:p-12 min-h-[300px] overflow-hidden border-t-[3px] md:border-t-0 border-ink ${p.flip ? "md:border-r-[3px]" : "md:border-l-[3px]"}`}>
                        <div className="absolute inset-0 opacity-[0.5]"
                          style={{ backgroundImage: "radial-gradient(circle, rgba(17,17,16,0.18) 1.3px, transparent 1.3px)", backgroundSize: "22px 22px" }} />
                        {p.mockup ? (
                          <div className="relative w-full max-w-sm md:max-w-full">
                            <Mockup3D src={p.mockup} alt={p.mockupAlt} />
                          </div>
                        ) : (
                          <div className="relative flex flex-wrap justify-center gap-3 max-w-xs">
                            {["Biometric Auth", "QR Scanner", "Push Notifications", "Real-time Feed", "Role-based Nav", "Offline Cache"].map((f, fi) => (
                              <motion.span key={f}
                                animate={{ y: [0, fi % 2 === 0 ? -7 : -4, 0] }}
                                transition={{ duration: 3 + fi * 0.5, repeat: Infinity, ease: "easeInOut" }}
                                className="font-mono text-xs font-bold uppercase bg-paper text-ink px-3 py-2 border-[2px] border-ink shadow-brutal-sm"
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
            </Section3D>
          </div>
        </section>

        {/* ── SKILLS ───────────────────────────────────────────────────── */}
        <section id="skills" className="py-24 md:py-28 px-6 md:px-10">
          <div className="max-w-6xl mx-auto">
            <Section3D>
              <SectionHead index="03" label="Stack">
                My Tech <Mark>Stack</Mark>
              </SectionHead>
              <motion.div variants={stagger} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {SKILL_GROUPS.map((g, i) => (
                  <motion.div key={g.label} variants={fade3D}
                    style={{ boxShadow: "4px 4px 0 #111110" }}
                    whileHover={{ y: -5, boxShadow: "7px 7px 0 #C5F230" }}
                    transition={{ type: "spring", stiffness: 350, damping: 18 }}
                    className="bg-paper border-[2.5px] border-ink p-6"
                  >
                    <div className="flex items-center gap-3 mb-5">
                      <span className={`w-10 h-10 border-[2px] border-ink flex items-center justify-center font-display font-bold text-sm ${i % 2 === 0 ? "bg-lime text-ink" : "bg-ink text-lime"}`}>
                        {g.icon}
                      </span>
                      <h3 className="font-display font-bold text-ink uppercase tracking-tight">{g.label}</h3>
                    </div>
                    <motion.div variants={staggerFast} className="flex flex-wrap gap-2">
                      {g.skills.map((s) => (
                        <motion.span key={s} variants={fadeIn}
                          whileHover={{ y: -2 }}
                          transition={{ type: "spring", stiffness: 400, damping: 15 }}
                          className="font-mono text-xs font-bold bg-paper text-ink px-3 py-1.5 border-[2px] border-ink hover:bg-lime transition-colors duration-150 cursor-default"
                        >
                          {s}
                        </motion.span>
                      ))}
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            </Section3D>
          </div>
        </section>

        {/* ── CONTACT ──────────────────────────────────────────────────── */}
        <section id="contact" className="py-24 md:py-28 px-6 md:px-10 bg-paper-2 border-t-[3px] border-ink relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.5] pointer-events-none"
            style={{ backgroundImage: "radial-gradient(circle, rgba(17,17,16,0.12) 1.3px, transparent 1.3px)", backgroundSize: "26px 26px" }} />
          <div className="relative max-w-3xl mx-auto text-center">
            <Section3D>
              <motion.span variants={fadeUp} className="inline-block font-mono text-xs md:text-sm font-bold tracking-[0.2em] text-ink/55 uppercase mb-4">
                04 / Contact
              </motion.span>
              <motion.h2 variants={clipReveal}
                className="font-display font-bold text-4xl md:text-[3.75rem] text-ink leading-[0.95] tracking-tight uppercase mb-6"
              >
                Let&apos;s Build<br />Something <Mark>Together</Mark>
              </motion.h2>
              <motion.p variants={fadeUp} className="text-ink/70 text-lg mb-10 max-w-md mx-auto leading-relaxed">
                Graduating soon and open to work — jobs, freelance, or interesting projects. Let&apos;s talk.
              </motion.p>

              <motion.div variants={fadeUp}>
                <Magnetic className="inline-block">
                  <a href="mailto:jersonlumpas23@gmail.com"
                    className="inline-flex items-center gap-3 bg-lime text-ink font-mono font-bold uppercase tracking-wider text-sm md:text-base px-8 py-4 border-[3px] border-ink shadow-brutal-lg mb-14 hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none transition-all duration-150"
                  >
                    <Mail size={18} />jersonlumpas23@gmail.com
                  </a>
                </Magnetic>
              </motion.div>

              <motion.div variants={fadeUp} className="flex items-center gap-4 max-w-xs mx-auto mb-10">
                <div className="flex-1 h-[2px] bg-ink" />
                <span className="font-mono text-ink/55 text-xs font-bold tracking-widest uppercase">or find me on</span>
                <div className="flex-1 h-[2px] bg-ink" />
              </motion.div>

              <motion.div variants={staggerFast} className="flex items-center justify-center gap-4 md:gap-5">
                {SOCIALS.map(({ icon: Icon, href, label }) => (
                  <motion.a key={label} variants={fadeIn} href={href}
                    target="_blank" rel="noopener noreferrer" aria-label={label}
                    whileHover={{ y: -4, boxShadow: "5px 5px 0 #111110" }} whileTap={{ scale: 0.95 }}
                    style={{ boxShadow: "3px 3px 0 #111110" }}
                    transition={{ type: "spring", stiffness: 400, damping: 18 }}
                    className="group flex items-center justify-center w-12 h-12 bg-paper border-[2.5px] border-ink text-ink hover:bg-lime transition-colors duration-150"
                  >
                    <Icon size={18} />
                  </motion.a>
                ))}
              </motion.div>
            </Section3D>
          </div>
        </section>

        {/* ── FOOTER ───────────────────────────────────────────────────── */}
        <footer className="bg-paper border-t-[3px] border-ink py-6 px-6 md:px-10">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-xs font-bold uppercase tracking-wide text-ink/60">
            <span className="font-display text-base text-ink">JL<span className="text-lime [-webkit-text-stroke:1px_#111110]">.</span></span>
            <span>© 2026 Jerson Lumpas · Built with Next.js &amp; Tailwind CSS</span>
            <span>Philippines 🇵🇭</span>
          </div>
        </footer>

      </main>
    </>
  );
}
