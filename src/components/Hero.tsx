"use client";

import { useRef, useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion";
import { Phone, ShieldCheck, Award, Flag, Clock, Shield } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";

function BlurWord({
  word,
  index,
}: {
  word: string;
  index: number;
  total?: number;
}) {
  return (
    <motion.span
      className="inline-block mr-[0.3em]"
      initial={{ opacity: 0, filter: "blur(12px)", y: 20 }}
      animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
      transition={{
        duration: 0.6,
        delay: 0.3 + index * 0.12,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {word}
    </motion.span>
  );
}

export default function Hero() {
  const { t } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const springConfig = { stiffness: 100, damping: 30 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const parallaxX1 = useTransform(smoothMouseX, [-500, 500], [-15, 15]);
  const parallaxY1 = useTransform(smoothMouseY, [-500, 500], [-10, 10]);
  const parallaxX2 = useTransform(smoothMouseX, [-500, 500], [10, -10]);
  const parallaxY2 = useTransform(smoothMouseY, [-500, 500], [8, -8]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    const centerX = e.clientX - rect.left - rect.width / 2;
    const centerY = e.clientY - rect.top - rect.height / 2;
    mouseX.set(centerX);
    mouseY.set(centerY);
  };

  const trustBadges = [
    { icon: Shield, label: t.common.locallyOwnedBadge },
    { icon: Clock, label: t.trust.yearsExperience },
    { icon: ShieldCheck, label: t.trust.nsfCertified },
    { icon: Award, label: t.trust.bbbAccredited },
    { icon: Flag, label: t.trust.madeInUsa },
  ];

  const headlineWords = t.hero.headline.split(" ");

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/hero-water.mp4" type="video/mp4" />
      </video>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 video-overlay" />

      {/* Animated floating orbs for depth - parallax linked */}
      {isMounted && (
        <>
          <motion.div
            style={{ x: parallaxX1, y: parallaxY1 }}
            className="absolute top-[15%] right-[10%] w-[400px] h-[400px] rounded-full opacity-20 pointer-events-none"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          >
            <div className="w-full h-full rounded-full bg-[radial-gradient(circle,var(--color-secondary-light)_0%,transparent_70%)] animate-float" />
          </motion.div>
          <motion.div
            style={{ x: parallaxX2, y: parallaxY2 }}
            className="absolute bottom-[20%] left-[5%] w-[300px] h-[300px] rounded-full opacity-15 pointer-events-none"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, delay: 0.8 }}
          >
            <div className="w-full h-full rounded-full bg-[radial-gradient(circle,var(--color-accent-light)_0%,transparent_70%)] animate-float-slow" />
          </motion.div>
        </>
      )}

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 text-center">
        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-heading text-[11px] sm:text-base tracking-[0.15em] sm:tracking-[0.2em] uppercase text-white font-semibold mb-6 drop-shadow-[0_1px_8px_rgba(0,0,0,0.5)] bg-black/30 backdrop-blur-sm inline-block px-4 sm:px-5 py-2 rounded-full max-w-[90vw]"
        >
          {t.hero.tagline}
        </motion.p>

        {/* Headline with blur-in words */}
        <h1
          className="font-heading font-extrabold leading-[1.08] mb-6 text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.4)]"
          style={{ fontSize: "var(--text-hero)" }}
        >
          {headlineWords.map((word, i) => (
            <BlurWord
              key={word + i}
              word={word}
              index={i}
              total={headlineWords.length}
            />
          ))}
        </h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.0 }}
          className="max-w-2xl mx-auto text-white text-lg sm:text-xl leading-relaxed mb-10 font-body font-medium drop-shadow-[0_1px_6px_rgba(0,0,0,0.3)]"
        >
          {t.hero.subheadline}
        </motion.p>

        {/* CTA + Phone */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
        >
          <MagneticCTA label={t.hero.ctaPrimary} />

          <motion.a
            href="tel:9842123558"
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white font-heading font-semibold text-base hover:bg-white/20 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            <Phone className="w-5 h-5" />
            {t.common.phone}
          </motion.a>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.6 }}
          className="mt-16 sm:mt-20 flex flex-wrap items-center justify-center gap-6 sm:gap-10"
        >
          {trustBadges.map((badge, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.7 + i * 0.1 }}
              className="flex items-center gap-2 text-white/70"
            >
              <badge.icon className="w-5 h-5 text-brand-cyan" />
              <span className="font-heading text-xs sm:text-sm font-bold tracking-wide">
                {badge.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--color-background)] to-transparent pointer-events-none z-10" />
    </section>
  );
}

function MagneticCTA({ label }: { label: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouse = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const centerX = e.clientX - (rect.left + rect.width / 2);
    const centerY = e.clientY - (rect.top + rect.height / 2);
    x.set(centerX * 0.3);
    y.set(centerY * 0.3);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href="/contact"
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ x: springX, y: springY }}
      className="relative inline-flex items-center px-8 sm:px-10 py-4 rounded-lg bg-[var(--color-accent-light)] text-[var(--color-primary-dark)] font-heading font-bold text-base sm:text-lg tracking-wide hover:bg-[var(--color-accent)] transition-colors duration-300 group overflow-hidden"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
    >
      <span className="relative z-10">{label}</span>
      <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2)_0%,transparent_70%)]" />
    </motion.a>
  );
}
