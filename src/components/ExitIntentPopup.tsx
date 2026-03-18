"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Droplets, Shield, Clock, ArrowRight } from "lucide-react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Image from "next/image";

export default function ExitIntentPopup() {
  const [show, setShow] = useState(false);
  const [hasFired, setHasFired] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const handleMouseLeave = useCallback(
    (e: MouseEvent) => {
      if (e.clientY <= 5 && !hasFired) {
        // Check sessionStorage so it only fires once per session
        const dismissed = sessionStorage.getItem("exit-popup-dismissed");
        if (!dismissed) {
          setShow(true);
          setHasFired(true);
        }
      }
    },
    [hasFired]
  );

  useEffect(() => {
    // Only add exit intent after 8 seconds on page
    const timer = setTimeout(() => {
      document.addEventListener("mouseleave", handleMouseLeave);
    }, 8000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleMouseLeave]);

  const dismiss = () => {
    setShow(false);
    sessionStorage.setItem("exit-popup-dismissed", "true");
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {show && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={dismiss}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[61] flex items-center justify-center p-4"
          >
            <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden">
              {/* Close */}
              <button
                onClick={dismiss}
                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/80 border border-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-800 hover:bg-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Top accent bar */}
              <div className="h-1.5 bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-secondary-light)] to-[var(--color-accent-light)]" />

              <div className="p-6 sm:p-8">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 border border-red-100 mb-5">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="font-heading text-xs font-bold text-red-600 uppercase tracking-wider">
                    Wait - Before You Go
                  </span>
                </div>

                <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-[var(--color-text-primary)] leading-tight mb-3">
                  Do You Know What{"'"}s In Your Water?
                </h3>

                <p className="font-body text-[var(--color-text-secondary)] leading-relaxed mb-6">
                  Most Carolina families are drinking water with contaminants they
                  can{"'"}t see or taste. Get a free professional water analysis
                  (valued at $250) and find out exactly what{"'"}s coming out of your tap.
                </p>

                {/* Trust badges */}
                <div className="flex flex-wrap gap-4 mb-6">
                  {[
                    { icon: Droplets, text: "Free - No Obligation" },
                    { icon: Clock, text: "Takes 30 Minutes" },
                    { icon: Shield, text: "NSF Certified Lab" },
                  ].map((badge) => (
                    <div
                      key={badge.text}
                      className="flex items-center gap-2 text-sm"
                    >
                      <badge.icon className="w-4 h-4 text-[var(--color-secondary)]" />
                      <span className="font-heading font-semibold text-[var(--color-text-primary)]">
                        {badge.text}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <motion.a
                  href="/contact"
                  onClick={dismiss}
                  className="flex items-center justify-center gap-2 w-full px-6 py-4 rounded-xl bg-[var(--color-accent-light)] text-[var(--color-primary-dark)] font-heading font-bold text-lg hover:bg-[var(--color-accent)] transition-all duration-200 group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Get My Free Water Test
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.a>

                <p className="text-center font-body text-xs text-[var(--color-text-muted)] mt-3">
                  No credit card. No commitment. Just answers.
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
