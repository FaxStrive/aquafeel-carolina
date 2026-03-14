"use client";

import { useRef } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  TestTube,
  Building2,
  Droplets,
  Headphones,
  Check,
  ArrowRight,
  ChevronRight,
  CalendarCheck,
  FlaskConical,
  Sparkles,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useI18n } from "@/lib/i18n/context";

/* ─────────────────── DATA ─────────────────── */

const serviceIcons = [TestTube, Building2, Droplets, Headphones];
const serviceColors = [
  "var(--color-secondary-light)",
  "var(--color-primary-light)",
  "var(--color-accent-light)",
  "var(--color-secondary-dark)",
];
const serviceHrefs = [
  "/services/water-testing",
  "/services/commercial",
  "/services/well-water",
  "/contact",
];

const productImages = [
  "/images/client/photo-01.jpeg",
  "/images/client/photo-02.jpeg",
  "/images/client/photo-03.jpeg",
];

const processIcons = [CalendarCheck, FlaskConical, Sparkles];
const processNumbers = ["01", "02", "03"];

/* ─────────────────── HERO ─────────────────── */

function ServicesHero() {
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
            {t.nav.home}
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-white/80">{t.servicesPage.breadcrumbServices}</span>
        </motion.nav>

        {/* Headline with stagger */}
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl text-white leading-[1.1] max-w-3xl"
          >
            {t.servicesPage.heroHeadline1}
            <span className="text-brand-cyan">{t.servicesPage.heroAmpersand}</span>
            {t.servicesPage.heroHeadline2}
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="font-body text-white/70 text-lg sm:text-xl mt-5 max-w-2xl leading-relaxed"
        >
          {t.servicesPage.heroDescription}
        </motion.p>
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent z-10" />
    </section>
  );
}

/* ─────────────────── SERVICES GRID ─────────────────── */

