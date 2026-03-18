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
  ShieldCheck,
  Sparkles,
  Bug,
  Home,
  Wrench,
  ChevronRight,
  ChevronDown,
  ArrowRight,
  FlaskConical,
  Ruler,
  CheckCircle2,
  Phone,
  AlertTriangle,
  ThermometerSun,
  Gauge,
  Wind,
  Pipette,
  HeartPulse,
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
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary-dark)]/70 via-[var(--color-primary-dark)]/50 to-[var(--color-primary-dark)]/70" />
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

export default function WellWaterPage() {
  const { t } = useI18n();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const p = t.wellWaterPage as any;

  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroScroll, [0, 1], [0, 120]);
  const heroOpacity = useTransform(heroScroll, [0, 0.7], [1, 0]);

  const problemIcons = [Pipette, Wind, ThermometerSun, Bug, Gauge, AlertTriangle];
  const wellProblems = [
    { icon: problemIcons[0], title: p.problem1Title, description: p.problem1Desc, solution: p.problem1Solution },
    { icon: problemIcons[1], title: p.problem2Title, description: p.problem2Desc, solution: p.problem2Solution },
    { icon: problemIcons[2], title: p.problem3Title, description: p.problem3Desc, solution: p.problem3Solution },
    { icon: problemIcons[3], title: p.problem4Title, description: p.problem4Desc, solution: p.problem4Solution },
    { icon: problemIcons[4], title: p.problem5Title, description: p.problem5Desc, solution: p.problem5Solution },
    { icon: problemIcons[5], title: p.problem6Title, description: p.problem6Desc, solution: p.problem6Solution },
  ];

  const benefitIcons = [ShieldCheck, Wrench, Wind, HeartPulse, Sparkles, Home];
  const benefits = [
    { icon: benefitIcons[0], title: p.benefit1Title, description: p.benefit1Desc },
    { icon: benefitIcons[1], title: p.benefit2Title, description: p.benefit2Desc },
    { icon: benefitIcons[2], title: p.benefit3Title, description: p.benefit3Desc },
    { icon: benefitIcons[3], title: p.benefit4Title, description: p.benefit4Desc },
    { icon: benefitIcons[4], title: p.benefit5Title, description: p.benefit5Desc },
    { icon: benefitIcons[5], title: p.benefit6Title, description: p.benefit6Desc },
  ];

  const stepIcons = [FlaskConical, Ruler, CheckCircle2];
  const steps = [
    { number: "01", icon: stepIcons[0], title: p.step1Title, description: p.step1Desc },
    { number: "02", icon: stepIcons[1], title: p.step2Title, description: p.step2Desc },
    { number: "03", icon: stepIcons[2], title: p.step3Title, description: p.step3Desc },
  ];

  const faqs = [
    { question: p.faq1Q, answer: p.faq1A },
    { question: p.faq2Q, answer: p.faq2A },
    { question: p.faq3Q, answer: p.faq3A },
    { question: p.faq4Q, answer: p.faq4A },
  ];

  const overviewTags = [p.overviewTag1, p.overviewTag2, p.overviewTag3, p.overviewTag4, p.overviewTag5, p.overviewTag6];

  const infoCards = [
    { label: p.infoCard1Label, detail: p.infoCard1Detail, color: "var(--color-secondary-light)" },
    { label: p.infoCard2Label, detail: p.infoCard2Detail, color: "var(--color-accent)" },
    { label: p.infoCard3Label, detail: p.infoCard3Detail, color: "var(--color-primary-light)" },
    { label: p.infoCard4Label, detail: p.infoCard4Detail, color: "var(--color-accent-light)" },
  ];

  return (
    <>
      <Header />
      <main className="overflow-hidden">
        {/* ─── HERO ─── */}
        <section
          ref={heroRef}
          className="relative min-h-[60vh] md:min-h-[70vh] flex items-center pt-32 pb-20"
        >
          {/* Video background */}
          <div className="absolute inset-0 overflow-hidden">
            <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
              <source src="/videos/water-black-bg.mp4" type="video/mp4" />
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
              <span className="text-brand-cyan">{p.breadcrumbWellWater}</span>
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
              {p.heroHeadline1}
              <span className="text-brand-cyan">{p.heroHeadlineHighlight}</span>
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
                {p.ctaSchedule}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="tel:+19842123558"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/25 text-white font-heading font-semibold text-base hover:bg-white/10 transition-all"
              >
                <Phone className="w-4 h-4" />
                {p.ctaCall}
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
                  {p.overviewLabel}
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
                  {p.overviewP1}
                </motion.p>
                <motion.p
                  variants={fadeUp}
                  transition={{ duration: 0.5 }}
                  className="mt-4 font-body text-[var(--color-text-secondary)] leading-relaxed"
                >
                  {p.overviewP2}
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

              {/* Info cards */}
              <motion.div
                variants={fadeUp}
                transition={{ duration: 0.6 }}
                className="grid sm:grid-cols-2 gap-4"
              >
                {infoCards.map((item, i) => (
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

        {/* ─── IMAGE BREAK: OVERVIEW ─── */}
        <ImageBreak src="/images/water/water-surface.jpeg" alt="Pristine water surface" text="Your Well Deserves Better" />

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
                {p.processLabel}
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

        {/* ─── COMMON WELL WATER PROBLEMS ─── */}
        <section className="relative py-20 md:py-28">
          {/* Background */}
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(6,182,212,0.03) 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 90% 20%, rgba(37,39,114,0.04) 0%, transparent 70%)",
              }}
            />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent" />
          </div>

          <div className="relative max-w-6xl mx-auto px-6">
            <AnimatedSection className="text-center mb-16">
              <motion.span
                variants={fadeUp}
                transition={{ duration: 0.5 }}
                className="inline-block mb-4 px-4 py-1.5 rounded-full bg-[var(--color-surface-alt)] text-[var(--color-secondary)] font-heading text-sm font-semibold tracking-wide uppercase"
              >
                {p.problemsLabel}
              </motion.span>
              <motion.h2
                variants={fadeUp}
                transition={{ duration: 0.6 }}
                className="font-heading text-[var(--color-text-primary)]"
                style={{ fontSize: "var(--text-h2)" }}
              >
                {p.problemsHeadline}
              </motion.h2>
              <motion.p
                variants={fadeUp}
                transition={{ duration: 0.5 }}
                className="mt-4 max-w-2xl mx-auto font-body text-[var(--color-text-secondary)] text-lg leading-relaxed"
              >
                {p.problemsDescription}
              </motion.p>
            </AnimatedSection>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {wellProblems.map((problem, i) => (
                  <motion.div
                    key={problem.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={{
                      duration: 0.5,
                      delay: i * 0.08,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                    className="group relative p-7 rounded-2xl border border-[var(--color-border)] bg-white hover:shadow-xl hover:shadow-brand-cyan/5 hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[var(--color-surface-alt)] flex items-center justify-center mb-5 group-hover:bg-brand-cyan/10 transition-colors">
                      <problem.icon className="w-6 h-6 text-[var(--color-secondary)]" />
                    </div>
                    <h3 className="font-heading text-lg font-semibold text-[var(--color-text-primary)]">
                      {problem.title}
                    </h3>
                    <p className="mt-2.5 font-body text-[var(--color-text-secondary)] leading-relaxed text-sm">
                      {problem.description}
                    </p>
                    <div className="mt-4 pt-4 border-t border-[var(--color-border)]">
                      <p className="font-heading text-sm font-semibold text-[var(--color-secondary)] mb-1">
                        {p.ourSolution}
                      </p>
                      <p className="font-body text-sm text-[var(--color-text-secondary)] leading-relaxed">
                        {problem.solution}
                      </p>
                    </div>
                  </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── IMAGE BREAK: FAMILY ─── */}
        <ImageBreak src="/images/water/family-outdoor.jpeg" alt="Family enjoying outdoors" text="Clean Water for the Whole Family" />

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
                {p.benefitsLabel}
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
                {p.faqLabel}
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
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, #171751 0%, #252772 40%, #0e7490 100%)",
            }}
          />
          {/* Background image */}
          <Image src="/images/water/water-droplet.jpeg" alt="" fill className="object-cover opacity-15 mix-blend-luminosity" />
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
                {p.ctaHeadline1}
                <span className="text-brand-cyan">{p.ctaHeadlineHighlight}</span>
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
                  {p.ctaSchedule2}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="tel:+19842123558"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/25 text-white font-heading font-semibold text-base hover:bg-white/10 transition-all"
                >
                  <Phone className="w-4 h-4" />
                  {p.ctaCall2}
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
