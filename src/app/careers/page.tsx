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
  Shield,
  Heart,
  TrendingUp,
  Award,
  ChevronRight,
  ChevronDown,
  MapPin,
  Clock,
  ArrowRight,
  Users,
  Target,
  Handshake,
  Mail,
  Phone,
  Briefcase,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useI18n } from "@/lib/i18n/context";

/* ─────────────────── HERO ─────────────────── */

function CareersHero() {
  const { t } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const scrollToPositions = () => {
    const el = document.getElementById("open-positions");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section ref={ref} className="relative min-h-[460px] flex items-center overflow-hidden">
      {/* Gradient background */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 -top-20"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary-dark)] via-[var(--color-primary)] to-[var(--color-primary-light)]" />
        {/* Animated orbs */}
        <motion.div
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.07, 0.13, 0.07],
          }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-8 right-[12%] w-[520px] h-[520px] rounded-full bg-[radial-gradient(circle,var(--color-secondary-light),transparent_70%)]"
        />
        <motion.div
          animate={{
            scale: [1.1, 0.95, 1.1],
            opacity: [0.05, 0.11, 0.05],
          }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
          className="absolute bottom-0 left-[8%] w-[420px] h-[420px] rounded-full bg-[radial-gradient(circle,var(--color-accent-light),transparent_70%)]"
        />
        {/* Diagonal sweep */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-transparent" />
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
            {t.careersPage.breadcrumbHome}
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-white/80">{t.careersPage.breadcrumbCareers}</span>
        </motion.nav>

        {/* Headline */}
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl text-white leading-[1.1] max-w-3xl"
          >
            {t.careersPage.heroHeadline}{" "}
            <span className="text-brand-cyan">{t.careersPage.heroHighlight}</span>
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="font-body text-white/70 text-lg sm:text-xl mt-5 max-w-2xl leading-relaxed"
        >
          {t.careersPage.heroDescription}
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          onClick={scrollToPositions}
          className="inline-flex items-center gap-2 mt-8 px-8 py-4 rounded-lg bg-[var(--color-accent-light)] text-[var(--color-primary-dark)] font-heading font-bold text-base hover:bg-[var(--color-accent)] transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg shadow-teal-500/20"
        >
          {t.careersPage.viewOpenPositions}
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent z-10" />
    </section>
  );
}

/* ─────────────────── WHY WORK WITH US ─────────────────── */

function WhyWorkWithUs() {
  const { t } = useI18n();
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const benefits = [
    {
      icon: Shield,
      title: t.careersPage.benefit1Title,
      description: t.careersPage.benefit1Description,
      color: "var(--color-primary)",
    },
    {
      icon: Heart,
      title: t.careersPage.benefit2Title,
      description: t.careersPage.benefit2Description,
      color: "var(--color-secondary-light)",
    },
    {
      icon: TrendingUp,
      title: t.careersPage.benefit3Title,
      description: t.careersPage.benefit3Description,
      color: "var(--color-accent-light)",
    },
    {
      icon: Award,
      title: t.careersPage.benefit4Title,
      description: t.careersPage.benefit4Description,
      color: "var(--color-secondary-dark)",
    },
  ];

  return (
    <section ref={ref} className="relative py-20 sm:py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-[var(--color-surface)] to-white" />
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[radial-gradient(circle,var(--color-secondary-light),transparent_70%)] opacity-[0.04]" />
        <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] bg-[radial-gradient(circle,var(--color-primary),transparent_70%)] opacity-[0.04]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block font-heading font-semibold text-sm uppercase tracking-wider text-brand-cyan mb-3">
            {t.careersPage.whyLabel}
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-[var(--color-text-primary)]">
            {t.careersPage.whyHeadline}
          </h2>
          <p className="font-body text-[var(--color-text-secondary)] text-lg mt-4 max-w-2xl mx-auto">
            {t.careersPage.whyDescription}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
          {benefits.map((benefit, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{
                duration: 0.5,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative rounded-2xl border border-[var(--color-border)] bg-white p-8 hover:shadow-xl hover:shadow-brand-navy/5 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Top accent bar */}
              <div
                className="absolute top-0 left-8 right-8 h-[2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: benefit.color }}
              />

              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-5"
                style={{ background: `color-mix(in srgb, ${benefit.color} 12%, white)` }}
              >
                <benefit.icon
                  className="w-7 h-7"
                  style={{ color: benefit.color }}
                />
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
      </div>
    </section>
  );
}

/* ─────────────────── COMPANY CULTURE ─────────────────── */

function CompanyCulture() {
  const { t } = useI18n();
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

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
        <div className="absolute top-[20%] left-0 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_center,var(--color-accent-light),transparent_70%)] opacity-[0.03]" />
        <div className="absolute bottom-[10%] right-0 w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_center,var(--color-secondary-light),transparent_70%)] opacity-[0.04]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative rounded-2xl overflow-hidden group">
              <Image
                src="/images/client/photo-10.jpeg"
                alt="Aquafeel Solutions team at work"
                width={600}
                height={450}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-block font-heading font-semibold text-sm uppercase tracking-wider text-brand-aqua mb-3">
              {t.careersPage.cultureLabel}
            </span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-[var(--color-text-primary)] mb-5">
              {t.careersPage.cultureHeadline}
            </h2>
            <div className="space-y-4 font-body text-[var(--color-text-secondary)] leading-relaxed">
              <p>{t.careersPage.cultureP1}</p>
              <p>{t.careersPage.cultureP2}</p>
              <p>
                {t.careersPage.cultureP3Prefix}
                <span className="font-semibold text-[var(--color-text-primary)]">
                  {t.careersPage.cultureIntegrity}
                </span>
                ,{" "}
                <span className="font-semibold text-[var(--color-text-primary)]">
                  {t.careersPage.cultureQuality}
                </span>
                , and{" "}
                <span className="font-semibold text-[var(--color-text-primary)]">
                  {t.careersPage.cultureCommunity}
                </span>
                {t.careersPage.cultureP3Suffix}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── OPEN POSITIONS ─────────────────── */

function PositionCard({
  position,
  index,
  isInView,
}: {
  position: {
    title: string;
    type: string;
    location: string;
    summary: string;
    description: string;
    requirements: string[];
  };
  index: number;
  isInView: boolean;
}) {
  const { t } = useI18n();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="rounded-2xl border border-[var(--color-border)] bg-white overflow-hidden hover:shadow-lg hover:shadow-brand-navy/5 transition-shadow duration-300"
    >
      {/* Header - always visible */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left p-6 sm:p-8 flex items-start justify-between gap-4 group"
      >
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-cyan/10 text-brand-cyan font-heading font-semibold text-xs uppercase tracking-wider">
              <Clock className="w-3 h-3" />
              {position.type}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--color-surface)] text-[var(--color-text-secondary)] font-heading font-semibold text-xs uppercase tracking-wider">
              <MapPin className="w-3 h-3" />
              {position.location}
            </span>
          </div>
          <h3 className="font-heading font-bold text-xl sm:text-2xl text-[var(--color-text-primary)] group-hover:text-brand-cyan transition-colors duration-200">
            {position.title}
          </h3>
          <p className="font-body text-[var(--color-text-secondary)] mt-2 leading-relaxed">
            {position.summary}
          </p>
        </div>

        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="shrink-0 w-10 h-10 rounded-full bg-[var(--color-surface)] flex items-center justify-center mt-1 group-hover:bg-brand-cyan/10 transition-colors duration-200"
        >
          <ChevronDown className="w-5 h-5 text-[var(--color-text-secondary)] group-hover:text-brand-cyan transition-colors duration-200" />
        </motion.div>
      </button>

      {/* Expandable content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 sm:px-8 pb-8 border-t border-[var(--color-border)]">
              <div className="pt-6 space-y-5">
                <div>
                  <h4 className="font-heading font-bold text-sm uppercase tracking-wider text-[var(--color-text-primary)] mb-3">
                    {t.careersPage.aboutThisRole}
                  </h4>
                  <p className="font-body text-[var(--color-text-secondary)] leading-relaxed">
                    {position.description}
                  </p>
                </div>

                <div>
                  <h4 className="font-heading font-bold text-sm uppercase tracking-wider text-[var(--color-text-primary)] mb-3">
                    {t.careersPage.requirements}
                  </h4>
                  <ul className="space-y-2.5">
                    {position.requirements.map((req, j) => (
                      <motion.li
                        key={j}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: j * 0.06 }}
                        className="flex items-start gap-3"
                      >
                        <div className="w-5 h-5 rounded-full bg-brand-cyan/10 flex items-center justify-center shrink-0 mt-0.5">
                          <ChevronRight className="w-3 h-3 text-brand-cyan" />
                        </div>
                        <span className="font-body text-[var(--color-text-secondary)] text-sm leading-relaxed">
                          {req}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <a
                  href="mailto:fahada@aquafeelsolutionsnc.com?subject=Application%20-%20Water%20Quality%20Technician"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[var(--color-primary)] text-white font-heading font-semibold text-sm hover:bg-[var(--color-primary-light)] transition-all duration-200 hover:gap-3 group/btn"
                >
                  {t.careersPage.applyNow}
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function OpenPositions() {
  const { t } = useI18n();
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const positions = [
    {
      title: t.careersPage.position1Title,
      type: t.careersPage.position1Type,
      location: t.careersPage.position1Location,
      summary: t.careersPage.position1Summary,
      description: t.careersPage.position1Description,
      requirements: [
        t.careersPage.position1Req1,
        t.careersPage.position1Req2,
        t.careersPage.position1Req3,
        t.careersPage.position1Req4,
        t.careersPage.position1Req5,
      ],
    },
    {
      title: t.careersPage.position2Title,
      type: t.careersPage.position2Type,
      location: t.careersPage.position2Location,
      summary: t.careersPage.position2Summary,
      description: t.careersPage.position2Description,
      requirements: [
        t.careersPage.position2Req1,
        t.careersPage.position2Req2,
        t.careersPage.position2Req3,
        t.careersPage.position2Req4,
        t.careersPage.position2Req5,
      ],
    },
    {
      title: t.careersPage.position3Title,
      type: t.careersPage.position3Type,
      location: t.careersPage.position3Location,
      summary: t.careersPage.position3Summary,
      description: t.careersPage.position3Description,
      requirements: [
        t.careersPage.position3Req1,
        t.careersPage.position3Req2,
        t.careersPage.position3Req3,
        t.careersPage.position3Req4,
        t.careersPage.position3Req5,
      ],
    },
    {
      title: t.careersPage.position4Title,
      type: t.careersPage.position4Type,
      location: t.careersPage.position4Location,
      summary: t.careersPage.position4Summary,
      description: t.careersPage.position4Description,
      requirements: [
        t.careersPage.position4Req1,
        t.careersPage.position4Req2,
        t.careersPage.position4Req3,
        t.careersPage.position4Req4,
        t.careersPage.position4Req5,
      ],
    },
  ];

  return (
    <section
      id="open-positions"
      ref={ref}
      className="relative py-20 sm:py-28 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-[var(--color-surface)] to-white" />
        <svg
          className="absolute bottom-0 left-0 w-full h-48 opacity-[0.05]"
          viewBox="0 0 1440 200"
          preserveAspectRatio="none"
        >
          <path
            d="M0,100 C360,160 720,40 1080,100 C1260,130 1380,80 1440,100 L1440,200 L0,200 Z"
            fill="var(--color-primary)"
          />
        </svg>
        <div className="absolute top-1/4 right-[5%] w-[500px] h-[500px] bg-[radial-gradient(circle,var(--color-secondary-light),transparent_70%)] opacity-[0.04]" />
        <div className="absolute bottom-1/4 left-[5%] w-[400px] h-[400px] bg-[radial-gradient(circle,var(--color-accent-light),transparent_70%)] opacity-[0.03]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block font-heading font-semibold text-sm uppercase tracking-wider text-brand-cyan mb-3">
            <Briefcase className="w-4 h-4 inline-block mr-1.5 -mt-0.5" />
            {t.careersPage.positionsLabel}
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-[var(--color-text-primary)]">
            {t.careersPage.positionsHeadline}
          </h2>
          <p className="font-body text-[var(--color-text-secondary)] text-lg mt-4 max-w-2xl mx-auto">
            {t.careersPage.positionsDescription}
          </p>
        </motion.div>

        <div className="space-y-5">
          {positions.map((position, i) => (
            <PositionCard
              key={i}
              position={position}
              index={i}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── WHAT WE LOOK FOR ─────────────────── */

function WhatWeLookFor() {
  const { t } = useI18n();
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const qualities = [
    {
      icon: Target,
      title: t.careersPage.quality1Title,
      description: t.careersPage.quality1Description,
      color: "var(--color-primary)",
    },
    {
      icon: Users,
      title: t.careersPage.quality2Title,
      description: t.careersPage.quality2Description,
      color: "var(--color-secondary-light)",
    },
    {
      icon: Handshake,
      title: t.careersPage.quality3Title,
      description: t.careersPage.quality3Description,
      color: "var(--color-accent-light)",
    },
  ];

  return (
    <section ref={ref} className="relative py-20 sm:py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-surface-alt)] via-white to-[var(--color-surface)]" />
        <div className="absolute top-1/3 left-1/4 w-[550px] h-[550px] bg-[radial-gradient(circle,var(--color-primary),transparent_70%)] opacity-[0.03]" />
        <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] bg-[radial-gradient(circle,var(--color-secondary-light),transparent_70%)] opacity-[0.04]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block font-heading font-semibold text-sm uppercase tracking-wider text-brand-aqua mb-3">
            {t.careersPage.valuesLabel}
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-[var(--color-text-primary)]">
            {t.careersPage.valuesHeadline}
          </h2>
          <p className="font-body text-[var(--color-text-secondary)] text-lg mt-4 max-w-xl mx-auto">
            {t.careersPage.valuesDescription}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-6 lg:gap-8">
          {qualities.map((quality, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{
                duration: 0.5,
                delay: i * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative rounded-2xl border border-[var(--color-border)] bg-white p-8 text-center hover:shadow-xl hover:shadow-brand-navy/5 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Top accent bar */}
              <div
                className="absolute top-0 left-8 right-8 h-[2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: quality.color }}
              />

              <div
                className="w-16 h-16 rounded-xl flex items-center justify-center mb-5 mx-auto"
                style={{ background: `color-mix(in srgb, ${quality.color} 12%, white)` }}
              >
                <quality.icon
                  className="w-8 h-8"
                  style={{ color: quality.color }}
                />
              </div>

              <h3 className="font-heading font-bold text-xl text-[var(--color-text-primary)] mb-3">
                {quality.title}
              </h3>
              <p className="font-body text-[var(--color-text-secondary)] leading-relaxed">
                {quality.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── APPLICATION CTA ─────────────────── */

function ApplicationCTA() {
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
            {t.careersPage.ctaHeadline}{" "}
            <span className="text-brand-cyan">{t.careersPage.ctaHighlight}</span>
          </h2>
          <p className="font-body text-white/70 text-lg sm:text-xl mt-5 max-w-2xl mx-auto leading-relaxed">
            {t.careersPage.ctaDescription}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <a
              href="mailto:fahada@aquafeelsolutionsnc.com?subject=Career%20Inquiry"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-[var(--color-accent-light)] text-[var(--color-primary-dark)] font-heading font-bold text-base hover:bg-[var(--color-accent)] transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg shadow-teal-500/20"
            >
              <Mail className="w-5 h-5" />
              {t.careersPage.emailResume}
            </a>
            <a
              href="tel:9842123558"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg border-2 border-white/20 text-white font-heading font-semibold text-base hover:bg-white/10 transition-all duration-200"
            >
              <Phone className="w-5 h-5" />
              {t.careersPage.ctaCall}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────── PAGE ─────────────────── */

export default function CareersPage() {
  return (
    <>
      <Header />
      <main>
        <CareersHero />
        <WhyWorkWithUs />
        <CompanyCulture />
        <OpenPositions />
        <WhatWeLookFor />
        <ApplicationCTA />
      </main>
      <Footer />
    </>
  );
}
