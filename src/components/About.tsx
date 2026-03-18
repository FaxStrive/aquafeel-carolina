"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Users, ShieldCheck, Star, Award, Leaf } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";

export default function About() {
  const { t } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const imageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const secondImageY = useTransform(scrollYProgress, [0, 1], [20, -60]);

  const values = [
    {
      icon: Users,
      title: t.about.familyFirst,
      text: t.about.familyFirstDesc,
    },
    {
      icon: ShieldCheck,
      title: t.about.certified,
      text: t.about.certifiedDesc,
    },
    {
      icon: Star,
      title: t.about.trusted,
      text: t.about.trustedDesc,
    },
  ];

  return (
    <section ref={sectionRef} className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[var(--color-background)]" />
        <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-surface-alt)] via-[var(--color-surface)] to-[var(--color-background)]" />
        <div className="absolute top-[10%] right-0 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,var(--color-primary)_0%,transparent_70%)] opacity-[0.03]" />
        <div className="absolute bottom-0 left-[10%] w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,var(--color-secondary-light)_0%,transparent_70%)] opacity-[0.04]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image stack */}
          <motion.div
            ref={imageRef}
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative"
          >
            {/* Primary image - team awards */}
            <motion.div style={{ y: imageY }} className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-brand-navy/10">
                <Image
                  src="/images/client/team-awards.jpg"
                  alt={t.about.teamCaption}
                  width={640}
                  height={480}
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 rounded-2xl border-2 border-brand-cyan/20 -z-10" />
              <div className="absolute -top-4 -left-4 w-24 h-24 rounded-2xl bg-[var(--color-primary)] opacity-10 -z-10" />
            </motion.div>

            {/* Secondary image - founders awards (overlapping) */}
            <motion.div
              style={{ y: secondImageY }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="absolute -bottom-8 -left-4 sm:left-auto sm:-right-8 w-[55%] sm:w-[48%] z-20"
            >
              <div className="relative rounded-xl overflow-hidden shadow-xl shadow-brand-navy/15 border-4 border-white">
                <Image
                  src="/images/client/founders-awards.jpg"
                  alt={t.about.foundersCaption}
                  width={320}
                  height={240}
                  className="w-full h-auto object-cover"
                />
              </div>
            </motion.div>

            {/* Experience badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="absolute -top-4 right-2 sm:right-6 bg-white rounded-xl shadow-lg shadow-brand-navy/10 p-4 sm:p-5 border border-[var(--color-border)] z-30"
            >
              <div className="text-center">
                <span className="block font-heading font-extrabold text-3xl text-[var(--color-primary)]">
                  18+
                </span>
                <span className="block font-heading font-semibold text-xs text-[var(--color-text-secondary)] tracking-wide uppercase">
                  {t.about.yearsExperience}
                </span>
              </div>
            </motion.div>

            {/* 25-year guarantee badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="absolute top-1/2 -left-3 sm:-left-6 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] rounded-xl shadow-lg p-3 sm:p-4 z-30"
            >
              <div className="text-center">
                <Award className="w-5 h-5 text-white mx-auto mb-1" />
                <span className="block font-heading font-extrabold text-lg text-white leading-none">
                  25
                </span>
                <span className="block font-heading font-semibold text-[10px] text-white/90 tracking-wide uppercase mt-0.5">
                  {t.about.guaranteeBadge}
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{
              duration: 0.7,
              delay: 0.2,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            <span className="inline-block font-heading text-xs sm:text-sm tracking-[0.2em] uppercase text-[var(--color-secondary)] font-semibold mb-3">
              {t.about.sectionLabel}
            </span>
            <h2
              className="font-heading font-extrabold text-[var(--color-text-primary)] mb-6"
              style={{ fontSize: "var(--text-h2)" }}
            >
              {t.about.headline}
            </h2>
            <p className="text-[var(--color-text-secondary)] text-lg font-body leading-relaxed mb-6">
              {t.about.description}
            </p>
            <p className="text-[var(--color-text-secondary)] text-base font-body leading-relaxed mb-6">
              {t.about.description2}
            </p>

            {/* Organic Products Program highlight */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.45 }}
              className="flex items-start gap-3 bg-gradient-to-r from-[var(--color-surface-alt)] to-[var(--color-surface)] rounded-xl p-4 mb-8 border border-[var(--color-border)]"
            >
              <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-lg bg-green-50">
                <Leaf className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-sm text-[var(--color-text-primary)]">
                  {t.about.organicProgram}
                </h4>
                <p className="text-xs text-[var(--color-text-muted)] font-body mt-1 leading-relaxed">
                  {t.about.organicProgramDesc}
                </p>
              </div>
            </motion.div>

            {/* Values */}
            <div className="grid sm:grid-cols-3 gap-6">
              {values.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="text-center sm:text-left"
                >
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-[var(--color-surface-alt)] mb-3">
                    <item.icon className="w-5 h-5 text-[var(--color-primary)]" />
                  </div>
                  <h4 className="font-heading font-bold text-sm text-[var(--color-text-primary)]">
                    {item.title}
                  </h4>
                  <p className="text-xs text-[var(--color-text-muted)] font-body mt-1">
                    {item.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