function ServicesGrid() {
  const { t } = useI18n();
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const serviceTitles = [
    t.servicesPage.service1Title,
    t.servicesPage.service2Title,
    t.servicesPage.service3Title,
    t.servicesPage.service4Title,
  ];
  const serviceDescs = [
    t.servicesPage.service1Desc,
    t.servicesPage.service2Desc,
    t.servicesPage.service3Desc,
    t.servicesPage.service4Desc,
  ];

  return (
    <section ref={ref} className="relative py-20 sm:py-28 overflow-hidden">
      {/* Background: angled gradient sweep */}
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
            {t.servicesPage.gridLabel}
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-[var(--color-text-primary)]">
            {t.servicesPage.gridHeadline}
          </h2>
          <p className="font-body text-[var(--color-text-secondary)] text-lg mt-4 max-w-2xl mx-auto">
            {t.servicesPage.gridDescription}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
          {serviceTitles.map((title, i) => {
            const Icon = serviceIcons[i];
            const color = serviceColors[i];
            const href = serviceHrefs[i];
            return (
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
                <Link href={href} className="block">
                  {/* Top accent bar */}
                  <div
                    className="absolute top-0 left-8 right-8 h-[2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: color }}
                  />

                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-5"
                    style={{ background: `color-mix(in srgb, ${color} 12%, white)` }}
                  >
                    <Icon
                      className="w-7 h-7"
                      style={{ color }}
                    />
                  </div>

                  <h3 className="font-heading font-bold text-xl text-[var(--color-text-primary)] mb-3">
                    {title}
                  </h3>
                  <p className="font-body text-[var(--color-text-secondary)] leading-relaxed">
                    {serviceDescs[i]}
                  </p>
                  <span className="inline-flex items-center gap-1 mt-4 font-heading font-semibold text-sm text-brand-cyan group-hover:gap-2 transition-all">
                    {t.servicesPage.learnMore} <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── PRODUCT SHOWCASE ─────────────────── */

function ProductShowcase() {
  const { t } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const products = [
    {
      image: productImages[0],
      title: t.servicesPage.product1Title,
      subtitle: t.servicesPage.product1Subtitle,
      description: t.servicesPage.product1Desc,
      benefits: [
        t.servicesPage.product1Benefit1,
        t.servicesPage.product1Benefit2,
        t.servicesPage.product1Benefit3,
        t.servicesPage.product1Benefit4,
      ],
    },
    {
      image: productImages[1],
      title: t.servicesPage.product2Title,
      subtitle: t.servicesPage.product2Subtitle,
      description: t.servicesPage.product2Desc,
      benefits: [
        t.servicesPage.product2Benefit1,
        t.servicesPage.product2Benefit2,
        t.servicesPage.product2Benefit3,
        t.servicesPage.product2Benefit4,
      ],
    },
    {
      image: productImages[2],
      title: t.servicesPage.product3Title,
      subtitle: t.servicesPage.product3Subtitle,
      description: t.servicesPage.product3Desc,
      benefits: [
        t.servicesPage.product3Benefit1,
        t.servicesPage.product3Benefit2,
        t.servicesPage.product3Benefit3,
        t.servicesPage.product3Benefit4,
      ],
    },
  ];

  return (
    <section ref={sectionRef} className="relative py-20 sm:py-28 overflow-hidden">
      {/* Background: warm directional sweep */}
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
        <div className="absolute top-[20%] right-0 w-[700px] h-[700px] bg-[radial-gradient(ellipse_at_center,var(--color-accent-light),transparent_70%)] opacity-[0.03]" />
        <div className="absolute bottom-[10%] left-0 w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_center,var(--color-secondary-light),transparent_70%)] opacity-[0.04]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block font-heading font-semibold text-sm uppercase tracking-wider text-brand-aqua mb-3">
            {t.servicesPage.productsLabel}
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-[var(--color-text-primary)]">
            {t.servicesPage.productsHeadline}
          </h2>
          <p className="font-body text-[var(--color-text-secondary)] text-lg mt-4 max-w-2xl mx-auto">
            {t.servicesPage.productsDescription}
          </p>
        </motion.div>

        <div className="space-y-16 lg:space-y-24">
          {products.map((product, i) => (
            <ProductCard key={i} product={product} index={i} />
          ))}
        </div>

        {/* Full lineup image */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-20 rounded-2xl overflow-hidden border border-[var(--color-border)] shadow-lg"
        >
          <Image
            src="/images/client/photo-07.png"
            alt="Full product lineup of Aquafeel water purification systems"
            width={1200}
            height={500}
            className="w-full h-auto object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
}

function ProductCard({
  product,
  index,
}: {
  product: {
    image: string;
    title: string;
    subtitle: string;
    description: string;
    benefits: string[];
  };
  index: number;
}) {
  const { t } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const reversed = index % 2 !== 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`grid lg:grid-cols-2 gap-8 lg:gap-14 items-center ${
        reversed ? "lg:direction-rtl" : ""
      }`}
    >
      {/* Image */}
      <div className={`${reversed ? "lg:order-2" : ""}`}>
        <div className="relative rounded-2xl overflow-hidden group">
          <Image
            src={product.image}
            alt={product.title}
            width={600}
            height={450}
            className="w-full h-auto object-cover object-top transition-transform duration-700 group-hover:scale-105"
          />
          {/* Subtle overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      </div>

      {/* Content */}
      <div className={`${reversed ? "lg:order-1" : ""}`}>
        <span className="inline-block font-heading font-semibold text-sm uppercase tracking-wider text-brand-cyan mb-2">
          {product.subtitle}
        </span>
        <h3 className="font-heading font-bold text-2xl sm:text-3xl text-[var(--color-text-primary)] mb-4">
          {product.title}
        </h3>
        <p className="font-body text-[var(--color-text-secondary)] leading-relaxed mb-6">
          {product.description}
        </p>

        <ul className="space-y-3 mb-8">
          {product.benefits.map((benefit, j) => (
            <motion.li
              key={j}
              initial={{ opacity: 0, x: -15 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.3 + j * 0.08 }}
              className="flex items-start gap-3"
            >
              <div className="w-5 h-5 rounded-full bg-brand-cyan/10 flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-3 h-3 text-brand-cyan" />
              </div>
              <span className="font-body text-[var(--color-text-secondary)] text-sm leading-relaxed">
                {benefit}
              </span>
            </motion.li>
          ))}
        </ul>

        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[var(--color-primary)] text-white font-heading font-semibold text-sm hover:bg-[var(--color-primary-light)] transition-all duration-200 hover:gap-3 group"
        >
          {t.servicesPage.getFreeQuote}
          <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </motion.div>
  );
}

/* ─────────────────── HOW IT WORKS ─────────────────── */

function HowItWorks() {
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

  const stepTitles = [
    t.servicesPage.step1Title,
    t.servicesPage.step2Title,
    t.servicesPage.step3Title,
  ];
  const stepDescs = [
    t.servicesPage.step1Desc,
    t.servicesPage.step2Desc,
    t.servicesPage.step3Desc,
  ];

  return (
    <section ref={ref} className="relative py-20 sm:py-28 overflow-hidden">
      {/* Background: flowing curves */}
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
            {t.servicesPage.processLabel}
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-[var(--color-text-primary)]">
            {t.servicesPage.processHeadline}
          </h2>
          <p className="font-body text-[var(--color-text-secondary)] text-lg mt-4 max-w-xl mx-auto">
            {t.servicesPage.processDescription}
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
            {stepTitles.map((title, i) => {
              const Icon = processIcons[i];
              return (
                <motion.div
                  key={i}
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
                    <Icon className="w-6 h-6 text-brand-cyan" />
                  </div>
                  <div className="pt-1">
                    <span className="font-heading font-bold text-xs uppercase tracking-widest text-brand-cyan/60 mb-1 block">
                      {t.servicesPage.step} {processNumbers[i]}
                    </span>
                    <h3 className="font-heading font-bold text-xl text-[var(--color-text-primary)] mb-2">
                      {title}
                    </h3>
                    <p className="font-body text-[var(--color-text-secondary)] leading-relaxed">
                      {stepDescs[i]}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── COMPARISON TABLE ─────────────────── */

function ComparisonTable() {
  const { t } = useI18n();
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const comparisonFeatures = [
    { feature: t.servicesPage.featureWholeHome, city: true, ro: false, alkaline: false },
    { feature: t.servicesPage.featureUnderSink, city: false, ro: true, alkaline: true },
    { feature: t.servicesPage.featureChlorine, city: true, ro: true, alkaline: true },
    { feature: t.servicesPage.featureHeavyMetals, city: true, ro: true, alkaline: true },
    { feature: t.servicesPage.feature99, city: false, ro: true, alkaline: true },
    { feature: t.servicesPage.featureAlkaline, city: false, ro: false, alkaline: true },
    { feature: t.servicesPage.featurePH, city: false, ro: false, alkaline: true },
    { feature: t.servicesPage.featureAppliances, city: true, ro: false, alkaline: false },
  ];

  return (
    <section ref={ref} className="relative py-20 sm:py-28 overflow-hidden">
      {/* Background: layered diagonals */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-surface-alt)] via-white to-[var(--color-surface)]" />
        <div className="absolute -top-20 -right-20 w-[500px] h-[500px] bg-[radial-gradient(circle,var(--color-primary),transparent_70%)] opacity-[0.03] rotate-12" />
        <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-[radial-gradient(circle,var(--color-accent-light),transparent_70%)] opacity-[0.04]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block font-heading font-semibold text-sm uppercase tracking-wider text-brand-aqua mb-3">
            {t.servicesPage.compareLabel}
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-[var(--color-text-primary)]">
            {t.servicesPage.compareHeadline}
          </h2>
          <p className="font-body text-[var(--color-text-secondary)] text-lg mt-4 max-w-xl mx-auto">
            {t.servicesPage.compareDescription}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl border border-[var(--color-border)] shadow-lg overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px]">
              <thead>
                <tr className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-light)]">
                  <th className="px-6 py-5 text-left font-heading font-bold text-sm text-white uppercase tracking-wider">
                    {t.servicesPage.tableFeature}
                  </th>
                  <th className="px-6 py-5 text-center font-heading font-bold text-sm text-white uppercase tracking-wider">
                    {t.servicesPage.tableCityWater}
                  </th>
                  <th className="px-6 py-5 text-center font-heading font-bold text-sm text-white uppercase tracking-wider">
                    {t.servicesPage.tableRO}
                  </th>
                  <th className="px-6 py-5 text-center font-heading font-bold text-sm text-white uppercase tracking-wider">
                    {t.servicesPage.tableAlkalineRO}
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((row, i) => (
                  <tr
                    key={i}
                    className={`border-b border-[var(--color-border)] last:border-b-0 ${
                      i % 2 === 0 ? "bg-white" : "bg-[var(--color-surface)]"
                    }`}
                  >
                    <td className="px-6 py-4 font-body text-sm text-[var(--color-text-primary)] font-medium">
                      {row.feature}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {row.city ? (
                        <Check className="w-5 h-5 text-brand-cyan mx-auto" />
                      ) : (
                        <span className="text-[var(--color-text-muted)]">--</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {row.ro ? (
                        <Check className="w-5 h-5 text-brand-cyan mx-auto" />
                      ) : (
                        <span className="text-[var(--color-text-muted)]">--</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {row.alkaline ? (
                        <Check className="w-5 h-5 text-brand-cyan mx-auto" />
                      ) : (
                        <span className="text-[var(--color-text-muted)]">--</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────── CTA ─────────────────── */

function ServicesCTA() {
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
            {t.servicesPage.ctaHeadline1}
            <span className="text-brand-cyan">{t.servicesPage.ctaHeadlineHighlight}</span>
          </h2>
          <p className="font-body text-white/70 text-lg sm:text-xl mt-5 max-w-2xl mx-auto leading-relaxed">
            {t.servicesPage.ctaDescription}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-[var(--color-accent-light)] text-[var(--color-primary-dark)] font-heading font-bold text-base hover:bg-[var(--color-accent)] transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg shadow-teal-500/20"
            >
              {t.servicesPage.ctaPrimary}
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="tel:9842123558"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg border-2 border-white/20 text-white font-heading font-semibold text-base hover:bg-white/10 transition-all duration-200"
            >
              {t.servicesPage.ctaCall}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────── PAGE ─────────────────── */

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main>
        <ServicesHero />
        <ServicesGrid />
        <ProductShowcase />
        <HowItWorks />
        <ComparisonTable />
        <ServicesCTA />
      </main>
      <Footer />
    </>
  );
}
