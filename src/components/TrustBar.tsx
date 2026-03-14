"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  ShieldCheck,
  Award,
  Flag,
  BadgeCheck,
  Zap,
  Shield,
} from "lucide-react";
import { useI18n } from "@/lib/i18n/context";

export default function TrustBar() {
  const { t } = useI18n();
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const certifications = [
    { icon: BadgeCheck, label: t.trust.waterQualityAssociation },
    { icon: ShieldCheck, label: t.trust.nsfCertified },
    { icon: Award, label: t.trust.bbbAccredited },
    { icon: Zap, label: t.trust.vortechTechnology },
    { icon: Flag, label: t.trust.madeInUsa },
    { icon: Shield, label: t.common.locallyOwnedBadge },
  ];

  const scrollItems = [...certifications, ...certifications];

  return (
    <section
      ref={ref}
      className="relative py-5 bg-[var(--color-primary-dark)] overflow-hidden"
    >
      {/* Subtle top highlight */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-cyan/30 to-transparent" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden"
      >
        <div className="flex animate-marquee">
          {scrollItems.map((cert, i) => (
            <div
              key={`${cert.label}-${i}`}
              className="flex items-center gap-3 px-10 shrink-0"
            >
              <cert.icon className="w-5 h-5 text-brand-cyan shrink-0" />
              <span className="font-heading text-sm font-semibold text-white/90 tracking-wide whitespace-nowrap uppercase">
                {cert.label}
              </span>
              <span className="text-white/20 text-lg ml-6">|</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Bottom highlight */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-cyan/20 to-transparent" />

      <style jsx>{`
        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
      `}</style>
    </section>
  );
}
