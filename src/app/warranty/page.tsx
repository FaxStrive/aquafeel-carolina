"use client";

import { useRef, useState } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import Link from "next/link";
import {
  ShieldCheck,
  Wrench,
  Headphones,
  Check,
  X,
  Phone,
  Search,
  CheckCircle2,
  ChevronRight,
  ChevronDown,
  ArrowRight,
  Clock,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useI18n } from "@/lib/i18n/context";

/* ─────────────────── HERO ─────────────────── */

function WarrantyHero() {
  const { t } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-[420px] flex items-center overflow-hidden">
      {/* Gradient background */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 -top-20"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary-dark)] via-[var(--color-primary)] to-[var(--color-primary-light)]" />
        {/* Animated orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.08, 0.14, 0.08],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-10 right-[15%] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,var(--color-secondary-light),transparent_70%)]"
        />
        <motion.div
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.06, 0.12, 0.06],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-0 left-[10%] w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,var(--color-accent-light),transparent_70%)]"
        />
        {/* Shield watermark */}
        <motion.div
          animate={{
            opacity: [0.02, 0.05, 0.02],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-1/2 right-[8%] -translate-y-1/2"
        >
          <ShieldCheck className="w-64 h-64 text-white" strokeWidth={0.5} />
        </motion.div>
        {/* Sweep line */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent" />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-32 pb-16"
      >
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center gap-2 text-white/50 text-sm font-body mb-6"
        >
          <Link href="/" className="hover:text-white/80 transition-colors">
            {t.warrantyPage.breadcrumbHome}
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-white/80">{t.warrantyPage.breadcrumbWarranty}</span>
        </motion.nav>

        {/* Headline with stagger */}
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl text-white leading-[1.1] max-w-3xl"
          >
            {t.warrantyPage.heroHeadline}{" "}
            <span className="text-brand-cyan">{t.warrantyPage.heroHighlight}</span>
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="font-body text-white/70 text-lg sm:text-xl mt-5 max-w-2xl leading-relaxed"
        >
          {t.warrantyPage.heroDescription}
        </motion.p>
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent z-10" />
    </section>
  );
}

/* ─────────────────── COVERAGE OVERVIEW ─────────────────── */

function CoverageOverview() {
  const { t } = useI18n();
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const coverageTiers = [
    {
      icon: ShieldCheck,
      title: t.warrantyPage.tier1Title,
      description: t.warrantyPage.tier1Description,
      color: "var(--color-secondary-light)",
      accent: "from-[var(--color-secondary-light)] to-[var(--color-primary-light)]",
    },
    {
      icon: Wrench,
      title: t.warrantyPage.tier2Title,
      description: t.warrantyPage.tier2Description,
      color: "var(--color-primary-light)",
      accent: "from-[var(--color-primary-light)] to-[var(--color-accent-light)]",
    },
    {
      icon: Headphones,
      title: t.warrantyPage.tier3Title,
      description: t.warrantyPage.tier3Description,
      color: "var(--color-accent-light)",
      accent: "from-[var(--color-accent-light)] to-[var(--color-secondary-light)]",
    },
  ];

  return (
    <section ref={ref} className="relative py-20 sm:py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-[var(--color-surface)] to-white" />
        <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-[radial-gradient(circle,var(--color-secondary-light),transparent_70%)] opacity-[0.04]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[radial-gradient(circle,var(--color-primary),transparent_70%)] opacity-[0.04]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block font-heading font-semibold text-sm uppercase tracking-wider text-brand-cyan mb-3">
            {t.warrantyPage.coverageLabel}
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-[var(--color-text-primary)]">
            {t.warrantyPage.coverageHeadline}
          </h2>
          <p className="font-body text-[var(--color-text-secondary)] text-lg mt-4 max-w-2xl mx-auto">
            {t.warrantyPage.coverageDescription}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {coverageTiers.map((tier, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{
                duration: 0.5,
                delay: i * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative rounded-2xl border border-[var(--color-border)] bg-white p-8 hover:shadow-xl hover:shadow-brand-navy/5 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Top gradient accent bar */}
              <div
                className={`absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl bg-gradient-to-r ${tier.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              />

              <div
                className="w-16 h-16 rounded-xl flex items-center justify-center mb-6"
                style={{
                  background: `color-mix(in srgb, ${tier.color} 12%, white)`,
                }}
              >
                <tier.icon
                  className="w-8 h-8"
                  style={{ color: tier.color }}
                />
              </div>

              <h3 className="font-heading font-bold text-xl text-[var(--color-text-primary)] mb-3">
                {tier.title}
              </h3>
              <p className="font-body text-[var(--color-text-secondary)] leading-relaxed">
                {tier.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── WHAT'S COVERED ─────────────────── */

function WhatsCovered() {
  const { t } = useI18n();
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const coveredItems = [
    t.warrantyPage.covered1,
    t.warrantyPage.covered2,
    t.warrantyPage.covered3,
    t.warrantyPage.covered4,
    t.warrantyPage.covered5,
    t.warrantyPage.covered6,
  ];

  const notCoveredItems = [
    t.warrantyPage.notCovered1,
    t.warrantyPage.notCovered2,
    t.warrantyPage.notCovered3,
    t.warrantyPage.notCovered4,
    t.warrantyPage.notCovered5,
  ];

  return (
    <section ref={ref} className="relative py-20 sm:py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-surface-alt)] via-white to-[var(--color-surface)]" />
        <svg
          className="absolute top-0 left-0 w-full h-40 text-white"
          viewBox="0 0 1440 160"
          preserveAspectRatio="none"
          fill="currentColor"
        >
          <path d="M0,0 C480,120 960,120 1440,0 L1440,0 L0,0 Z" />
        </svg>
        <div className="absolute top-[20%] right-0 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_center,var(--color-accent-light),transparent_70%)] opacity-[0.03]" />
        <div className="absolute bottom-[10%] left-0 w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_center,var(--color-secondary-light),transparent_70%)] opacity-[0.04]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block font-heading font-semibold text-sm uppercase tracking-wider text-brand-aqua mb-3">
            {t.warrantyPage.detailsLabel}
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-[var(--color-text-primary)]">
            {t.warrantyPage.detailsHeadline}
          </h2>
          <p className="font-body text-[var(--color-text-secondary)] text-lg mt-4 max-w-xl mx-auto">
            {t.warrantyPage.detailsDescription}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {/* Covered */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="bg-white rounded-2xl border border-[var(--color-border)] p-8 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
                <Check className="w-5 h-5 text-emerald-500" />
              </div>
              <h3 className="font-heading font-bold text-lg text-[var(--color-text-primary)]">
                {t.warrantyPage.coveredTitle}
              </h3>
            </div>
            <ul className="space-y-4">
              {coveredItems.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -15 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    duration: 0.4,
                    delay: 0.3 + i * 0.08,
                  }}
                  className="flex items-center gap-3"
                >
                  <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-emerald-600" />
                  </div>
                  <span className="font-body text-[var(--color-text-secondary)]">
                    {item}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Not Covered */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="bg-white rounded-2xl border border-[var(--color-border)] p-8 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center">
                <X className="w-5 h-5 text-red-400" />
              </div>
              <h3 className="font-heading font-bold text-lg text-[var(--color-text-primary)]">
                {t.warrantyPage.notCoveredTitle}
              </h3>
            </div>
            <ul className="space-y-4">
              {notCoveredItems.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 15 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    duration: 0.4,
                    delay: 0.35 + i * 0.08,
                  }}
                  className="flex items-center gap-3"
                >
                  <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                    <X className="w-3 h-3 text-red-500" />
                  </div>
                  <span className="font-body text-[var(--color-text-secondary)]">
                    {item}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── HOW TO FILE A CLAIM ─────────────────── */

function FileAClaim() {
  const { t } = useI18n();
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const lineHeight = useSpring(
    useTransform(scrollYProgress, [0.1, 0.6], [0, 1]),
    { stiffness: 120, damping: 30 }
  );
  const lineScale = useTransform(lineHeight, [0, 1], ["0%", "100%"]);

  const claimSteps = [
    {
      icon: Phone,
      number: "01",
      title: t.warrantyPage.claim1Title,
      description: t.warrantyPage.claim1Description,
    },
    {
      icon: Search,
      number: "02",
      title: t.warrantyPage.claim2Title,
      description: t.warrantyPage.claim2Description,
    },
    {
      icon: CheckCircle2,
      number: "03",
      title: t.warrantyPage.claim3Title,
      description: t.warrantyPage.claim3Description,
    },
  ];

  return (
    <section ref={ref} className="relative py-20 sm:py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-[var(--color-surface)] to-white" />
        <svg
          className="absolute bottom-0 left-0 w-full h-48 opacity-[0.05]"
          viewBox="0 0 1440 200"
          preserveAspectRatio="none"
        >
          <path
            d="M0,100 C240,180 480,20 720,100 C960,180 1200,20 1440,100 L1440,200 L0,200 Z"
            fill="var(--color-primary)"
          />
        </svg>
        <div className="absolute top-1/3 left-[5%] w-[400px] h-[400px] bg-[radial-gradient(circle,var(--color-secondary-light),transparent_70%)] opacity-[0.04]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block font-heading font-semibold text-sm uppercase tracking-wider text-brand-cyan mb-3">
            {t.warrantyPage.claimLabel}
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-[var(--color-text-primary)]">
            {t.warrantyPage.claimHeadline}
          </h2>
          <p className="font-body text-[var(--color-text-secondary)] text-lg mt-4 max-w-xl mx-auto">
            {t.warrantyPage.claimDescription}
          </p>
        </motion.div>

        <div className="relative max-w-3xl mx-auto">
          {/* Connecting line - scroll animated */}
          <div className="absolute left-7 top-0 bottom-0 w-[2px] bg-[var(--color-border)] hidden sm:block">
            <motion.div
              style={{ height: lineScale }}
              className="w-full bg-gradient-to-b from-brand-cyan to-brand-navy rounded-full origin-top"
            />
          </div>

          <div className="space-y-12">
            {claimSteps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: 0.2 + i * 0.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="flex gap-6 items-start"
              >
                <div className="relative z-10 w-14 h-14 rounded-xl bg-white border-2 border-brand-cyan/20 flex items-center justify-center shrink-0 shadow-sm">
                  <step.icon className="w-6 h-6 text-brand-cyan" />
                </div>
                <div className="pt-1">
                  <span className="font-heading font-bold text-xs uppercase tracking-widest text-brand-cyan/60 mb-1 block">
                    {t.warrantyPage.claimStep} {step.number}
                  </span>
                  <h3 className="font-heading font-bold text-xl text-[var(--color-text-primary)] mb-2">
                    {step.title}
                  </h3>
                  <p className="font-body text-[var(--color-text-secondary)] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Quick stat */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="mt-12 ml-0 sm:ml-20 inline-flex items-center gap-3 bg-brand-cyan/5 border border-brand-cyan/10 rounded-xl px-5 py-3"
          >
            <Clock className="w-5 h-5 text-brand-cyan shrink-0" />
            <span className="font-body text-sm text-[var(--color-text-secondary)]">
              {t.warrantyPage.claimStat} <strong className="text-[var(--color-text-primary)]">{t.warrantyPage.claimStatHighlight}</strong>
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── FAQ ─────────────────── */

function FAQItem({
  item,
  isOpen,
  onToggle,
  index,
  isInView,
}: {
  item: { question: string; answer: string };
  isOpen: boolean;
  onToggle: () => void;
  index: number;
  isInView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.4,
        delay: 0.15 + index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="border border-[var(--color-border)] rounded-xl overflow-hidden bg-white hover:shadow-md hover:shadow-brand-navy/3 transition-shadow duration-300"
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-6 py-5 text-left group"
      >
        <span className="font-heading font-semibold text-[var(--color-text-primary)] pr-4">
          {item.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="shrink-0 w-8 h-8 rounded-lg bg-[var(--color-surface)] flex items-center justify-center group-hover:bg-brand-cyan/10 transition-colors duration-200"
        >
          <ChevronDown className="w-4 h-4 text-[var(--color-text-secondary)]" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-5 pt-0">
              <div className="h-px bg-[var(--color-border)] mb-4" />
              <p className="font-body text-[var(--color-text-secondary)] leading-relaxed">
                {item.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function FAQ() {
  const { t } = useI18n();
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqItems = [
    { question: t.warrantyPage.faq1Q, answer: t.warrantyPage.faq1A },
    { question: t.warrantyPage.faq2Q, answer: t.warrantyPage.faq2A },
    { question: t.warrantyPage.faq3Q, answer: t.warrantyPage.faq3A },
    { question: t.warrantyPage.faq4Q, answer: t.warrantyPage.faq4A },
    { question: t.warrantyPage.faq5Q, answer: t.warrantyPage.faq5A },
  ];

  return (
    <section ref={ref} className="relative py-20 sm:py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-surface-alt)] via-white to-[var(--color-surface)]" />
        <div className="absolute -top-20 -right-20 w-[500px] h-[500px] bg-[radial-gradient(circle,var(--color-primary),transparent_70%)] opacity-[0.03] rotate-12" />
        <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-[radial-gradient(circle,var(--color-accent-light),transparent_70%)] opacity-[0.04]" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block font-heading font-semibold text-sm uppercase tracking-wider text-brand-cyan mb-3">
            {t.warrantyPage.faqLabel}
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-[var(--color-text-primary)]">
            {t.warrantyPage.faqHeadline}
          </h2>
          <p className="font-body text-[var(--color-text-secondary)] text-lg mt-4 max-w-xl mx-auto">
            {t.warrantyPage.faqDescription}
          </p>
        </motion.div>

        <div className="space-y-3">
          {faqItems.map((item, i) => (
            <FAQItem
              key={i}
              item={item}
              isOpen={openIndex === i}
              onToggle={() =>
                setOpenIndex(openIndex === i ? null : i)
              }
              index={i}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── CTA ─────────────────── */

function WarrantyCTA() {
  const { t } = useI18n();
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="relative py-20 sm:py-28 overflow-hidden">
      {/* Background: deep gradient with floating orbs */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary-dark)] via-[var(--color-primary)] to-[var(--color-secondary-dark)]" />
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.08, 0.14, 0.08],
            x: [0, 30, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-10 right-[10%] w-[450px] h-[450px] rounded-full bg-[radial-gradient(circle,var(--color-secondary-light),transparent_70%)]"
        />
        <motion.div
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.06, 0.10, 0.06],
            x: [0, -20, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute bottom-10 left-[5%] w-[350px] h-[350px] rounded-full bg-[radial-gradient(circle,var(--color-accent-light),transparent_70%)]"
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-white leading-tight">
            {t.warrantyPage.ctaHeadline}{" "}
            <span className="text-brand-cyan">{t.warrantyPage.ctaHighlight}</span>
          </h2>
          <p className="font-body text-white/70 text-lg sm:text-xl mt-5 max-w-2xl mx-auto leading-relaxed">
            {t.warrantyPage.ctaDescription}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-[var(--color-accent-light)] text-[var(--color-primary-dark)] font-heading font-bold text-base hover:bg-[var(--color-accent)] transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg shadow-teal-500/20"
            >
              {t.warrantyPage.ctaButton}
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="tel:9842123558"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg border-2 border-white/20 text-white font-heading font-semibold text-base hover:bg-white/10 transition-all duration-200"
            >
              {t.warrantyPage.ctaCall}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────── PAGE ─────────────────── */

export default function WarrantyPage() {
  return (
    <>
      <Header />
      <main>
        <WarrantyHero />
        <CoverageOverview />
        <WhatsCovered />
        <FileAClaim />
        <FAQ />
        <WarrantyCTA />
      </main>
      <Footer />
    </>
  );
}
