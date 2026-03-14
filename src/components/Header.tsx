"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Phone, Menu, X, ChevronDown, Shield } from "lucide-react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useI18n } from "@/lib/i18n/context";

const serviceLinks = [
  { href: "/services/city-water", labelKey: "cityWater" as const },
  { href: "/services/reverse-osmosis", labelKey: "reverseOsmosis" as const },
  { href: "/services/alkaline-ro", labelKey: "alkalineRo" as const },
  { href: "/services/well-water", labelKey: "wellWater" as const },
  { href: "/services/commercial", labelKey: "commercial" as const },
  { href: "/services/water-testing", labelKey: "freeWaterTesting" as const },
];

export default function Header() {
  const { t } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setServicesOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setServicesOpen(false), 150);
  };

  const textColor = scrolled ? "text-[var(--color-text-primary)]" : "text-white";
  const hoverColor = "hover:text-brand-cyan";
  const navLinkClass = `font-heading font-medium text-[11px] xl:text-xs tracking-wide uppercase transition-colors duration-200 whitespace-nowrap ${hoverColor} ${textColor}`;

  return (
    <>
      {/* Veteran Operated Top Bar */}
      <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "h-0 opacity-0 overflow-hidden" : "h-8"
      }`}>
        <div className="h-full bg-[var(--color-primary-dark)]/90 backdrop-blur-sm flex items-center justify-center gap-2 px-4">
          <Shield className="w-3 h-3 text-brand-cyan shrink-0" />
          <span className="font-heading text-[9px] sm:text-[10px] md:text-xs text-white/80 tracking-wider uppercase font-medium truncate">
            {t.common.locallyOwnedBadge}
          </span>
          <span className="hidden md:inline text-white/30 mx-1 shrink-0">|</span>
          <span className="hidden md:inline font-body text-[10px] md:text-xs text-white/60 whitespace-nowrap">
            {t.common.servingArea}
          </span>
        </div>
      </div>

      <header
        className={`fixed left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "top-0 bg-white/95 backdrop-blur-md shadow-lg shadow-brand-navy/5"
            : "top-8 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="relative flex items-center gap-3">
              <Image
                src="/images/client/logo-light.jpeg"
                alt="Aquafeel Solutions"
                width={44}
                height={44}
                className="rounded-lg"
              />
              <div className="hidden sm:block">
                <span
                  className={`font-heading font-bold text-lg tracking-tight transition-colors duration-300 ${
                    scrolled ? "text-[var(--color-primary)]" : "text-white"
                  }`}
                >
                  Aquafeel
                </span>
                <span
                  className={`font-heading font-medium text-lg tracking-tight transition-colors duration-300 ml-1 ${
                    scrolled ? "text-[var(--color-text-secondary)]" : "text-white/80"
                  }`}
                >
                  Solutions
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-3 xl:gap-5">
              <Link href="/" className={navLinkClass}>{t.nav.home}</Link>
              <Link href="/about" className={navLinkClass}>{t.nav.about}</Link>

              {/* Services Dropdown */}
              <div
                ref={dropdownRef}
                className="relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  href="/services"
                  className={`flex items-center gap-1 ${navLinkClass}`}
                >
                  {t.nav.services}
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      servicesOpen ? "rotate-180" : ""
                    }`}
                  />
                </Link>

                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.97 }}
                      transition={{ duration: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-56 rounded-xl bg-white shadow-xl shadow-brand-navy/10 border border-[var(--color-border)] overflow-hidden"
                    >
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-l border-t border-[var(--color-border)] rotate-45" />
                      <div className="relative py-2">
                        {serviceLinks.map((link, i) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setServicesOpen(false)}
                            className="block px-5 py-2.5 font-heading text-sm text-[var(--color-text-primary)] hover:bg-[var(--color-surface)] hover:text-brand-cyan transition-colors duration-150"
                          >
                            <motion.span
                              initial={{ opacity: 0, x: -8 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.03 }}
                            >
                              {t.services[link.labelKey]}
                            </motion.span>
                          </Link>
                        ))}
                        <div className="mx-4 my-1.5 border-t border-[var(--color-border)]" />
                        <Link
                          href="/services"
                          onClick={() => setServicesOpen(false)}
                          className="block px-5 py-2.5 font-heading text-sm font-semibold text-brand-cyan hover:bg-[var(--color-surface)] transition-colors duration-150"
                        >
                          {t.nav.viewAllServices}
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link href="/gallery" className={navLinkClass}>{t.nav.gallery}</Link>
              <Link href="/financing" className={navLinkClass}>{t.nav.financing}</Link>
              <Link href="/blog" className={navLinkClass}>Blog</Link>
              <Link href="/contact" className={navLinkClass}>{t.nav.contact}</Link>
            </nav>

            {/* Right side: Language + Phone + CTA */}
            <div className="flex items-center gap-3">
              <div className="hidden md:block">
                <LanguageSwitcher scrolled={scrolled} />
              </div>

              <a
                href="tel:9842123558"
                className={`hidden md:flex items-center gap-2 font-heading font-semibold text-xs xl:text-sm whitespace-nowrap transition-colors duration-300 ${
                  scrolled ? "text-[var(--color-primary)]" : "text-white"
                }`}
              >
                <Phone className="w-4 h-4 shrink-0" />
                {t.common.phone}
              </a>

              <Link
                href="/contact"
                className="hidden lg:inline-flex items-center px-4 xl:px-5 py-2.5 rounded-lg bg-[var(--color-accent-light)] text-[var(--color-primary-dark)] font-heading font-semibold text-xs xl:text-sm whitespace-nowrap hover:bg-[var(--color-accent)] transition-all duration-200 hover:scale-105 active:scale-95"
              >
                {t.cta.freeWaterTest}
              </Link>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className={`lg:hidden p-2 rounded-lg transition-colors ${
                  scrolled ? "text-[var(--color-primary)]" : "text-white"
                }`}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-white pt-28 px-6 overflow-y-auto"
          >
            <nav className="flex flex-col gap-4">
              {[
                { href: "/", label: t.nav.home },
                { href: "/about", label: t.nav.about },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block font-heading font-bold text-2xl text-[var(--color-text-primary)]"
                >
                  {link.label}
                </Link>
              ))}

              {/* Mobile Services Accordion */}
              <div>
                <button
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  className="flex items-center gap-2 font-heading font-bold text-2xl text-[var(--color-text-primary)]"
                >
                  {t.nav.services}
                  <ChevronDown
                    className={`w-5 h-5 transition-transform duration-200 ${
                      mobileServicesOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {mobileServicesOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="pl-4 pt-3 pb-1 flex flex-col gap-3 border-l-2 border-brand-cyan/20 ml-1">
                        {serviceLinks.map((link) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setMobileOpen(false)}
                            className="font-heading font-medium text-lg text-[var(--color-text-secondary)] hover:text-brand-cyan transition-colors"
                          >
                            {t.services[link.labelKey]}
                          </Link>
                        ))}
                        <Link
                          href="/services"
                          onClick={() => setMobileOpen(false)}
                          className="font-heading font-semibold text-lg text-brand-cyan"
                        >
                          {t.nav.viewAll}
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {[
                { href: "/gallery", label: t.nav.gallery },
                { href: "/financing", label: t.nav.financing },
                { href: "/warranty", label: t.nav.warranty },
                { href: "/blog", label: "Blog" },
                { href: "/careers", label: t.nav.careers },
                { href: "/contact", label: t.nav.contact },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block font-heading font-bold text-2xl text-[var(--color-text-primary)]"
                >
                  {link.label}
                </Link>
              ))}

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 }}
                className="pt-4 border-t border-[var(--color-border)] flex items-center gap-4"
              >
                <LanguageSwitcher variant="mobile" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="pt-2"
              >
                <a
                  href="tel:9842123558"
                  className="flex items-center gap-2 font-heading font-semibold text-lg text-[var(--color-primary)]"
                >
                  <Phone className="w-5 h-5" />
                  {t.common.phone}
                </a>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex items-center justify-center w-full px-6 py-4 rounded-lg bg-[var(--color-accent-light)] text-[var(--color-primary-dark)] font-heading font-bold text-lg"
                >
                  {t.cta.getYourFreeWaterTest}
                </Link>
              </motion.div>

              <div className="flex items-center gap-2 pt-2 pb-4">
                <Shield className="w-4 h-4 text-brand-cyan" />
                <span className="font-heading text-xs text-[var(--color-text-secondary)] tracking-wider uppercase">
                  {t.common.locallyOwnedBadge}
                </span>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
