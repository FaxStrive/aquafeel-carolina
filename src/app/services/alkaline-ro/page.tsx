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
  ChevronRight,
  ArrowRight,
  Droplets,
  Sparkles,
  Heart,
  Beaker,
  ShieldCheck,
  GlassWater,
  ChevronDown,
  Filter,
  Waves,
  Pipette,
  Container,
  Milk,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useI18n } from "@/lib/i18n/context";

/* ─────────────────── HERO ─────────────────── */

function AlkalineHero() {
  const { t } = useI18n();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const p = t.alkalineRoPage as any;
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-[460px] flex items-center overflow-hidden"
    >
      {/* Video + Gradient background */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 -top-20">
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
          <source src="/videos/water-flowing-white.mp4" type="video/mp4" />
        </video>
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(23,23,81,0.82) 0%, rgba(37,39,114,0.78) 30%, rgba(45,212,191,0.75) 100%)",
          }}
        />
        {/* Animated orbs */}
        <motion.div
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.07, 0.13, 0.07],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-6 right-[12%] w-[520px] h-[520px] rounded-full bg-[radial-gradient(circle,var(--color-accent-light),transparent_70%)]"
        />
        <motion.div
          animate={{
            scale: [1.1, 0.95, 1.1],
            opacity: [0.05, 0.11, 0.05],
          }}
          transition={{
            duration: 11,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2.5,
          }}
          className="absolute bottom-0 left-[8%] w-[420px] h-[420px] rounded-full bg-[radial-gradient(circle,var(--color-secondary-light),transparent_70%)]"
        />
        {/* Sweep */}
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
            {p.breadcrumbHome}
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-white/80">{p.breadcrumbCurrent}</span>
        </motion.nav>

        {/* Headline */}
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.7,
              delay: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl text-white leading-[1.1] max-w-3xl"
          >
            {p.heroTitle}{" "}
            <span className="text-brand-cyan">{p.heroTitleHighlight}</span>
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="font-body text-white/70 text-lg sm:text-xl mt-5 max-w-2xl leading-relaxed"
        >
          {p.heroSubtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8"
        >
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-[var(--color-accent-light)] text-[var(--color-primary-dark)] font-heading font-bold text-base hover:bg-[var(--color-accent)] transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg shadow-teal-500/20"
          >
            {p.heroCta}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent z-10" />
    </section>
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

/* ─────────────────── OVERVIEW ─────────────────── */

function Overview() {
  const { t } = useI18n();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const p = t.alkalineRoPage as any;
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const overviewCards = [
    { title: p.overviewCard1Title, text: p.overviewCard1Text },
    { title: p.overviewCard2Title, text: p.overviewCard2Text },
    { title: p.overviewCard3Title, text: p.overviewCard3Text },
  ];

  return (
    <section ref={ref} className="relative py-20 sm:py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-[var(--color-surface)] to-white" />
        <div className="absolute top-[10%] right-0 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_center,var(--color-secondary-light),transparent_70%)] opacity-[0.04]" />
        <div className="absolute bottom-[5%] left-[5%] w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_center,var(--color-accent-light),transparent_70%)] opacity-[0.03]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block font-heading font-semibold text-sm uppercase tracking-wider text-brand-cyan mb-3">
            {p.overviewBadge}
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-[var(--color-text-primary)]">
            {p.overviewHeadline}
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-10">
          {overviewCards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{
                duration: 0.5,
                delay: 0.15 + i * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative rounded-2xl border border-[var(--color-border)] bg-white p-8 hover:shadow-xl hover:shadow-brand-navy/5 transition-all duration-300 hover:-translate-y-1"
            >
              <div
                className="absolute top-0 left-8 right-8 h-[2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background:
                    i === 0
                      ? "var(--color-secondary-light)"
                      : i === 1
                        ? "var(--color-accent-light)"
                        : "var(--color-primary-light)",
                }}
              />
              <h3 className="font-heading font-bold text-xl text-[var(--color-text-primary)] mb-4">
                {card.title}
              </h3>
              <p className="font-body text-[var(--color-text-secondary)] leading-relaxed">
                {card.text}
              </p>
            </motion.div>
          ))}
        </div>

        {/* pH Scale Visual */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 max-w-2xl mx-auto"
        >
          <p className="font-heading font-semibold text-sm text-center text-[var(--color-text-muted)] uppercase tracking-wider mb-4">
            {p.phScaleLabel}
          </p>
          <div className="relative">
            {/* Scale bar */}
            <div className="h-4 rounded-full overflow-hidden" style={{
              background: "linear-gradient(to right, #ef4444 0%, #f97316 15%, #eab308 30%, #84cc16 45%, #22c55e 55%, #06b6d4 70%, #3b82f6 85%, #6366f1 100%)"
            }} />
            {/* Labels */}
            <div className="flex justify-between mt-2 font-body text-xs text-[var(--color-text-muted)]">
              <span>{p.phAcidic}</span>
              <span>{p.phNeutral}</span>
              <span>{p.phAlkaline}</span>
            </div>
            {/* Marker at ~8.5-9.5 position (roughly 60-68% along the scale) */}
            <div className="absolute top-0 left-[63%] -translate-x-1/2 flex flex-col items-center">
              <div className="w-1 h-6 bg-white rounded-full shadow-md" />
              <div className="mt-1 px-3 py-1 rounded-full bg-[var(--color-primary)] text-white text-xs font-heading font-bold whitespace-nowrap shadow-lg">
                8.5 - 9.5 pH
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────── HOW IT WORKS ─────────────────── */

function HowItWorks() {
  const { t } = useI18n();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const p = t.alkalineRoPage as any;
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const lineProgress = useTransform(scrollYProgress, [0.1, 0.65], [0, 1]);

  const stageIcons = [Filter, Waves, Pipette, Container, Milk];
  const stages = Array.from({ length: 5 }, (_, i) => ({
    icon: stageIcons[i],
    title: p[`stage${i + 1}Title` as keyof typeof p] as string,
    description: p[`stage${i + 1}Description` as keyof typeof p] as string,
  }));

  return (
    <section ref={ref} className="relative py-20 sm:py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-surface-alt)] via-white to-[var(--color-surface)]" />
        <svg
          className="absolute top-0 left-0 w-full h-40 opacity-[0.04]"
          viewBox="0 0 1440 160"
          preserveAspectRatio="none"
        >
          <path
            d="M0,80 C360,150 720,10 1080,80 C1260,120 1380,60 1440,80 L1440,0 L0,0 Z"
            fill="var(--color-primary)"
          />
        </svg>
        <div className="absolute top-1/4 right-[5%] w-[450px] h-[450px] bg-[radial-gradient(circle,var(--color-accent-light),transparent_70%)] opacity-[0.03]" />
        <div className="absolute bottom-1/4 left-[3%] w-[400px] h-[400px] bg-[radial-gradient(circle,var(--color-secondary-light),transparent_70%)] opacity-[0.04]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block font-heading font-semibold text-sm uppercase tracking-wider text-brand-aqua mb-3">
            {p.processBadge}
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-[var(--color-text-primary)]">
            {p.processHeadline}
          </h2>
          <p className="font-body text-[var(--color-text-secondary)] text-lg mt-4 max-w-2xl mx-auto">
            {p.processDescription}
          </p>
        </motion.div>

        <div className="relative max-w-3xl mx-auto">
          {/* Connecting line */}
          <div className="absolute left-7 top-0 bottom-0 w-[2px] bg-[var(--color-border)] hidden sm:block">
            <motion.div
              style={{ height: useTransform(lineProgress, (v) => `${v * 100}%`) }}
              className="w-full bg-gradient-to-b from-brand-cyan to-brand-navy rounded-full origin-top"
            />
          </div>

          <div className="space-y-10">
            {stages.map((stage, i) => (
              <motion.div
                key={stage.title}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: 0.2 + i * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="flex gap-6 items-start"
              >
                <div className="relative z-10 w-14 h-14 rounded-xl bg-white border-2 border-brand-cyan/20 flex items-center justify-center shrink-0 shadow-sm">
                  <stage.icon className="w-6 h-6 text-brand-cyan" />
                </div>
                <div className="pt-1">
                  <span className="font-heading font-bold text-xs uppercase tracking-widest text-brand-cyan/60 mb-1 block">
                    {p.stageLabel} {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-heading font-bold text-xl text-[var(--color-text-primary)] mb-2">
                    {stage.title}
                  </h3>
                  <p className="font-body text-[var(--color-text-secondary)] leading-relaxed">
                    {stage.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── PRODUCT IMAGE ─────────────────── */

function ProductImage() {
  const { t } = useI18n();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const p = t.alkalineRoPage as any;
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section ref={ref} className="relative py-16 sm:py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-[var(--color-surface)] to-white" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,var(--color-primary),transparent_70%)] opacity-[0.025]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-2xl overflow-hidden border border-[var(--color-border)] shadow-xl shadow-brand-navy/5"
        >
          <motion.div style={{ y: imgY }}>
            <Image
              src="/images/client/photo-03.jpeg"
              alt="Aquafeel Alkaline Reverse Osmosis system"
              width={1000}
              height={600}
              className="w-full h-auto object-cover"
              priority
            />
          </motion.div>
          {/* Bottom info bar */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-brand-navy/80 to-transparent px-6 py-6 sm:px-8 sm:py-8">
            <p className="font-heading font-bold text-white text-lg sm:text-xl">
              {p.productImageTitle}
            </p>
            <p className="font-body text-white/70 text-sm mt-1">
              {p.productImageSubtitle}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────── BENEFITS GRID ─────────────────── */

function BenefitsGrid() {
  const { t } = useI18n();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const p = t.alkalineRoPage as any;
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const benefitIcons = [ShieldCheck, Sparkles, Beaker, Heart, GlassWater, Droplets];
  const benefits = Array.from({ length: 6 }, (_, i) => ({
    icon: benefitIcons[i],
    title: p[`benefit${i + 1}Title` as keyof typeof p] as string,
    description: p[`benefit${i + 1}Description` as keyof typeof p] as string,
  }));

  return (
    <section ref={ref} className="relative py-20 sm:py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-surface)] via-white to-[var(--color-surface-alt)]" />
        <div className="absolute top-[15%] left-[10%] w-[500px] h-[500px] bg-[radial-gradient(circle,var(--color-secondary-light),transparent_70%)] opacity-[0.04]" />
        <div className="absolute bottom-[10%] right-[8%] w-[550px] h-[550px] bg-[radial-gradient(circle,var(--color-accent-light),transparent_70%)] opacity-[0.035]" />
        <svg
          className="absolute bottom-0 left-0 w-full h-32 opacity-[0.04]"
          viewBox="0 0 1440 130"
          preserveAspectRatio="none"
        >
          <path
            d="M0,65 C480,130 960,0 1440,65 L1440,130 L0,130 Z"
            fill="var(--color-secondary)"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block font-heading font-semibold text-sm uppercase tracking-wider text-brand-cyan mb-3">
            {p.benefitsBadge}
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-[var(--color-text-primary)]">
            {p.benefitsHeadline}
          </h2>
          <p className="font-body text-[var(--color-text-secondary)] text-lg mt-4 max-w-2xl mx-auto">
            {p.benefitsDescription}
          </p>
        </motion.div>

        {/* First row: 2 large cards */}
        <div className="grid sm:grid-cols-2 gap-6 lg:gap-8 mb-6 lg:mb-8">
          {benefits.slice(0, 2).map((benefit, i) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{
                duration: 0.5,
                delay: 0.1 + i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative rounded-2xl border border-[var(--color-border)] bg-white p-8 lg:p-9 hover:shadow-xl hover:shadow-brand-navy/5 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="absolute top-0 left-8 right-8 h-[2px] rounded-full bg-brand-cyan opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="w-14 h-14 rounded-xl bg-brand-cyan/10 flex items-center justify-center mb-5">
                <benefit.icon className="w-7 h-7 text-brand-cyan" />
              </div>
              <h3 className="font-heading font-bold text-xl text-[var(--color-text-primary)] mb-3">
                {benefit.title}
              </h3>
              <p className="font-body text-[var(--color-text-secondary)] leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Second row: remaining cards (smaller) */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {benefits.slice(2).map((benefit, i) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{
                duration: 0.5,
                delay: 0.25 + i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative rounded-2xl border border-[var(--color-border)] bg-white p-6 hover:shadow-xl hover:shadow-brand-navy/5 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="absolute top-0 left-6 right-6 h-[2px] rounded-full bg-brand-cyan opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="w-10 h-10 rounded-lg bg-brand-cyan/10 flex items-center justify-center mb-4">
                <benefit.icon className="w-5 h-5 text-brand-cyan" />
              </div>
              <h3 className="font-heading font-bold text-base text-[var(--color-text-primary)] mb-2">
                {benefit.title}
              </h3>
              <p className="font-body text-[var(--color-text-secondary)] text-sm leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── FAQ ─────────────────── */

function FAQItem({
  faq,
  index,
  isOpen,
  onToggle,
}: {
  faq: { question: string; answer: string };
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="border border-[var(--color-border)] rounded-xl bg-white overflow-hidden hover:shadow-md hover:shadow-brand-navy/5 transition-shadow duration-300"
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <h3 className="font-heading font-bold text-[var(--color-text-primary)] text-base sm:text-lg pr-4">
          {faq.question}
        </h3>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="shrink-0"
        >
          <ChevronDown className="w-5 h-5 text-brand-cyan" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-5 border-t border-[var(--color-border)]">
              <p className="font-body text-[var(--color-text-secondary)] leading-relaxed pt-4">
                {faq.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function FAQSection() {
  const { t } = useI18n();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const p = t.alkalineRoPage as any;
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const faqs = Array.from({ length: 4 }, (_, i) => ({
    question: p[`faq${i + 1}Question` as keyof typeof p] as string,
    answer: p[`faq${i + 1}Answer` as keyof typeof p] as string,
  }));

  return (
    <section ref={ref} className="relative py-20 sm:py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-[var(--color-surface)] to-white" />
        <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] bg-[radial-gradient(circle,var(--color-primary),transparent_70%)] opacity-[0.03]" />
        <div className="absolute bottom-[15%] left-[5%] w-[400px] h-[400px] bg-[radial-gradient(circle,var(--color-accent-light),transparent_70%)] opacity-[0.04]" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block font-heading font-semibold text-sm uppercase tracking-wider text-brand-cyan mb-3">
            {p.faqBadge}
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-[var(--color-text-primary)]">
            {p.faqHeadline}
          </h2>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <FAQItem
              key={faq.question}
              faq={faq}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── CTA ─────────────────── */

function CTASection() {
  const { t } = useI18n();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const p = t.alkalineRoPage as any;
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="relative py-20 sm:py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, #171751 0%, #252772 50%, #0e7490 100%)",
          }}
        />
        <Image src="/images/water/water-surface.jpeg" alt="" fill className="object-cover opacity-15 mix-blend-luminosity" />
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.08, 0.14, 0.08],
            x: [0, 25, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-10 right-[10%] w-[450px] h-[450px] rounded-full bg-[radial-gradient(circle,var(--color-secondary-light),transparent_70%)]"
        />
        <motion.div
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.06, 0.10, 0.06],
            x: [0, -20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
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
            {p.ctaHeadline}{" "}
            <span className="text-brand-cyan">{p.ctaHighlight}</span>{" "}
            {p.ctaHeadlineEnd}
          </h2>
          <p className="font-body text-white/70 text-lg sm:text-xl mt-5 max-w-2xl mx-auto leading-relaxed">
            {p.ctaDescription}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-[var(--color-accent-light)] text-[var(--color-primary-dark)] font-heading font-bold text-base hover:bg-[var(--color-accent)] transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg shadow-teal-500/20"
            >
              {p.ctaPrimary}
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="tel:9842123558"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg border-2 border-white/20 text-white font-heading font-semibold text-base hover:bg-white/10 transition-all duration-200"
            >
              {p.ctaCall}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────── PAGE ─────────────────── */

export default function AlkalineROPage() {
  return (
    <>
      <Header />
      <main>
        <AlkalineHero />
        <Overview />
        <ImageBreak src="/images/water/girl-drinking.jpeg" alt="Girl drinking pure alkaline water" text="Pure, Alkaline Hydration" />
        <HowItWorks />
        <ProductImage />
        <BenefitsGrid />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
