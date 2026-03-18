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
  Droplets,
  FlaskConical,
  ShieldCheck,
  Thermometer,
  Gauge,
  Atom,
  Waves,
  AlertTriangle,
  CalendarCheck,
  ClipboardCheck,
  FileText,
  ChevronDown,
  Phone,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useI18n } from "@/lib/i18n/context";

/* ─────────────────── HERO ─────────────────── */

function Hero() {
  const { t } = useI18n();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const p = t.waterTestingPage as any;

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
          <source src="/videos/water-droplet.mp4" type="video/mp4" />
        </video>
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(23,23,81,0.82) 0%, rgba(26,26,78,0.78) 40%, rgba(6,182,212,0.75) 100%)",
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
          className="absolute top-8 right-[12%] w-[520px] h-[520px] rounded-full bg-[radial-gradient(circle,var(--color-secondary-light),transparent_70%)]"
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
            delay: 3,
          }}
          className="absolute bottom-0 left-[8%] w-[380px] h-[380px] rounded-full bg-[radial-gradient(circle,var(--color-accent-light),transparent_70%)]"
        />
        {/* Diagonal sweep */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/[0.02] to-transparent" />
      </motion.div>

      {/* Floating FREE badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.8, type: "spring", stiffness: 200 }}
        className="absolute top-28 right-6 sm:right-12 lg:right-[10%] z-20"
      >
        <motion.div
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="relative"
        >
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[var(--color-accent-light)] flex items-center justify-center shadow-xl shadow-black/20">
            <span className="font-heading font-black text-xl sm:text-2xl text-[var(--color-primary-dark)] leading-none">
              {p.freeBadge}
            </span>
          </div>
          {/* Pulse ring */}
          <motion.div
            animate={{ scale: [1, 1.6], opacity: [0.4, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
            className="absolute inset-0 rounded-full border-2 border-[var(--color-accent-light)]"
          />
        </motion.div>
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 py-28 lg:py-32"
      >
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center gap-2 text-sm text-white/60 mb-6 font-body"
        >
          <Link href="/" className="hover:text-white/90 transition-colors">
            {p.breadcrumbHome}
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-white/90">{p.breadcrumbWaterTesting}</span>
        </motion.nav>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white max-w-3xl leading-[1.1] tracking-tight"
        >
          {p.heroHeadline1}
          <span className="text-[var(--color-accent-light)]">
            {p.heroHeadlineHighlight}
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="font-body text-lg md:text-xl text-white/75 mt-5 max-w-2xl leading-relaxed"
        >
          {p.heroSubtitle}
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8 flex flex-wrap gap-4"
        >
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[var(--color-accent-light)] text-[var(--color-primary-dark)] font-heading font-semibold text-base hover:brightness-110 transition-all duration-200 shadow-lg shadow-black/20"
          >
            {p.ctaBook}
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="tel:+19842123558"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-white/20 text-white font-heading font-medium text-base hover:bg-white/10 transition-all duration-200"
          >
            <Phone className="w-4 h-4" />
            {p.ctaCall}
          </a>
        </motion.div>
      </motion.div>
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
          className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl text-white text-center max-w-2xl leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]"
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
  const p = t.waterTestingPage as any;

  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const checks = [p.overviewCheck1, p.overviewCheck2, p.overviewCheck3, p.overviewCheck4];

  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      {/* Background treatment */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[var(--color-surface)]" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(circle,var(--color-secondary-light),transparent_70%)] opacity-[0.04]" />
        <div className="absolute bottom-0 left-[20%] w-[500px] h-[500px] bg-[radial-gradient(circle,var(--color-primary-light),transparent_70%)] opacity-[0.03]" />
        <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent opacity-40" />
      </div>

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-heading font-semibold tracking-wider uppercase bg-[var(--color-secondary-light)]/10 text-[var(--color-secondary)] mb-5">
              {p.overviewLabel}
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] leading-tight">
              {p.overviewHeadline}
            </h2>
            <div className="mt-6 space-y-4 font-body text-[var(--color-text-secondary)] leading-relaxed">
              <p>{p.overviewP1}</p>
              <p>{p.overviewP2}</p>
              <p>{p.overviewP3}</p>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
              {checks.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 12 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-2.5"
                >
                  <CheckCircle2 className="w-4.5 h-4.5 text-[var(--color-accent)] shrink-0" />
                  <span className="font-body text-sm text-[var(--color-text-primary)] font-medium">
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-[var(--color-primary)]/10">
              <Image
                src="/images/client/photo-04.jpeg"
                alt={p.overviewImageAlt}
                width={640}
                height={480}
                className="w-full h-auto object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary-dark)]/20 to-transparent" />
            </div>
            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.6, type: "spring", stiffness: 200 }}
              className="absolute -bottom-4 -left-4 md:-bottom-5 md:-left-5 bg-white rounded-xl shadow-xl shadow-black/10 p-4 border border-[var(--color-border)]"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[var(--color-accent-light)]/15 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-[var(--color-accent)]" />
                </div>
                <div>
                  <p className="font-heading text-sm font-bold text-[var(--color-text-primary)]">
                    {p.overviewBadgeTitle}
                  </p>
                  <p className="font-body text-xs text-[var(--color-text-muted)]">
                    {p.overviewBadgeSubtitle}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── CONTAMINANTS GRID ─────────────────── */

function ContaminantsGrid() {
  const { t } = useI18n();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const p = t.waterTestingPage as any;

  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const contaminants = [
    { icon: Droplets, name: p.contaminant1Name, description: p.contaminant1Desc, color: "var(--color-secondary-light)", severity: "present" as const },
    { icon: Thermometer, name: p.contaminant2Name, description: p.contaminant2Desc, color: "var(--color-primary-light)", severity: "moderate" as const },
    { icon: Gauge, name: p.contaminant3Name, description: p.contaminant3Desc, color: "var(--color-accent)", severity: "moderate" as const },
    { icon: Atom, name: p.contaminant4Name, description: p.contaminant4Desc, color: "#ef4444", severity: "dangerous" as const },
    { icon: Waves, name: p.contaminant5Name, description: p.contaminant5Desc, color: "var(--color-secondary-dark)", severity: "moderate" as const },
    { icon: FlaskConical, name: p.contaminant6Name, description: p.contaminant6Desc, color: "var(--color-accent-light)", severity: "present" as const },
    { icon: AlertTriangle, name: p.contaminant7Name, description: p.contaminant7Desc, color: "#f59e0b", severity: "dangerous" as const },
    { icon: ShieldCheck, name: p.contaminant8Name, description: p.contaminant8Desc, color: "var(--color-primary)", severity: "dangerous" as const },
  ];

  const severityConfig = {
    dangerous: { dot: "bg-red-500", label: p.severityHighRisk, textColor: "text-red-600" },
    moderate: { dot: "bg-amber-400", label: p.severityModerate, textColor: "text-amber-600" },
    present: { dot: "bg-emerald-400", label: p.severityCommon, textColor: "text-emerald-600" },
  };

  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-white" />
        <div className="absolute top-[10%] left-[5%] w-[450px] h-[450px] bg-[radial-gradient(circle,var(--color-accent-light),transparent_70%)] opacity-[0.04]" />
        <div className="absolute bottom-[10%] right-[8%] w-[550px] h-[550px] bg-[radial-gradient(circle,var(--color-secondary-light),transparent_70%)] opacity-[0.05]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent opacity-50" />
      </div>

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-heading font-semibold tracking-wider uppercase bg-[var(--color-primary)]/8 text-[var(--color-primary)] mb-4">
            {p.contaminantsLabel}
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] leading-tight">
            {p.contaminantsHeadline}
          </h2>
          <p className="mt-4 font-body text-[var(--color-text-secondary)] leading-relaxed">
            {p.contaminantsDescription}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {contaminants.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.07, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="group relative rounded-xl border border-[var(--color-border)] bg-white p-6 hover:shadow-lg hover:shadow-[var(--color-primary)]/5 transition-all duration-300 hover:-translate-y-1"
            >
              <div
                className="w-11 h-11 rounded-lg flex items-center justify-center mb-4"
                style={{ backgroundColor: `color-mix(in srgb, ${item.color} 12%, transparent)` }}
              >
                <item.icon className="w-5.5 h-5.5" style={{ color: item.color }} />
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${severityConfig[item.severity].dot}`} />
                <h3 className="font-heading text-base font-bold text-[var(--color-text-primary)]">{item.name}</h3>
              </div>
              <span className={`inline-block text-[10px] font-heading font-semibold uppercase tracking-wider ${severityConfig[item.severity].textColor} mb-2`}>
                {severityConfig[item.severity].label}
              </span>
              <p className="font-body text-sm text-[var(--color-text-secondary)] leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── PROCESS ─────────────────── */

function Process() {
  const { t } = useI18n();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const p = t.waterTestingPage as any;

  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const sectionScroll = useScroll({ target: ref, offset: ["start end", "end start"] });
  const decorY = useTransform(sectionScroll.scrollYProgress, [0, 1], [40, -40]);

  const processSteps = [
    { icon: CalendarCheck, number: "01", title: p.processStep1Title, description: p.processStep1Desc },
    { icon: ClipboardCheck, number: "02", title: p.processStep2Title, description: p.processStep2Desc },
    { icon: FileText, number: "03", title: p.processStep3Title, description: p.processStep3Desc },
  ];

  return (
    <section ref={ref} className="relative py-20 lg:py-28 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[var(--color-surface)]" />
        <motion.div
          style={{ y: decorY }}
          className="absolute top-[20%] right-0 w-[500px] h-[500px] bg-[radial-gradient(circle,var(--color-primary-light),transparent_70%)] opacity-[0.04]"
        />
        <div className="absolute bottom-0 left-[30%] w-[400px] h-[400px] bg-[radial-gradient(circle,var(--color-accent-light),transparent_70%)] opacity-[0.05]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent opacity-40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-heading font-semibold tracking-wider uppercase bg-[var(--color-accent)]/10 text-[var(--color-accent)] mb-4">
            {p.processLabel}
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] leading-tight">
            {p.processHeadline}
          </h2>
          <p className="mt-4 font-body text-[var(--color-text-secondary)] leading-relaxed">
            {p.processDescription}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {processSteps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 28 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative text-center"
            >
              {i < processSteps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-px bg-gradient-to-r from-[var(--color-border)] to-transparent" />
              )}
              <div className="relative inline-flex items-center justify-center mb-6">
                <div className="w-20 h-20 rounded-2xl bg-white border border-[var(--color-border)] shadow-md shadow-[var(--color-primary)]/5 flex items-center justify-center">
                  <step.icon className="w-8 h-8 text-[var(--color-secondary)]" />
                </div>
                <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-[var(--color-primary)] text-white text-xs font-heading font-bold flex items-center justify-center shadow-sm">
                  {step.number}
                </span>
              </div>
              <h3 className="font-heading text-xl font-bold text-[var(--color-text-primary)] mb-3">{step.title}</h3>
              <p className="font-body text-[var(--color-text-secondary)] leading-relaxed max-w-xs mx-auto">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── FAQ ─────────────────── */

function FAQItem({
  question,
  answer,
  index,
  isOpen,
  toggle,
}: {
  question: string;
  answer: string;
  index: number;
  isOpen: boolean;
  toggle: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="border border-[var(--color-border)] rounded-xl overflow-hidden bg-white hover:shadow-md hover:shadow-[var(--color-primary)]/5 transition-shadow duration-300"
    >
      <button
        onClick={toggle}
        className="w-full flex items-center justify-between p-5 md:p-6 text-left"
      >
        <span className="font-heading text-base md:text-lg font-semibold text-[var(--color-text-primary)] pr-4">
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="shrink-0"
        >
          <ChevronDown className="w-5 h-5 text-[var(--color-text-muted)]" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 md:px-6 md:pb-6 pt-0">
              <p className="font-body text-[var(--color-text-secondary)] leading-relaxed">
                {answer}
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const p = t.waterTestingPage as any;

  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const faqs = [
    { question: p.faq1Q, answer: p.faq1A },
    { question: p.faq2Q, answer: p.faq2A },
    { question: p.faq3Q, answer: p.faq3A },
    { question: p.faq4Q, answer: p.faq4A },
  ];

  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-white" />
        <div className="absolute top-[15%] right-[10%] w-[400px] h-[400px] bg-[radial-gradient(circle,var(--color-secondary-light),transparent_70%)] opacity-[0.04]" />
        <div className="absolute bottom-[20%] left-[5%] w-[350px] h-[350px] bg-[radial-gradient(circle,var(--color-accent-light),transparent_70%)] opacity-[0.04]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent opacity-50" />
      </div>

      <div ref={ref} className="relative z-10 max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-heading font-semibold tracking-wider uppercase bg-[var(--color-primary)]/8 text-[var(--color-primary)] mb-4">
            {p.faqLabel}
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-[var(--color-text-primary)]">
            {p.faqHeadline}
          </h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              question={faq.question}
              answer={faq.answer}
              index={i}
              isOpen={openIndex === i}
              toggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── CTA ─────────────────── */

function CTA() {
  const { t } = useI18n();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const p = t.waterTestingPage as any;

  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="relative py-20 lg:py-24 overflow-hidden">
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
          animate={{ scale: [1, 1.15, 1], opacity: [0.08, 0.15, 0.08] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[10%] right-[15%] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,var(--color-accent-light),transparent_70%)]"
        />
        <motion.div
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.06, 0.1, 0.06] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[5%] left-[10%] w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,var(--color-secondary-light),transparent_70%)]"
        />
      </div>

      <div ref={ref} className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <FlaskConical className="w-12 h-12 text-[var(--color-accent-light)] mx-auto mb-6 opacity-80" />
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
            {p.ctaHeadline}
          </h2>
          <p className="mt-5 font-body text-lg text-white/70 max-w-xl mx-auto leading-relaxed">
            {p.ctaDescription}
          </p>

          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[var(--color-accent-light)] text-[var(--color-primary-dark)] font-heading font-bold text-base hover:brightness-110 transition-all duration-200 shadow-lg shadow-black/25"
            >
              {p.ctaBook2}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="tel:+19842123558"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-white/20 text-white font-heading font-medium text-base hover:bg-white/10 transition-all duration-200"
            >
              <Phone className="w-4 h-4" />
              {p.ctaCall2}
            </a>
          </div>

          <p className="mt-6 font-body text-sm text-white/50">
            {p.ctaDisclaimer}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────── PAGE ─────────────────── */

export default function WaterTestingPage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Overview />
        <ImageBreak src="/images/water/water-droplet.jpeg" alt="Crystal clear water droplet" text="Know Exactly What Is in Your Water" />
        <ContaminantsGrid />
        <Process />
        <ImageBreak src="/images/water/girl-examining.jpeg" alt="Examining water quality" text="Results You Can Trust" />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
