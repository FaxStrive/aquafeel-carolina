"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";

function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
  index,
  isInView,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
  isInView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.1 + index * 0.06, duration: 0.5 }}
      className="border-b border-[var(--color-border)] last:border-b-0"
    >
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full py-5 text-left group"
      >
        <span className="font-heading font-semibold text-base sm:text-lg text-[var(--color-text-primary)] pr-8 group-hover:text-[var(--color-primary)] transition-colors duration-200">
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="shrink-0"
        >
          <ChevronDown className="w-5 h-5 text-[var(--color-text-muted)]" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-[var(--color-text-secondary)] font-body leading-relaxed pr-4 sm:pr-12">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const { t } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    { question: t.faq.q1, answer: t.faq.a1 },
    { question: t.faq.q2, answer: t.faq.a2 },
    { question: t.faq.q3, answer: t.faq.a3 },
    { question: t.faq.q4, answer: t.faq.a4 },
    { question: t.faq.q5, answer: t.faq.a5 },
    { question: t.faq.q6, answer: t.faq.a6 },
    { question: t.faq.q7, answer: t.faq.a7 },
    { question: t.faq.q8, answer: t.faq.a8 },
  ];

  return (
    <section ref={sectionRef} className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[var(--color-surface-alt)]" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,var(--color-primary)_0%,transparent_70%)] opacity-[0.03]" />
        <div className="absolute bottom-[20%] left-[5%] w-[350px] h-[350px] rounded-full bg-[radial-gradient(circle,var(--color-secondary-light)_0%,transparent_70%)] opacity-[0.04]" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block font-heading text-xs sm:text-sm tracking-[0.2em] uppercase text-[var(--color-secondary)] font-semibold mb-3">
            {t.faq.sectionLabel}
          </span>
          <h2
            className="font-heading font-extrabold text-[var(--color-text-primary)]"
            style={{ fontSize: "var(--text-h2)" }}
          >
            {t.faq.headline}
          </h2>
        </motion.div>

        {/* Accordion */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg shadow-brand-navy/5 border border-[var(--color-border)] px-6 sm:px-8"
        >
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              question={faq.question}
              answer={faq.answer}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              isInView={isInView}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
