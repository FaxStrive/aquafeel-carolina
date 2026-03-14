"use client";

import { useRef } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";
import { CalendarCheck, FlaskConical, Droplets } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";

export default function Process() {
  const { t } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const pathProgress = useTransform(scrollYProgress, [0.1, 0.6], [0, 1]);

  const steps = [
    {
      icon: CalendarCheck,
      number: "01",
      title: t.process.step1Title,
      description: t.process.step1Desc,
    },
    {
      icon: FlaskConical,
      number: "02",
      title: t.process.step2Title,
      description: t.process.step2Desc,
    },
    {
      icon: Droplets,
      number: "03",
      title: t.process.step3Title,
      description: t.process.step3Desc,
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-24 sm:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[var(--color-surface-alt)]" />
        <svg
          className="absolute bottom-0 left-0 right-0 w-full h-40 text-white/60"
          viewBox="0 0 1440 160"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d="M0,96L48,101.3C96,107,192,117,288,106.7C384,96,480,64,576,64C672,64,768,96,864,112C960,128,1056,128,1152,117.3C1248,107,1344,85,1392,74.7L1440,64L1440,160L0,160Z"
            fill="currentColor"
          />
        </svg>
        <div className="absolute top-[20%] left-[5%] w-[350px] h-[350px] rounded-full bg-[radial-gradient(circle,var(--color-primary)_0%,transparent_70%)] opacity-[0.03]" />
        <div className="absolute bottom-[30%] right-[8%] w-[300px] h-[300px] rounded-full bg-[radial-gradient(circle,var(--color-secondary-light)_0%,transparent_70%)] opacity-[0.04]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 sm:mb-20"
        >
          <span className="inline-block font-heading text-xs sm:text-sm tracking-[0.2em] uppercase text-[var(--color-secondary)] font-semibold mb-3">
            {t.process.sectionLabel}
          </span>
          <h2
            className="font-heading font-extrabold text-[var(--color-text-primary)]"
            style={{ fontSize: "var(--text-h2)" }}
          >
            {t.process.headline}
          </h2>
        </motion.div>

        {/* Steps with SVG connecting line */}
        <div className="relative">
          {/* SVG Connecting Line (desktop only) */}
          <div className="hidden lg:block absolute top-24 left-[16.67%] right-[16.67%] h-1 z-0">
            <svg
              className="w-full h-8"
              viewBox="0 0 800 32"
              fill="none"
              preserveAspectRatio="none"
            >
              <motion.path
                d="M 0 16 C 200 16, 200 16, 400 16 C 600 16, 600 16, 800 16"
                stroke="var(--color-secondary-light)"
                strokeWidth="2"
                strokeDasharray="8 4"
                fill="none"
                style={{ pathLength: pathProgress }}
                initial={{ pathLength: 0 }}
              />
            </svg>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: 0.2 + i * 0.15,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="relative text-center"
              >
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 font-heading font-extrabold text-7xl text-[var(--color-primary)] opacity-[0.06] select-none pointer-events-none">
                  {step.number}
                </div>

                <motion.div
                  whileHover={{ scale: 1.08, rotate: 3 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  className="relative mx-auto w-20 h-20 rounded-2xl bg-white shadow-lg shadow-brand-navy/8 border border-[var(--color-border)] flex items-center justify-center mb-6"
                >
                  <step.icon className="w-8 h-8 text-[var(--color-primary)]" />
                  <div className="absolute inset-0 rounded-2xl bg-[var(--color-primary)] opacity-0 hover:opacity-5 transition-opacity duration-300" />
                </motion.div>

                <h3 className="font-heading font-bold text-xl text-[var(--color-text-primary)] mb-3">
                  {step.title}
                </h3>
                <p className="text-[var(--color-text-secondary)] text-base font-body leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
