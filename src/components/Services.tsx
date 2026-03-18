"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Leaf } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";

export default function Services() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { t } = useI18n() as any;
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const services = [
    {
      title: t.services.cityWater,
      description: t.services.cityWaterDesc,
      image: "/images/client/photo-01.jpeg",
      href: "/services/city-water",
    },
    {
      title: t.services.wellWater,
      description: t.services.wellWaterDesc,
      image: "/images/client/product-install.jpg",
      href: "/services/well-water",
    },
    {
      title: t.services.alkalineRo,
      description: t.services.alkalineRoDesc,
      image: "/images/client/photo-03.jpeg",
      href: "/services/alkaline-ro",
    },
  ];

  return (
    <section ref={sectionRef} className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[var(--color-surface)]" />
        <div className="absolute top-0 left-1/3 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,var(--color-secondary-light)_0%,transparent_70%)] opacity-[0.04]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,var(--color-primary-light)_0%,transparent_70%)] opacity-[0.05]" />
        {/* Directional sweep */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/50 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-16"
        >
          <span className="inline-block font-heading text-xs sm:text-sm tracking-[0.2em] uppercase text-[var(--color-secondary)] font-semibold mb-3">
            {t.services.sectionLabel}
          </span>
          <h2
            className="font-heading font-extrabold text-[var(--color-text-primary)]"
            style={{ fontSize: "var(--text-h2)" }}
          >
            {t.services.headline}
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-[var(--color-text-secondary)] text-lg font-body">
            {t.services.description}
          </p>

          {/* Organic Products badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="inline-flex items-center gap-2 mt-5 px-4 py-2 rounded-full bg-green-50 border border-green-200"
          >
            <Leaf className="w-4 h-4 text-green-600" />
            <span className="font-heading font-semibold text-sm text-green-700">
              {t.services.organicBadge}
            </span>
          </motion.div>
        </motion.div>

        {/* Service Cards - 3-column grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 -mt-2">
          {services.map((service, i) => (
            <ServiceCard
              key={service.href}
              service={service}
              index={i}
              isInView={isInView}
              learnMoreText={t.cta.learnMore}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  service,
  index,
  isInView,
  learnMoreText,
}: {
  service: { title: string; description: string; image: string; href: string };
  index: number;
  isInView: boolean;
  learnMoreText: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: 0.15 * index,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{ y: -8 }}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-lg shadow-brand-navy/5 border border-[var(--color-border)] hover:shadow-xl hover:shadow-brand-navy/10 transition-shadow duration-500"
      style={{ perspective: "800px" }}
    >
      {/* Image */}
      <div className="relative h-56 sm:h-64 overflow-hidden">
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-6 sm:p-7">
        <h3 className="font-heading font-bold text-xl text-[var(--color-text-primary)] mb-3">
          {service.title}
        </h3>
        <p className="text-[var(--color-text-secondary)] text-sm sm:text-base font-body leading-relaxed mb-5">
          {service.description}
        </p>
        <a
          href={service.href}
          className="inline-flex items-center gap-2 font-heading font-semibold text-sm text-[var(--color-primary)] group-hover:text-[var(--color-accent-light)] transition-colors duration-300"
        >
          {learnMoreText}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
        </a>
      </div>

      {/* Hover accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-cyan via-brand-navy to-brand-aqua scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
    </motion.div>
  );
}
