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
  Award,
  Wrench,
  DollarSign,
  ChevronRight,
  ChevronDown,
  ArrowRight,
  Check,
  Layers,
  Filter,
  GlassWater,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useI18n } from "@/lib/i18n/context";

/* ─────────────────── HERO ─────────────────── */

function ROHero() {
  const { t } = useI18n();
  const p = t.reverseOsmosisPage;
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-[440px] flex items-center overflow-hidden"
    >
      {/* Gradient background with parallax */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 -top-20">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, #0f172a 0%, #1e293b 40%, #0d9488 100%)",
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
          className="absolute top-8 right-[12%] w-[480px] h-[480px] rounded-full bg-[radial-gradient(circle,var(--color-secondary-light),transparent_70%)]"
        />
        <motion.div
          animate={{
            scale: [1.1, 0.95, 1.1],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{
            duration: 11,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2.5,
          }}
          className="absolute bottom-0 left-[8%] w-[380px] h-[380px] rounded-full bg-[radial-gradient(circle,var(--color-accent-light),transparent_70%)]"
        />
        {/* Diagonal sweep */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.025] to-transparent" />
      </motion.div>

      <motion.div
        style={{ opacity: contentOpacity }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-32 pb-16"
      >
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center gap-2 text-white/50 text-sm font-body mb-6"
        >
          <Link
            href="/"
            className="hover:text-white/80 transition-colors"
          >
            {p.breadcrumbHome}
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link
            href="/services"
            className="hover:text-white/80 transition-colors"
          >
            {p.breadcrumbServices}
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

/* ─────────────────── OVERVIEW ─────────────────── */

function Overview() {
  const { t } = useI18n();
  const p = t.reverseOsmosisPage;
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const whoIsItForItems = [
    p.whoIsItForItem1,
    p.whoIsItForItem2,
    p.whoIsItForItem3,
    p.whoIsItForItem4,
    p.whoIsItForItem5,
    p.whoIsItForItem6,
  ];

  return (
    <section ref={ref} className="relative py-20 sm:py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-[var(--color-surface)] to-white" />
        <div className="absolute top-[10%] right-[5%] w-[550px] h-[550px] bg-[radial-gradient(circle,var(--color-secondary-light),transparent_70%)] opacity-[0.04]" />
        <div className="absolute bottom-[10%] left-[10%] w-[400px] h-[400px] bg-[radial-gradient(circle,var(--color-accent-light),transparent_70%)] opacity-[0.03]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Large watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none" aria-hidden="true">
          <span className="font-heading font-black text-[200px] leading-none text-[var(--color-primary)] opacity-[0.03]">
            99%
          </span>
        </div>

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

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{
              duration: 0.6,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <p className="font-body text-[var(--color-text-secondary)] text-lg leading-relaxed mb-5">
              {p.overviewDescription1}
            </p>
            <p className="font-body text-[var(--color-text-secondary)] text-lg leading-relaxed mb-5">
              {p.overviewDescription2}
            </p>
            <p className="font-body text-[var(--color-text-secondary)] text-lg leading-relaxed">
              {p.overviewDescription3}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{
              duration: 0.6,
              delay: 0.25,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="bg-white rounded-2xl border border-[var(--color-border)] p-8 shadow-lg shadow-brand-navy/5"
          >
            <h3 className="font-heading font-bold text-xl text-[var(--color-text-primary)] mb-5">
              {p.whoIsItFor}
            </h3>
            <ul className="space-y-4">
              {whoIsItForItems.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.35 + i * 0.06 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-5 h-5 rounded-full bg-brand-cyan/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-brand-cyan" />
                  </div>
                  <span className="font-body text-[var(--color-text-secondary)] text-sm leading-relaxed">
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

/* ─────────────────── HOW IT WORKS ─────────────────── */

function HowItWorks() {
  const { t } = useI18n();
  const p = t.reverseOsmosisPage;
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const lineProgress = useTransform(scrollYProgress, [0.15, 0.55], [0, 1]);

  const stepIcons = [Filter, Droplets, Sparkles];
  const steps = Array.from({ length: 3 }, (_, i) => ({
    icon: stepIcons[i],
    number: String(i + 1).padStart(2, "0"),
    title: p[`step${i + 1}Title` as keyof typeof p] as string,
    description: p[`step${i + 1}Description` as keyof typeof p] as string,
  }));

  return (
    <section ref={ref} className="relative py-20 sm:py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-surface-alt)] via-white to-[var(--color-surface)]" />
        <svg
          className="absolute bottom-0 left-0 w-full h-40 opacity-[0.04]"
          viewBox="0 0 1440 160"
          preserveAspectRatio="none"
        >
          <path
            d="M0,80 C360,140 720,20 1080,80 C1260,110 1380,60 1440,80 L1440,160 L0,160 Z"
            fill="var(--color-primary)"
          />
        </svg>
        <div className="absolute top-[20%] right-[5%] w-[450px] h-[450px] bg-[radial-gradient(circle,var(--color-primary),transparent_70%)] opacity-[0.03]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block font-heading font-semibold text-sm uppercase tracking-wider text-brand-cyan mb-3">
            {p.processBadge}
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-[var(--color-text-primary)]">
            {p.processHeadline}
          </h2>
          <p className="font-body text-[var(--color-text-secondary)] text-lg mt-4 max-w-xl mx-auto">
            {p.processDescription}
          </p>
        </motion.div>

        <div className="relative max-w-3xl mx-auto">
          {/* Scroll-animated connecting line */}
          <div className="absolute left-7 top-0 bottom-0 w-[2px] bg-[var(--color-border)] hidden sm:block">
            <motion.div
              style={{ scaleY: lineProgress, transformOrigin: "top" }}
              className="w-full h-full bg-gradient-to-b from-brand-cyan to-brand-navy rounded-full"
            />
          </div>

          <div className="space-y-14">
            {steps.map((step, i) => (
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
                    {p.stageLabel} {step.number}
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
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── PRODUCT IMAGE ─────────────────── */

function ProductImage() {
  const { t } = useI18n();
  const p = t.reverseOsmosisPage;
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
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[radial-gradient(circle,var(--color-secondary-light),transparent_70%)] opacity-[0.04]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="inline-block font-heading font-semibold text-sm uppercase tracking-wider text-brand-aqua mb-3">
            {p.productBadge}
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-[var(--color-text-primary)]">
            {p.productHeadline}
          </h2>
        </motion.div>

        <motion.div
          style={{ y: imgY }}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{
            duration: 0.7,
            delay: 0.15,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative rounded-2xl overflow-hidden border border-[var(--color-border)] shadow-xl shadow-brand-navy/8 group"
        >
          <Image
            src="/images/client/photo-02.jpeg"
            alt="Aquafeel Solutions reverse osmosis under-sink purification system"
            width={1000}
            height={600}
            className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            priority
          />
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────── BENEFITS GRID ─────────────────── */

function BenefitsGrid() {
  const { t } = useI18n();
  const p = t.reverseOsmosisPage;
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const benefitIcons = [ShieldCheck, Layers, GlassWater, Award, Wrench, DollarSign];
  const benefitColors = [
    "var(--color-secondary-light)",
    "var(--color-primary-light)",
    "var(--color-accent-light)",
    "var(--color-secondary-dark)",
    "var(--color-accent)",
    "var(--color-primary)",
  ];
  const benefits = Array.from({ length: 6 }, (_, i) => ({
    icon: benefitIcons[i],
    title: p[`benefit${i + 1}Title` as keyof typeof p] as string,
    description: p[`benefit${i + 1}Description` as keyof typeof p] as string,
    color: benefitColors[i],
  }));

  return (
    <section ref={ref} className="relative py-20 sm:py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-[var(--color-surface-alt)] to-white" />
        <div className="absolute top-0 left-[20%] w-[500px] h-[500px] bg-[radial-gradient(circle,var(--color-accent-light),transparent_70%)] opacity-[0.04]" />
        <div className="absolute bottom-0 right-[15%] w-[450px] h-[450px] bg-[radial-gradient(circle,var(--color-primary-light),transparent_70%)] opacity-[0.04]" />
        {/* Subtle wave divider */}
        <svg
          className="absolute top-0 left-0 w-full h-32 opacity-[0.04]"
          viewBox="0 0 1440 128"
          preserveAspectRatio="none"
        >
          <path
            d="M0,64 C240,20 480,108 720,64 C960,20 1200,108 1440,64 L1440,0 L0,0 Z"
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

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {benefits.map((benefit, i) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{
                duration: 0.5,
                delay: i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative rounded-2xl border border-[var(--color-border)] bg-white p-7 hover:shadow-xl hover:shadow-brand-navy/5 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Numbered badge */}
              <span className="absolute top-4 right-4 w-8 h-8 rounded-full bg-brand-cyan/10 flex items-center justify-center font-heading text-xs font-bold text-brand-cyan">
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Top accent bar */}
              <div
                className="absolute top-0 left-7 right-7 h-[2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: benefit.color }}
              />

              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{
                  background: `color-mix(in srgb, ${benefit.color} 12%, white)`,
                }}
              >
                <benefit.icon
                  className="w-6 h-6"
                  style={{ color: benefit.color }}
                />
              </div>

              <h3 className="font-heading font-bold text-lg text-[var(--color-text-primary)] mb-2">
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
  isInView,
}: {
  faq: { question: string; answer: string };
  index: number;
  isInView: boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.5,
        delay: 0.15 + index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="border border-[var(--color-border)] rounded-xl overflow-hidden bg-white"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-[var(--color-surface)] transition-colors duration-200"
      >
        <span className="font-heading font-semibold text-[var(--color-text-primary)]">
          {faq.question}
        </span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="shrink-0"
        >
          <ChevronDown className="w-5 h-5 text-[var(--color-text-muted)]" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-5 pt-0">
              <p className="font-body text-[var(--color-text-secondary)] leading-relaxed">
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
  const p = t.reverseOsmosisPage;
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
        <div className="absolute top-[15%] left-[5%] w-[500px] h-[500px] bg-[radial-gradient(circle,var(--color-primary-light),transparent_70%)] opacity-[0.03]" />
        <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] bg-[radial-gradient(circle,var(--color-secondary-light),transparent_70%)] opacity-[0.04]" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block font-heading font-semibold text-sm uppercase tracking-wider text-brand-cyan mb-3">
            {p.faqBadge}
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-[var(--color-text-primary)]">
            {p.faqHeadline}
          </h2>
          <p className="font-body text-[var(--color-text-secondary)] text-lg mt-4 max-w-xl mx-auto">
            {p.faqDescription}
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <FAQItem key={i} faq={faq} index={i} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── CTA ─────────────────── */

function ROCallToAction() {
  const { t } = useI18n();
  const p = t.reverseOsmosisPage;
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="relative py-20 sm:py-28 overflow-hidden">
      {/* Dark gradient background with floating orbs */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary-dark)] via-[var(--color-primary)] to-[var(--color-secondary-dark)]" />
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
          className="absolute top-10 right-[10%] w-[420px] h-[420px] rounded-full bg-[radial-gradient(circle,var(--color-secondary-light),transparent_70%)]"
        />
        <motion.div
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.06, 0.1, 0.06],
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
            <span className="text-brand-cyan">{p.ctaHighlight}</span>
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

export default function ReverseOsmosisPage() {
  return (
    <>
      <Header />
      <main>
        <ROHero />
        <Overview />
        <HowItWorks />
        <ProductImage />
        <BenefitsGrid />
        <FAQSection />
        <ROCallToAction />
      </main>
      <Footer />
    </>
  );
}
