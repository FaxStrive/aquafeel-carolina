"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { AlertTriangle, ShieldCheck, XCircle } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";

export default function WaterQuality() {
  const { t } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const concerns = [
    {
      icon: XCircle,
      label: t.waterQuality.chlorine,
      detail: t.waterQuality.chlorineDesc,
    },
    {
      icon: XCircle,
      label: t.waterQuality.lead,
      detail: t.waterQuality.leadDesc,
    },
    {
      icon: XCircle,
      label: t.waterQuality.pfas,
      detail: t.waterQuality.pfasDesc,
    },
    {
      icon: XCircle,
      label: t.waterQuality.microplastics,
      detail: t.waterQuality.microplasticsDesc,
    },
  ];

  return (
    <section ref={sectionRef} className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-white" />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-surface)] via-white to-[var(--color-surface-alt)]" />
        <div className="absolute top-[15%] right-[10%] w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,var(--color-primary)_0%,transparent_70%)] opacity-[0.04]" />
        <div className="absolute bottom-[10%] left-[5%] w-[350px] h-[350px] rounded-full bg-[radial-gradient(circle,var(--color-secondary-light)_0%,transparent_70%)] opacity-[0.05]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-[var(--color-accent)]" />
              <span className="font-heading text-xs sm:text-sm tracking-[0.2em] uppercase text-[var(--color-accent)] font-semibold">
                {t.waterQuality.sectionLabel}
              </span>
            </div>

            <h2
              className="font-heading font-extrabold text-[var(--color-text-primary)] mb-6"
              style={{ fontSize: "var(--text-h2)" }}
            >
              {t.waterQuality.headline}
            </h2>

            <p className="text-[var(--color-text-secondary)] text-lg font-body leading-relaxed mb-8">
              {t.waterQuality.description}
            </p>

            {/* Contaminant list */}
            <div className="space-y-4">
              {concerns.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                  className="flex items-start gap-3"
                >
                  <div className="shrink-0 mt-0.5">
                    <item.icon className="w-5 h-5 text-red-500/70" />
                  </div>
                  <div>
                    <span className="font-heading font-bold text-sm text-[var(--color-text-primary)]">
                      {item.label}
                    </span>
                    <p className="text-[var(--color-text-muted)] text-sm font-body mt-0.5">
                      {item.detail}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Image + before/after comparison */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-brand-navy/10">
              <Image
                src="/images/client/photo-08.jpeg"
                alt="Aquafeel Solutions water quality testing demonstration"
                width={640}
                height={480}
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Before/After badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="absolute -bottom-6 left-4 sm:left-8 bg-white rounded-xl shadow-lg shadow-brand-navy/10 p-5 border border-[var(--color-border)] max-w-[280px]"
            >
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center mb-1.5">
                    <XCircle className="w-5 h-5 text-red-500" />
                  </div>
                  <span className="text-xs font-heading font-semibold text-[var(--color-text-muted)]">
                    {t.waterQuality.before}
                  </span>
                </div>
                <div className="flex-1 h-px bg-gradient-to-r from-red-200 to-emerald-200" />
                <div className="text-center">
                  <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center mb-1.5">
                    <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  </div>
                  <span className="text-xs font-heading font-semibold text-[var(--color-text-muted)]">
                    {t.waterQuality.after}
                  </span>
                </div>
              </div>
              <p className="text-xs text-center text-[var(--color-text-muted)] mt-2 font-body">
                {t.waterQuality.badgeText}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
