"use client";

import { useRef, useState } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Droplets,
  ShieldCheck,
  Sparkles,
  Timer,
  Home,
  Wrench,
  ChevronRight,
  ChevronDown,
  ArrowRight,
  FlaskConical,
  Ruler,
  CheckCircle2,
  Phone,
  Cpu,
  Layers,
  RefreshCw,
  CircuitBoard,
  Filter,
  Zap,
  DollarSign,
  ShowerHead,
  AlertTriangle,
  Check,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useI18n } from "@/lib/i18n/context";

/* ─────────────────── ANIMATION HELPERS ─────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

function AnimatedSection({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={staggerContainer}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────── FAQ ITEM ─────────────────── */

function FAQItem({
  question,
  answer,
  index,
}: {
  question: string;
  answer: string;
  index: number;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="border border-[var(--color-border)] rounded-2xl overflow-hidden bg-white/70 backdrop-blur-sm"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left font-heading text-[var(--color-text-primary)] hover:bg-[var(--color-surface)] transition-colors"
      >
        <span className="text-lg font-semibold">{question}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="shrink-0"
        >
          <ChevronDown className="w-5 h-5 text-[var(--color-secondary)]" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-5 font-body text-[var(--color-text-secondary)] leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─────────────────── IMAGE BREAK ─────────────────── */

function ImageBreak({ src, alt, text }: { src: string; alt: string; text: string }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <section ref={ref} className="relative h-[45vh] min-h-[300px] overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0 -inset-y-[10%]">
        <Image src={src} alt={alt} fill className="object-cover" sizes="100vw" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary-dark)]/50 via-[var(--color-primary-dark)]/20 to-[var(--color-primary-dark)]/50" />
      <div className="relative z-10 h-full flex items-center justify-center px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl text-white text-center max-w-2xl leading-tight"
        >
          {text}
        </motion.p>
      </div>
    </section>
  );
}

/* ─────────────────── PAGE ─────────────────── */

