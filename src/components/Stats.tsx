"use client";

import { useRef, useEffect, useState } from "react";
import {
  motion,
  useInView,
  useSpring,
  useMotionValue,
} from "framer-motion";
import { useI18n } from "@/lib/i18n/context";

function AnimatedNumber({
  value,
  suffix,
  isInView,
}: {
  value: number;
  suffix: string;
  isInView: boolean;
}) {
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, {
    stiffness: 60,
    damping: 30,
  });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, motionValue, value]);

  useEffect(() => {
    const unsubscribe = spring.on("change", (latest) => {
      if (value >= 1000) {
        setDisplay(Math.floor(latest).toLocaleString());
      } else {
        setDisplay(Math.floor(latest).toString());
      }
    });
    return unsubscribe;
  }, [spring, value]);

  return (
    <span>
      {display}
      {suffix}
    </span>
  );
}

export default function Stats() {
  const { t } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" });

  const stats = [
    { value: 18, suffix: "+", label: t.stats.yearsExperience },
    { value: 5500, suffix: "+", label: t.stats.familiesServed },
    { value: 4, suffix: "", label: t.stats.nsfCertifications },
    { value: 100, suffix: "%", label: t.stats.satisfactionRate },
  ];

  return (
    <section ref={sectionRef} className="relative py-20 sm:py-28 overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/dark-water.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-[#0f172a]/80" />

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-[10%] left-[15%] w-[350px] h-[350px] rounded-full opacity-[0.12] animate-float"
          style={{
            background:
              "radial-gradient(circle, var(--color-secondary-light) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-[15%] right-[10%] w-[400px] h-[400px] rounded-full opacity-[0.08] animate-float-slow"
          style={{
            background:
              "radial-gradient(circle, var(--color-accent-light) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-cyan/30 to-transparent" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: 0.1 + i * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="text-center"
            >
              <div className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white mb-2">
                <AnimatedNumber
                  value={stat.value}
                  suffix={stat.suffix}
                  isInView={isInView}
                />
              </div>
              <div className="font-heading text-xs sm:text-sm font-semibold tracking-[0.15em] uppercase text-white/50">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-cyan/20 to-transparent" />
    </section>
  );
}
