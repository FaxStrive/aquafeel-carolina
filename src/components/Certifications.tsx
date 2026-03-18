"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ShieldCheck, Award, Flag, BadgeCheck, Zap } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";

function CertBadge({
  icon: Icon,
  title,
  subtitle,
  color,
  delay,
  isInView,
}: {
  icon: typeof ShieldCheck;
  title: string;
  subtitle: string;
  color: string;
  delay: number;
  isInView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative flex flex-col items-center text-center px-4 py-6 sm:py-8"
    >
      {/* Icon container */}
      <div
        className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1"
        style={{
          background: `linear-gradient(135deg, ${color}15, ${color}08)`,
          border: `1.5px solid ${color}25`,
        }}
      >
        <Icon
          className="w-8 h-8 sm:w-10 sm:h-10 transition-colors duration-300"
          style={{ color }}
        />
        {/* Glow on hover */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            boxShadow: `0 8px 32px ${color}20`,
          }}
        />
      </div>

      <h3 className="font-heading font-bold text-sm sm:text-base text-[var(--color-text-primary)] mb-1">
        {title}
      </h3>
      <p className="font-body text-xs sm:text-sm text-[var(--color-text-muted)] leading-snug max-w-[160px]">
        {subtitle}
      </p>
    </motion.div>
  );
}

export default function Certifications() {
  const { t } = useI18n();
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const certifications = [
    {
      icon: ShieldCheck,
      title: "NSF ANSI 42/44",
      subtitle: t.certifications.nsf4244,
      color: "var(--color-primary)",
    },
    {
      icon: ShieldCheck,
      title: "NSF ANSI 61/372",
      subtitle: t.certifications.nsf61372,
      color: "var(--color-secondary-light)",
    },
    {
      icon: BadgeCheck,
      title: "WQA Member",
      subtitle: t.certifications.wqa,
      color: "var(--color-accent-dark)",
    },
    {
      icon: Award,
      title: "BBB Accredited",
      subtitle: t.certifications.bbb,
      color: "#e8a230",
    },
    {
      icon: Flag,
      title: "Made in USA",
      subtitle: t.certifications.madeInUsa,
      color: "var(--color-primary)",
    },
    {
      icon: Zap,
      title: "Vortech Technology",
      subtitle: t.certifications.vortech,
      color: "var(--color-secondary-dark)",
    },
  ];

  return (
    <section ref={ref} className="relative py-20 sm:py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-[var(--color-surface)] to-white" />
        <div
          className="absolute top-[20%] left-[10%] w-[500px] h-[500px] rounded-full opacity-[0.04]"
          style={{
            background:
              "radial-gradient(circle, var(--color-secondary-light) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-[10%] right-[15%] w-[400px] h-[400px] rounded-full opacity-[0.05]"
          style={{
            background:
              "radial-gradient(circle, var(--color-primary-light) 0%, transparent 70%)",
          }}
        />
        {/* Decorative SVG wave */}
        <svg
          className="absolute top-0 left-0 w-full h-24 opacity-[0.04]"
          viewBox="0 0 1440 96"
          preserveAspectRatio="none"
        >
          <path
            d="M0,48 C240,80 480,16 720,48 C960,80 1200,16 1440,48 L1440,0 L0,0 Z"
            fill="var(--color-primary)"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <p className="font-heading text-sm tracking-[0.15em] uppercase text-[var(--color-secondary)] font-semibold mb-3">
            {t.certifications.sectionLabel}
          </p>
          <h2
            className="font-heading font-extrabold text-[var(--color-text-primary)] mb-4"
            style={{ fontSize: "var(--text-h2)" }}
          >
            {t.certifications.headline}
          </h2>
          <p className="font-body text-[var(--color-text-secondary)] max-w-2xl mx-auto text-lg leading-relaxed">
            {t.certifications.description}
          </p>
        </motion.div>

        {/* Certification badges grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-4">
          {certifications.map((cert, i) => (
            <CertBadge
              key={cert.title}
              icon={cert.icon}
              title={cert.title}
              subtitle={cert.subtitle}
              color={cert.color}
              delay={0.1 + i * 0.08}
              isInView={isInView}
            />
          ))}
        </div>

        {/* Bottom trust line */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-12 sm:mt-16 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[var(--color-surface-alt)] border border-[var(--color-border)]">
            <ShieldCheck className="w-5 h-5 text-[var(--color-secondary)]" />
            <span className="font-heading text-sm font-semibold text-[var(--color-text-secondary)]">
              {t.certifications.trustLine}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
