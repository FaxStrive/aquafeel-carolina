"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n/context";
import { Globe } from "lucide-react";

export default function LanguageSwitcher({
  variant = "default",
  scrolled = false,
}: {
  variant?: "default" | "mobile";
  scrolled?: boolean;
}) {
  const { locale, toggleLocale } = useI18n();

  if (variant === "mobile") {
    return (
      <button
        onClick={toggleLocale}
        className="flex items-center gap-2 font-heading font-semibold text-lg text-[var(--color-primary)]"
      >
        <Globe className="w-5 h-5" />
        {locale === "en" ? "Espanol" : "English"}
      </button>
    );
  }

  const textColor = scrolled
    ? "text-[var(--color-text-primary)]"
    : "text-white";
  const borderColor = scrolled
    ? "border-[var(--color-border)]"
    : "border-white/20";

  return (
    <motion.button
      onClick={toggleLocale}
      className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-full border ${borderColor} ${textColor} font-heading font-medium text-xs tracking-wide uppercase transition-colors duration-200 hover:bg-black/5`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Globe className="w-3.5 h-3.5" />
      <span>{locale === "en" ? "ES" : "EN"}</span>
    </motion.button>
  );
}
