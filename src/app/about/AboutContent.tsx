"use client";

import { useRef, useState } from "react";
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
          loading="eager"
        />
      </motion.div>
    </div>
  );
}


/* ─────────────────── TEAM MEMBER CARD ─────────────────── */

function TeamMemberCard({
  image,
  name,
  role,
  badge,
  shortBio,
  fullBio,
  delay,
}: {
  image: string;
  name: string;
  role: string;
  badge?: string;
  shortBio: string;
  fullBio: string;
  delay: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
    >
      {/* Card */}
      <div className="relative rounded-2xl border border-[var(--color-border)] bg-white overflow-hidden hover:shadow-xl hover:shadow-brand-navy/8 transition-all duration-500 hover:-translate-y-1">
        {/* Photo */}
        <div className="relative aspect-[3/4] overflow-hidden">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            loading="eager"
          />
          {/* Gradient overlay at bottom for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary-dark)]/70 via-transparent to-transparent" />

          {/* Badge (veteran status) */}
          {badge && (
            <div className="absolute top-4 left-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm text-[var(--color-primary-dark)] font-heading font-bold text-[11px] uppercase tracking-wider shadow-lg">
                {badge}
              </span>
            </div>
          )}

          {/* Name + role overlaid on photo */}
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <h3 className="font-heading font-bold text-lg text-white leading-tight">
              {name}
            </h3>
            <p className="font-body text-white/80 text-sm mt-0.5">
              {role}
            </p>
          </div>
        </div>

        {/* Bio content */}
        <div className="p-5">
          <p className="font-body text-[var(--color-text-secondary)] text-sm leading-relaxed">
            {shortBio}
          </p>

          {/* Expandable full bio */}
          <motion.div
            initial={false}
            animate={{ height: expanded ? "auto" : 0, opacity: expanded ? 1 : 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            <p className="font-body text-[var(--color-text-secondary)] text-sm leading-relaxed mt-3 pt-3 border-t border-[var(--color-border)]">
              {fullBio}
            </p>
          </motion.div>

          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-3 font-heading font-semibold text-xs uppercase tracking-wider text-[var(--color-secondary)] hover:text-[var(--color-primary)] transition-colors duration-200"
          >
            {expanded ? "Show Less" : "Read More"}
          </button>
        </div>
      </div>
    </motion.div>
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

      {/* ═══════════ MEET THE TEAM ═══════════ */}
      <RevealSection className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, white 0%, var(--color-surface) 30%, var(--color-surface) 70%, white 100%)" }} />
          <div className="absolute top-[10%] right-[10%] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.04)_0%,transparent_70%)]" />
          <div className="absolute bottom-[10%] left-[5%] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(37,39,114,0.03)_0%,transparent_70%)]" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} className="text-center mb-16 md:mb-20">
            <motion.span variants={staggerItem} className="inline-block font-heading font-bold text-xs uppercase tracking-[0.2em] text-[var(--color-secondary)] mb-3">Meet the Water Crew</motion.span>
            <motion.h2 variants={staggerItem} className="font-heading font-extrabold leading-tight" style={{ fontSize: "var(--text-h2)" }}>
              The People Behind{" "}<span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)]">Your Clean Water</span>
            </motion.h2>
            <motion.p variants={staggerItem} className="mt-5 max-w-2xl mx-auto font-body text-[var(--color-text-secondary)] text-lg leading-relaxed">Our team of certified Water Quality Analysts and veterans brings passion, expertise, and genuine care to every home we serve.</motion.p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            <TeamMemberCard image="/images/team/casandra.jpeg" name="Casandra Buenaventura" role="Water Quality Analyst" shortBio="Casandra is a proud boy mom who brings warmth, personality, and attention to detail to every client interaction." fullBio="She enjoys binge-watching TV series, pottery, and home decoration. What Casandra enjoys most about Aquafeel is knowing she's helping families in the community improve their quality of life by giving them cleaner, safer water in their homes." delay={0} />
            <TeamMemberCard image="/images/team/fahad.jpeg" name="Fahad Al-Jarboua" role="Water Quality Analyst" badge="Army Veteran" shortBio="Fahad is an Army veteran, proud girl dad, and dedicated Water Quality Analyst since 2024." fullBio="He enjoys spending his free time doing woodworking and teaching, combining creativity with education. At Aquafeel, Fahad is passionate about informing and educating his community about water quality and safety. His mission is to help families better understand their water and provide solutions that protect their homes and loved ones." delay={0.1} />
            <TeamMemberCard image="/images/team/glenn.jpeg" name="Glenn Guthrie" role="Water Quality Analyst" badge="Marine Veteran" shortBio="Glenn is a Marine Corps veteran, husband, and father who brings both discipline and craftsmanship to everything he does." fullBio="Outside of work, Glenn enjoys creating custom Damascus knives and cooking. Certified as a Water Quality Analyst since 2024, Glenn loves showing people what's really going on with their H2O and helping them fix those issues with affordable and effective solutions." delay={0.2} />
            <TeamMemberCard image="/images/team/carlos.jpeg" name="Carlos Buenaventura" role="Area Director" shortBio="Carlos is a husband and father with experience as a Water Quality Analyst since 2016, bringing years of knowledge to the team." fullBio="When he's not working with clients, he enjoys traveling and spending quality time with his family. What he enjoys most about Aquafeel is seeing firsthand how the systems have improved the quality of water in his own home, and being able to help other families achieve the same peace of mind. Carlos is passionate about helping households across multiple states better understand their water and providing solutions that allow families to enjoy cleaner, safer water every day." delay={0.3} />
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

            {/* Certification Badges Grid */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative grid grid-cols-3 gap-3"
            >
              {/* NSF ANSI 42 */}
              <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-white border border-[var(--color-border)] shadow-md hover:shadow-lg transition-shadow duration-300">
                <svg viewBox="0 0 120 120" className="w-14 h-14 mb-2" fill="none">
                  <circle cx="60" cy="60" r="56" stroke="#1a2744" strokeWidth="3" />
                  <circle cx="60" cy="60" r="48" stroke="#1a2744" strokeWidth="1.5" />
                  <text x="60" y="52" textAnchor="middle" fill="#1a2744" fontWeight="900" fontSize="32" fontFamily="system-ui">NSF</text>
                  <text x="60" y="72" textAnchor="middle" fill="#1a2744" fontWeight="600" fontSize="11" fontFamily="system-ui">ANSI 42</text>
                  <text x="60" y="100" textAnchor="middle" fill="#64748b" fontWeight="500" fontSize="8" fontFamily="system-ui">CERTIFIED</text>
                </svg>
                <span className="font-heading text-xs font-bold text-[var(--color-text-primary)] text-center">Taste & Odor Reduction</span>
              </div>

              {/* NSF ANSI 44 */}
              <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-white border border-[var(--color-border)] shadow-md hover:shadow-lg transition-shadow duration-300">
                <svg viewBox="0 0 120 120" className="w-14 h-14 mb-2" fill="none">
                  <circle cx="60" cy="60" r="56" stroke="#1a2744" strokeWidth="3" />
                  <circle cx="60" cy="60" r="48" stroke="#1a2744" strokeWidth="1.5" />
                  <text x="60" y="52" textAnchor="middle" fill="#1a2744" fontWeight="900" fontSize="32" fontFamily="system-ui">NSF</text>
                  <text x="60" y="72" textAnchor="middle" fill="#1a2744" fontWeight="600" fontSize="11" fontFamily="system-ui">ANSI 44</text>
                  <text x="60" y="100" textAnchor="middle" fill="#64748b" fontWeight="500" fontSize="8" fontFamily="system-ui">CERTIFIED</text>
                </svg>
                <span className="font-heading text-xs font-bold text-[var(--color-text-primary)] text-center">Water Softening</span>
              </div>

              {/* NSF ANSI 61 & 372 */}
              <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-white border border-[var(--color-border)] shadow-md hover:shadow-lg transition-shadow duration-300">
                <svg viewBox="0 0 120 120" className="w-14 h-14 mb-2" fill="none">
                  <circle cx="60" cy="60" r="56" stroke="#1a2744" strokeWidth="3" />
                  <circle cx="60" cy="60" r="48" stroke="#1a2744" strokeWidth="1.5" />
                  <text x="60" y="48" textAnchor="middle" fill="#1a2744" fontWeight="900" fontSize="28" fontFamily="system-ui">NSF</text>
                  <text x="60" y="66" textAnchor="middle" fill="#1a2744" fontWeight="600" fontSize="10" fontFamily="system-ui">ANSI 61 &amp; 372</text>
                  <text x="60" y="100" textAnchor="middle" fill="#64748b" fontWeight="500" fontSize="8" fontFamily="system-ui">CERTIFIED</text>
                </svg>
                <span className="font-heading text-xs font-bold text-[var(--color-text-primary)] text-center">Safe Materials & Lead-Free</span>
              </div>

              {/* WQA */}
              <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-white border border-[var(--color-border)] shadow-md hover:shadow-lg transition-shadow duration-300">
                <svg viewBox="0 0 120 120" className="w-14 h-14 mb-2" fill="none">
                  <circle cx="60" cy="60" r="56" stroke="#c8a84e" strokeWidth="3" />
                  <circle cx="60" cy="60" r="48" stroke="#c8a84e" strokeWidth="1.5" />
                  <text x="60" y="40" textAnchor="middle" fill="#c8a84e" fontWeight="700" fontSize="8" fontFamily="system-ui">TESTED AND CERTIFIED</text>
                  <text x="60" y="60" textAnchor="middle" fill="#1a2744" fontWeight="800" fontSize="14" fontFamily="system-ui">Water Quality</text>
                  <text x="60" y="76" textAnchor="middle" fill="#1a2744" fontWeight="600" fontSize="9" fontFamily="system-ui">ASSOCIATION</text>
                  <text x="60" y="100" textAnchor="middle" fill="#64748b" fontWeight="500" fontSize="8" fontFamily="system-ui">MEMBER</text>
                </svg>
                <span className="font-heading text-xs font-bold text-[var(--color-text-primary)] text-center">WQA Gold Seal Member</span>
              </div>

              {/* BBB A+ */}
              <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-white border border-[var(--color-border)] shadow-md hover:shadow-lg transition-shadow duration-300">
                <svg viewBox="0 0 120 120" className="w-14 h-14 mb-2" fill="none">
                  <rect x="8" y="8" width="104" height="104" rx="12" stroke="#005a78" strokeWidth="3" />
                  <text x="60" y="50" textAnchor="middle" fill="#005a78" fontWeight="900" fontSize="30" fontFamily="system-ui">BBB</text>
                  <text x="60" y="72" textAnchor="middle" fill="#005a78" fontWeight="700" fontSize="14" fontFamily="system-ui">A+ RATED</text>
                  <text x="60" y="90" textAnchor="middle" fill="#64748b" fontWeight="500" fontSize="8" fontFamily="system-ui">ACCREDITED SINCE 2018</text>
                </svg>
                <span className="font-heading text-xs font-bold text-[var(--color-text-primary)] text-center">BBB Accredited Business</span>
              </div>

              {/* Made in USA */}
              <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-white border border-[var(--color-border)] shadow-md hover:shadow-lg transition-shadow duration-300">
                <svg viewBox="0 0 120 120" className="w-14 h-14 mb-2" fill="none">
                  <circle cx="60" cy="60" r="56" stroke="#b91c1c" strokeWidth="2" />
                  <circle cx="60" cy="55" r="42" fill="#1a2744" />
                  <text x="60" y="42" textAnchor="middle" fill="white" fontWeight="800" fontSize="11" fontFamily="system-ui">MADE IN</text>
                  <text x="60" y="60" textAnchor="middle" fill="white" fontWeight="900" fontSize="18" fontFamily="system-ui">U.S.A.</text>
                  <path d="M38 68 L48 66 L58 68 L68 66 L78 68" stroke="#b91c1c" strokeWidth="2" fill="none" />
                  <path d="M38 72 L48 70 L58 72 L68 70 L78 72" stroke="white" strokeWidth="2" fill="none" />
                  <text x="60" y="106" textAnchor="middle" fill="#1a2744" fontWeight="700" fontSize="9" fontFamily="system-ui">25-YEAR GUARANTEE</text>
                </svg>
                <span className="font-heading text-xs font-bold text-[var(--color-text-primary)] text-center">American Made Equipment</span>
              </div>
            </motion.div>
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
                src="/images/water/family-drinking.jpeg"
                alt="Family drinking clean water in their kitchen"
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
                  src="/images/customers/happy-customers-1.jpg"
                  alt="Happy customers with their installed Aquafeel water system"
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
