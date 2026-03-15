"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";

const testimonials = [
  {
    name: "Mario",
    location: "Henderson, NC",
    quote:
      "Great customer service. Water tastes great and clean. Have them test your water just to see what I mean. Get the system and see the difference.",
  },
  {
    name: "Daisy",
    location: "Lillington, NC",
    quote:
      "Casandra came by our home and tested our water. Needless to say, it was very eye-opening. The water feels and tastes right, and we love it.",
  },
  {
    name: "Ashley",
    location: "Zebulon, NC",
    quote:
      "Fahad and Casandra came by our place to test our water and I must say this visit was life changing! We went from having hard water to water that feels soft on my skin.",
  },
  {
    name: "Sabrina",
    location: "Glenn Dale, MD",
    quote:
      "This was such an amazing and educational experience. Fahad was so clear and concise in all of his explanations and most of all, he was kind.",
  },
  {
    name: "Edgar",
    location: "Raleigh, NC",
    quote:
      "Antonio gave an excellent presentation and gave a thorough explanation of each test he performed. I would give 10/10 for his attention to service and follow-ups.",
  },
];

export default function Testimonials() {
  const { t } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [active, setActive] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [autoPlay]);

  const goTo = (index: number) => {
    setActive(index);
    setAutoPlay(false);
    setTimeout(() => setAutoPlay(true), 10000);
  };

  const prev = () => goTo((active - 1 + testimonials.length) % testimonials.length);
  const next = () => goTo((active + 1) % testimonials.length);

  return (
    <section ref={sectionRef} className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background with water surface texture */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[var(--color-surface)]" />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "url(/images/water/water-surface.jpeg)", backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-surface)] via-transparent to-[var(--color-surface)]" />
        <div className="absolute top-[5%] left-[50%] -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-[radial-gradient(circle,var(--color-primary)_0%,transparent_70%)] opacity-[0.04]" />
        <div className="absolute bottom-[10%] left-[10%] w-[300px] h-[300px] rounded-full bg-[radial-gradient(circle,var(--color-secondary-light)_0%,transparent_70%)] opacity-[0.05]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block font-heading text-xs sm:text-sm tracking-[0.2em] uppercase text-[var(--color-secondary)] font-semibold mb-3">
            {t.testimonials.sectionLabel}
          </span>
          <h2
            className="font-heading font-extrabold text-[var(--color-text-primary)]"
            style={{ fontSize: "var(--text-h2)" }}
          >
            {t.testimonials.headline}
          </h2>
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          <div className="bg-white rounded-2xl shadow-xl shadow-brand-navy/5 border border-[var(--color-border)] p-5 sm:p-12 min-h-[260px] sm:min-h-[280px] flex flex-col items-center justify-center text-center relative overflow-hidden">
            <Quote className="w-10 h-10 text-[var(--color-primary)] opacity-10 absolute top-6 left-8" />

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center"
              >
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-brand-aqua text-brand-aqua"
                    />
                  ))}
                </div>

                <p className="text-[var(--color-text-primary)] text-base sm:text-xl font-body leading-relaxed max-w-2xl mb-6 italic">
                  &ldquo;{testimonials[active].quote}&rdquo;
                </p>

                <div>
                  <span className="font-heading font-bold text-base text-[var(--color-text-primary)]">
                    {testimonials[active].name}
                  </span>
                  <span className="text-[var(--color-text-muted)] text-sm ml-2">
                    - {testimonials[active].location}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full bg-white border border-[var(--color-border)] flex items-center justify-center hover:bg-[var(--color-surface-alt)] transition-colors duration-200 shadow-sm"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5 text-[var(--color-text-primary)]" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    i === active
                      ? "bg-[var(--color-primary)] w-8"
                      : "bg-[var(--color-border)] hover:bg-[var(--color-text-muted)]"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 rounded-full bg-white border border-[var(--color-border)] flex items-center justify-center hover:bg-[var(--color-surface-alt)] transition-colors duration-200 shadow-sm"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5 text-[var(--color-text-primary)]" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
