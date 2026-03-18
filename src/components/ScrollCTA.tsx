"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Zap, ArrowRight, Phone } from "lucide-react";

export default function ScrollCTA() {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (dismissed) return;

    const handleScroll = () => {
      // Show after scrolling 40% of the page
      const scrollPercent =
        window.scrollY /
        (document.documentElement.scrollHeight - window.innerHeight);
      if (scrollPercent > 0.4 && !dismissed) {
        setShow(true);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [dismissed]);

  const dismiss = () => {
    setDismissed(true);
    setShow(false);
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {show && !dismissed && (
        <motion.div
          initial={{ y: 200, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 200, opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="hidden md:block fixed bottom-6 right-6 z-50 max-w-[380px]"
        >
          <div className="relative overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white shadow-2xl shadow-brand-navy/15">
            {/* Close */}
            <button
              onClick={dismiss}
              className="absolute top-3 right-3 z-10 w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:text-gray-800 hover:bg-gray-200 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>

            {/* Gradient header */}
            <div className="bg-gradient-to-r from-[var(--color-primary-dark)] to-[var(--color-primary)] px-5 py-4">
              <div className="flex items-center gap-2 mb-1">
                <Zap className="w-4 h-4 text-brand-cyan" />
                <span className="font-heading text-xs font-bold text-brand-cyan uppercase tracking-wider">
                  Limited Time Offer
                </span>
              </div>
              <h4 className="font-heading font-bold text-lg text-white leading-tight">
                Free Water Test + Organic Products Bundle
              </h4>
            </div>

            <div className="px-5 py-4">
              <p className="font-body text-sm text-[var(--color-text-secondary)] mb-4 leading-relaxed">
                Schedule your free in-home water test today and receive
                complimentary organic household products with your system.
              </p>

              <div className="flex gap-2">
                <motion.a
                  href="/contact"
                  onClick={dismiss}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[var(--color-accent-light)] text-[var(--color-primary-dark)] font-heading font-bold text-sm hover:bg-[var(--color-accent)] transition-colors group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Schedule Now
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </motion.a>
                <a
                  href="tel:9842123558"
                  className="flex items-center justify-center gap-1.5 px-4 py-3 rounded-lg border border-[var(--color-border)] text-[var(--color-text-primary)] font-heading font-semibold text-sm hover:bg-[var(--color-surface)] transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  Call
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
