"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useI18n } from "@/lib/i18n/context";
import {
  GraduationCap,
  Settings2,
  HeartHandshake,
  ShieldCheck,
  ChevronRight,
  Phone,
  Droplets,
  Users,
  Globe,
  Award,
} from "lucide-react";

/* ─────────── Stagger container + item variants ─────────── */
const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
};
const staggerItem = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

/* ─────────── Section reveal wrapper ─────────── */
function RevealSection({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

/* ─────────── Scroll-linked parallax image ─────────── */
function ParallaxImage({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const ySmooth = useSpring(y, { stiffness: 120, damping: 30 });

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div style={{ y: ySmooth }} className="relative w-full h-full">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </motion.div>
    </div>
  );
}


/* ================================================================== */
/*                          ABOUT PAGE                                 */
/* ================================================================== */
export default function AboutContent() {
  const { t } = useI18n();

  /* ─────────── Timeline data (from translations) ─────────── */
  const milestones = [
    {
      year: t.aboutPage.milestone1Year,
      title: t.aboutPage.milestone1Title,
      desc: t.aboutPage.milestone1Desc,
      icon: Droplets,
    },
    {
      year: t.aboutPage.milestone2Year,
      title: t.aboutPage.milestone2Title,
      desc: t.aboutPage.milestone2Desc,
      icon: Users,
    },
    {
      year: t.aboutPage.milestone3Year,
      title: t.aboutPage.milestone3Title,
      desc: t.aboutPage.milestone3Desc,
      icon: Globe,
    },
    {
      year: t.aboutPage.milestone4Year,
      title: t.aboutPage.milestone4Title,
      desc: t.aboutPage.milestone4Desc,
      icon: Award,
    },
  ];

  /* ─────────── Differentiators data (from translations) ─────────── */
  const differentiators = [
    {
      icon: GraduationCap,
      title: t.aboutPage.diffEducationTitle,
      desc: t.aboutPage.diffEducationDesc,
    },
    {
      icon: Settings2,
      title: t.aboutPage.diffCustomTitle,
      desc: t.aboutPage.diffCustomDesc,
    },
    {
      icon: HeartHandshake,
      title: t.aboutPage.diffSupportTitle,
      desc: t.aboutPage.diffSupportDesc,
    },
    {
      icon: ShieldCheck,
      title: t.aboutPage.diffNsfTitle,
      desc: t.aboutPage.diffNsfDesc,
    },
  ];

  /* Scroll-linked transforms for hero decorative orbs */
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOrbY = useTransform(heroScroll, [0, 1], [0, 120]);
  const heroOrbScale = useTransform(heroScroll, [0, 1], [1, 0.8]);

  return (
    <>
      <Header />

      {/* ═══════════ HERO ═══════════ */}
      <section
        ref={heroRef}
        className="relative min-h-[55vh] md:min-h-[50vh] flex items-end overflow-hidden"
        style={{
          background:
            "linear-gradient(145deg, #171751 0%, #252772 35%, #0e7490 75%, #06b6d4 100%)",
        }}
      >
        {/* Animated gradient orbs */}
        <motion.div
          style={{ y: heroOrbY, scale: heroOrbScale }}
          className="absolute top-10 right-[10%] w-[500px] h-[500px] rounded-full pointer-events-none"
          aria-hidden
        >
          <div className="w-full h-full rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.25)_0%,transparent_70%)] animate-float" />
        </motion.div>
        <motion.div
          style={{
            y: useTransform(heroScroll, [0, 1], [0, 80]),
            scale: useTransform(heroScroll, [0, 1], [1, 1.15]),
          }}
          className="absolute bottom-[-60px] left-[-5%] w-[400px] h-[400px] rounded-full pointer-events-none"
          aria-hidden
        >
          <div className="w-full h-full rounded-full bg-[radial-gradient(circle,rgba(255,106,0,0.15)_0%,transparent_70%)] animate-float-slow" />
        </motion.div>

        {/* Diagonal sweep accent */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(170deg, transparent 40%, rgba(6,182,212,0.08) 60%, transparent 80%)",
          }}
        />

        {/* Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 pt-32 md:pt-36">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-2 text-white/50 text-sm font-body mb-6"
          >
            <Link href="/" className="hover:text-white/80 transition-colors">
              {t.nav.home}
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white/90">{t.aboutPage.breadcrumbAbout}</span>
          </motion.nav>

          {/* Headline with word-by-word stagger */}
          <motion.h1
            className="font-heading font-extrabold text-white leading-[1.1] tracking-tight"
            style={{ fontSize: "var(--text-h1)" }}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {t.aboutPage.heroHeadline.split(" ").map((word, i) => (
              <motion.span
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
                  visible: {
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    transition: {
                      duration: 0.5,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    },
                  },
                }}
                className="inline-block mr-[0.3em]"
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.55 }}
            className="mt-5 max-w-xl text-white/70 font-body leading-relaxed"
            style={{ fontSize: "var(--text-body)" }}
          >
            {t.aboutPage.heroDescription}
          </motion.p>
        </div>

        {/* Bottom wave divider */}
        <svg
          className="absolute bottom-0 left-0 right-0 w-full"
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          fill="none"
        >
          <path
            d="M0 40C240 80 480 0 720 40C960 80 1200 0 1440 40V80H0V40Z"
            fill="white"
          />
        </svg>
      </section>

      {/* ═══════════ MISSION ═══════════ */}
      <RevealSection className="relative py-20 md:py-28 overflow-hidden">
        {/* BG: soft radial glow */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div className="absolute top-[20%] left-[5%] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(37,39,114,0.04)_0%,transparent_70%)]" />
          <div className="absolute bottom-[-10%] right-[5%] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.05)_0%,transparent_70%)]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            {/* Image */}
            <ParallaxImage
              src="/images/client/photo-09.jpeg"
              alt="Aquafeel Solutions team at a branded event"
              className="relative aspect-[4/3] rounded-2xl shadow-2xl shadow-brand-navy/10"
            />

            {/* Text */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
            >
              <motion.span
                variants={staggerItem}
                className="inline-block font-heading font-bold text-xs uppercase tracking-[0.2em] text-[var(--color-secondary)] mb-3"
              >
                {t.aboutPage.missionLabel}
              </motion.span>
              <motion.h2
                variants={staggerItem}
                className="font-heading font-extrabold leading-tight"
                style={{ fontSize: "var(--text-h2)" }}
              >
                {t.aboutPage.missionHeadline1}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-secondary)] to-[var(--color-secondary-light)]">
                  {t.aboutPage.missionHeadlineHighlight}
                </span>
              </motion.h2>
              <motion.p
                variants={staggerItem}
                className="mt-5 font-body text-[var(--color-text-secondary)] leading-relaxed"
                style={{ fontSize: "var(--text-body)" }}
              >
                {t.aboutPage.missionP1}
              </motion.p>
              <motion.p
                variants={staggerItem}
                className="mt-4 font-body text-[var(--color-text-secondary)] leading-relaxed"
                style={{ fontSize: "var(--text-body)" }}
              >
                {t.aboutPage.missionP2}
              </motion.p>

              {/* Values pills */}
              <motion.div
                variants={staggerItem}
                className="mt-8 flex flex-wrap gap-3"
              >
                {[
                  t.aboutPage.valuePill1,
                  t.aboutPage.valuePill2,
                  t.aboutPage.valuePill3,
                ].map((v) => (
                  <span
                    key={v}
                    className="px-4 py-2 rounded-full font-heading font-semibold text-xs uppercase tracking-wider border-2 border-[var(--color-secondary-light)]/20 text-[var(--color-primary)] bg-[var(--color-secondary-light)]/5"
                  >
                    {v}
                  </span>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </RevealSection>

      {/* ═══════════ TIMELINE ═══════════ */}
      <RevealSection className="relative py-20 md:py-28 overflow-hidden">
        {/* BG: angled sweep */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(160deg, var(--color-surface) 0%, white 40%, var(--color-surface-alt) 100%)",
            }}
          />
          <div className="absolute top-[30%] right-[-5%] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(255,106,0,0.04)_0%,transparent_70%)]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block font-heading font-bold text-xs uppercase tracking-[0.2em] text-[var(--color-secondary)] mb-3"
            >
              {t.aboutPage.journeyLabel}
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-heading font-extrabold leading-tight"
              style={{ fontSize: "var(--text-h2)" }}
            >
              {t.aboutPage.journeyHeadline1}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-light)]">
                {t.aboutPage.journeyHeadlineHighlight}
              </span>
            </motion.h2>
          </div>

          {/* Timeline items */}
          <div className="relative">
            {/* Center line (desktop) */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--color-secondary-light)]/30 via-[var(--color-primary)]/20 to-transparent -translate-x-1/2" />

            <div className="space-y-12 md:space-y-0">
              {milestones.map((m, i) => {
                const isLeft = i % 2 === 0;
                return (
                  <motion.div
                    key={m.year}
                    initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{
                      duration: 0.6,
                      delay: i * 0.1,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                    className={`relative md:grid md:grid-cols-2 md:gap-12 ${
                      i > 0 ? "md:mt-16" : ""
                    }`}
                  >
                    {/* Content */}
                    <div
                      className={`${
                        isLeft ? "md:text-right md:pr-12" : "md:col-start-2 md:pl-12"
                      }`}
                    >
                      <div
                        className={`inline-flex items-center gap-3 mb-3 ${
                          isLeft ? "md:flex-row-reverse" : ""
                        }`}
                      >
                        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] flex items-center justify-center shadow-lg shadow-brand-navy/15">
                          <m.icon className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-heading font-extrabold text-2xl text-[var(--color-primary)]">
                          {m.year}
                        </span>
                      </div>
                      <h3
                        className="font-heading font-bold mb-2"
                        style={{ fontSize: "var(--text-h3)" }}
                      >
                        {m.title}
                      </h3>
                      <p
                        className="font-body text-[var(--color-text-secondary)] leading-relaxed max-w-md"
                        style={{ fontSize: "var(--text-body)" }}
                      >
                        {m.desc}
                      </p>
                    </div>

                    {/* Center dot */}
                    <div className="hidden md:flex absolute left-1/2 top-3 -translate-x-1/2 w-4 h-4 rounded-full border-[3px] border-[var(--color-secondary-light)] bg-white shadow-md" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </RevealSection>

      {/* ═══════════ CERTIFICATIONS ═══════════ */}
      <RevealSection className="relative py-20 md:py-28 overflow-hidden">
        {/* BG: gradient mesh */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div className="absolute top-0 left-[20%] w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,rgba(37,39,114,0.035)_0%,transparent_70%)]" />
          <div className="absolute bottom-[10%] right-[15%] w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.04)_0%,transparent_70%)]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            {/* Text */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
            >
              <motion.span
                variants={staggerItem}
                className="inline-block font-heading font-bold text-xs uppercase tracking-[0.2em] text-[var(--color-secondary)] mb-3"
              >
                {t.aboutPage.certLabel}
              </motion.span>
              <motion.h2
                variants={staggerItem}
                className="font-heading font-extrabold leading-tight"
                style={{ fontSize: "var(--text-h2)" }}
              >
                {t.aboutPage.certHeadline1}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-secondary)] to-[var(--color-secondary-light)]">
                  {t.aboutPage.certHeadlineHighlight}
                </span>
              </motion.h2>
              <motion.p
                variants={staggerItem}
                className="mt-5 font-body text-[var(--color-text-secondary)] leading-relaxed"
                style={{ fontSize: "var(--text-body)" }}
              >
                {t.aboutPage.certDescription}
              </motion.p>
              <motion.div
                variants={staggerItem}
                className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4"
              >
                {[
                  t.aboutPage.certWqa,
                  t.aboutPage.certBbb,
                  t.aboutPage.certNsf,
                  t.aboutPage.certUsa,
                ].map((cert) => (
                  <div
                    key={cert}
                    className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]"
                  >
                    <ShieldCheck className="w-5 h-5 text-[var(--color-secondary)] shrink-0" />
                    <span className="font-heading font-semibold text-sm text-[var(--color-text-primary)]">
                      {cert}
                    </span>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Image */}
            <ParallaxImage
              src="/images/client/photo-10.jpeg"
              alt="Aquafeel Solutions certifications including NSF, WQA, and BBB"
              className="relative aspect-[4/3] rounded-2xl shadow-2xl shadow-brand-navy/10"
            />
          </div>
        </div>
      </RevealSection>

      {/* ═══════════ WHY CHOOSE US ═══════════ */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        {/* BG: deep navy gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(145deg, #0f172a 0%, #171751 40%, #252772 70%, #0e7490 100%)",
          }}
        />
        {/* Animated orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
          <div className="absolute top-[15%] left-[8%] w-[350px] h-[350px] rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.12)_0%,transparent_70%)] animate-float" />
          <div className="absolute bottom-[10%] right-[10%] w-[450px] h-[450px] rounded-full bg-[radial-gradient(circle,rgba(255,106,0,0.08)_0%,transparent_70%)] animate-float-slow" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block font-heading font-bold text-xs uppercase tracking-[0.2em] text-brand-cyan mb-3"
            >
              {t.aboutPage.whyLabel}
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-heading font-extrabold text-white leading-tight"
              style={{ fontSize: "var(--text-h2)" }}
            >
              {t.aboutPage.whyHeadline}
            </motion.h2>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {differentiators.map((d) => (
              <motion.div
                key={d.title}
                variants={{
                  hidden: { opacity: 0, y: 36, scale: 0.95 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: {
                      duration: 0.55,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    },
                  },
                }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="group relative p-7 rounded-2xl bg-white/[0.06] backdrop-blur-sm border border-white/10 hover:bg-white/[0.1] hover:border-white/20 transition-colors duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-cyan to-[var(--color-secondary)] flex items-center justify-center mb-5 shadow-lg shadow-brand-cyan/20 group-hover:scale-110 transition-transform duration-300">
                  <d.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-heading font-bold text-white text-lg mb-2">
                  {d.title}
                </h3>
                <p className="font-body text-white/55 text-sm leading-relaxed">
                  {d.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════ TEAM SECTION ═══════════ */}
      <RevealSection className="relative py-20 md:py-28 overflow-hidden">
        {/* BG */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(175deg, white 0%, var(--color-surface) 50%, var(--color-surface-alt) 100%)",
            }}
          />
          <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-[radial-gradient(ellipse,rgba(37,39,114,0.03)_0%,transparent_70%)]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            {/* Image side */}
            <div className="order-2 lg:order-1">
              <ParallaxImage
                src="/images/client/photo-04.jpeg"
                alt="Aquafeel Solutions technician performing professional water testing"
                className="relative aspect-[4/3] rounded-2xl shadow-2xl shadow-brand-navy/10"
              />
            </div>

            {/* Text side */}
            <motion.div
              className="order-1 lg:order-2"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
            >
              <motion.span
                variants={staggerItem}
                className="inline-block font-heading font-bold text-xs uppercase tracking-[0.2em] text-[var(--color-secondary)] mb-3"
              >
                {t.aboutPage.teamLabel}
              </motion.span>
              <motion.h2
                variants={staggerItem}
                className="font-heading font-extrabold leading-tight"
                style={{ fontSize: "var(--text-h2)" }}
              >
                {t.aboutPage.teamHeadline1}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)]">
                  {t.aboutPage.teamHeadlineHighlight}
                </span>
              </motion.h2>
              <motion.p
                variants={staggerItem}
                className="mt-5 font-body text-[var(--color-text-secondary)] leading-relaxed"
                style={{ fontSize: "var(--text-body)" }}
              >
                {t.aboutPage.teamP1}
              </motion.p>
              <motion.p
                variants={staggerItem}
                className="mt-4 font-body text-[var(--color-text-secondary)] leading-relaxed"
                style={{ fontSize: "var(--text-body)" }}
              >
                {t.aboutPage.teamP2}
              </motion.p>

              {/* Supporting image: team photo */}
              <motion.div
                variants={staggerItem}
                className="mt-8 relative aspect-[16/9] rounded-xl overflow-hidden shadow-lg shadow-brand-navy/10"
              >
                <Image
                  src="/images/client/photo-06.jpeg"
                  alt="Aquafeel Solutions technician with customer in front of installed water system"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </RevealSection>

      {/* ═══════════ CTA ═══════════ */}
      <section className="relative py-20 md:py-24 overflow-hidden">
        {/* BG: brand gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, #252772 0%, #171751 40%, #0e7490 100%)",
          }}
        />
        {/* Decorative sweep */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(200deg, transparent 30%, rgba(6,182,212,0.1) 50%, transparent 70%)",
          }}
        />
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
          <div className="absolute top-[-20%] right-[5%] w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(255,106,0,0.1)_0%,transparent_70%)] animate-float" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-heading font-extrabold text-white leading-tight"
            style={{ fontSize: "var(--text-h2)" }}
          >
            {t.aboutPage.ctaHeadline}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.55 }}
            className="mt-5 text-white/65 font-body leading-relaxed mx-auto max-w-lg"
            style={{ fontSize: "var(--text-body)" }}
          >
            {t.aboutPage.ctaDescription}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-[var(--color-accent-light)] text-[var(--color-primary-dark)] font-heading font-bold text-base hover:bg-[var(--color-accent)] transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg shadow-brand-aqua/25"
            >
              {t.aboutPage.ctaPrimary}
            </Link>
            <a
              href="tel:9842123558"
              className="inline-flex items-center gap-2 px-6 py-4 rounded-xl border-2 border-white/20 text-white font-heading font-semibold text-base hover:bg-white/10 transition-all duration-200"
            >
              <Phone className="w-5 h-5" />
              (984) 212-3558
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
}
