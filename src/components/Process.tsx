"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { CalendarCheck, FlaskConical, Droplets } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";

/* ─── Step card component ─────────────────────────────────────────── */
function StepCard({
  number,
  icon: Icon,
  title,
  description,
  imageSrc,
  imageAlt,
  reverse,
  index,
}: {
  number: string;
  icon: React.ElementType;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  reverse: boolean;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-80px" });

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [-24, 24]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 56 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.72,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -6, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } }}
      className="relative flex flex-col lg:grid lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-[0_4px_40px_rgba(0,70,110,0.10)] border border-[var(--color-border)] bg-white group"
      style={{ gridTemplateColumns: reverse ? "1fr 1fr" : "1fr 1fr" }}
    >
      {/* ── Image side ── */}
      <div
        className={`relative w-full overflow-hidden ${
          reverse ? "lg:order-2" : "lg:order-1"
        } min-h-[240px] lg:min-h-[360px]`}
      >
        {/* Gradient overlay for image blend */}
        <div
          className={`absolute inset-0 z-10 pointer-events-none ${
            reverse
              ? "bg-gradient-to-l from-white/0 via-white/0 to-white/0"
              : "bg-gradient-to-r from-white/0 via-white/0 to-white/0"
          }`}
        />
        {/* Step number watermark over image */}
        <div
          className="absolute inset-0 z-10 flex items-end justify-start p-6 pointer-events-none"
          aria-hidden="true"
        >
          <span
            className="font-heading font-extrabold leading-none select-none text-white/25"
            style={{ fontSize: "clamp(5rem, 12vw, 9rem)" }}
          >
            {number}
          </span>
        </div>
        {/* Parallax image — extended height so motion doesn't show gaps */}
        <motion.div
          style={{ y: imageY, top: "-10%", bottom: "-10%", left: 0, right: 0, position: "absolute", willChange: "transform" }}
        >
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-center"
            priority={index === 0}
          />
        </motion.div>
        {/* Brand color tint on hover */}
        <div className="absolute inset-0 z-10 bg-[var(--color-primary)] opacity-0 group-hover:opacity-[0.08] transition-opacity duration-500 pointer-events-none" />
      </div>

      {/* ── Content side ── */}
      <div
        className={`relative flex flex-col justify-center p-8 sm:p-10 lg:p-14 ${
          reverse ? "lg:order-1" : "lg:order-2"
        }`}
      >
        {/* Giant watermark number behind content */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
          aria-hidden="true"
        >
          <span
            className="font-heading font-extrabold text-[var(--color-primary)] leading-none"
            style={{
              fontSize: "clamp(8rem, 20vw, 16rem)",
              opacity: 0.035,
              transform: "translateY(10%)",
            }}
          >
            {number}
          </span>
        </div>

        {/* Content */}
        <div className="relative z-10">
          {/* Step label */}
          <motion.div
            initial={{ opacity: 0, x: reverse ? -20 : 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.12 + 0.2 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-[var(--color-surface-alt)] border border-[var(--color-border)] group-hover:bg-[var(--color-primary)] group-hover:border-[var(--color-primary)] transition-all duration-400">
              <Icon className="w-5 h-5 text-[var(--color-primary)] group-hover:text-white transition-colors duration-400" />
            </div>
            <span className="font-heading font-semibold text-xs tracking-[0.2em] uppercase text-[var(--color-secondary)]">
              Step {number}
            </span>
          </motion.div>

          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: index * 0.12 + 0.3 }}
            className="font-heading font-extrabold text-[var(--color-text-primary)] mb-4 leading-tight"
            style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}
          >
            {title}
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: index * 0.12 + 0.4 }}
            className="font-body text-[var(--color-text-secondary)] leading-relaxed text-base sm:text-lg"
          >
            {description}
          </motion.p>

          {/* Decorative accent line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: index * 0.12 + 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 h-0.5 w-16 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary-light)] origin-left"
          />
        </div>
      </div>
    </motion.div>
  );
}

/* ─── SVG Connecting Thread ───────────────────────────────────────── */
function ConnectingThread({ progress }: { progress: MotionValue<number> }) {
  return (
    <div className="hidden lg:flex justify-center pointer-events-none select-none" aria-hidden="true">
      <svg width="64" height="80" viewBox="0 0 64 80" fill="none">
        <motion.path
          d="M 32 0 C 32 0, 10 20, 10 40 C 10 60, 54 60, 54 80"
          stroke="url(#threadGrad)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="6 4"
          fill="none"
          style={{ pathLength: progress }}
        />
        {/* Dot at end */}
        <motion.circle
          cx="54"
          cy="80"
          r="4"
          fill="var(--color-secondary-light)"
          style={{ opacity: progress }}
        />
        <defs>
          <linearGradient id="threadGrad" x1="32" y1="0" x2="54" y2="80" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="var(--color-secondary-light)" stopOpacity="0.7" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

/* ─── Main Section ────────────────────────────────────────────────── */
export default function Process() {
  const { t } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const thread1 = useTransform(scrollYProgress, [0.15, 0.45], [0, 1]);
  const thread2 = useTransform(scrollYProgress, [0.45, 0.75], [0, 1]);

  // Background parallax orbs
  const orb1Y = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const orb2Y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const steps = [
    {
      number: "01",
      icon: CalendarCheck,
      title: t.process.step1Title,
      description: t.process.step1Desc,
      imageSrc: "/images/water/filling-glass.jpeg",
      imageAlt: "Man filling glass at faucet",
    },
    {
      number: "02",
      icon: FlaskConical,
      title: t.process.step2Title,
      description: t.process.step2Desc,
      imageSrc: "/images/water/technician-consult.jpeg",
      imageAlt: "Technician showing water test results to homeowner",
    },
    {
      number: "03",
      icon: Droplets,
      title: t.process.step3Title,
      description: t.process.step3Desc,
      imageSrc: "/images/water/family-outdoor.jpeg",
      imageAlt: "Happy family with water outdoors",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-24 sm:py-32 overflow-hidden"
    >
      {/* ── Background layer ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Base surface */}
        <div className="absolute inset-0 bg-[var(--color-surface-alt)]" />

        {/* Gradient mesh */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_20%_20%,var(--color-primary)_0%,transparent_60%)] opacity-[0.04]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_80%_80%,var(--color-secondary-light)_0%,transparent_60%)] opacity-[0.05]" />

        {/* Parallax orbs */}
        <motion.div
          style={{ y: orb1Y }}
          className="absolute top-[10%] left-[3%] w-[500px] h-[500px] rounded-full"
          aria-hidden="true"
        >
          <div className="w-full h-full rounded-full bg-[radial-gradient(circle,var(--color-primary)_0%,transparent_70%)] opacity-[0.05]" />
        </motion.div>
        <motion.div
          style={{ y: orb2Y }}
          className="absolute bottom-[5%] right-[2%] w-[400px] h-[400px] rounded-full"
          aria-hidden="true"
        >
          <div className="w-full h-full rounded-full bg-[radial-gradient(circle,var(--color-secondary-light)_0%,transparent_70%)] opacity-[0.06]" />
        </motion.div>

        {/* Top wave */}
        <svg
          className="absolute top-0 left-0 right-0 w-full"
          viewBox="0 0 1440 80"
          fill="none"
          preserveAspectRatio="none"
          style={{ height: 80 }}
        >
          <path
            d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,0 L0,0 Z"
            fill="var(--color-background)"
            fillOpacity="0.6"
          />
        </svg>
        {/* Bottom wave */}
        <svg
          className="absolute bottom-0 left-0 right-0 w-full"
          viewBox="0 0 1440 80"
          fill="none"
          preserveAspectRatio="none"
          style={{ height: 80 }}
        >
          <path
            d="M0,40 C240,0 480,80 720,40 C960,0 1200,80 1440,40 L1440,80 L0,80 Z"
            fill="var(--color-background)"
            fillOpacity="0.6"
          />
        </svg>

        {/* Decorative flowing curve */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1440 900"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
        >
          <path
            d="M -100 300 C 200 100, 600 500, 900 250 C 1200 0, 1500 400, 1600 600"
            stroke="var(--color-primary)"
            strokeWidth="1.5"
            strokeOpacity="0.07"
            fill="none"
          />
          <path
            d="M -100 500 C 300 700, 700 200, 1000 450 C 1300 700, 1500 300, 1600 400"
            stroke="var(--color-secondary-light)"
            strokeWidth="1"
            strokeOpacity="0.06"
            fill="none"
          />
        </svg>
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div ref={headerRef} className="text-center mb-16 sm:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block font-heading text-xs sm:text-sm tracking-[0.22em] uppercase text-[var(--color-secondary)] font-semibold mb-3"
          >
            {t.process.sectionLabel}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading font-extrabold text-[var(--color-text-primary)]"
            style={{ fontSize: "var(--text-h2)" }}
          >
            {t.process.headline}
          </motion.h2>
          {/* Animated underline accent */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={headerInView ? { scaleX: 1, opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 mx-auto h-1 w-20 rounded-full bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-secondary-light)] to-[var(--color-primary)] origin-center"
          />
        </div>

        {/* Step cards stack */}
        <div className="flex flex-col gap-6 sm:gap-8">
          {steps.map((step, i) => (
            <div key={step.number}>
              <StepCard
                {...step}
                reverse={i % 2 === 1}
                index={i}
              />
              {/* Connecting thread between cards */}
              {i < steps.length - 1 && (
                <ConnectingThread progress={i === 0 ? thread1 : thread2} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
