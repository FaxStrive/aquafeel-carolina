"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, CheckCircle2 } from "lucide-react";

const PROOF_ITEMS = [
  { name: "Sarah M.", city: "Raleigh, NC", action: "scheduled a free water test", time: "12 minutes ago" },
  { name: "James T.", city: "Durham, NC", action: "got their water tested", time: "28 minutes ago" },
  { name: "Maria G.", city: "Cary, NC", action: "installed their Aquafeel system", time: "1 hour ago" },
  { name: "David R.", city: "Charlotte, NC", action: "scheduled a free water test", time: "2 hours ago" },
  { name: "Lisa P.", city: "Fayetteville, NC", action: "got their water tested", time: "3 hours ago" },
  { name: "Carlos V.", city: "Greensboro, NC", action: "installed their Aquafeel system", time: "4 hours ago" },
  { name: "Jennifer K.", city: "Apex, NC", action: "scheduled a free water test", time: "5 hours ago" },
  { name: "Michael H.", city: "Wake Forest, NC", action: "got their water tested", time: "6 hours ago" },
  { name: "Patricia L.", city: "Wilmington, NC", action: "scheduled a free water test", time: "7 hours ago" },
  { name: "Robert S.", city: "Columbia, SC", action: "installed their Aquafeel system", time: "8 hours ago" },
];

export default function SocialProofToasts() {
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const showNext = useCallback(() => {
    if (dismissed) return;
    setCurrentIndex((prev) => {
      const next = (prev + 1) % PROOF_ITEMS.length;
      return next;
    });
    setVisible(true);

    // Hide after 5 seconds
    setTimeout(() => {
      setVisible(false);
    }, 5000);
  }, [dismissed]);

  useEffect(() => {
    if (dismissed) return;

    // First toast after 15 seconds
    const initialTimer = setTimeout(() => {
      showNext();
    }, 15000);

    return () => clearTimeout(initialTimer);
  }, [dismissed, showNext]);

  useEffect(() => {
    if (dismissed || currentIndex < 0) return;

    // Subsequent toasts every 30-45 seconds
    const interval = setTimeout(() => {
      showNext();
    }, 30000 + Math.random() * 15000);

    return () => clearTimeout(interval);
  }, [currentIndex, dismissed, showNext]);

  const item = currentIndex >= 0 ? PROOF_ITEMS[currentIndex] : null;

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {visible && item && !dismissed && (
        <motion.div
          initial={{ x: -400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -400, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-24 md:bottom-6 left-4 z-50 max-w-[340px]"
        >
          <div className="relative bg-white rounded-xl border border-[var(--color-border)] shadow-xl shadow-brand-navy/10 p-4 pr-10">
            {/* Close */}
            <button
              onClick={() => setDismissed(true)}
              className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 text-xs"
            >
              x
            </button>

            <div className="flex items-start gap-3">
              {/* Icon */}
              <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              </div>

              <div className="min-w-0">
                <p className="font-heading text-sm font-bold text-[var(--color-text-primary)] leading-snug">
                  {item.name} {item.action}
                </p>
                <div className="flex items-center gap-1.5 mt-1">
                  <MapPin className="w-3 h-3 text-[var(--color-text-muted)]" />
                  <span className="font-body text-xs text-[var(--color-text-muted)]">
                    {item.city}
                  </span>
                  <span className="text-[var(--color-text-muted)] text-xs">
                    -
                  </span>
                  <span className="font-body text-xs text-[var(--color-text-muted)]">
                    {item.time}
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom progress bar */}
            <motion.div
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 0 }}
              transition={{ duration: 5, ease: "linear" }}
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-400 origin-left rounded-b-xl"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
