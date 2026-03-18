"use client";

import { useState, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
} from "framer-motion";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  ChevronRight,
  ChevronDown,
  ArrowRight,
  Check,
  Phone,
  DollarSign,
  Clock,
  ShieldCheck,
  Wallet,
  TestTube,
  ListChecks,
  Droplets,
  Star,
} from "lucide-react";
import { useI18n } from "@/lib/i18n/context";



export const dynamic = "force-dynamic";

/* ─────────────────── HERO ─────────────────── */

function FinancingHero() {
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"What water treatment services does Aquafeel Solutions Carolina offer?","acceptedAnswer":{"@type":"Answer","text":"Aquafeel Solutions Carolina offers water filtration, water softeners, reverse osmosis systems, and water testing in your area."}},{"@type":"Question","name":"How do I know if I need a water softener?","acceptedAnswer":{"@type":"Answer","text":"Signs you need a water softener include hard water deposits on faucets, dry skin after bathing, and spots on dishes. Contact us for a free water test."}},{"@type":"Question","name":"How long does installation take?","acceptedAnswer":{"@type":"Answer","text":"Most water treatment system installations take 2–4 hours. Our technicians work efficiently to minimize disruption to your home."}}]}) }}
      />
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
            opacity: [0.06, 0.12, 0.06],
          }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-8 right-[12%] w-[520px] h-[520px] rounded-full bg-[radial-gradient(circle,var(--color-accent-light),transparent_70%)]"
        />
        <motion.div
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.05, 0.10, 0.05],
          }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute bottom-0 left-[8%] w-[380px] h-[380px] rounded-full bg-[radial-gradient(circle,var(--color-secondary-light),transparent_70%)]"
        />
        {/* Diagonal sweep */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent" />
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
            {t.financingPage.breadcrumbHome}
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-white/80">{t.financingPage.breadcrumbFinancing}</span>
        </motion.nav>

        {/* Headline */}
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl text-white leading-[1.1] max-w-3xl"
          >
            {t.financingPage.heroHeadlinePre}
            <span className="text-brand-cyan">{t.financingPage.heroHeadlineHighlight}</span>
            {t.financingPage.heroHeadlinePost}
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="font-body text-white/70 text-lg sm:text-xl mt-5 max-w-2xl leading-relaxed"
        >
          {t.financingPage.heroDescription}
        </motion.p>
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent z-10" />
    </section>
  );
}

/* ─────────────────── WHY FINANCE ─────────────────── */