export default function CityWaterPage() {
  const { t } = useI18n();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const p = t.cityWaterPage as any;

  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroScroll, [0, 1], [0, 120]);
  const heroOpacity = useTransform(heroScroll, [0, 0.7], [1, 0]);

  const imageRef = useRef(null);
  const { scrollYProgress: imgScroll } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  });
  const imgScale = useTransform(imgScroll, [0, 0.5], [0.92, 1]);
  const imgY = useTransform(imgScroll, [0, 1], [40, -40]);

  const benefitIcons = [Droplets, ShieldCheck, Sparkles, Timer, Wrench, Home];
  const benefits = Array.from({ length: 6 }, (_, i) => ({
    icon: benefitIcons[i],
    title: p[`benefit${i + 1}Title` as keyof typeof p] as string,
    description: p[`benefit${i + 1}Description` as keyof typeof p] as string,
  }));

  const stepIcons = [FlaskConical, Ruler, CheckCircle2];
  const steps = Array.from({ length: 3 }, (_, i) => ({
    number: String(i + 1).padStart(2, "0"),
    icon: stepIcons[i],
    title: p[`step${i + 1}Title` as keyof typeof p] as string,
    description: p[`step${i + 1}Description` as keyof typeof p] as string,
  }));

  const faqs = Array.from({ length: 4 }, (_, i) => ({
    question: p[`faq${i + 1}Question` as keyof typeof p] as string,
    answer: p[`faq${i + 1}Answer` as keyof typeof p] as string,
  }));

  const overviewCards = [
    {
      label: p.overviewCardLabel1,
      detail: p.overviewCardDetail1,
      color: "var(--color-secondary-light)",
    },
    {
      label: p.overviewCardLabel2,
      detail: p.overviewCardDetail2,
      color: "var(--color-accent)",
    },
    {
      label: p.overviewCardLabel3,
      detail: p.overviewCardDetail3,
      color: "var(--color-primary-light)",
    },
    {
      label: p.overviewCardLabel4,
      detail: p.overviewCardDetail4,
      color: "var(--color-accent-light)",
    },
  ];

  const overviewTags = [p.overviewTag1, p.overviewTag2, p.overviewTag3];

  return (
    <>
      <Header />
      <main className="overflow-hidden">
        {/* ─── HERO ─── */}
        <section
          ref={heroRef}
          className="relative min-h-[60vh] md:min-h-[70vh] flex items-center pt-32 pb-20"
          style={{
            background:
              "linear-gradient(135deg, #171751 0%, #1e3a5f 50%, #0e7490 100%)",
          }}
        >
          {/* Video background */}
          <div className="absolute inset-0 overflow-hidden">
            <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
              <source src="/videos/water-vortex.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(23,23,81,0.82) 0%, rgba(30,58,95,0.75) 50%, rgba(14,116,144,0.7) 100%)" }} />
          </div>

          {/* Subtle radial orb accents */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-20 -right-40 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.12)_0%,transparent_70%)]" />
            <div className="absolute bottom-0 -left-20 w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(45,212,191,0.08)_0%,transparent_70%)]" />
          </div>

          <motion.div
            style={{ y: heroY, opacity: heroOpacity }}
            className="relative z-10 max-w-6xl mx-auto px-6 w-full"
          >
            {/* Breadcrumb */}
            <motion.nav
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center gap-2 mb-8 font-body text-sm text-white/60"
            >
              <Link
                href="/"
                className="hover:text-white/90 transition-colors"
              >
                {p.breadcrumbHome}
              </Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-brand-cyan">{p.breadcrumbCurrent}</span>
            </motion.nav>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.2,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="font-heading text-white"
              style={{ fontSize: "var(--text-h1)" }}
            >
              {p.heroTitle}{" "}
              <span className="text-brand-cyan">{p.heroTitleHighlight}</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-5 max-w-2xl text-lg md:text-xl text-white/75 font-body leading-relaxed"
            >
              {p.heroSubtitle}
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[var(--color-accent-light)] text-[var(--color-primary-dark)] font-heading font-semibold text-base hover:brightness-110 transition-all hover:shadow-lg hover:shadow-brand-cyan/20"
              >
                {p.heroCta}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="tel:+19193518261"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/25 text-white font-heading font-semibold text-base hover:bg-white/10 transition-all"
              >
                <Phone className="w-4 h-4" />
                (919) 351-8261
              </a>
            </motion.div>
          </motion.div>

          {/* SVG wave at hero bottom */}
          <div className="absolute bottom-0 left-0 right-0 z-[5]">
            <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-16 md:h-20">
              <path
                d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z"
                fill="white"
              />
              <path
                d="M0,50 C360,80 720,20 1080,50 C1260,65 1380,35 1440,50 L1440,80 L0,80 Z"
                fill="white"
                opacity="0.5"
              />
            </svg>
          </div>
        </section>

        {/* ─── OVERVIEW ─── */}
        <section className="relative py-20 md:py-28">
          {/* Background */}
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 80% 60% at 20% 30%, rgba(6,182,212,0.04) 0%, transparent 70%), radial-gradient(ellipse 60% 50% at 80% 70%, rgba(37,39,114,0.03) 0%, transparent 70%)",
              }}
            />
          </div>

          <div className="relative max-w-6xl mx-auto px-6">
            <AnimatedSection className="grid lg:grid-cols-2 gap-14 items-center">
              {/* Text */}
              <div>
                <motion.span
                  variants={fadeUp}
                  transition={{ duration: 0.5 }}
                  className="inline-block mb-4 px-4 py-1.5 rounded-full bg-[var(--color-surface-alt)] text-[var(--color-secondary)] font-heading text-sm font-semibold tracking-wide uppercase"
                >
                  {p.overviewBadge}
                </motion.span>
                <motion.h2
                  variants={fadeUp}
                  transition={{ duration: 0.6 }}
                  className="font-heading text-[var(--color-text-primary)]"
                  style={{ fontSize: "var(--text-h2)" }}
                >
                  {p.overviewHeadline}
                </motion.h2>
                <motion.p
                  variants={fadeUp}
                  transition={{ duration: 0.5 }}
                  className="mt-5 font-body text-[var(--color-text-secondary)] leading-relaxed text-lg"
                >
                  {p.overviewDescription1}
                </motion.p>
                <motion.p
                  variants={fadeUp}
                  transition={{ duration: 0.5 }}
                  className="mt-4 font-body text-[var(--color-text-secondary)] leading-relaxed"
                >
                  {p.overviewDescription2}
                </motion.p>
                <motion.div
                  variants={fadeUp}
                  transition={{ duration: 0.5 }}
                  className="mt-6 flex flex-wrap gap-3"
                >
                  {overviewTags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-cyan/10 text-[var(--color-secondary)] font-body text-sm font-medium"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {tag}
                    </span>
                  ))}
                </motion.div>
              </div>

              {/* Key benefits */}
              <motion.div
                variants={fadeUp}
                transition={{ duration: 0.6 }}
                className="grid sm:grid-cols-2 gap-4"
              >
                {overviewCards.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{
                      duration: 0.45,
                      delay: i * 0.08,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                    className="group relative p-5 rounded-2xl border border-[var(--color-border)] bg-white hover:shadow-lg hover:shadow-brand-cyan/5 transition-shadow duration-300"
                  >
                    <div
                      className="w-2 h-2 rounded-full mb-3"
                      style={{ backgroundColor: item.color }}
                    />
                    <p className="font-heading font-semibold text-[var(--color-text-primary)]">
                      {item.label}
                    </p>
                    <p className="mt-1 font-body text-sm text-[var(--color-text-secondary)]">
                      {item.detail}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatedSection>
          </div>
        </section>

        {/* ─── IMAGE BREAK: FAUCET ─── */}
        <ImageBreak src="/images/water/clean-faucet.jpeg" alt="Clean filtered faucet water" text="Pure Water From Every Faucet" />

        {/* ─── HOW IT WORKS ─── */}
        <section className="relative py-20 md:py-28">
          {/* Background */}
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, var(--color-surface) 0%, rgba(248,250,255,0.5) 100%)",
              }}
            />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent" />
            <div className="absolute top-1/4 right-10 w-[350px] h-[350px] rounded-full bg-[radial-gradient(circle,rgba(37,39,114,0.04)_0%,transparent_70%)]" />
          </div>

          <div className="relative max-w-6xl mx-auto px-6">
            <AnimatedSection className="text-center mb-16">
              <motion.span
                variants={fadeUp}
                transition={{ duration: 0.5 }}
                className="inline-block mb-4 px-4 py-1.5 rounded-full bg-[var(--color-surface-alt)] text-[var(--color-secondary)] font-heading text-sm font-semibold tracking-wide uppercase"
              >
                {p.processBadge}
              </motion.span>
              <motion.h2
                variants={fadeUp}
                transition={{ duration: 0.6 }}
                className="font-heading text-[var(--color-text-primary)]"
                style={{ fontSize: "var(--text-h2)" }}
              >
                {p.processHeadline}
              </motion.h2>
              <motion.p
                variants={fadeUp}
                transition={{ duration: 0.5 }}
                className="mt-4 max-w-2xl mx-auto font-body text-[var(--color-text-secondary)] text-lg leading-relaxed"
              >
                {p.processDescription}
              </motion.p>
            </AnimatedSection>

            <div className="grid md:grid-cols-3 gap-8">
              {steps.map((step, i) => (
                  <motion.div
                    key={step.number}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{
                      duration: 0.6,
                      delay: i * 0.15,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                    className="relative group"
                  >
                    {/* Connector line */}
                    {i < steps.length - 1 && (
                      <div className="hidden md:block absolute top-12 left-[calc(50%+40px)] right-[calc(-50%+40px)] h-px bg-gradient-to-r from-[var(--color-border)] to-transparent" />
                    )}
                    <div className="relative p-8 rounded-2xl border border-[var(--color-border)] bg-white hover:shadow-lg hover:shadow-brand-cyan/5 transition-all duration-300">
                      <div className="flex items-center gap-4 mb-5">
                        <span className="font-heading text-4xl font-bold text-brand-cyan/20">
                          {step.number}
                        </span>
                        <div className="w-12 h-12 rounded-xl bg-[var(--color-surface-alt)] flex items-center justify-center group-hover:bg-brand-cyan/10 transition-colors">
                          <step.icon className="w-6 h-6 text-[var(--color-secondary)]" />
                        </div>
                      </div>
                      <h3 className="font-heading text-xl font-semibold text-[var(--color-text-primary)]">
                        {step.title}
                      </h3>
                      <p className="mt-3 font-body text-[var(--color-text-secondary)] leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── VORTECH TECHNOLOGY ─── */}
        <section className="relative py-20 md:py-28">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0" style={{ background: "linear-gradient(170deg, rgba(37,39,114,0.04) 0%, transparent 40%, rgba(6,182,212,0.03) 100%)" }} />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent" />
            <svg className="absolute bottom-0 left-0 w-full h-32 opacity-[0.03]" viewBox="0 0 1440 128" preserveAspectRatio="none">
              <path d="M0,64 C360,110 720,20 1080,64 C1260,90 1380,40 1440,64 L1440,128 L0,128 Z" fill="var(--color-primary)" />
            </svg>
          </div>
          <div className="relative max-w-6xl mx-auto px-6">
            <AnimatedSection className="text-center mb-14">
              <motion.span variants={fadeUp} transition={{ duration: 0.5 }} className="inline-block mb-4 px-4 py-1.5 rounded-full bg-[var(--color-surface-alt)] text-[var(--color-secondary)] font-heading text-sm font-semibold tracking-wide uppercase">{p.vortechBadge}</motion.span>
              <motion.h2 variants={fadeUp} transition={{ duration: 0.6 }} className="font-heading text-[var(--color-text-primary)]" style={{ fontSize: "var(--text-h2)" }}>{p.vortechHeadline}</motion.h2>
              <motion.p variants={fadeUp} transition={{ duration: 0.5 }} className="mt-4 max-w-2xl mx-auto font-body text-[var(--color-text-secondary)] text-lg leading-relaxed">{p.vortechDescription}</motion.p>
            </AnimatedSection>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Layers, title: p.vortechFeature1Title, desc: p.vortechFeature1Desc },
                { icon: Cpu, title: p.vortechFeature2Title, desc: p.vortechFeature2Desc },
                { icon: CircuitBoard, title: p.vortechFeature3Title, desc: p.vortechFeature3Desc },
                { icon: RefreshCw, title: p.vortechFeature4Title, desc: p.vortechFeature4Desc },
              ].map((feat, i) => (
                <motion.div key={feat.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-30px" }} transition={{ duration: 0.5, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }} className="group relative p-6 rounded-2xl border border-[var(--color-border)] bg-white hover:shadow-xl hover:shadow-brand-cyan/5 hover:-translate-y-1 transition-all duration-300">
                  <div className="absolute top-0 left-6 right-6 h-[2px] rounded-full bg-brand-cyan opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="w-11 h-11 rounded-xl bg-brand-cyan/10 flex items-center justify-center mb-4"><feat.icon className="w-5 h-5 text-brand-cyan" /></div>
                  <h3 className="font-heading text-base font-semibold text-[var(--color-text-primary)] mb-2">{feat.title}</h3>
                  <p className="font-body text-sm text-[var(--color-text-secondary)] leading-relaxed">{feat.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── 4-STAGE FILTRATION ─── */}
        <section className="relative py-20 md:py-28">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-surface)] via-white to-[var(--color-surface)]" />
            <div className="absolute top-1/3 left-[5%] w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(6,182,212,0.04)_0%,transparent_70%)]" />
          </div>
          <div className="relative max-w-4xl mx-auto px-6">
            <AnimatedSection className="text-center mb-14">
              <motion.span variants={fadeUp} transition={{ duration: 0.5 }} className="inline-block mb-4 px-4 py-1.5 rounded-full bg-[var(--color-surface-alt)] text-[var(--color-secondary)] font-heading text-sm font-semibold tracking-wide uppercase">{p.filtrationBadge}</motion.span>
              <motion.h2 variants={fadeUp} transition={{ duration: 0.6 }} className="font-heading text-[var(--color-text-primary)]" style={{ fontSize: "var(--text-h2)" }}>{p.filtrationHeadline}</motion.h2>
              <motion.p variants={fadeUp} transition={{ duration: 0.5 }} className="mt-4 max-w-2xl mx-auto font-body text-[var(--color-text-secondary)] text-lg leading-relaxed">{p.filtrationDescription}</motion.p>
            </AnimatedSection>
            <div className="space-y-6">
              {[
                { title: p.filtrationStage1Title, desc: p.filtrationStage1Desc, icon: Filter },
                { title: p.filtrationStage2Title, desc: p.filtrationStage2Desc, icon: Droplets },
                { title: p.filtrationStage3Title, desc: p.filtrationStage3Desc, icon: Sparkles },
                { title: p.filtrationStage4Title, desc: p.filtrationStage4Desc, icon: CheckCircle2 },
              ].map((stage, i) => (
                <motion.div key={stage.title} initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.5, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }} className="flex gap-5 items-start p-6 rounded-2xl border border-[var(--color-border)] bg-white hover:shadow-lg hover:shadow-brand-cyan/5 transition-all duration-300">
                  <div className="relative z-10 w-12 h-12 rounded-xl bg-brand-cyan/10 flex items-center justify-center shrink-0"><stage.icon className="w-5 h-5 text-brand-cyan" /></div>
                  <div>
                    <h3 className="font-heading font-semibold text-lg text-[var(--color-text-primary)] mb-1.5">{stage.title}</h3>
                    <p className="font-body text-[var(--color-text-secondary)] leading-relaxed">{stage.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── IMAGE BREAK: FILLING GLASS ─── */}
        <ImageBreak src="/images/water/filling-glass.jpeg" alt="Filling a glass with clean water" text="Crystal Clear, Every Glass" />

        {/* ─── PRODUCT IMAGE ─── */}
        <section ref={imageRef} className="relative py-20 md:py-28">
          {/* Background */}
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(6,182,212,0.03) 0%, transparent 70%)",
              }}
            />
          </div>

          <div className="relative max-w-5xl mx-auto px-6">
            <AnimatedSection className="text-center mb-12">
              <motion.h2
                variants={fadeUp}
                transition={{ duration: 0.6 }}
                className="font-heading text-[var(--color-text-primary)]"
                style={{ fontSize: "var(--text-h2)" }}
              >
                {p.systemHeadline}
              </motion.h2>
              <motion.p
                variants={fadeUp}
                transition={{ duration: 0.5 }}
                className="mt-4 max-w-xl mx-auto font-body text-[var(--color-text-secondary)] text-lg"
              >
                {p.systemDescription}
              </motion.p>
            </AnimatedSection>

            <motion.div
              style={{ scale: imgScale, y: imgY }}
              className="relative rounded-3xl overflow-hidden shadow-2xl shadow-brand-navy/10 border border-[var(--color-border)]"
            >
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative aspect-[4/3] w-full bg-[var(--color-surface)]">
                  <Image
                    src="/images/client/photo-01.jpeg"
                    alt="Aquafeel City Water Filtration System -- whole-home water treatment unit"
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 450px"
                    priority
                  />
                </div>
                <div className="relative aspect-[4/3] w-full bg-[var(--color-surface)]">
                  <Image
                    src="/images/client/product-install.jpg"
                    alt="Aquafeel whole house water system professionally installed in a home garage"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 450px"
                  />
                </div>
              </div>
              {/* Overlay accent */}
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary-dark)]/10 to-transparent pointer-events-none" />
            </motion.div>
          </div>
        </section>

        {/* ─── CHLORAMINES CALLOUT ─── */}
        <section className="relative py-16 md:py-20">
          <div className="absolute inset-0 pointer-events-none"><div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(254,243,199,0.15) 0%, rgba(254,243,199,0.05) 100%)" }} /></div>
          <div className="relative max-w-4xl mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }} className="p-8 md:p-10 rounded-2xl border-2 border-amber-200/60 bg-white shadow-lg shadow-amber-100/20">
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center shrink-0"><AlertTriangle className="w-6 h-6 text-amber-600" /></div>
                <div>
                  <h3 className="font-heading font-bold text-xl text-[var(--color-text-primary)] mb-3">{p.chloraminesTitle}</h3>
                  <p className="font-body text-[var(--color-text-secondary)] leading-relaxed">{p.chloraminesDescription}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ─── CONTAMINANTS REMOVED ─── */}
        <section className="relative py-20 md:py-28">
          <div className="absolute inset-0 pointer-events-none"><div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(37,39,114,0.03) 0%, transparent 70%)" }} /><div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent" /></div>
          <div className="relative max-w-4xl mx-auto px-6">
            <AnimatedSection className="text-center mb-12">
              <motion.span variants={fadeUp} transition={{ duration: 0.5 }} className="inline-block mb-4 px-4 py-1.5 rounded-full bg-[var(--color-surface-alt)] text-[var(--color-secondary)] font-heading text-sm font-semibold tracking-wide uppercase">{p.contaminantsBadge}</motion.span>
              <motion.h2 variants={fadeUp} transition={{ duration: 0.6 }} className="font-heading text-[var(--color-text-primary)]" style={{ fontSize: "var(--text-h2)" }}>{p.contaminantsHeadline}</motion.h2>
              <motion.p variants={fadeUp} transition={{ duration: 0.5 }} className="mt-4 max-w-2xl mx-auto font-body text-[var(--color-text-secondary)] text-lg">{p.contaminantsDescription}</motion.p>
            </AnimatedSection>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="grid sm:grid-cols-2 gap-3">
              {[p.contaminantChlorine, p.contaminantChloramines, p.contaminantSediment, p.contaminantVOCs, p.contaminantHardWater, p.contaminantScale, p.contaminantTaste, p.contaminantSOCs].map((item, i) => (
                <motion.div key={item} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.35, delay: i * 0.05 }} className="flex items-center gap-3 px-5 py-3.5 rounded-xl border border-[var(--color-border)] bg-white">
                  <div className="w-5 h-5 rounded-full bg-brand-cyan/10 flex items-center justify-center shrink-0"><Check className="w-3 h-3 text-brand-cyan" /></div>
                  <span className="font-body text-[var(--color-text-primary)] text-sm font-medium">{item}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ─── SPECS TABLE ─── */}
        <section className="relative py-20 md:py-28">
          <div className="absolute inset-0 pointer-events-none"><div className="absolute inset-0 bg-gradient-to-b from-[var(--color-surface)] to-white" /></div>
          <div className="relative max-w-3xl mx-auto px-6">
            <AnimatedSection className="text-center mb-12">
              <motion.span variants={fadeUp} transition={{ duration: 0.5 }} className="inline-block mb-4 px-4 py-1.5 rounded-full bg-[var(--color-surface-alt)] text-[var(--color-secondary)] font-heading text-sm font-semibold tracking-wide uppercase">{p.specsBadge}</motion.span>
              <motion.h2 variants={fadeUp} transition={{ duration: 0.6 }} className="font-heading text-[var(--color-text-primary)]" style={{ fontSize: "var(--text-h2)" }}>{p.specsHeadline}</motion.h2>
            </AnimatedSection>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="rounded-2xl border border-[var(--color-border)] bg-white overflow-hidden shadow-lg shadow-brand-navy/5">
              {[
                { label: p.specType, value: p.specTypeValue },
                { label: p.specStages, value: p.specStagesValue },
                { label: p.specTech, value: p.specTechValue },
                { label: p.specValve, value: p.specValveValue },
                { label: p.specWarranty, value: p.specWarrantyValue },
                { label: p.specOrigin, value: p.specOriginValue },
                { label: p.specCertifications, value: p.specCertificationsValue },
              ].map((row, i) => (
                <div key={row.label} className={`flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-0 px-6 py-4 ${i % 2 === 0 ? "bg-[var(--color-surface)]" : "bg-white"}`}>
                  <span className="font-heading font-semibold text-sm text-[var(--color-text-primary)] sm:w-1/3">{row.label}</span>
                  <span className="font-body text-sm text-[var(--color-text-secondary)] sm:w-2/3">{row.value}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ─── SAVINGS GRID ─── */}
        <section className="relative py-20 md:py-28">
          <div className="absolute inset-0 pointer-events-none"><div className="absolute inset-0" style={{ background: "linear-gradient(145deg, rgba(6,182,212,0.04) 0%, transparent 50%, rgba(45,212,191,0.03) 100%)" }} /><div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent" /></div>
          <div className="relative max-w-6xl mx-auto px-6">
            <AnimatedSection className="text-center mb-14">
              <motion.span variants={fadeUp} transition={{ duration: 0.5 }} className="inline-block mb-4 px-4 py-1.5 rounded-full bg-[var(--color-surface-alt)] text-[var(--color-secondary)] font-heading text-sm font-semibold tracking-wide uppercase">{p.savingsBadge}</motion.span>
              <motion.h2 variants={fadeUp} transition={{ duration: 0.6 }} className="font-heading text-[var(--color-text-primary)]" style={{ fontSize: "var(--text-h2)" }}>{p.savingsHeadline}</motion.h2>
            </AnimatedSection>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: DollarSign, title: p.savings1Title, desc: p.savings1Desc },
                { icon: ShowerHead, title: p.savings2Title, desc: p.savings2Desc },
                { icon: Timer, title: p.savings3Title, desc: p.savings3Desc },
                { icon: Zap, title: p.savings4Title, desc: p.savings4Desc },
                { icon: Droplets, title: p.savings5Title, desc: p.savings5Desc },
                { icon: ShieldCheck, title: p.savings6Title, desc: p.savings6Desc },
              ].map((item, i) => (
                <motion.div key={item.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-30px" }} transition={{ duration: 0.5, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }} className="group p-6 rounded-2xl border border-[var(--color-border)] bg-white hover:shadow-lg hover:shadow-brand-cyan/5 hover:-translate-y-1 transition-all duration-300">
                  <div className="w-10 h-10 rounded-lg bg-[var(--color-surface-alt)] flex items-center justify-center mb-4 group-hover:bg-brand-cyan/10 transition-colors"><item.icon className="w-5 h-5 text-[var(--color-secondary)]" /></div>
                  <h3 className="font-heading text-base font-semibold text-[var(--color-text-primary)] mb-1.5">{item.title}</h3>
                  <p className="font-body text-sm text-[var(--color-text-secondary)] leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── BENEFITS GRID ─── */}
        <section className="relative py-20 md:py-28">
          {/* Background */}
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(160deg, rgba(238,242,255,0.7) 0%, rgba(248,250,255,0.4) 50%, rgba(6,182,212,0.03) 100%)",
              }}
            />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent" />
            <div className="absolute -bottom-20 left-1/4 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(45,212,191,0.05)_0%,transparent_70%)]" />
          </div>

          <div className="relative max-w-6xl mx-auto px-6">
            <AnimatedSection className="text-center mb-16">
              <motion.span
                variants={fadeUp}
                transition={{ duration: 0.5 }}
                className="inline-block mb-4 px-4 py-1.5 rounded-full bg-[var(--color-surface-alt)] text-[var(--color-secondary)] font-heading text-sm font-semibold tracking-wide uppercase"
              >
                {p.benefitsBadge}
              </motion.span>
              <motion.h2
                variants={fadeUp}
                transition={{ duration: 0.6 }}
                className="font-heading text-[var(--color-text-primary)]"
                style={{ fontSize: "var(--text-h2)" }}
              >
                {p.benefitsHeadline}
              </motion.h2>
              <motion.p
                variants={fadeUp}
                transition={{ duration: 0.5 }}
                className="mt-4 max-w-2xl mx-auto font-body text-[var(--color-text-secondary)] text-lg"
              >
                {p.benefitsDescription}
              </motion.p>
            </AnimatedSection>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, i) => (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, scale: 0.92 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={{
                      duration: 0.5,
                      delay: i * 0.08,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                    className="group relative p-7 rounded-2xl border border-[var(--color-border)] border-l-2 border-l-brand-cyan bg-white hover:shadow-xl hover:shadow-brand-cyan/5 hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[var(--color-surface-alt)] flex items-center justify-center mb-5 group-hover:bg-brand-cyan/10 transition-colors">
                      <benefit.icon className="w-6 h-6 text-[var(--color-secondary)]" />
                    </div>
                    <h3 className="font-heading text-lg font-semibold text-[var(--color-text-primary)]">
                      {benefit.title}
                    </h3>
                    <p className="mt-2.5 font-body text-[var(--color-text-secondary)] leading-relaxed">
                      {benefit.description}
                    </p>
                  </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── FAQ ─── */}
        <section className="relative py-20 md:py-28">
          {/* Background */}
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 70% 60% at 70% 40%, rgba(37,39,114,0.03) 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 20% 80%, rgba(6,182,212,0.03) 0%, transparent 70%)",
              }}
            />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent" />
          </div>

          <div className="relative max-w-3xl mx-auto px-6">
            <AnimatedSection className="text-center mb-12">
              <motion.span
                variants={fadeUp}
                transition={{ duration: 0.5 }}
                className="inline-block mb-4 px-4 py-1.5 rounded-full bg-[var(--color-surface-alt)] text-[var(--color-secondary)] font-heading text-sm font-semibold tracking-wide uppercase"
              >
                {p.faqBadge}
              </motion.span>
              <motion.h2
                variants={fadeUp}
                transition={{ duration: 0.6 }}
                className="font-heading text-[var(--color-text-primary)]"
                style={{ fontSize: "var(--text-h2)" }}
              >
                {p.faqHeadline}
              </motion.h2>
            </AnimatedSection>

            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <FAQItem
                  key={i}
                  question={faq.question}
                  answer={faq.answer}
                  index={i}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ─── CTA ─── */}
        <section className="relative py-20 md:py-28 overflow-hidden">
          <div className="absolute inset-0">
            <Image src="/images/water/water-surface.jpeg" alt="" fill className="object-cover opacity-20" />
          </div>
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, #171751 0%, #252772 40%, #0e7490 100%)",
            }}
          />
          {/* Orbs */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-10 right-20 w-[300px] h-[300px] rounded-full bg-[radial-gradient(circle,rgba(45,212,191,0.1)_0%,transparent_70%)]" />
            <div className="absolute -bottom-10 -left-10 w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.08)_0%,transparent_70%)]" />
          </div>

          <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
            <AnimatedSection>
              <motion.h2
                variants={fadeUp}
                transition={{ duration: 0.6 }}
                className="font-heading text-white"
                style={{ fontSize: "var(--text-h2)" }}
              >
                {p.ctaHeadline}{" "}
                <span className="text-brand-cyan">{p.ctaHighlight}</span>
              </motion.h2>
              <motion.p
                variants={fadeUp}
                transition={{ duration: 0.5 }}
                className="mt-5 text-lg text-white/70 font-body leading-relaxed"
              >
                {p.ctaDescription}
              </motion.p>
              <motion.div
                variants={fadeUp}
                transition={{ duration: 0.5 }}
                className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[var(--color-accent-light)] text-[var(--color-primary-dark)] font-heading font-semibold text-base hover:brightness-110 transition-all hover:shadow-lg hover:shadow-brand-cyan/25"
                >
                  {p.ctaPrimary}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="tel:+19193518261"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/25 text-white font-heading font-semibold text-base hover:bg-white/10 transition-all"
                >
                  <Phone className="w-4 h-4" />
                  {p.ctaCall}
                </a>
              </motion.div>
            </AnimatedSection>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
