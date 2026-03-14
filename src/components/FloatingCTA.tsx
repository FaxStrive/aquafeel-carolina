"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, TestTube, X } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";

export default function FloatingCTA() {
  const { t } = useI18n();
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 600) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const show = visible && !dismissed;

  return (
    <AnimatePresence>
      {show && (
        <>
          {/* Desktop: Pill button bottom-right */}
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{
              duration: 0.4,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="hidden md:flex fixed bottom-6 right-6 z-40 items-center gap-2"
          >
            {/* Close button */}
            <button
              onClick={() => setDismissed(true)}
              aria-label="Dismiss"
              className="w-7 h-7 rounded-full bg-white/80 border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-white transition-colors duration-200 shadow-sm"
            >
              <X className="w-3.5 h-3.5" />
            </button>

            {/* CTA pill */}
            <motion.a
              href="/contact"
              className="relative flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[var(--color-accent-light)] text-[var(--color-primary-dark)] font-heading font-bold text-sm shadow-lg hover:bg-[var(--color-accent)] transition-colors duration-300 group overflow-hidden"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              {/* Pulse glow */}
              <span className="absolute inset-0 rounded-full cta-pulse pointer-events-none" />

              <TestTube className="w-4.5 h-4.5 relative z-10" />
              <span className="relative z-10">{t.cta.freeWaterTest}</span>

              {/* Phone number appears on hover */}
              <motion.span
                className="relative z-10 overflow-hidden inline-flex items-center gap-1.5"
                initial={{ width: 0, opacity: 0 }}
                whileHover={{ width: "auto", opacity: 1 }}
              >
                <span className="w-px h-4 bg-[var(--color-primary-dark)]/20" />
                <Phone className="w-3.5 h-3.5" />
                <span className="whitespace-nowrap text-xs font-semibold">
                  (984) 212-3558
                </span>
              </motion.span>
            </motion.a>
          </motion.div>

          {/* Mobile: Full-width bottom bar */}
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{
              duration: 0.4,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[var(--color-border)] shadow-[0_-4px_20px_rgba(0,0,0,0.08)] px-4 py-3"
          >
            {/* Close button */}
            <button
              onClick={() => setDismissed(true)}
              aria-label="Dismiss"
              className="absolute -top-3 right-3 w-6 h-6 rounded-full bg-white border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] shadow-sm"
            >
              <X className="w-3 h-3" />
            </button>

            <div className="flex items-center gap-3">
              <a
                href="tel:9842123558"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-primary)] font-heading font-semibold text-sm transition-colors duration-200 active:bg-[var(--color-surface-alt)]"
              >
                <Phone className="w-4 h-4" />
                {t.cta.callUs}
              </a>
              <a
                href="/contact"
                className="relative flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[var(--color-accent-light)] text-[var(--color-primary-dark)] font-heading font-bold text-sm transition-colors duration-200 active:bg-[var(--color-accent)] overflow-hidden"
              >
                <span className="absolute inset-0 rounded-lg cta-pulse pointer-events-none" />
                <TestTube className="w-4 h-4 relative z-10" />
                <span className="relative z-10">{t.cta.freeWaterTest}</span>
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