function WhyFinance() {
  const { t } = useI18n();
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const benefits = [
    {
      icon: DollarSign,
      title: t.financingPage.benefit1Title,
      description: t.financingPage.benefit1Desc,
      color: "var(--color-secondary-light)",
    },
    {
      icon: Wallet,
      title: t.financingPage.benefit2Title,
      description: t.financingPage.benefit2Desc,
      color: "var(--color-primary-light)",
    },
    {
      icon: Clock,
      title: t.financingPage.benefit3Title,
      description: t.financingPage.benefit3Desc,
      color: "var(--color-accent-light)",
    },
    {
      icon: ShieldCheck,
      title: t.financingPage.benefit4Title,
      description: t.financingPage.benefit4Desc,
      color: "var(--color-secondary-dark)",
    },
  ];

  return (
    <section ref={ref} className="relative py-20 sm:py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-[var(--color-surface)] to-white" />
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[radial-gradient(circle,var(--color-primary-light),transparent_70%)] opacity-[0.04]" />
        <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] bg-[radial-gradient(circle,var(--color-accent-light),transparent_70%)] opacity-[0.05]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block font-heading font-semibold text-sm uppercase tracking-wider text-brand-cyan mb-3">
            {t.financingPage.whyFinanceLabel}
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-[var(--color-text-primary)]">
            {t.financingPage.whyFinanceHeadline}
          </h2>
          <p className="font-body text-[var(--color-text-secondary)] text-lg mt-4 max-w-2xl mx-auto">
            {t.financingPage.whyFinanceDescription}
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

/* ─────────────────── HOW IT WORKS ─────────────────── */

function HowItWorks() {
  const { t } = useI18n();
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const lineRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: lineRef,
    offset: ["start end", "end center"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const processSteps = [
    {
      icon: TestTube,
      number: "01",
      title: t.financingPage.step1Title,
      description: t.financingPage.step1Desc,
    },
    {
      icon: ListChecks,
      number: "02",
      title: t.financingPage.step2Title,
      description: t.financingPage.step2Desc,
    },
    {
      icon: Droplets,
      number: "03",
      title: t.financingPage.step3Title,
      description: t.financingPage.step3Desc,
    },
  ];

  return (
    <section ref={ref} className="relative py-20 sm:py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-surface-alt)] via-white to-[var(--color-surface)]" />
        <div className="absolute top-1/4 left-[10%] w-[500px] h-[500px] bg-[radial-gradient(circle,var(--color-secondary-light),transparent_70%)] opacity-[0.04]" />
        <div className="absolute bottom-1/4 right-[10%] w-[400px] h-[400px] bg-[radial-gradient(circle,var(--color-primary),transparent_70%)] opacity-[0.03]" />
        {/* Subtle wave SVG */}
        <svg
          className="absolute bottom-0 left-0 right-0 w-full opacity-[0.03]"
          viewBox="0 0 1440 200"
          preserveAspectRatio="none"
        >
          <path
            d="M0,120 C360,180 720,60 1080,120 C1260,150 1380,100 1440,120 L1440,200 L0,200 Z"
            fill="var(--color-primary)"
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
          <span className="inline-block font-heading font-semibold text-sm uppercase tracking-wider text-brand-aqua mb-3">
            {t.financingPage.processLabel}
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-[var(--color-text-primary)]">
            {t.financingPage.processHeadline}
          </h2>
          <p className="font-body text-[var(--color-text-secondary)] text-lg mt-4 max-w-xl mx-auto">
            {t.financingPage.processDescription}
          </p>
        </motion.div>

        <div ref={lineRef as React.RefObject<HTMLDivElement>} className="relative max-w-3xl mx-auto">
          {/* Connecting line - scroll animated */}
          <div className="absolute left-7 top-0 bottom-0 w-[2px] bg-[var(--color-border)] hidden sm:block">
            <motion.div
              style={{ height: lineScale }}
              className="w-full bg-gradient-to-b from-brand-cyan to-brand-navy rounded-full origin-top"
            />
          </div>

          <div className="space-y-12">
            {processSteps.map((step, i) => (
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
                    {t.financingPage.step} {step.number}
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

/* ─────────────────── FINANCING PLANS ─────────────────── */

function FinancingPlans() {
  const { t } = useI18n();
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const plans = [
    {
      name: t.financingPage.planStandard,
      term: t.financingPage.planStandardTerm,
      highlight: false,
      description: t.financingPage.planStandardDesc,
      features: [
        t.financingPage.featureLowMonthly,
        t.financingPage.featureNoPrepayment,
        t.financingPage.featureFixedRate,
        t.financingPage.featureSimpleApp,
        t.financingPage.featureWarranty,
      ],
    },
    {
      name: t.financingPage.planExtended,
      term: t.financingPage.planExtendedTerm,
      highlight: true,
      description: t.financingPage.planExtendedDesc,
      features: [
        t.financingPage.featureLowestMonthly,
        t.financingPage.featureFlexTerms,
        t.financingPage.featureNoPrepayment,
        t.financingPage.featureFixedRate,
        t.financingPage.featureWarranty,
        t.financingPage.featureFreeInstall,
      ],
    },
    {
      name: t.financingPage.planSameAsCash,
      term: t.financingPage.planSameAsCashTerm,
      highlight: false,
      description: t.financingPage.planSameAsCashDesc,
      features: [
        t.financingPage.featureZeroInterest,
        t.financingPage.featureOwnPace,
        t.financingPage.featureNoPrepayment,
        t.financingPage.featureWarranty,
        t.financingPage.featureQuickPayoff,
      ],
    },
  ];

  return (
    <section ref={ref} className="relative py-20 sm:py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-[var(--color-surface)] to-white" />
        <div className="absolute top-[10%] right-[5%] w-[550px] h-[550px] bg-[radial-gradient(circle,var(--color-primary-light),transparent_70%)] opacity-[0.05]" />
        <div className="absolute bottom-[10%] left-[5%] w-[450px] h-[450px] bg-[radial-gradient(circle,var(--color-secondary-light),transparent_70%)] opacity-[0.04]" />
        {/* Angled accent line */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block font-heading font-semibold text-sm uppercase tracking-wider text-brand-cyan mb-3">
            {t.financingPage.plansLabel}
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-[var(--color-text-primary)]">
            {t.financingPage.plansHeadline}
          </h2>
          <p className="font-body text-[var(--color-text-secondary)] text-lg mt-4 max-w-2xl mx-auto">
            {t.financingPage.plansDescription}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{
                duration: 0.5,
                delay: i * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`group relative rounded-2xl border bg-white p-8 flex flex-col transition-all duration-300 hover:-translate-y-1 ${
                plan.highlight
                  ? "border-brand-cyan shadow-xl shadow-brand-cyan/10 ring-1 ring-brand-cyan/20"
                  : "border-[var(--color-border)] hover:shadow-xl hover:shadow-brand-navy/5"
              }`}
            >
              {/* Recommended badge */}
              {plan.highlight && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-brand-cyan to-brand-aqua text-white text-xs font-heading font-bold uppercase tracking-wider shadow-lg shadow-brand-cyan/20">
                    <Star className="w-3.5 h-3.5" />
                    {t.financingPage.mostPopular}
                  </span>
                </div>
              )}

              {/* Plan header */}
              <div className={`mb-6 ${plan.highlight ? "mt-2" : ""}`}>
                <h3 className="font-heading font-bold text-2xl text-[var(--color-text-primary)] mb-1">
                  {plan.name}
                </h3>
                <span className="inline-block font-heading font-semibold text-sm text-brand-cyan">
                  {plan.term}
                </span>
                <p className="font-body text-[var(--color-text-secondary)] text-sm mt-3 leading-relaxed">
                  {plan.description}
                </p>
              </div>

              {/* Divider */}
              <div className="h-[1px] bg-[var(--color-border)] mb-6" />

              {/* Features */}
              <ul className="space-y-3 flex-1">
                {plan.features.map((feature, fi) => (
                  <li key={fi} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-brand-cyan shrink-0 mt-0.5" />
                    <span className="font-body text-[var(--color-text-secondary)] text-sm leading-relaxed">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href="/contact"
                className={`mt-8 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg font-heading font-bold text-sm transition-all duration-200 hover:scale-[1.02] active:scale-95 ${
                  plan.highlight
                    ? "bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-light)] text-white shadow-lg shadow-brand-navy/15"
                    : "bg-[var(--color-surface)] text-[var(--color-text-primary)] hover:bg-[var(--color-surface-alt)] border border-[var(--color-border)]"
                }`}
              >
                {t.financingPage.getStarted}
                <ArrowRight className="w-4 h-4" />
              </Link>
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
  faq: { q: string; a: string };
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.4,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="border border-[var(--color-border)] rounded-xl overflow-hidden bg-white"
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left group hover:bg-[var(--color-surface)] transition-colors duration-200"
      >
        <span className="font-heading font-bold text-base text-[var(--color-text-primary)] group-hover:text-brand-navy transition-colors">
          {faq.q}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="shrink-0"
        >
          <ChevronDown className="w-5 h-5 text-[var(--color-text-secondary)]" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-5">
              <p className="font-body text-[var(--color-text-secondary)] leading-relaxed">
                {faq.a}
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
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const faqs = [
    { q: t.financingPage.faq1Q, a: t.financingPage.faq1A },
    { q: t.financingPage.faq2Q, a: t.financingPage.faq2A },
    { q: t.financingPage.faq3Q, a: t.financingPage.faq3A },
    { q: t.financingPage.faq4Q, a: t.financingPage.faq4A },
    { q: t.financingPage.faq5Q, a: t.financingPage.faq5A },
  ];

  return (
    <section ref={ref} className="relative py-20 sm:py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-surface-alt)] via-white to-[var(--color-surface)]" />
        <div className="absolute top-0 left-[20%] w-[500px] h-[500px] bg-[radial-gradient(circle,var(--color-accent-light),transparent_70%)] opacity-[0.04]" />
        <div className="absolute bottom-0 right-[15%] w-[400px] h-[400px] bg-[radial-gradient(circle,var(--color-primary-light),transparent_70%)] opacity-[0.03]" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block font-heading font-semibold text-sm uppercase tracking-wider text-brand-aqua mb-3">
            {t.financingPage.faqLabel}
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-[var(--color-text-primary)]">
            {t.financingPage.faqHeadline}
          </h2>
          <p className="font-body text-[var(--color-text-secondary)] text-lg mt-4 max-w-xl mx-auto">
            {t.financingPage.faqDescription}
          </p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
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

function FinancingCTA() {
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
            {t.financingPage.ctaHeadlinePre}
            <span className="text-brand-cyan">{t.financingPage.ctaHeadlineHighlight}</span>
          </h2>
          <p className="font-body text-white/70 text-lg sm:text-xl mt-5 max-w-2xl mx-auto leading-relaxed">
            {t.financingPage.ctaDescription}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-[var(--color-accent-light)] text-[var(--color-primary-dark)] font-heading font-bold text-base hover:bg-[var(--color-accent)] transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg shadow-teal-500/20"
            >
              {t.financingPage.ctaButton}
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="tel:9842123558"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg border-2 border-white/20 text-white font-heading font-semibold text-base hover:bg-white/10 transition-all duration-200"
            >
              <Phone className="w-5 h-5" />
              {t.financingPage.ctaCall}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────── PAGE ─────────────────── */

export default function FinancingPage() {
  return (
    <>
      <Header />
      <main>
        <FinancingHero />
        <WhyFinance />
        <HowItWorks />
        <FinancingPlans />
        <FAQSection />
        <FinancingCTA />
      </main>
      <Footer />
    </>
  );
}
